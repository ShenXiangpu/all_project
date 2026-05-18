<template>
  <el-dialog :title="`${textMap[dialogVisible.status]}${title}`" :show-close="false" :visible="dialogVisible.visible"
    width="40%" @closed="reset('ruleForm')" @close="handleClose('ruleForm')">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item :label="`文件名称`" prop="fileName">
        <el-input v-model="ruleForm.fileName" :placeholder="`请输入${title}名称`" class="el-input-edu-task">
          <template slot="append" v-if="fileType">{{ fileType }}</template>
        </el-input>
      </el-form-item>
      <upload-file-list ref="upload-file-list" class="marginBottom20" @doUploadPre="doUploadPre" :loading="loading"
        @submitUpload="submitUpload"></upload-file-list>
      <div class="flex justify-center  footer">
        <el-button size="small" class="marginRight20" @click="handleClose('ruleForm')"> 取消 </el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')"> {{
          dialogVisible.status == 'create'
            ? "确定" : "修改" }} </el-button>

      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  saveChapter,
  uploadOneFile
} from "@/api/edu/courseRourse";
import UploadFileList from '@/views/classMng/questionBankMng/components/UploadFileList.vue'
export default {
  name: '',
  components: {
    UploadFileList
  },
  props: {
    sectionId: {
      default: '0' | 0,
      type: String | Number
    }
  },
  created() {

  },
  data() {
    return {
      loading: false,
      ruleForm: {
        fileName: '',
      },
      fileName: '',
      fileType: '',
      chapterItem: {},
      trialItemId: '',
      dialogVisible: {
        visible: false,
        status: 'create'
      },
      textMap: {
        update: "修改",
        create: "文件上传",
      },
      title: '文件',
      rules: {
        fileName: [
          { required: false, message: `请输入文件名称`, trigger: 'blur' },
          // { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  destroyed() {

  },
  methods: {
    doUploadPre(fileItem) {
      let name = fileItem.name
      let fileName = name.substring(0, name.lastIndexOf('.'))
      let fileType = name.split('.').pop()
      this.ruleForm.fileName = fileName
      this.fileType = fileType
    },
    //选取文件
    submitUpload(file) {
      console.log(file);


      if (!file) {
        this.$message.error("请选择文件")
        return
      }
      let FormDatas = new FormData();
      FormDatas.append("file", file);
      this.loading = true
      let sectionId = this.sectionId
      let fileName = this.ruleForm.fileName
      uploadOneFile({ fileName, sectionId, file: FormDatas }).then(res => {
        if (res && res.flag) {
          this.$message.success("上传成功");
          this.$refs['upload-file-list'].fileList = []
          this.loading = false
          this.ruleForm.fileName = ''
          this.fileType = ''
          this.$emit('openChapter', sectionId)//展开
          this.$emit('getFileList')
        } else {
          this.$message.error("上传失败");
        }
      }).catch(err => {
        console.log(err);
        this.loading = false
      }).finally(() => {
        this.loading = false

      })
    },
    handleOpen() {
      this.dialogVisible.visible = true;
    },
    handleClose() {
      this.dialogVisible.visible = false;
      this.$refs['ruleForm'].resetFields();
      this.fileType = ''
    },

    reset(formName) {
      this.$refs[formName].resetFields();
      this.handleClose()
    },
    submitForm(formName) {
      this.$refs[formName].resetFields();
      this.handleClose();
      this.$emit('getFileList')
    },
  }
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  ::v-deep {
    .el-form-item__label {
      width: 70px;
    }

    .el-form-item__content {
      margin-left: 80px;
    }

    .marginBottom20 {
      .el-button.el-button--primary {
        font-size: 14px !important;
        width: 100px !important;
      }

      .el-button.el-button--success {
        font-size: 14px !important;
        width: 100px !important;
      }
    }

  }


}
</style>
