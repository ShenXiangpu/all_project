<template>
    <div class="app-container">
        <border-container class="" :isShowTitle="false" :isBgShow="false">
            <template #content>
                <div class="flex justify-between align-center padding020 border-content" style="margin-top: 10px;">
                    <div style="width: 30%;">
                        <h2>{{ questionForm.title }}</h2>
                    </div>
                    <div style="width: 40%;" class="flex justify-center align-center">
                        <div class="el-button-container">
                            <el-button type="primary" size="small" icon="el-icon-caret-left" :loading="loading"
                                @click="handleLast" :disabled="curr <= 1">上一位</el-button>
                        </div>

                        <div class="name-contianer">
                            <h3>{{ obj.userName }}</h3>
                            <!-- <h3>{{ obj.userAccount }}</h3> -->
                        </div>
                        <div class="el-button-container">
                            <el-button type="primary" size="small" @click="handleNext" :loading="loading"
                                :disabled="curr == total">下一位 <i class="el-icon-caret-right"></i>
                            </el-button>
                        </div>

                    </div>
                    <div style="width: 30%;" class="flex justify-end align-center">
                        <!-- <el-button :loading="downLoading" @click="downLoadBook" type="primary" size="small"
                            icon="el-icon-download">下载</el-button> -->
                        <div class="flex justify-center align-center">
                            <div class="marginRight10">评分</div> <el-input class="el-input-width" v-model="scoreTotal"
                                type="text"></el-input>
                        </div>
                    </div>
                </div>

            </template>
        </border-container>

        <div class="flex justify-start">
            <el-row v-if="questionForm.paperItemList">
                <el-col :xs="24" :sm="12" :md="24" :lg="16" :xl="13" class="minWidth">
                    <div class="minWidth" >
                        <div class="rep-table-container">
                            <el-form ref="questionForm" :model="questionForm">
                                <paper-container ref="paper-container" class="marginBottom20" :isShow="false"
                                    :questionForm="questionForm" :questionRules="questionRules"
                                    @inputGetScore="inputGetScore" @chooseImage="chooseImage" :scoreTotal="scoreTotal"
                                    :obj="obj"></paper-container>
                            </el-form>
                        </div>

                        <border-container class="bottom" :isShowTitle="false" :isBgShow="false">
                            <template #content>
                                <div class="flex justify-between align-center bottom-content">
                                    <div class="flex justify-start align-center">
                                        <div class="bottom-content-text">批改建议：</div><el-input @input="onInputSugg"
                                            type="textarea" class="el-input-textarea" v-model="suggestion"></el-input>
                                    </div>
                                    <div>
                                        <el-button type="primary" size="small" :loading="markReportLoading"
                                            @click="handleMarkReport">保存
                                        </el-button>
                                        <el-button type="primary" size="small" @click="oncancel">取消
                                        </el-button>
                                    </div>
                                </div>

                            </template>
                        </border-container>
                    </div>
                </el-col>
                <el-col  :xs="24" :sm="12" :md="24" :lg="8" :xl="11">
                    <div class="score-container">
                        <!-- <div class="title-container marginBottom10 font16">批改详情：</div> -->
                        <score-container class="detail-container" @handleScoll="handleScoll"
                            :paperItemList="questionForm.paperItemList"></score-container>
                    </div>
                </el-col>
            </el-row>



        </div>
        <info-dialog ref="info-dialog" @noSave="noSave" @saveAndNext="saveAndNext" @continueNotMark="continueNotMark"
            @continueMark="continueMark"></info-dialog>
    </div>
</template>

<script>
import {
    getTrialReportById,
    getListTrialReport,
    markReport,
    downLoadReport
} from "@/api/edu/labCenter";
import {
    getHomeworkList
} from "@/api/edu/course";

import {
    getHomeworkPathByid,
    downQuestionPaper
} from "@/api/edu/question";

