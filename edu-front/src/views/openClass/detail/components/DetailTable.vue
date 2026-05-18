<template>
    <div>
        <border-container v-if="userRolesNames != '学生'" class="marginBottom10 border-container" :height="15"
            :isShowTitle="false" :isBgShow="false">
            <template #content>
                <div class="" style="padding: 20px 0 10px 10px;">
                    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                        <el-form-item label="学生姓名" prop="keyWord">
                            <el-input v-model="queryParams.keyWord" placeholder="请输入学生姓名" clearable
                                @keyup.enter="handleQuery" />
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="queryParams.status" placeholder="请选择状态">
                                <el-option label="" value="">全部</el-option>
                                <el-option label="未完成" value="0"></el-option>
                                <el-option label="待批改" value="1"></el-option>
                                <el-option label="已批改" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级" prop="className">
                            <el-select placeholder="请选择班级" v-model="queryParams.className">
                                <el-option label="" value="">请选择</el-option>
                                <el-option v-for="item in courseList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" class="editSuccess" icon="el-icon-search"
                                @click="handleQuery">搜索</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                                @click="resetQuery('queryFormRef')">重置</el-button>
                        </el-form-item>


                        <el-form-item>
                            <el-button :loading="downLoading" type="success" class="editSuccess" icon="el-icon-download"
                                @click="downFiles()" :disabled="!(ids && ids.length > 0)">批量下载</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </template>

        </border-container>
        <el-card class="my-lab-card-body" style="width: 100%;min-width: 900px;">

            <div>
                <el-table class="el-table-edu" ref="multipleTable" v-loading="loading" :data="labList" tooltip-effect="dark"
                    style="width: 100%;min-width: 900px;" @selection-change="handleSelectionChange">
                    <el-table-column v-if="userRolesNames != '学生'" type="selection" width="55" align="center">
                    </el-table-column>
                    <el-table-column v-if="userRolesNames == '学生'" type="index" width="55" label="序号" align="center">
                    </el-table-column>
                    <el-table-column label="学生姓名" prop="userName" min-width="120" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">
                            <span class="pointer primaryColor" @click="openDrawer(scope.row)">{{ scope.row.trialName
                            }}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="studentNum" align="center" label="学号" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="className" align="center" label="班级" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="submitTime" align="center" min-width="120" label="提交时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column v-if="userRolesNames != '学生'" label="实验报告" align="center" min-width="120"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.completionStatus == 0" class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini" disabled>查看</el-button>
                            </span>
                            <span v-if="scope.row.completionStatus == 1" class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini"
                                    @click="queryTrialReport(scope.row.id)">查看</el-button>
                            </span>
                            <span v-if="scope.row.completionStatus == 2" class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini"
                                    @click="queryTrialReport(scope.row.id)">查看</el-button>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="当前状态" align="center" min-width="120" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.completionStatus == 0" class=" primaryColor">
                                <el-tag type="danger" size="mini">未完成</el-tag>
                            </span>
                            <span v-if="scope.row.completionStatus == 1" class=" primaryColor">
                                <el-tag type="success" size="mini">待批改</el-tag>
                            </span>
                            <span v-if="scope.row.completionStatus == 2" class=" primaryColor">
                                <el-tag type="success" size="mini">已批改</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="score" label="评分" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="suggestion" label="批改建议" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column fixed="right" v-if="userRolesNames != '学生'" label="实验批阅" align="center" min-width="120"
                        show-overflow-tooltip>
                        <template slot-scope="scope">

                            <span class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini"
                                    @click="handleCorrention(scope)">批改</el-button>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" v-if="userRolesNames == '学生'" label="实验报告" align="center" min-width="120"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.completionStatus == 0" class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini" disabled>查看</el-button>
                            </span>
                            <span v-if="scope.row.completionStatus == 1" class="pointer primaryColor">
                                <el-button class="editPrimary" type="primary" size="mini"
                                    @click="queryTrialReport(scope.row.id)">查看</el-button>
                            </span>
                            <span v-if="scope.row.completionStatus == 2" class="pointer primaryColor marginRight10">
                                <el-button class="editPrimary" type="primary" size="mini"
                                    @click="queryTrialReport(scope.row.id)">查看</el-button>
                            </span>

                            <span v-if="scope.row.completionStatus == 2" class="pointer primaryColor">
                                <el-button :loading="downLoading" class="editSuccess" @click="downFileById(scope.row.id)"
                                    type="success" size="mini">下载</el-button>
                            </span>

                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-if="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit"
                    @pagination="searchQuery" />
            </div>

        </el-card>
    </div>
