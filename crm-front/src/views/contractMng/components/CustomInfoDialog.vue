<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
    @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules"
      :disabled="dialog.status === 'look' || dialog.status === 'follow'">
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 基本信息
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户名称" prop="customerName">
            <el-input class="el-input-edu" placeholder="请输入客户名称" v-model="form.customerName" maxlength="40"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="linkName">
            <el-input class="el-input-edu" placeholder="请输入联系人" v-model="form.linkName" maxlength="10"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input class="el-input-edu" placeholder="请输入联系电话" v-model="form.linkPhone" maxlength="20"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="location">
            <el-cascader size="large" class="el-input-edu" :options="options" v-model="form.location"
              @change="handleSelectChange">
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="fullAddress">
            <el-input class="el-input-edu" placeholder="请输入详细地址" v-model="form.fullAddress" maxlength="100"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟踪人" prop="trackUserId">
            <el-select class="el-input-edu" v-model="form.trackUserId"
              placeholder="请选择跟踪人" filterable remote reserve-keywords
              :remote-method="querySearchTrackAsync" :loading="selectLoading" @focus="querySearchTrackAsync('')"
              :maxlength="40" show-word-limit>
              <el-option v-for="item in restaurants" :key="item.id" :label="item.userName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="公司介绍" prop="remark">
            <el-input class="el-input-edu" type="textarea" :rows="6" v-model="form.remark" maxlength="500"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="followForm" class="el-form-edu" :model="followFormData" :rules="followRules"
      v-if="dialog.status === 'follow'">
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 客户跟进
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
            <follow-up-status :form="followFormData" :className="'el-input-edu'" :propsName="'followUpStatusId'" />
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <follow-up-type :form="followFormData" :className="'el-input-edu'" :propsName="'followUpTypeId'" />
          </el-col>
        </el-col>

      </el-row>
    </el-form>
    <el-card>
      <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="跟进记录" name="first"></el-tab-pane>
        <el-tab-pane label="联系人" name="second"></el-tab-pane>
        <el-tab-pane label="合同" name="third"></el-tab-pane>
        <el-tab-pane label="日志" name="four"></el-tab-pane>
        <component ref="component" :clueId="clueId" :customerId="customerId" :is="componentName" />
      </el-tabs>
    </el-card>

    <span slot="footer" class="dialog-footer" v-if="dialog.status != 'look'">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" || dialog.status === 'follow' ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneDeep } from "lodash";
import debounce from "lodash/debounce";
import { addOne, editOne, addCustomerFollowUp } from "@/api/crm/customMng";
import { getAllUserSelect } from "@/api/crm/user";
import { pcTextArr, codeToText } from "element-china-area-data";
import FollowInfo from "./Follow/FollowInfo";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import ContractTable from "./customInfo/ContractTable.vue";
import CusTable from "./customInfo/CusTable.vue";
import LinkTable from "./customInfo/LinkTable.vue";
import LogInfoTable from "./customInfo/LogInfoTable.vue";
import FollowUpStatus from "@/views/clueMng/components/FormItem/FollowUpStatus.vue";
import FollowUpType from "@/views/clueMng/components/FormItem/FollowUpType.vue";

export default {
  name: "CustomInfoDialog",
  props: {},
  components: {
    CompanyType,
    CustomerSource,
    CustomerType,
    CooperationArea,
    FollowInfo,
    ContractTable,
    CusTable,
    LinkTable,
    LogInfoTable,
    FollowUpStatus,
    FollowUpType,
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
    componentName: {
      handler(val) {

        if (val === "CusTable") {
          this.$nextTick(() => {
            this.$refs.component.queryFollowUpOneClueList(this.customerId);
          });
        }
      },
    },
  },
  data() {
    return {
      options: pcTextArr,
      selectedOptions: [],
      isDestory: true,
      form: {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerSourceId: "",
        location: [],
        fullAddress: "",
        remark: "",
        trackUserId: "",
      },
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
        remark: [
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        trackUserId: [
          { required: true, message: "请输入跟踪人", trigger: "change" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "客户档案",
        create: "客户档案",
        look: "客户档案",
        follow: "客户跟进",
      },
      tags: [],
      testInput: "",
      loading: false,
      activeName: "first",
      componentName: "CusTable",
      clueId: "",
      customerId: "",


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
      restaurants: [],
      selectLoading: false,
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  mounted() {
    this.querySearchTrackAsync("")
  },
  methods: {
    async querySearchTrackAsync(queryString = "") {
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
      this.restaurants = restaurants;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
       this.selectLoading = false;
      }, 100 * Math.random());
    },

    createStateFilterTrack(queryString) {
      return (state) => {
        let value = state.value;
        return value.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
      };
    },
    handleSelectTrack(item) {
      this.form.trackUserId = item.id;
    },
    handleClick() {
      let activeName = this.activeName;
      if (activeName == "first") {
        this.componentName = "CusTable";
      } else if (activeName == "second") {
        this.componentName = "LinkTable";
      } else if (activeName == "third") {
        this.componentName = "ContractTable";
      } else if (activeName == "four") {
        this.componentName = "LogInfoTable";
      }
    },
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
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
      let form = {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerSourceId: "",
        location: [],
        fullAddress: "",
        remark: "",
        trackUserId: "",
      };
      this.form = form;
    },
    submitUpload() {
      if (this.dialog.status == "follow") {
        this.$refs["followForm"].validate((valid) => {
          if (valid) {
            this.loading = true;
            //提交跟进内容
            let formData = cloneDeep(this.followFormData);
            formData.customerId = this.customerId;
            addCustomerFollowUp(formData)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  this.handleClose();
                  this.$refs['component'].queryFollowUpOneClueList(this.customerId);
                  this.componentName = "CusTable";
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
            let form = this.form;
            if (form.location && form.location.length > 0) {
              form.location = form.location.join(",");
            }
            this.loading = true;
            const handleResponse = (res) => {
              if (res && res.flag) {
                this.$message.success("修改成功");
                this.handleClose();
                this.$emit("queryList");
              }
              this.loading = false; // 在这里统一设置 loading 为 false
            };

            const handleError = () => {
              this.$message.error("操作失败，请重试！");
              this.loading = false;
            };

            editOne(form).then(handleResponse).catch(handleError);
          } else {
            this.$message.error("请完善信息！");
            return;
          }
        });
      }
    },
    handleRemove() { },
    handleClose() {
      this.$refs["followForm"]?.resetFields();
      this.$refs["form"].resetFields();
      this.dialog.visible = false;
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

::v-deep {
  .el-tabs__item {
    // padding: 0 20px;
    font-weight: 700;
  }

  #tab-first.el-tabs__item {
    padding: 0 20px;
    // font-weight: 700;
  }

  #tab-zero.el-tabs__item {
    padding: 0 20px;
    // font-weight: 700;
  }

  .el-tabs__item.is-active {
    background: var(--color);
    color: #fff;
    padding: 0 20px;
    border-radius: 4px;
  }

  .el-tabs__active-bar {
    background: var(--color);
    color: #fff;
  }

  .el-tabs__item:hover {
    color: var(--color);
  }

  .el-tabs__item.is-active:hover {
    color: #fff;
  }

  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
}
</style>
