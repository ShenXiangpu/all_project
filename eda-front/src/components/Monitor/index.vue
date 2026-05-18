<template>
    <div>
        <el-card>
            <border-container class="marginBottom10 border-container" :lBCircle="lBCircle" :lSCircle="lSCircle"
                :rBCircle="rBCircle" :rSCircle="rSCircle" :height="15" :isBgShow="false" :isShowTitle="false">
                <template #content>
                    <el-row class="row">
                        <el-col class="col" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <svg-icon icon-class="cpu-usage" class="icon" />
                            <div class="title">cpu使用情况</div>
                            <span class="value">
                                <label>{{ cpuUsage }}</label>MHz
                            </span>
                        </el-col>
                        <el-col class="col middleCol" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <svg-icon icon-class="memory-usage" class="icon" />
                            <div class="title">内存使用情况</div>
                            <span class="value">
                                <label style="color: rgb(255, 148, 22)">{{ memoryUsage }}</label>GB
                            </span>
                        </el-col>
                        <el-col class="col" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                            <svg-icon icon-class="disk-usage" class="icon" />
                            <div class="title">存储使用情况</div>
                            <span class="value">
                                <label style="color: rgb(91, 143, 217)">{{ diskUsage }}</label>GB
                            </span>
                        </el-col>

                    </el-row>
                </template>
            </border-container>

            <el-row style="margin:20px 0">
                <el-col class="col flex" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-date-picker class="el-date-picker-edu" @change="changeTime" v-model="value2" type="datetimerange"
                        :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        align="right" :clearable="false">
                    </el-date-picker>
                </el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col class="el-col-container marginBottom10" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <el-card v-loading="echartsLoading">
                        <auto-charts :echartsLoading="echartsLoading" :canvasWidth="canvasWidth"
                            :style="{ height: '300px', width: canvasWidth }" docId="cpu" graphID="CPU"
                            :data="vmMonitor && vmMonitor.length > 0 && vmMonitor[0]"></auto-charts>
                    </el-card>
                </el-col>
                <el-col class="el-col-container marginBottom10" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <el-card v-loading="echartsLoading">
                        <auto-charts :echartsLoading="echartsLoading" docId="memory" graphID="内存" :canvasWidth="canvasWidth"
                            :style="{ height: '300px', width: canvasWidth }"
                            :data="vmMonitor && vmMonitor.length > 0 && vmMonitor[1]"></auto-charts>
                    </el-card>
                </el-col>
                <el-col class="el-col-container marginBottom10" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <el-card v-loading="echartsLoading">
                        <auto-charts :echartsLoading="echartsLoading" docId="net" graphID="网络" :canvasWidth="canvasWidth"
                            :style="{ height: '300px', width: canvasWidth }"
                            :data="vmMonitor && vmMonitor.length > 0 && vmMonitor[2]"></auto-charts>
                    </el-card>
                </el-col>
                <el-col class="el-col-container marginBottom10" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <el-card v-loading="echartsLoading">
                        <auto-charts :echartsLoading="echartsLoading" docId="card" graphID="磁盘" :canvasWidth="canvasWidth"
                            :style="{ height: '300px', width: canvasWidth }"
                            :data="vmMonitor && vmMonitor.length > 0 && vmMonitor[3]"></auto-charts>
                    </el-card>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
import AutoCharts from './components/AutoCharts.vue';
import BorderContainer from '@/components/BorderContainer'
export default {
    components: {
        AutoCharts,
        BorderContainer
    },
    props: {
        vmId: {
            default: '',
            type: String
        },
        cpuUsage: {
            default: 0,
            type: Number
        },
        memoryUsage: {
            default: 0,
            type: Number
        },
        diskUsage: {
            default: 0,
            type: Number
        },
        vmMonitor: {
            default: [],
            type: Array
        },
        canvasWidth: {
            default: '0',
            type: String
        },
        date: {
            default: () => {
                return [new Date() - 3600 * 1000, new Date().getTime()]
            },
            type: Array
        },
        echartsLoading: {
            default: false,
            type: Boolean
        }
    },
    watch: {
        'vmMonitor': {
            handler(newVal, oldVal) {
                this.vmMonitor = newVal
            },
            immediate: true

        }
    },
    data() {
        return {
            pickerOptions: {

                shortcuts: [{
                    text: '实时',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },

            value2: [new Date() - 3600 * 1000, new Date().getTime()],
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
            },
            rSCircle: {
                width: '8px',
                height: '16px',
                borderRadius: '8px 0  0 8px',
                top: '6px'
            }
        }
    },
    created() {

    },
    mounted() {


    },
    methods: {
        changeTime(time) {
            let vmId = this.vmId
            if (!time) {
                let date = [new Date() - 3600 * 1000, new Date().getTime()]
                let startTime = date && date[0]
                let endTime = date && date[1]
                this.value2 = date
                this.$emit('changeTime', { vmId, startTime, endTime })

            } else {
                let startTime = time && time[0]
                let endTime = time && time[1]
                this.value2 = [startTime, endTime]
                this.$emit('changeTime', { vmId, startTime, endTime })

            }

            // this.queryPeriodPerformance({ vmId, startTime, endTime })
        },




    },
}
</script>

<style lang="scss" scoped>
.row {
    display: block;
    // height: 80px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;

    .col {
        display: inline-block;
        height: 80px;
        line-height: 80px;

        .icon {
            display: inline-block;
            // float: left;
            height: 100%;
            margin-right: 5px;
            margin-top: 0;
            line-height: 80px;
            font-size: 62px;
            vertical-align: middle;
            box-sizing: border-box;
        }

        .title {
            display: inline-block;
            font-weight: bold;
            margin-left: 5px;
        }

        .value {
            display: inline-block;
            margin-left: 20px;

            >label {
                color: #8cc153;
                font-size: 24px;
                margin-right: 2px;
            }
        }
    }
}

.middleCol {
    border-left: 1px solid rgba(24, 144, 255, 0.2);
    border-right: 1px solid rgba(24, 144, 255, 0.2);
}


::v-deep {
    .el-date-picker-edu {
        width: 500px;
    }
}

.el-button--text {
    display: none !important;
    border: 1px solid red;
}
</style>