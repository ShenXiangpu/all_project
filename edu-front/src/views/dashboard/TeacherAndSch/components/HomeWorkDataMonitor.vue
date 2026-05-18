<template>
  <div>
    <el-table class="el-table-eda" :data="tableData" height="334px">
      <el-table-column
        align="center"
        prop="homeworkName"
        label="作业名称"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="courseName"
        align="center"
        label="所属课程"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="submitTime"
        align="center"
        label="截止日期"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="userNum"
        align="center"
        label="参课人数"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="finishedHomeworkNum"
        align="center"
        label="提交人数"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="unFinishedHomeworkNum"
        align="center"
        label="待提交人数"
        min-width="120"
      >
        <template #default="scope">
          <div
            class="pointer primaryColoro fontW7"
            @click="queryUnFinishedHomeworkNum(scope.row)"
          >
            {{ scope.row.unFinishedHomeworkNum }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-if="total > 0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="searchQuery"
    />
    <div v-else class="pagination"></div> -->


    <div v-if="total > 0" style="height: 37px;">
      <pagination

      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="searchQuery"
    />
    </div>

    <div v-else style="margin-top:62px ;"></div>
    <student-list-dialog :tableData="studentList" ref="studentListDialog" />
  </div>
</template>

<script>
import StudentListDialog from "./StudentListDialog.vue";
import Pagination from "@/components/Pagination";
import {
  getIndexHomeworkList,
  getUnSubmitHomeworkUsers,
} from "@/api/dashboard";
export default {
  name: "",
  props: {
    // tableData: {
    //   default: () => [],
    //   type: Array,
    // },
  },
  components: { Pagination, StudentListDialog },
  created() {
    this.handleQuery();
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        courseId: "",
      },
      tableData: [],
      studentList: [],
    };
  },
  methods: {
    queryUnFinishedHomeworkNum(row) {
      let homeworkId = row.homeworkId;
      getUnSubmitHomeworkUsers({ homeworkId }).then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          resData &&
            resData.length > 0 &&
            resData.map((item) => {
              item.studentNum = item.userAccount;
            });
          this.studentList = resData;
          this.$refs.studentListDialog.handleOpen();
        }
      });
    },
    handleQuery() {
      this.listQuery.params = this.queryParams;
      this.getList();
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    getList() {
      this.loading = true;
      getIndexHomeworkList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.tableData = resData.records;
        this.total = resData.total;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table-eda {
  ::v-deep {
    .el-table__row td {
      padding: 8px 0;
    }
    .has-gutter {
      color: #000;
      font-size: 15px;

      .cell {
        // font-weight: 700;
      }
    }
  }
}

.pagination {
  margin-top: 30px;
  height: 32px;
  width: 100%;
}
</style>
