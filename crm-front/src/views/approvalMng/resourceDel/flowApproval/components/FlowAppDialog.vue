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
      <el-form-item label="审批意见" prop="handleOpinion">
        <el-input
          class="el-input-edu"
          type="textarea"
          :rows="6"
          v-model="form.handleOpinion"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        :type="form.handleResult == 1 ? 'primary' : 'danger'"
        @click="submitUpload"
        :loading="loading"
        >{{ form.handleResult == "1" ? "确认通过" : "确认拒绝" }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
import { approve } from "@/api/crm/approval";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";

export default {
  name: "AddDialog",
  props: {
    bigType: {
      type: String | Number,
      default: "" | 0,
    },
  },
  components: {
    CompanyType,
    CustomerSource,
    CustomerType,
    CooperationArea,
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
      form: {
        handleOpinion: "",
        handleResult: "",
        procInstId: "",
      },
      rules: {},
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "流程审批",
        create: "流程审批",
        look: "",
      },
      loading: false,
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },

    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = this.form;
          this.loading = true;
          const handleResponse = (res) => {
            if (res && res.flag) {
              this.$message.success(
                this.form.handleResult == 1 ? "审批已通过" : "审批已拒绝"
              );
              this.handleClose();
              this.$emit("handleCloseLast")
              this.$emit("queryList");
            }
            this.loading = false; // 在这里统一设置 loading 为 false
          };

          const handleError = () => {
            this.$message.error("操作失败，请重试！");
            this.loading = false;
          };

          approve(form).then(handleResponse).catch(handleError);
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
      width: 500px;
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
