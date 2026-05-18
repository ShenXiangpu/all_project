<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>实时数据</span>
      <div class="color9" style="float: right; padding: 3px 0" type="text">
        截止日期：{{ $moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <el-row :gutter="10">
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.studentNum }} (个)
          </div>
          <div class="color9 font15">学生数量</div>
        </div>
      </el-col>

      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.courseNum || 0 }} (个)
          </div>
          <div class="color9 font15">课程数量</div>
        </div>
      </el-col>

      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.trialNum }} (个)
          </div>
          <div class="color9 font15">实验数量</div>
        </div>
      </el-col>
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.reportNum }} (份)
          </div>
          <div class="color9 font15">实验报告</div>
        </div>
      </el-col>
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.vmCount || 0 }} (个)
          </div>
          <div class="color9 font15">虚拟机数量</div>
        </div>
      </el-col>
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.homeworkAssignNum }} (次)
          </div>
          <div class="color9 font15">作业布置</div>
        </div>
      </el-col>
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.homeworkCheckedNum }} (份)
          </div>
          <div class="color9 font15">作业批改</div>
        </div>
      </el-col>
      <el-col
        style="background-color: rgb(250, 251, 255); padding: 20px"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.homeworkUnCheckedNum }} (份)
          </div>
          <div class="color9 font15">待批改作业</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "",
  components: {},
  created() {
    this.queryIndexUserMonitorData();
    this.queryOnlineDate();
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
      userData: {},
      onlineDate: {},
    };
  },
  methods: {
    queryIndexUserMonitorData() {
      getIndexUserMonitorData().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.userData = resData;
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
  },
};
</script>

<style lang="scss" scoped>
.el-card-eda {
  // height: calc(100vh - 820px);
}
</style>
