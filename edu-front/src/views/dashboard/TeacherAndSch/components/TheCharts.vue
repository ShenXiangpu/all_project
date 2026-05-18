<template>
  <el-card>
    <div slot="header" class="clearfix">
      <!-- （老师端和管理） -->
      <span class="header-span"><span>排行榜</span> </span>

      <div v-if="userRolesNames === '老师'" style="float: right" class="el-select-container">
        <el-select v-model="courseId" placeholder="请选择学年" @change="handleCourseChange">
          <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div v-else-if="userRolesNames == '学校管理员'" style="float: right" class="el-select-container">
        <el-select v-model="year" placeholder="请选择学年" @change="handleYearChange">
          <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>


      <div v-else-if="userRolesNames == '系统最高管理员'" style="float: right" class="el-select-container-super">
        <el-date-picker @change="handleUniDateChange" v-model="dateValue" type="daterange"
          :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          align="right">
        </el-date-picker>

        <el-tag type="primary" class="font14" @click="queryUniAllRankList">全部</el-tag>
      </div>
    </div>
    <div>
      <the-charts-table :tableData="rankList" v-if="userRolesNames == '老师'"></the-charts-table>
      <the-charts-table-sys v-else-if="userRolesNames == '学校管理员'" :tableData="rankList"></the-charts-table-sys>
      <the-charts-table-super-sys :tableData="rankList"
        v-else-if="userRolesNames == '系统最高管理员'"></the-charts-table-super-sys>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import TheChartsTable from "./TheChartsTable.vue";
import TheChartsTableSys from "./TheChartsTableSys.vue";
import TheChartsTableSuperSys from "./TheChartsTableSuperSys.vue";
import { getCourseForHomeWork } from "@/api/edu/course";
import {
  getIndexStudentScoreRankingList,
  getIndexCourseRankingList,
  getIndexUniversityRankingList
} from "@/api/dashboard";
export default {
  name: "",
  components: {
    TheChartsTable,
    TheChartsTableSys,
    TheChartsTableSuperSys
  },
  created() {
    let userRolesNames = this.$store.state.user.userRolesNames;
    if (userRolesNames === "老师") {
      this.queryCourseForHomeWork();
    } else if (userRolesNames === "学校管理员") {
      this.initSchoolYear();
      this.queryRankList();
    } else if (userRolesNames === "系统最高管理员") {
      const end = new Date();
      const start = new Date();
      let endTime = this.$moment(end).format("YYYY-MM-DD");
      this.endTime = endTime;
      let startTime = start.getTime() - 3600 * 1000 * 24 * 30;
      this.startTime = this.$moment(startTime).format("YYYY-MM-DD");

      this.dateValue = [startTime, endTime];
      this.querySuperRankList();
    }
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
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
      value: "1",
      featureData: [],
      year: "",
      rankList: [],
      schoolYears: [],
      courseList: [],
      courseId: "",

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateValue: [],
      startTime: "",
      endTime: "",
    };
  },
  methods: {
    handleUniDateChange() {
      let endTime = this.$moment(this.dateValue[1]).format("YYYY-MM-DD");
      this.endTime = endTime;
      this.startTime = this.$moment(this.dateValue[0]).format("YYYY-MM-DD");
      this.querySuperRankList();
    },
    queryUniAllRankList() {
      this.startTime = "";
      this.endTime = "";
      this.dateValue = [];
      this.querySuperRankList();
    },
    handleCourseChange() {
      this.queryTeaRankList();
    },
    queryCourseForHomeWork() {
      getCourseForHomeWork("").then((res) => {
        this.courseList = res && res.resData;
        this.courseId = res && res.resData[0].id;
        this.queryTeaRankList();
      });
    },
    handleYearChange() {
      this.queryRankList();
    },
    initSchoolYear() {
      console.log("initSchoolYear");
      const date = new Date();
      let currentMonth = date.getMonth() + 1;
      let currentYear = parseInt(date.getFullYear());
      let schoolYears = [];
      const level = 4;
      for (var i = 0; i < level; i++) {
        let beginTime = currentYear - level / 2 + i;
        schoolYears.push(beginTime + " ~ " + (beginTime + 1) + " 第一学期");
        schoolYears.push(beginTime + " ~ " + (beginTime + 1) + " 第二学期");
      }
      if (currentMonth >= 9) {
        this.year = currentYear + " ~ " + (currentYear + 1) + " 第二学期";
      } else {
        this.year = currentYear + " ~ " + (currentYear + 1) + " 第一学期";
      }
      console.log("schoolYears", schoolYears);
      this.schoolYears = schoolYears;
    },
    getFeatureOptions() {
      this.query();
    },

    query() {
      let data = {
        dayLimit: this.value,
      };
      rankingList(data).then((res) => {
        let resData = res.resData;
        this.featureData = resData;
      });
    },
    queryRankList() {
      const year = this.year;
      getIndexCourseRankingList({ year }).then((res) => {
        let resData = res.resData;
        this.rankList = resData;
      });
    },
    queryTeaRankList() {
      const courseId = this.courseId;
      getIndexStudentScoreRankingList({ courseId }).then((res) => {
        let resData = res.resData;
        this.rankList = resData;
      });
    },
    querySuperRankList() {

      const startTime = this.startTime
      const endTime = this.endTime;
      getIndexUniversityRankingList({ startTime, endTime }).then((res) => {
        let resData = res.resData;
        this.rankList = resData;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-span {
  span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    width: 100px;
    background-image: url("../../../../assets/img/dashboard/trophy.png");
    background-repeat: no-repeat;
    background-size: 18%;
    background-position: 70%;
  }
}

.header-span::after {
  content: "";
  display: inline;
  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  clear: both;
  // background-color: #409eff;
  background-image: url("../../../../assets/img/dashboard/trophy.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 10% 100%;
}

.el-select-container-super {

  ::v-deep {

    .el-input__inner {
      width: 300px;
      height: 30px;
      line-height: 30px;
      background-color: rgb(238, 240, 250);
      text-align: center;
      border: none;
      color: rgb(98, 108, 161);
      font-size: 14px;
    }

    .el-input__icon {
      line-height: 24px;
    }

    .el-range-input {
      background-color: rgb(238, 240, 250);
      color: rgb(98, 108, 161);
    }

    .el-range-separator {
      color: rgb(98, 108, 161);
      font-size: 14px !important;
      line-height: 24px;
    }

    .el-tag {
      margin-left: 10px;
      font-size: 14px !important;
      cursor: pointer;
    }
  }
}

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
