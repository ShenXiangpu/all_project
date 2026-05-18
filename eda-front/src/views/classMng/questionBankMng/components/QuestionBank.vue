<template>
    <div class="">
        <div class="choose-container marginBottom20">
            <choose title="教学方向" @handleClick="handleClickDirect" :directionList="directionList" class="marginBottom20">
            </choose>
            <choose title='可见范围' @handleClick="handleClickIsPublic" :directionList="directionChooseList"></choose>
        </div>
        <div class="flex justify-between marginBottom20">
            <div>
                <el-input @clear="handleQueryList" clearable placeholder="请输入题库名称" v-model="queryParams.keyWord" class=""
                    style="width: 400px;">
                    <el-button slot="append" icon="el-icon-search" @click="handleQueryList"></el-button>
                </el-input>
            </div>
            <div><el-button type="primary" @click="handleAdd">创建题库</el-button></div>
        </div>
        <div>
            <el-card>
                <el-table :data="questionBankList" :loading="loading" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="55" align="center">
                    </el-table-column>
                    <el-table-column label="名称" prop="name" min-width="180" align="center" show-overflow-tooltip>
                        <template #default="scope">
                            <a class="primaryColorb" @click="gotoPage('/classMng/questionList', scope.row.id)">{{
                                scope.row.name }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="directionName" label="方向" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="num" label="题目数量" width="180" align="center">
                    </el-table-column>
                    <el-table-column label="可见范围" width="180" align="center">
                        <template #default="scope">
                            <el-tag v-if="scope.row.isPublic == 1" type="warning" class="question-warn" style=""
                                size="mini">所有老师</el-tag>
                            <el-tag v-else type="primary" class="question-primary" style="" size="mini">自己可见</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createName" label="创建人" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center" min-width="120">
                        <template #default="scope">
                            <el-button @click="updateQuestionBank(scope.row)" type="warning" class="editWarning"
                                size="mini">修改</el-button>
                            <el-button type="primary" :loading="exportLoading" class="editPrimary"
                                @click="exportQuestionBank(scope.row)" size="mini">导出</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                    @pagination="searchQuery" />
            </el-card>
        </div>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getQuBankList, exportQuBank } from '@/api/edu/question'
import Choose from './Choose.vue';
export default {
    components: { Choose, Pagination },
    props: {
        // 父组件传递过来的数据
        directionList: {
            type: Array,
            default: () => {
                return [];
            }
        },

    },
    mounted() {
        this.getList();
    },
    data() {
        return {
            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
                params: "",
            },
            queryParams: {
                keyWord: '',
                directionId: '',
                isPublic: null
            },
            loading: false,
            directionChooseList: [
                {
                    id: 0,
                    name: '仅自己可见'
                },
                {
                    id: 1,
                    name: '所有老师'
                },
            ],
            input3: '',
            // 默认选中的选项
            defaultChoose: 0,
            // 选项列表
            chooseList: [
                { id: 1, name: '选项1' },
                { id: 2, name: '选项2' }
            ],
            questionBankList: [],
            exportLoading: false
        }
    },
    methods: {
        //导出题库
        exportQuestionBank(row) {
            this.exportLoading = true
            exportQuBank({ id: row.id }).then(res => {
                if (row.num == 0) {
                    this.$message.warning('题库为空')
                    return
                }
                let type = "application/zip;charset=utf-8"

                const blob = new Blob([res.data], {
                    type
                }); // 构造一个blob对象来处理数据，并设置文件类型

                let fileName = decodeURI(res.headers["content-disposition"]);

                if (fileName) {
                    fileName = fileName.substring(fileName.indexOf("=") + 1);
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
                this.exportLoading = false
            }).finally(() => {
                this.exportLoading = false

            })
        },
        updateQuestionBank(item) {
            let userId = this.$store.state.user.userInfo.id
            if (userId != item.createBy) {
                this.$message.warning("无权修改非本人创建的题库")
                return
            }
            this.$emit('updateQuestionBank', item)
        },
        //点击输入框查询按钮
        handleQueryList() {
            this.listQuery.params = this.queryParams
            this.getList();
        },
        //教学方向
        handleClickDirect(id, item) {
            console.log(id, item);
            if (id != 'all') {
                this.queryParams.directionId = item.id;
            } else {
                this.queryParams.directionId = null;
            }
            this.listQuery.page = 1;
            this.handleQueryList()
        },
        // 可见方向
        handleClickIsPublic(id, item) {
            if (id == 'all') {
                this.queryParams.isPublic = 'all';
            } else if (id == '1') {
                this.queryParams.isPublic = 0;
            } else if (id == '2') {
                this.queryParams.isPublic = 1;
            }
            this.listQuery.page = 1;
            this.handleQueryList()
        },
        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            this.getList();
        },
        getList() {
            this.loading = true;
            getQuBankList(this.listQuery).then((reponse) => {
                let resData = reponse.resData;
                this.questionBankList = resData.list;
                this.total = resData.total;
                this.loading = false;
            });
        },


        // 选项改变
        chooseChange(id) {
            this.defaultChoose = id;
        },
        handleAdd() {
            this.$emit('handleAdd')
        },
        gotoPage(router, id) {
            this.$router.push({ path: router, query: { id } })
        },
    }
}
</script>

<style lang="scss" scoped>
.choose-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    color: #000;
    font-weight: 500;



}


.question-warn {
    color: #fff;
    background-color: rgb(42, 130, 228) !important;
}

.question-primary {
    color: #fff;
    background-color: rgb(255, 195, 0) !important;
}
</style>