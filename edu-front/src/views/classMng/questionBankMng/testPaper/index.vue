<template>
    <div class='app-container'>
        <el-form class="el-form-edu" :model="questionForm" :rules="questionRules" ref="questionForm">
            <el-form-item class="marginBottom20 el-form-edu-title" prop="title">
                <el-input v-model="questionForm.title" placeholder="请填写标题"></el-input>
            </el-form-item>
            <el-form-item class="marginBottom20 el-form-edu-descriptions" prop="descriptions">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请填写本次考试提示说明"
                    v-model="questionForm.descriptions">
                </el-input>
            </el-form-item>
            <stu-info></stu-info>
            <div class="flex">
                <el-form :inline="true">
                    <el-form-item class="marginBottom20" label="单选题分值" label-width="150">
                        <el-input v-model="singleVal" style="width: 80px;" @input="inputVal"></el-input>
                    </el-form-item>
                    <el-form-item class="marginBottom20 " label="多选题分值" label-width="150">
                        <el-input v-model="multiVal" style="width: 80px;" @input="inputVal"></el-input>
                    </el-form-item>
                    <el-form-item class="marginBottom20" label="判断题分值" label-width="150">
                        <el-input v-model="handleVal" style="width: 80px;" @input="inputVal"></el-input>
                    </el-form-item>
                    <el-form-item class="marginBottom20 " label="简答题分值" label-width="150">
                        <el-input v-model="shortVal" style="width: 80px;" @input="inputVal"></el-input>
                    </el-form-item>
                    <el-form-item class="marginBottom20" label="实操题分值" label-width="150">
                        <el-input v-model="upVal" style="width: 80px;" @input="inputVal"> </el-input>
                    </el-form-item>
                </el-form>

            </div>
            <paper-container class="marginBottom60" @move="move" @removeQuestion="removeQuestion"
                :questionRules="questionRules" @inputScore="inputScore" :questionForm="questionForm"></paper-container>
            <div class="add-from-question">
                <el-button type="primary" class="el-button-edu" icon="el-icon-circle-plus-outline"
                    @click="handleAddQuestion">从题库添加
                </el-button>
            </div>

            <div class="form-footer flex justify-between align-center"
                :class="this.$store.state.app.sidebar.opened ? 'open-width' : 'close-width'">

                <div>
                    <el-form-item class="el-form-item-edu" label-width="110px" label="公开范围" prop="ofPublic">
                        <el-select v-model="questionForm.ofPublic" placeholder="请选择公开范围">
                            <el-option label="仅自己" :value="1"></el-option>
                            <el-option label="所有老师" :value="2"></el-option>
                            <!-- <el-option label="全部用户" :value="3"></el-option> -->
                        </el-select>
                    </el-form-item>
                </div>
                <div class="flex justify-start align-center">

                    <div class="marginRight20 fontW7 font20">
                        总分值：{{ scoreTotal }}分
                    </div>
                    <el-form-item class="el-form-item-edu">

                        <el-button type="primary" :sumitLoading="sumitLoading" @click="submitForm('questionForm')">{{ testId
                            ? '修改' : '立即创建' }}</el-button>

                        <el-button @click="cancel">取消</el-button>

                    </el-form-item>
                </div>

            </div>
        </el-form>

        <el-dialog title="从题库选择" :visible="dialogVisibleList" width="90%" :before-close="handleClose">
            <question-list :tableHeight="'40vh'" ref="question-list" :userDialogVisible="false"></question-list>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog">取 消</el-button>
                <el-button type="primary" @click="getQuestionIds">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { cloneDeep } from "lodash"
