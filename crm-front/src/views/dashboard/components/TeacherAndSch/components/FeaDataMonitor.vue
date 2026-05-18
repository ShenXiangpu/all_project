<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>学生/实验数据监控</span>
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
      <fea-data-monitor-line :featureData="featureData"></fea-data-monitor-line>
    </div>
  </el-card>
</template>

<script>
import FeaDataMonitorLine from "./FeaDataMonitorLine.vue";
export default {
  name: "",
  components: {
    FeaDataMonitorLine,
  },
  created() {
    this.queryUsageDuration();
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

    };
  },
  methods: {
    getFeatureOptions() {
      this.queryUsageDuration();
    },
    queryUsageDuration() {
      let data = {
        dayLimit: this.value,
      };
      usageDuration(data).then((res) => {
        let resData = res.resData;
        this.featureData = resData;
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