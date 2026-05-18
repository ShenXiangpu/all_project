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
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input
              class="el-input-edu"
              placeholder="请输入联系电话"
              v-model="form.linkPhone"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="微信号" prop="wechat">
            <el-input
              class="el-input-edu"
              placeholder="请输入微信号"
              v-model="form.wechat"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="邮箱" prop="email">
            <el-input
              class="el-input-edu"
              placeholder="请输入邮箱"
              v-model="form.email"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="职务" prop="post">
            <el-input
              class="el-input-edu"
              placeholder="请输入职务"
              v-model="form.post"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="性别" prop="gender">
            <el-select
              class="el-input-edu"
              v-model="form.gender"
              placeholder="请选择性别"
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="关键决策人" prop="ofRuler">
            <el-select
              class="el-input-edu"
              v-model="form.ofRuler"
              placeholder="请选择关键决策人"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
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
import { addOne, editOne, deleteOne } from "@/api/crm/contract";
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
        linkName: "",
        linkPhone: "",
        gender: "",
        ofRuler: "",
        post: "",
        wechat: "",
        email: "",
        customerId: "",
      },
      loading: false,
      rules: {
        linkName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        linkPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        ofRuler: [
          { required: true, message: "请选择决策状态", trigger: "blur" },
        ],
        post: [{ required: true, message: "请输入职务", trigger: "blur" }],
        wechat: [{ required: false, message: "请输入微信号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },

      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改联系人",
        create: "添加联系人",
        look: "",
      },
    };
  },
  methods: {
    init() {
      this.form = {
        linkName: "",
        linkPhone: "",
        gender: "",
        ofRuler: "",
        post: "",
        wechat: "",
        email: "",
        customerId: "",
      };
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.dialog.status == "create") {
            addOne(this.form)
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
            editOne(this.form)
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
      // this.$refs["form"].resetFields();
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
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 150px;
    }
    .el-input-edu {
      width: 300px;
    }
    .el-form-item__error {
      margin-left: 150px;
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }
  .el-tag-edu {
    margin-left: 150px;
  }
}
</style>
