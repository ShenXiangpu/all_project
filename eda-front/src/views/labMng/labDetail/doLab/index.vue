<template>
    <el-container class="el-container-contianer">
        <el-header class="el-header-top flex justify-between align-center  primayBgColor" style="">
            <div class="primaryColory flex align-center ">
                <span class="marginRight10" v-if="isAssistance">{{ teaReply ? (teaReplyMap[teaReply]) : '等待老师协助...'
                }}({{ countStr
}})</span>
                <el-button type="danger" v-if="isAssistance && teaReply != 'accept'" size="mini" class="editPrimary"
                    @click="cancelAssistance">取消协助</el-button>
            </div>
            <el-button type="danger" size="mini" class="editDanger"
                @click="gotoPage('/lab/labDetail', trialCourseRelId)">退出</el-button>
        </el-header>
        <el-container class="flex">
            <div style="border-bottom: none;border-top: none; position: relative;" :style="{ 'width': leftWidth }">
                <div class="left-container">
                    <div class="flex min-width">
                        <div @click="handleChecked(false)" class="pointer"
                            :class="isChecked ? 'lab-book' : 'lab-book checked-class'"
                            style="width: 50%;text-align: center;">实验手册</div>
                        <div v-if="userRolesNames == '学生' || userId" @click="handleChecked(true)" class="pointer"
                            :class="!isChecked ? 'lab-rep' : 'lab-rep checked-class'"
                            style="width: 50%;text-align: center;">实验报告</div>
                        <div v-else class="lab-rep not-allowed" style="width: 50%;text-align: center;">
                            实验报告
                        </div>
                    </div>
                    <div v-if="!isChecked" class="rep-container" style="">
                        <!-- <div v-html="trialDetail && trialDetail.manualContent"></div> -->
                        <edu-tinymce class="edu-tinymce" :value='trialDetail && trialDetail.manualContent'
                            :disabled="true"></edu-tinymce>
                        <div class="flex justify-between align-center rep-next-title">
                            <div class="pre">
                                <el-button :disabled="listIndex == 0" type="primary" size="small"
                                    @click="handleLastOrNext('last')">
                                    <i class="el-icon-caret-left"></i>
                                    上一个</el-button>
                            </div>
                            <div class="title">
                                <el-tooltip class="item" effect="dark"
                                    :content="trialDetail && trialDetail.manualTitle || `-`">
                                    <div class="title-width view-text font18 fontW7">{{ Number(listIndex) + 1 }} - {{
                                        trialDetail && trialDetail.manualTitle || '暂无任务' }}
                                    </div>

                                </el-tooltip>
                            </div>
                            <div class="next">
                                <el-button
                                    :disabled="(!(trialItemList && trialItemList.length > 0)) || (listIndex == trialItemList.length - 1)"
                                    type="primary" size="small" @click="handleLastOrNext('next')">下一个
                                    <i class="el-icon-caret-right"></i>
                                </el-button>

                            </div>
                        </div>
                    </div>
                    <div v-else style="padding: 20px;" class="rep-container-else">
                        <div class="edu-tinymce">
                            <edu-tinymce ref="edu-tinymce" value=''></edu-tinymce>
                        </div>

                        <div class="flex flex-wrap" style="width: 100%;margin: 0 auto;margin-top:30px;text-align: center;">
                            <el-button type="success" class="editSuccess" style="width: 70%;min-width: 150px;"
                                icon="el-icon-s-promotion" @click="submitReport" :loading="submitLoading">提交报告</el-button>
                            <el-button type="primary" class="editPrimary" style="width: 20%;min-width: 100px;"
                                icon="el-icon-view" @click="queryTrialReport">预览</el-button>
                        </div>

                    </div>
                    <div @click="openAndClose" :class="isOpen ? 'aside-icon' : 'aside-icon-close '"></div>
                    <div @mousedown="handleLeftMove()" id="left" class="left-container-right"></div>
                </div>
            </div>
            <div id="right-container" :style="{ 'position': 'relative', 'width': `${rightWidth}` }">
                <iframe v-if="localUrl" :src="localUrl" frameborder="0" class="iframe" allowfullscreen="true"
                    style=""></iframe>
                <div v-if="!(localUrl)">
                    <div id="info" class="info flex flex-column align-center justify-between" :key="item.id"
                        v-for="item in vmEnvDetail.userCountsToPwd">

                        <div style="width: 90%;" class="font16">登陆账号：{{ item.accountName }}</div>
                        <div style="width: 90%;" class="font16">登陆密码：
                            <password :password="item.accountPwd">
                            </password>
                        </div>
                        <div style="width: 100%;"><el-button icon="el-icon-success" style="width: 100%;" class="editSuccess"
                                type="success" @click="goToNovnc(item.accountName)">进入设计云环境</el-button></div>
                    </div>
                </div>

                <xterm-container ref="xterm-container" class="xterm-container" :vmEnvDetail="vmEnvDetail" />

                <rep-dialog id="rep-dialog" @cancel="cancelRepDia" :dialogTableVisible="dialogTableVisible"
                    :reportDetail="reportDetail"></rep-dialog>

            </div>
        </el-container>
        <div class="tips-container" v-if="localUrl">
            <tips class="tips-download" @click="downloadDialog"></tips>
            <tips class="tips-switch" @click="switchDes" icon-class="el-icon-sort" title="切换"></tips>
            <tips class="tips-upload" @click="uploadDialog" icon-class="el-icon-upload" title="上传"></tips>
            <el-popover placement="right" trigger="hover">
                <div class="app-container">
                    <div v-for="item in vmEnvDetail.userCountsToPwd" :key="item.id">
                        <copy title="SSH" :content="`ssh ${item.accountName}@${vmEnvDetail.ip}-p 22`"></copy>
                    </div>
                    <copy title="IP" :content="vmEnvDetail.ip"></copy>

                    <copy title="端口" content="22"></copy>
                    <div v-for="item in vmEnvDetail.userCountsToPwd" :key="item.id">
                        <copy title="用户名" :content="item.accountName"></copy>
                        <copy title="密码" :content="item.accountPwd"></copy>
                    </div>

                </div>
                <div class="login-tips primaryBgColor pointer" slot="reference">登录信息</div>
            </el-popover>


            <tips class="tips-help" v-if="userRolesNames == '学生' && !isAssistance" @click="remoteAssistance"
                icon-class="el-icon-monitor" title="远程协助"></tips>

            <tips v-if="userRolesNames == '学生' && isAssistance && teaReply != 'accept'" class="tips-help"
                icon-class="el-icon-monitor" title="等待协助"></tips>
            <tips class="tips-help" v-if="userRolesNames == '学生' && isAssistance && teaReply == 'accept'"
                icon-class="el-icon-monitor" title='正在协助'></tips>




            <!-- DownloadDialog -->
            <download-dialog ref="tips-download" :vmId="vmEnvDetail.vmId"></download-dialog>
            <upload-dialog :vmId="vmEnvDetail.vmId" ref="tips-upload"></upload-dialog>

        </div>
    </el-container>
