<template>
  <div class="app-container">
    <filter-form ref="filterForm" @resetQuery="resetQuery" @handleQuery="handleQuery" />
    <my-table type="my" :tableData="labsList" @queryList="queryList" :listQuery="listQuery" @searchQuery="searchQuery"
      :loading="loading" :total="total" @edit="edit" @delete="handleDelete" @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog" @handleUpdate="handleUpdate" @handleFollow="handleFollow"
      @handleCustom="handleCustom" @handleCustomerInfo="handleCustomerInfo" />
    <add-dialog ref="add-dialog" @queryList="queryList" @handleClose="handleClose" />
    <!-- <follow-dialog
      ref="follow-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <add-custom-dialog
      ref="add-custom-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    /> -->
    <custom-info-dialog ref="custom-info-dialog" @queryList="queryList" @handleClose="handleClose" />

    <approval-dialog ref="approval-dialog" :delNumber="tableList.length || 0" @queryDetail="queryDetail" />
    <del-detail-dialog ref="del-detail-dialog">
      <template v-slot:table>
        <my-table :isDetail="true" :tableData="tableList" :total="0" />
      </template>
    </del-detail-dialog>
  </div>
</template>

<script>
import CustomInfoDialog from "@/views/contractMng/components/CustomInfoDialog.vue";
import { customList, delCustomList } from "@/api/crm/customMng";
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
  created() { },
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
      custom.componentName = "CusTable";
      custom.dialog.visible = true;
      custom.dialog.status = "look";
    },
    async handleDelete(ids, list) {
      const param = {
        instType: "客户删除",
        removeIds: ids,
      };

      const res = await calculateNode(param);
      if (!res?.flag) return; // 提前返回，避免嵌套

      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = true;

      approval.nodeInfo = res.resData ?? {}; //空值合并运算符

      console.log("approval", approval.nodeInfo);

      this.tableList = list;
    },

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    handleUpdate(item) {
      let handleItem = cloneDeep(item);
      let location = handleItem && handleItem.location;
      if (location && typeof location == "string") {
        handleItem.location =
          (handleItem &&
            handleItem.location &&
            handleItem.location.split(",")) ||
          [];
      }
      let form = {
        ...handleItem,
      };
      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "update";

      ip.form = form;
    },

    handleClose() { },
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen();
    },
    handleFollow(row) {
      const custom = this.$refs["custom-info-dialog"];
      custom.handleOpen();
      custom.dialog.status = "follow";
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
      console.log("customerId", customerId);

      if (customerId) {
        custom.customerId = customerId;
      }
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
      customList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData.records;
        this.total = resData.total;
        this.loading = false;
      });
    },
    handleQuery(form) {
      this.listQuery.page = 1;
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
