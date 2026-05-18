<template>
  <el-dialog
    :title="`${textMap[dialogVisible.status]}${roleObj[roleType]}${title}`"
    class="el-dialog-edu"
    :close-on-click-modal="false"
    :visible="dialogVisible.visible"
    @closed="reset('ruleForm')"
    @close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="el-form-edu"
    >
      <el-form-item :label="`${title}名称`" prop="name">
        <el-input
          v-model="ruleForm.name"
          :placeholder="`请输入${title}名称`"
          class="el-input-edu"
          maxlength="64"
          show-word-limit
        >
          <template slot="append" v-if="append">{{ append }}</template>
        </el-input>
      </el-form-item>

      <el-form-item label="描述内容" prop="content">
        <edu-tinymce
          class="edu-tinymce"
          ref="edu-tinymce-operation"
          :value="ruleForm.content"
        ></edu-tinymce>
      </el-form-item>

      <div class="flex justify-center footer">
        <el-button
          size="small"
          class="marginRight20"
          @click="handleClose('ruleForm')"
        >
          取消
        </el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          {{ dialogVisible.status == "create" ? "确定" : "修改" }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
const roleObj = {
  supremeAdmin: "系统最高管理员",
  EduSchoolAdmin: "学校管理员",
  EduTeacher: "老师",
  EduStudent: "学生",
};
import EduTinymce from "@/components/Edu-tinymce";

import {
  saveOperationManual,
  listOperation,
  getDetailById,
  delById,
} from "@/api/edu/operation";
export default {
  name: "",
  components: { EduTinymce },
  props: {
    courseId: {
      default: "0" | 0,
      type: String | Number,
    },
    roleType: {
      default: "",
      type: String,
    },
  },
  created() {},
  data() {
    return {
      append: "",
      loading: false,
      ruleForm: {
        name: "",
        content: "",
      },
      chapterItem: {},
      trialItemId: "",
      dialogVisible: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改",
        create: "添加",
      },
      title: "模块",
      rules: {
        name: [{ required: true, message: `请输入名称`, trigger: "blur" }],
      },
      fileId: "",
      roleObj: roleObj,
    };
  },
  destroyed() {},
  methods: {
    clearTinymce() {
      const tinymce = this.$refs["edu-tinymce-operation"];
      if (tinymce) {
        tinymce.content = "";
      }
    },
    handleOpen() {
      this.dialogVisible.visible = true;
    },
    handleClose() {
      this.dialogVisible.visible = false;
      this.dialogVisible.status = "create";
      this.append = "";
      this.ruleForm = {
        name: "",
        content: "",
      };
    },

    addDescribe(item, isAdd) {
      this.$emit("addDescribe", item, isAdd);
    },

    reset(formName) {
      this.$refs[formName].resetFields();
      this.handleClose();
    },
    submitForm(formName) {
      let status = this.dialogVisible.status;
      let text = this.textMap[status];
      let title = this.title;
      const roleType = this.roleType;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          let name = this.ruleForm.name;
          let content = this.$refs["edu-tinymce-operation"].getContent();
          this.ruleForm.content = content;
          console.log(this.ruleForm);
          if (title == "模块") {
            let level = 1;
            data = {
              name,
              content,
              level,
              roleType,
            };
          } else {
            let chapterItem = this.chapterItem;
            let parentId = chapterItem.id;
            let level = chapterItem.level + 1; //当前的level + 1
            data = {
              parentId,
              name,
              content,
              level,
              roleType,
            };
          }
          if (status == "update") {
            data.id = this.chapterItem.id;
            data.parentId = this.chapterItem.parentId;
            data.level = this.chapterItem.level;
          }

          this.loading = true;
          saveOperationManual(data)
            .then((res) => {
              if (res && res.flag) {
                this.$message.success(`${text}${title}成功`);
                this.handleClose();
                this.$emit("openChapter", data.parentId);
                this.addDescribe(
                  {
                    name,
                    content,
                  },
                  false
                );
                this.$emit("queryChapterList");
              }
            })
            .finally(() => {
              this.loading = false;
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
.el-dialog-edu {
  ::v-deep .el-dialog {
    width: 1150px;

    // .el-dialog__headerbtn {
    //   top: 12px;
    // }
  }
}
.edu-tinymce {
  ::v-deep {
    .tox,
    .tox-tinymce {
      min-width: 200px;
      width: 956px !important;
      height: calc(100vh - 405px) !important;
    }
  }
}
.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }
    .el-input-edu {
      width: 956px !important;
    }
    .el-form-item__error {
      margin-left: 100px;
    }
  }
}
</style>
