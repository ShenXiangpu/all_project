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
    <el-form
      ref="form"
      :disabled="dialog.status == 'look'"
      class="el-form-edu"
      :model="form"
      :rules="rules"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="线索名称" prop="clueName">
            <el-input
              class="el-input-edu"
              placeholder="请输入线索名称"
              v-model="form.clueName"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="linkName">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系人"
              v-model="form.linkName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input
              v-if="dialog.status != 'look'"
              class="el-input-edu"
              placeholder="请输入联系电话"
              v-model="form.linkPhone"
              maxlength="20"
              show-word-limit
            ></el-input>
            <div v-else>
              <el-tooltip :content="form.linkPhone" placement="top">
                <span>{{ replacePhone }}</span>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="name">
            <el-cascader
              size="large"
              class="el-input-edu"
              :options="options"
              v-model="form.location"
              @change="handleSelectChange"
            >
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="fullAddress">
            <el-input
              class="el-input-edu"
              placeholder="请输入详细地址"
              v-model="form.fullAddress"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-Level className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-intent :form="form" className="el-input-edu" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source :form="form" className="el-input-edu" />
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <cooperation-area :form="form" className="el-input-edu" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户标签" prop="customerLabel">
            <el-input
              class="el-input-edu"
              placeholder="按空格确定"
              v-model.trim="form.customerLabel"
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
          <el-form-item label="备注" prop="remark">
            <el-input
              class="el-input-edu"
              type="textarea"
              :rows="6"
              v-model="form.remark"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="dialog.status != 'look'">
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
import { addOneClue, editOneClue } from "@/api/crm/highSeasResources";
import { pcTextArr, codeToText } from "element-china-area-data";
import CompanyType from "../../components/FormItem/CompanyType.vue";
import CustomerLevel from "../../components/FormItem/CustomerLevel.vue";
import CustomerIntent from "../../components/FormItem/CustomerIntent.vue";
import customerSource from "../../components/FormItem/CustomerSource.vue";
import CooperationArea from "../../components/FormItem/CooperationArea.vue";
import FollowUpStatus from "../../components/FormItem/FollowUpStatus.vue";
import { formatStr } from "@/utils/utils.js";
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
    CompanyType,
    CustomerIntent,
    CustomerLevel,
    customerSource,
    CooperationArea,
    FollowUpStatus,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
    replacePhone() {
      let str = this.form.linkPhone;
      // 严格匹配手机号（1开头，第二位3-9，11位）
      return formatStr(str);
    },
  },
  watch: {},
  data() {
    return {
      options: pcTextArr,
      selectedOptions: [],
      form: {
        clueName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerIntentionId: "",
        consumerLevelId: "",
        consumerSourceId: "",
        cooperationAreaId: "",
        followUpStatusId: "",
        location: [],
        fullAddress: "",
        customerLabel: "",
        remark: "",
      },
      fileInfo: {},
      rules: {
        clueName: [
          { required: true, message: "请输入线索名称", trigger: "blur" },
        ],
        linkName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        linkPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
        ],
      },

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "编辑线索",
        create: "创建线索",
        look: "查看线索",
      },

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
      const customerLabel = this.form.customerLabel;
      if (!customerLabel) {
        this.$message.error("请输入内容！");
        return;
      }
      this.tags.push(customerLabel);
      this.form.customerLabel = "";
    }, 200),
    handleCloseTag(tag) {
      if (this.dialog.status == "look") {
        return;
      }
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) {
      console.log("value", this.form.location);
    },
    handleOpen(status) {
      this.dialog.visible = true;
      this.dialog.status = status;
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = this.form;
          form.customerLabel = (this.tags && this.tags.join(",")) || "";
          form.location =
            (this.form && this.form.location && this.form.location.join(",")) ||
            "";
          this.loading = true;
          const handleResponse = (res) => {
            if (res && res.flag) {
              this.$message.success(
                this.dialog.status === "create" ? "添加成功" : "修改成功"
              );
              this.handleClose();
              this.$emit("queryList");
            }
            this.loading = false; // 在这里统一设置 loading 为 false
          };

          const handleError = () => {
            this.$message.error("操作失败，请重试！");
            this.loading = false;
          };
          if (this.dialog.status == "create") {
            addOneClue(form).then(handleResponse).catch(handleError);
          } else {
            editOneClue(form).then(handleResponse).catch(handleError);
          }
        } else {
          this.$message.error("请完善信息！");
          return;
        }
      });
    },
    handleRemove() {},
    handleClose() {
      this.$refs["form"].resetFields();
      this.tags = [];
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
</style>
