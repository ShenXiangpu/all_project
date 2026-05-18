<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
    @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
    <el-form ref="form" class="el-form-edu" :disabled="dialog.status == 'look' || dialog.status == 'follow'"
      :model="formData" :rules="rules">
      <div class="marginBottom20 font16 fontW7" v-if="dialog.status !== 'look' && dialog.status !== 'follow'">
        <span class="primaryColoro">*</span> 基本信息
      </div>
      <el-row v-if="dialog.status !== 'look' && dialog.status !== 'follow'">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户名称" prop="customer.customerName">
            <el-autocomplete class="el-input-edu" v-if="formData && formData.customer"
              v-model="formData.customer.customerName" :fetch-suggestions="querySearchAsync" placeholder="建议输入为公司名称"
              @select="handleSelect" :disabled="dialog.status == 'update'" :maxlength="40"
              show-word-limit></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="customer.linkName">
            <el-input class="el-input-edu" placeholder="请输入联系人" v-if="formData && formData.customer"
              v-model="formData.customer.linkName" :maxlength="10" show-word-limit
              :disabled="dialog.status == 'update'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系方式" prop="customer.linkPhone">
            <el-input class="el-input-edu" placeholder="请输入联系方式"
              v-if="formData && formData.customer && dialog.status == 'create'" v-model="formData.customer.linkPhone"
              :maxlength="20" :disabled="dialog.status == 'update'" show-word-limit></el-input>
            <div v-else>
              <el-tooltip :content="formData.customer.linkPhone" placement="top">
                <span>{{ replacePhone }}</span>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type v-if="formData && formData.customer" :form="formData" :className="'el-input-edu'"
            :propsName="'customer.companyTypeId'" :disabled="dialog.status == 'update'"></company-type>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="customer.location">
            <el-cascader v-if="formData && formData.customer" size="large" class="el-input-edu" :options="options"
              v-model="formData.customer.location" @change="handleSelectChange" :disabled="dialog.status == 'update'">
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="customer.fullAddress">
            <el-input v-if="formData && formData.customer" class="el-input-edu" placeholder="请输入详细地址"
              v-model="formData.customer.fullAddress" :maxlength="100" show-word-limit
              :disabled="dialog.status == 'update'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source v-if="formData && formData.customer" :form="formData" :className="'el-input-edu'"
            :propsName="'customer.consumerSourceId'" :disabled="dialog.status == 'update'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="供应商" prop="customer.type">
            <el-radio-group v-model="formData.customer.type" class="el-input-edu" :disabled="dialog.status == 'update'">
              <el-radio :label="2">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>


      </el-row>
      <el-row v-if="dialog.status !== 'look' && dialog.status !== 'follow'">

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="公司介绍" prop="customer.remark">
            <el-input v-if="formData && formData.customer" class="el-input-edu" type="textarea" :rows="4"
              v-model="formData.customer.remark" :maxlength="500" show-word-limit
              :disabled="dialog.status == 'update'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="备注信息" prop="customer.note">
            <el-input v-if="formData && formData.customer" class="el-input-edu" type="textarea" :rows="4"
              v-model="formData.customer.note" :maxlength="500" show-word-limit
              :disabled="dialog.status == 'update'"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟踪人" prop="customer.trackUserId">
            <el-autocomplete class="el-input-edu" v-model="formData.customer.trackUserId"
              :fetch-suggestions="querySearchTrackAsync" placeholder="请输入跟踪人名称" @select="handleSelectTrack"
              :maxlength="40" show-word-limit :disabled="dialog.status == 'update'"></el-autocomplete>
          </el-form-item>
        </el-col> -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟踪人" prop="customer.trackUserId">
            <el-select v-if="formData && formData.customer" class="el-input-edu" v-model="formData.customer.trackUserId"
              placeholder="请选择跟踪人" :disabled="dialog.status == 'update'" filterable remote reserve-keywords
              :remote-method="querySearchTrackAsync" :loading="selectLoading" @focus="querySearchTrackAsync('')"
              :maxlength="40" show-word-limit>
              <el-option v-for="item in trackUserList" :key="item.id" :label="item.userName" :value="item.id">
              </el-option>
            </el-select>
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
              v-model="formData.contract.contractName" :maxlength="64" show-word-limit></el-input>
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
              v-model="formData.contract.contractNo" :maxlength="64" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-type v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.contractTypeId'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <cooperation-area v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.cooperationAreaId'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <signatory-type v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.signatoryType'" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item v-if="
            formData &&
            formData.contract &&
            formData.contract.cooperationAreaId === 34
          " label="关联用户" prop="contract.contractUserRelList">
            <choose-users-list :rebackNameList="rebackNameList" :status="dialog.status" @changeList="getUsersList" />
          </el-form-item>
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
              v-if="formData && formData.contract" v-model="formData.contract.contractAmount" :maxlength="50"
              show-word-limit> <template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <payment-status v-if="formData && formData.contract" :form="formData" :className="'el-input-edu'"
            :propsName="'contract.paymentStatus'" />
        </el-col>

        <el-col v-if="formData && formData.contract.paymentStatus !== 52 && formData.contract.paymentStatus !== ''"
          :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 金额和时间 -->
          <amount-and-time :isLook="dialog.status == 'look'" @update:contractAmount="updateRestAmount"
            @addAmountAndTime="addAmountTime" @removeAmountAndTime="removeAmountTime" :formData="formData"
            :rules="rules" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="剩余尾款" prop="contract.restAmount">
            <el-input readonly class="el-input-edu" placeholder="请输入剩余尾款" v-if="formData && formData.contract"
              v-model="formData.contract.restAmount" :maxlength="50" show-word-limit>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="上传合同" prop="contract.contractAttachments">
            <big-file-upload-dialog target="/crm/file/upload" v-if="isDestory && dialog.status !== 'look'"
              :singleFile="false" ref="uploader" @removeFileDefine="removeFileDefine" @complete="complete"
              @onFileSuccess="onFileSuccess" :isDirectory="false" :disabled="true" @handleClose="handleCloseFileDialog">
            </big-file-upload-dialog>
            <div class="marginBottom10" v-else>
              <el-button type="primary" icon="el-icon-upload font14 primaryColorw" :disabled="true">上传合同</el-button>
            </div>
            <show-file :list="formData.contract.contractAttachments" @closeAndDelFile="closeAndDelFile"
              @handleDown="handleOpenContract" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog append-to-body :title="dialogSourse.title" :visible.sync="dialogSourse.visible" @close="cancelSourse"
      fullscreen>
      <iframe :src="pdfUrl" frameborder="0" style="z-index: 1000; height: 560px; width: 100%"></iframe>
    </el-dialog>

    <el-form ref="followForm" class="el-form-edu" :model="followFormData" :rules="followRules"
      v-if="dialog.status === 'follow'">
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 合同跟进
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟进内容" prop="content">
            <el-input class="el-input-edu" type="textarea" :rows="4" v-model="followFormData.content" :maxlength="500"
              show-word-limit :disabled="dialog.status == 'update'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="下次跟进时间" prop="nextFollowUpDate">
              <el-date-picker v-model="followFormData.nextFollowUpDate" class="el-input-edu" type="date"
                placeholder="选择日期时间" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <contract-follow-up-status :form="followFormData" :className="'el-input-edu'"
              :propsName="'followUpStatusId'" />
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <follow-up-type :form="followFormData" :className="'el-input-edu'" :propsName="'followUpTypeId'" />
          </el-col>
        </el-col>

      </el-row>
    </el-form>


    <div v-if="dialog.status != 'create'">
      <follow-list :data="followUpList" :columns="followColumns" :emptyText="'暂无数据'"></follow-list>
    </div>
    <span slot="footer" class="dialog-footer" v-if="dialog.status != 'look'">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" || dialog.status === "follow" ? "确 定" : "修改"
        }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
