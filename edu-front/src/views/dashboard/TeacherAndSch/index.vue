<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="24" class="marginBottom10">
        <real-time-super-mange v-if="userRolesNames === '系统最高管理员'" :onlineDate="onlineDate"
          :userData="userData"></real-time-super-mange>
        <real-time-s-mange v-if="userRolesNames === '学校管理员'" :onlineDate="onlineDate"
          :userData="userData"></real-time-s-mange>
        <real-time-tea v-if="userRolesNames === '老师'" :onlineDate="onlineDate" :userData="userData"></real-time-tea>
      </el-col>
      <!-- 中间部分左边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <!-- 平台数据监控 -->
        <el-row :gutter="10">
          <!-- 平台数据监控 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="marginBottom10">
            <data-monitor v-if="userRolesNames == '系统最高管理员'" title="高校" id="tea" :userData="superMange"></data-monitor>
            <data-monitor v-if="userRolesNames == '学校管理员'" id="tea" :userData="tea"></data-monitor>
            <data-monitor v-if="userRolesNames == '老师'" id="student" title="学生" :userData="mange"></data-monitor>
          </el-col>
          <!-- feature数据监控 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="marginBottom10">
            <div>
              <data-monitor v-if="userRolesNames == '系统最高管理员'" id="student" title="学生" :userData="mange"></data-monitor>
              <data-monitor v-if="userRolesNames == '学校管理员'" id="student" title="学生" :userData="mange"></data-monitor>
              <trial-monitor v-if="userRolesNames == '老师'" id="student" title="实验" :userData="mange"></trial-monitor>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <sour-data-monitor ref="sourDataMonitor"></sour-data-monitor>
          </el-col>
        </el-row>
      </el-col>
      <!-- 中间部分右边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-row :gutter="10">
          <!-- 排行榜 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="marginBottom10">
            <the-charts></the-charts>
          </el-col>
          <!-- 快捷操作 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <quick-actions @queryCourseList="queryCourseList"
              @queryHomeworkListIndex="queryHomeworkListIndex"></quick-actions>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RealTimeSMange from "./components/RealTimeSMange.vue";
import RealTimeSuperMange from "./components/RealTimeSuperMange.vue";

import RealTimeTea from "./components/RealTimeTea.vue";
import DataMonitor from "./components/DataMonitor.vue";
import TrialMonitor from "./components/TrialMonitor.vue";
import SourDataMonitor from "./components/SourDataMonitor.vue";
import TheCharts from "./components/TheCharts.vue";
import QuickActions from "./components/QuickActions.vue";
import chartsColor from "@/utils/color.js";
import { mapGetters } from "vuex";
import {
  getIndexUserMonitorData,
  onlineDate
} from "@/api/dashboard";

export default {
  name: "TeacherAndSch",
  components: {
    RealTimeTea,
    RealTimeSMange,
    RealTimeSuperMange,
    DataMonitor,
    SourDataMonitor,
    TheCharts,
    QuickActions,
    TrialMonitor,
  },
  created() { },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  mounted() {
    this.queryIndexUserMonitorData();
    this.queryOnlineDate();
  },
  destroyed() { }, //生命周期 - 销毁完成
  data() {
    return {
      tea: {},
      mange: {},
      userData: {},
      onlineDate: {},
      superMange: {},
      chartsColor: chartsColor,
    };
  },
  methods: {
    queryHomeworkListIndex(courseId) {
      const sourDataMonitor = this.$refs["sourDataMonitor"];
      sourDataMonitor.courseId = courseId;
      sourDataMonitor.queryCourseForHomeWork();
    },
    queryIndexUserMonitorData() {
      getIndexUserMonitorData().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.userData = resData;
          let teacherOnlineNum = resData.teacherOnlineNum;
          let teacherNotOnlineNum = resData.teacherNotOnlineNum;
          let teacherOnlineRate = resData.teacherOnlineRate;
          let teacherNum = resData.teacherNum;
          let studentOnlineNum = resData.studentOnlineNum;
          let studentNotOnlineNum = resData.studentNotOnlineNum;
          let studentOnlineRate = resData.studentOnlineRate;
          let studentNum = resData.studentNum;

          let schoolOnlineNum = resData.universityOnlineNum;
          let schoolNotOnlineNum = resData.universityNotOnlineNum;
          let schoolOnlineRate = resData.universityOnlineRate;
          let schoolNum = resData.universityNum;



          let tea = {
            online: Number(teacherOnlineNum) || 0,
            notOnline: Number(teacherNotOnlineNum) || 0,
            onlineRate: teacherOnlineRate,
            total: Number(teacherNum) || 0,
          };
          let mange = {
            online: studentOnlineNum,
            notOnline: studentNotOnlineNum,
            onlineRate: studentOnlineRate,
            total: studentNum,
          };
          let superMange = {
            online: schoolOnlineNum,
            notOnline: schoolNotOnlineNum,
            onlineRate: schoolOnlineRate,
            total: schoolNum,
          }
          this.tea = tea;
          this.mange = mange;
          this.superMange = superMange
        }
      });
    },

    queryOnlineDate() {
      onlineDate().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.onlineDate = resData;
        }
      });
    },

    queryCourseList() {
      this.queryIndexUserMonitorData();
    },
  },
};
</script>
<style></style>

<style lang="scss" scoped>
::v-deep {
  .el-card {
    .el-card__header {
      border-bottom: none;
      // padding: 0;

      span {
        font-size: 18px;
        font-weight: 700;
      }
    }

    .el-card__body {
      padding-top: 0px;
      // background-color: rgb(242, 248, 252);
    }
  }
}
</style>
