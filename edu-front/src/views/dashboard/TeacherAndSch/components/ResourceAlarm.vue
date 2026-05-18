<template>
  <el-table class="el-table-eda" :data="alarmHistoryList" height="208px">
    <el-table-column prop="vmId" align="center" label="虚拟机" min-width="60" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="courseName" align="center" label="所属课程" min-width="100" show-overflow-tooltip
      v-if="userRolesNames === '学校管理员'">
    </el-table-column>
    <el-table-column prop="schoolName" align="center" label="所属高校" min-width="100" show-overflow-tooltip v-else>
    </el-table-column>
    <el-table-column prop="recordTime" align="center" label="告警时间" min-width="100" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="level" align="center" label="状态" min-width="70" show-overflow-tooltip>
      <template #default="scope">
        <div class="primaryColoro" v-if="scope.row.level == 'Warning'">Warning</div>
        <div class="primaryColorr" v-if="scope.row.level == 'Critical'">Critical</div>
      </template>
    </el-table-column>
    <el-table-column prop="eventMessage" align="center" label="告警原因" min-width="80" show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>

<script>
import { queryAlarmEvent } from "@/api/edu/alarm";
import { mapGetters } from "vuex"
export default {
  name: "ResourceAlarm",
  props: {
    tableData: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  components: {},
  created() {
    this.getList();
  },
  data() {
    return {
      alarmHistoryList: [],
      listQuery: {
        page: 1,
        limit: 5,
        params: {
          courseId: "",
          isCanceled: "",
          keyWord: "",
          type: "",
        },
      },
      total: 0,
      courseList: [],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      queryAlarmEvent(this.listQuery)
        .then((reponse) => {
          let resData = reponse.resData;
          this.alarmHistoryList = resData && resData.result;
          this.total = resData.total;
          this.loading = false;
        })
        .finally(() => {
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
</style>
