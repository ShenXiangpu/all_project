<template>
  <div>
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
      :type="type"
    />
    <my-table
      :type="type"
      :tableData="newList"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @reject="rejectById"
      @release="releaseById"
      @revoke="revokeById"
      @edit="edit"
      @applyRelease="applyIpRelease"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleStop="handleStop"
      @handleUpdate="handleUpdate"
      @getList="getList"
    />
    <add-dialog ref="add-dialog" @getList="getList" :type="type" />
  </div>
</template>

<script>
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/MyTable.vue";
import AddDialog from "./components/AddDialog.vue";
import { revertFanout, queryByPage } from "@/api/crm/newAndBroadcast";
export default {
  name: "",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
  },
  created() {
    const roleId = this.$store.state.user.roleId;
    if (roleId == "11" || roleId == "42") {
      this.type = "UNI";
    } else {
      this.type = "EDA";
    }
  },
  mounted() {
    this.getList();
  },
  data() {
    return {
      type: "",
      newList: [],
      listQuery: {
        page: 1,
        limit: 10,
        params: {},
      },
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
    applyIpRelease(id) {
      applyRelease({ id }).then((res) => {
        if (res && res.flag) {
          this.getList();
        }
      });
    },
    handleUpdate(item) {
      let id = item.id;
      let form = {
        ...item,
      };
      const ip = this.$refs["upload-file-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "update";
      ip.form = form;
    },
    handleStop(row) {
      this.$confirm("此操作将停止推送广播, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          revertFanout({ id: row.id }).then((res) => {
            if (res && res.flag) {
              this.$message.success("推送已停止");
              this.getList();
            }
          });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    openFileDialog() {
      const ip = this.$refs["upload-file-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "create";
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
    goToDetail(row) {
      // this.$router.push({ path: "newsDetail", query: { id: row.id } });
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
    rejectById(id) {
      auditRelease({ id, auditResult: "rejection" }).then((res) => {
        if (res && res.flag) {
          this.getList();
        }
      });
    },
    releaseById(id) {
      auditRelease({ id, auditResult: "approved" }).then((res) => {
        if (res && res.flag) {
          this.getList();
        }
      });
    },
    revokeById(id) {
      revoke({ id }).then((res) => {
        if (res && res.flag) {
          this.getList();
        }
      });
    },

    getList() {
      this.loading = true;
      queryByPage(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.newList = resData.records;
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
