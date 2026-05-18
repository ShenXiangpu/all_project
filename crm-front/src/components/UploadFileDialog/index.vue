<template>
  <el-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
    :close-on-click-modal="false"
    :style="{ '--color': defaultTheme || '#10abb9' }"
  >
    <el-form ref="form" :model="form" :rules="rules" class="el-form-edu">
      <el-form-item v-if="dialogStatus == 'create'" label="文件">
        <big-file-upload-dialog
          ref="uploader"
          :singleFile="true"
          fileSource="courseFile"
          @removeFileDefine="removeFileDefine"
          @complete="complete"
          @onFileSuccess="onFileSuccess"
          :isDirectory="false"
          @handleClose="handleCloseFileDialog"
        ></big-file-upload-dialog>
        <file-show
          :fileName="fileName"
          v-if="fileName"
          @removeFile="removeFile"
          class="el-input-edu"
        />
      </el-form-item>
      <el-form-item label="重命名" prop="fileRename">
        <el-input
          class="el-input-edu"
          placeholder="请输入文件重命名"
          v-model="form.fileRename"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          class="el-input-edu"
          type="textarea"
          :rows="2"
          placeholder="请输入文件描述信息"
          v-model="form.remark"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" class="marginRight20">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loadding"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import BigFileUploadDialog from "@/components/BigFileUploadDialog/index.vue";
import FileShow from "@/components/FileShow/index.vue";
import { mergeChunkFile } from "@/api/edu/file";
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
  components: {
    BigFileUploadDialog,
    FileShow,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  watch: {
    fileDialogVisible(newVal, oldVal) {
      this.dialog.visible = newVal;
    },
    dialogStatus(newVal, oldVal) {
      console.log(newVal, oldVal);
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
          this.form = form;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      form: {
        fileRename: "",
        remark: "",
      },
      rules: {
        fileRename: [
          {
            required: true,
            message: "重命名不能为空",
            trigger: "blur",
          },
        ],
      },
      courseId: "",
      fileName: "",
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
      waitUploadFile: {},
      waitUploadFileList: [],
    };
  },
  methods: {
    removeFile() {
      this.form.fileRename = "";
      this.fileName = "";
      this.waitUploadFileList = [];
    },
    removeFileDefine(file, index) {
      this.waitUploadFileList.splice(index, 1);
      this.md5List.splice(index, 1);
    },
    async onFileSuccess(obj) {
      const { rootFile, file, response, chunk } = obj;
      if (response) {
        const res = JSON.parse(response);
        if (res && res.flag) {
          let fileName = (file && file.name) || "";
          this.fileName = fileName;
          let index = fileName.indexOf(".");
          let fileType = fileName.substring(index + 1, fileName.length);
          index >= 0 && (fileName = fileName.substring(0, index));
          let md5 = file.uniqueIdentifier;
          this.form.fileRename = fileName;
          let waitUploadFileList = [];
          waitUploadFileList.push({
            fileName,
            fileType,
            md5,
            isMerge: false,
          });

          this.waitUploadFileList = waitUploadFileList;
        }
      }
    },
    //所有文件上传完毕触发
    async complete() {
      console.log("所有文件上传完毕触发");
      this.$refs["uploader"].dialogVisible.visible = false;
    },
    handleCloseFileDialog() {
      this.isDestory = false;
      setTimeout(() => {
        this.isDestory = true;
      }, 100);
    },
    async beforeAvatarUpload(file) {
      return true;
    },
    submitUpload() {
      if (this.waitUploadFileList && this.waitUploadFileList.length > 0) {
      } else {
        this.$message.error("请选择文件");
        return;
      }
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.waitUploadFile = this.waitUploadFileList[0];
          const waitUploadFile = this.waitUploadFile;
          let fileName = waitUploadFile && waitUploadFile.fileName;
          let fileType = waitUploadFile && waitUploadFile.fileType;
          let md5 = waitUploadFile && waitUploadFile.md5;
          let remark = this.form.remark;
          let newFileName = this.form.fileRename;
          let courseId = this.courseId;
          const res = await mergeChunkFile({
            fileName,
            fileType,
            md5,
            newFileName,
            remark,
            courseId,
          });
          if (res && res.flag) {
            this.$message.success("文件上传成功");
            this.dialog.visible = false;
            this.$emit("submitUpload");
          } else {
            this.$message.error("文件上传失败");
          }
        } else {
          return false;
        }
      });
    },
    handleRemove() {
      this.form.file = "";
    },
    handleClose() {
      this.waitUploadFile = {};
      this.waitUploadFileList = [];
      this.form.fileRename = "";
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
      this.form.fileRename = file.name;
    },
    handleChange(file, fileList) {
      console.log("11111", fileList.length);
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep .el-dialog {
    width: 550px;

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
}
.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }
    .el-input-edu {
      width: 350px;
    }
    .el-upload-list__item-name {
      padding-left: 100px;
    }
  }
}
</style>
