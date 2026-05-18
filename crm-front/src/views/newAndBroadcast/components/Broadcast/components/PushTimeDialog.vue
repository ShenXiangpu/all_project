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
      <el-form-item label="推送时间段" prop="value1">
        <el-date-picker
          v-model="form.value1"
          class="el-input-edu"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :pickerOptions="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
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
import { addFanout, publishFanout } from "@/api/crm/newAndBroadcast";

export default {
  name: "PushTimeDialog",
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
      value1: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      loading: false,
      form: {
        startTime: "",
        endTime: "",
        value1: [],
      },
      rules: {
        value1: [
          { required: true, message: "请选择广播推送时间", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (value[0] < Date.now()) {
                callback(new Error("广播推送开始时间必须大于当前时间"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改广播",
        create: "推送广播",
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
            let valueTime = this.form.value1;
            let startTime = valueTime[0];
            let endTime = valueTime[1];
            let form = {
              startTime,
              endTime,
              id: this.id,
            };
            publishFanout(form)
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("推送成功");
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
