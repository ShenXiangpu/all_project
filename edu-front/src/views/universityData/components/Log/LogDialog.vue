<template>
  <el-dialog  :destroy-on-close="true" append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu-school"
    @close="handleClose">
    <filter-form @handleQuery="handleQuery" @resetQuery="resetQuery" :userOperateTypeList="userOperateTypeList" />
    <my-table :tableData="logsList" :loading="loading" :total="total" @searchQuery="searchQuery"></my-table>
  </el-dialog>
</template>

<script>
import { getUserOperateType, getUserOperateLog } from "@/api/edu/school";
import MyTable from "./MyTable.vue";
import FilterForm from "./FilterForm.vue";
export default {
  name: "AddDialog",
  props: {},
  components: {
    MyTable,
    FilterForm
  },
  watch: {},
  data() {
    return {


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
        update: "操作日志",
        create: "操作日志",
        look: "",
      },
      loading: false,
      userOperateTypeList: [],
    };
  },
  methods: {
    searchQuery(e) {
      this.listQuery = { ...this.listQuery, ...e };
      this.getList ();
    },
    initParams() {
      this.listQuery = {
        page: 1,
        limit: 10,
        universityName: "",
        params: "",
      };
    },
    //getUserOperateType
    queryUserOperateType() {
      getUserOperateType().then((res) => {
        if (res && res.flag) {
          this.userOperateTypeList = res.resData;
        }
      });
    },
    //查询
    async handleQuery(params) {
      this.listQuery.params = params;
      this.listQuery.page = 1;
      console.log( this.listQuery);

      this.getList();
    },
    async getList() {
      this.loading = true;
      const res = await getUserOperateLog(this.listQuery);
      if (res && res.flag) {
        let resData = res.resData;
        this.logsList = resData.list;
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
      this.initParams();
    },
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

.el-dialog-edu-school {
  ::v-deep {
    .el-dialog {
      width: 1040px;
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
