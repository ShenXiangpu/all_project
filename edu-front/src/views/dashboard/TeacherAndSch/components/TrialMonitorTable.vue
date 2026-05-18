<template>
  <div>
    <el-table
      v-loading="loading"
      class="el-table-eda"
      :data="tableData"
      height="232px"
    >
      <el-table-column
        prop="trialName"
        align="center"
        label="实验名称"
        min-width="90"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="courseName"
        align="center"
        label="所属课程"
        min-width="90"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="itemNum"
        align="center"
        label="任务数量"
        min-width="70"
      >
      </el-table-column>
      <el-table-column
        prop="completedNum"
        align="center"
        label="完成人数"
        min-width="70"
      >
      </el-table-column>
      <el-table-column
        prop="unCompletedNum"
        align="center"
        label="待完成人数"
        min-width="80"
      >
        <template #default="scope">
          <div
            class="pointer primaryColoro fontW7 align-center"
            @click="queryUnCompletedNum(scope.row)"
          >
            {{ scope.row.unCompletedNum }}
          </div>
        </template>
      </el-table-column>
    </el-table>
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
  getIndexTrialItemList,
  getUnFinishedTrialUsers,
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
      loading: false,
      studentList: [],
    };
  },
  methods: {
    queryUnCompletedNum(row) {
      console.log(row);
      let courseId = row.courseId;
      let trialId = row.trialId;
      getUnFinishedTrialUsers({ courseId, trialId }).then((res) => {
        if (res && res.flag) {
          this.studentList = res.resData;
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
      getIndexTrialItemList(this.listQuery).then((reponse) => {
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
.pagination {
  width: 100%;
}
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
</style>
