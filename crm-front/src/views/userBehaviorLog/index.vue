<template>
  <div class="app-container">
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
    />
    <my-table
      :tableData="labsList"
      :listQuery="listQuery"
      @searchQuery="searchQuery"
      @queryList="queryList"
      :loading="loading"
      :total="total"
    />
  </div>
</template>

<script>
import { getLogs } from "@/api/crm/userBehaviorLog";

import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import { cloneDeep } from "lodash";
export default {
  name: "UserBehaviorLog",
  components: {
    FilterForm,
    MyTable,
  },
  created() {},
  mounted() {
    this.getList();
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: {},
      },
      labsList: [],
      tableList: [], //详情信息
      total: 0,
      loading: false,
    };
  },
  methods: {

    async handleDelete(ids, list) {
      const param = {
        instType: "合同删除",
        removeIds: ids,
      };

      const res = await calculateNode(param);
      if (!res?.flag) return; // 提前返回，避免嵌套

      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = true;

      approval.nodeInfo = res.resData ?? {}; //空值合并运算符

      this.tableList = list;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
    },
    getList() {
      this.loading = true;
      getLogs(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData.records;
        this.total = resData.total;
        this.loading = false;
      });
    },
    handleQuery(form) {
      this.listQuery.params = form;
      this.getList();
    },
    resetQuery(form) {
      this.getList();
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
