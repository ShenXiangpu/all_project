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
      <el-form-item label="规则名称" prop="ruleName">
        <el-input
          class="el-input-edu"
          placeholder="请输入规则名称"
          v-model="form.ruleName"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="规则1" prop="unFollowDay">
        <el-input
          type="number"
          :min="1"
          class="el-input-edu-1"
          v-model="form.unFollowDay"
        ></el-input>
        天内无实际跟进，进行回收
      </el-form-item>
      <el-form-item label="规则2" prop="unConversionDay">
        跟进
        <el-input
          class="el-input-edu-2"
          v-model="form.unConversionDay"
          type="number"
          :min="1"
        ></el-input>
        天内无转化，进行回收
      </el-form-item>
      <el-form-item label="规则状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="tips">
        注意：规则1与规则2为“或”的关系，即满足其中之一即可生效
      </div>
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
import { oneClueRule } from "@/api/crm/myClues";
export default {
  name: "AddDialog",
  props: {},
  components: {},
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
        ruleName: "",
        unFollowDay: "",
        unConversionDay: "",
        status: 2,
      },
      rules: {
        ruleName: [
          { required: true, message: "请输入规则名称", trigger: "blur" },

          {
            whitespace: true,
            message: "规则名称不能仅为空格",
            trigger: "blur",
          },
        ],
        unFollowDay: [
          { required: true, message: "请填写天数", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入大于0的自然数（如：1、23）",
            trigger: "blur",
          },
        ],
        unConversionDay: [
          { required: true, message: "请填写天数", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入大于0的自然数（如：1、23）",
            trigger: "blur",
          },
        ],
        status: [
          { required: true, message: "请选择规则状态", trigger: "blur" },
        ],
      },

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改规则",
        create: "创建规则",
        look: "查看规则",
      },
      loading: false,
    };
  },
  methods: {
    handleSelectChange(value) {},
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
            oneClueRule(form, "add").then(handleResponse).catch(handleError);
          } else {
            oneClueRule(form, "edit").then(handleResponse).catch(handleError);
          }
        } else {
          this.$message.error("请完善信息！");
          return;
        }
      });
    },
    handleRemove() {},
    handleClose() {
      let form = {
        ruleName: "",
        unFollowDay: "",
        unConversionDay: "",
        status: 2,
      };
      this.form = form;
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
      width: 600px;
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
      width: 400px;
      &-1 {
        width: 100px;
      }
      &-2 {
        width: 100px;
      }
    }
    .el-form-item__error {
      margin-left: 120px;
    }
    .tips {
      margin-left: 70px;
      padding-bottom: 20px;
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
