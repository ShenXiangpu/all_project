<template>
  <div>
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
    />
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
      @review="showApproInfo"
      @showApproInfo="showApproInfo"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleFollow="handleFollow"
      @handleCustom="handleCustom"
    />
    <add-dialog
      ref="add-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
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
    <approval-dialog
      ref="approval-dialog"
      :delNumber="tableList.length || 0"
      @queryDetail="queryDetail"
      @handleRejectOrPass="handleRejectOrPass"
    />
    <del-detail-dialog ref="del-detail-dialog">
      <template v-slot:table>
        <component
          :is="componentName"
          :isDetail="true"
          :tableData="tableList"
          :total="0"
        />
      </template>
    </del-detail-dialog>
    <flow-app-dialog
      ref="flow-app-dialog"
      @queryList="queryList"
      @handleCloseLast="handleCloseLast"
    />
  </div>
</template>

<script>
import CustomInfoDialog from "@/views/contractMng/components/CustomInfoDialog.vue";
import { customList, delCustomList } from "@/api/crm/customMng";
import {
  pendingApproveList,
  removeListById,
  getInstDetailById,
} from "@/api/crm/approval";
import { cloneDeep } from "lodash";
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import DelDetailDialog from "@/views/contractMng/components/DelDetailDialog.vue";
import ApprovalDialog from "@/components/ApprovalDialog";
import ContractTable from "@/views/contractMng/components/Table.vue";
import CustomerTable from "@/views/customMng/customerInfo/components/Table.vue";
import CLueTable from "@/views/clueMng/FollowUpOnClues/components/Table.vue";
import SupplierTable from "@/views/supplierMng/components/Table.vue"

import FlowAppDialog from "./components/FlowAppDialog.vue";
export default {
  name: "CustomerInfo",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    CustomInfoDialog,
    DelDetailDialog,
    ApprovalDialog,
    ContractTable,
    CustomerTable,
    CLueTable,
    SupplierTable,
    FlowAppDialog,
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
      componentName: "",
      componentsMap: {
        客户删除: "CustomerTable",
        线索删除: "CLueTable",
        合同删除: "ContractTable",
        供应商删除: "SupplierTable",
      },
    };
  },
  methods: {
    /**
     * 查询审批类型的详情
     * @param ids
     * @param list
     */
    async showApproInfo(row, status) {
      const { id = 0, instType = "" } = row;
      let componentName = this.componentsMap[instType];
      this.componentName = componentName;
      const param = {
        id,
      };
      //ContractTable
      let op = componentName
        ?.substring(0, componentName?.length - 5)
        ?.toLowerCase();

      const response = await removeListById({ id }, op);
      if (response?.flag) {
        this.tableList = response?.resData || [];
      } else {
        console.error("Error fetching  remove details:", response);
      }
      const res = await getInstDetailById(param);
      if (!res?.flag) return; // 提前返回，避免嵌套

      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = true;
      approval.dialog.status = status;
      approval.needApproval = res?.resData?.needApproval;
      approval.nodeInfo = res.resData ?? {}; //空值合并运算符
    },

    async fetchRemoveDetails(id, op) {
      try {
        const response = await removeListById({ id }, op);
        console.log("Remove Details:", response);
        if (response?.flag) {
          return response?.resData || [];
        } else {
          console.error("Error fetching  remove details:", response);
        }
      } catch (error) {
        console.error("Error fetching  remove details:", error);
      }
    },
    /**
     * @param {*} isPass 打开通过或者拒绝dialog
     *
     */
    handleRejectOrPass(isPass, id) {
      const flow = this.$refs["flow-app-dialog"];
      flow.dialog.visible = true;
      flow.dialog.status = "create";
      let form = {
        handleOpinion: "",
        handleResult: isPass ? 1 : 2,
        procInstId: id,
      };
      flow.form = form;
    },
    handleCloseLast() {
      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = false;
    },

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    async handleDelete(row) {
      const { id } = { ...row };
      const res = await delCustomList({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleReview(row) {},
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
      pendingApproveList(this.listQuery).then((reponse) => {
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
