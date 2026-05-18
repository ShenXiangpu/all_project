<template>
    <div>
        <el-card class="" v-loading="loading" element-loading-text="请稍后..." element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div v-show="activeValue == 0">
                    <el-form-item label="领域选择" prop="areaType">
                        <el-radio-group v-model="ruleForm.areaType" id="areaType">
                            <el-radio-button label="集成电路方向" value="集成电路方向"></el-radio-button>
                            <!-- <el-radio-button label="计算机方向"></el-radio-button> -->
                        </el-radio-group>
                    </el-form-item>
                    <el-divider></el-divider>
                    <div v-if="ruleForm.areaType == '集成电路方向'">
                        <el-form-item label="工具选择" prop="companyName">
                            <el-radio-group v-model="ruleForm.companyName" @change="queryToolsList">
                                <el-radio-button v-for="(item, index) in edaToolsList" :id="item.company" :key="index"
                                    :label="item.company">{{ item.company }}</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="" prop="toolsList">
                            <version-select id="toolsList" @handleChangeToolVersion="handleChangeToolVersion"
                                :toolsList="toolsList" @checkThisTools="checkThisTools"></version-select>
                        </el-form-item>

                        <el-divider></el-divider>
                    </div>

                    <!-- <div v-if="ruleForm.areaType == '计算机方向'">
                        <el-form-item label="工具选择" prop="name">
                            <el-radio-group>
                                <el-radio-button label="Python"></el-radio-button>
                                <el-radio-button label="Java"></el-radio-button>
                                <el-radio-button label="C++"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-divider></el-divider>
                    </div> -->

                    <el-form-item label="实例规格">
                        <div class="flex" style="width: 600px;padding: 0 20px 0 0px;">
                            <el-select @change="queryStandardsListBy" style="width: 130px;"
                                v-model="queryParams.cpuCoreCount" placeholder="请选择" id="cpuCoreCount">
                                <el-option label="全部CPU" value="">
                                </el-option>
                                <el-option v-for="item in cpuList" :key="item" :label="item + ' 核'" :value="item">
                                </el-option>
                            </el-select>
                            <el-select @change="queryStandardsListBy" style="width: 130px;margin-left: 20px;"
                                v-model="queryParams.memorySize" placeholder="请选择" id="memorySize">
                                <el-option label="全部内存" value="">
                                </el-option>
                                <el-option v-for="item in  memoryList" :key="item" :label="item + ' G'" :value="item">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-table class="el-table-container" ref="singleTable" border :data="vmStandardsList"
                             @current-change="handleCurrentChange" @row-click="handleSelectionChange"
                            max-height="300">
                            <el-table-column ref="chooseCurrent" label="选择" align="center" width="65">
                                <template #default="scope">
                                    <el-radio :label="scope.row.id" v-model="flavorId"
                                        @change.native="getCurrentRow(scope.row)">{{ "" }}</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column property="familyLabel" label="机型" min-width="120">
                            </el-table-column>
                            <el-table-column property="instanceStandards" label="设计云规格" min-width="120">
                            </el-table-column>
                            <el-table-column property="cpuCoreCount" label="vCPU">
                                <template #default="scope">
                                    <div>{{ scope.row.cpuCoreCount }} 核</div>
                                </template>
                            </el-table-column>
                            <el-table-column property="memorySize" label="内存">
                                <template #default="scope">
                                    <div>{{ scope.row.memorySize }} GB</div>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="当前选择实例" prop="region">
                        {{ currentRow && currentRow.cpuCoreCount && `${currentRow && currentRow.cpuCoreCount}核
                                                ${currentRow && currentRow.memorySize}GB ${currentRow && currentRow.familyLabel}` || '暂无数据' }}
                    </el-form-item>


                    <el-divider></el-divider>
                    <el-form-item label="镜像" prop="region">
                        <el-radio-group v-model="ruleForm.text" id="region">
                            <el-radio-button label="公共镜像"></el-radio-button>
                        </el-radio-group>

                        <div class="flex" style="width: 600px;padding: 0 20px 0 0px; margin-top:20px">
                            <el-select id="CentOS" style="width: 300px;margin-right:20px" v-model="value1"
                                placeholder="请选择">
                                <el-option label="CentOS">
                                </el-option>
                            </el-select>
                            <el-select style="width: 300px;margin-right:20px" v-model="value2" placeholder="请选择">
                                <el-option id="CentOSss" label="64位">
                                </el-option>
                            </el-select>
                            <el-select id="CentOS34234" style="width: 300px;" v-model="value3" placeholder="请选择">
                                <el-option label="CentOS 7 64位">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="数据盘" prop="diskSizeMB">
                        <el-popover placement="top-start" title="容量范围" width="200" trigger="hover"
                            :content="`${rebackDiskSizeMB}GB ~ 1024GB`">
                            <el-input-number slot="reference" v-model="ruleForm.diskSizeMB" style="width: 120px;"
                                controls-position="right" @change="handleDiskSizeMBChange" :min="rebackDiskSizeMB"
                                :max="1024"></el-input-number>
                        </el-popover> &nbsp;GB

                    </el-form-item>

                    <el-divider></el-divider>
                    <el-form-item label="快照服务">
                        <el-form-item label="备份日期" prop="dayOfWeek">

                            <el-checkbox-group id="dayOfWeek" v-model="ruleForm.dayOfWeek">
                                <el-checkbox v-for="item in weekOptions" :key="item.value" :label="item.value"
                                    name="type">{{ item.label }}</el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>

                        <el-form-item label="备份时间点" prop="hours">

                            <el-checkbox-group id="hours" v-model="ruleForm.hours">

                                <el-checkbox v-for="item in hourOptions" :key="item.value" :label="item.value"
                                    name="type">{{ item.label }}</el-checkbox>

                            </el-checkbox-group>

                        </el-form-item>

                        <el-form-item label="快照保留时间" prop="region">
                            保留<el-input-number id="region" v-model="ruleForm.retentionDays"
                                style="width:120px;margin:0 10px" controls-position="right"
                                @change="handleRetentionDaysChange" :min="1"></el-input-number>天后自动删除
                        </el-form-item>

                    </el-form-item>


                    <el-divider></el-divider>
                    <div class="text-center">
                        <el-button @click="goToLastPage">取消</el-button>
                        <el-button v-if="!vmId" type="primary" @click="next">下一步</el-button>
                        <el-button v-else type="primary" :loading="loading" @click="next">修改</el-button>

                    </div>

                </div>


                <div v-show="activeValue == 1">

                    <!-- <el-form-item label="网络" prop="name">
                        <el-radio-group v-model="ruleForm.net">
                            <el-radio-button label="专有网络"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="带宽" prop="name">
                        <el-radio-group v-model="ruleForm.netName" @change="handleNeNameId($event)">
                            <el-radio-button v-for="(item, index) in netWordList" :key="index"
                                :label="item.flavorName"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-divider></el-divider> -->
                    <el-form-item label="设计云名称" prop="vmName">
                        <el-input id="vmNamea" style="width:300px" v-model="ruleForm.vmName"
                            placeholder="请输入设计云名称"></el-input>
                        <div style="color:#999;font-size:12px">2～80个字符，以大小写字母或中文开头，可包含数字、点号（.）、下划线（_）、半角冒号（:）或连字符（-）</div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="描述" prop="annotation">
                        <el-input type="textarea" id="annotation" style="width:300px"
                            v-model="ruleForm.annotation"></el-input>
                        <div style="color:#999;font-size:12px">长度为2～255个字符，不能以http://或https://开头</div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="主机名称" prop="hostName">
                        <el-input style="width:300px" id="hostName" v-model="ruleForm.hostName"
                            placeholder="请输入主机名称"></el-input>
                        <div style="color:#999;font-size:12px">Linux 等其他操作系统：长度为 1～63
                            个字符，允许使用大小写字母、数字或连字符（-）和点号（.），但不能连续使用点号（.），连字符（-）前后不能是点号（.）。不能以数字、点号（.）或连字符（-）开头或结尾。</div>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="设计云人数" prop="maxUserCounts">
                        人数上限 &nbsp;<el-input-number id="maxUserCounts" v-model="ruleForm.maxUserCounts"
                            style="width:120px;margin:0 10px" controls-position="right" @change="handleMaxUserCountsChange"
                            :min="1" :max="10"></el-input-number>&nbsp;<span
                            style="color:#f00;font-size:12px">注意：该处为每台设计云支持的使用人数范围，最小值1，最大值为10</span>
                    </el-form-item>


                    <el-divider></el-divider>
                    <el-form-item label="选择lab" prop="eduLibs">
                        <el-button size="small" type="primary" @click="handleAdd">选择lab</el-button>
                        <div>

                            <el-tag @close="removeLabList(tag)" style="margin-right:10px" v-for="tag in ruleForm.eduLibs"
                                :key="tag.id" closable>
                                {{ tag.displayName }}
                            </el-tag>
                        </div>
                    </el-form-item>



                    <el-divider></el-divider>
                    <div class="text-center">
                        <el-button @click="goToLastPage">取消</el-button>
                        <el-button type="primary" @click="activeValue = 0">上一步</el-button>
                        <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                    </div>

                </div>
            </el-form>
        </el-card>
        <el-dialog :title="textMap[dialog.status]" :visible.sync="dialog.visible" @close="cancel" class="dialog"
            width="60vw">

            <el-table border :data="labsList" ref="multipleTable" @selection-change="handleSelectionLab" style="width: 100%"
                height="300">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="displayName" label="文件名称" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="fileSize" label="文件大小" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="createAt" label="创建时间" align="center" min-width="180">
                </el-table-column>

            </el-table>


            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="getLabList">确 定</el-button>
            </span>
        </el-dialog>



        <el-dialog title="关机提示" :visible.sync="isShowDialog" @close="dialogCancel" class="dialog" width="700px">

            <div style="background-color: rgb(231,244,255);color: #005ec3;padding: 10px;margin-bottom: 10px;">
                <div><i class="el-icon-warning primaryColor"></i>当前操作需要实例在关机状态下进行：</div>
                <ul style="padding:0 0 0  20px">
                    <li style="padding:5px 0">1、避免数据丢失，实例将关机中断您的业务，请仔细确认。</li>
                    <li style="padding:5px 0">2、强制关机可能会导致数据丢失或文件系统损坏，您也可以主动关机后再进行操作。</li>
                    <li style="padding:5px 0">3、强制关机可能需要您等待较长时间，请耐心等待。</li>
                </ul>
            </div>
            <div>强制关机<span style="color: #f00;margin-right: 20px;">*</span> <el-checkbox v-model="updateChecked"
                    id="updateChecked">同意强制关机</el-checkbox></div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="confirmUpdate" :disabled="!updateChecked">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import VersionSelect from "./components/VersionSelect";