import QuestionList from '../questionList';
import StuInfo from './components/StuInfo.vue';
import PaperContainer from './components/Paper-Container';
import { getItemById, addOne, modifyOne, getTestPaperDetailById } from '@/api/edu/question'
export default {
    name: '',
    components: {
        StuInfo,
        PaperContainer,
        QuestionList
    },
    created() {
        let testId = this.$route.query.testId
        if (testId) {
            this.queryTestPaperDetailById(testId)
            this.testId = testId
        }
    },
    data() {
        const vali = (rule, value, callback) => {
            if (value > 100 || value < 1) {
                callback(new Error('分值不能小于1或大于100'));
            }
            callback();
        }
        return {
            testId: 0,
            questionRules: {
                ofPublic: [
                    { required: true, message: '请选择公开范围', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入标题', trigger: 'change' }
                ],
                score: [
                    { required: true, message: '请输入分值', trigger: 'blur' },
                    { type: 'number', message: '分值必须为数值', trigger: ['blur', 'change'] },
                    { validator: vali, trigger: 'blur' }
                ]
            },
            questionForm: {
                ofPublic: '',
                title: '',
                descriptions: '',
                paperItemList: []
            },
            dialogVisibleList: false,
            questionList: [],
            ids: [],
            scoreTotal: 0,//总分
            sumitLoading: false,
            singleVal: '',
            multiVal: '',
            handleVal: '',
            shortVal: '',
            upVal: '',
        }
    },
    methods: {
        //修改，查询详情
        queryTestPaperDetailById(id) {
            getTestPaperDetailById({ id }).then(res => {
                if (res && res.flag) {
                    let resData = res.resData
                    this.questionForm = resData
                    this.scoreTotal = this.queryScore()
                }
            })
        },
        //根据quTypeId,返回score
        getScore(quTypeId) {
            let score = 0;
            if (quTypeId == 1) {
                return score = Number(this.singleVal) || ''
            } else if (quTypeId == 2) {
                return score = Number(this.multiVal) || ''
            } else if (quTypeId == 3) {
                return score = Number(this.handleVal) || ''
            } else if (quTypeId == 4) {
                return score = Number(this.shortVal) || ''
            } else if (quTypeId == 5) {
                return score = Number(this.upVal) || ''
            }
            return score
        },

        inputVal() {
            console.log(this.handleVal);
            let paperItemList = cloneDeep(this.questionForm.paperItemList);
            paperItemList && paperItemList.length > 0 && paperItemList.forEach(item => {
                item.score = this.getScore(item.quTypeId)
            })
            this.questionForm.paperItemList = paperItemList
            this.scoreTotal = this.queryScore()
        },
        //去重问题：id相同不用查询
        queryQuestionListById(id, ids) {
            if (ids.indexOf(id) > -1) {
                return true
            } else {
                return false
            }

        },
        //计分问题 //需要表里数组的参数值
        queryScore() {
            let scoreTotal = 0
            for (let i = 0; i < this.questionForm.paperItemList.length; i++) {
                if (this.questionForm.paperItemList[i].score) {
                    scoreTotal += Number(this.questionForm.paperItemList[i].score)
                }
            }
            return scoreTotal
        },


        //移除问题
        removeQuestion(index) {
            this.questionForm.paperItemList.splice(index, 1);
            //同时移除保存ids的id
            this.ids.splice(index, 1);
        },
        //移动问题
        move(num, index) {
            let paperItemList = cloneDeep(this.questionForm.paperItemList)
            //关于移动，向上移动，判断是否是第一个，第一个无法移动
            if (index == 0 && num < 0 || index == paperItemList.length - 1 && num > 0) { //此时不能移动
                this.$message.warning('不能移动')
                return
            }
            //目标index
            let moveIndex = Number(index) + Number(num)

            let paperItemListItem = paperItemList[index] //暂存

            paperItemList[index] = paperItemList[moveIndex]

            paperItemList[moveIndex] = paperItemListItem

            this.questionForm.paperItemList = paperItemList
        },
        //题库添加关闭页面重置条件
        inputScore(e, index) {
            if (e) {
                this.questionForm.paperItemList[index].score = Number(e)
            } else {
                this.questionForm.paperItemList[index].score = undefined
            }
            this.scoreTotal = this.queryScore()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.sumitLoading = true
                    if (this.testId) {
                        let questionForm = this.questionForm
                        let form = {
                            ofPublic: questionForm.ofPublic,
                            title: questionForm.title,
                            descriptions: questionForm.descriptions,
                            paperItemList: questionForm.paperItemList
                        }
                        form.id = this.testId
                        modifyOne(form).then(res => {
                            if (res && res.flag) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.sumitLoading = false
                                this.$router.back()
                            } else {

                                this.sumitLoading = false
                            }
                        })
                    } else {
                        let questionForm = this.questionForm
                        let form = {
                            ofPublic: questionForm.ofPublic,
                            title: questionForm.title,
                            descriptions: questionForm.descriptions,
                            paperItemList: []
                        }
                        let paperItemList = questionForm.paperItemList
                        paperItemList.map(item => {
                            form.paperItemList.push({
                                id: item.id,
                                score: item.score
                            })
                        })
                        addOne(form).then(res => {
                            if (res && res.flag) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.sumitLoading = false
                                this.$router.back()
                            } else {

                                this.sumitLoading = false
                            }
                        })
                    }

                }
            });
        },
        cancel() {
            this.$router.back()
        },
        cancelDialog() {
            this.$refs['question-list'].$children[0].form.keyWord = '';
            this.$refs['question-list'].$children[0].submit()
            this.dialogVisibleList = false
        },
        getQuestionIds() {
            let val = this.$refs['question-list'].idList
            val && val.length > 0 && val.map(async id => {
                //处理重复id
                if (!this.queryQuestionListById(id, this.ids)) {
                    let res = await getItemById({ id })
                    let resData = res.resData
                    resData.score = this.getScore(resData.quTypeId)
                    this.ids.push(resData.id)
                    this.questionForm.paperItemList.push(resData)
                }
            })
            this.inputVal()
            this.$refs['question-list'].$children[0].form.keyWord = '';
            this.$refs['question-list'].$children[0].submit()
            this.dialogVisibleList = false
        },
        handleClose() {
            this.dialogVisibleList = false
        },
        handleAddQuestion() {
            this.dialogVisibleList = true
        },
    }
}
</script>

