<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
    :close-on-click-modal="false"
    :style="{ '--color': defaultTheme || '#10abb9' }"
  >
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="线索名称" prop="name">
            <el-input
              class="el-input-edu"
              placeholder="请输入线索名称"
              v-model="form.name"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="name">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系人"
              v-model="form.name"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话" prop="name">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系电话"
              v-model="form.name"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="单位类型" prop="name">
            <el-select
              class="el-input-edu"
              v-model="form.packageType"
              placeholder="请选择单位类型"
            >
              <el-option
                v-for="item in unitTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="name">
            <el-cascader
              size="large"
              class="el-input-edu"
              :options="options"
              v-model="selectedOptions"
              @change="handleSelectChange"
            >
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="name">
            <el-input
              class="el-input-edu"
              placeholder="请输入详细地址"
              v-model="form.name"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户级别" prop="name">
            <el-select
              class="el-input-edu"
              v-model="form.packageType"
              placeholder="请选择客户级别"
            >
              <el-option
                v-for="item in customLevelList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户意向" prop="name">
            <el-select
              class="el-input-edu"
              v-model="form.packageType"
              placeholder="请选择客户意向"
            >
              <el-option
                v-for="item in customIntentionList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户来源" prop="name">
            <el-select
              class="el-input-edu"
              v-model="form.packageType"
              placeholder="请选择客户来源"
            >
              <el-option
                v-for="item in custemSourceList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合作方向" prop="name">
            <el-select
              class="el-input-edu"
              v-model="form.packageType"
              placeholder="请选择合作方向"
            >
              <el-option
                v-for="item in cooperationDirectionList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户标签" prop="name">
            <el-input
              class="el-input-edu"
              placeholder="按空格确定"
              v-model.trim="testInput"
              maxlength="32"
              show-word-limit
              @keydown.space.native="handleSpace"
            ></el-input>
            <div class="el-tag-edu">
              <el-tag
                v-for="tag in tags"
                :key="tag"
                closable
                class="marginRight10"
                :disable-transitions="false"
                @close="handleCloseTag(tag)"
              >
                {{ tag }}</el-tag
              >
            </div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="备注" prop="name">
            <el-input
              class="el-input-edu"
              type="textarea"
              :rows="6"
              v-model="form.name"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import debounce from "lodash/debounce";
import BigFileUploadDialog from "@/components/BigFileUploadDialog/index.vue";
import { pcTextArr, codeToText } from "element-china-area-data";
export default {
  name: "UploadFileDialog",
  props: {
    bigType: {
      type: String | Number,
      default: "" | 0,
    },
  },
  components: {
    BigFileUploadDialog,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  watch: {},
  data() {
    return {
      unitTypeList: [
        { label: "全部类型", value: "" },
        { label: "央企", value: "央企" },
        { label: "国企", value: "国企" },
        { label: "私企", value: "私企" },
        { label: "政府", value: "政府" },
        { label: "科研单位", value: "科研单位" },
        { label: "高校", value: "高校" },
        { label: "社会组织", value: "社会组织" },
        { label: "其他", value: "其他" },
      ],
      customLevelList: [
        { label: "全部级别", value: "全部级别" },
        { label: "重要客户", value: "重要客户" },
        { label: "优质客户", value: "优质客户" },
        { label: "普通客户", value: "普通客户" },
        { label: "无效客户", value: "无效客户" },
        { label: "无法判断", value: "无法判断" },
      ],
      customIntentionList: [
        { label: "全部意向", value: "全部意向" },
        { label: "极高意向", value: "极高意向" },
        { label: "较高意向", value: "较高意向" },
        { label: "一般意向", value: "一般意向" },
        { label: "无意向", value: "无意向" },
        { label: "无法判断", value: "无法判断" },
      ],
      custemSourceList: [
        { label: "全部来源", value: "全部来源" },
        { label: "公司资源", value: "公司资源" },
        { label: "个人资源", value: "个人资源" },
        { label: "重要活动", value: "重要活动" },
        { label: "转介绍", value: "转介绍" },
        { label: "客户咨询", value: "客户咨询" },
        { label: "其他来源", value: "其他来源" },
      ],
      cooperationDirectionList: [
        { label: "全部方向", value: "全部方向" },
        { label: "MPW业务", value: "MPW业务" },
        { label: "PDK业务", value: "PDK业务" },
        { label: "EDA云平台", value: "EDA云平台" },
        { label: "客户管理平台", value: "客户管理平台" },
        { label: "机房业务", value: "机房业务" },
        { label: "培训业务", value: "培训业务" },
        { label: "政府业务", value: "政府业务" },
        { label: "招商业务", value: "招商业务" },
        { label: "其他业务", value: "其他业务" },
      ],
      packageTypeList: [
        { label: "软核", value: "软核" },
        { label: "固核", value: "固核" },
        { label: "硬核", value: "硬核" },
        { label: "其他", value: "其他" },
      ],
      options: pcTextArr,
      selectedOptions: [
        '河北省', '秦皇岛市'
      ],
      isDestory: true,
      form: {
        name: "",
        supplier: "内部IP",
        supplierName: "",
        packageType: "",
        chipVerification: "是",
        foundry: "",
        process: "",
        version: "",
        displayName: "",
      },
      fileInfo: {},
      rules: {
        name: [{ required: true, message: "请输入IP名称", trigger: "blur" }],
        supplier: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        supplierName: [
          { required: true, message: "请输入外部IP名称", trigger: "blur" },
        ],
        packageType: [
          { required: true, message: "请选择封装类型", trigger: "blur" },
        ],
        chipVerification: [
          { required: true, message: "请选择是否流片验证", trigger: "blur" },
        ],
        foundry: [
          { required: true, message: "请输入foundry名称", trigger: "blur" },
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
        update: "修改IP",
        create: "创建IP",
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

      testInput: "",

      tags: [],
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    handleSpace: debounce(function (val){
        if (!this.testInput) {
        this.$message.error("请输入内容！");
        return;
      }
      this.tags.push(this.testInput);
      this.testInput = "";
    },200),
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) {
        console.log("value",this.selectedOptions );
        
      console.log("省市区code：", value[0], value[1], value[2]);
      console.log(
        "省市区：",
        codeToText[value[0]],
        codeToText[value[1]],
        codeToText[value[2]],
        textToCode['河北省'],
        '',regionData
      );
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
      let form = {
        name: "",
        supplier: "内部IP",
        supplierName: "",
        packageType: "",
        chipVerification: "是",
        foundry: "",
        process: "",
        version: "",
        displayName: "",
      };
      this.form = form;
    },
    // 删除文件
    closeAndDelFile() {
      this.form.fileSize = "";
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
          this.form.supplier == "外部IP"
            ? (this.form.supplier = this.form.supplierName)
            : this.form.supplier;
          this.loading = true;
          this.form.bigType = this.bigType;
          if (this.dialog.status == "create") {
            this.fileInfo.version = this.form.version;
            this.form.itemList = [this.fileInfo];

            addIP(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
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
            modifyIp(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("修改成功");
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
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove() {},
    handleClose() {
      this.$refs["form"].resetFields();
      this.fileList = [];
      this.form.displayName = "";
      this.dialog.visible = false;
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
              displayName,
              fileSize,
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
}
</style>
