<template>
    <el-container class="el-container-contianer">
        <el-header class="el-header-top primayBgColor flex justify-between" style="">
            <div></div>
            <div>
                <i class="el-icon-message-solid font18 marginRight10"></i><span class="primaryColoro font18">距离考试结束</span>  <span class="fontW7 primaryColory font18">{{ time }}</span>
            </div>
            <div>

                <el-button type="danger" size="mini" class="editDanger"
                    @click="gotoPage()">退出</el-button>
            </div>

        </el-header>
        <el-container class="flex">
            <div style="border-bottom: none;border-top: none; position: relative;" :style="{ 'width': leftWidth }">
                <div class="left-container">
                    <el-form ref="form" :model="questionForm">
                        <paper-container ref="paper-container" :obj="obj" @checkNoSingleAnswer="checkAnswer"
                            @checkSingleAnswer="checkAnswer" class="marginBottom20" :isShow="false"
                            :questionForm="questionForm" :questionRules="questionRules"></paper-container>
                    </el-form>
                    <div class="up-paper-btn">
                        <el-button type="success" @click="get" block class="editSuccess el-button-edu">提交试卷</el-button>
                    </div>

                    <div @click="openAndClose" :class="isOpen ? 'aside-icon' : 'aside-icon-close'"></div>
                    <papar-detail-dialog :paperAns="paperAns" ref="papar-detail-dialog"
                        @submitPaper="submitPaper"></papar-detail-dialog>
                    <div @mousedown="handleLeftMove()" id="left" class="left-container-right"></div>
                </div>
            </div>
            <div style="position: relative;" :style="{ 'position': 'relative', 'width': `${rightWidth}` }" class="right-container">
                <iframe v-if="localUrl" :src="localUrl" frameborder="0" class="iframe" allowfullscreen="true"
                    style=""></iframe>
                <div v-if="!localUrl">
                    <div class="info flex flex-column align-center justify-between" :key="item.id"
                        v-for="item in vmEnvDetail.userCountsToPwd">

                        <div style="width: 90%;" class="font16">登陆账号：{{ item.accountName }}</div>
                        <div style="width: 90%;" class="font16">登陆密码：
                            <password :password="item.accountPwd">
                            </password>
                        </div>
                        <div style="width: 100%;"><el-button icon="el-icon-success" style="width: 100%;" class="editSuccess"
                                type="success" @click="goToNovnc(item.accountName)">进入实操云环境</el-button></div>
                    </div>
                </div>
                <!-- <rep-dialog id="rep-dialog" @cancel="cancelRepDia" :dialogTableVisible="dialogTableVisible"
                    :reportDetail="reportDetail"></rep-dialog> -->

            </div>
        </el-container>

    </el-container>
</template>


<script>
import {
    oneDetail,
    getTrialReportById,
    oneTrialTempInfo
} from "@/api/edu/labCenter";

import { getTestPaperDetailById } from '@/api/edu/question'

import {
    getVmByCourseId,
    getConsoleForUser,
} from '@/api/edu/cloud'

