<template>
  <div :id="id" :style="{ height: height, width: width }" class="echarts"></div>
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
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    titleText: {
      type: String,
      default: "",
    },
    chartsColor: {
      type: Object,
    },
  },
  data() {
    return {
      chart: null,
      echartsData: {},
    };
  },
  created() { },
  mounted() {

  },
  // 只要进来的图表数据有变化，就重新渲染
  watch: {
    data: {
      handler(newVal, oldVal) {
        console.log("new", newVal);

        let echartsData = newVal;
        this.echartsData = echartsData
        this.$nextTick(() => {
          this.ageList(echartsData);
        });
      },
      immediate: true,
      deep: true, //对象内部属性的监听，关键。
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

    ageList(echartsData) {
      let _this = this;
      this.chart = echarts.init(document.getElementById(this.id));
      let time = [];
      let rank = [];
      let score = [];
      if (echartsData) {
        echartsData.map(item => {
          time.push(item.name);
          rank.push(item.rank);
          score.push(item.score);
        });
      }
      let optionRight1 = {
        title: {
          text: this.titleText,
          textStyle: {
            color: "#1090FF",
            fontStyle: "normal",
            // fontWeight: "normal",
            fontSize: 14,
          },
          left: "center",
          bottom: "0",

        },
        legend: {
          show: true,
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: time,
          axisLabel: {
            // 截断逻辑：超过5字符显示为前5字符+...
            formatter: function (value) {
              return value.length > 4 ? value.substring(0, 4) + '...' : value;
            }
          },
          boundaryGap:false
        },

        yAxis: [
          {
            // 左侧 Y 轴
            type: "value",
            name: "分数",
            position: "left", // 默认左侧，可省略
          },
          {
            // 右侧 Y 轴
            type: "value",
            name: "名次",
            position: "right", // 显式指定右侧
          },
        ],
        series: [
          {
            data: score,
            type: "line",
            name: "分数",
            symbol: "none",
            yAxisIndex: 0, // 使用第二个 Y 轴（右侧）
          },

          {
            data: rank,
            type: "line",
            name: "名次",
            symbol: "none",
            yAxisIndex: 1, // 使用第二个 Y 轴（右侧）
          },
        ],
      };

      _this.chart.setOption(optionRight1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
