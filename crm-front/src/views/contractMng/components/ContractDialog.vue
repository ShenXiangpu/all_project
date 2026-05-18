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
    <el-form ref="form" class="el-form-edu" :model="formData" :rules="rules">
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 基本信息
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户名称" prop="customer.customerName">
            <el-input
              class="el-input-edu"
              placeholder="建议输入为公司名称"
              v-if="formData && formData.customer"
              v-model="formData.customer.customerName"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="customer.linkName">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系人"
              v-if="formData && formData.customer"
              v-model="formData.customer.linkName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话" prop="customer.linkPhone">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系电话"
              v-if="formData && formData.customer"
              v-model="formData.customer.linkPhone"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type
            v-if="formData && formData.customer"
            :form="formData"
            :className="'el-input-edu'"
            :propsName="'customer.companyTypeId'"
          ></company-type>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="customer.location">
            <el-cascader
              v-if="formData && formData.customer"
              size="large"
              class="el-input-edu"
              :options="options"
              v-model="formData.customer.location"
              @change="handleSelectChange"
            >
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="customer.fullAddress">
            <el-input
              v-if="formData && formData.customer"
              class="el-input-edu"
              placeholder="请输入详细地址"
              v-model="formData.customer.fullAddress"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source
            v-if="formData && formData.customer"
            :form="formData"
            :className="'el-input-edu'"
            :propsName="'customer.consumerSourceId'"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <cooperation-area
            v-if="formData && formData.customer"
            :form="formData"
            :className="'el-input-edu'"
            :propsName="'customer.cooperationAreaId'"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-type
            v-if="formData && formData.customer"
            :form="formData"
            :className="'el-input-edu'"
            :propsName="'customer.consumerTypeId'"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="公司介绍" prop="customer.remark">
            <el-input
              v-if="formData && formData.customer"
              class="el-input-edu"
              type="textarea"
              :rows="4"
              v-model="formData.customer.remark"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 合同信息
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同名称" prop="contract.contractName">
            <el-input
              class="el-input-edu"
              v-if="formData && formData.contract"
              placeholder="请输入为合同名称"
              v-model="formData.contract.contractName"
              maxlength="64"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同编号" prop="contract.contractNo">
            <el-input
              v-if="formData && formData.contract"
              class="el-input-edu"
              placeholder="请输入合同编号"
              v-model="formData.contract.contractNo"
              maxlength="64"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务生效时间" prop="contract.startTime">
            <el-date-picker
              v-if="formData && formData.contract"
              v-model="formData.contract.startTime"
              class="el-input-edu"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务结束时间" prop="contract.endTime">
            <el-date-picker
              v-if="formData && formData.contract"
              v-model="formData.contract.endTime"
              class="el-input-edu"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <payment-status
            v-if="formData && formData.contract"
            :form="formData"
            :className="'el-input-edu'"
            :propsName="'contract.paymentStatus'"
          />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="成交金额" prop="contract.contractAmount">
            <el-input
              class="el-input-edu"
              placeholder="请输入成交金额"
              v-if="formData && formData.contract"
              v-model="formData.contract.contractAmount"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="上传合同" prop="contract.contractAttachments">
            <big-file-upload-dialog
              target="/crm/file/upload"
              v-if="isDestory"
              :singleFile="false"
              ref="uploader"
              @removeFileDefine="removeFileDefine"
              @complete="complete"
              @onFileSuccess="onFileSuccess"
              :isDirectory="false"
              @handleClose="handleCloseFileDialog"
            ></big-file-upload-dialog>
            <div
              v-for="(item, index) in formData.contract.contractAttachments"
              :key="index"
            >
              <el-tag
                @close="closeAndDelFile(index)"
                size="mini"
                closable
                v-if="item && item.displayName"
                class="el-tag-edu"
                >{{ item.displayName }}</el-tag
              >
            </div>
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
import { mergeChunkFile } from "@/api/crm/file";
import { addOne, editOne } from "@/api/crm/contractMng";
import { pcTextArr } from "element-china-area-data";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import PaymentStatus from "@/views/clueMng/components/FormItem/PaymentStatus.vue";
import BigFileUploadDialog from "@/components/BigFileUploadDialog";
import { cloneDeep } from 'lodash'
export default {
  name: "AddDialog",
  props: {},
  components: {
    CompanyType,
    CustomerSource,
    CooperationArea,
    CustomerType,
    PaymentStatus,
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
      options: pcTextArr,
      selectedOptions: [],
      isDestory: true,
      formData: {
        customer: {
          customerName: "",
          linkName: "",
          linkPhone: "",
          companyTypeId: "",
          consumerTypeId: "",
          consumerSourceId: "",
          cooperationAreaId: "",
          location: [],
          fullAddress: "",
          remark: "",
        },
        contract: {
          contractNo: "",
          contractName: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          contractAmount: "",
          contractAttachments: [],
        },
      },
      fileInfo: {},
      rules: {
        "customer.customerName": [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        "customer.linkName": [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        "customer.linkPhone": [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        "customer.companyTypeId": [
          { required: true, message: "请选择单位类型", trigger: "blur" },
        ],
        "customer.location": [
          { required: true, message: "请选择地区", trigger: "blur" },
        ],
        "customer.fullAddress": [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        "customer.consumerSourceId": [
          { required: true, message: "请选择客户来源", trigger: "blur" },
        ],
        "customer.consumerTypeId": [
          { required: true, message: "请选择合同类型", trigger: "blur" },
        ],
        "customer.cooperationAreaId": [
          { required: true, message: "请选择合作区域", trigger: "blur" },
        ],
        "customer.remark": [
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        "contract.contractNo": [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        "contract.contractName": [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        "contract.startTime": [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        "contract.endTime": [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        "contract.paymentStatus": [
          { required: true, message: "请选择合同状态", trigger: "blur" },
        ],
        "contract.contractAmount": [
          { required: true, message: "请输入合同金额", trigger: "blur" },
        ],
        "contract.contractAttachments": [
          { required: true, message: "请上传合同附件", trigger: "blur" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "添加合同",
        create: "编辑客户",
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
    handleSpace: debounce(function (val) {
      if (!this.testInput) {
        this.$message.error("请输入内容！");
        return;
      }
      this.tags.push(this.testInput);
      this.testInput = "";
    }, 200),
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) {
      console.log("value", this.selectedOptions);

      console.log("省市区code：", value[0], value[1], value[2]);
      console.log(
        "省市区：",
        codeToText[value[0]],
        codeToText[value[1]],
        codeToText[value[2]],
        textToCode["河北省"],
        "",
        regionData
      );
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    // 删除文件
    closeAndDelFile(index) {
      console.log(index);
      this.formData.contract.contractAttachments.splice(index, 1);
    },
    submitUpload() {
      console.log("form", this.formData);

      this.$refs["form"].validate((valid) => {
        if (valid) {
          let formData = cloneDeep(this.formData);
          let customer = formData.customer;
          if (customer.location) {
            formData.customer.location = customer.location.join(",");
          }
          this.loading = true;

          if (this.dialog.status == "create") {
            addOne(formData)
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
            editOne(formData)
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
            fileSource: "contract",
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

            this.formData.contract.contractAttachments.push(fileItem);
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