<style lang="scss" scoped>
$foot-height: 100px;
.marginBottom60 {
    margin-bottom: 70px;
}
.add-from-question {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translate(-50%);
}
.app-container {
    padding: 20px;
    position: relative;


    .el-button-edu {
        width: 400px;
        height: 50px;
        font-size: 18px;
    }

    .el-form-edu {

        .form-footer {
            background-color: #fff;
            position: fixed;
            bottom: 0px;
            height: $foot-height;
            padding: 20px;
            z-index: 10;
            border-top: 2px solid #ddd;
        }

        .open-width {
            width: calc(100vw - 250px);
        }

        .close-width {
            width: calc(100vw - 113px);
        }

    }

    .el-form-item-edu {
        margin-bottom: 0;
    }

    .el-form-edu-title {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
        width: 600px;
        margin: 0 auto;
        margin-bottom: 30px;

        ::v-deep {
            .el-input__inner {
                border: none;
                text-align: center;
                font-size: 20px;
            }

            .el-form-item__error {
                width: 600px;
                text-align: center;
            }

            .el-input__inner::placeholder {
                color: #666;
                text-align: center;
                font-size: 20px;
                font-weight: 700;
            }

        }

    }

    .el-form-edu-descriptions {
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 600;



        ::v-deep {
            .el-textarea__inner {
                border: none;
                border-bottom: 1px solid #ddd;
                border-radius: 0;

            }

            .el-input__inner::placeholder {
                color: #666;
                text-align: center;
                font-size: 20px;
            }

        }
    }

}

.app-container::after {
    display: block;
    content: '';
    clear: both;
    width: 100%;
    height: $foot-height;
}
</style>
