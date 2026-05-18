<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
    @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
    <el-form ref="form" class="el-form-edu" :disabled="dialog.status == 'look'" :model="formData" :rules="rules">
      <div class="marginBottom20 font16 fontW7" v-if="dialog.status !== 'look'">
        <span class="primaryColoro">*</span> 基本信息
      </div>
      <el-row v-if="dialog.status !== 'look'">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户名称" prop="customerName">
            <el-input class="el-input-edu" placeholder="建议输入为公司名称" v-model="formData.customerName" maxlength="40"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="linkName">
            <el-input class="el-input-edu" placeholder="请输入联系人" v-model="formData.linkName" maxlength="10"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input class="el-input-edu" placeholder="请输入联系电话" v-model="formData.linkPhone" maxlength="20"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type :form="formData" :className="'el-input-edu'" :propsName="'companyTypeId'"></company-type>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="location">
            <el-cascader size="large" class="el-input-edu" :options="options" v-model="formData.location"
              @change="handleSelectChange">
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="fullAddress">
            <el-input class="el-input-edu" placeholder="请输入详细地址" v-model="formData.fullAddress" maxlength="100"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source :form="formData" :className="'el-input-edu'" :propsName="'consumerSourceId'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="供应商" prop="type">
            <el-radio-group v-model="formData.type" class="el-input-edu">
              <el-radio :label="2">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>


      </el-row>
      <el-row v-if="dialog.status !== 'look' && dialog.status !== 'follow'">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="公司介绍" prop="remark">
            <el-input class="el-input-edu" type="textarea" :rows="4" v-model="formData.remark" maxlength="500"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="备注信息" prop="note">
            <el-input class="el-input-edu" type="textarea" :rows="4" v-model="formData.note" :maxlength="500"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 合同信息
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同名称" prop="contract.contractName">
            <el-input class="el-input-edu" v-if="formData && formData.contract" placeholder="请输入为合同名称"
              v-model="formData.contract.contractName" maxlength="64" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同序号" prop="contract.contractSe">
            <el-input v-if="formData && formData.contract" class="el-input-edu" placeholder="请输入合同序号"
              v-model="formData.contract.contractSe" :maxlength="64" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同编号" prop="contract.contractNo">
            <el-input v-if="formData && formData.contract" class="el-input-edu" placeholder="请输入合同编号"
              v-model="formData.contract.contractNo" maxlength="64" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <cooperation-area :form="formData" :className="'el-input-edu'" :propsName="'contract.cooperationAreaId'" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="
          formData &&
          formData.contract &&
          formData.contract.cooperationAreaId === 34
        ">
          <template>
            <el-form-item v-if="
              formData &&
              formData.contract &&
              formData.contract.cooperationAreaId === 34
            " label="关联用户" prop="contract.contractUserRelList">
              <choose-users-list :rebackNameList="rebackNameList" :status="dialog.status" @changeList="getUsersList" />
            </el-form-item>
          </template>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <signatory-type v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.signatoryType'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-type :form="formData" :className="'el-input-edu'" :propsName="'contract.contractTypeId'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务生效时间" prop="contract.startTime">
            <el-date-picker v-if="formData && formData.contract" v-model="formData.contract.startTime"
              class="el-input-edu" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务结束时间" prop="contract.endTime">
            <el-date-picker v-if="formData && formData.contract" v-model="formData.contract.endTime"
              class="el-input-edu" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="合同金额" prop="contract.contractAmount">
            <el-input @input="inputContractAmount" class="el-input-edu" placeholder="请输入合同金额"
              v-if="formData && formData.contract" v-model="formData.contract.contractAmount" maxlength="50"
              show-word-limit>
              <template #append>元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <payment-status v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.paymentStatus'" />
        </el-col>


        <el-col v-if="formData && formData.contract.paymentStatus !== 52 && formData.contract.paymentStatus !== ''"
          :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 金额和时间 -->
          <amount-and-time @update:contractAmount="updateRestAmount" @addAmountAndTime="addAmountTime"
            @removeAmountAndTime="removeAmountTime" :formData="formData" :rules="rules" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="剩余尾款" prop="contract.restAmount">
            <el-input readonly class="el-input-edu" placeholder="请输入成交金额" v-if="formData && formData.contract"
              v-model="formData.contract.restAmount" maxlength="50" show-word-limit>
              <template #append>元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="上传合同" prop="contract.contractAttachments">
            <big-file-upload-dialog target="/crm/file/upload" v-if="isDestory && dialog.status !== 'look'"
              :singleFile="false" ref="uploader" @removeFileDefine="removeFileDefine" @complete="complete"
              @onFileSuccess="onFileSuccess" :isDirectory="false" :disabled="true"
              @handleClose="handleCloseFileDialog"></big-file-upload-dialog>
            <div class="marginBottom10" v-else>
              <el-button type="primary" icon="el-icon-upload font14 primaryColorw" :disabled="true">上传合同</el-button>
            </div>
            <!-- <div v-for="(item, index) in formData.contract.contractAttachments" :key="index">
              <el-tag @close="closeAndDelFile(index)" size="mini" closable v-if="item && item.displayName"
                class="el-tag-edu pointer" @click="handleOpenContract(item)">{{ item.displayName }}</el-tag>
            </div> -->
            <show-file class="show-file" :list="formData.contract.contractAttachments"
              @closeAndDelFile="closeAndDelFile" @handleDown="handleOpenContract" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog append-to-body :title="dialogSourse.title" :visible.sync="dialogSourse.visible" @close="cancelSourse"
      fullscreen>
      <iframe :src="pdfUrl" frameborder="0" style="z-index: 1000; height: 560px; width: 100%"></iframe>
    </el-dialog>
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
import { addOneFromClue } from "@/api/crm/myClues";
import { pcTextArr } from "element-china-area-data";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import PaymentStatus from "@/views/clueMng/components/FormItem/PaymentStatus.vue";
import SignatoryType from "@/views/clueMng/components/FormItem/SignatoryType.vue";
import BigFileUploadDialog from "@/components/BigFileUploadDialog";
import ChooseUsersList from "@/views/contractMng/components/ChooseUsersList";
import AmountAndTime from "../../../contractMng/components/AmountAndTime.vue";
import ShowFile from "@/views/contractMng/components/ShowFile/index.vue";
import { cloneDeep } from "lodash";
import { type } from "jquery";
export default {
  name: "AddDialog",
  props: {},
  components: {
    CompanyType,
    CustomerSource,
    CooperationArea,
    CustomerType,
    PaymentStatus,
    SignatoryType,
    AmountAndTime,
    BigFileUploadDialog,
    ChooseUsersList, ShowFile
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
    "formData.contract.paymentStatus": {
      handler(newVal) {
        console.log("newVal", newVal);

        // 监听付款状态变化，重新计算剩余尾款
        if (newVal && newVal == 52) {
          console.log("newVal", newVal);
          this.formData.contract.contractPaymentList = [
            {
              paymentAmount: "",
              paymentTime: "",
            },
          ]
          let contractAmount = this.formData.contract.contractAmount - 0;
          this.formData.contract.restAmount = contractAmount && contractAmount.toFixed(2) || 0.00;

        }
      },
      deep: true,
    },
    "formData.contract.cooperationAreaId"(newVal) {
      this.handleUserListValidate(newVal);
    },
    "formData.contract.contractAmount": {
      handler(newVal) {
        // 监听合同金额的变化，重新计算剩余尾款
        if (newVal && this.formData.contract.contractPaymentList.length > 0) {
          let total = 0;
          this.formData.contract.contractPaymentList.forEach((item) => {
            total += item.paymentAmount - 0;
          });
          this.formData.contract.restAmount = (newVal - total).toFixed(2) || 0.00;
        } else {
          this.formData.contract.restAmount = newVal && newVal.toFixed(2) || 0.00;
        }
      },
      deep: true,
    },
  },
  created() {
    console.log('AddDialog created', this.formData);

  },
  data() {
    return {
      options: pcTextArr,
      selectedOptions: [],
      isDestory: true,
      formData: {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerTypeId: "",
        consumerSourceId: "",
        location: [],
        fullAddress: "",
        remark: "",
        note:"",
        type: 1,

        contract: {
          contractNo: "",
          contractSe: "",
          contractName: "",
          cooperationAreaId: "",
          contractTypeId: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          contractAmount: 0.00,
          contractUserRelList: [],
          contractAttachments: [],
          restAmount: 0.00, //剩余尾款
          signatoryType: "",
          contractPaymentList: [
            {
              paymentAmount: "",
              paymentTime: "",
            },
          ], //金额和时间
        },
      },
      rebackNameList: [],
      userRelListError: "",
      fileInfo: {},
      rules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        linkName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        linkPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        companyTypeId: [
          { required: true, message: "请选择单位类型", trigger: "blur" },
        ],
        location: [{ required: true, message: "请选择地区", trigger: "blur" }],
        fullAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        consumerSourceId: [
          { required: true, message: "请选择客户来源", trigger: "blur" },
        ],
        consumerTypeId: [
          { required: true, message: "请选择合同类型", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择客户类型", trigger: "blur" },
        ],

        remark: [
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        "contract.contractNo": [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        "contract.contractSe": [
          { required: true, message: "请输入合同序号", trigger: "blur" },
        ],
        "contract.contractName": [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        "contract.cooperationAreaId": [
          { required: true, message: "请选择合作区域", trigger: "blur" },
        ],
        "contract.contractTypeId": [
          { required: true, message: "请选择合同类型", trigger: "blur" },
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
          {
            pattern: /^[1-9]\d*(\.\d{1,2})?$/,
            message: "请输入正确的金额",
            trigger: "blur",
          },
        ],
        "contract.contractAttachments": [
          { required: true, message: "请上传合同附件", trigger: "blur" },
        ],

        // 动态数组字段规则
        "contract.contractPaymentList.paymentAmount": [
          { required: true, message: "请输入金额", trigger: "blur" },
          { pattern: /^[1-9]\d*(\.\d{1,2})?$/, message: "金额格式错误" }
        ],
        "contract.contractPaymentList.paymentTime": [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        "contract.signatoryType": [
          { required: true, message: "请选择签约方", trigger: "blur" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      dialogSourse: {
        visible: false,
        title: "",
      },
      textMap: {
        update: "转为客户",
        create: "转为客户",
        look: "转为客户",
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
      pdfUrl: "",
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
    inputContractAmount(e) {

    },
    updateRestAmount(total) {
      let newVal = this.formData.contract.contractAmount - 0;
      this.formData.contract.restAmount = (newVal - total).toFixed(2) || 0.00;
    },
    addAmountTime() {
      let contractPaymentList = this.formData.contract.contractPaymentList
      contractPaymentList.push({ paymentAmount: "", paymentTime: "" });

    },
    removeAmountTime(index) {

      this.formData.contract.contractPaymentList.splice(index, 1);
    },
    handleUserListValidate(value) {
      if (value !== 34) {
        this.rebackNameList = []; //去掉名单
        this.formData.contract.contractUserRelList = [];
        this.$nextTick(() => {
          this.$refs.form.clearValidate(["contract.contractUserRelList"]);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.form.validateField("contract.contractUserRelList");
        });
      }
    },
    //获得关联用户ID
    getUsersList(list) {
      // this.formData.contract.contractUserRelList = list;
      this.$set(this.formData.contract, "contractUserRelList", list);
      this.$nextTick(() => {
        this.$refs.form.validateField("contract.contractUserRelList");
      });
    },
    cancelSourse() {
      this.dialogSourse.visible = false;
    },
    handleOpenContract(item) {
      console.log(item);
      this.pdfUrl = item.fileUrl;
      let realName = item.realName;
      let fileName = realName;
      const a = document.createElement("a"); //创建a标签
      a.style.display = "none";
      a.href = this.pdfUrl; // 指定下载链接
      a.download = fileName; //指定下载文件名
      document.body.appendChild(a);
      a.click(); //触发下载
      document.body.removeChild(a);
      this.$message.success("下载成功");
      // if (realName.indexOf(".pdf") == -1) {

      // } else {
      //   this.dialogSourse.visible = true;
      //   this.dialogSourse.title = item.realName;
      // }
    },
    initForm() {
      let formData = {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerSourceId: "",
        location: [],
        fullAddress: "",
        remark: "",
        contract: {
          contractNo: "",
          contractSe: "",
          contractName: "",
          cooperationAreaId: "",
          contractTypeId: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          contractAmount: 0,
          contractAttachments: [],
          contractUserRelList: [],
          restAmount: 0, //剩余尾款
          contractPaymentList: [
            {
              paymentAmount: "",
              paymentTime: "",
            },
          ], //金额和时间

        },
      };
      this.formData = formData;
    },
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) { },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    // 删除文件
    closeAndDelFile(index) {
      if (this.dialog.status == "look") {
        return;
      }
      this.formData.contract.contractAttachments.splice(index, 1);
    },
    submitUpload() {
      console.log('12312312', this.formData);

      this.$refs["form"].validate((valid) => {
        if (valid) {
          let formData = cloneDeep(this.formData);

          if (formData && formData.location) {
            let location = formData.location;
            formData.location =
              location && location.length > 0 && location.join(",");
          }

          this.loading = true;

          addOneFromClue(formData)
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("线索转客户成功");
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
      this.userRelListError = "";
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
            fileSource: "clueTocontract",
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

.show-file {
  ::v-deep {
    .el-tag-edu {
      margin-left: 120px;
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

    .el-form-item__content .el-input-group {
      vertical-align: initial;
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