import {
    mark,
} from "@/api/edu/job";
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce';
import BorderContainer from "@/components/BorderContainer";
import PaperContainer from './components/Paper-Container'
import RepTable from './components/RepTable';
import ScoreContainer from './components/Score-Container';
import InfoDialog from './components/InfoDialog.vue';
export default {
    components: {
        RepTable,
        BorderContainer,
        PaperContainer,
        ScoreContainer,
        InfoDialog
    },
    data() {
        const numberCheck_01 = (rule, value, callback) => {
            const checkReg = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100)$/;
            if (checkReg.test(value)) {
                callback();
            } else {
                callback(new Error("请输入得分"));
            }
        };

        return {
            reportDetail: {},//报告详情
            trialCourseId: {},
            obj: {},
            curr: 1,
            loading: false,
            total: 0,
            score: '',
            suggestion: '',
            markReportLoading: false,
            downLoading: false,
            nextSign: false,


            questionRules: {

                getScore: [
                    { required: true, message: '请输入得分', trigger: 'blur' },
                    { validator: numberCheck_01, trigger: ["blur", "change"] }
                ]
            },
            questionForm: {
                ofPublic: '',
                title: '',
                descriptions: '',
                paperItemList: []
            },

            paperAns: [],//用来显示题目是否作答

            subAnswers: {},//提交答案

            scoreTotal: 0,

            homeworkMarkId: 0,

            courseId: 0,
        }
    },

    created() {
        let obj = this.$route.query.obj
        obj = decodeURI(obj)
        obj = JSON.parse(obj)
        this.obj = obj
        const { id, paperId, $index, total } = obj
        this.curr = Number($index)
        this.total = total
        // this.queryTrialReport(id)
        this.nextSign = false
        this.homeworkMarkId = id
        this.courseId = obj.courseId //课程id 返回时使用
        this.quertHomeworkPathByid({ id, paperId })
    },
    mounted() {
        
    },
    watch: {
        $route() {
            let obj = this.$route.query.obj
            obj = decodeURI(obj)
            obj = JSON.parse(obj)
            this.obj = obj
            const { id, paperId } = obj
            this.questionForm = {}
            this.quertHomeworkPathByid({ id, paperId })
        },
    },
    methods: {
        continueMark() {
            this.markReportLoading = false
        },
        continueNotMark(type) {
            if (type == 'last') {
                this.handleLastOrNext(-1)
            } else {
                this.handleLastOrNext(1)
            }
            this.markReportLoading = false
        },

        //点击不保存,并继续
        noSave(type) {
            if (type == 'last') {
                this.handleLastOrNext(-1)
            } else {
                this.handleLastOrNext(1)
            }
            this.markReportLoading = false
        },
        //保存并提交
        async saveAndNext(type) {
            const res = await this.saveMark()
            console.log(res, 'rse');
            if (res && res.flag) {
                if (type == 'last') {
                    this.handleLastOrNext(-1)
                } else {
                    this.handleLastOrNext(1)
                }
            }
            this.markReportLoading = false

        },


        //判断是否批改完成
        isMarked() {
            let paperItemList = this.questionForm.paperItemList
            for (let i = 0; i < paperItemList.length; i++) {
                let getScore = paperItemList && paperItemList[i].getScore
                if (isEqual(getScore, null) || isEqual(getScore, '')) {
                    //表示未批改完成
                    return false
                }
            }
            return true

        },


        //点击批改详情题号，跳转至该题
        handleScoll(id) {
            document.getElementById(`Number${id}`).scrollIntoView({
                behavior: "smooth", // 平滑过渡
                block: "start", // 上边框与视窗顶部平齐。默认值
                // inline: "nearest" // 紧邻的元素
            })
        },
        inputGetScore(score, index) {
            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList
            let qscore = paperItemList[index].score
            if (score == qscore) {
                paperItemList[index].isCorrect = 1
            } else if (score < qscore && score > 0) {
                paperItemList[index].isCorrect = 3
            } else if (isEqual(score, '0')) {
                paperItemList[index].isCorrect = 0
            } else if (score > qscore) {
                paperItemList[index].getScore = qscore
                paperItemList[index].isCorrect = 1
                this.$message.error('您的得分不能高于题目分值')
            } else if (!isEqual(score, 0) && isEqual(score, '')) {
                paperItemList[index].isCorrect = 4
            }
            this.questionForm.paperItemList = paperItemList

            this.scoreTotal = this.queryScore()
            //输入失焦触发
            this.onInputSugg()
        },
        //
        chooseImage(num, index) {
            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList

            paperItemList[index].isCorrect = num
            if (num == 1) {
                paperItemList[index].getScore = paperItemList[index].score
            } else if (num == 0) {
                paperItemList[index].getScore = 0
            } else if (num == 3) {
                paperItemList[index].getScore = ''
            }
            this.questionForm.paperItemList = paperItemList;

            this.scoreTotal = this.queryScore()
            this.onInputSugg()
        },
        //

        checkAnswer(answer) {

            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList
            paperItemList.map(item => {
                if (answer.id == item.id) {
                    item = answer
                }
            })
            this.questionForm.paperItemList = paperItemList
        },

        //计分问题 //需要表里数组的参数值
        queryScore() {
            let scoreTotal = 0
            for (let i = 0; i < this.questionForm.paperItemList.length; i++) {
                if (this.questionForm.paperItemList[i].getScore) {
                    scoreTotal += Number(this.questionForm.paperItemList[i].getScore)
                }
            }
            return scoreTotal
        },

        get() {
            let questionForm = this.questionForm
            let paperItemList = questionForm.paperItemList
            let subAnswers = {};
            for (let i = 0; i < paperItemList.length; i++) {
                let item = paperItemList[i]
                subAnswers[item.quItemId] = {
                    isRight: item.isCorrect,
                    score: item.getScore
                }
            }
            return subAnswers
        },

        cancelRepDia() {
            this.dialogTableVisible = false
        },

        quertHomeworkPathByid(data) {
            getHomeworkPathByid(data).then(res => {
                if (res && res.flag) {
                    let resData = res.resData
                    this.questionForm = resData
                    this.scoreTotal = this.queryScore()
                } else {
                    this.questionForm = {}
                    this.scoreTotal = ''
                }
            })
        },

        //
        downLoadBook() {
            const { id, } = this.obj
            this.downLoadPDF({ id })
        },
        downLoadPDF(data) {
            this.downLoading = true
            downQuestionPaper(data).then(res => {
                let type = "application/pdf;charset=utf-8"
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
            })
        },
        oncancel() {
            let id = this.obj.courseId
            let homeworkId = this.obj.homeworkId
            this.$router.push({
                path: '/classMng/courseDetail',
                query: { id, homeworkId }
            })


            // this.$router.push({
            //     path: '/classMng/courseDetail',
            //     query: {
            //         homeworkId: row.homeworkId,
            //         id: row.courseId,
            //     }
            // })
        },


        //批改
        handleMarkReport() {
            this.markReportLoading = true
            this.$refs['questionForm'].validate(async (valid) => {
                if (valid) {
                    const res = await this.saveMark()
                    console.log(res, 'rse');
                    if (res && res.flag) {
                        this.$message.success('批改成功')
                    }
                    this.markReportLoading = false
                    this.nextSign = false

                } else {
                    console.log('error submit!!');
                    this.$refs['info-dialog'].dialogVisible.visible = true
                    console.log(this.questionForm.paperItemList, 'this.questionForm.paperItemList')
                    this.$refs['info-dialog'].paperItemList = this.questionForm.paperItemList
                    this.markReportLoading = false
                    return false;
                }
            });

        },
        onInputSugg: debounce(function (val) {
            this.nextSign = true
        }, 500),

        //保存批改
        async saveMark() {
            let scoreMap = this.get()
            let data = {
                homeworkMarkId: this.homeworkMarkId,
                scoreMap: scoreMap,
                stuId: this.obj.userId,
                suggestion: this.suggestion
            }
            const res = await mark(data)
            return res
        },
        //重写handleLast方法,仅仅是翻页
        handleLastOrNext(num) {

            this.loading = true
            let curr = this.curr
            curr += Number(num)
            if (num > 0) {
                const { total } = this.obj
                if (curr <= total) {
                    this.queryListTrialReport(curr)
                } else {
                    this.loading = false
                }
            } else {
                if (curr >= 1) {
                    this.queryListTrialReport(curr)
                } else {
                    this.loading = false
                }
            }

        },

        handleLast() {
            let nextSign = this.nextSign
            console.log(nextSign);
            // this.loading = true
            if (nextSign) { //表示有批改
                // 在判断是否全部批改完成
                let isMarkedAll = this.isMarked()
                console.log('isMarkedAll', isMarkedAll);
                if (isMarkedAll) {
                    //全部批改完成
                    this.$refs['info-dialog'].type = 'last'
                    this.$refs['info-dialog'].isFinish = true
                    this.$refs['info-dialog'].dialogVisible.visible = true
                    this.loading = false
                } else {
                    this.handleMarkReport()

                    this.$refs['info-dialog'].type = 'last'
                    this.$refs['info-dialog'].isFinish = false
                    this.loading = false
                }

                //

            } else {
                //上一页
                this.handleLastOrNext(-1)
            }

        },
        handleNext() {
            const { total } = this.obj
            let curr = this.curr
            let nextSign = this.nextSign

            if (nextSign) {

                // 在判断是否全部批改完成
                let isMarkedAll = this.isMarked()
                if (isMarkedAll) {
                    //全部批改完成
                    this.$refs['info-dialog'].type = 'next'
                    this.$refs['info-dialog'].isFinish = true
                    this.$refs['info-dialog'].dialogVisible.visible = true
                    this.loading = false
                } else {
                    this.handleMarkReport()
                    this.$refs['info-dialog'].type = 'next'
                    this.$refs['info-dialog'].isFinish = false
                    this.loading = false
                }


            } else {
                this.loading = true
                this.handleLastOrNext(1)
            }

        },
        handleCorrention(obj) {
            let objs = JSON.stringify(obj);
            objs = encodeURI(objs);
            this.loading = false
            this.$router.push({ path: '/classMng/correctionHomeWork', query: { obj: objs, msg: new Date().getTime() } })
        },
        queryListTrialReport(page) {
            this.score = ''
            this.suggestion = ''
            let homeworkId = this.obj.homeworkId
            getHomeworkList({ params: { homeworkId }, page, limit: 1 }).then(res => {
                if (res && res.flag) {
                    this.curr = page
                    let resData = res.resData
                    let item = resData && resData.list[0];
                    let id = item && item.id
                    let $index = this.curr
                    let total = resData.total
                    let paperId = item && item.paperId
                    let userId = item && item.userId
                    let userName = item && item.userName
                    let startTime = item && item.startTime
                    let endTime = item && item.endTime
                    const { courseId, courseName, className, userAccount } = this.obj
                    const obj = { $index, page, limit: 1, total, id, paperId, userId, userName, homeworkId, courseId, courseName, className, userAccount, startTime, endTime }
                    this.handleCorrention(obj)
                }
            }).finally(() => {
                this.loading = false
                this.nextSign = false
            })
        },

        //  const { $index, page, limit,id } = obj
        handlePage(index, page, limit) {
            if (page == 1) {
                return index + 1
            } else if (page > 1) {
                return (index + 1) + (page - 1) * limit
            }
        },
        queryTrialReport(id) {
            getTrialReportById({ id }).then(res => {
                if (res && res.flag) {
                    this.reportDetail = res.resData
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.minWidth {
    // min-width: 900px;
}

.rep-table-container {
    padding: 30px;
    padding-bottom: 0px;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom: 0;
    // min-width: 900px;
    // width: 100%;
    // max-width: 900px;
    margin-left: 10px;
    height: calc(100vh - 250px);


}

.app-container {
    position: relative;
    padding-bottom: 0;

    .border-content {
        margin-top: 10px;
        padding: 0 20px;

        .el-button-container {
            width: 100px;
            text-align: center;
        }
    }

    .name-contianer {
        width: 200px;
        text-align: center;
    }

    .el-input-width {
        width: 100px;
    }
}

.bottom {
    // position: absolute;
    bottom: 0px;
    // left: 50%;
    // transform: translateX(-50%);
    margin-left: 10px;
    // width: 100%;
    box-sizing: border-box;

    .bottom-content {
        margin-top: 10px;
        padding: 0 20px;

        .bottom-content-text {
            width: 100px;
        }

        .el-input-textarea {
            width: 300px;
        }
    }
}

.title-container {
    padding: 20px 20px 0px 20px;
}

.detail-container {
    height: calc(100vh - 220px);
    overflow: auto;
}
</style>