<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="云环境详情" name="first">
                <env-detail class="env-detail" :envLoading="envLoading" :resetTLoading="resetTLoading"
                    :vmEnvDetail="vmEnvDetail" @handleDeskTopReOpen="handleDeskTopReOpen" @goToNovnc="goToNovnc"
                    :homeNameList="homeNameList" @load="load" :filesList="filesList" @handleAddFile="handleAddFile"
                    :vmId="vmId" :homeworkDialog="homeworkDialog" :commitHomeloading="commitHomeloading"
                    @cancelHome="cancelHome" @submitFormHomeWork="submitFormHomeWork" @showUserInfo="showUserInfo"
                    :userInfo="userInfo" :userInfoDialog="userInfoDialog"
                    @closeUserInfoDialog="closeUserInfoDialog"></env-detail>
            </el-tab-pane>
            <el-tab-pane label="监控" name="second" v-if="userRolesNames != '学生'">
                <monitor :date="date" :echartsLoading="echartsLoading" :canvasWidth="canvasWidth" style="width: 100%;"
                    class="monitor" :vmMonitor="vmMonitor" @changeTime="changeTime"
                    @queryPeriodPerformance="queryPeriodPerformance" :vmId="vmId" :cpuUsage="cpuUsage"
                    :memoryUsage="memoryUsage" :diskUsage="diskUsage" />

            </el-tab-pane>
            <el-tab-pane label="数据快照" name="third" v-if="userRolesNames != '学生'">
                <data-snapshot :vmEnvDetail="snapshotVmEnvDetail" @rebackClose="rebackClose"
                    :dialogRebackVisible="dialogRebackVisible" @handleReback="handleReback" @closeDilog="closeDilog"
                    :dialogFormVisible="dialogFormVisible" @submit="submitUpdateSnapshot"
                    @handleRetentionDaysChange="handleRetentionDaysChange" @querySnapshotList="queryPlicyByVmId"
                    :ruleForm="ruleForm" @handleDelete="handleDeleteSnapshot" @handleDeleteAll="handleDeleteAllSnapshot"
                    :dataSnapshotList="dataSnapshotList" @commitReback="commitReback"
                    :rebackLoading="rebackLoading"></data-snapshot>
            </el-tab-pane>
            <el-tab-pane label="告警策略" name="fourth" v-if="userRolesNames != '学生'">
                <alarm-strategy @alarmClose="alarmClose" :alarmRules="alarmRules" :unit="unit" :levels="levels"
                    :operators="operators" :alarmForm="alarmForm" :dialogAlarmVisible="dialogAlarmVisible"
                    :icSupportAlarmTypes="icSupportAlarmTypes" @addAlarmStrategy="addAlarmStrategy" @changeType="changeType"
                    @commitAlarmStrategy="commitAlarmStrategy" @handleDeleteAlarm="handleDeleteAlarm"
                    @updataAlarm="updataAlarm" :alarmConfigsList="alarmConfigsList"></alarm-strategy>
            </el-tab-pane>
            <el-tab-pane label="告警历史" name="five" v-if="userRolesNames != '学生'">
                <alarm-history :alarmHistoryList="alarmHistoryList" @resetQuery="resetQuery" @searchQuery="searchQuery"
                    @handleQuery="handleQuery" :total="total" :loading="loading"></alarm-history>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import EnvDetail from "@/components/EnvDetail";
import Monitor from "@/components/Monitor";
import DataSnapshot from "@/components/DataSnapshot";
import AlarmStrategy from "@/components/AlarmStrategy";
import AlarmHistory from "@/components/AlarmHistory";


import { mapGetters } from 'vuex'
import { getUserDetailById } from '@/api/system'
import {
    getVmByCourseId,
    getVmByVmId,
    getPolicyByVmId,
    getConsoleForUser,
    restartDesktop,
    vMPerformanceSummary,
    periodPerformance,

    snapshotList,
    deleteSnapshot,
    deleteAllSnapshot,
    updatePolicy,
    getVmInfoBySnapshotName,
    revert,

    validateAlarmName,
    getIcSupportAlarmTypes,
    addOrUpdate,
    getAlarmConfigsByVmId,
    deleteAlarmConfig,
    queryAlarmEvent
} from '@/api/edu/cloud'

