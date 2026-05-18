<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
  >
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules">
      <el-form-item label="PDK名称" prop="name">
        <el-input
          class="el-input-edu"
          placeholder="请输入PDK名称"
          v-model="form.name"
          maxlength="128"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplier">
        <el-radio-group class="el-input-edu" v-model="form.supplier">
          <el-radio label="内部PDK"></el-radio>
          <el-radio label="外部PDK"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.supplier == '外部PDK'"
        label="外部PDK"
        prop="supplierName"
      >
        <el-input
          class="el-input-edu"
          placeholder="请输入外部PDK名称"
          v-model="form.supplierName"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>


      <el-form-item label="工艺制程" prop="process">
        <el-input
          type="number"
          class="el-input-edu"
          placeholder="请输入工艺制程"
          v-model="form.process"
        >
          <template slot="append">nm</template>
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="dialog.status == 'create'"
        label="版本名称"
        prop="version"
      >
        <el-input
          class="el-input-edu"
          placeholder="请输入版本名称"
          v-model="form.version"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="dialog.status == 'create'"
        label="文件"
        prop="displayName"
      >
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
import { addIP, modifyIp } from "@/api/edu/pdk";

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
        name: "",
        supplier: "内部PDK",
        supplierName: "",

        process: "",
        version: "",
        displayName: "",
      },
      fileInfo: {},
      rules: {
        name: [{ required: true, message: "请输入PDK名称", trigger: "blur" }],
        supplier: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        supplierName: [
          { required: true, message: "请输入外部PDK名称", trigger: "blur" },
        ],
        process: [
          { required: true, message: "请输入工艺制程", trigger: "blur" },
        ],
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
        update: "修改PDK",
        create: "创建PDK",
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
      this.fileInfo = {};
      this.waitUploadFileList = [];
      this.md5List = [];
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("form", this.form);
          let chipVerification = this.form.chipVerification;
          chipVerification == "是"
            ? (this.form.chipVerification = 1)
            : (this.form.chipVerification = 2);
          this.form.supplier == "外部PDK"
            ? (this.form.supplier = this.form.supplierName)
            : this.form.supplier;
          this.loading = true;
          if (this.dialog.status == "create") {
            this.fileInfo.version = this.form.version;
            this.form.itemList = [this.fileInfo];

            addIP(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("queryList");
                } else {
                  this.loading = false;
                }
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            modifyIp(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("修改成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("queryList");
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
      this.fileList = [];
      this.form.displayName = "";
      this.dialog.visible = false;
      this.$refs["form"].resetFields();
    },

    handleChange(file, fileList) {
      console.log("11111", fileList.length);
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
          let fileSize = item.fileSize;
          const res = await mergeChunkFile({
            fileName,
            fileType,
            md5,
            fileSize,
            newFileName: fileName,
            fileSource: "ip",
          });
          if (res && res.flag) {
            let resData = res.resData;
            let realName = resData.fileName;
            let filePath = resData.url;
            let displayName = resData.fileName;
            this.form.displayName = displayName;

            let fileItem = {
              filePath,
              realName,
              fileSize,
              displayName,
            };
            this.fileInfo = fileItem;
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
      padding-bottom: 10px;
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
