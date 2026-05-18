<template>
  <el-dialog
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    @close="alarmClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    append-to-body
    class="el-dialog-edu1"
  >
    <el-form
      ref="alarmForm"
      :model="alarmForm"
      :rules="alarmRules"
      class="el-form-edu"
    >
      <el-form-item label="回复内容" prop="commentContent">
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
      <el-button type="primary" @click="commitAlarmStrategy('alarmForm')"
        >发 布</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addComment } from "@/api/edu/reply";
export default {
  name: "ReplyDialog",
  props: {},
  components: {},
  watch: {},
  data() {
    return {
      item: {},
      courseId: "",
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "回复",
        create: "回复",
        look: "回复",
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
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openDialog() {
      let dialog = {
        status: "create",
        visible: true,
      };
      this.dialog = dialog;
      this.item = {};
    },
    alarmClose() {
      let alarmForm = {
        commentContent: "", //告警描述
      };
      this.alarmForm = alarmForm;
      this.item = {};
      this.dialog.visible = false;
    },

    commitAlarmStrategy(formName) {
      let item = this.item;
      console.log("commitAlarmStrategy", item);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let alarmForm = this.alarmForm;
          let courseId = this.courseId;

          let parentId = item && item.parentId;

          let replyCommentId = item && item.replyCommentId;
          let replyUserId = item && item.replyUserId;
          let form = {
            courseId,
            parentId,
            replyCommentId,
            replyUserId,
            ...alarmForm,
          };

          console.log("item", form);

          this.loading = true;
          addComment(form).then((res) => {
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
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu1 {
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