</template>

  
<script>
import {
    oneDetail,
    submitReport,
    getTrialReportById,
    oneTrialTempInfo,
    oneTrialHasItemList,
    taskLogin
} from "@/api/edu/labCenter";
import {
    getVmByCourseId,
    getConsoleForUser,
} from '@/api/edu/cloud'

import {
    sendHelp,
    cancelHelp,
    exitTrial,
    exitTrialTeacher
} from '@/api/edu/assistance'

import { mapGetters } from 'vuex'
import Password from './components/Password'
import RepDialog from '../components/RepDialog.vue'
import { Base64 } from 'js-base64'
import EduTinymce from "@/components/Edu-tinymce";
import Tips from './components/Tips';
import Copy from './components/Copy';
import DownloadDialog from './components/DownloadDialog';
import UploadDialog from './components/UploadDialog';
import XtermContainer from "./components/XtermContainer.vue";

const teaReplyMap = {
    'accept': '老师正在协助...',
    'reject': '老师已拒绝协助',
    'completed': ''
}


export default {
    components: {
        EduTinymce,
        Password,
        RepDialog,
        Tips, Copy,
        DownloadDialog,
        UploadDialog,
        XtermContainer
    },
    data() {
        return {
            teaReplyMap: teaReplyMap,
            leftWidth: '700px',
            rightWidth: 'calc(100vw - 700px)',
            trialCourseRelId: 0,
            courseId: 0,
            reportId: 0,
            isOpen: true,
            isChecked: false,
            trialDetail: {},
            submitLoading: false,
            vmEnvDetail: {},
            localUrl: '',
            reportDetail: {},
            dialogTableVisible: false,
            pub: false,
            listIndex: 0,
            trialItemId: 0,
            trialItemList: [],
            gridData: [],
            filesList: [],
            taskID: 0,
            isAssistance: false,//是否协助
            count: 0,
            countTimer: null,
            userId: '',
            countStr: '0秒'
        }
    },
    computed: {
        ...mapGetters([
            'userRolesNames',
            'teaReply'
        ])
    },
    watch: {
        teaReply: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);
                if (newVal == 'reject') {
                    this.$notify({
                        title: "温馨提示：",
                        message: '老师已拒绝协助',
                        type: 'warning',
                        position: 'top-left',
                        offset: 50,
                        duration: 0
                    });
                    this.initTime();
                }

                if (newVal == 'accept') {
                    this.initTime();
                    this.isAssistance = true;
                    this.countTime()
                }
                if (newVal == 'completed') {
                    this.$notify({
                        title: "温馨提示：",
                        message: '结束协助',
                        type: 'success',
                        position: 'top-left',
                        offset: 50,
                        duration: 0
                    });
                    this.initTime();
                }
            }
        }
    },
    destroyed() {
        this.isOpen = true
        this.isChecked = false
        this.trialDetail = {}
        this.submitLoading = false
        this.vmEnvDetail = {}
        this.localUrl = '';
        this.initTime();
        this.$store.dispatch('ws/initAssist', {})//初始化reply状态
        // exitTrial()//退出试验

    },
    created() {
        this.trialCourseRelId = this.$route.query.trialCourseRelId
        this.trialItemId = this.$route.query.trialItemId
        this.reportId = this.$route.query.reportId
        this.courseId = this.$route.query.courseId
        this.pub = this.$route.query.pub
        this.listIndex = this.$route.query.index
        this.userId = this.$route.query.studentId || ''
    },
    mounted() {
        this.$store.dispatch('ws/initAssist', {})//初始化reply状态
        
        if (this.trialCourseRelId) {
            //判断实验来自哪里
            if (this.pub) {
                oneTrialTempInfo(this.trialCourseRelId).then(res => {
                    if (res && res.flag) {
                        this.trialDetail = res && res.resData
                        // let video = document.querySelector('video')
                        // if (video) {
                        //     video.load();
                        // }
                    }
                })
            } else {
                oneTrialHasItemList({ trialId: this.trialItemId }).then(res => {
                    if (res && res.flag) {
                        const resData = res.resData
                        this.trialItemList = resData
                        this.trialDetail = resData && resData[this.listIndex]
                        this.taskID = this.trialDetail && this.trialDetail.id
                    }
                })
                // oneDetail(this.trialCourseRelId).then(res => {
                //     if (res && res.flag) {
                //         this.trialDetail = res && res.resData
                //         // let video = document.querySelector('video')
                //         // if (video) {
                //         //     video.load();
                //         // }
                //     }
                // })

            }

        }
        if (this.courseId) {
            this.queryEnvDetail()
        }

    },
    methods: {
        //远程协助 1、计算时间，保存时间对象，2请求接口
        remoteAssistance() {
            console.log('远程协助');
            this.$store.dispatch('ws/initAssist', {})
            let courseId = this.courseId
            this.isAssistance = true;
            sendHelp({ courseId }).then(res => {
                //请求协助计时开始

                if (res && res.flag) {
                    this.countTime()

                } else {
                    this.countTime()

                    this.$notify({
                        title: "温馨提示：",
                        message: '老师当前未在线',
                        type: 'warning',
                        position: 'top-left',
                        offset: 50,
                        duration: 3000
                    });
                }

            }).catch(_ => {
                this.isAssistance = false;
            })
        },
        initTime() {
            clearInterval(this.countTimer)
            this.countTimer = null
            this.count = this.parseTime(0)
            this.isAssistance = false;
        },
        cancelAssistance() {
            cancelHelp().then(res => {
                if (res && res.flag) {
                    this.initTime()
                    this.$message.success('取消成功')
                }
            })

        },
        countTime() {
            let count = 0
            this.count = this.parseTime(count)
            clearInterval(this.countTimer)
            this.countTimer = null
            let countTimer = setInterval(() => {
                count++
                // count+=90 / 下面的parseTime方法中，90是预设的，可以根据需求修改
                this.count = count
                this.countStr = this.parseTime(count)
            }, 1000)
            this.countTimer = countTimer
        },
        parseTime(time) {
            let h = parseInt(time / 3600);
            let m = parseInt(time % 3600 / 60);
            let s = parseInt(time % 60);
            let strTime = ''
            if (s == 0 && m == 0 && h == 0) {
                strTime += '0秒'
            }

            if (h > 0) {
                strTime += `${h < 10 ? '0' + h : h}时`
            }
            if (m > 0 || h > 0) {
                strTime += `${m < 10 ? '0' + m : m}分`
            }
            if (s >= 0) {
                strTime += `${s < 10 ? '0' + s : s}秒`
            }


            return strTime
        },
        //打开下载dialog
        downloadDialog() {
            console.log('下载');
            let tipsDownload = this.$refs['tips-download']
            tipsDownload.dialogVisible = true
            tipsDownload.userId = this.userId
            tipsDownload.queryListFile()
        },
        switchDes() {
            let xterm = this.$refs['xterm-container']
            let isOpen = xterm.dialogVisible
            isOpen ? xterm.handleClose() : xterm.handleOpen()
        },
        //打开上传dialog
        uploadDialog() {
            let tipsUpload = this.$refs['tips-upload']
            tipsUpload.dialogVisible = true
            tipsUpload.userId = this.userId
            tipsUpload.queryListFile()
        },
        handleLastOrNext(str) {
            let index = this.listIndex;
            let trialItemList = this.trialItemList;
            let listLength = trialItemList && trialItemList.length

            if (str == 'last') {
                index > 0 && index--;
                this.listIndex = index;
            } else {
                index < listLength - 1 && index++;
                this.listIndex = index;
            }
            this.trialDetail = this.trialItemList[index]
            this.taskID = this.trialDetail && this.trialDetail.id
            if (this.taskID) {
                taskLogin({ taskID: this.taskID })
            }
        },




        openAndClose() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.leftWidth = '700px';
                this.rightWidth = 'calc(100vw - 700px)'
            } else {
                this.leftWidth = '0';
                this.rightWidth = 'calc(100vw - 0px)'
            }
        },
        handleLeftMove() {
            const el = document.querySelector("#left")
            const dragDom = el.parentNode.parentNode // 窗体中间嵌套了一层：dialog -> div -> dragDom
            const dragDomright = el.parentNode.parentNode.nextSibling
            // 由于使用的是一个指令绑定到了三个 dragdom 上面，所以做了参数判断。
            // corner: 右下角；right: 右侧；bottom：底部；
            // 参数可根据自身编码习惯修改
            const value = 'right'
            if (!dragDom) return // 错误处理
            el.onmousedown = (e) => {
                // 鼠标按下，在原来页面上增加透明遮罩，防止部分元素例如iframe监听不到鼠标事件
                const mask = document.createElement('div')
                mask.setAttribute('style', 'position:fixed;top:0px;bottom:0px;left:0px;right:0px;background:rgba(0,0,0,0)')
                document.body.appendChild(mask)
                // 计算当前元素距离可视区的距离
                const disX = e.clientX - el.offsetLeft
                const disY = e.clientY - el.offsetTop
                document.body.onmousemove = function (e) {
                    e.preventDefault() // 移动时禁用默认事件


                    // 通过事件委托，计算移动的距离
                    const l = e.clientX - disX
                    const h = e.clientY - disY
                    if (e.view.innerWidth - e.clientX < 300) { // 右边界控制
                        return
                    }
                    // 一个方法实现三种方式，所以根据参数来判断 size 方向
                    if (value === 'right' || value === 'corner') {
                        dragDom.style.width = `${l}px`
                        this.leftWidth = `${l}px`
                        dragDomright.style.width = `calc(100vw - ${l}px)`
                        this.rightWidth = `calc(100vw - ${l}px)`
                    }
                    // 判断弹窗高度，防止用于拖动的点移出可视区
                    if (value === 'bottom' || value === 'corner') {
                        dragDom.style.height = `${h > document.body.offsetHeight ? document.body.offsetHeight : h}px`
                    }
                }

                document.body.onmouseup = function (e) {
                    document.body.removeChild(mask) // 移除mask遮罩
                    document.body.onmousemove = null
                    document.body.onmouseup = null
                }
            }
        },
        cancelRepDia() {
            this.dialogTableVisible = false
        },
        //查看实验报告

        queryTrialReport() {
            console.log(document.querySelector("#rep-dialog"));
            let id = this.reportId
            let reportContent = this.$refs['edu-tinymce'].getContent()
            getTrialReportById({ id }).then(res => {
                if (res && res.flag) {
                    this.reportDetail = res.resData
                    this.reportDetail.report = reportContent
                    this.dialogTableVisible = true

                }
            })
        },
        goToNovnc(username) {
            let isLicenseEnabled = this.$store.state.user.isLicenseEnabled
            if (!isLicenseEnabled) {
                this.$message.warning('抱歉，系统已过期，需联系官方工作人员续费')
                return
            }
            let params = {
                username, vmId: this.vmEnvDetail.vmId
            }
            taskLogin({ taskID: this.taskID })
            getConsoleForUser(params).then(res => {
                // copy(res.resData) && 
                // this.$message.success(`成功获取用户 ${username} 远程连接地址`);
                // window.open(res.resData, '_blank')
                let localUrl = res.resData
                this.localUrl = localUrl
            })
        },
        async queryEnvDetail() {
            let res = await getVmByCourseId({ id: this.courseId, userId: this.userId })
            let vmEnvDetail = res && res.resData
            if (vmEnvDetail) {
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
            }
        },

        submitReport() {
            let report = this.$refs['edu-tinymce'].getContent()
            if (!report) {
                this.$message.error('实验报告不能为空')
                return
            }
            this.submitLoading = true;
            submitReport({ report, id: this.reportId }).then(res => {
                if (res && res.flag) {
                    this.$message.success('提交成功')
                    this.submitLoading = false;
                    // this.$router.push({ path: '/lab/report' })
                }
            }).finllay(() => {
                this.submitLoading = false;
            })
        },
        gotoPage(path, id) {
            let userId = this.userId
            if (userId) {
                exitTrialTeacher({ studentId: userId })
            } else {
                exitTrial()
            }

            this.$router.push({ path, query: { id } })
        },
        // openAndClose() {
        //     this.isOpen = !this.isOpen
        // },
        handleChecked(isChecked) {
            this.isChecked = isChecked
        }
    }
};
</script>

