<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="题库列表" name="first">
        <question-bank
          ref="questionBank"
          @updateQuestionBank="updateQuestionBank"
          :directionList="directionList"
          @handleAdd="handleAddQuestionBank"
        ></question-bank>
        <question-dialog
          :ruleForm="ruleForm"
          :status="status"
          @submitQuestion="submitQuestion"
          :directionList="directionList"
          @handleClose="handleQuesTionClose"
          :dialogVisible="dialogQuestionVisible"
        ></question-dialog>
      </el-tab-pane>
      <el-tab-pane label="试题管理" name="second">
        <question-mng></question-mng>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import QuestionBank from "./components/QuestionBank.vue";
import QuestionDialog from "./components/QuestionDialog.vue";
import QuestionMng from "./components/QuestionMng.vue";
import {
  getTeachDirectionList,
  addOrUpdataQuestionBank,
  getQuBankList,
} from "@/api/edu/question";
export default {
  components: { QuestionBank, QuestionDialog, QuestionMng },
  name: "QuestionBankMng",
  data() {
    return {
      activeName: "first",
      dialogQuestionVisible: false,
      directionList: [],
      status: "create",
      ruleForm: {
        name: "",
        directionId: "",
        isPublic: 1,
      },
      from: "",
    };
  },
  mounted() {
    let from = this.$route.query.from;
    if (from == "dashboard") {
      this.activeName = "second";
      console.log("dashboard");
    }
    this.queryTeachDirectionList();
  },
  created() {},
  methods: {
    updateQuestionBank(item) {
      const { name, directionId, isPublic, id } = item;
      let ruleForm = {
        id,
        name,
        directionId: Number(directionId),
        isPublic,
      };
      this.ruleForm = ruleForm;
      this.status = "update";
      this.dialogQuestionVisible = true;
    },
    //添加题库
    submitQuestion(obj) {
      let status = this.status;
      let message = {
        create: "添加",
        update: "修改",
      };
      let successAndfail = {
        false: "失败",
        true: "成功",
      };
      if (status == "create") {
        let objs = {
          name: obj.name,
          directionId: obj.directionId,
          isPublic: obj.isPublic,
        };
        addOrUpdataQuestionBank(objs).then((res) => {
          if (res && res.resData) {
            this.$message({
              type: "success",
              message: `${message[status]}${successAndfail[res.resData]}!`,
            });
            this.dialogQuestionVisible = false;
            this.$refs.questionBank.handleQueryList();
          } else {
            this.$message({
              type: "error",
              message: res.errMessage,
            });
          }
        });
      } else if (status == "update") {
        let id = this.ruleForm.id;
        let objs = {
          id: id,
          name: obj.name,
          directionId: obj.directionId,
          isPublic: obj.isPublic,
        };
        addOrUpdataQuestionBank(objs).then((res) => {
          if (res && res.resData) {
            this.$message({
              type: "success",
              message: `${message[status]}${successAndfail[res.resData]}!`,
            });
            this.dialogQuestionVisible = false;
            this.$refs.questionBank.handleQueryList();
          } else {
            this.$message({
              type: "error",
              message: res.errMessage,
            });
          }
        });
      }
    },
    //教学方向列表
    queryTeachDirectionList() {
      getTeachDirectionList().then((res) => {
        let resData = res && res.resData;
        this.directionList = resData;
      });
    },
    handleAddQuestionBank() {
      this.ruleForm = {
        name: "",
        directionId: "",
        isPublic: 1,
      };
      this.status = "create";
      this.dialogQuestionVisible = true;
    },
    handleQuesTionClose(close) {
      this.dialogQuestionVisible = close;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped></style>
