<template>
  <div id="FeaDataMonitor" :style="{ height: height, width: width }"></div>
</template>
  
<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
import resize from "./mixins/resize";
// require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    featureData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    chartsColor: {
      type: Object,
    },
  },
  data() {
    return {
      chart: null,
      feature: {},
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.ageList();
    });
  },
  // 只要进来的图表数据有变化，就重新渲染
  watch: {
    featureData: {
      handler(newVal, oldVal) {
        this.feature = newVal;
        console.log("this.feature ", this.feature);
        this.ageList();
      },
      deep: true, //对象内部属性的监听，关键。
      immediate: true,
    },
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //处理data
    handleData(data) {
      if (data) {
        return Number(data.substring(0, data.length - 2));
      }
      return 0;
    },

    ageList() {
      let _this = this;
      this.chart = echarts.init(document.getElementById("FeaDataMonitor"));

      let optionRight1 = {
        backgroundColor: "rgb(250,251,255)",
        title: {
          show: true,
          text: "Feature使用时长",
          textStyle: {
            fontSize: 12,
            fontWeight: "600",
            textAlign: "auto",
            width: "100%",
          },
          bottom: "10px",
          left: "37%",
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
        xAxis: {
          type: "category",
          axisLabel: {
            fontSize: 10,
          },
          axisLine: {
            lineStyle: {
              color: "#bbb",
              width: 1,
            },
          },
          data: [],
        },
        yAxis: {
          name: "单位：min",
          verticalAlign: "bottom",
          color: "#ddd",
          nameLocation: "end",
          align: "right",
          type: "value",
          nameGap: 20,
          fontWeight: "bolder",
          nameTextStyle: {
            fontSize: 10,
          },
          axisLabel: {
            fontSize: 10,
          },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            showSymbol: false,
            emphasis: {
              disabled: true,
            },
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
          },
        ],
      };

      let feature = this.feature;
      let xData = [];
      let yData = [];
      optionRight1.yAxis.name = `单位：${feature && feature[0].unitY}`;
      feature.forEach((item) => {
        xData.push(item.label);
        yData.push(Number(item.value));
      });
      optionRight1.xAxis.data = xData;
      optionRight1.series[0].data = yData;
      console.log("optionRight1", optionRight1);
      _this.chart.setOption(optionRight1);
    },
  },
};
</script>
  