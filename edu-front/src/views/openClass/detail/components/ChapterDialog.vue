<template>
  <el-dialog :title="`${textMap[dialogVisible.status]}${title}`" :visible="dialogVisible.visible" width="50%"
    @closed="reset('ruleForm')" @close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item :label="`${title}名称`" prop="sectionName">
        <el-input v-model="ruleForm.sectionName" :placeholder="`请输入${title}名称`" class="el-input-edu-task" maxlength="64"
          show-word-limit>
          <template slot="append" v-if="append">{{ append }}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="章节内容" prop="content">
        <edu-tinymce v-model="ruleForm.content" ref="edu-tinymce" class="edu-tinymce" />
      </el-form-item>

      <div class="flex justify-center  footer">
        <el-button size="small" class="marginRight20" @click="handleClose('ruleForm')"> 取消 </el-button>
        <el-button size="small" type="primary" :loading="loading" @click="submitForm('ruleForm')"> {{
          dialogVisible.status == 'create'
            ? "确定" : "修改" }} </el-button>

      </div>
    </el-form>
  </el-dialog>
</template>

<script>

import { saveChapter } from "@/api/edu/openClass";
import EduTinymce from "@/components/Edu-tinymce";
export default {
  name: '',
  components: {
    EduTinymce
  },
  props: {
    courseId: {
      default: '0' | 0,
      type: String | Number
    }
  },
  created() {

  },
  data() {
    return {
      append: "",
      loading: false,
      ruleForm: {
        sectionName: '',
        content: ''
      },
      chapterItem: {},
      trialItemId: '',
      dialogVisible: {
        visible: false,
        status: 'create'
      },
      textMap: {
        update: "修改",
        create: "添加",
      },
      title: '章节',
      rules: {
        sectionName: [
          { required: true, message: `请输入名称`, trigger: 'blur' },
        ],
      },
      fileId: ''
    }
  },
  destroyed() {

  },
  methods: {
    handleOpen() {
      this.dialogVisible.visible = true;
    },
    handleClose() {
      this.$refs['edu-tinymce'].content = ""
      this.$refs['ruleForm'].resetFields();
      this.dialogVisible.visible = false;
    },

    reset(formName) {
      this.$refs[formName].resetFields();
      this.handleClose()
    },
    submitForm(formName) {
      let content = this.$refs['edu-tinymce'].getContent()
      let status = this.dialogVisible.status
      let text = this.textMap[status]
      let title = this.title
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {}
          let sectionName = this.ruleForm.sectionName
          let courseId = this.courseId


          //修改文件
          let id = this.fileId
          // let name = sectionName + '.' + this.append
          let name = sectionName
          if (title == '文件') {
            data = {
              id,
              name,
            }
            editSectionFile(data).then(res => {
              if (res && res.flag) {
                this.$message.success(`${text}${title}成功`);
                this.handleClose();
                this.$emit('queryChapterList');
              }
            })
            return
          }

          if (title == '章节') {
            let level = 1

            data = {
              sectionName,
              courseId,
              level,
              content
            }
          } else {
            let level = 2
            let chapterItem = this.chapterItem
            let parentId = chapterItem.id
            data = {
              parentId,
              sectionName,
              courseId,
              level,
              content
            }
          }
          if (status == 'update') {
            data.id = this.chapterItem.id
            data.parentId = this.chapterItem.parentId
          }

          this.loading = true;
          saveChapter(data).then(res => {
            if (res && res.flag) {
              this.$message.success(`${text}${title}成功`);
              this.handleClose();
              this.$emit('openChapter', data.parentId)

              this.$emit('queryChapterList');
            }
          }).finally(() => {
            this.loading = false;
          })

        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  padding-right: 20px;
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }

    .el-form-item__content {
      margin-left: 100px;
    }

    .el-input-edu-task {
      width: 100%;
    }
  }

  .edu-tinymce {
    ::v-deep {

      .tox,
      .tox-tinymce {
        height: calc(100vh - 350px) !important;
        min-height: 300px !important;
        width: 100% !important;
      }
    }
  }
}
</style>
