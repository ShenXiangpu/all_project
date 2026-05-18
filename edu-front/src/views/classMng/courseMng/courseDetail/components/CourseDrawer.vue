<template>
  <el-drawer v-el-draw="{ minWidth: 300, maxWidth: 1000 }" :visible.sync="drawer" :with-header="false"
    @closeDrawer="handleClose" :wrapper-closable="true">
    <div class="app-container">
      <div class="title">{{ title || '章节内容' }}</div>
      <edu-tinymce v-model="manualContent" :disabled="true" class="edu-tinymce" />
    </div>

  </el-drawer>
</template>

<script>
import { exportStudentExcel } from '@/api/edu/courseRourse'
import EduTinymce from "@/components/Edu-tinymce"
export default {
  name: 'CourseDrawer',
  components: {
    EduTinymce
  },
  props: {
    complete: {
      default: () => [],
      type: Array
    },
    inComplete: {
      default: () => [],
      type: Array
    },

  },
  created() {

  },
  data() {
    return {
      index: 1,
      drawer: false,
      tableData: [],
      multipleSelection: [],
      title: '',
      //章节id
      chapterId: '',
      isSection: '',
      downLoading: false,
      manualContent: ''
    }
  },
  methods: {
    downloadStu() {
      let chapterId = this.chapterId;
      let isSection = this.isSection;
      let isCompleted = this.index == 1 ? 1 : 0;
      let data = {
        id: chapterId,
        isSection,
        isCompleted
      }
      this.downLoading = true;
      exportStudentExcel(data).then(res => {
        console.log(res);
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8"
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 8);
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
        this.downLoading = false

      }).finally(() => {
        this.downLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    check(index) {
      this.index = index;
      this.multipleSelection = []
      if (index == 1) {
        this.tableData = this.complete
      } else {
        this.tableData = this.inComplete
      }
      this.drawer = true;
    },
    handleOpen() {
      this.drawer = true;
    },
    handleClose() {
      this.index = 1;
      this.drawer = false;
      this.tableData = [],
      this.title = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
}

.title {
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  color: #333;
  background-color: #f5f5f5;
}

.title-container {
  height: 40px;
  line-height: 40px;
  color: #fff;
  padding: 0 20px;
  font-weight: 700;
  border-radius: 8px 8px 0 0;
  width: 100%;
}

.tab-container {

  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 10px;

  .left {
    width: 50%;
    height: 100%;
    background-color: #10abb9;
    float: left;
    color: #fff;
  }

  .right {
    width: 50%;
    height: 100%;
    background-color: #10abb9;
    float: right;
    color: #fff;
  }

  .noCheck {
    background-color: #fff;
    color: #333;
    border: 1px solid #bbb;
  }

}

.footer-container {
  padding-top: 20px;
  height: 50px;

}

.edu-tinymce {
  ::v-deep {

    .tox,
    .tox-tinymce {
      width: 100% !important;
      height: calc(100vh - 100px) !important;
    }
  }
}
</style>
