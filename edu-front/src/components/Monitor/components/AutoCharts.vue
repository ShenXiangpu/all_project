<template>
    <!-- <div :id="docId" style="width:100%, height: 300px "></div> -->
    <div :id="docId" :style="{ height: '300px', width: '100%' }"></div>
</template>

<script>
import { isEqual } from 'lodash'
import * as echarts from "echarts"
import resize from '@/components/resize'
require('echarts/theme/macarons') // echarts theme
export default {
    mixins: [resize],
    props: {
        docId: {
            type: String,
            default: ''
        },
        graphID: {
            type: String,
            default: ''
        },
        data: {
            type: Array | Boolean,
            default: [] || false
        },
        width: {
            type: String,
            default: null
        },
        canvasWidth: {
            type: String,
            default: ''
        },
        echartsLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    watch: {
        'data': {
            deep: true,
            handler(newVal, oldVal) {
                this.data = newVal
                if (newVal) {
                    this.getChart(this.docId, this.graphID, this.data)
                }
            },
            immediate: true

        },
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.getChart(this.docId, this.graphID, this.data)
        })
        if (this.width) {
            (document.querySelector(`#${this.docId}`)).style.width = this.width + 'px';
        }
    },
    destroyed() {

    },
    methods: {
        w() {
            let w = window.screen.width - window.screen.width * 0.6
            return w + 'px'
        },
        getChart(docId, graphID, data) {
            let unit = '';
            let unit2 = '';
            let beginTime;
            let endTime;
            let dataInterval; //  开始时间 + interval*（data数组长度-1）= 结束时间
            const legendData = data && data.map(item => item.legendItem && item.legendItem.measurement);
            const baseData = data && data.map((item, index) => {
                beginTime = item.beginTime && Number(item.beginTime);
                endTime = item.endTime && Number(item.endTime);
                const interval = item.interval;
                dataInterval = Number(interval) * 1000; // interval单位是s，转成毫秒ms

                if (!unit && isEqual(index, 0) && item.legendItem) { // 单位
                    unit = item.legendItem.units;
                }

                if (!unit2 && isEqual(index, data.length - 1) && item.legendItem) { // 单位
                    unit2 = item.legendItem.units;
                }

                const seriesData = item.data && item.data.map((v, index) => {
                    const arr = []; // 数据格式为：[时间戳，值]
                    arr.push(beginTime + dataInterval * index);     // 加上时间戳
                    arr.push(v);  // value
                    return arr
                })

                const series = {
                    type: 'line',
                    showSymbol: false,   // 控制是否显示各个节点的样式
                    hoverAnimation: false,
                    lineStyle: {       // 设置线条粗细，线宽
                        width: 2
                    },
                    name: item.name,
                    yAxisIndex: isEqual(index, 0) ? 0 : 1,  // 双Y轴，指定具体的数据使用哪个Y轴
                    data: seriesData
                }

                return series;
            })

            const node = document.getElementById(docId);
            const myChart = node && echarts && echarts.init(node); // 绘制图表
            let setOption = {
                color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
                backgroundColor: '#fff',
                title: {
                    text: graphID,
                    left: "18px",
                    top: "0",
                    textStyle: {
                        color: "#000",
                        fontSize: 14,
                        fontWeight: '400'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    confine: true,
                      position: [10, 10],
                      textStyle: {
                        width: 80,
                        height: 20,
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#000'
                    }
                },
                legend: {
                    data: legendData,
                },
                grid: {      //显示数据的图表位于当前canvas的坐标轴
                    left: '15%',
                    top: '15%',
                    // bottom: '15%',
                    right: '15%'
                },
                xAxis: [{
                    type: 'time',
                    min: new Date(beginTime),  // 开始时间
                    max: new Date(endTime),    // 结束时间
                    // interval: dataInterval,

                    axisLabel: {
                        color: '#999',
                        rotate: 15,
                        textStyle: {
                            fontSize: 12
                        },
                        formatter: function (value, index) {
                            // 格式化成月/日，只在第一个刻度显示年份
                            const date = new Date(value);
                            const y = date.getFullYear();
                            let m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            let d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            let h = date.getHours();
                            h = h < 10 ? ('0' + h) : h;
                            let minute = date.getMinutes();
                            minute = minute < 10 ? ('0' + minute) : minute;
                            let second = date.getSeconds();
                            second = second < 10 ? ('0' + second) : second;
                            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#F3F4F4'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#999',
                        textStyle: {
                            fontSize: 12
                        },
                        formatter: function (value) {
                            return value + ' ' + unit
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#F3F4F4'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                },
                {
                    axisLabel: {
                        color: '#999',
                        textStyle: {
                            fontSize: 12
                        },
                        formatter: function (value) {
                            return value + ' ' + unit2
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#F3F4F4'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                }
                ],
                series: baseData
            }
            // if (!docId) {
            //     return
            // }
            myChart && myChart.setOption(setOption);


            // window.addEventListener('resize', () => {
            //     myChart.resize();
            // });
        },


    },
}
</script>

<style lang="scss" scoped></style>