import { mergeChunkFile } from "@/api/crm/file";
import { addOne, editOne, downContractFileById, contractFollowUpList, contractFollowUpAddOne } from "@/api/crm/contractMng";
import { pcTextArr } from "element-china-area-data";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import PaymentStatus from "@/views/clueMng/components/FormItem/PaymentStatus.vue";
import SignatoryType from "@/views/clueMng/components/FormItem/SignatoryType.vue";
import ContractFollowUpStatus from "@/views/clueMng/components/FormItem/ContractFollowUpStatus.vue";
import FollowUpType from "@/views/clueMng/components/FormItem/FollowUpType.vue";

import AmountAndTime from "./AmountAndTime.vue";
import BigFileUploadDialog from "@/components/BigFileUploadDialog";
import FollowList from "./Follow/FollowList/index.vue";
import ChooseUsersList from "./ChooseUsersList";
import { customList, customAllList } from "@/api/crm/customMng";
import ShowFile from "./ShowFile";
import { cloneDeep } from "lodash";
import { formatStr } from "@/utils/utils";
import { getAllUserSelect } from "@/api/crm/user";
export default {
  name: "AddDialog",
  props: {},
  components: {
    CompanyType,
    CustomerSource,
    CooperationArea,
    CustomerType,
    SignatoryType,
    PaymentStatus,
    ContractFollowUpStatus,
    FollowUpType,
    AmountAndTime,
    BigFileUploadDialog,
    ChooseUsersList,
    ShowFile,
    FollowList,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },

    replacePhone() {
      let str = this.formData.customer.linkPhone;
      // 严格匹配手机号（1开头，第二位3-9，11位）
      return formatStr(str);
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
  data() {
    return {
      options: pcTextArr,
      selectedOptions: [],
      isDestory: true,
      selectLoading: false,
      formData: {
        customer: {
          customerName: "",
          linkName: "",
          linkPhone: "",
          companyTypeId: "",
          consumerSourceId: "",
          location: [],
          fullAddress: "",
          remark: "",
          note: "",
          type: 1,
          trackUserId: "",
        },
        contract: {
          contractSe: "",
          contractNo: "",
          contractName: "",
          contractTypeId: "",
          cooperationAreaId: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          contractAmount: 0.00,
          contractAttachments: [],
          contractUserRelList: [],
          restAmount: 0.00,
          signatoryType: "",
          contractPaymentList: [
            {
              paymentAmount: "",
              paymentTime: "",
            },
          ], //金额和时间
        },
      },
      rebackNameList: [], //用户回显关联用户的字段
      fileInfo: {},
      userRelListError: "", //手动设置提示信息
      rules: {
        "customer.customerName": [
          { required: true, message: "请输入客户名称", trigger: "change" },
        ],
        "customer.linkName": [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        "customer.linkPhone": [
          { required: true, message: "请输入联系方式", trigger: "blur" },
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
        "customer.type": [
          { required: true, message: "请选择客户类型", trigger: "blur" },
        ],

        "customer.remark": [
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        "customer.trackUserId": [
          { required: true, message: "请输入跟踪人", trigger: "change" },
        ],
        "contract.contractSe": [
          { required: true, message: "请输入合同序号", trigger: "blur" },
        ],
        "contract.contractNo": [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        "contract.contractName": [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        "contract.contractTypeId": [
          { required: true, message: "请选择合同类型", trigger: "blur" },
        ],
        "contract.cooperationAreaId": [
          { required: true, message: "请选择合作区域", trigger: "blur" },
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
        "contract.signatoryType": [
          { required: true, message: "请选择签约类型", trigger: "blur" },
        ],
        "contract.contractAmount": [
          { required: true, message: "请输入合同金额", trigger: "blur" },
          {
            pattern: /^[0-9]\d*(\.\d{1,2})?$/,
            message: "请输入正确的金额",
            trigger: "blur",
          },
        ],
        // "contract.restAmount": [
        //   { required: true, message: "请输入剩余尾款", trigger: "blur" },
        //   {
        //     pattern: /^[0-9]\d*(\.\d{1,2})?$/,
        //     message: "请输入正确的金额",
        //     trigger: "blur",
        //   },
        // ],
        "contract.contractAttachments": [
          { required: true, message: "请上传合同附件", trigger: "blur" },
        ],
        // 动态数组字段规则
        "contract.contractPaymentList.paymentAmount": [
          { required: true, message: "请输入金额", trigger: "blur" },
          { pattern: /^[0-9]\d*(\.\d{1,2})?$/, message: "金额格式错误" }
        ],
        "contract.contractPaymentList.paymentTime": [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      fileList: [],
      visibleDialog: false,
      dialogSourse: {
        visible: false,
        title: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "编辑合同",
        create: "添加合同",
        look: "查看合同",
        follow: "合同跟进",
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

      restaurants: [],
      timeout: null,

      listQuery: {
        page: 1,
        limit: 10,
        params: {
          customerName: "",
        },
      },
      customsList: [],
      pdfUrl: "",
      followUpList: [], //合同跟进列表
      followColumns: [
        { key: "userName", label: "跟进人", fields: "userName", minWidth: 80 },
        { key: "content", label: "跟进内容", fields: "content", minWidth: 100 },
        { key: "followUpStatusName", label: "跟进状态", fields: "followUpStatusName", minWidth: 120 },
        { key: "followUpTypeName", label: "跟进方式", fields: "followUpTypeName", minWidth: 120 },
        { key: "nextFollowUpDate", label: "下次跟进时间", fields: "nextFollowUpDate", minWidth: 120 },
        { key: "createAt", label: "创建时间", fields: "createAt", minWidth: 180 },
      ],

      followFormData: {
        content: "",
        nextFollowUpDate: "",
        followUpStatusId: "",
        followUpTypeId: "",
      },
      followRules: {
        content: [
          { required: true, message: "请输入跟进内容", trigger: "blur" },
        ],
        followUpStatusId: [
          { required: true, message: "请选择跟进状态", trigger: "blur" },
        ],
        followUpTypeId: [
          { required: true, message: "请选择跟进方式", trigger: "blur" },
        ],
        nextFollowUpDate: [
          { required: false, message: "请选择下次跟进时间", trigger: "blur" },
        ],
      },
      followContractId: 0,
      restaurants: [],
      trackUserList: [],
      selectLoading: false,
    };
  },
  mounted() {
    this.getCustomList();
    this.querySearchTrackAsync("")
  },
  methods: {

    async querySearchTrackAsync(queryString = "") {
      console.log("============",this.formData);

      // this.listQuery.params.customerName = queryString;
      this.selectLoading = true;
      const res = await getAllUserSelect({ userName: queryString });
      let restaurants = [];
      if (res && res.flag) {
        let resData = res.resData;
        resData.map((item) => {
          item.value = item.userName;
          item.id = item.id;
        });
        restaurants = resData;
      } else {
        restaurants = [];
      }
      this.trackUserList = restaurants;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.selectLoading = false;
      }, 100 * Math.random());
    },
    handleSelectTrack(item) {
      this.formData.customer.trackUserId = item.id;
    },


    //contractFollowUpList
    async getContractFollowUpList(contractId) {
      let res = await contractFollowUpList({
        id: contractId,
      });
      this.followUpList = res.resData || [];
      console.log("this.followUpList", this.followUpList);

    },
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
    //获得关联用户ID
    getUsersList(list) {
      this.formData.contract.contractUserRelList = list;
      this.$set(this.formData.contract, "contractUserRelList", list);
      this.$nextTick(() => {
        this.$refs.form.validateField("contract.contractUserRelList");
      });
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
    cancelSourse() {
      this.dialogSourse.visible = false;
    },
    handleOpenContract(item) {
      downContractFileById({ id: item.id }).then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 1);
        }
        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
        const a = document.createElement("a"); //创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = fileName; //指定下载文件名
        document.body.appendChild(a);
        a.click(); //触发下载
        URL.revokeObjectURL(a.href); //释放URL对象
        document.body.removeChild(a);
        this.$message.success("下载成功");
      });
      // this.pdfUrl = item.fileUrl;
      // let realName = item.realName;
      // let fileName = realName;
      // const a = document.createElement("a"); //创建a标签
      // a.style.display = "none";
      // a.href = this.pdfUrl; // 指定下载链接
      // a.download = fileName; //指定下载文件名
      // document.body.appendChild(a);
      // a.click(); //触发下载
      // document.body.removeChild(a);
      // this.$message.success("下载成功");
    },
    //查询客户列表
    getCustomList() {
      customList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        let records = resData.records;
        records.map((item) => {
          item.value = item.customerName;
          item.id = item.id;
        });
        this.restaurants = records;
      });
    },
    async querySearchAsync(queryString, cb) {
      this.listQuery.params.customerName = queryString;
      const res = await customAllList({ customerName: queryString });
      let restaurants = [];
      if (res && res.flag) {
        let resData = res.resData;
        let records = resData && resData.records;
        records.map((item) => {
          item.value = `${item.customerName}(${item.type == 2 ? "供" : "客"})`;
          item.id = item.id;
        });
        restaurants = records;
      } else {
        restaurants = [];
      }
      this.restaurants = restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        let value = state.value;
        return value.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
      };
    },
    handleSelect(item) {
      this.formData.customer = {
        id: item && item.id,
        customerName: item && item.customerName,
        linkName: item && item.linkName,
        linkPhone: item && item.linkPhone,
        companyTypeId: item && item.companyTypeId,
        consumerSourceId: item && item.consumerSourceId,
        location: item && item.location && item.location.split(","),
        fullAddress: item && item.fullAddress,
        remark: item && item.remark,
        note: item && item.note,
        type: item && item.type || 1,
        trackUserId: item && item.trackUserId,
      };
    },
    initForm() {
      let formData = {
        customer: {
          customerName: "",
          linkName: "",
          linkPhone: "",
          companyTypeId: "",
          consumerSourceId: "",
          location: [],
          fullAddress: "",
          remark: "",
          note: "",
          type: 1,
          trackUserId: "",
        },
        contract: {
          contractNo: "",
          contractName: "",
          contractTypeId: "",
          cooperationAreaId: "",
          startTime: "",
          endTime: "",
          paymentStatus: "",
          contractAmount: 0.00,
          contractAttachments: [],
          restAmount: 0.00,
          signatoryType: "",
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

    initFollowForm() {
      this.followFormData = {
        content: "",
        nextFollowUpDate: "",
        followUpStatusId: "",
        followUpTypeId: "",
      };
    },
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) { },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    handleOpenFollow() {
      this.dialog.visible = true;
      this.dialog.status = "follow";
    },
    // 删除文件
    closeAndDelFile(index) {
      if (this.dialog.status == "look") {
        return;
      }
      this.formData.contract.contractAttachments.splice(index, 1);
    },
    submitUpload() {
      if (this.dialog.status == "follow") {
        this.$refs["followForm"].validate((valid) => {
          if (valid) {
            this.loading = true;
            //提交跟进内容
            let formData = cloneDeep(this.followFormData);
            formData.contractId = this.followContractId;
            contractFollowUpAddOne(formData)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  this.handleClose();
                  this.getContractFollowUpList(this.followContractId)
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
      } else {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let formData = cloneDeep(this.formData);
            let customer = formData.customer;
            let location = customer && customer.location;
            let contract = formData.contract;
            if (location) {
              if (location.indexOf(",") == -1) {
                formData.customer.location = customer.location.join(",");
              }
            }
            //合同生效时间不能晚于合同结束时间
            if (
              contract.startTime &&
              contract.endTime &&
              new Date(contract.startTime) > new Date(contract.endTime)
            ) {
              return this.$message.warning("服务生效时间不能晚于服务结束时间");
            }
            this.loading = true;

            if (this.dialog.status == "create") {
              addOne(formData)
                .then((res) => {
                  if (res && res.flag) {
                    this.$message.success("添加成功");
                    this.loading = false;
                    this.handleClose();
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
      }
      // this.$nextTick(() => {});
    },
    handleRemove() { },
    handleClose() {
      this.$refs["form"].resetFields();
      this.$refs["followForm"]?.resetFields();
      this.dialog.visible = false;
      this.userRelListError = "";
      this.$emit("queryList");
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

    .el-input-edu-100 {
      width: 780px;
    }

    .el-form-item__content .el-input-group {
      vertical-align: initial;
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
