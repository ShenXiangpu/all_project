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
      <el-form-item label="部门名称" prop="name">
        <el-input
          class="el-input-edu"
          placeholder="请输入部门名称"
          v-model="form.name"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
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
import { saveDept, updDept } from "@/api/crm/organization";
export default {
  name: "AddDepDialog",
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
      loading: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改部门",
        create: "添加部门",
        look: "",
      },
      form: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
      let form = {
        name: "",
      };
      this.form = form;
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("form", this.form);
          this.loading = true;
          const operationFunction =
            this.dialog.status === "create" ? saveDept : updDept;
          const successMessage =
            this.dialog.status === "create" ? "添加成功" : "修改成功";
          const errorMessage =
            this.dialog.status === "create"
              ? "添加失败，请重试"
              : "修改失败，请重试";

          // 确保 operationFunction 是一个函数
          if (typeof operationFunction !== "function") {
            console.error("Invalid operation function:", operationFunction);
            this.$message.error("操作函数无效");
            this.loading = false;
            return;
          }

          operationFunction(this.form)
            .then((response) => {
              if (response && response.flag) {
                this.$message.success(successMessage);
                this.loading = false;
                this.handleClose();
                this.$emit("queryList");
              } else {
                this.$message.error(errorMessage);
                this.loading = false;
              }
            })
            .catch((error) => {
              console.error(`Error ${this.dialog.status} post:`, error);
              this.$message.error(errorMessage);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
