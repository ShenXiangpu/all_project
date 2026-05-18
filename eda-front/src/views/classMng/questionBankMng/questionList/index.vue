<template>
    <div class="questionList-container">
        <form-edu ref="form-edu" @handleCommand="handleCommand" :userDialogVisible="userDialogVisible" :bankId="id"
            @queryQuestionList="queryQuestionList" @getLabelIds="getLabelIds" :questionBankList="questionBankList"
            :questionTypeList="questionTypeList"></form-edu>
        <list :tableHeight="tableHeight" @handleSelectionChange="handleSelectionChange"
            :userDialogVisible="userDialogVisible" :total="total" :listQuery="listQuery" @searchQuery="searchQuery"
            @editQuestion="editQuestionById" @queryQuestion="queryQuestion" :questionList="questionList"></list>
        <question-drawer :questionInfo="questionInfo" @closeDrawer="closeDrawer" :drawer="drawer"></question-drawer>

        <choose-tips :tipsList="tipsList" :dialogVisible="dialogTipsVisible" @submitTips="submitTips"
            @handleTipsClose="handleTipsClose"></choose-tips>
    </div>
</template>

<script>
import ChooseTips from './components/ChooseTips.vue'
import FormEdu from './components/Form.vue';
import List from './components/List.vue';
import QuestionDrawer from './components/Question-Drawer.vue';
import { cloneDeep } from 'lodash'

