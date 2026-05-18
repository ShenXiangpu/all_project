<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" class="el-form-edu">
      <el-form-item label="版本名称" prop="version">
        <el-input
          class="el-input-edu"
          placeholder="请输入版本名称"
          v-model="form.version"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="版本差异" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          class="el-input-edu"
          placeholder="请输入版本差异"
          v-model="form.remark"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="displayName">
        <big-file-upload-dialog
          target="/edu/zkxy-vm-web/file/upload"
          v-if="isDestory"
          :singleFile="true"
          ref="uploader"
          @removeFileDefine="removeFileDefine"
          @complete="complete"
          @onFileSuccess="onFileSuccess"
          :isDirectory="false"
          @handleClose="handleCloseFileDialog"
        ></big-file-upload-dialog>
        <el-tag
          @close="closeAndDelFile"
          size="mini"
          closable
          class="el-tag-edu"
          v-if="form && form.displayName"
          >{{ form && form.displayName }}</el-tag
        >
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import BigFileUploadDialog from "@/components/BigFileUploadDialog/index.vue";
import { mergeChunkFile } from "@/api/edu/file";
import { addVersion, editIPVersion } from "@/api/edu/ip";

export default {
  name: "UploadFileDialog",
  props: {},
  components: {
    BigFileUploadDialog,
  },
  watch: {},
  data() {
    return {
      packageTypeList: [
        { label: "软核", value: "软核" },
        { label: "固核", value: "固核" },
        { label: "硬核", value: "硬核" },
        { label: "其他", value: "其他" },
      ],
      isDestory: true,
      form: {
        parentId: "",
        remark: "",
        version: "",
        displayName: "",
        realName: "",
        filePath: "",
        fileSize: "",
      },
      fileInfo: {},
      rules: {
        // remark: [{ required: true, message: "请输入版本差异", trigger: "blur" }],
        version: [
          { required: true, message: "请输入版本名称", trigger: "blur" },
        ],
        displayName: [
          { required: true, message: "请上传文件", trigger: "blur" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改版本",
        create: "添加版本",
        look: "",
      },

      waitUploadFileList: [],
      noMergeWaitUploadFileList: [],
      multipleSelection: [],
      pathList: [], //存放文件路径
      filesList: [],
      vmId: "",
      pathItem: {},
      uploadPath: "", //上传文件路径
      fileLoading: false,

      waitUploadFile: {},
      loading: false,
    };
  },
  methods: {
    // 删除文件
    closeAndDelFile() {
      this.form.displayName = "";
      this.form.filePath = "";
      this.form.realName = "";
      this.waitUploadFileList = [];
      this.md5List = [];
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.dialog.status == "create") {
            addVersion(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("queryVersionList");
                } else {
                  this.loading = false;
                }
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            editIPVersion(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("修改成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("queryVersionList");
                } else {
                  this.loading = false;
                }
              })
              .finally(() => {
                this.loading = false;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove() {},
    handleClose() {
      // this.$refs["form"].resetFields();
      this.dialog.visible = false;
    },

    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },

    handleCloseFileDialog() {
      this.isDestory = false;
      this.waitUploadFileList = [];
      this.md5List = [];
      setTimeout(() => {
        this.isDestory = true;
      }, 100);
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
          let index = fileName.indexOf(".");
          let fileType = fileName.substring(index + 1, fileName.length);
          index >= 0 && (fileName = fileName.substring(0, index));
          let md5 = file.uniqueIdentifier;
          let fileSize = file.size;
          this.waitUploadFileList.push({
            fileName,
            fileType,
            md5,
            fileSize,
            isMerge: false,
          });
        }
      }
    },
    //所有文件上传完毕触发
    async complete() {
      console.log("所有文件上传完毕触发");
      this.$message.success("文件上传中，请稍后");
      let md5List = [];
      const waitUploadFileList = this.waitUploadFileList;
      waitUploadFileList &&
        waitUploadFileList.length > 0 &&
        waitUploadFileList.forEach(async (item, index) => {
          md5List.push(item.md5);
          let fileName = item.fileName;
          let fileType = item.fileType;
          let md5 = item.md5;
          console.log("item", item);
          let fileSize = item.fileSize;
          const res = await mergeChunkFile({
            fileName,
            fileType,
            md5,
            newFileName: fileName,
            fileSize,
            fileSource: "ip",
          });
          if (res && res.flag) {
            let resData = res.resData;
            let realName = resData.fileName;
            let filePath = resData.url;
            let displayName = resData.fileName;
            this.form.displayName = displayName;
            this.form.fileSize = fileSize;
            this.form.filePath = filePath;
            this.form.realName = realName;
          }
        });
      this.md5List = md5List;

      // this.submitFileVm();

      console.log("waitUploadFileList", this.waitUploadFileList);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 700px;
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
  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
