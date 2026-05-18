<template>
  <div class="app-container">
    <filter-form
      ref="filterForm"
      @resetQuery="resetQuery"
      @handleQuery="handleQuery"
      @initParam="initParam"
    />
    <my-table
      :tableData="labsList"
      @queryList="queryList"
      :listQuery="listQuery"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @delete="handleDelete"
      @showApproInfo="showApproInfo"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleReport="handleReport"
      @export="exportExcel"
      @download="handleDownload"
    />
    <add-dialog ref="add-dialog" @handleClose="handleClose" />
  </div>
</template>

<script>


import { cloneDeep } from "lodash";
import FilterForm from "./components/FilterForm.vue";
import MyTable from "./components/Table.vue";
import AddDialog from "./components/AddDialog.vue";
import { del, queryCourseStudentList,exportStudentHistoryExcel, getStudentReport,downLoadReport } from '@/api/edu/analysisOfStudents'
export default {
  name: "DateOfStudents",
  components: {
    FilterForm,
    MyTable,
    AddDialog
  },
  created() {},
  mounted() {
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
    };
  },
  methods: {

    handleDownload(ids) {
      downLoadReport(ids).then((res) => {
        if (res && res.size === 0) {
            this.$message.success("当前数据为空");
            return;
          }
          const blob = new Blob([res.data], {
            type: "application/zip",
          }); // 构造一个blob对象来处理数据，并设置文件类型

          let fileName = decodeURI(res.headers["content-disposition"]);

          if (fileName) {
            fileName = fileName.split("=").pop();
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
      exportStudentHistoryExcel(ids).then((res) => {
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

    handleReport(courseId,userId) {
      const year = this.listQuery.params.year
      getStudentReport({ courseId, year,userId }).then((res) => {
        if (res && res.flag) {
          let  reportObj = res.resData
          reportObj = this.handleReportObj(reportObj)
          this.handleAdd(reportObj)
        }
      });
    },

    handleReportObj(reportObj) {
      const { userName, grade, className, academicYear,courseName } = reportObj
      const priamryTable = [
        {
          userName, grade, className, academicYear,courseName
        }
      ]
      reportObj.priamryTable = priamryTable
      return  reportObj
    },

    initParam(form){
      this.handleQuery(form)
    },
    handleAdd(reportObj) {
      const add = this.$refs["add-dialog"];
      add.dialog.visible = true;
      add.reportObj = reportObj
      add.dialog.status = "create";
    },
    /**
     * 查询审批类型的详情
     * @param ids
     * @param list
     */
    async showApproInfo(row, status) {
      const { id = 0, instType = "" } = row;
      let componentName = this.componentsMap[instType];
      this.componentName = componentName;
      const param = {
        id,
      };
      //ContractTable
      let op = componentName
        ?.substring(0, componentName?.length - 5)
        ?.toLowerCase();

      const response = await removeListById({ id }, op);
      if (response?.flag) {
        this.tableList = response?.resData || [];
      } else {
        console.error("Error fetching  remove details:", response);
      }
      const res = await getInstDetailById(param);
      if (!res?.flag) return; // 提前返回，避免嵌套

      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = true;
      approval.dialog.status = status;
      approval.needApproval = res?.resData?.needApproval;
      approval.nodeInfo = res.resData ?? {}; //空值合并运算符
    },

    async fetchRemoveDetails(id, op) {
      try {
        const response = await removeListById({ id }, op);
        console.log("Remove Details:", response);
        if (response?.flag) {
          return response?.resData || [];
        } else {
          console.error("Error fetching  remove details:", response);
        }
      } catch (error) {
        console.error("Error fetching  remove details:", error);
      }
    },
    /**
     * @param {*} isPass 打开通过或者拒绝dialog
     *
     */
    handleRejectOrPass(isPass, id) {
      const flow = this.$refs["flow-app-dialog"];
      flow.dialog.visible = true;
      flow.dialog.status = "create";
      let form = {
        handleOpinion: "",
        handleResult: isPass ? 1 : 2,
        procInstId: id,
      };
      flow.form = form;
    },
    handleCloseLast() {
      const approval = this.$refs["approval-dialog"];
      approval.dialog.visible = false;
    },

    queryDetail() {
      const approval = this.$refs["del-detail-dialog"];
      approval.dialog.visible = true;
    },
    async handleDelete(ids) {
      const res = await del(ids,'student');
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleReview(row) {},
    handleUpdate(item) {
      let handleItem = cloneDeep(item);
      let location = handleItem && handleItem.location;
      if (location && typeof location == "string") {
        handleItem.location =
          (handleItem &&
            handleItem.location &&
            handleItem.location.split(",")) ||
          [];
      }
      let form = {
        ...handleItem,
      };
      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "update";

      ip.form = form;
    },

    handleClose() {},
    openFileDialog() {
      const ip = this.$refs["add-dialog"];
      ip.handleOpen();
    },
    handleFollow() {
      const ip = this.$refs["follow-dialog"];
      console.log("follow", ip);

      ip.handleOpen();
    },
    handleCustom() {
      const custom = this.$refs["add-custom-dialog"];
      custom.handleOpen();
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
      queryCourseStudentList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData.records;
        this.total = resData.total;
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
