<template>
  <div class="app-container">
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
      :type="type"
    />
    <my-table
      type="my"
      :tableData="labsList"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="handleCustom"
      @handleUpdate="handleUpdate"
      @handleFollow="handleFollow"
      @handleCustom="handleCustom"
    />
    <add-dialog
      ref="add-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <follow-dialog
      ref="follow-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <add-custom-dialog
      ref="add-custom-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import { contractRecordsList } from "@/api/crm/customMng";

import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import AddCustomDialog from "./components/AddCustomDialog.vue";
export default {
  name: "ContractRecords",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    AddCustomDialog,
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
      total: 0,
      loading: false,
    };
  },
  methods: {
    async handleDelete(row) {
      const { id } = { ...row };
      const res = await delOneIP({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleUpdate(item) {
      let form = {};
      const custom = this.$refs["add-custom-dialog"];
      custom.handleOpen();
      custom.dialog.status = "update";
      ip.form = form;
    },

    handleClose() {},
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen();
    },
    handleFollow() {
      const ip = this.$refs["follow-dialog"];
      console.log("follow", ip);

      ip.handleOpen();
    },
    handleCustom() {
      const custom = this.$refs["add-custom-dialog"];
      custom.handleOpen();
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
      this.querySearchKey();
    },
    //querysearchKey
    querySearchKey() {
      searchKey().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.ipSupplierList = resData.ipSupplier;
        }
      });
    },
    gotoDetail(id) {
      this.$router.push({
        path: "centerDetail",
        query: {
          id,
        },
      });
    },
    edit(row) {
      this.$router.push({
        path: "createCourse",
        query: {
          id: row.id,
          ar: row.arch,
        },
      });
    },

    getList() {
      this.loading = true;
      contractRecordsList(this.listQuery).then((reponse) => {
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
