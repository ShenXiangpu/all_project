<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>资源数据监控</span>
      <div style="float: right" class="el-select-container">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="getFeatureOptions"
        >
          <el-option
            v-for="item in featureDataMonitorOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <sour-data-monitor-line
        :echartsLoading="echartsLoading"
        docId="cpu"
        graphID="CPU"
        :data="featureData"
      ></sour-data-monitor-line>
    </div>
  </el-card>
</template>

<script>
import { queryClusterPerformance } from "@/api/dashboard";
import SourDataMonitorLine from "./SourDataMonitorLine.vue";

export default {
  name: "",
  components: {
    SourDataMonitorLine,
  },
  created() {
    this.query();
  },
  data() {
    return {
      featureDataMonitorOptions: [
        {
          id: 1,
          label: "一天内",
          value: "1",
        },
        {
          id: 2,
          label: "七天内",
          value: "7",
        },
        {
          id: 3,
          label: "三十天内",
          value: "30",
        },
        {
          id: 4,
          label: "九十天内",
          value: "90",
        },
        {
          id: 5,
          label: "一年内",
          value: "365",
        },
      ],
      value: "1",
      featureData: [],
      canvasWidth: "100%",
      echartsLoading: false,
    };
  },
  methods: {
    getFeatureOptions() {
      this.query();
    },
    query() {
      let data = {
        interval: this.value,
      };
      queryClusterPerformance(data).then((res) => {
        this.featureData = res.resData;
        console.log("this.featureData", this.featureData);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-container {
  ::v-deep {
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      background-color: rgb(238, 240, 250);
      text-align: center;
      border: none;
      color: rgb(98, 108, 161);
      font-weight: 700;
    }

    .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>