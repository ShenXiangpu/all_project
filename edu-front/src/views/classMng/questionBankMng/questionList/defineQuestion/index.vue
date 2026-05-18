<template>
  <div class="app-container">
    <div>
      <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单个添加" name="first">
          <div class="padding20">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

              <el-form-item label="题库" prop="bank" class="el-form-item-edu">
                <el-select class="el-input-edu" v-model="ruleForm.bank" placeholder="请选择题库">
                  <!-- <el-option label="" value="">全部</el-option> -->
                  <el-option v-for="item in questionBankList" :key="item.id" :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="题型" prop="type" class="el-form-item-edu">
                <el-button v-for="item in questionTypeList" :key="item.id" size="mini" @click="addQuestion(item.id)">{{
                  item.name }}</el-button>
              </el-form-item>
            </el-form>
            <el-card class="el-card-question">
              <template #header>
                添加说明
              </template>
              <div>
                <p>1.先选题库在选题目类型</p>
                <p>2.没有题库时，需要先 <span class="primaryColor pointer" @click="handleAddQuestionBank">创建题库</span></p>
              </div>
            </el-card>
            <question-dialog :directionList="directionList" @handleClose="handleQuesTionClose"
              :dialogVisible="dialogQuestionVisible" @submitQuestion="submitQuestion"></question-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="批量添加" name="second">
          <div class="padding20">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="下载导入模板">
                <el-dropdown class="marginRight20" @command="handleCommand">
                  <el-button size="" type="primary">下载基础题模板 <i class="el-icon-caret-bottom"></i></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">单选题模板</el-dropdown-item>
                    <el-dropdown-item command="2">多选题模板</el-dropdown-item>
                    <el-dropdown-item command="3">判断题模板</el-dropdown-item>
                    <el-dropdown-item command="4">简答题模板</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button size="" type="primary" @click="handleCommand('5')">下载实操模板</el-button>
              </el-form-item>
              <el-form-item label="导入题库" prop="quBankId"
                :rules="[{ required: true, message: '请选择题库', trigger: 'blur', },]">
                <el-select v-model="form.quBankId" class="el-input-edu-400" placeholder="请选择">
                  <el-option label="" value="">全部</el-option>
                  <el-option v-for="item in questionBankList" :key="item.id" :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <el-card class="el-card-question marginBottom20">
              <template #header>
                添加说明
              </template>
              <p>1. 根据模板格式选择文件上传，只能上传一个文件</p>
              <p>2. 导入文件内容需与模板一致</p>
            </el-card>
            <div>
              <upload-file-list ref="upload-file-list" :loading="loading" @submitUpload="submitUpload"></upload-file-list>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Select } from 'element-ui';
import QuestionDialog from '../../components/QuestionDialog.vue';
import UploadFileList from '../../components/UploadFileList.vue';
//apijs
import {
  getList4SelectBox,
  getQuestionTypeList,
  getTeachDirectionList,
  addOrUpdataQuestionBank,
  downImportTemplate,
  importItems
} from '@/api/edu/question'


