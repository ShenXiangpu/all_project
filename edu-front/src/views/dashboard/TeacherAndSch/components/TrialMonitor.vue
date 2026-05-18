<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ title }}数据监控</span>
      <div style="float: right" class="el-select-container">
        <el-select
          v-model="courseId"
          placeholder="请选择学年"
          @change="handleCourseChange"
        >
          <el-option label="全部" value=""> </el-option>
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <!-- 管理员 和 老师 -->
      <trial-monitor-table ref="trialMonitorTable"></trial-monitor-table>
    </div>
  </el-card>
</template>

<script>
import { getCourseForHomeWork } from "@/api/edu/course";
import TrialMonitorTable from "./TrialMonitorTable.vue";
export default {
  name: "",
  props: {
    id: {
      type: String,
      default: "tea",
    },
    title: {
      type: String,
      default: "教师数据监控",
    },
    userData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    TrialMonitorTable,
  },
  created() {
    this.queryCourseForHomeWork();
  },
  data() {
    return {
      courseId: "",
      courseList: [],
    };
  },
  methods: {
    handleCourseChange() {
      let courseId = this.courseId;
      const trial = this.$refs["trialMonitorTable"];
      trial.queryParams.courseId = courseId;
      trial.handleQuery();
    },
    queryCourseForHomeWork() {
      getCourseForHomeWork("").then((res) => {
        this.courseList = res && res.resData;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-container {
  ::v-deep {
    .el-input__inner {
      width: 200px;
      height: 30px;
      line-height: 30px;
      background-color: rgb(238, 240, 250);
      text-align: center;
      border: none;
      color: rgb(98, 108, 161);
      font-weight: 700;
    }

    .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>
