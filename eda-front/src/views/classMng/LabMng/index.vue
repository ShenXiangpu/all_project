<template>
  <div class="app-container">
    <el-card class="marginBottom10">
      <div style="padding: 20px 0 0px 10px">
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item label="文件名称" prop="fileName">
            <el-input
              v-model="queryParams.fileName"
              placeholder="请输入文件名称"
              clearable
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              class="editSuccess"
              icon="el-icon-search"
              @click="handleQuery"
              >搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="editPrimary"
              icon="el-icon-refresh"
              @click="resetQuery('queryFormRef')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="marginTop10">
      <template #header>
        <el-button type="primary" icon="el-icon-plus" @click="openFileDialog"
          >上传文件</el-button
        >
      </template>
      <el-table :data="labsList" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="displayName"
          label="文件名称"
          min-width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="文件大小"
          min-width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          align="center"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          align="center"
          min-width="180"
        >
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180">
        </el-table-column> -->
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="180"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              class="editPrimary"
              @click.stop="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="small"
                type="danger"
                class="editDanger"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <upload-file-dialog
      :updateFileInfo="updateFileInfo"
      :dialogStatus="dialogStatus"
      :loadding="fileUpLoading"
      ref="upload-file-dialog"
      @doUpload="doUpload"
      @handleClose="handleClose"
      :fileDialogVisible="fileDialogVisible"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import UploadFileDialog from "@/components/UploadFileDialog";

import {
  uploadLab,
  updateLab,
  getOenList,
  deleteLabById,
  maxFileUploadSize,
} from "@/api/edu/lab";
import { Message } from "element-ui";

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "Lab",
  components: {
    Pagination,
    BorderContainer,
    UploadFileDialog,
  },
  props: {},
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        fileName: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",
      loading: false,

      labsList: [],
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
    };
  },
  watch: {},
  computed: {},
  created() {
    this.handleQuery();
  },
  methods: {
    handleUpdate(item) {
      console.log(item);
      let updateFileInfo = {
        id: item.id,
        displayName: item.displayName,
        remark: item.remark,
      };
      this.updateFileInfo = updateFileInfo;
      this.dialogStatus = "update";
      this.fileDialogVisible = true;
    },
    //
    openFileDialog() {
      this.dialogStatus = "create";
      this.fileDialogVisible = true;
    },
    handleClose() {
      this.fileDialogVisible = false;
      this.fileUpLoading = false;
      let updateFileInfo = {
        id: "",
        displayName: "",
        remark: "",
      };
      this.updateFileInfo = updateFileInfo;
    },

    async doUpload(form) {
      this.fileUpLoading = true;
      let dialogStatus = this.dialogStatus;
      if (dialogStatus == "create") {
        const isLt5M = form && form.file && form.file.size / 1024 / 1024;
        const res = await maxFileUploadSize();
        if (res && res.flag) {
          let resData = res && res.resData;
          let resDataMb = resData && resData.MB;
          if (resDataMb < isLt5M) {
            this.$message.error(`上传文件大小不能超过 ${resDataMb}MB!`);
          } else {
            let FormDatas = new FormData();
            FormDatas.append("file", form.file);
            FormDatas.append("fileRename", form.fileRename);
            FormDatas.append("remark", form.remark);
            console.log("FormDatas", FormDatas);
            uploadLab(FormDatas).then((res) => {
              let resData = res.resData;
              if (res && res.flag && resData) {
                this.$message.success("上传成功");
                this.handleClose();
                this.handleQuery();
              } else {
                this.$message.error("上传出错");
              }
            });
          }
        } else {
          return false;
        }
      } else {
        const { id } = this.updateFileInfo;
        const { fileRename, remark } = form;
        let data = {
          id,
          displayName: fileRename,
          remark: remark,
        };
        updateLab(data).then((res) => {
          if (res && res.flag) {
            this.$message.success("修改成功");
            this.handleClose();
            this.handleQuery();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    getList() {
      this.loading = true;
      getOenList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData;
        // this.total = resData.total;
        this.loading = false;
      });
    },

    cancel() {
      let _this = this;
      _this.dialog.visible = false;
      // _this.dialog = dialog;
      _this.$refs.alarmRuleForm.resetFields();
    },
    handleQuery() {
      this.listQuery.params = this.queryParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.listQuery.params = [];
      this.listQuery.page = 1;
      this.getList();

      this.$refs[formName].resetFields();
    },
    handleAdd(value) {
      let _this = this;
      this.textValue = value;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    async handleDelete(row) {
      const { id } = { ...row };
      const res = await deleteLabById({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style lang='scss' scoped>
.border-container {
  ::v-deep {
    .left-circle {
      width: 16px;
      height: 32px;
      border-radius: 0 16px 16px 0;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 0 8px 8px 0;
        top: 6px;
      }
    }

    .right-circle {
      width: 16px;
      height: 32px;
      border-radius: 16px 0 0 16px;
      right: -2px;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 8px 0 0 8px;
        top: 6px;
      }
    }
  }
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
    }

    // .el-dialog__footer {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 0px
    // }
  }

  &-form {
    width: 50%;
  }
}

.dialog-form {
  width: 100%;
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.dialog-userContainer {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  max-height: 30vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}
</style>
    