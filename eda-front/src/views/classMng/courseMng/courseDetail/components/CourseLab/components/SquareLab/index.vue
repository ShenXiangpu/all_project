<template>
    <div class="app-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <!-- <el-form-item label="关联课程" prop="courseId">
                <el-select @change="onCourseChange" class="el-form-input-edu" v-model="ruleForm.courseId">
                    <el-option label="" value="">请选择</el-option>
                    <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="选择实验" prop="trialIds">
                <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false"
                    :isBgShow="false">
                    <template #content>
                        <div class="" style="padding: 20px 0 10px 10px;">
                            <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                                <el-form-item label="实验名称" prop="trialName">
                                    <el-input v-model="queryParams.trialName" id="keyword" name="keyword"
                                        placeholder="请输入实验名称" clearable @keyup.enter="handleQuery" />
                                </el-form-item>

                                <el-form-item label="创建人" prop="createBy">
                                    <el-select v-model="queryParams.createBy" placeholder="请选择创建人">
                                        <el-option v-for="item in createByList" :key="item.id" :label="item.userName"
                                            :value="item.id">
                                        </el-option>

                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="是否公开" prop="ofPublic">
                                    <el-select v-model="queryParams.ofPublic" placeholder="请选择状态">
                                        <el-option label="" value="">全部</el-option>
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="0"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <!-- <el-form-item label="关联课程" prop="courseId">
                                    <el-select placeholder="请选择课程" v-model="queryParams.courseId">
                                        <el-option label="" value="">请选择</el-option>
                                        <el-option v-for="item in courseList" :key="item.id" :label="item.name"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item>
                                    <el-button type="success" class="editSuccess" icon="el-icon-search"
                                        @click="handleQuery">搜索</el-button>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                                        @click="resetQuery()">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </template>

                </border-container>
                <el-card class="my-lab-card-body">
                    <div>
                        <el-table ref="multipleTable" v-loading="loading" :data="labList" tooltip-effect="dark"
                            style="width: 100%;" class="el-table-edu" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55" align="center">
                            </el-table-column>
                            <el-table-column label="实验名称" min-width="120" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class="pointer primaryColor" @click="openDrawer(scope.row)">{{ scope.row.trialName
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createByName" align="center" label="创建人" min-width="120"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="recommendStandard" align="center" label="推荐配置" min-width="120"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="oneTrialCourseHasUserCount" align="center" min-width="120" label="实验人次"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class="">{{ scope.row.userCountInfo.oneTrialAllCourseFinish || 0
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createAt" label="创建时间" align="center" min-width="120"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-form-item>

            <el-form-item>
                <el-button :loading="btnLoading" type="primary" @click="submitForm('ruleForm')">{{ trialId && trialId != 0 ?
                    '立即修改' : '立即创建'
                }}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>

        <el-drawer @closed="closeDrawer" @opend="opendDrawer" append-to-body size="800px" :visible.sync="drawer" direction="rtl"
            :show-close="false">
            <div class="app-container" style="overflow: auto;height: 90vh;">
                <div class="drawer-title font20 primaryBgColor marginBottom20">{{ trialDetail.trialName }}</div>
                <h2 class="marginBottom10">实验介绍</h2>
                <!-- <div class="drawer-desc font20  marginBottom20">{{ trialDetail.trialDescription }}</div>
                <h2 class="marginBottom10">实验手册</h2> -->
                <div v-if="drawer" class="drawer-richText">
                    <edu-tinymce ref="edu-tinymce" class="edu-tinymce" :disabled="true"
                        :value='trialDetail && trialDetail.trialDescription'></edu-tinymce>
                </div>

                <!-- <div v-html="trialDetail.manualContent"></div> -->
            </div>
        </el-drawer>
    </div>
</template>

<script>
import EduTinymce from "@/components/Edu-tinymce";
import { getCourseForHomeWork } from "@/api/edu/course"
import BorderContainer from "@/components/BorderContainer";
import {
    createBy,
    getSquare4ForkList,
    handleTrial2,
    oneDetail,
    oneTrialTempInfo
} from "@/api/edu/labCenter";
import {
    getVmByCourseId,
} from '@/api/edu/cloud'
export default {
    components: {
        BorderContainer,
        EduTinymce
    },
    props: {
        courseId: {
            default: '0' | 0,
            type: String | Number
        }
    },
    data() {
        return {
            drawer: false,
            trialId: 0,
            btnLoading: false,
            loading: false,
            multipleSelection: [],
            createByList: [],
            queryParams: {
                trialName: '',
                createBy: '',
                ofPublic: '',
            },
            labList: [],
            ruleForm: {
                courseId: '', //课程id
                trialIds: []
            },
            rules: {

                trialIds: [
                    { required: true, message: '请选择实验', trigger: 'blur' }
                ],

            },
            courseList: [],
            trialDetail: {},
        }
    },
    mounted() {
        this.queryCourses();
        this.queryCreateBy();
        this.handleQuery()
    },
    methods: {
        async onCourseChange(val) {
            let res = await getVmByCourseId({ id: val })
            if (!(res && res.flag)) {
                this.$refs['ruleForm'].resetFields();
                return
            }
            this.ruleForm.courseId = val;
            this.handleQuery()
        },
        closeDrawer() {
            this.drawer = false;
        },
        openDrawer(row) {

            oneTrialTempInfo(row.trialId).then(res => {
                if (res && res.flag) {
                    this.trialDetail = res && res.resData
                    this.drawer = true;
                }
            })
        },
        opendDrawer(){
           
        },
        submitForm(formName) {
            this.btnLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.courseId = this.courseId;
                    console.log(this.ruleForm);
                    handleTrial2(this.ruleForm).then(res => {
                        if (res && res.flag) {
                            this.$message.success(`实验添加成功`)
                            this.btnLoading = false;
                            this.$emit('handleClose')
                            this.$emit('queryList')
                        } else {
                            this.btnLoading = false;
                        }
                    }).finally(() => {
                        this.btnLoading = false;
                    })
                } else {
                    console.log('error submit!!');
                    this.btnLoading = false;
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.multipleTable.clearSelection();
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
            let trialIds = []
            val && val.map(item => {
                trialIds.push(item.trialId)
            })
            this.ruleForm.trialIds = trialIds
        },
        queryCreateBy() {
            createBy({ ofPublic: 1 }).then(res => {
                this.createByList = res && res.resData;
            })
        },
        queryCourses() {
            getCourseForHomeWork('').then(res => {
                this.courseList = res && res.resData;
            })
        },

        //

        //重置，初始换条件和查询
        resetQuery() {
            this.$refs.queryFormRef.resetFields();
            this.handleQuery();
        },

        //查询我的实验列表
        async handleQuery() {
            const params = this.queryParams;
            this.loading = true;
            const res = await getSquare4ForkList(params);
            if (res && res.flag) {
                this.loading = false;
                const resData = res.resData;
                this.labList = resData;
            } else {
                this.loading = false;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.el-table-edu {

    // height: 500px;
    // overflow: auto;
    ::v-deep {
        .el-table__body-wrapper {
            height: calc(100vh - 700px);
            overflow-y: auto;
            min-height: 200px;
        }
    }

}

.el-drawer {}

.drawer-title {
    width: 100%;
    // margin: 0 auto;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
    border-radius: 6px;
}

.drawer-desc {
    width: 100%;
    border: 1px dotted #d9d9d9;
    padding: 10px;
}

.drawer-content {
    width: 100%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    color: #fff;
}

.edu-tinymce {
    ::v-deep {

        .tox,
        .tox-tinymce {
            height: calc(100vh - 350px) !important;
            min-height: 300px !important;
            width: 100% !important;
        }
    }
}
</style>