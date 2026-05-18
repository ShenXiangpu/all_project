<template>
  <div class="app-container">
    <my-table
      type="my"
      :tableData="labsList"
      @queryList="queryList"
      :listQuery="listQuery"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleStatus="handleStatus"
      @handleLook="handleLook"
    />
    <add-dialog
      ref="add-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import CustomInfoDialog from "@/views/contractMng/components/CustomInfoDialog.vue";
import { ruleList, delOneClueRule, oneClueRule } from "@/api/crm/myClues";
import { calculateNode } from "@/api/crm/approval";
import { cloneDeep } from "lodash";
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import DelDetailDialog from "@/views/contractMng/components/DelDetailDialog.vue";
import ApprovalDialog from "@/components/ApprovalDialog";
export default {
  name: "CustomerInfo",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    CustomInfoDialog,
    DelDetailDialog,
    ApprovalDialog,
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
      tableList: [],
    };
  },
  methods: {
    handleCustomerInfo(row) {
      const custom = this.$refs["custom-info-dialog"];
      custom.handleOpen();
      let location = row && row && row.location;
      if (location) {
        location.indexOf(",") > -1 ? (location = location.split(",")) : "";
        row.location = location;
      }
      let form = {
        ...row,
      };
      custom.form = form;
      let clueId = row.clueId;
      if (clueId) {
        custom.clueId = clueId;
      }
      let customerId = row.id;
      if (customerId) {
        custom.customerId = customerId;
      }
    },
    async handleDelete(data) {
      const res = await delOneClueRule(data);
      if (!res?.flag) return; // 提前返回，避免嵌套
      if (res?.flag) {
        this.$message.success("删除成功");
      }
      this.getList();
    },

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    handleStatus(form) {
      const handleResponse = (res) => {
        if (res && res.flag) {
          this.$message.success("修改成功");
          this.getList();
        }
        this.loading = false; // 在这里统一设置 loading 为 false
      };

      const handleError = () => {
        this.$message.error("操作失败，请重试！");
        this.loading = false;
      };
      oneClueRule(form, "edit").then(handleResponse).catch(handleError);
    },
    handleUpdate(item) {
      let handleItem = cloneDeep(item);
      let form = {
        ...handleItem,
      };
      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "update";
      ip.form = form;
    },
    handleLook(row) {
      let handleItem = cloneDeep(row);
      let form = {
        ...handleItem,
      };
      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "look";
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
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
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
      ruleList(this.listQuery).then((reponse) => {
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
