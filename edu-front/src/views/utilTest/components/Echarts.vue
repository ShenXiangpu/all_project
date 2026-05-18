<template>
  <div :id="id" :style="{ height: height, width: width }"></div>
</template>

<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
import resize from "@/views/dashboard/TeacherAndSch/components/mixins/resize";
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
      this.chart = echarts.init(document.getElementById(this.id));

      let optionRight1 = {
        legend: {
          show: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            name: "series1",
          },
        ],
      };

      _this.chart.setOption(optionRight1);
    },
  },
};
</script>
