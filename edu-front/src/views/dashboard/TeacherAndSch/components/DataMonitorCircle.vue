<template>
  <div style="position: relative">
    <div :id="id" :style="{ height: height, width: width }"></div>
    <div class="total primaryColorb fontW7">
      {{ title == '高校' ? (title + '数量：' + userData.total || 0) : (title + '总人数：' + (userData.total || 0 )+ '人') }}
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
import resize from "./mixins/resize";
// require('echarts/theme/macarons') // echarts theme
import { getCoursePageForIndex } from "@/api/dashboard.js";
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
    title: {
      type: String,
      default: "平台",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    chartsColor: {
      type: Object,
    },
    userData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  created() {
    // this.queryCoursePageForIndex();
  },
  mounted() {
    this.$nextTick(() => {
      this.ageList(this.userData);
    });
  },
  // 只要进来的图表数据有变化，就重新渲染
  watch: {
    userData: {
      handler(newVal, oldVal) {
        console.log("new", newVal);
        if (newVal) {
          this.ageList(newVal);
        }
      },
      deep: true,
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

    ageList(userData) {
      console.log(userData);
      let _this = this;
      _this.chart = echarts.init(document.getElementById(_this.id));
      let title = _this.title
      let respData = [
        { value: (userData && Number(userData.online)) || 0, name: title == '高校' ? "在线高校" : "在线人数" },

        {
          value: (userData && Number(userData.notOnline)) || 0,
          name: title == '高校' ? "离线高校" : "离线人数",
        },
      ];

      let optionRight1 = {
        title: {
          show: true,
          top: 20,
          // 标题文本1
          text: "",
          // 标题文本2
          subtext: "在线率", //这里就是默认显示的数据
          // 具体放置位置
          left: "30%",
          top: "40%",
          z: 0,
          zlevel: 100,
          textAlign: "center",
          // 文本对应的样式
          textStyle: {
            textAlign: "center",

            color: "black",
            fontSize: 14,
          },
          subtextStyle: {
            textAlign: "center",
            color: "black",
            fontSize: 12,
          },
        },
        backgroundColor: "rgb(250,251,255)",
        color: ["#409EFF", "#ffc550"],
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "42%",
          left: "60%",
          right: "right",
          orient: "vertical",
          selectedMode: false,
          itemWidth: 41.5,
          itemHeight: 21.5,
          // data: [{}],
          textStyle: {
            fontSize: 12,
          },
          formatter: function (name) {
            return name;
          },

          //   formatter: function (data) {
          //     console.log(data);
          //        return params.name + '' + params.value;
          //   }
        },
        series: [
          {
            data: [],
            name: "平台数据监控",
            type: "pie",
            radius: ["50%", "60%"],
            bottom: "3%",
            right: "38%",
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 0,
              borderColor: "#fff",
              borderWidth: 0,
            },
            label: {
              show: false,
              position: "center",
              color: "#333",
              fontSize: 14,
              fontWeight: 600,
              formatter: (params) => {
                console.log(params);
                if (params.name == "离线人数") {
                  return params.percent + "%\n\n" + "离线率";
                }
                if (params.name == "在线人数") {
                  return params.percent + "%\n\n" + "在线率";
                }
              },
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };
      optionRight1.series[0].data = respData;
      optionRight1.title.text = this.userData.onlineRate;
      // }
      _this.chart.setOption(optionRight1);
    },
  },
};
</script>
<style>
.total {
  position: absolute;
  top: 30%;
  left: 62%;
  font-size: 18px;
}
</style>
