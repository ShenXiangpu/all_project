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
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @handleChooseDelete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handlelook="handlelook"
      @handleAssign="handleAssign"
      @receive="receive"
      @queryList="queryList"
      @allocation="allocation"
    />
    <add-dialog
      ref="add-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <assignment-dialog ref="assignment-dialog" @queryList="queryList" />

    <approval-dialog
      ref="approval-dialog"
      :delNumber="tableList.length || 0"
      @queryDetail="queryDetail"
    />
    <del-detail-dialog ref="del-detail-dialog">
      <template v-slot:table>
        <my-table :isDetail="true" :tableData="tableList" :total="0" />
      </template>
    </del-detail-dialog>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import AssignmentDialog from "./components/AssignmentDialog.vue";
import ApprovalDialog from "@/components/ApprovalDialog/index.vue";
import DelDetailDialog from "@/views/contractMng/components/DelDetailDialog.vue";
import { higeList, delClueList, addMoreRel } from "@/api/crm/highSeasResources";
import { calculateNode } from "@/api/crm/approval";
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
    AssignmentDialog,
    ApprovalDialog,
    DelDetailDialog,
  },
  created() {},
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(["userId"]),
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
    handleOneDelete(row) {},
    handleChooseDelete(id) {},
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

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
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
    handlelook(item) {
      console.log(item);

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

    handleAssign(row) {
      const ip = this.$refs["assignment-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "create";
      ip.queryDeptList();
      ip.queryPostList();
      ip.clueId = [row.id];
    },
    /**
     *
     * @param row 领取线索
     */
    receive(row) {
      addMoreRel(row)
        .then((res) => {
          if (res && res.flag) {
            this.$message.success("领取成功");
            this.getList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allocation(ids) {
      const ip = this.$refs["assignment-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "create";
      ip.queryDeptList();
      ip.queryPostList();
      ip.clueId = ids;
    },

    handleClose() {},
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
        cooperationAreaId: "",
        followUpStatusId: "",
        nextFollowUpDate: "",
        location: "",
        fullAddress: "",
        customerLabel: "",
      };
      ip.form = form;
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
      higeList(this.listQuery).then((reponse) => {
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