//apijs
import {
    getList4SelectBox,
    getQuestionTypeList,
    getItemListByBankId,
    getItemById,
    setLabels,
    deleteQuestions,
    exportItems,
    getListLables,
    removeLabels
} from '@/api/edu/question'
export default {
    props: {
        userDialogVisible: {
            type: Boolean,
            default: true
        },
        tableHeight: {
            type: String,
            default: ''
        },
    },
    components: {
        FormEdu,
        List,
        QuestionDrawer,
        ChooseTips
    },
    data() {
        return {
            //
            tipsList: [],
            dialogTipsVisible: false,
            // 表单参数
            drawer: false,
            questionTypeList: [],//题型
            questionBankList: [],//题库
            questionList: [],//题目列表
            questionInfo: {},
            total: 0,
            listQuery: {
                quBankId: 0,
                page: 1,
                limit: 10,
                params: "",
            },
            loading: false,
            id: 0,
            idList: [],
            labels: '',
        }
    },
    created() {
        this.id = this.$route.query.id
        this.listQuery.quBankId = this.id
        this.queryQuestionTypeList()
        this.queryList4SelectBox()
        this.getList()

    },
    methods: {
        //查询标签
        queryListLables() {
            getListLables().then(res => {
                let resData = res && res.resData
                resData && resData.length > 0 && resData.map(item => {
                    let items = item && item.children
                    items.map(_i => {
                        _i.isSelect = false
                    })
                })
                this.tipsList = resData;
                this.dialogTipsVisible = true
            })
        },

        handleTipsClose() {
            this.dialogTipsVisible = false;
        },

        queryTipsListStr(tipsList) {
            let tipsListStr = []
            tipsList && tipsList.length > 0 && tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    i.isSelect && tipsListStr.push(i.id)
                })
            })
            return tipsListStr.toString()
        },
        submitTips(tipsList) {
            let tipsListStr = this.queryTipsListStr(tipsList)
            this.dialogTipsVisible = false;
            let labels = tipsListStr
            let ids = this.idList
            ids = ids.toString()
            setLabels({
                itemId: ids,
                labels
            }).then(res => {
                if (res && res.flag) {
                    this.$message.success('批量添加成功')
                    this.getList()
                } else {
                    this.$message.success('批量添加失败')
                }
            })
        },

        // 点击批量操作
        handleCommand(command) {
            let ids = this.idList
            if (!(ids && ids.length > 0)) {
                this.$message.warning('请选择要操作的数据')
                return
            }
            ids = ids.toString()
            switch (command) {
                case 'a':
                    
                    this.$confirm('此操作将删除选中的试题, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteQuestions({ ids }).then(res => {
                            if (res && res.flag) {
                                this.$message.success('删除成功')
                                this.getList()
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                    }).catch(() => {
                        console.log('取消删除');
                    });

                    break;
                case 'b':
                    exportItems({ ids }).then(res => {
                        if (res && res.size === 0) {
                            this.$message.success("当前数据为空");
                            return;
                        }
                        const blob = new Blob([res.data], {
                            type: "application/octet-stream;charset=UTF-8"
                        }); // 构造一个blob对象来处理数据，并设置文件类型

                        let fileName = decodeURI(res.headers["content-disposition"]);

                        if (fileName) {
                            fileName = fileName.substring(fileName.indexOf("=") + 1);
                            fileName = fileName.substring(0, fileName.indexOf(";"));
                        }
                        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
                        const a = document.createElement("a"); //创建a标签
                        a.style.display = "none";
                        a.href = href; // 指定下载链接
                        a.download = fileName; //指定下载文件名
                        document.body.appendChild(a);
                        a.click(); //触发下载
                        URL.revokeObjectURL(a.href); //释放URL对象
                        document.body.removeChild(a);
                        this.$message.success("下载成功");
                    });
                    break;
                case 'c':
                    this.queryListLables()
                    break;
                case 'd':
                    this.$confirm('此操作将移除选中试题的所有标签, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        removeLabels({
                        itemIds: ids
                    }).then(res => {
                        if (res && res.flag) {
                            this.$message.success('批量移除成功')
                            this.getList()
                        } else {
                            this.$message.success('批量移除失败')
                        }
                    })
                    }).catch(() => {
                        console.log('取消批量移除');
                    });
                    
                    break;
                default:
                    break;
            }
        },
        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            this.getList();
        },
        handleStr(form) {
            let { quTypeId } = form;
            if (quTypeId.length == 1 && quTypeId.indexOf("全部") == 0) {
                return ""
            } else {
                return quTypeId.toString()
            }
        },
        getList() {
            this.loading = true;

            getItemListByBankId(this.listQuery).then((reponse) => {
                let resData = reponse.resData;
                let list  = resData.list
                list && list.map(item => {
                    let content = item.content
                    item.content = content.replace(/<[^>]+>/g,'') //处理掉字符串中的html标签
                })
                this.questionList = resData.list;
                this.total = resData.total;
                this.loading = false;
            });
        },
        //根据条件筛选
        queryQuestionList(form) {
            let quTypeId = form.quTypeId
            let quTypeIds = []
            this.questionTypeList.map(item => {
                if (quTypeId.indexOf(item.name) > -1) {
                    quTypeIds.push(item.id)
                }
            })
            let forms = cloneDeep(form)
            forms.quTypeId = quTypeIds.toString()
            this.listQuery.params = forms
            this.listQuery.quBankId = forms.quBankId
            this.getList()
        },
        //获取ids字符串
        getLabelIds(ids) {
            console.log(ids);
        },
        //题型列表
        queryQuestionTypeList() {
            getQuestionTypeList().then(res => {
                let resData = res.resData;
                resData.unshift({ id: 0, name: '全部' })
                this.questionTypeList = resData
            })
        },
        //题库列表
        queryList4SelectBox() {
            getList4SelectBox().then(res => {
                let resData = res.resData;
                this.questionBankList = resData
            })
        },

        editQuestionById(id, quTypeId) {

            let bank = this.id
            let type = quTypeId
            let quId = id
            this.$router.push({
                path: '/classMng/defineQuestion/addQuestion',
                query: {
                    bank,
                    type,
                    quId
                }
            })
        },
        queryQuestionObj(id) {
            getItemById({ id }).then(res => {
                if (res && res.flag) {
                    let resData = res.resData;
                    let answers = resData.answers;
                    if (resData.quTypeId == '1' || resData.quTypeId == '2' || resData.quTypeId == '3') {
                        let trust = []
                        let chooseList = ["A", "B", "C", "D", "E", "F",]
                        for (let i = 0; answers && answers.length > 0 && i < answers.length; i++) {
                            answers[i].choose = chooseList[i]
                            if (answers[i].isRight) {
                                trust.push(answers[i].choose)
                            }
                        }
                        resData.trust = trust.toString()
                        resData.content = resData && resData.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        this.questionInfo = resData;
                    }
                    this.questionInfo = resData;
                    this.drawer = true;

                }
            })
        },

        queryQuestion(id) {
            this.queryQuestionObj(id)

        },
        closeDrawer() {
            this.drawer = false;
        },
        //获取列表信息
        handleSelectionChange(val) {
            let idList = [];
            val && val.length > 0 && val.map(item => {
                idList.push(item.id)
            })
            this.idList = idList
        },
    }
}
</script>

<style lang="scss" scoped>
.questionList-container {
    padding: 20px;
}
</style>