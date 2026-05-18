<template>
  <div class="app-container">
    <filter-form ref="filterForm" @resetQuery="resetQuery" @handleQuery="handleQuery" />
    <my-table type="my" :tableData="labsList" :listQuery="listQuery" @searchQuery="searchQuery" @queryList="queryList"
      :loading="loading" :total="total" @edit="edit" @delete="handleDelete" @gotoDetail="gotoDetail"
      @openFileDialog="handleCustom" @handleUpdate="handleUpdate" @handleContract="handleContract"
      @handleCustom="handleCustom" @handleCustomerInfo="handleCustomerInfo"
      @handleFollowContract="handleFollowContract" />
    <add-dialog ref="add-dialog" @queryList="queryList" @handleClose="handleClose" />

    <add-custom-dialog ref="add-custom-dialog" @queryList="queryList" @handleClose="handleClose" />
    <contract-dialog ref="contract-dialog" @queryList="queryList" @handleClose="handleClose" />
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
import { queryContractList, deleteContract } from "@/api/crm/contract";
import { calculateNode } from "@/api/crm/approval";

import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import AddCustomDialog from "./components/AddCustomDialog.vue";
import ContractDialog from "./components/ContractDialog.vue";
import CustomInfoDialog from "./components/CustomInfoDialog.vue";
import DelDetailDialog from "./components/DelDetailDialog.vue";
import ApprovalDialog from "@/components/ApprovalDialog";
import { cloneDeep } from "lodash";
export default {
  name: "ContractRecords",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    AddCustomDialog,
    ContractDialog,
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
      tableList: [], //详情信息
      total: 0,
      loading: false,
    };
  },
  methods: {
    handleCustomerInfo(row) {
      const custom = this.$refs["custom-info-dialog"];
      custom.handleOpen();

      let location = row && row.customer && row.customer.location;
      if (location) {
        location.indexOf(",") > -1 ? (location = location.split(",")) : "";
        row.customer.location = location;
      }
      let form = {
        ...row.customer,
      };
      custom.form = form;
      let clueId = row.customer.clueId;

      if (clueId) {
        custom.clueId = clueId;
      }
      let customerId = row.customer.id;
      if (customerId) {
        custom.customerId = customerId;
      }
      custom.componentName = "CusTable";

    },
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
    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    handleUpdate(item) {
      const custom = this.$refs["add-custom-dialog"];
      custom.handleOpen();
      custom.dialog.status = "update";
      let { formData, rebackNameList } = this.handleReBack(item);
      custom.rebackNameList = rebackNameList || [];
      custom.formData = formData;
    },

    handleReBack(item) {
      let itemNew = cloneDeep(item);
      let location = itemNew && itemNew.customer && itemNew.customer.location;
      if (location && location.indexOf(",") > -1) {
        location = location.split(",");
      }
      itemNew.customer.location = location;
      let rebackNameList = [];

      if (itemNew?.contract?.cooperationAreaId === 34) {
        let contractUserRelList = itemNew?.contract?.contractUserRelList;
        contractUserRelList?.map((item) => {
          rebackNameList.push({ targetId: item.userId, name: item.userName });
        });
        rebackNameList = rebackNameList || [];
      }
      if (itemNew?.contract?.paymentStatus) {
        itemNew.contract.contractPaymentList = itemNew.contractPayments || [{
          paymentAmount: "",
          paymentTime: "",
        }];
      }

      // item.customer.cooperationAreald = item.customerCooperation.cooperationAreald;
      let formData = {
        customer: {
          ...itemNew.customer,
        },
        contract: {
          ...itemNew.contract,
        },
      };

      return { formData, rebackNameList };
    },
    handleClose() { },
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen();
    },
    handleFollowContract(row) {
      const custom = this.$refs["add-custom-dialog"];
      custom.initFollowForm();
      let { formData, rebackNameList } = this.handleReBack(row);
      custom.rebackNameList = rebackNameList || [];
      custom.followContractId = row.contractId;
      custom.getContractFollowUpList(row.contractId);
      custom.handleOpenFollow();
      custom.formData = formData;
    },
    handleCustom() {
      const custom = this.$refs["add-custom-dialog"];
      custom.initForm();
      custom.handleOpen();
    },
    handleContract(item) {
      let itemNew = cloneDeep(item);
      const custom = this.$refs["add-custom-dialog"];
      custom.handleOpen();
      custom.getContractFollowUpList(item.contractId)
      custom.dialog.status = "look";
      if (itemNew?.contract?.cooperationAreaId === 34) {
        let contractUserRelList = itemNew?.contract?.contractUserRelList;
        let rebackNameList = [];
        contractUserRelList?.map((item) => {
          rebackNameList.push({ targetId: item.userId, name: item.userName });
        });
        custom.rebackNameList = rebackNameList || [];
      }
      if (itemNew?.contract?.paymentStatus) {
        itemNew.contract.contractPaymentList = itemNew.contractPayments || [{
          paymentAmount: "",
          paymentTime: "",
        }];
      }
      custom.formData = { ...itemNew };
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
      queryContractList(this.listQuery).then((reponse) => {
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