import {
    submitHomework
} from '@/api/edu/job'
import { mapGetters } from 'vuex'
import Password from './components/Password'
import PaperContainer from './components/Paper-Container'
import PaparDetailDialog from './components/PaparDetailDialog.vue'
import { Base64 } from 'js-base64'
import EduTinymce from "@/components/Edu-tinymce";
export default {
    components: {
        EduTinymce,
        Password,
        PaperContainer,
        // RepDialog
        PaparDetailDialog
    },
    data() {
        return {
            paperId: 0,
            courseId: 0,
            isOpen: true,
            isChecked: false,

            submitLoading: false,
            vmEnvDetail: {},
            localUrl: '',

            dialogTableVisible: false,

            questionRules: {

                // isRight: [
                //     { required: true, message: '请答题', trigger: 'blur' },
                // ]
            },
            questionForm: {
                ofPublic: '',
                title: '',
                descriptions: '',
                paperItemList: []
            },

            paperAns: [],//用来显示题目是否作答

            subAnswers: {},//提交答案

            obj: {},
            time: '',
            inter: '',
            leftWidth: '880px',
            rightWidth: 'calc(100vw - 880px)',
        }
    },
    computed: {
        ...mapGetters([
            'userRolesNames'
        ])
    },
    destroyed() {
        this.isOpen = true
        this.isChecked = false
        this.trialDetail = {}
        this.submitLoading = false
        this.vmEnvDetail = {}
        this.localUrl = ''
        clearInterval(this.inter)
        this.inter = ''

    },
    created() {
        let obj = this.$route.query.obj
        obj = decodeURI(obj)
        obj = JSON.parse(obj)
        this.obj = obj
        const {
            homeworkId,
            paperId,
            endTime,
            courseId
        } = this.obj
        this.courseId = courseId
        this.homeworkId = homeworkId
        this.paperId = paperId
        this.queryTestPaperById({ id: this.paperId, isStudent: true })

    },
    mounted() {

        if (this.courseId) {
            this.queryEnvDetail()
        }

        this.getTimeDifference(this.obj.endTime)

    },
    methods: {

        //获取时间差值
        getTimeDifference(endTime) {
            endTime = new Date(endTime).getTime()
            clearInterval(this.inter)
            this.inter = setInterval(() => {
                console.log('123123');
                let startTime = new Date().getTime()
                this.time = this.getDiffTime(endTime, startTime)
            }, 1000);
        },

        //计算两个时间之间的时间差 多少天时分秒
        getDiffTime(new_date, old_date) {
            var subtime = (new_date - old_date) / 1000;    //计算时间差,并将毫秒转化为秒
            var days = parseInt(subtime / 86400);  //天  24*60*60*1000
            var hours = parseInt(subtime / 3600) - 24 * days;   //小时  60*60  总小时数-过去小时数=现在小时数
            var mins = parseInt(subtime % 3600 / 60);    //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
            var secs = parseInt(subtime % 60);   //以60秒为一整份  取余  剩下秒数
            return days + "天 " + hours + "小时 " + mins + "分钟 " + secs + "秒 ";
        },


        checkAnswer(answer) {
            console.log(answer);
            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList
            paperItemList.map(item => {
                if (answer.id == item.id) {
                    item = answer
                }
            })
            this.questionForm.paperItemList = paperItemList
            console.log(this.questionForm.paperItemList);
        },




        submitPaper() {
            let answers = this.subAnswers
            let homeworkId = this.homeworkId
            let courseId = this.courseId
            submitHomework({ homeworkId, answers }).then((response) => {
                if (response && response.flag) {
                    this.$message.success("提交成功");
                    this.$refs['papar-detail-dialog'].centerDialogVisible = false
                    this.gotoPage()
                }
            })

        },
        get() {

            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList
            let subAnswers = {};

            let paperAns = [] //用来记录题目是否作答

            for (let index = 0; index < paperItemList.length; index++) {
                const item = paperItemList[index];
                //单选
                let paperAnsItem = {
                    index: index + 1,
                    isFill: false
                };
                if (item.quTypeId != "4" && item.quTypeId != "5") {
                    let answers = item.answers
                    let ansArr = []
                    for (let index = 0; index < answers.length; index++) {
                        const element = answers[index];
                        if (element.isRight == 1) {
                            if (item.quTypeId != "3") {
                                ansArr.push(element.id)
                            } else {
                                ansArr.push(element.id)
                            }
                            paperAnsItem.isFill = true
                        }

                    }
                    subAnswers[item.quItemId] = ansArr.toString()
                } else {
                    let list = this.$refs['paper-container'].$refs['short-answer']
                    const listItem = list[index];
                    if (listItem && listItem.$refs && listItem.$refs[`tinymce${index}`]) {
                        console.log(listItem.$refs[`tinymce${index}`][0].content);
                        subAnswers[item.quItemId] = listItem.$refs[`tinymce${index}`][0].content
                        if (subAnswers[item.quItemId].trim()) {
                            paperAnsItem.isFill = true
                        }
                    }
                }


                paperAns.push(paperAnsItem)
            }
            this.subAnswers = subAnswers
            this.paperAns = paperAns
            this.$refs['papar-detail-dialog'].centerDialogVisible = true





        },

        queryTestPaperById(obj) {
            getTestPaperDetailById(obj).then(res => {
                if (res && res.flag) {
                    this.questionForm = res.resData
                }
            })
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
            getConsoleForUser(params).then(res => {
                // copy(res.resData) &&
                // this.$message.success(`成功获取用户 ${username} 远程连接地址`);
                // window.open(res.resData, '_blank')
                let localUrl = res.resData
                this.localUrl = localUrl
            })
        },
        async queryEnvDetail() {
            let res = await getVmByCourseId({ id: this.courseId })
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
                console.log(this.vmEnvDetail);
            }
        },
        gotoPage(path, id) {
            this.$router.go(-1)
        },
        openAndClose() {
            this.isOpen = !this.isOpen

            if (this.isOpen) {
                this.leftWidth = '880px';
                this.rightWidth = 'calc(100vw - 880px)'
            }else{
                this.leftWidth = '0';
                this.rightWidth = 'calc(100vw - 0px)'
            }
        },
        handleChecked(isChecked) {
            this.isChecked = isChecked
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

                    // 一个方法实现三种方式，所以根据参数来判断 size 方向
                    if (value === 'right' || value === 'corner') {
                        dragDom.style.width = `${l}px`
                        this.leftWidth = `${l}px`

                        dragDomright.style.width = `calc(100vw - ${l}px)`
                        // this.rightWidth = `calc(100vw - ${l}px)`
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
    }
};
</script>

<style lang="scss" scoped>
.right-container {
    overflow: hidden;
}
::v-deep {
    .el-header-top {
        height: 50px !important;
        line-height: 50px !important;
        padding: 0 20px !important;
        background: #10abb9 !important;
        text-align: right;
    }
}

// .edu-tinymce {
//     height: 700px;
// }

.el-container-contianer {
    height: 100vh;
    box-sizing: border-box;

    .left-container {
        box-sizing: border-box;
        overflow: auto;

        // position: relative;
        .up-paper-btn {
            padding: 0 30px;

            .el-button-edu {
                width: 100%;
                font-size: 18px;
            }
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
                        height: calc(100vh - 150px) !important;
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


}

// .smallClass:hover .aside-icon {
//     display: block;
// }

// .bigClass:hover .aside-icon {
//     display: block;
// }

.openClass {

    width: 900px;

    position: relative;
    transition: all 0.01s;
    /* 动画名称 */
    animation-name: open;
}

.closeClass {
    width: 30%;
    position: relative;
    transition: all 0.5s;
    /* 动画名称 */
    animation-name: close;
}

.bigClass {
    width: 100%;
    ;
    transition: all 0.5s;
    /* 动画名称 */
}

.smallClass {
    width: 70%;
    transition: all 0.5s;
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
</style>
