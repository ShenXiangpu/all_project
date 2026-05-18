<template>
  <div class="app-container">
    <filter-form ref="filterForm" @resetQuery="resetQuery" @handleQuery="handleQuery" @initParam="initParam" />
    <my-table :tableData="labsList" @queryList="queryList" :listQuery="listQuery" @searchQuery="searchQuery"
      :loading="loading" :total="total" @handleAdd="handleAdd" @delete="handleDelete" @handleReport="handleReport"
      @export="exportExcel" @download="handleDownload" />
    <add-dialog ref="add-dialog" @handleClose="handleClose" />
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import { del, queryStudentList, getTeacherReport, downLoadReport, exportTeacherHistoryExcel } from '@/api/edu/analysisOfStudents'
export default {
  name: "CustomerInfo",
  components: {
    FilterForm,
    MyTable,
    AddDialog,
  },
  created() { },
  mounted() {
    // this.getList();
  },

  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: {},
      },
      labsList: [],
      total: 0,
      loading: false,
      tableList: [],
      reportObj: {}
    };
  },
  methods: {

    handleDownload(ids) {
      downLoadReport(ids, 'teacher').then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/zip",
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.split("=").pop().replace(/\+/g, '');;
        }
        console.log("fileName", fileName);
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
        this.downLoading = false;
      })
        .finally(() => {
          this.downLoading = false;
        });
    },

    async exportExcel(ids) {
      exportTeacherHistoryExcel(ids).then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
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
        this.downLoading = false;
      })
        .finally(() => {
          this.downLoading = false;
        });
    },
    handleReport(courseId) {
      const year = this.listQuery.params.year
      getTeacherReport({ courseId, year }).then((res) => {
        if (res && res.flag) {
          let reportObj = res.resData
          reportObj = this.handleReportObj(reportObj)
          this.handleAdd(reportObj)
        }
      });
    },
    handleReportObj(reportObj) {
      const { userName, grade, courseName, academicYear, stuNum } = reportObj
      const priamryTable = [
        {
          userName, grade, courseName, academicYear, stuNum
        }
      ]
      reportObj.priamryTable = priamryTable


      return reportObj
    },
    initParam(form) {
      this.handleQuery(form)
    },
    handleAdd(reportObj) {
      const add = this.$refs["add-dialog"];
      add.dialog.visible = true;
      add.reportObj = reportObj
      add.dialog.status = "create";
    },

    async handleDelete(ids) {
      const courseIds = ids
      const res = await del(courseIds);
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },


    handleClose() {
      this.$refs["add-dialog"].handleClose();
    },

    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
    },

    getList() {
      this.loading = true;
      queryStudentList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData.list;
        this.total = resData.total;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleQuery(form) {
      this.listQuery.params = form;
      this.getList();
    },
    resetQuery(form) {
      this.getList();
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
