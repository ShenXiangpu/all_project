<template>
  <div :id="docId" :style="{ height: '220px', width: '100%' }"></div>
</template>

<script>
import { isEqual } from "lodash";
import * as echarts from "echarts";
import resize from "@/components/resize";
import { min } from "lodash";
import { max } from "lodash";
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
      type: Array | Boolean | Object,
      default: [] || false || {},
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
      const node = document.getElementById(docId);
      const myChart = node && echarts && echarts.init(node); // 绘制图表


      // let setOption = {
      //   color: [
      //     "#5470c6",
      //     "#91cc75",
      //     "#fac858",
      //     "#ee6666",
      //     "#73c0de",
      //     "#3ba272",
      //   ],
      //   backgroundColor: "rgb(250,251,255)",
      //   title: {
      //     // text: graphID,
      //     left: "18px",
      //     top: "0",
      //     textStyle: {
      //       color: "#000",
      //       fontSize: 14,
      //       fontWeight: "400",
      //     },
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       lineStyle: {
      //         color: "#ccc",
      //       },
      //     },
      //     confine: true,
      //     // position: [10, 10],
      //     textStyle: {
      //       width: 80,
      //       height: 20,
      //       fontSize: 12,
      //       fontWeight: "400",
      //       color: "#000",
      //     },
      //   },
      //   legend: {
      //     left: "30%",
      //     bottom: "0%",
      //   },

      //   grid: {
      //     //显示数据的图表位于当前canvas的坐标轴
      //     left: "10%",
      //     top: "10%",
      //     bottom: "25%",
      //     right: "10%",
      //   },
      //   xAxis:
      //   {
      //     type: "time",
      //     data: data && data.dateList,

      //     axisLabel: {
      //       color: "#999",
      //       rotate: 15,
      //       showMinLabel: false,
      //       textStyle: {
      //         fontSize: 10,
      //       },
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //         type: "dashed",
      //         color: "#F3F4F4",
      //       },
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: true,
      //       lineStyle: {
      //         color: "#ccc",
      //       },
      //     },
      //   },

      //   yAxis:
      //   {
      //     type: "value",
      //     axisLabel: {
      //       color: "#999",
      //       textStyle: {
      //         fontSize: 10,
      //       },
      //       formatter: function (value) {
      //         return value + " " + unit;
      //       },
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //         type: "dashed",
      //         color: "#F3F4F4",
      //       },
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: true,
      //       lineStyle: {
      //         color: "#ccc",
      //       },
      //     },
      //   },


      //   series: data && data.loginCountList,
      //   graphic: {
      //     // 添加"暂无数据"文本提示
      //     elements: [{
      //       type: 'text',
      //       left: 'center',
      //       top: 'middle',
      //       style: {
      //         text: '',
      //         fontSize: 16,
      //         fill: '#999'
      //       }
      //     }]
      //   }
      // };
      // if (!docId) {
      //     return
      // }

      let setOption = {
        legend: {
          left: "10%",
          bottom: "0%",

        },
        grid: {
          //显示数据的图表位于当前canvas的坐标轴
          left: "5%",
          top: "20%",
          bottom: "10%",
          right: "5%",
        },
        tooltip: {
          trigger: "axis",

          formatter: function (params) {
            let relVal = params[0].name;
            for (let i = 0, l = params.length; i < l; i++) {
              relVal +=
                "<br/>" +
                params[i].marker +
                '登录次数 ' +
                "&nbsp;&nbsp;</t>" +
                params[i].value + ' 次';
            }
            return relVal;
          },
        },
        xAxis: {
          type: 'category',
          data: data && data.dateList,

          axisLabel: {
            color: "#999",
            rotate: 10,
            showMinLabel: false,
            textStyle: {
              fontSize: 10,
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
        yAxis: {
          type: 'value',
          name: '登录次数',

          min: 0,
          minInterval: 1,
          max: function (value) {
            return max([value.max, 10]);
          },
          axisLabel: {
            color: "#999",
            textStyle: {
              fontSize: 10,
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
        series: [
          {

            data: data && data.loginCountList,
            type: 'line'
          }
        ]
      };
      myChart && myChart.setOption(setOption);

      // window.addEventListener('resize', () => {
      //     myChart.resize();
      // });
    },
  },
};
</script>

<style lang="scss" scoped></style>
