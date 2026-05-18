<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>实时数据</span>
      <div class="color9" style="float: right; padding: 3px 0" type="text">
        截止日期：{{ $moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <el-row :gutter="10">
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.teacherNum || 0 }} (个)
          </div>
          <div class="color9 font15">教师数量</div>
        </div>
      </el-col>

      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.studentNum || 0 }} (个)
          </div>
          <div class="color9 font15">学生数量</div>
        </div>
      </el-col>

      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.courseNum || 0 }} (个)
          </div>
          <div class="color9 font15">课程数量</div>
        </div>
      </el-col>
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.trialNum || 0 }} (个)
          </div>
          <div class="color9 font15">实验数量</div>
        </div>
      </el-col>
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.vmCount || 0 }} (个)
          </div>
          <div class="color9 font15">虚拟机数量</div>
        </div>
      </el-col>
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ onlineDate.cpu || 0 }}
          </div>
          <div class="color9 font15">CPU使用率</div>
        </div>
      </el-col>
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ onlineDate.sto || 0 }}
          </div>
          <div class="color9 font15">存储使用率</div>
        </div>
      </el-col>
      <el-col style="background-color: rgb(250, 251, 255); padding: 20px" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ onlineDate.mem || 0 }}
          </div>
          <div class="color9 font15">内存使用率</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import { getIndexUserMonitorData, onlineDate } from "@/api/dashboard.js";
export default {
  name: "",
  props: {
    userData: {
      type: Object,
      default: () => ({}),
    },
    onlineDate: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  created() {
    // this.queryIndexUserMonitorData();
    // this.queryOnlineDate();
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
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
