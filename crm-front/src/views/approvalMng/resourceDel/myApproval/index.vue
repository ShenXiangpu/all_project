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
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleRevoke="handleRevoke"
      @handleSubmit="handleSubmit"
      @handleFollow="handleFollow"
      @handleCustom="handleCustom"
      @handleCustomerInfo="handleCustomerInfo"
      @showApproInfo="showApproInfo"
    />

    <approval-dialog
      ref="approval-dialog"
      :delNumber="tableList.length || 0"
      @queryDetail="queryDetail"
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
  </div>
</template>

<script>
import ContractTable from "@/views/contractMng/components/Table.vue";
import CustomerTable from "@/views/customMng/customerInfo/components/Table.vue";
import CLueTable from "@/views/clueMng/FollowUpOnClues/components/Table.vue";
import SupplierTable from "@/views/supplierMng/components/Table.vue"
import CustomInfoDialog from "@/views/contractMng/components/CustomInfoDialog.vue";
import { customList, delCustomList } from "@/api/crm/customMng";
import {
  myApproveList,
  getInstDetailById,
  removeListById,
  revoke,
  reSubmit,
  delMyApproval
} from "@/api/crm/approval";
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
    ContractTable,
    CustomerTable,
    CLueTable,
    SupplierTable,
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
     *
     * @param row
     */
    async handleSubmit(row) {
      const { id } = { ...row };
      const res = await reSubmit({ id });
      if (res?.flag) {
        this.$message.success("提交成功");
        this.getList();
      }
    },
    async handleRevoke(row) {
      const { id } = { ...row };
      const res = await revoke({ id });
      if (res?.flag) {
        this.$message.success("撤销成功");
        this.getList();
      }
    },
    /**
     * 查询审批类型的详情
     * @param ids
     * @param list
     */
    async showApproInfo(row,status) {
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
      approval.dialog.status = status
      approval.nodeInfo = res.resData ?? {}; //空值合并运算符
      console.log("approval", approval.nodeInfo);

      //   this.tableList = list;
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

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },

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
    /**
     * 我的申请删除
     * @param row
     */
    async handleDelete(row) {
      const { id } = { ...row };
      const res = await delMyApproval({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleUpdate(item) {

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
      myApproveList(this.listQuery).then((reponse) => {
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
