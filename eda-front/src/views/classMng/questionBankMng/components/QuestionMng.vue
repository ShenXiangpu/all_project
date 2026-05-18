<template>
  <div>
    <!-- 头部 -->
    <question-mng-form @onSubmit="onSubmit" @onCancel="onCancel"></question-mng-form>
    <div class="flex justify-between marginBottom20">
      <el-button type="primary" @click="goToPage('/classMng/testPaper')">创建试题</el-button>
      <el-button type="primary" class="editPrimary" icon="el-icon-download" @click="downPaper">导出试题</el-button>
    </div>
    <!-- 列表 -->
    <question-mng-list @handleSelectionChange="handleSelectionChange" @deleteQuestion="deleteQuestion"
      @editTestPaperById="editTestPaperById" @queryTestPaperById="queryTestPaperById" @searchQuery="searchQuery"
      :loading="loading" :total="total" :testPaperList="testPaperList"></question-mng-list>

    <question-mng-drawer @closeDrawer="closeDrawer" :drawer="drawer" :questionForm="questionForm"></question-mng-drawer>
  </div>
</template>

<script>
import QuestionMngDrawer from './QuestionMng-Drawer.vue';
import QuestionMngForm from './QuestionMng-Form.vue';
import QuestionMngList from './QuestionMng-List.vue';



import {
  getTestPaperList,
  getTestPaperDetailById,
  deleteOne,
  downQuestionPaper
} from '@/api/edu/question'
export default {
  components: {
    QuestionMngForm,
    QuestionMngList,
    QuestionMngDrawer
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      testPaperList: [],
      total: 0,
      loading: false,
      drawer: false,
      questionRules: {
        ofPublic: [
          { required: true, message: '请选择公开范围', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'change' }
        ],
        score: [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { type: 'number', message: '分值必须为数值', trigger: ['blur', 'change'] },
        ]
      },
      questionForm: {
        ofPublic: '',
        title: '',
        descriptions: '',
        paperItemList: []
      },

      testIds: [],
      exportLoading: false,
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    //
    handleSelectionChange(testIds) {
      this.testIds = testIds
    },

    downPaper() {
      let ids = this.testIds
      downQuestionPaper({ ids }).then(res => {
        this.exportLoading = true

        if (ids.length == 0) {
          return
        }
        let type = "application/zip;charset=utf-8"
        if (ids.length == 1) {
          type = "application/pdf;charset=utf-8"
        }

        const blob = new Blob([res.data], {
          type
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
        this.exportLoading = false
      }).finally(() => {
        this.exportLoading = false


      })
    },
    //删除试卷
    deleteQuestion(id) {
      deleteOne({ id }).then(res => {
        if (res && res.flag) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList();
        }
      })
    },
    goToPage(path) {
      this.$router.push(path)
    },

    onSubmit(form) {
      this.listQuery.params = form
      this.getList();
    },
    onCancel() {
      this.getList();
    },

    queryTestPaperById(id) {
      getTestPaperDetailById({ id }).then(res => {
        if (res && res.flag) {
          this.questionForm = res.resData
          this.drawer = true
        }
      })
    },
    closeDrawer() {
      this.drawer = false
    },
    editTestPaperById(id) {
      this.$router.push({ path: '/classMng/testPaper', query: { testId: id } })
    },




    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },

    getList() {
      this.loading = true;

      getTestPaperList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.testPaperList = resData.records;
        this.total = resData.total;
        this.loading = false;
      }).finally(res => {
        this.loading = false;
      });
    },
  }
}
</script>

<style lang="scss" scoped></style>