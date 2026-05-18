<template>
  <!-- <div :id="docId" style="width:100%, height: 300px "></div> -->
  <div :id="docId" :style="{ height: '400px', width: '100%' }"></div>
</template>

<script>
import { isEqual } from "lodash";
import * as echarts from "echarts";
import resize from "@/components/resize";
require("echarts/theme/macarons"); // echarts theme
export default {
  mixins: [resize],
  props: {
    docId: {
      type: String,
      default: "",
    },
    graphID: {
      type: String,
      default: "",
    },
    data: {
      type: Array | Boolean,
      default: [] || false,
    },
    width: {
      type: String,
      default: null,
    },
    canvasWidth: {
      type: String,
      default: "",
    },
    echartsLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    data: {
      deep: true,
      handler(newVal, oldVal) {
        console.log('--------', newVal, oldVal);

        this.data = newVal;
        if (newVal) {
          this.getChart(this.docId, this.graphID, this.data);
        } else {
          this.getChart(this.docId, this.graphID, []);
        }
      },
      immediate: true,
    },
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.getChart(this.docId, this.graphID, this.data);
    });
    if (this.width) {
      document.querySelector(`#${this.docId}`).style.width = this.width + "px";
    }
  },
  destroyed() { },
  methods: {
    w() {
      let w = window.screen.width - window.screen.width * 0.6;
      return w + "px";
    },
    getChart(docId, graphID, data) {
      let unit = "";
      let unit2 = "";
      let beginTime;
      let endTime;
      let dataInterval; //  开始时间 + interval*（data数组长度-1）= 结束时间
      const legendData =
        data &&
        data.map((item) => item.legendItem && item.legendItem.measurement);
      console.log(legendData);

      const baseData =
        data &&
        data.map((item, index) => {
          beginTime = item.beginTime && Number(item.beginTime);
          endTime = item.endTime && Number(item.endTime);
          const interval = item.interval;
          dataInterval = Number(interval) * 1000; // interval单位是s，转成毫秒ms

          if (!unit && isEqual(index, 0) && item.legendItem) {
            // 单位
            unit = item.legendItem.units;
          }

          if (!unit2 && isEqual(index, data.length - 1) && item.legendItem) {
            // 单位
            unit2 = item.legendItem.units;
          }

          const seriesData =
            item.data &&
            item.data.map((v, index) => {
              const arr = []; // 数据格式为：[时间戳，值]
              arr.push(beginTime + dataInterval * index); // 加上时间戳
              arr.push(v); // value
              return arr;
            });

          const series = {
            type: "line",
            showSymbol: false, // 控制是否显示各个节点的样式
            hoverAnimation: false,
            lineStyle: {
              // 设置线条粗细，线宽
              width: 2,
            },
            name: item.name,
            // yAxisIndex: isEqual(index, 0) ? 0 : 1, // 双Y轴，指定具体的数据使用哪个Y轴
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(234,237,250,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(234,237,250,0.1)",
                },
              ]),
            },
            data: seriesData,
          };

          return series;
        });

      const node = document.getElementById(docId);
      const myChart = node && echarts && echarts.init(node); // 绘制图表


      // 1. 核心：判断数据是否为空
      const hasValidData = data && data.length > 0 && data.some(item => item.data && item.data.length > 0);

      if (!hasValidData) {
        // 应用空数据状态的配置
        const emptyOption = {
          title: {
            // text: graphID,
            left: '18px',
            top: '0',
            textStyle: { color: '#000', fontSize: 14, fontWeight: '400' }
          },
          xAxis: {
            type: 'time',
            // 建议：如果没有数据，但想显示一个默认的时间范围（例如最近24小时），可以在这里设置 min 和 max
            // min: ...,
            // max: ...,
            axisLabel: {
              color: '#999',
              rotate: 15,
              textStyle: { fontSize: 10 },
              formatter: function (value) {
                const date = new Date(value);
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? '0' + d : d;
                let h = date.getHours();
                h = h < 10 ? '0' + h : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? '0' + minute : minute;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
              }
            },
            splitLine: { show: true, lineStyle: { type: 'dashed', color: '#F3F4F4' } },
            axisTick: { show: false },
            axisLine: { show: true, lineStyle: { color: '#ccc' } }
          },
          yAxis: {
            type: 'value',
            axisLabel: { color: '#999', textStyle: { fontSize: 10 } },
            splitLine: { show: true, lineStyle: { type: 'dashed', color: '#F3F4F4' } },
            axisTick: { show: false },
            axisLine: { show: true, lineStyle: { color: '#ccc' } }
          },
          series: [], // 确保系列数据为空
          graphic: {
            // 添加"暂无数据"文本提示
            elements: [{
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: '暂无数据',
                fontSize: 16,
                fill: '#999'
              }
            }]
          }
        };
        myChart.setOption(emptyOption, true); // 使用 true 防止合并旧配置
        return; // 直接返回，不再执行后面的逻辑
      }

      let setOption = {
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        backgroundColor: "rgb(250,251,255)",
        title: {
          // text: graphID,
          left: "18px",
          top: "0",
          textStyle: {
            color: "#000",
            fontSize: 14,
            fontWeight: "400",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#ccc",
            },
          },
          confine: true,
          // position: [10, 10],
          textStyle: {
            width: 80,
            height: 20,
            fontSize: 12,
            fontWeight: "400",
            color: "#000",
          },
        },
        legend: {
          left: "30%",
          bottom: "0%",

          data: ["CPU使用情况", "内存使用情况", "存储使用情况"],
        },
        // legend: [
        //   {
        //     data: ["CPU使用情况"],
        //     origin: "horizontal",
        //     bottom: "bottom",
        //     itemHeight: 10,
        //     x: "200px",
        //     y: "280px",
        //     textStyle: {
        //       fontSize: 14,
        //     },
        //   },
        //   {},
        //   {},
        // ],
        grid: {
          //显示数据的图表位于当前canvas的坐标轴
          left: "10%",
          top: "10%",
          bottom: "25%",
          right: "10%",
        },
        xAxis: [
          {
            type: "time",
            min: new Date(beginTime), // 开始时间
            max: new Date(endTime), // 结束时间
            // interval: dataInterval,

            axisLabel: {
              color: "#999",
              rotate: 15,
              showMinLabel: false,
              textStyle: {
                fontSize: 10,
              },
              formatter: function (value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                const date = new Date(value);
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? "0" + m : m;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? "0" + minute : minute;
                let second = date.getSeconds();
                second = second < 10 ? "0" + second : second;
                return (
                  y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
                );
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#F3F4F4",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#999",
              textStyle: {
                fontSize: 10,
              },
              formatter: function (value) {
                return value + " " + unit;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#F3F4F4",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
              },
            },
          },
          {
            axisLabel: {
              color: "#999",
              textStyle: {
                fontSize: 10,
              },
              formatter: function (value) {
                return value + " " + unit2;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#F3F4F4",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ccc",
              },
            },
          },
        ],
        series: baseData,
        graphic: {
            // 添加"暂无数据"文本提示
            elements: [{
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: '',
                fontSize: 16,
                fill: '#999'
              }
            }]
          }
      };

      console.log("================================",baseData);

      // if (!docId) {
      //     return
      // }
      myChart && myChart.setOption(setOption);

      // window.addEventListener('resize', () => {
      //     myChart.resize();
      // });
    },
  },
};
</script>

<style lang="scss" scoped></style>
