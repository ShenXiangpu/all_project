<template>
  <el-card>
    <div slot="header" class="clearfix">
      <!-- （老师端和管理） -->
      <span class="header-span"><span>到期提醒</span> </span>
    </div>
    <div>
      <the-charts-table-sys :tableData="rankList"></the-charts-table-sys>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import TheChartsTable from "./TheChartsTable.vue";
import TheChartsTableSys from "./TheChartsTableSys.vue";
import { contract } from "@/api/crm/dashboard";
export default {
  name: "",
  components: {
    TheChartsTable,
    TheChartsTableSys,
  },
  created() {
    this.queryRankList();
  },
  computed: {},
  data() {
    return {
      rankList: [],
    };
  },
  methods: {
    queryRankList() {
      contract().then((res) => {
        let resData = res.resData;
        this.rankList = resData;
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
  background-image: url("../../../../../assets/img/dashboard/trophy.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 10% 100%;
}
.el-select-container {
  ::v-deep {
    .el-input__inner {
      width: 200px;
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
