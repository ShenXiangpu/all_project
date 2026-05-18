<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="header-span"><span>排行榜</span> </span>

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
      <the-charts-table :tableData="featureData"></the-charts-table>
    </div>
  </el-card>
</template>

<script>
import TheChartsTable from "./TheChartsTable.vue";
import { rankingList } from "@/api/dashboard";
export default {
  name: "",
  components: {
    TheChartsTable,
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
    };
  },
  methods: {
    getFeatureOptions() {
      this.query();
    },

    query() {
      let data = {
        dayLimit: this.value,
      };
      rankingList(data).then((res) => {
        let resData = res.resData;
        this.featureData = resData;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-span {
  span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    width: 100px;
    background-image: url("../../../assets/img/dashboard/trophy.png");
    background-repeat: no-repeat;
    background-size: 18%;
    background-position: 70%;
  }
}
.header-span::after {
  content: "";
  display: inline;
  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  clear: both;
  // background-color: #409eff;
  background-image: url("../../../assets/img/dashboard/trophy.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 10% 100%;
}
.el-select-container {
  ::v-deep {
    .el-input__inner {
      width: 150px;
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