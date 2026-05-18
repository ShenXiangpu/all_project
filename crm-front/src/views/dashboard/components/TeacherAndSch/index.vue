<template>
  <div class="app-container">
    <el-row :gutter="10">
      <!-- 中间部分左边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <!-- 平台数据监控 -->
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
            style="margin-bottom: 10px"
          >
            <real-time-s-mange
              style="height: 160px"
              :onlineDate="onlineDate"
            ></real-time-s-mange>
          </el-col>
          <!-- 平台数据监控 -->
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            style="margin-bottom: 10px"
          >
            <data-monitor
              id="clue"
              title="线索"
              :userData="clueObj"
            ></data-monitor>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            style="margin-bottom: 10px"
          >
            <data-monitor
              id="contract"
              title="合同"
              :userData="contractObj"
            ></data-monitor>
          </el-col>
        </el-row>
      </el-col>
      <!-- 到期提醒 -->
      <el-col
        :xs="8"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="8"
        style="margin-bottom: 10px"
      >
        <the-charts></the-charts>
      </el-col>
      <!-- 中间部分右边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <sour-data-monitor ref="sourDataMonitor"></sour-data-monitor>
          </el-col>
          <!-- 快捷操作 -->
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <quick-actions
              @queryCourseList="queryCourseList"
              @queryHomeworkListIndex="queryHomeworkListIndex"
            ></quick-actions>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RealTimeSMange from "./components/RealTimeSMange.vue";
import RealTimeTea from "./components/RealTimeTea.vue";
import DataMonitor from "./components/DataMonitor.vue";
import FeaDataMonitor from "./components/FeaDataMonitor.vue";
import SourDataMonitor from "./components/SourDataMonitor.vue";
import TheCharts from "./components/TheCharts.vue";
import QuickActions from "./components/QuickActions.vue";

import chartsColor from "@/utils/color.js";
import { mapGetters } from "vuex";

import { platform } from "@/api/crm/dashboard.js";
export default {
  name: "Dashboard",
  components: {
    RealTimeTea,
    RealTimeSMange,
    DataMonitor,
    FeaDataMonitor,
    SourDataMonitor,
    TheCharts,
    QuickActions,
  },
  created() {},
  computed: {},
  mounted() {
    this.queryOnlineDate();
  },
  destroyed() {}, //生命周期 - 销毁完成
  data() {
    return {
      tea: {},
      mange: {},
      userData: {},
      chartsColor: chartsColor,
      onlineDate: {},
      clueObj: {},
      contractObj: {},
    };
  },
  methods: {
    /**
     * 平台数据+线索数据+合同数据
     */
    queryOnlineDate() {
      platform().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          let onlineDate = resData;
          let clueEcharts = [
            { name: "跟进中", value: resData.followClueNums },
            { name: "待跟进", value: resData.unFollowClueNums },
          ];
          let contractEcharts = [
            { name: "待生效合同", value: resData.unStartContractNums },
            { name: "生效中合同", value: resData.effectContractNums },
          ];
          onlineDate.clueEcharts = clueEcharts;
          onlineDate.contractEcharts = contractEcharts;
          this.onlineDate = onlineDate;
          this.clueObj = {
            total: resData.clueNums,
            echarts: clueEcharts,
          };
          this.contractObj = {
            total: resData.contractNums,
            echarts: contractEcharts,
          };
          console.log("clueObj", this.clueObj, this.contractObj);
        }
      });
    },
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
          this.tea = tea;
          this.mange = mange;
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