import {
    listFile,
    getHomeworks,
    submitHomework
} from '@/api/edu/job'
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { Base64 } from 'js-base64'
import copy from 'copy-to-clipboard';
import { logger } from 'runjs/lib/common';

export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "CloudDetail",
    components: {
        EnvDetail,
        Monitor,
        DataSnapshot,
        AlarmStrategy,
        AlarmHistory
    },
    props: {
        id: {
            default: 0 || '',
            type: Number | String
        }
    },
    data() {
        var checkSAName = (rule, value, callback) => {
            let vmId = this.vmId
            validateAlarmName({ vmId, alarmName: value }).then(res => {
                if (res && res.flag && res.resData) {
                    callback()
                } else {
                    callback(new Error('告警策略名称已存在，请重新输入'));
                }
            })
        }
        return {
            queryParams: {
                startTime: '',
                endTime: ''
            },
            dialog: {
                visible: true,
                status: "",
            },
            textMap: {
                update: "修改课程",
                create: "创建课程",
                look: "查看告警推送规则",
            },
            loading: false,
            form: {
                courseName: "",
                year: '',
                students: [],
            },
            rules: {
                courseName: [
                    {
                        required: true,
                        message: "请输入课程名称",
                        trigger: "blur",
                    },
                ],
                year: [
                    {
                        required: true,
                        message: "请选择学年",
                        trigger: "blur",
                    },
                ],
            },
            activeName: 'first',
            vmId: '',
            vmEnvDetail: {},
            envLoading: false,
            resetTLoading: false,
            userInfo: {},
            userInfoDialog: false,
            /**
             * 监控
             */
            cpuUsage: 0,
            memoryUsage: 0,
            diskUsage: 0,
            vmMonitor: [],
            canvasWidth: '',
            date: [new Date() - 3600 * 1000, new Date().getTime()],
            echartsLoading: false,
            /**
             * 数据快照
             */

            dataSnapshotList: [],
            ruleForm: {
                dayOfWeek: [],
                hours: [],
                retentionDays: 7,
            },
            dialogFormVisible: false,
            dialogRebackVisible: false,
            snapshotVmEnvDetail: {},
            snapshotName: {},
            rebackLoading: false,
            /**
            * 数据快照
            */

            /**
             * 告警策略
             */
            dialogAlarmVisible: false,
            alarmForm: {
                desc: "", //告警描述
                interval: 0,
                levels: "",
                name: "",
                operator: "",
                percent: 0,
                type: "",
            },
            alarmRules: {
                name: [
                    {
                        required: true,
                        message: "请输入策略名称",
                        trigger: "blur",
                    },

                    { validator: checkSAName, trigger: 'blur' }
                ],
                percent: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur",
                    },
                ],

                interval: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur",
                    },
                ],
                levels: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur",
                    },
                ],
            },
            icSupportAlarmTypes: [],
            operators: [],
            unit: '',
            levels: [],
            alarmConfigsList: [],
            listQuery: {
                page: 1,
                limit: 10,
                params: {},
            },
            alarmHistoryList: [],
            total: 0,
            /**
            * 告警策略
            */
            /**
             * 提交作业
             */
            homeNameList: [],
            filesList: [],
            homeworkDialog: false,
            commitHomeloading: false
            /**
           * 提交作业
           */
        };
    },
    watch: {},
    computed: {
        ...mapGetters([
            'userRolesNames',
        ])
    },
    created() {
        //this.vmId = this.$route.query.id
        this.queryEnvDetail(this.id)
        this.queryIcSupportAlarmTypes()
    },
    mounted() {
        let width = document.querySelector(`.env-detail`).offsetWidth
        let canvasWidth = 0
        console.log(width)
        if(width > 1500) {
            canvasWidth = (width - 100) / 2 + 'px'
        }else {
            canvasWidth = (width - 100) + 'px'
        }
        this.canvasWidth = canvasWidth
    },
    methods: {
        /***
         * 提交作业
         */
        cancelHome() {

            this.homeworkDialog = false
            this.filesList = [];

        },
        submitFormHomeWork(params) {
            let vmId = this.vmId
            this.commitHomeloading = true
            submitHomework({ vmId, ...params }).then((response) => {
                if (response && response.flag) {
                    this.$message.success("提交成功");
                }
                this.cancelHome()
                this.commitHomeloading = false
            })
        },
        //根据id获取用户信息
        async showUserInfo(id) {
            const res = await getUserDetailById({ id })
            if (res && res.flag) {
                this.userInfo = res && res.resData
                this.userInfoDialog = true
            }
        },
        closeUserInfoDialog() {
            this.userInfoDialog = false
        },
        handleAddFile() {
            this.queryListFile()
            this.queryHomeWorksNum()
            this.homeworkDialog = true
        },
        //根据课程id获取作业数
        async queryHomeWorksNum() {
            let courseId = this.id;
            const res = await getHomeworks({ courseId });
            let resData = res.resData
            this.homeNameList = resData
        },

        async load({ tree, treeNode, resolve }) {
            const res = await listFile({ id: this.vmId, path: tree.id })
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            resolve(filesList)
        },

        handleFilesList(filesList) {
            filesList && filesList.length > 0 && filesList.map(i => {
                let dir = i.dir
                if (dir) {
                    // i.children = [],
                    i.hasChildren = true
                }
                i.id = i.currentDir + '/' + i.fileName
            })
            return filesList
        },
        async queryListFile(path) {
            const res = await listFile({ id: this.vmId, path })
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            this.filesList = filesList
        },


        /**
         * 告警
         * 
         */

        initParams() {
            let listQuery = {
                page: 1,
                limit: 10,
                params: {},
            };
            this.listQuery = listQuery;
        },
        searchQuery(e) {
            this.listQuery = e;
            console.log(e);
            this.getList()
        },
        getList() {
            console.log(this.vmId);
            this.listQuery.params.vmId = this.vmId
            this.loading = true;
            queryAlarmEvent(this.listQuery).then((reponse) => {
                let resData = reponse.resData;
                this.alarmHistoryList = resData && resData.result;
                this.total = resData.total;
                this.loading = false;
            }).finally(() => {
                this.loading = false;
            });
        },


        handleQuery(e) {
            this.initParams()
            this.listQuery.params = e;
            this.getList()
        },
        //重置搜索条件
        resetQuery() {
            this.listQuery.params = {}
            this.listQuery.page = 1;
            this.getList();
        },


        addAlarmStrategy() {
            this.queryIcSupportAlarmTypes()
            this.dialogAlarmVisible = true
        },
        alarmClose() {
            let alarmForm = {
                desc: "", //告警描述
                interval: 0,
                levels: "",
                name: "",
                operator: "",
                percent: 0,
                type: "",
            }
            this.alarmForm = alarmForm
            this.dialogAlarmVisible = false
        },
        queryIcSupportAlarmTypes() {
            getIcSupportAlarmTypes().then(res => {
                let resData = res && res.resData
                this.icSupportAlarmTypes = resData
                let resDataItem0 = resData && resData[0]
                this.alarmForm.type = resDataItem0.type
                this.alarmForm.operator = resDataItem0.operators[0]
                this.operators = resDataItem0.operators
                this.levels = resDataItem0.levels
                this.alarmForm.levels = resDataItem0.levels[0]
                this.unit = resDataItem0.unit

            })
        },


        changeType(type) {
            let typeList = this.icSupportAlarmTypes
            let list = typeList && typeList.length > 0 && typeList.filter(item => {
                return item.type == type
            })
            let resDataItem0 = list && list[0] || null
            this.alarmForm.type = resDataItem0.type || null
            this.alarmForm.operator = resDataItem0.operators[0] || null
            this.operators = resDataItem0.operators || null
            this.levels = resDataItem0.levels || null
            this.alarmForm.levels = resDataItem0.levels[0] || null
            this.unit = resDataItem0.unit || null

        },
        commitAlarmStrategy(alarmForm) {
            let vmId = this.vmId
            addOrUpdate({ vmId, ...alarmForm }).then(res => {
                if (res && res.flag) {
                    this.$message.success("告警策略添加成功")
                    this.alarmClose()
                    this.queryAlarmConfigsByVmId()
                } else {
                    this.$message.error("告警策略添加失败")
                }
            })

        },
        queryAlarmConfigsByVmId() {
            getAlarmConfigsByVmId({ vmId: this.vmId }).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.alarmConfigsList = resData
                    console.log('alarmConfigsList', resData);
                }
            })
        },

        handleDeleteAlarm(item) {
            const { vmId, alarmId } = item
            deleteAlarmConfig({ vmId, alarmId }).then(res => {
                if (res && res.flag) {
                    this.$message.success("告警策略删除成功")
                    this.queryAlarmConfigsByVmId()
                } else {
                    this.$message.error("告警策略删除失败")
                }
            })
        },
        updataAlarm(item) {
            addOrUpdate(item).then(res => {
                if (res && res.flag) {
                    this.$message.success("告警策略修改成功")
                    this.queryAlarmConfigsByVmId()
                } else {
                    this.$message.error("告警策略修改失败")
                }
            })
        },


        /**
         * 告警
         */
        /**
         * 数据快照
         */
        rebackClose() {
            this.dialogRebackVisible = false
        },
        handleReback(name) {
            getVmInfoBySnapshotName({ name }).then(res => {
                if (res && res.flag) {
                    let vmEnvDetail = res && res.resData

                    if (vmEnvDetail) {
                        this.vmId = vmEnvDetail && vmEnvDetail.vmId
                        let tools = vmEnvDetail.tools
                        vmEnvDetail.tools = tools && JSON.parse(tools) || []
                        let userCountsToPwd = vmEnvDetail && vmEnvDetail.userCountsToPwd && Base64.decode(vmEnvDetail.userCountsToPwd);
                        userCountsToPwd = JSON.parse(userCountsToPwd)
                        userCountsToPwd && userCountsToPwd.map(i => {
                            for (var key in i) {
                                if (key != 'randomPwd' && key != 'userName' && key != 'userId') {
                                    i.accountName = key;
                                    i.accountPwd = i[key];
                                }
                            }
                        })


                        // 
                        vmEnvDetail.password = vmEnvDetail && vmEnvDetail.password && Base64.decode(vmEnvDetail.password);
                        vmEnvDetail.userCountsToPwd = userCountsToPwd
                        console.log('weqweqw',vmEnvDetail);

                        const snapshotArr = vmEnvDetail && vmEnvDetail.snapshotName && vmEnvDetail.snapshotName.split('-');
                        const time = snapshotArr && snapshotArr.length > 0 && snapshotArr.pop();
                        const date = time && this.formatToDate(time);
                        vmEnvDetail.date = date;
                        this.snapshotVmEnvDetail = vmEnvDetail
                        // this.vmEnvDetail = vmEnvDetail
                    }
                }
            })
            this.dialogRebackVisible = true
        },

        formatToDate(str) {
            const year = str.substring(0, 4);
            const month = str.substring(4, 6);
            const day = str.substring(6, 8);
            const hour = str.substring(8, 10);
            const min = str.substring(10, 12);
            const sed = str.substring(12, 14);
            const date = `${year}-${month}-${day} ${hour}:${min}:${sed}`;
            return date;
        },
        queryDataSnapshot() {
            let vmId = this.vmId
            snapshotList({ vmId }).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.dataSnapshotList = resData
                }
            })
        },
        handleDeleteAllSnapshot() {
            let vmId = this.vmId
            deleteAllSnapshot({ vmId }).then(res => {
                this.$message.success("删除成功")
            }).then(() => {
                this.queryDataSnapshot()
            })
        },
        handleDeleteSnapshot(e) {
            let snapshotName = e.name
            let vmID = this.vmId
            this.$message.success("删除中")
            deleteSnapshot({ snapshotName, vmID }).then(res => {
                this.$message.success("删除成功")
                this.queryDataSnapshot()
            })
        },
        handleRetentionDaysChange(val) {
            this.ruleForm.retentionDays = val
        },
        submitUpdateSnapshot(val) {
            let vmId = this.vmId
            let policy = val
            updatePolicy({ vmId, policy }).then(res => {
                if (res && res.flag) {
                    this.$message.success("修改成功")
                    this.dialogFormVisible = false
                }
            })
        },
        // const res1 = await getPolicyByVmId({ id: this.vmId })
        queryPlicyByVmId() {
            let vmId = this.vmId
            getPolicyByVmId({ id: vmId }).then((res) => {
                let policyObj = res.resData
                this.ruleForm.dayOfWeek = policyObj.dayOfWeek || []
                this.ruleForm.hours = policyObj.hours || []
                this.ruleForm.retentionDays = policyObj.retentionDays || 7
                this.dialogFormVisible = true;
            })
        },
        closeDilog() {
            this.dialogFormVisible = false;
        },

        commitReback(snapshotName) {
            let vmID = this.vmId
            this.rebackLoading = true
            revert({ snapshotName, vmID }).then((res) => {
                if (res && res.flag) {
                    this.$message.success("VM恢复成功")
                    this.rebackClose()
                    this.rebackLoading = false
                } else {
                    this.$message.error("VM恢复失败")
                    this.rebackLoading = false

                }
            }).finally(res => {
                this.rebackLoading = false
            })
        },


        /**
         * 数据快照
         */
        /**
         * 监控1
         */
        queryVMPerformanceSummary(obj) {
            vMPerformanceSummary(obj).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    let cpuUsage = resData && resData.cpuUsage
                    let memoryUsage = resData && resData.memoryUsage
                    let diskUsage = resData && resData.diskUsage
                    this.cpuUsage = cpuUsage
                    this.memoryUsage = memoryUsage
                    this.diskUsage = diskUsage
                }
            })
        },


        queryPeriodPerformance(obj) {
            let startTime = this.$moment(obj && obj.startTime).format("YYYY-MM-DD HH:mm:ss")
            let endTime = this.$moment(obj && obj.endTime).format("YYYY-MM-DD HH:mm:ss")
            let vmId = obj && obj.vmId
            let params = {
                vmId,
                startTime,
                endTime
            }
            this.echartsLoading = true
            periodPerformance(params).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.vmMonitor = resData
                    this.echartsLoading = false
                }
            }).finally(() => {
                this.echartsLoading = false
            })
        },
        changeTime(obj) {
            this.date = [obj.startTime, obj.endTime]
            this.queryPeriodPerformance(obj)
        },

        /**
         * 监控2
         */
        handleClick(e) {
            let name = e && e.name
            if (name == 'first') {

            } else if (name == 'second') {
                let vmId = this.vmId
                let startTime = this.date[0]
                let endTime = this.date[1]
                this.queryVMPerformanceSummary({ vmId })
                this.queryPeriodPerformance({ vmId, startTime, endTime })

            } else if (name == 'third') {
                this.queryDataSnapshot()
            } else if (name == 'fourth') {
                this.queryAlarmConfigsByVmId()
            } else if (name == 'five') {
                this.getList()
            }


        },
        handleDeskTopReOpen(username) {
            let vmId = this.vmId
            let params = {
                username,
                vmId
            }
            this.resetTLoading = true
            restartDesktop(params).then(res => {
                if (res && res.flag) {
                    this.$message.success("桌面重启中")
                    this.resetTLoading = false
                }
            }).finally(() => {
                this.resetTLoading = false
            })
        },
        goToNovnc(username) {
            let isLicenseEnabled = this.$store.state.user.isLicenseEnabled
            if (!isLicenseEnabled) {
                this.$message.warning('抱歉，系统已过期，需联系官方工作人员续费')
                return
            }
            let params = {
                username, vmId: this.vmId
            }
            getConsoleForUser(params).then(res => {
                // copy(res.resData) && 
                this.$message.success(`成功获取用户 ${username} 远程连接地址`);
                window.open(res.resData, '_blank')
            })
        },
        //查询云环境详情
        async queryEnvDetail(id) {
            this.envLoading = true
            let vmId = id.toString()
            let index = vmId.indexOf('vm')
            let res = ''
            if (vmId && index != -1) {
                res = await getVmByVmId({ id: vmId })
            } else {
                res = await getVmByCourseId({ id: vmId })
            }


            let vmEnvDetail = res && res.resData
            if (vmEnvDetail) {
                this.vmId = vmEnvDetail && vmEnvDetail.vmId
                let tools = vmEnvDetail.tools
                vmEnvDetail.tools = tools && JSON.parse(tools) || []
                let userCountsToPwd = vmEnvDetail && vmEnvDetail.userCountsToPwd && Base64.decode(vmEnvDetail.userCountsToPwd);
                userCountsToPwd = JSON.parse(userCountsToPwd)
                userCountsToPwd && userCountsToPwd.map(i => {
                    for (var key in i) {
                        console.log(key);
                        if (key != 'randomPwd' && key != 'userName' && key != 'userId') {
                            i.accountName = key;
                            i.accountPwd = i[key];
                        }
                    }
                })
                vmEnvDetail.password = vmEnvDetail && vmEnvDetail.password && Base64.decode(vmEnvDetail.password);
                vmEnvDetail.userCountsToPwd = userCountsToPwd
                this.vmEnvDetail = vmEnvDetail
                console.log(vmEnvDetail);
                this.envLoading = false
            } else {
                this.envLoading = false
            }

        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },


        goToDetail(id) {
            this.$router.push({ path: '/cloudEnvironment/createEnvironment', query: { id } });
            // router.push({ name: 'user', params: { userId: 123 }})
        },
        //修改课程
        updataCourse() {
            let _this = this;

            let dialog = {
                status: "update",
                visible: true,
            };
            _this.dialog = dialog;
        },






        // initParams() {
        //     let listQuery = {
        //         page: 1,
        //         limit: 10,
        //         params: "",
        //     };
        //     this.listQuery = listQuery;
        // },
        // searchQuery(e) {
        //     this.listQuery.page = e.page;
        //     this.listQuery.limit = e.limit;
        //     this.getList();
        // },
        // getList() {
        //     this.loading = true;
        //     getPages(this.listQuery).then((reponse) => {
        //         let resData = reponse.resData;
        //         this.alarmPushList = resData.records;
        //         this.total = resData.total;
        //         this.loading = false;
        //     });
        // },
        submitForm() {
            this.$refs["alarmRuleForm"].validate((valid) => {
                console.log(valid);
                if (valid) {
                    if (this.dialog.status == "update") {
                        console.log("this.alarmRuleForm", this.alarmRuleForm);
                        modifyOneAlarmRule(this.alarmRuleForm).then((reponse) => {
                            if (reponse && reponse.flag) {
                                this.dialog.visible = false;
                                this.$message.success("修改成功");
                                this.getList();
                            }
                        });
                    } else if (this.dialog.status == "create") {
                        addAalarmPushRule(this.alarmRuleForm).then((reponse) => {
                            if (reponse && reponse.flag) {
                                this.dialog.visible = false;
                                this.$message.success("添加成功");
                                this.getList();
                            }
                        });
                    }
                }
            });
        },
        cancel() {
            let _this = this;
            let dialog = {
                visible: false,
            };
            _this.dialog = dialog;

            _this.$refs.alarmRuleForm.resetFields();
        },
        // handleQuery() {
        //     this.listQuery.params = this.queryParams;
        //     this.getList();
        // },
        // //重置搜索条件
        // resetQuery(formName) {
        //     this.listQuery.params = [];
        //     this.getList();
        //     this.$refs[formName].resetFields();
        // },
        handleAdd() {
            let _this = this;

            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;
        },

        handleUpdate(row) {
            let _this = this;
            let dialog = {
                status: "update",
                visible: true,
            };
            _this.dialog = dialog;
            //this.temp = Object.assign({}, row)
            _this.projectForm = Object.assign({}, row);
        },

        handleDelete(row) { },

    },
};
</script>
<style lang='scss' scoped>
.marginTop10 {
    margin-top: 10px;
}

.marginRt20 {
    margin-right: 20px;
}

.marginBottom20 {
    ::v-deep {
        .el-card__body {
            padding: 10px 20px;
        }
    }

}

.el-form-item {
    margin-bottom: 0px
}

.dialog {
    ::v-deep {
        .el-dialog {
            max-height: 80vh;
            overflow: auto;
        }

        // .el-dialog__footer {
        //   position: absolute;
        //   bottom: 0px;
        //   right: 0px
        // }
    }

    &-form {
        width: 50%;
    }
}

.dialog-form {
    width: 100%;
}

.dialog-userContainer {
    border: 1px solid #ccc;
    padding: 10px;
    height: 200px;
    max-height: 30vh;
    overflow: auto;

    &-tag {
        margin-right: 5px;
    }
}

.marginBottom10 {
    margin-bottom: 10px;
}
</style>
    