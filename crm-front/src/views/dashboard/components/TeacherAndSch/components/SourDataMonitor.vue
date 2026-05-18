<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>部门数据</span>
    </div>
    <div>
      <home-work-data-monitor
        :tableData="tableData"
        ref="homeWorkDataMonitor"
      />
    </div>
  </el-card>
</template>

<script>
import { department } from "@/api/crm/dashboard";
import SourDataMonitorLine from "./SourDataMonitorLine.vue";
import HomeWorkDataMonitor from "./HomeWorkDataMonitor.vue";
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {
    SourDataMonitorLine,
    HomeWorkDataMonitor,
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
      queryParams: {},
      tableData: [],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      department(this.queryParams).then((reponse) => {
        let resData = reponse.resData;
        this.tableData = resData;
        this.total = resData.total;
        this.loading = false;
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