import { mapGetters } from 'vuex'
import {
    edaTools,
} from "@/api/edu/tool";
import {
    getOenList,
} from "@/api/edu/lab";
import {
    getVmStandards,
    getVmTypes,
    network,
    validateVmName,
    checkHostname,
    cn2py,
    createVM,
    getVmByVmId,
    getPolicyByVmId,
    reConfig
} from '@/api/edu/cloud'
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";

const weekOptions = [
    { label: '每周日', value: 1 },
    { label: '每周一', value: 2 },
    { label: '每周二', value: 3 },
    { label: '每周三', value: 4 },
    { label: '每周四', value: 5 },
    { label: '每周五', value: 6 },
    { label: '每周六', value: 7 },
];

const hourOptions = [
    { label: '00:00', value: 0 },
    // { label: '01:00', value: 1 },
    // { label: '02:00', value: 2 },
    // { label: '03:00', value: 3 },
    { label: '04:00', value: 4 },
    // { label: '05:00', value: 5 },
    // { label: '06:00', value: 6 },
    // { label: '07:00', value: 7 },
    { label: '08:00', value: 8 },
    // { label: '09:00', value: 9 },
    // { label: '10:00', value: 10 },
    // { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    // { label: '13:00', value: 13 },
    // { label: '14:00', value: 14 },
    // { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    // { label: '17:00', value: 17 },
    // { label: '18:00', value: 18 },
    // { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
    // { label: '21:00', value: 21 },
    // { label: '22:00', value: 22 },
    // { label: '23:00', value: 23 },
];