<style lang="scss" scoped>
#right-container {
    overflow: hidden;
}

.xterm-container {
    position: absolute;
    top: 0px;
    left: 4px;

    width: 100%;
    height: 100%;
}

.tips-container {
    position: absolute;
    top: 90px;
    right: 0px;
    min-width: 100px;
    max-width: 200px;
    height: 300px;
    overflow: hidden;
    // transform: translateX(50px);

    .tips-download,.tips-switch,.tips-upload {
        right: -40px;
    }
    .tips-download {
        top: 40px;
    }
    .tips-switch {
        top: 80px;
    }
    .tips-switch:hover,.tips-download:hover,.tips-upload:hover {
        right: 0px;
    }
    .tips-help {
        margin-top: 100px;
        width: 100px;
        top: 110px;
        right: -65px;
    }

    .tips-help:hover {
        right: 0px;
    }

    
    .tips-switch {
        ::v-deep {
            .iconClass {
                transform: rotate(90deg);
            }
        }

    }




    .login-tips {
        color: #fff;
        padding: 10px 7px;
        font-size: 14px;
        writing-mode: vertical-lr;
        position: absolute;
        right: 0px;
        top: 120px;
        border-radius: 10px 0 0 10px;
    }

   
    .tips-help-tea {
        margin-top: 100px;
        width: 130px;
        // transform: translateX(100px);
    }
}




