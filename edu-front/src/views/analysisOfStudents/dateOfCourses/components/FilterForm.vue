<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">


          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="" prop="keyWord">
              <el-input class="el-input-edu" v-model="queryParams.keyWord" placeholder="请输入课程名称或者ID" clearable>
              </el-input>
            </el-form-item>
            <get-university :queryParams="queryParams" />

            <el-form-item label="学年" prop="year">
              <el-select class="el-select-edu-2" v-model="queryParams.year" placeholder="请选择学年">
                <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="老师" prop="teacherId">
              <el-select class="el-select-edu" v-model="queryParams.teacherId" placeholder="请选择老师" clearable>
                <el-option label="全部" value="" />
                <el-option v-for="item in teacherList" :label="item.name" :key="item.id" :value="item.id" />
              </el-select>
            </el-form-item>


            <el-form-item label="年级" prop="grade">
              <el-select class="el-select-edu" v-model="queryParams.grade" placeholder="请选择年级" clearable>
                <el-option label="全部" value="" />
                <el-option v-for="item in gradeList" :label="item" :key="item" :value="item" />
              </el-select>
            </el-form-item>


            <el-form-item label="报告生成" prop="status">
              <el-select class="el-select-edu" v-model="queryParams.status" placeholder="请选择" clearable>
                <el-option label="全部" value="" />
                <el-option label="未生成" value="0" />
                <el-option label="已生成" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
  </div>
</template>

<script>
import BorderContainer from "@/components/BorderContainer";
import { getCourseList,getUniversityForSearch } from "@/api/edu/course";
import { getTeachersForSearch } from "@/api/edu/analysisOfStudents";
import GetUniversity from "@/components/GetUniversity";
import { get } from "jquery";

export default {
  name: "FilterForm",
  props: {},
  components: { BorderContainer,GetUniversity },
  created() {
    this.initSchoolYear();
    this.queryTeachersForSearch()
    this.initGrade()
    this.queryCourseList()
  },
  data() {
    return {
      queryParams: {
        year: "",
        keyWord: "",
        teacherId: "",
        grade: "",
        status: "",
        universityName: "",
      },
      teacherList: [],
      createByList: [],
      courseList: [],
      ipSupplierList: [],
      schoolYears: [],
      gradeList: []
    };
  },
  methods: {

    queryCourseList() {
      getCourseList().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.courseList = resData
        }
      });
    },

    initGrade() {
      const date = new Date();
      let currentYear = parseInt(date.getFullYear());
      let gradeList = [];
      const level = 5;
      for (var i = 0; i < level; i++) {
        let beginTime = currentYear - level + i + 1;
        gradeList.push(beginTime);
      }
      this.gradeList = gradeList;
    },

    queryTeachersForSearch() {
      getTeachersForSearch().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.teacherList = resData
        }
      });
    },
    initSchoolYear() {
      const date = new Date();
      let currentMonth = date.getMonth() + 1;
      let currentYear = parseInt(date.getFullYear());
      let schoolYears = [];
      const level = 4;
      for (var i = 0; i < level; i++) {
        let beginTime = currentYear - level / 2 + i;
        schoolYears.push(beginTime - 1 + " ~ " + beginTime);
      }
      if (currentMonth >= 9) {
        this.queryParams.year = currentYear - 1 + " ~ " + currentYear;
      } else {
        this.queryParams.year = currentYear - 1 + " ~ " + currentYear;
      }
      this.schoolYears = schoolYears;
      this.$emit("initParam", this.queryParams);
    },
    resetQuery() {
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      this.$emit("handleQuery", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-edu-2 {
  width: 140px;
}

.el-select-edu {
  width: 120px;
}

.el-input-edu {
  width: 210px;
}

.padding10 {
  padding: 5px 0px;
}

.el-col-5 {
  width: 20%;
}

.el-col-lg-5,
.el-col-xl-5 {
  width: 20%;
}
</style>
