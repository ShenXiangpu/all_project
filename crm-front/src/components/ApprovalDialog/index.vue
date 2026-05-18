<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
    @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
    <el-form ref="form" :disabled="isJustLook" class="el-form-edu" :model="formData" :rules="rules">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="审批类型" prop="instType">
            <el-input class="el-input-edu" placeholder="请输入审批类型" v-model="formData.instType" readonly></el-input>
          </el-form-item>

          <el-form-item label="删除内容">
            已选择<span class="primaryColorb">{{ delNumber }}个</span>{{ delContent }}
            <span class="primaryColorb pointer marginLeft20" @click="queryDetail">查看详情>></span>
          </el-form-item>
          <el-form-item label="申请事由" prop="reason">
            <el-input type="textarea" :rows="8" class="el-input-edu" placeholder="请填写申请事由" v-model="formData.reason"
              maxlength="500" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="上传文件" prop="files">
            <big-file-upload-dialog target="/crm/file/upload"
              v-if="isDestory && dialog.status != 'look' && dialog.status != 'review'" :singleFile="false"
              ref="uploader" @removeFileDefine="removeFileDefine" @complete="complete" @onFileSuccess="onFileSuccess"
              :isDirectory="false" @handleClose="handleCloseFileDialog"></big-file-upload-dialog>
            <div class="marginBottom10" v-else>
              <el-button type="primary" icon="el-icon-upload font14 primaryColorw" :disabled="true">上传文件</el-button>
            </div>
            <div v-for="(item, index) in formData.files" :key="index">
              <el-tag @close="closeAndDelFile(index)" size="mini"
                :closable="!(dialog.status == 'look' || dialog.status == 'review')" v-if="item && item.displayName"
                class="el-tag-edu">{{ item.displayName }}</el-tag>
            </div>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <approval-process :nodes="nodes" />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="dialog.status != 'look' && dialog.status != 'review'">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-if="dialog.status == 'review' && needApproval">
      <el-button type="dagnger" @click="handleRejectOrPass(false)">拒 绝</el-button>
      <el-button type="primary" @click="handleRejectOrPass(true)">通 过</el-button>
    </span>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
import { mergeChunkFile } from "@/api/crm/file";
import { opApproval } from "@/api/crm/approval";
import BigFileUploadDialog from "@/components/BigFileUploadDialog";
import ApprovalProcess from "./components/ApprovalProcess.vue";
export default {
  name: "AddDialog",
  props: {
    delNumber: {
      type: Number,
      default: 0,
    },
  },

  components: {
    BigFileUploadDialog,
    ApprovalProcess,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },

    delContent() {
      const { instType = "" } = this.formData;
      const str = instType?.substring(0, instType.length - 2);
      return str;
    },
    isJustLook() {
      return this.dialog.status === "look" || this.dialog.status === "review";
    },
  },
  watch: {
    nodeInfo: {
      handler(newValue, oldValue) {
        if (newValue && newValue.nodes) {
          let nodes = newValue.nodes;

          nodes.forEach((item) => {
            const { handleStatus, handleResult } = item;
            let iconKey = null;

            switch (handleStatus) {
              case "2":
                iconKey =
                  handleResult === "1"
                    ? "1"
                    : handleResult === "2"
                      ? "2"
                      : handleResult === "6"
                        ? "3"
                        : null;
                break;
              case "1":
                iconKey = 4;
                break;
              case "0":
                iconKey = 5;
                break;
              default:
                iconKey = item.handleStatus || null;
            }
            console.log("iconKey", iconKey);

            item.icon =
              iconKey !== null && this.iconsInfo[iconKey]
                ? this.iconsInfo[iconKey]
                : { iconfont: "", iconClass: "" };
          });

          // 更新节点和其他字段
          this.nodes = nodes;
          this.formData.instType = newValue.instType;
          this.formData.nodes = nodes;
          this.formData.removeIds = newValue.removeIds;
          this.formData.reason = newValue.reason;
          this.formData.files = newValue.files;
        }
      },
    },
  },
  data() {
    return {
      nodeInfo: {}, //节点信息
      nodes: [],
      iconsInfo: {
        1: {
          iconfont: "el-icon-success",
          iconClass: "rgb(7,186,86)",
          info: "已同意",
        }, //通过
        2: {
          iconfont: "el-icon-error",
          iconClass: "rgb(255,0,0)",
          info: "已拒绝",
        }, //驳回
        3: {
          iconfont: "el-icon-warning",
          iconClass: "rgb(255,0,0)",
          info: "已撤销",
        }, //撤销
        4: { iconfont: "el-icon-question", iconClass: "#eee", info: "待审批" }, //待处理
        5: { iconfont: "el-icon-question", iconClass: "#eee", info: "待审批" }, //未开始
      },

      selectedOptions: [],
      isDestory: true,
      formData: {
        instType: "",
        nodes: {},
        removeIds: [],
        reason: "",
        files: [],
      },
      fileInfo: {},
      rules: {},
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改审批",
        create: "审批",
        look: "查看审批",
        review: "审批",
      },

      waitUploadFileList: [],
      noMergeWaitUploadFileList: [],
      multipleSelection: [],
      pathList: [], //存放文件路径
      filesList: [],
      pathItem: {},
      uploadPath: "", //上传文件路径
      fileLoading: false,

      waitUploadFile: {},
      loading: false,

      testInput: "",

      tags: [],
      needApproval: false,
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    queryDetail() {
      this.$emit("queryDetail");
    },
    handleSpace: debounce(function (val) {
      if (!this.testInput) {
        this.$message.error("请输入内容！");
        return;
      }
      this.tags.push(this.testInput);
      this.testInput = "";
    }, 200),
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    // 删除文件
    closeAndDelFile(index) {
      console.log(index);
      this.formData.files.splice(index, 1);
    },
    /**
     * 打开dialog
     * @param isPass 是否通过
     */
    handleRejectOrPass(isPass) {
      const { id } = this.nodeInfo;
      this.$emit("handleRejectOrPass", isPass, id);
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.nodeInfo.reason = this.formData.reason;
          this.nodeInfo.files = this.formData.files;
          let op = this.dialog.status == "create" ? "add" : "edit";
          opApproval(this.nodeInfo, op)
            .then((res) => {
              if (res && res.flag) {
                let message = op == "add" ? "发起成功" : "修改成功";
                this.$message.success(message);
                this.loading = false;
                this.handleClose();
                this.$emit("queryList");
              } else {
                this.loading = false;
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove() { },
    handleClose() {
      this.$refs["form"].resetFields();
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
            fileSize,
            md5,
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
      let files = []
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
            fileSource: "bpm",
          });
          if (res && res.flag) {
            let resData = res.resData;
            let realName = resData.fileName;
            let fileUrl = resData.url;
            let displayName = `${fileName}.${fileType}`;

            let fileItem = {
              fileUrl,
              realName,
              displayName,
            };
            files.push(fileItem)

            this.formData.files = files;
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
      width: 1000px;
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
      width: 300px;
    }

    .el-form-item__error {
      margin-left: 120px;
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }

  .el-tag-edu {
    margin-left: 120px;
  }

  .el-input-textarea {
    width: 780px;
  }
}
</style>
