<template>
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialog.visible"
    width="30%"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item v-if="dialogStatus == 'create'" label="文件">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :http-request="doUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChange"
          :auto-upload="true"
          :limit="2"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            icon="el-icon-plus"
            >上传文件</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="重命名">
        <el-input
          style="width: 80%"
          placeholder="请输入文件重命名"
          v-model="form.fileRename"
        >
          <!-- <template v-if="fileType" slot="append">{{ fileType }}</template> -->
        </el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          style="width: 80%"
          type="textarea"
          :rows="2"
          placeholder="请输入文件描述信息"
          v-model="form.remark"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loadding"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "UploadFileDialog",
  props: {
    fileDialogVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
    loadding: {
      required: true,
      type: Boolean,
      default: false,
    },
    dialogStatus: {
      type: String,
      default: "create",
    },
    updateFileInfo: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    fileDialogVisible(newVal, oldVal) {
      this.dialog.visible = newVal;
    },
    dialogStatus(newVal, oldVal) {
      this.fileName = "";
      this.fileType = "";
      this.dialog.status = newVal;
    },
    updateFileInfo: {
      handler(newVal, oldVal) {
        if (newVal) {
          let displayName = newVal.displayName;
          let form = {
            fileRename: displayName,
            remark: newVal.remark,
          };
          this.handleFileName(displayName);
          this.form = form;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      form: {
        file: "",
        fileRename: "",
        remark: "",
      },
      fileName: "",
      fileType: "",
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "文件信息修改",
        create: "文件上传",
        look: "查看告警推送规则",
      },
    };
  },
  methods: {
    /**
     * 处理文件
     */
    handleFileName(fileRename) {
      if (fileRename) {
        let fileName = "";
        let index = fileRename.lastIndexOf(".");
        let fileType = fileRename.substring(index + 1, fileRename.length);
        index >= 0 && (fileName = fileRename.substring(0, index));
        this.fileName = fileName;
        this.fileType = fileType;
        this.form.fileRename = this.fileName + "." + this.fileType;
      }
    },
    submitUpload() {
      let file = this.form.file;
      let status = this.dialogStatus;
      // this.form.fileRename = this.fileName + "." + this.fileType;
      let fileRename = this.form.fileRename
      if (status == "create" && !file) {
        this.$message.error("请选择上传的文件");
        return;
      }

      if (!this.fileName) {
        this.$message.error("文件名称不能为空");
        return;
      }
      this.$emit("doUpload", this.form);
    },
    handleRemove() {
      this.form.file = "";
    },
    handleClose() {
      this.fileList = [];
      this.form.file = "";
      this.form.fileRename = "";
      this.fileName = "";
      this.fileType = "";
      this.form.remark = "";
      this.dialog.visible = false;
      this.$emit("handleClose");
    },
    async beforeAvatarUpload(file) {
      return true;
    },
    async doUpload(item) {
      let file = item && item.file;
      this.form.file = file;
      let fileName = (file && file.name) || "";
      this.handleFileName(fileName);
    },
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>