</template>

<script>
import {
    getListTrialReport,
    getClassesForSearch,
    downLoadReport
} from "@/api/edu/labCenter";
import { mapGetters } from 'vuex'
import BorderContainer from "@/components/BorderContainer";
import Pagination from "@/components/Pagination";
import indexVue from '@/components/TableList/index.vue';
import { loading } from '@jiaminghi/data-view';
export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "DetailTable",
    components: {
        BorderContainer, Pagination
    },
    props: {
        trialCourseId: {
            type: Number,
            default: 0
        },
        tableHeight: {
            type: String,
            default: ""
        },
    },
    computed: {
        ...mapGetters([
            'userRolesNames'
        ])
    },
    created() {

    },
    mounted() {
    },
    data() {
        return {
            queryParams: {
                keyWord: '',
                status: '',
                className: '',
                page: 1,
                limit: 10,
            },
            labList: [],
            total: 0,
            courseList: [],
            ids: [],
            downLoading: false,
            loading: false
        }
    },
    methods: {
        queryClassesForSearch() {
            let id = this.trialCourseId
            getClassesForSearch({ id }).then(res => {
                this.courseList = res.resData
            })
        },
        handleQuery() {
            this.queryClassesForSearch()
            this.getListTrialReport()
        },
        getListTrialReport() {
            getListTrialReport(this.queryParams).then(res => {
                this.labList = res.data.data.list
                this.total = res.data.data.total
            })
        },
        handleCorrention(obj) {
            let { $index } = obj
            const { id } = obj && obj.row
            const { page, limit } = this.queryParams
            let total = this.total
            $index = $index + 1
            this.$emit('handleCorrention', { $index, page, limit, total, id, trialCourseId: this.trialCourseId })
        },
        queryTrialReport(id) {
            this.$emit('queryTrialReport', id)
        },
        //重置，初始换条件和查询
        resetQuery() {
            this.$refs.queryFormRef.resetFields();
            this.queryParams.page = 1;
            this.handleQuery();
        },

        //查询我的实验列表
        async handleQuery() {
            this.queryParams.trialCourseId = this.trialCourseId
            const params = this.queryParams;
            this.loading = true;
            const res = await getListTrialReport(params);
            if (res && res.flag) {
                this.loading = false;
                const resData = res.resData;
                this.labList = resData.list;
                this.total = resData.total;
                this.page = resData.pageNum;
            } else {
                this.loading = false;
            }
        },
        searchQuery(e) {
            this.queryParams.page = e.page;
            this.queryParams.limit = e.limit;
            this.handleQuery();
        },
        handleSelectionChange(val) {
            let ids = [];
            val && val.length > 0 && val.map(item => {
                ids.push(item.id)
            });
            this.ids = ids
        },
        downFileById(id) {
            let ids = [id]
            this.downLoad(ids)
        },
        downLoad(ids) {
            this.downLoading = true
            downLoadReport({ ids }).then(res => {
                if (ids.length == 0) {
                    return
                }
                let type = "application/zip;charset=utf-8"
                if (ids.length == 1) {
                    type = "application/pdf;charset=utf-8"
                }
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
                this.downLoading = false
            });
        },
        downFiles() {
            let ids = this.ids
            // downLoadReport({ ids }).then(res => {
            //     if (res && res.flag) {

            //     }
            // })
            this.downLoad(ids)


        },
    }
}
</script>

<style lang="scss" scoped>
.el-table-edu {
    ::v-deep {
        .el-table {

            height: 400px !important;
            // overflow: auto;

            .el-table__body-wrapper {
                height: 360px !important;
                overflow: auto;
            }
        }


        .el-table__body-wrapper::-webkit-scrollbar {
            width: 8px;
            /*滚动条宽度*/
            height: 8px;
            /*滚动条高度*/
        }

        .el-table__body-wrapper::-webkit-scrollbar-track {
            border-radius: 10px;
            /*滚动条的背景区域的圆角*/
            -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
            background-color: #eeeeee;
            /*滚动条的背景颜色*/
        }

        .el-table__body-wrapper::-webkit-scrollbar-thumb {
            border-radius: 10px;
            /*滚动条的圆角*/
            -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
            background-color: rgb(145, 143, 143);
            /*滚动条的背景颜色*/
        }

    }

}
</style>