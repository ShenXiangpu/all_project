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
    <el-row :gutter="10">
      <el-col :span="12" class="el-card-height">
        <el-card>
          <template #header>
            <span class="title font18">线索信息</span>
          </template>
          <el-form
            :disabled="true"
            ref="form"
            class="el-form-edu"
            :model="form"
          >
            <el-form-item label="线索名称" prop="clueName">
              <el-input
                class="el-input-edu"
                placeholder="请输入线索名称"
                v-model="form.clueName"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>

            <el-form-item label="联系人" prop="linkName">
              <el-input
                class="el-input-edu"
                placeholder="请输入联系人"
                v-model="form.linkName"
                maxlength="10"
                show-word-limit
              ></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="linkPhone">
              <el-input
                class="el-input-edu"
                placeholder="请输入联系电话"
                v-model="form.linkPhone"
                maxlength="20"
                show-word-limit
                v-if="dialog.status !== 'create'"
              ></el-input>
              <div v-else>
                <el-tooltip :content="form.linkPhone" placement="top">
                  <span>{{ replacePhone }}</span>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item label="所属地区" prop="location">
              <el-cascader
                size="large"
                class="el-input-edu"
                :options="options"
                v-model="form.location"
                @change="handleSelectChange"
              >
              </el-cascader>
            </el-form-item>

            <customer-Level className="el-input-edu" :form="form" />

            <customer-source :form="form" className="el-input-edu" />
            <customer-intent :form="form" className="el-input-edu" />
            <cooperation-area :form="form" className="el-input-edu" />
            <follow-up-status :form="form" className="el-input-edu" />
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12" class="el-card-height">
        <el-card>
          <template #header>
            <span class="title font18">线索跟进</span>
          </template>
          <el-form
            ref="clueform"
            class="el-form-edu"
            :model="clueForm"
            :rules="rules"
          >
            <el-form-item label="跟进内容" prop="content">
              <el-input
                class="el-input-edu"
                type="textarea"
                :rows="6"
                v-model="clueForm.content"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
            <customer-intent :form="clueForm" className="el-input-edu" />

            <el-form-item label="下次跟进时间" prop="nextFollowUpDate">
              <el-date-picker
                v-model="clueForm.nextFollowUpDate"
                class="el-input-edu"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>

            <follow-up-status :form="clueForm" className="el-input-edu" />
            <follow-up-type :form="clueForm" className="el-input-edu" />
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="24" class="marginTop10">
        <el-table
          border
          :data="followList"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="userName"
            label="跟进人"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="跟进内容"
            min-width="100"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="followUpTypeName"
            label="跟进方式"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="nextFollowUpDate"
            label="下次跟进时间"
            align="center"
            min-width="100"
          >
          </el-table-column>

          <el-table-column
            prop="createAt"
            label="创建时间"
            align="center"
            min-width="80"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CompanyType from "../../components/FormItem/CompanyType.vue";
import CustomerLevel from "../../components/FormItem/CustomerLevel.vue";
import CustomerIntent from "../../components/FormItem/CustomerIntent.vue";
import customerSource from "../../components/FormItem/CustomerSource.vue";
import CooperationArea from "../../components/FormItem/CooperationArea.vue";
import FollowUpStatus from "../../components/FormItem/FollowUpStatus.vue";
import FollowUpType from "../../components/FormItem/FollowUpType.vue";
import BigFileUploadDialog from "@/components/BigFileUploadDialog/index.vue";
import { followUpOneClue, followUpOneClueList } from "@/api/crm/myClues";
import { pcTextArr } from "element-china-area-data";
import { formatStr } from "@/utils/utils";
export default {
  name: "FollowDialog",
  props: {},
  components: {
    CompanyType,
    CustomerLevel,
    CustomerIntent,
    customerSource,
    CooperationArea,
    FollowUpStatus,
    FollowUpType,
    BigFileUploadDialog,
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
      isDestory: true,
      form: {
        clueName: "",
        linkName: "",
        linkPhone: "",
        consumerIntentionId: "",
        consumerLevelId: "",
        consumerSourceId: "",
        cooperationAreaId: "",
        followUpStatusId: "",
        location: [],
      },
      clueForm: {
        clueId: "",
        content: "",
        consumerIntentionId: "",
        nextFollowUpDate: "",
        followUpStatusId: "",
        followUpTypeId: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入跟进内容", trigger: "blur" },
        ],
        followUpTypeId: [
          { required: true, message: "请输入跟进方式", trigger: "blur" },
        ],
      },

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "线索跟进",
        create: "线索跟进",
        look: "",
      },

      loading: false,

      tags: [],
      followList: [],
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    //查询线索跟进记录
    queryFollowUpOneClueList(clueId) {
      followUpOneClueList({
        clueId,
      }).then((res) => {
        this.followList = res.resData;
      });
    },
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) {},

    handleOpen(status) {
      this.dialog.visible = true;
      this.dialog.status = status;
    },
    submitUpload() {
      this.$refs["clueform"].validate((valid) => {
        if (valid) {
          let clueForm = this.clueForm;
          this.loading = true;
          const handleResponse = (res) => {
            if (res && res.flag) {
              this.$message.success(
                this.dialog.status === "create"
                  ? "添加跟进记录成功"
                  : "添加跟进记录成功"
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
            followUpOneClue(clueForm).then(handleResponse).catch(handleError);
          } else {
            // editOneClue(clueForm).then(handleResponse).catch(handleError);
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
      width: 100px;
    }
    .el-input-edu {
      width: 300px;
    }
    .el-form-item__error {
      margin-left: 100px;
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

.el-card-height {
  ::v-deep {
    .el-card__header {
      padding: 10px;
    }
    .el-card__body {
      height: 600px;
    }
  }
}
</style>