::v-deep {
    .el-header-top {
        height: 50px !important;
        line-height: 50px !important;
        padding: 0 20px !important;
        background: #10abb9 !important;
        // text-align: right;
    }
}

// .edu-tinymce {
//     width: 800px !important;

//     ::v-deep .tox-tinymce {
//         width: 800px !important;
//     }

// }

.el-container-contianer {
    height: 100vh;
    box-sizing: border-box;


    .left-container {
        box-sizing: border-box;
        overflow: auto;
        height: calc(100vh - 60px);

        .min-width {
            min-width: 200px;
        }

        .rep-container {
            margin: 0 auto;
            padding: 20px;
            overflow: auto;
            height: calc(100vh - 110px);

            .edu-tinymce {
                ::v-deep {

                    .tox,
                    .tox-tinymce {
                        min-width: 200px;
                        width: 100% !important;
                        height: calc(100vh - 205px) !important;
                    }
                }
            }

            .rep-next-title {
                border: 1px solid #10abb9;
                border-radius: 10px 10px 0 0;
                padding: 10px;

      

                .title {
                    .title-width {
                        max-width: 400px;
                    }
                }

   
            }

        }

        .rep-container-else {
            margin: 0 auto;
            padding: 20px;
            overflow: auto;
            height: calc(100vh - 110px);

            .edu-tinymce {
                ::v-deep {

                    .tox,
                    .tox-tinymce {
                        min-width: 200px;
                        width: 100% !important;
                        height: calc(100vh - 250px) !important;
                    }
                }
            }

        }

        .lab-book,
        .lab-rep {
            font-size: 20px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #333;
            background: #ddd;
            box-sizing: border-box;

        }

        .checked-class {
            color: #409eff;
            background: #fff;
        }
    }

    .iframe {
        width: 100%;
        height: calc(100vh - 60px);
    }

    .left-container:hover .aside-icon {
        display: block;
    }


}



.closeClass {
    width: 30%;
    transition: all 0.5s;
    /* 动画名称 */
    animation-name: close;
}

.bigClass {
    width: 100%;
    ;
    // transition: all 0.5s;
    /* 动画名称 */
}


@keyframes open {
    0% {
        width: 0;
    }

    100% {
        width: 30%;
    }
}

@keyframes close {
    0% {
        width: 30%;
    }

    100% {
        width: 0;
    }
}


.closeClass {
    width: 0;
    position: relative;
}

.info {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 260px;
    height: 120px;
    margin-top: calc(50vh - 120px);
}

.aside-icon {
  
    background-image: url('../../../../assets/img/lab/right1.png');

}

.aside-icon-close {

    background-image: url('../../../../assets/img/lab/left1.png');

}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.left-container-right {
    position: absolute;
    z-index: 2;
    height: calc(100vh - 50px);
    width: 4px;
    right: -4px;
    top: 0;
    cursor: col-resize;
    background: #bbb;
}
</style>