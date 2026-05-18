<template>
    <div class="app-container fontW7">
        <el-card>
            <template #header v-if="checkPermission(['edulicense:addLicense'])">
                <el-upload v-permission="['edulicense:addLicense']" class="upload-demo" ref="upload" action :http-request="doUpload" :show-file-list="false"
                    :auto-upload="true">
                    <el-button slot="trigger" type="primary" icon="el-icon-plus">添加许可证</el-button>
                </el-upload>
            </template>
            <el-table :data="courseList" style="width: 100%" v-loading="loading">
                <el-table-column type="index" label="序号" width="55" align="center">

                </el-table-column>
                <el-table-column prop="eduLicense" label="许可证秘钥" min-width="180" align="center">

                    <template #default="scope">
                        <el-popover placement="top-start" title="许可证秘钥" width="200" trigger="hover"
                            :content="scope.row.eduLicense">
                            <div class="view-text" style="width: 200px;height: 20px;" slot="reference">{{
                                scope.row.eduLicense }}</div>
                        </el-popover>

                    </template>
                </el-table-column>i
                <el-table-column prop="maxHostNums" label="最大宿主机台数" min-width="180" align="center">
                    <template #default="scope">
                        <div>{{ scope.row.maxHostNums || 0 }}台</div>
                    </template>
                </el-table-column>
                <el-table-column prop="currentHostNums" label="当前宿主机台数" width="130" align="center">
                    <template #default="scope">
                        <div>{{ scope.row.currentHostNums || 0 }}台</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="200" align="center">
                    <template #default="scope">
                        <div>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="licenseDeadline" label="过期时间" min-width="200" align="center">
                    <template #default="scope">
                        <div>{{ $moment(scope.row.licenseDeadline).format("YYYY-MM-DD HH:mm:ss") }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="状态" min-width="200" align="center">
                    <template #default="scope">

                        <el-button :type="scope.row.index == 0 ? 'primary' : 'warning'" size="mini">{{ scope.row.index == 0
                            ? '生效中' : '已失效' }}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="searchQuery" />
        </el-card>

        <el-card class="marginTop10">
            <template #header>
                <div class="font16">宿主机信息</div>
            </template>
            <el-row class="flex  align-center">
                <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                    <el-tabs tab-position="left" style="height: 200px;" @tab-click="handeClickName">
                        <el-tab-pane v-for="(item, index) in hostSystemList" :key="index" :label="item"></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="8">
                    <el-card style="width:80%" v-loading="cardloading">
                        <div class="flex flex-column justify-between">
                            <!-- <div class="flex">
                                <div class="font14">管理程序：</div>
                                <div>{{ hostSystemInfo.name }}</div>
                            </div> -->
                            <div class="flex">
                                <div class="font14">型号：</div>
                                <div>{{ hostSystemInfo.model }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">处理器类型：</div>
                                <div>{{ hostSystemInfo.cpuModel }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">逻辑处理器：</div>
                                <div>{{ hostSystemInfo.numCpuThreads }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">网卡：</div>
                                <div>{{ hostSystemInfo.numNics }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">设计云：</div>
                                <div>{{ hostSystemInfo.vms }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">状况：</div>
                                <div
                                    :style="{ color: POWERSTATE[hostSystemInfo.connectionState] && POWERSTATE[hostSystemInfo.connectionState].color }">
                                    {{ POWERSTATE[hostSystemInfo.connectionState] &&
                                        POWERSTATE[hostSystemInfo.connectionState].text }}</div>
                            </div>
                            <div class="flex">
                                <div class="font14">正常运行时间：</div>
                                <div>{{ hostSystemInfo.runTimes }}天</div>
                            </div>
                        </div>
                    </el-card>

                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <div>
                        <el-card style="width:80%" v-loading="cardloading">
                            <div>
                                <div class="flex justify-between">
                                    <div class="font14">CPU</div>
                                    <div>可用{{ hostSystemInfo.cpuRest }}GHz</div>
                                </div>
                                <div><el-progress 
                                    :text-inside="true" 
                                    :stroke-width="20"
                                        :percentage="Number((Number(hostSystemInfo.cpuUsage) / Number(hostSystemInfo.cpuCapacity) * 100).toFixed(0)) || 0"></el-progress>
                                </div>
                                <div class="flex justify-between">
                                    <div class="font14">已用{{ hostSystemInfo.cpuUsage }}GHz</div>
                                    <div>容量{{ hostSystemInfo.cpuCapacity }}GHz</div>
                                </div>
                            </div>

                            <div>
                                <div class="flex justify-between">
                                    <div class="font14">内存</div>
                                    <div>可用{{ hostSystemInfo.memoryRest }}GB</div>
                                </div>
                                <div><el-progress 
                                    :text-inside="true" 
                                    :stroke-width="20"
                                    :percentage="Number((Number(hostSystemInfo.memoryUsage) / Number(hostSystemInfo.memoryCapacity) * 100).toFixed(0)) || 0"></el-progress>
                                </div>
                                <div class="flex justify-between">
                                    <div>已用{{ hostSystemInfo.memoryUsage }}GB</div>
                                    <div>容量{{ hostSystemInfo.memoryCapacity }}GB</div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between">
                                    <div class="font14">存储</div>
                                    <div>可用{{ hostSystemInfo.storageRest }}TB</div>
                                </div>
                                <div><el-progress :text-inside="true" :stroke-width="20"
                                        :percentage="Number((Number(hostSystemInfo.storageUsage) / Number(hostSystemInfo.storageCapacity) * 100).toFixed(0)) || 0"></el-progress>
                                </div>
                                <div class="flex justify-between">
                                    <div>已用{{ hostSystemInfo.storageUsage }}TB</div>
                                    <div>容量{{ hostSystemInfo.storageCapacity }}TB</div>
                                </div>
                            </div>
                        </el-card>
                    </div>

                </el-col>
            </el-row>
        </el-card>



        <el-dialog :title="textMap[dialog.status]" :visible.sync="dialog.visible" @close="cancel" class="dialog"
            width="50vw">
            <el-form ref="ruleForm" :model="ruleForm">
                <el-form-item label="当前实例">
                    {{ vmName }}
                </el-form-item>
                <vm-user-list class="vm-user-list" :labelText="''" @clickAddUser="clickAddUser"
                    :userCounts="ruleForm.userCounts" @changeRandom="changeRandom"></vm-user-list>
            </el-form>



            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" v-loading="userLoading" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
    
<script>
const POWERSTATE = {
    'connected': {
        text: '已连接',
        icon: 'el-icon-success',
        color: '#319400'
    },
    'notResponding': {
        text: '未响应',
        icon: 'el-icon-remove',
        color: '#f5222d'
    },
    'disconnected': {
        text: '断开',
        icon: 'el-icon-info',
        color: '#faad14'
    },
}
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import VmUserList from "@/components/VmUserList";

import {
    poweroff,
    poweron,
    reboot,
    suspend,
    getVmsByCurrentUserForPage,
    deleteVMs,
    getVmByVmId,
    changeUserCounts,

} from "@/api/edu/cloud";
import {
    getCourseList,
} from "@/api/edu/course";


import {
    getAllLicense,
    getHostSystemInfos,
    getHostSystemList,
    addLicense
} from "@/api/edu/permit";


import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { isEqual } from 'lodash'
import { Base64 } from 'js-base64'


export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "courseMng",
    components: {
        Pagination,
        VmUserList
    },
    props: {},
    data() {
        return {
            checkPermission,
            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
                params: "",
            },
            queryEnvParams: {
                vmName: '',
                groupId: '',
            },
            loading: false,
            vmsList: [], //设计云列表
            POWERSTATE: POWERSTATE,
            courseList: [],
            textMap: {
                update: `多用户管理`,
                create: `添加`,
                look: '查看'
                // look: "查看告警推送规则",
            },
            dialog: {
                visible: false,
                status: "",
            },
            ruleForm: {
                userCounts: []
            },
            vmId: '',
            vmName: '',
            userLoading: false,



            hostSystemList: [],
            hostSystemInfo: {},
            cardloading: false,
            lBCircle: {
                width: '16px',
                height: '32px',
                borderRadius: '0 16px 16px 0',

            },
            lSCircle: {
                width: '8px',
                height: '16px',
                borderRadius: '0 8px 8px 0',
                top: '6px'
            },
            rBCircle: {
                width: '16px',
                height: '32px',
                borderRadius: '16px 0  0 16px',
                right: '4px'
            },
            rSCircle: {
                width: '8px',
                height: '16px',
                borderRadius: '8px 0  0 8px',
                top: '6px'
            }
        };
    },
    watch: {},
    computed: {},
    created() {
        this.getList();
        this.queryHostSystemList()
    },
    methods: {
        async doUpload(item) {
            let FormDatas = new FormData();
            FormDatas.append("file", item.file);
            console.log('FormDatas', FormDatas);
            addLicense(FormDatas).then(res => {
                let resData = res && res.resData;
                if (res.flag && resData) {
                    this.$message.success("上传成功");
                    this.handleQuery()
                } else {
                    this.$message.error("上传图片出错");
                }
            });


        },
        //getHostSystemList
        queryHostSystemList() {
            getHostSystemList().then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.hostSystemList = resData
                    this.queryHostInfoByName(resData[0])
                }
            })
        },
        queryHostInfoByName(name) {
            this.cardloading = true
            getHostSystemInfos([name]).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.hostSystemInfo = resData[0]
                    this.cardloading = false
                }
            }).finally(() => {
                this.cardloading = false
            })
        },
        handeClickName(e) {
            let name = e.label
            this.queryHostInfoByName(name)
        },

        //
        changeRandom(arr) {
            this.ruleForm.userCounts = arr
        },
        clickAddUser(arr) {
            this.ruleForm.userCounts = arr
        },

        cancel() {
            let _this = this;
            _this.dialog.visible = false

            // _this.dialog = dialog;
            _this.$refs.ruleForm.resetFields();
        },

        async queryVmByVmId(id) {
            const res = await getVmByVmId({ id: id })
            const vmInfo = res && res.resData
            const userCountsToPwd = vmInfo && vmInfo.userCountsToPwd && Base64.decode(vmInfo.userCountsToPwd);
            const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);
            const arr = [];
            if (multiUsers && multiUsers.length > 0) {
                multiUsers.map(item => {
                    let data = {};
                    for (var key in item) {
                        if (!isEqual(key, 'randomPwd') && !isEqual(key, 'userName') && !isEqual(key, 'userId')) {
                            data = {
                                username: key,
                                password: item[key]
                            }
                        }
                    }
                    // data.randomPwd = item.randomPwd;
                    data.randomPwd = false;
                    arr.push(data);
                })
            }
            this.ruleForm.userCounts = arr
            this.dialog.visible = true
            this.dialog.status = 'update'
        },


        handleCommand(command) {
            console.log(command);
            const { text, value } = command && command || ''
            if (text == 'update') {
                this.handleUpdate(value)
            } else if (text == 'poweron') {
                this.handlePoweron(value)
            } else if (text == 'reboot') {
                this.reboot(value)
            } else if (text == 'handleOff') {
                this.handleOff(value)
            } else if (text == 'users') {

                this.queryVmByVmId(value.vmId)
                this.vmId = value.vmId
                this.vmName = value.vmName

            }
        },

        handlePoweron(row) {
            let data = {
                id: row.vmId,
                hostName: row.hostName
            }
            this.$confirm('多用户使用的云服务器，对云服务器的电源操作会影响到所有用户', '确定开机吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                poweron(data).then(res => {
                    if (res && res.flag) {
                        this.$message({
                            type: 'success',
                            message: '云服务器已开机!'
                        });
                        this.getList()
                    } else {
                        this.loading = false;
                    }
                })
            }).catch(() => {

            });
        },
        reboot(row) {
            let vmID = row.vmId
            this.$confirm('多用户使用的云服务器，对云服务器的电源操作会影响到所有用户', '确定重启吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                reboot({ id: vmID }).then(res => {
                    if (res && res.flag) {
                        this.$message({
                            type: 'success',
                            message: '云服务器正在重启!'
                        });
                        this.getList()
                    } else {
                        this.loading = false;
                    }
                })
            }).catch(() => {

            });
        },
        handleOff(row) {
            let vmID = row.vmId

            this.$confirm('多用户使用的云服务器，对云服务器的电源操作会影响到所有用户', '确定关机吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                poweroff({ id: vmID }).then(res => {
                    if (res && res.flag) {
                        this.$message({
                            type: 'success',
                            message: '云服务器已关机!'
                        });
                        this.getList()
                    } else {
                        this.loading = false;
                    }
                })
            }).catch(() => {

            });
        },

        goToEnvDetail(id) {
            this.$router.push({ path: '/cloudEnvironment/cloudEnvDetail', query: { id } });
        },

        goToDetail(id) {
            this.$router.push({ path: '/cloudEnvironment/createEnvironment' });
        },
        async queryCourseList() {


        },
        initParams() {
            let listQuery = {
                page: 1,
                limit: 10,
                params: "",
            };
            this.listQuery = listQuery;
        },
        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            this.getList();
        },
        async getList() {
            this.loading = true;
            const res = await getAllLicense(this.listQuery);
            let courseList = res.resData
            courseList && courseList.length > 0 && courseList.map((item, index) => {
                item.index = index
            })
            this.courseList = courseList
            this.loading = false;
        },
        submitForm() {
            let vmId = this.vmId;
            let userCounts = this.ruleForm.userCounts
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    this.userLoading = true
                    changeUserCounts({ vmId, userCounts }).then(res => {
                        if (res && res.flag) {
                            this.$message.success('多用户修改成功')
                            this.dialog.visible = false
                            this.$refs["ruleForm"].resetFields()
                            this.userLoading = false
                        } else {
                            this.userLoading = false
                        }
                    }).finally(() => {
                        this.userLoading = false
                    })
                }
            });
        },
        handleQuery() {
            this.listQuery.params = this.queryParams;
            this.getList();
        },
        //重置搜索条件
        resetQuery(formName) {
            this.listQuery.params = {};
            this.listQuery.page = 1;
            this.getList();
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            let _this = this;
            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;
        },

        handleUpdate(row) {
            let id = row.vmId
            this.$router.push({ path: '/cloudEnvironment/createEnvironment', query: { id } });
        },


        async handleDelete(row) {
            const { vmId } = { ...row }
            this.$confirm('删除设计云会同步删除该设计云中的所有数据，无法恢复，请慎重选择！', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                deleteVMs([vmId]).then(res => {
                    if (res && res.flag) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.handleQuery({});
                    } else {
                        this.loading = false;
                    }
                })
            }).catch(() => {

            });

        },

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style lang='scss' scoped>


.marginTop10 {
    margin-top: 10px;
}

.vm-user-list {
    ::v-deep {
        .el-form-item__content {
            margin-left: 0;
        }
    }
}

.marginRt20 {
    margin-right: 20px;
}

.search {
    padding: 18px 0 0 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    /* border: 1px solid var(--el-card-border-color); */
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
</style>
    