export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "createEnvironment",
    components: {
        Pagination,
        VersionSelect
    },
    props: {},
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    data() {
        var checkVmName = (rule, value, callback) => {
            validateVmName({ vmName: value }).then(res => {
                if (res && res.flag && res.resData) {
                    callback()
                } else {
                    callback(new Error('设计云名称已存在，请重新输入'));
                }
            })
        }
        var validateHostName = (rule, value, callback) => {
            checkHostname({ hostname: value }).then(res => {
                if (res && res.flag && res.resData) {
                    callback(new Error(`主机名已存在，请重新输入。（推荐输入：${res.resData}）`));
                } else {
                    callback()

                }
            })
        }
        return {
            groupId: '',
            createVMInfo: {},
            vmStandardsList: [],
            vmTypesList: [],
            cpuList: [],
            flavorTypeList: [],
            memoryList: [],


            flavorId: 0, //实例规格id
            weekOptions: weekOptions,
            hourOptions: hourOptions,
            netWordList: [],
            edaToolsList: [],
            originEdaToolsList: [],
            toolsList: [],

            currentRow: null,

            value: '',
            text: 40,

            activeValue: 0,
            total: 0,
            queryParams: {
                status: 1,
                cpuCoreCount: '',
                memorySize: ''

            },
            dialog: {
                visible: false,
                status: "",
            },

            textMap: {
                update: "",
                create: "添加Lab",
                look: "",
            },
            loading: false,
            form: {},
            ruleForm: {
                areaType: '集成电路方向',
                companyName: '',
                toolsList: [],
                vmType: '全部机型',
                text: '公共镜像',
                diskSizeMB: 40,
                dayOfWeek: [],
                hours: [],
                retentionDays: 7,
                net: "专有网络",
                netName: '',
                vmName: '',
                annotation: '',
                hostName: '',
                maxUserCounts: '10',
                eduLibs: []
            },
            cpuCount: "",
            memorySizeMB: "",
            rules: {

                vmName: [
                    {
                        required: true,
                        message: "请输入设计云名称",
                        trigger: "blur",
                    },
                    {
                        pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
                        message: '请按规则重新设置实例名称'
                    },
                    { validator: checkVmName, trigger: 'blur' }
                ],

                annotation: [
                    {
                        pattern: /^(?=[\s\S]{2,255}$)(?!(http:\/\/)|(https:\/\/))[\w\W]*$/,
                        message: '请按规则重新填写描述信息'
                    }
                ],
                hostName: [
                    {
                        required: true,
                        message: "请输入主机名",
                        trigger: "blur",
                    },
                    {
                        pattern: /^(?=[\S]{1,63}$)[A-Za-z]+((-(?!\.)|\.(?!-|\.))*[\dA-Za-z]+)*$/,
                        message: '请按规则重新设置主机名'
                    },
                    {
                        validator: validateHostName, trigger: 'blur'
                    }
                ]

            },

            rebackDiskSizeMB: 40,
            activeName: 0,

            value1: 'CentOS',
            value2: '64位',
            value3: 'CentOS 64位',
            labsList: [],
            labSelectList: [],
            choosesEdaToolsList: [],

            updateChecked: false,

            isShowDialog: false
        };

    },
    watch: {},

    created() {

        this.vmId = this.$route.query.id
        this.groupId = this.$route.query.courseId


        this.queryCompanyToolsList()
        this.queryVmTypes()
        this.queryStandardsListBy()
        this.queryNetword()
    },
    methods: {
        // 关闭关机提示
        dialogCancel() {
            this.isShowDialog = false
            this.updateChecked = false
        },
        confirmUpdate() {
            let updateVMInfo = {
                policy: {
                    dayOfWeek: this.ruleForm.dayOfWeek,
                    hours: this.ruleForm.hours,
                    retentionDays: this.ruleForm.retentionDays
                },
                cpu: this.cpuCount,
                disk: this.ruleForm.diskSizeMB,
                edaTools: this.choosesEdaToolsList,
                flavorId: this.flavorId,
                memory: this.memorySizeMB,
                vmId: this.vmId
            }
            this.loading = true
            this.isShowDialog = false
            reConfig(updateVMInfo).then(res => {
                if (res && res.flag) {
                    this.$message.success("修改成功")
                    this.$router.back()
                    this.loading = false
                }
            }).catch(() => {
                this.loading = false
            }).finally(() => {
                setTimeout(() => {
                    this.loading = false
                }, 1000);
            })
        },
        goToLastPage() {
            this.$router.back()
        },
        //修改设计云
        reBackVmDetail(obj, policyObj) {
            console.log(obj, policyObj);
            this.ruleForm.annotation = obj.annotation
            this.cpuCount = obj.cpu
            this.ruleForm.diskSizeMB = obj.disk / 1024
            this.rebackDiskSizeMB = obj.disk / 1024
            this.choosesEdaToolsList = JSON.parse(obj.tools)
            this.flavorId = obj.flavorId
            //回显当前选择实例

            let vmStandardsList = this.vmStandardsList

            let row = vmStandardsList && vmStandardsList.filter(item => {
                return item.id == this.flavorId
            })
            this.$refs.singleTable.setCurrentRow(row[0]);
            this.currentRow = row[0]



            this.groupId = obj.groupId
            this.ruleForm.hostName = obj.hostname
            this.ruleForm.maxUserCounts = 10
            this.memorySizeMB = obj.memory / 1024
            this.ruleForm.vmName = obj.vmName;
            this.ruleForm.dayOfWeek = policyObj.dayOfWeek || []
            this.ruleForm.hours = policyObj.hours || []
            this.ruleForm.retentionDays = policyObj.retentionDays || 7
            this.ruleForm.eduLibs = obj.libInfoList
            let createVMInfo = {
                autoSnapshotPolicy: {
                    dayOfWeek: this.ruleForm.dayOfWeek,
                    hours: this.ruleForm.hours,
                    retentionDays: this.ruleForm.retentionDays
                },
                maxUserCounts: this.ruleForm.maxUserCounts,
            }

        },
        handleNeNameId(e) {
            this.netWordList.map(item => {
                if (item.flavorName == e) {
                    this.netNameId = item.id
                }
            })
        },
        handleMaxUserCountsChange(val) {
            this.ruleForm.maxUserCounts = val
        },
        //
        handleRetentionDaysChange(val) {
            this.ruleForm.retentionDays = val
        },
        //
        handleDiskSizeMBChange(val) {
            this.ruleForm.diskSizeMB = val
        },
        //

        removeLabList(item) {
            let list = this.ruleForm && this.ruleForm.eduLibs.filter(i => {
                return item.id != i.id
            })
            this.ruleForm.eduLibs = list
        },
        getLabList() {
            this.ruleForm.eduLibs = this.labSelectList
            this.labSelectList = []
            this.cancel()
        },
        //弹出框多选
        handleSelectionLab(row) {
            this.labSelectList = row
        },
        //
        handleAdd() {
            let _this = this;
            getOenList({}).then((reponse) => {
                let resData = reponse.resData;
                _this.labsList = resData;
                // this.total = resData.total;
                _this.loading = false;
            });
            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;

        },
        next() {
            //点击xia一步时，要做到几点
            /**
             * 1.判断领域选择进而判断是否需要选择工具
             * 2.如果需要工具，判断工具不为空
             */
            let originEdaToolsList = this.originEdaToolsList
            let edaToolsList = this.edaToolsList
            let choosesEdaToolsList = []
            edaToolsList.map(item => {
                // 给每个工具初始化添加一个选中的状态
                let selectItem = {
                    company: '',
                    edaTools: []
                }
                item && item.edaTools.map(_i => {
                    if (_i.isSelect) {
                        _i.versions = [_i.defaultVersions]
                        selectItem.company = item.company
                        selectItem.edaTools.push({
                            id: _i.id,
                            toolName: _i.toolName,
                            versions: _i.versions,
                        })
                    }
                })
                if (selectItem && selectItem.edaTools.length > 0) {
                    choosesEdaToolsList.push(selectItem)
                }
            })

            if (choosesEdaToolsList && choosesEdaToolsList.length == 0) {
                this.$message.error('请选择工具')
                return
            }
            this.choosesEdaToolsList = choosesEdaToolsList

            if (this.flavorId == 0) {
                this.$message.error('请选择实例')
                return
            }


            if (!this.vmId) {
                this.activeValue = 1;
                this.queryDefaultHostName()
            } else {


                this.isShowDialog = true
                // return

            }
        },
        //获取主机名
        async queryDefaultHostName() {
            const res = await cn2py({ chinese: this.name })
            this.ruleForm.hostName = res.resData
        },
        //获取网络带宽
        async queryNetword() {
            const res = await network()
            let resData = res.resData
            this.netWordList = resData;
            this.ruleForm.netName = this.netWordList[0].flavorName
            this.netNameId = this.netWordList[0].id
        },
        getCurrentRow(row) {
            console.log(row);
            // 获取选中数据 row表示选中这一行的数据，可以从里面提取所需要的值
            this.currentRow = row
            this.cpuCount = row.cpuCoreCount
            this.memorySizeMB = row.memorySize
            this.flavorId = row.id
        },
        //
        handleSelectionChange(row, column, event) {
            // this.getCurrentRow(currentRow)
            this.flavorId = row.id
            this.cpuCount = row.cpuCoreCount
            this.memorySizeMB = row.memorySize
            this.currentRow = row

        },

        handleTypes(e) {
            console.log(e);
        },
        //查询设计云类型和实例规格
        async queryVmTypes() {
            const res = await getVmTypes({ status: 1 })
            let resData = res.resData
            this.cpuList = resData.cpu;
            this.flavorTypeList = resData.flavorType;
            this.memoryList = resData.memory;
        },
        // 实例规格
        async queryVmStandardsList(data) {
            const res = await getVmStandards(data)
            this.vmStandardsList = res && res.resData;
            let firstObj = this.vmStandardsList && this.vmStandardsList[0] || ''
            this.flavorId = firstObj && firstObj.id || 0;
            this.cpuCount = firstObj && firstObj.cpuCoreCount
            this.memorySizeMB = firstObj && firstObj.memorySize
            this.currentRow = firstObj && firstObj
        },

        queryStandardsListBy() {

            this.queryVmStandardsList(this.queryParams)
        },

        checkThisTools(list) {
            this.toolsList = list
        },
        //
        handleChangeToolVersion(e, index) {

            // console.log('eeee', e,index);
            this.handleVersions(e, index)
        },
        //处理工具选择 ==> 版本选择
        handleVersions(versionName, index) {
            let toolsList = this.toolsList
            toolsList = toolsList && toolsList[index] && toolsList[index].versions.filter(item => {
                return versionName == item.toolVersion
            })
            this.toolsList[index].defaultVersions = toolsList && toolsList[0]
        },
        //EDA工具列表查询接口(不包含环境变量等信息) 获取厂商和工具列表
        async queryCompanyToolsList() {
            this.loading = true
            const res = await edaTools();
            let reBackToolsList = []
            if (this.vmId) {
                const res = await getVmByVmId({ id: this.vmId })
                const res1 = await getPolicyByVmId({ id: this.vmId })

                let vmObj = res.resData
                let policyObj = res1.resData
                this.reBackVmDetail(vmObj, policyObj)
                reBackToolsList = JSON.parse(vmObj.tools)
            }
            const resData = res.resData;
            let originEdaToolsList = resData
            let edaToolsList = resData
            //添加了状态的edaToolList
            edaToolsList.map(item => {
                // 给每个工具初始化添加一个选中的状态
                item && item.edaTools.map(_i => {
                    _i.isSelect = false
                    _i.defaultVersions = _i.versions && _i.versions.length > 0 && _i.versions[0] || null
                })
                //处理回显
                if (reBackToolsList && reBackToolsList.length > 0) {
                    reBackToolsList.map(ri => {
                        if (ri.company == item.company) {
                            ri && ri.edaTools.map(rii => {
                                item && item.edaTools.map(_i => {
                                    if (rii.id == _i.id) {
                                        _i.isSelect = true
                                        _i.defaultVersions = rii.versions && rii.versions.length > 0 && rii.versions[0] || null
                                    }
                                })
                            })


                        }
                    })

                }

            })
            this.edaToolsList = edaToolsList

            // if (this.vmId) {
            //     this.queryVmDetailById(this.vmId)
            // }
            this.originEdaToolsList = originEdaToolsList
            this.ruleForm.companyName = resData[0].company //默认厂商
            this.toolsList = this.handleClickCompanyList(resData[0].company) //默认工具列表
            this.loading = false
        },

        //根据厂商显示工具列表
        handleClickCompanyList(companyName) {
            let edaToolsList = this.edaToolsList;
            edaToolsList = edaToolsList.filter(item => {
                return companyName == item.company
            })
            // console.log(edaToolsList[]);
            let toolsList = edaToolsList[0].edaTools

            return toolsList
        },
        queryToolsList() {
            this.toolsList = this.handleClickCompanyList(this.ruleForm.companyName)
        },

        handleCurrentChange(val) {
            this.currentRow = val;
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







        submitForm() {
            let createVMInfo = {
                annotation: this.ruleForm.annotation,
                autoSnapshotPolicy: {
                    dayOfWeek: this.ruleForm.dayOfWeek,
                    hours: this.ruleForm.hours,
                    retentionDays: this.ruleForm.retentionDays
                },
                cpuCount: this.cpuCount,
                // cpuHotAddEnabled: true,
                // cpuHotRemoveEnabled: true,
                // createdSharedDisk: false,
                // datacenterId: "datacenter-2",
                // datastoreId: "string",
                // day: 0,
                // diskMode: "persistent",
                diskSizeMB: this.ruleForm.diskSizeMB * 1024,
                // domain: "localhost",
                edaTools: this.choosesEdaToolsList,
                eduLibs: this.ruleForm.eduLibs,
                flavorId: this.flavorId,
                // folderId: "string",
                groupId: this.groupId,
                // guestOsId: "string",
                hostName: this.ruleForm.hostName,
                // ifDept: "string",
                // isoPath: "string",
                maxUserCounts: this.ruleForm.maxUserCounts,
                // memoryHotAddEnabled: true,
                memorySizeMB: this.memorySizeMB * 1024,
                vmName: this.ruleForm.vmName
            }
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    this.loading = true
                    createVM(createVMInfo).then(res => {
                        if (res && res.resData) {
                            this.$message.success('创建中')
                            let id = this.groupId
                            this.$router.push({ path: '/classMng/courseDetail', query: { id } })
                        } else {
                            this.$message.error('创建失败')
                        }
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    }).finally(() => {
                        setTimeout(() => {
                            this.loading = false

                        }, 1000);
                    })
                }
            });
        },
        cancel() {
            let _this = this;
            let dialog = {
                visible: false,
            };
            _this.dialog = dialog;
        },
        handleQuery() {
            this.listQuery.params = this.queryParams;
            this.getList();
        },
        //重置搜索条件
        resetQuery(formName) {
            this.listQuery.params = [];
            this.getList();
            this.$refs[formName].resetFields();
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
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style lang='scss' scoped>
// .el-table-container {
//     ::v-deep {
//         .el-table__body tr.current-row>td {
//             background-color: rgb(64, 158, 255);
//             color: #fff;
//         }
//     }

// }

.function-container {
    width: 300px;
    height: 100px;
    padding: 0 20px;
    margin: 0 10px 10px 10px;
    border: 1px solid #ddd;
    text-align: center;

    &:first-child {
        margin-left: 0px;
    }

    &:hover {
        cursor: pointer;
    }
}
</style>
    