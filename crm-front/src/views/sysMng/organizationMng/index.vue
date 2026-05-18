<template>
  <div class="app-container">
    <my-table
      :tableData="labsList"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleAddPosition="handleAddPosition"
      @handleAddDataPermit="handleAddDataPermit"
      @handleMenuPermit="handleMenuPermit"
    />
    <add-dep-dialog
      ref="add-dep-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <add-position-dialog
      ref="add-position-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <menu-permit-dialog
      ref="menu-permit-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
    <data-permit-dialog
      ref="data-permit-dialog"
      @queryList="queryList"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import MyTable from "./components/Table.vue";
import AddDepDialog from "./components/AddDepDialog.vue";
import AddPositionDialog from "./components/AddPositionDialog.vue";
import DataPermitDialog from "./components/DataPermitDialog.vue";
import MenuPermitDialog from "./components/MenuPermitDialog.vue";

import { subordinateList, delPost, delDept } from "@/api/crm/organization";
export default {
  name: "organizationMng",
  components: {
    MyTable,
    AddDepDialog,
    AddPositionDialog,
    DataPermitDialog,
    MenuPermitDialog,
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
      const operationFunction = row.postName ? delPost : delDept;

      if (typeof operationFunction !== "function") {
        console.error("Invalid operation function:", operationFunction);
        this.$message.error("操作函数无效");
        this.loading = false;
        return;
      }
      this.loading = true;
      operationFunction({ id: row.id })
        .then((response) => {
          if (response && response.flag) {
            this.$message.success("删除成功");
            this.loading = false;
            this.getList();
          } else {
            this.$message.error("删除失败，请重试");
            this.loading = false;
          }
        })
        .catch((error) => {
          console.error(`Error:`, error);
          this.$message.error("删除失败，请重试");
          this.loading = false;
        });
    },
    handleUpdate(item) {
      console.log(item);

      const postName = item && item.postName;
      let form = {};
      //说明修改职位
      let el = null;

      if (postName) {
        el = this.$refs["add-position-dialog"];
        form.name = item.postName;
      } else {
        //说明修改部门
        el = this.$refs["add-dep-dialog"];
        form.name = item.name;
      }
      console.log(el.form);

      el.dialog.visible = true;
      el.dialog.status = "update";
      form.id = item.id;
      el.form = form;
    },

    handleAssign(row) {
      const ip = this.$refs["assignment-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "create";
    },

    handleClose() {},
    openFileDialog() {
      const ip = this.$refs["add-dep-dialog"];
      ip.form.name = "";
      ip.handleOpen();
    },

    handleAddPosition(row) {
      const ip = this.$refs["add-position-dialog"];
      let deptId = row.id;
      let name = "";
      ip.form = {
        deptId,
        name
      }
      ip.handleOpen();
    },

    handleMenuPermit(row) {
      const ip = this.$refs["menu-permit-dialog"];
      ip.id = row.id;
      ip.handleOpen();
      ip.showRoleMenuDialog()
      
    },
    handleAddDataPermit(row) {
      const el = this.$refs["data-permit-dialog"];
      el.form.id = row.id;
      el.postName = row.postName;
      el.handleOpen();
      el.queryPostDetailById(row.id)
    },

    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
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
      subordinateList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        let records = resData.records;
        records.forEach((item, index) => {
          if (item.postList && item.postList.length > 0) {
            let postList = item.postList;
            item.uid = item.id;
            postList.forEach((postItem) => {
              postItem.uid = `${index}` + `${postItem.id}`;
            });

            item.children = postList;
          }
        });
        this.labsList = records;
        console.log(records);

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
