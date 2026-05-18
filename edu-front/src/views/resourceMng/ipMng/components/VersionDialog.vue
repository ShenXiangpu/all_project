<template>
  <div>
    <el-dialog
      append-to-body
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      class="el-dialog-edu"
      @close="handleClose"
    >
      <el-card class="marginTop10">
        <template #header>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="openAddVersionDialog"
            >添加版本</el-button
          >
        </template>
        <el-table :data="versionList" v-loading="loading" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="version"
            label="版本名称"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createAt"
            label="创建时间"
            min-width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="版本差异"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
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
              <el-button
                size="small"
                type="primary"
                class="editPrimary marginRight10"
                @click="downLoadFile(scope.row)"
              >
                下载
              </el-button>
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
    </el-dialog>
    <add-version-dialog
      ref="add-version-dialog"
      @queryVersionList="queryVersionList"
    />
  </div>
</template>

<script>
import { getIPVersionListByIPId, delOneIPVersion } from "@/api/edu/ip";
import AddVersionDialog from "./AddVersionDialog.vue";
export default {
  name: "VersionDialog",
  props: {},
  components: {
    AddVersionDialog,
  },
  watch: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "create",
      },
      id: "", //ip id
      textMap: {
        update: "版本管理",
        create: "版本管理",
        look: "",
      },
      versionList: [],
      loading: false,
    };
  },
  methods: {
    downLoadFile(item) {
      const a = document.createElement("a"); //创建a标签
      a.style.display = "none";
      a.href = item.filePath; // 指定下载链接
      a.download = item.displayName; //指定下载文件名
      document.body.appendChild(a);
      a.click(); //触发下载
      document.body.removeChild(a);
      this.$message.success("下载成功");
    },
    queryVersionList() {
      this.loading = true;
      let id = this.id;
      getIPVersionListByIPId({ id })
        .then((res) => {
          if (res && res.flag) {
            let resData = res.resData;
            this.versionList = resData;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleClose() {
      this.dialog.visible = false;
      this.$emit("handleClose");
    },

    handleUpdate(item) {
      console.log(item);
      let id = item.id;
      let parentId = item.parentId;
      let remark = item.remark;
      let version = item.version;
      let displayName = item.displayName;
      let realName = item.realName;
      let filePath = item.filePath;
      let fileSize = item.fileSize;
      let form = {
        id,
        parentId,
        remark,
        version,
        displayName,
        realName,
        filePath,
        fileSize,
      };
      const addVersion = this.$refs["add-version-dialog"];
      addVersion.dialog.visible = true;
      addVersion.form = form;
      addVersion.dialog.status = "update";
    },

    async handleDelete(row) {
      const { id } = { ...row };
      const res = await delOneIPVersion({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.queryVersionList();
      }
    },

    openAddVersionDialog() {
      const addVersion = this.$refs["add-version-dialog"];
      addVersion.dialog.visible = true;
      addVersion.dialog.status = "create";
      addVersion.id = this.id;
      addVersion.form.parentId = this.id;
      let form = {
        parentId:this.id,
        remark:'',
        version:'',
        displayName:'',
        realName:'',
        filePath:'',
        fileSize:'',
      };
      addVersion.form = form;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 800px;
    }
    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }
    .el-input-edu {
      width: 500px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }
  }
}
</style>
