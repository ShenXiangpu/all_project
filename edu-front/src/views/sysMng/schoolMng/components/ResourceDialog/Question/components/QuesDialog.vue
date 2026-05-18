<template>
  <el-dialog :destroy-on-close="true" append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible"
    class="el-dialog-edu-school" @close="handleClose">
    <filter-form @handleQuery="handleQuery" @resetQuery="resetQuery" :userOperateTypeList="userOperateTypeList" />
    <my-table :selectedIds="selectedIds" @handleSelectionChange="handleSelectionChange" :tableData="logsList" :loading="loading" :total="total"
      @searchQuery="searchQuery"></my-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { questionBankGetListDistributionBySu } from "@/api/edu/school";
import MyTable from "./MyTable.vue";
import FilterForm from "./FilterForm.vue";
export default {
  name: "QuesDialog",
  props: {},
  components: {
    MyTable,
    FilterForm
  },
  watch: {},
  data() {
    return {
      selectedIds: [],//已经选择的实验Id
      itemList: [],
      logsList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        universityName: "",
        params: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "添加题库",
        create: "添加题库",
        look: "",
      },
      loading: false,
      userOperateTypeList: [],
    };
  },
  methods: {

    submit() {
      this.dialog.visible = false;
      this.$emit("handleSelectionChange", this.itemList);
    },
    handleClose() {
      this.$emit("handleSelectionChange", []);
      this.dialog.visible = false;
    },
    handleSelectionChange(itemList) {
      this.itemList = itemList;
    },
    searchQuery(e) {
      this.listQuery = { ...this.listQuery, ...e };
      this.getList();
    },
    //查询
    async handleQuery(params) {
      this.listQuery.params = params;
      this.listQuery.page = 1;
      console.log(this.listQuery);

      this.getList();
    },
    async getList() {
      this.loading = true;
      const res = await questionBankGetListDistributionBySu({ ...this.listQuery.params });
      if (res && res.flag) {
        let resData = res.resData;
        this.logsList = resData;
        this.total = resData.total;
        this.loading = false;
      } else {
        this.loading = false;
      }
    },

    handleQuery(queryParams) {
      this.listQuery.params = queryParams;
      this.getList();
    },

    resetQuery() {
      this.handleQuery();
    },

    handleClose() {
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

.el-dialog-edu-school {
  ::v-deep {
    .el-dialog {
      width: 1240px;
    }

    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }

    .el-dialog {
      border-radius: 4px;

      .el-dialog__header {
        border-radius: 4px 4px 0 0;
        padding: 10px 20px;
        background-color: rgb(233, 233, 233);

        .el-dialog__title {
          color: #333;
        }

        .el-dialog__headerbtn {
          top: 12px;
        }
      }

      // .el-button--primary {
      //   background: $common-color;
      //   border-color: $common-color;
      // }
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }

    .el-input-edu {
      width: 300px;
    }

    .el-form-item__error {
      margin-left: 120px;
    }
  }

  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
