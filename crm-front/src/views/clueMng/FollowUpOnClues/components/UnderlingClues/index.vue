<template>
  <div>
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
    />
    <my-table
      type="under"
      :tableData="labsList"
      :listQuery="listQuery"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleClue="handleClue"
      @handleLook="handleLook"
    />
    <add-dialog
      ref="add-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />

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
import ApprovalDialog from "@/components/ApprovalDialog/index.vue";
import DelDetailDialog from "@/views/contractMng/components/DelDetailDialog.vue";
import { cloneDeep } from "lodash";
import FilterForm from "@/views/clueMng/HighSeasResources/components/FilterForm.vue";
import MyTable from "../Table.vue";
import AddDialog from "../AddDialog.vue";
import { subordinateList, releaseMoreClue } from "@/api/crm/underlingClues.js";
import { calculateNode } from "@/api/crm/approval";

export default {
  name: "",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
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
    // handleOneDelete(row) {
    //   const { id } = { ...row };
    //   this.handleDelete([id]);
    // },
    // handleChooseDelete(id) {
    //   this.handleDelete(id);
    // },
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
    handleClose() {},
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen();
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
      try {
        this.loading = true;
        subordinateList(this.listQuery).then((reponse) => {
          let resData = reponse.resData;
          this.labsList = resData.records;
          this.total = resData.total;
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
      }
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
