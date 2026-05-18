<template>
  <el-dialog
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    @close="alarmClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    class="el-dialog-edu"
  >
    <el-form
      ref="alarmForm"
      :model="alarmForm"
      :rules="alarmRules"
      class="el-form-edu"
    >
      <el-form-item label="问题描述" prop="commentContent">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4 }"
          class="el-input-edu"
          v-model="alarmForm.commentContent"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="alarmClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="commitAlarmStrategy('alarmForm')"
        >发 布</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addComment } from "@/api/edu/reply";
export default {
  name: "QuestionDialog",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      courseId: "",
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "发表问题",
        create: "发表问题",
        look: "发表问题",
      },
      /**
       * 告警策略
       */
      alarmForm: {
        commentContent: "", //告警描述
      },
      alarmRules: {
        commentContent: [
          {
            required: true,
            message: "请输入策略名称",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    openDialog() {
      let dialog = {
        status: "create",
        visible: true,
      };
      this.dialog = dialog;
    },
    alarmClose() {
      let alarmForm = {
        commentContent: "", //告警描述
      };
      this.alarmForm = alarmForm;
      this.dialog.visible = false;
    },

    commitAlarmStrategy(formName) {
      this.$refs[formName].validate((valid) => {
        let alarmForm = this.alarmForm;
        let courseId = this.courseId;
        this.loading = true;
        addComment({ courseId, ...alarmForm }).then((res) => {
          if (res && res.flag) {
            this.$message({
              type: "success",
              message: "发布成功",
            });
            this.dialog.visible = false;
            this.loading = false;
            this.$emit("searchQuery");
          } else {
            this.$message({
              type: "error",
              message: "发布失败",
            });
            this.loading = false;
          }
        });
      });
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
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }
    .el-input-edu {
      width: 300px !important;
    }
    .el-form-item__error {
      margin-left: 100px;
    }
  }
}
</style>
