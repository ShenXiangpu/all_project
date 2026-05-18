<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>实时数据</span>
      <div class="color9" style="float: right; padding: 3px 0" type="text">
        截止日期：{{ $moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }}
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
            {{ userData.total }}(个)
          </div>
          <div class="color9 font15">人员数量</div>
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
            {{ onlineDate.toolCount }}
          </div>
          <div class="color9 font15">EDA工具数量</div>
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
            {{ onlineDate.vmCount }}
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
            {{ onlineDate.ip }}(个)
          </div>
          <div class="color9 font15">IP数量</div>
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
            {{ onlineDate.pdk }}(个)
          </div>
          <div class="color9 font15">PDK数量</div>
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
            {{ onlineDate.cpu }}
          </div>
          <div class="color9 font15">CPU使用率</div>
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
            {{ onlineDate.sto }}
          </div>
          <div class="color9 font15">存储使用率</div>
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
            {{ onlineDate.mem }}
          </div>
          <div class="color9 font15">内存使用率</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getCoursePageForIndex, onlineDate } from "@/api/dashboard.js";
import moment from 'moment'
export default {
  name: "",
  components: {},
  created() {
    this.queryCoursePageForIndex();
    this.queryOnlineDate();
  },
  data() {
    return {
      userData: {},
      onlineDate: {},
    };
  },
  methods: {
    queryCoursePageForIndex() {
      getCoursePageForIndex().then((res) => {
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