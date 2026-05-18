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
      class="el-form-edu"
      :model="form"
      :rules="rules"
      onsubmit="return false;"

    >
      <el-form-item label="广播标题" prop="title">
        <el-input
          class="el-input-edu"
          placeholder="请输入广播标题"
          v-model="form.title"
          maxlength="50"
          show-word-limit
           @keydown.enter.native="submitUpload('form')"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="推送时间段" prop="supplier">
        <el-date-picker
          v-model="value1"
          class="el-input-edu"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="广播内容" prop="content">
        <el-input
          type="textarea"
          class="el-input-edu"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入广播内容"
          v-model="form.content"
          @keydown.enter.native="submitUpload('form')"
        >
        </el-input>
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
import { addFanout, editFanout } from "@/api/crm/newAndBroadcast";

export default {
  name: "AddDialog",
  props: {},
  components: {},
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
  },
  watch: {},
  data() {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      loading: false,
      form: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入广播标题", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入广播内容", trigger: "blur" },
        ],
      },

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改广播",
        create: "创建广播",
        look: "",
      },
    };
  },
  methods: {
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.dialog.status == "create") {
            addFanout(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("添加成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("getList");
                } else {
                  this.loading = false;
                }
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            editFanout(this.form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("修改成功");
                  this.loading = false;
                  this.dialog.visible = false;
                  this.$refs["form"].resetFields();
                  this.$emit("getList");
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

    handleClose() {
      this.fileList = [];
      this.form.displayName = "";
      this.dialog.visible = false;
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 700px;
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
      width: 500px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }
  }
  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
