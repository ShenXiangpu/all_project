<template>
  <div>
    <teacher-and-sch  />
  </div>
</template>

<script>
import TeacherAndSch from "./components/TeacherAndSch";

import chartsColor from "@/utils/color.js";
import { mapGetters } from "vuex";


export default {
  name: "Dashboard",
  components: {
    TeacherAndSch,
  },
  created() {},
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  mounted() {

  },
  destroyed() {}, //生命周期 - 销毁完成
  data() {
    return {
      tea: {},
      mange: {},
      userData: {},
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
          let tea = {
            online: teacherOnlineNum,
            notOnline: teacherNotOnlineNum,
            onlineRate: teacherOnlineRate,
            total: teacherNum,
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
