<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ userRolesNames === "老师" ? "作业" : "资源" }}数据监控</span>
      <div
        v-if="userRolesNames === '老师'"
        style="float: right"
        class="el-select-container"
      >
        <el-select
          v-model="courseId"
          placeholder="请选择"
          @change="handleChangeCourse"
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
      <div v-else style="float: right" class="el-select-container">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="getFeatureOptions"
        >
          <el-option
            v-for="item in featureDataMonitorOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <sour-data-monitor-line
        v-if="userRolesNames == '学校管理员' || userRolesNames == '系统最高管理员'"
        :echartsLoading="echartsLoading"
        docId="cpu"
        graphID="CPU"
        :data="featureData"
      />
      <home-work-data-monitor ref="homeWorkDataMonitor" v-else />
    </div>
  </el-card>
</template>

<script>
import { getCourseForHomeWork } from "@/api/edu/course";
import { queryClusterPerformance } from "@/api/dashboard";
import SourDataMonitorLine from "./SourDataMonitorLine.vue";
import HomeWorkDataMonitor from "./HomeWorkDataMonitor.vue";
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {
    SourDataMonitorLine,
    HomeWorkDataMonitor,
  },
  created() {
    // this.query();

    let userRolesNames = this.$store.state.user.userRolesNames;
    if (userRolesNames === "老师") {
      this.queryCourseForHomeWork();
    } else {
      this.query();
    }
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
      value: "1",
      featureDataMonitorOptions: [
        {
          id: 1,
          label: "一天内",
          value: "1",
        },
        {
          id: 2,
          label: "七天内",
          value: "7",
        },
        {
          id: 3,
          label: "三十天内",
          value: "30",
        },
        {
          id: 4,
          label: "九十天内",
          value: "90",
        },
        {
          id: 5,
          label: "一年内",
          value: "365",
        },
      ],
      courseId: "",
      featureData: [],
      canvasWidth: "100%",
      echartsLoading: false,
      courseList: [],
    };
  },
  methods: {
    handleChangeCourse(e) {
      let courseId = this.courseId;
      const homeWork = this.$refs["homeWorkDataMonitor"];
      homeWork.queryParams.courseId = courseId;
      homeWork.handleQuery();
    },
    getFeatureOptions() {
      this.query();
    },
    query() {
      let data = {
        interval: this.value,
      };
      queryClusterPerformance(data).then((res) => {
        this.featureData = res.resData || [];
      });
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
