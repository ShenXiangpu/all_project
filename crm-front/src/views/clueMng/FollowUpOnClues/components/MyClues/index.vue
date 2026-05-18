<template>
  <div>
    <filter-form ref="filterForm" @resetQuery="resetQuery" @handleQuery="handleQuery" type="my" />
    <my-table type="my" :listQuery="listQuery" :tableData="labsList" @searchQuery="searchQuery" :loading="loading"
      :total="total" @edit="edit" @delete="handleDelete" @gotoDetail="gotoDetail" @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate" @handleClue="handleClue" @handleFollow="handleFollow" @handleCustom="handleCustom"
      @handleLook="handleLook" />
    <add-dialog ref="add-dialog" @queryList="queryList" @handleClose="handleClose" />
    <follow-dialog ref="follow-dialog" @queryList="queryList" @handleClose="handleClose" />
    <add-custom-dialog ref="add-custom-dialog" @queryList="queryList" @handleClose="handleClose" />

    <approval-dialog ref="approval-dialog" :delNumber="tableList.length || 0" @queryDetail="queryDetail" />
    <del-detail-dialog ref="del-detail-dialog">
      <template v-slot:table>
        <my-table :isDetail="true" :tableData="tableList" :total="0" />
      </template>
    </del-detail-dialog>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import {
  disclosureClueUserRelList,
  releaseMoreClue,
} from "@/api/crm/myClues.js";
import { calculateNode } from "@/api/crm/approval.js";
import FilterForm from "@/views/clueMng/HighSeasResources/components/FilterForm.vue";
import MyTable from "../Table.vue";
import AddDialog from "../AddDialog.vue";
import FollowDialog from "../FollowDialog.vue";
import AddCustomDialog from "../AddCustomDialog.vue";
import ApprovalDialog from "@/components/ApprovalDialog/index.vue";
import DelDetailDialog from "@/views/contractMng/components/DelDetailDialog.vue";
import AmountAndTime from "@/views/contractMng/components/AmountAndTime.vue";
export default {
  name: "MyClues",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    FollowDialog,
    AddCustomDialog,
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
    handleOneDelete(row) { },
    handleChooseDelete(id) { },

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    async handleDelete(ids, list) {
      const param = {
        instType: "线索删除",
        removeIds: ids,
      };

      const res = await calculateNode(param);
      if (!res?.flag) return; // 提前返回，避免嵌套

      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = true;

      approval.nodeInfo = res.resData ?? {}; //空值合并运算符
      this.tableList = list;
    },
    handleClue(clue) {
      this.$confirm("点击确定后该线索进入公海资源，确定吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        releaseMoreClue(clue).then((res) => {
          if (res && res.flag) {
            this.$message.success("线索已进入公海资源");
            this.getList();
          }
        });
      });
    },
    handleLook(item) {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen("look");
      let handleItem = cloneDeep(item);
      let location = handleItem && handleItem.location;
      if (location && typeof location == "string") {
        handleItem.location =
          (handleItem &&
            handleItem.location &&
            handleItem.location.split(",")) ||
          [];
      }
      let customerLabel = handleItem && handleItem.customerLabel;
      if (customerLabel && typeof customerLabel == "string") {
        ip.tags =
          (handleItem &&
            handleItem.customerLabel &&
            handleItem.customerLabel.split(",")) ||
          [];
        handleItem.customerLabel = "";
      } else {
      }

      let form = {
        ...handleItem,
      };
      ip.form = form;
    },
    handleUpdate(item) {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen("update");
      let handleItem = cloneDeep(item);
      let location = handleItem && handleItem.location;
      if (location && typeof location == "string") {
        handleItem.location =
          (handleItem &&
            handleItem.location &&
            handleItem.location.split(",")) ||
          [];
      }
      let customerLabel = handleItem && handleItem.customerLabel;
      if (customerLabel && typeof customerLabel == "string") {
        ip.tags =
          (handleItem &&
            handleItem.customerLabel &&
            handleItem.customerLabel.split(",")) ||
          [];
        handleItem.customerLabel = "";
      } else {
      }

      let form = {
        ...handleItem,
      };
      ip.form = form;
    },

    handleClose() { },
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen("create");
      let form = {
        clueName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerIntentionId: "",
        consumerLevelId: "",
        consumerSourceId: "",
        followUpStatusId: "",
        nextFollowUpDate: "",
        location: "",
        fullAddress: "",
        customerLabel: "",
        remark: "",
        cooperationAreaId: "",
      };
      ip.form = form;
    },
    handleFollow(item) {
      const ip = this.$refs["follow-dialog"];
      ip.handleOpen("create");
      let itemNew = cloneDeep(item);
      let location = itemNew && itemNew.location;
      if (location && location.indexOf(",") > -1) {
        itemNew.location = location.split(",");
      }
      ip.form = {
        ...itemNew,
      };
      let clueId = item.clueId;
      let clueForm = {
        clueId,
        content: "",
        consumerIntentionId: "",
        nextFollowUpDate: "",
        followUpStatusId: "",
        followUpTypeId: "",
      };
      ip.clueForm = clueForm;
      ip.queryFollowUpOneClueList(clueId);
    },
    handleCustom(item) {
      const custom = this.$refs["add-custom-dialog"];
      let formData = {
        clueId: item && item.clueId,
        customerName: item && item.clueName,
        linkName: item && item.linkName,
        linkPhone: item && item.linkPhone,
        companyTypeId: item && item.companyTypeId,
        // consumerTypeId: "",
        consumerSourceId: item && item.consumerSourceId,

        location: item && item.location ? item.location.split(",") : [],
        fullAddress: item && item.fullAddress,
        remark: item && item.remark,
        note: item && item.note,
        type: item && item.type || 1,
        contract: {
          contractNo: "",
          contractName: "",
          contractTypeId: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          paymentTime: "",
          contractAmount: 0.00,
          contractAttachments: [],
          signatoryType: "",
          cooperationAreaId: item && item.cooperationAreaId,
          contractPaymentList: [
            {
              paymentAmount: "",
              paymentTime: "",
            },
          ], //金额和时间
          restAmount: 0.00, //剩余尾款
        },
      };
      custom.formData = formData;
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
      disclosureClueUserRelList(this.listQuery).then((reponse) => {
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
