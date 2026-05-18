<template>
    <el-dialog :title="textMap[dialog.status]" :visible="dialog.visible" @close="cancel" width="80vw">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="作业类型" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio :label="0">普通作业</el-radio>
                    <el-radio :label="1">考试作业</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="作业名称" prop="homeworkName">
                <el-input clearable placeholder="请输入作业名称" v-model="form.homeworkName" class="" style="width: 400px;">
                    <!-- <el-button slot="append" icon="el-icon-search" @click="handleQueryList"></el-button> -->
                </el-input>
            </el-form-item>
            <el-form-item label="作业时间" prop="time">
                <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="选择试卷" prop="paperId" v-if="dialog.status != 'update'">
                <div class="form-container marginBottom20">
                    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                        <el-form-item label="试题名称" prop="title" class="marginRight20">
                            <el-input clearable placeholder="请输入试题名称" v-model="searchForm.title" class=""
                                style="width: 200px;">
                                <!-- <el-button slot="append" icon="el-icon-search" @click="handleQueryList"></el-button> -->
                            </el-input>
                        </el-form-item>
                        <el-form-item label="公开范围" prop="ofPublic" class="marginRight20">
                            <el-select v-model="searchForm.ofPublic" placeholder="请选择试题公开范围">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="仅自己" value="1"></el-option>
                                <el-option label="所有老师" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" class="editSuccess" icon="el-icon-search"
                                @click="onSubmit('searchForm')">搜索</el-button>
                            <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                                @click="onCancel('searchForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <el-table ref="multipleTable" height="30vh" :data="testPaperList" :loading="loading" border
                        tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column label="选择" width="55" align="center">
                            <template slot-scope="scope">
                                <el-radio v-model="tableRadio" :label="scope.row.id" @change="getTableItem">{{ ''
                                }}</el-radio>
                            </template>
                        </el-table-column>

                        <el-table-column prop="title" label="试题名称" min-width="180" align="center">
                            <template #default="scope">
                                <span class="pointer primaryColor" @click="queryTestPaperById(scope.row.id)">{{
                                    scope.row.title
                                }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="公开范围" min-width="60" align="center">
                            <template #default="scope">
                                <span v-if="scope.row.ofPublic == 1" class="primaryColorg">仅自己</span>
                                <span v-if="scope.row.ofPublic == 2" class="primaryColory">全部老师</span>
                                <span v-if="scope.row.ofPublic == 3" class="primaryColoro">全部用户</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="试题分值" align="center" min-width="180">
                            <template #default="scope">
                                <span class="primaryColorg">{{ scope.row.score }}分</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="usage" label="使用次数" min-width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="createdAt" label="创建时间" align="center" min-width="150">
                        </el-table-column>
                    </el-table>
                    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                        @pagination="searchQuery" />
                </div>


            </el-form-item>
        </el-form>
        <!-- <question-mng-drawer @closeDrawer="closeDrawer" :drawer="drawer" :questionForm="questionForm"></question-mng-drawer> -->

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button v-if="dialog.status != 'update'" :loading="homeworkSubLoading" type="primary"
                @click="submitForm('form')">确 定</el-button>
            <el-button v-if="dialog.status == 'update'" :loading="homeworkSubLoading" type="primary"
                @click="submitForm('form')">修 改</el-button>

        </span>
    </el-dialog>
</template>

<script>
import {
    getTestPaperList,
    getTestPaperDetailById
} from '@/api/edu/question'
import Pagination from '@/components/Pagination'
// import QuestionMngDrawer from '../../../questionBankMng/components/QuestionMng-Drawer.vue'

export default {
    name: '',
    props: {
        dialog: {
            type: Object,
            default: () => { }
        },
        homeworkSubLoading: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pagination
    },
    created() {

    },
    data() {
        return {
            tableRadio: '',
            questionForm: {
                ofPublic: '',
                title: '',
                descriptions: '',
                paperItemList: []
            },
            textMap: {
                update: "修改作业",
                create: "添加作业",
                look: "",
            },
            form: {
                type: 0,
                time: '',
                homeworkName: '',
                paperId: ''
            },
            rules: {
                homeworkName: [
                    {
                        required: true,
                        message: "请输入作业名称",
                        trigger: "blur",
                    }
                ],
                time: [
                    {
                        required: true,
                        message: "请选择时间",
                        trigger: "blur",
                    }
                ],
                // paperId: [
                //     {
                //         required: true,
                //         message: "请选择试卷",
                //         trigger: "blur",
                //     }
                // ]
            },
            total: 0,
            searchForm: {
                title: '',
                ofPublic: ''
            },

            listQuery: {
                page: 1,
                limit: 10,
                params: {}
            },
            testPaperList: [],
            loading: false,
            questionInfo: {},
            drawer: false
        }
    },
    methods: {

        queryTestPaperById(id) {
            getTestPaperDetailById({ id }).then(res => {
                if (res && res.flag) {
                    this.questionForm = res.resData
                    this.drawer = true
                }
            })
        },
        closeDrawer() {
            this.drawer = false
        },
        getTableItem(e) {
            this.form.paperId = e
        },
        handleSelectionChange(val) {
            console.log(this.tableRadio);

        },
        cancel() {
            this.$refs.form.resetFields();
            this.$emit('cancelHomeWork');
        },
        initForm() {
            let form = {
                type: 0,
                time: '',
                homeworkName: '',
                paperId: ''
            }
            this.form = form
            this.tableRadio = ''
        },

        submitForm(formStr) {
            let form = this.form
            let time = form && form.time
            let startTime = time && time[0]
            let endTime = time && time[1]
            startTime = this.$moment(startTime).format("YYYY-MM-DD HH:mm:ss")
            endTime = this.$moment(endTime).format("YYYY-MM-DD HH:mm:ss")
            let homeworkName = form.homeworkName

            let formItem = {
                homeworkName,
                startTime,
                endTime,
                type: form.type
            }
            let status = this.dialog.status
            if (status != 'update') { //添加需要paperId
                let paperId = form.paperId
                if (!paperId) {
                    this.$message.warning("请选择试卷")
                    return
                }
                formItem.paperId = paperId
            } 
            this.$refs[formStr].validate((valid) => {
                if (valid) {
                    this.$emit('submitForm', formItem, true);
                }
            });
        },
        onSubmit(form) {
            let searchForm = this[form]
            this.listQuery.params = searchForm
            this.getList()
        },
        onCancel(form) {
            this.$refs[form].resetFields();
            let searchForm = this[form]
            this.listQuery.params = searchForm
            this.getList()
        },
        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            this.getList();
        },

        getList() {
            this.loading = true;

            getTestPaperList(this.listQuery).then((reponse) => {
                let resData = reponse.resData;
                this.testPaperList = resData.records;
                this.total = resData.total;
                this.loading = false;
            });
        },
    },

}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dialog {
        border-radius: 4px;

        .el-dialog__header {
            border-radius: 4px 4px 0 0;
            padding: 10px 20px;
            background-color: rgb(233, 233, 233);

            .el-dialog__title {
                color: #333;
            }
        }
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #01c037;
        background: #01c037;
    }

    .el-radio__input.is-checked+.el-radio__label {
        color: #01c037;
    }

    .el-radio__inner::after {
        background-color: #01c037;
    }
}

.form-container {
    border: 1px solid #dcdfe6;
    padding: 20px;
    border-radius: 6px;
}</style>