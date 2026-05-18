<template>
    <div class="app-container">

        <border-container class="" :isShowTitle="false" :isBgShow="false">
            <template #content>
                <div class="flex justify-between align-center padding020 border-content" style="margin-top: 10px;">
                    <div style="width: 30%;">
                        <h2>{{ reportDetail.trialName }}</h2>
                    </div>
                    <div style="width: 40%;" class="flex justify-center align-center">
                        <div class="el-button-container">
                            <el-button type="primary" size="small" icon="el-icon-caret-left" :loading="loading"
                                @click="handleLast" :disabled="curr <= 1">上一位</el-button>
                        </div>

                        <div class="name-contianer">
                            <h3>{{ reportDetail.userName }}</h3>
                            <h3>{{ reportDetail.studentNum }}</h3>
                        </div>
                        <div class="el-button-container">
                            <el-button type="primary" size="small" @click="handleNext" :loading="loading"
                                :disabled="curr == total">下一位 <i class="el-icon-caret-right"></i>
                            </el-button>
                        </div>

                    </div>
                    <div style="width: 30%;" class="flex justify-between align-center">
                        <el-button :loading="downLoading" @click="downLoadBook" type="primary" size="small"
                            icon="el-icon-download">下载</el-button>
                        <div class="flex justify-center align-center">
                            <div class="marginRight10"><span class="primaryColoro"> * </span>评分</div> <el-input class="el-input-width" @input="onInputScore"
                                v-model="score" type="text"></el-input>
                        </div>
                    </div>
                </div>

            </template>
        </border-container>

        <div class="rep-table-container">
            <rep-table class="rep-table" :report="reportDetail"></rep-table>
        </div>

        <border-container class="bottom" :isShowTitle="false" :isBgShow="false">
            <template #content>
                <div class="flex justify-between align-center bottom-content">
                    <div class="flex justify-start align-center">
                        <div class="bottom-content-text">批改建议：</div><el-input @input="onInputSugg" type="textarea"
                            class="el-input-textarea" v-model="suggestion"></el-input>
                    </div>
                    <div>
                        <el-button type="primary" size="small" :loading="markReportLoading" @click="handleMarkReport">保存
                        </el-button>
                        <el-button type="primary" size="small" @click="oncancel">取消
                        </el-button>
                    </div>
                </div>

            </template>
        </border-container>
    </div>
</template>

<script>
import {
    getTrialReportById,
    getListTrialReport,
    markReport,
    downLoadReport
} from "@/api/edu/labCenter";

import debounce from 'lodash/debounce';
import BorderContainer from "@/components/BorderContainer";
import RepTable from '../components/RepTable';
export default {
    components: {
        RepTable,
        BorderContainer
    },
    data() {
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
            nextSign: false
        }
    },

    created() {
        let obj = this.$route.query.obj
        obj = decodeURI(obj)
        obj = JSON.parse(obj)
        this.obj = obj
        this.trialCourseId = obj && obj.trialCourseId
        const { id, $index, total } = obj
        this.curr = Number($index)
        console.log('1231231', this.curr);
        this.total = total
        this.queryTrialReport(id)
        this.nextSign = false
    },
    watch: {
        $route() {
            let obj = this.$route.query.obj
            obj = decodeURI(obj)
            obj = JSON.parse(obj)
            this.obj = obj
            this.trialCourseId = obj && obj.trialCourseId
            const { id } = obj
            this.queryTrialReport(id)
        },
    },
    methods: {
        downLoadBook() {
            const { id, } = this.obj
            this.downLoadPDF({ ids: [id] })
        },
        downLoadPDF(data) {
            this.downLoading = true
            downLoadReport(data).then(res => {
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
            this.$router.push({ path: '/lab/labDetail', query: { id: this.trialCourseId } })
        },
        //批改
        handleMarkReport() {
            const { id } = this.obj
            let score = this.score
            if (score === '') {
                this.$message.error('请输入分数')
                return
            }
            let data = {
                reportId: id,
                score,
                suggestion: this.suggestion
            }
            this.markReportLoading = true
            markReport(data).then(res => {
                if (res && res.flag) {
                    this.$message.success('批改成功')
                }
                this.markReportLoading = false
                this.nextSign = false
            })
        },
        onInputSugg: debounce(function (val) {
            this.nextSign = true
        }, 500),
        onInputScore: debounce(function (val) {

            if (val == '') {
                this.reportDetail.score = null
                this.score = ''
                return
            }

            if (isNaN(val)) {
                this.$message.error('请输入0-100的数字')
                this.reportDetail.score = ''
                this.score = ''
                return
            } else {
                // debugger

                let num = Number(val)
                if (num >= 0 && num <= 100) {
                    this.score = Number(val)
                    this.reportDetail.score = Number(val)
                    this.nextSign = true
                } else {
                    this.score = 0
                    this.reportDetail.score = Number(0)
                    this.$message.error('请输入0-100的数字')

                }
            }


        }, 500),

        handleLast() {

            let curr = this.curr
            let nextSign = this.nextSign
            this.loading = true
            if (nextSign) {
                this.$confirm('当前页面未保存，是否继续！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    curr -= 1
                    if (curr >= 1) {
                        this.queryListTrialReport(curr)
                    } else {
                        this.loading = false
                    }
                }).catch(() => {

                });
            } else {
                this.loading = true
                curr -= 1
                if (curr >= 1) {
                    this.queryListTrialReport(curr)
                } else {
                    this.loading = false
                }
            }

        },
        handleNext() {
            const { total } = this.obj
            let curr = this.curr
            let nextSign = this.nextSign
            if (nextSign) {
                this.$confirm('当前页面未保存，是否继续！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    curr += 1
                    if (curr <= total) {
                        this.queryListTrialReport(curr)
                    } else {
                        this.loading = false
                    }
                }).catch(() => {

                });
            } else {
                this.loading = true
                curr += 1
                if (curr <= total) {
                    this.queryListTrialReport(curr)
                } else {
                    this.loading = false
                }
            }

        },
        handleCorrention(obj) {
            let objs = JSON.stringify(obj);
            objs = encodeURI(objs);
            this.loading = false
            this.$router.push({ path: '/lab/correctionExperiment', query: { obj: objs, msg: new Date().getTime() } })
        },
        queryListTrialReport(page) {
            this.score = ''
            this.suggestion = ''
            let trialCourseId = this.trialCourseId
            getListTrialReport({ trialCourseId, page, limit: 1 }).then(res => {
                if (res && res.flag) {
                    this.curr = page
                    let resData = res.resData
                    let item = resData && resData.list[0];
                    let id = item && item.id
                    let $index = this.curr
                    let total = resData.total
                    const obj = { $index, page, limit: 1, total, id, trialCourseId: this.trialCourseId }
                    this.handleCorrention(obj)
                }
            }).finally(() => {
                this.loading = false
                this.nextSign = false
            })
        },
        handleCorrention(obj) {
            let objs = JSON.stringify(obj);
            objs = encodeURI(objs);
            this.loading = false
            this.$router.push({ path: '/lab/correctionExperiment', query: { obj: objs, msg: new Date().getTime() } })
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
.rep-table-container {
    padding: 30px;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom: 0;
    min-width:800px;
    // width: 800px;
    max-width: 900px;
    height: calc(100vh - 250px);
    margin: 0 auto;

}

.app-container {
    position: relative;
    height: calc(100vh - 60px);
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
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
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
</style>