export default {

  components: { QuestionDialog, UploadFileList },
  data() {
    return {
      //添加题库dialog
      dialogQuestionVisible: false,
      activeName: 'first',
      ruleForm: {
        bank: '',
        type: '',
      },
      rules: {
        bank: [
          { required: true, message: '请选择题库', },
        ],
        type: [
          { required: true, message: '请选择题型' }
        ],
      },
      form: {
        quBankId: ''
      },
      questionTypeList: [],//题型
      questionBankList: [],//题库
      directionList: [],
      loading: false,//控制文件上传组件的loading
      isCanAdd: false
    }
  },
  created() {
    this.ruleForm.bank = Number(this.$route.query.quId)
    this.queryQuestionTypeList()
    this.queryList4SelectBox()
  },
  methods: {
    //选取文件
    submitUpload(file) {
      console.log(file);
      let quBankId = this.form.quBankId
      let questionBankList = this.questionBankList
      let isCanAdd = true
      questionBankList.map(item => {
        if (quBankId == item.id) {
          let userId = this.$store.state.user.userInfo.id
          if (userId != item.createBy) {
            isCanAdd = false
            return
          }
        }
      })
      this.isCanAdd = isCanAdd
      if (!isCanAdd) {
        this.$message.warning("无权修改非本人创建的题库")
        return
      }
      this.$refs["form"].validate((valid) => {
        if (!quBankId) {
          return
        }
      })
      if (!file) {
        this.$message.error("请选择文件")
        return
      }
      let FormDatas = new FormData();
      FormDatas.append("file", file);
      this.loading = true
      importItems({ quBankId, file: FormDatas }).then(res => {
        if (res && res.flag) {
          this.$message.success("导入成功");
          this.$refs['upload-file-list'].fileList = []
          this.loading = false
        } else {
          this.$message.error("导入失败");
        }
      }).catch(err => {
        console.log(err);
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    //下载模板
    handleCommand(command) {
      downImportTemplate({ quTypeId: command }).then(res => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8"
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 1);
        }
        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
        const a = document.createElement("a"); //创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = fileName; //指定下载文件名
        document.body.appendChild(a);
        a.click(); //触发下载
        URL.revokeObjectURL(a.href); //释放URL对象
        document.body.removeChild(a);
        this.$message.success("下载成功");
      })
    },
    submitQuestion(formName) {
      let objs = {
        name: formName.name,
        directionId: formName.directionId,
        isPublic: formName.isPublic,
      }
      addOrUpdataQuestionBank(objs).then(res => {
        if (res && res.resData) {
          this.$message({
            type: 'success',
            message: `添加成功!`
          });
          this.dialogQuestionVisible = false;
          this.queryList4SelectBox()
        } else {
          this.$message({
            type: 'error',
            message: res.errMessage
          });
        }
      })
    },
    //教学方向列表
    queryTeachDirectionList() {
      getTeachDirectionList().then(res => {
        let resData = res && res.resData
        this.directionList = resData
      })
    },
    //题型列表
    queryQuestionTypeList() {
      getQuestionTypeList().then(res => {
        let resData = res.resData;
        this.questionTypeList = resData
      })
    },
    //题库列表
    queryList4SelectBox() {
      getList4SelectBox().then(res => {
        let resData = res.resData;
        this.questionBankList = resData
      })
    },
    //新增题库
    addQuestion(type) {
      this.ruleForm.type = type
      let questionBankList = this.questionBankList
      let isCanAdd = true
      questionBankList.map(item => {
        if (this.ruleForm.bank == item.id) {
          let userId = this.$store.state.user.userInfo.id
          if (userId != item.createBy) {
            isCanAdd = false
            return
          }
        }
      })
      this.isCanAdd = isCanAdd
      if (!isCanAdd) {
        this.$message.warning("无权修改非本人创建的题库")
        return
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$router.push({ path: '/classMng/defineQuestion/addQuestion', query: { bank: this.ruleForm.bank, type: type } })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    //打开题库dialog
    handleAddQuestionBank() {
      this.queryTeachDirectionList()
      this.dialogQuestionVisible = true
    },
    //关闭题库dialog
    handleQuesTionClose() {
      this.dialogQuestionVisible = false
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-tabs-edu.el-tabs {
    // border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: calc(100vh - 80px);

    .padding20 {
      padding: 20px;
    }

    .el-form-item-edu {
      width: 500px;

      .el-input-edu {
        width: 400px;
      }

      .el-form-item__content {
        max-width: 900px;
      }
    }

    .el-tabs__item {
      // height: 50px;
      // line-height: 50px;
      font-size: 16px;
      // font-weight: 600;
    }

    #tab-first {
      padding: 0px 20px 0px 20px;
    }
  }
}
</style>
