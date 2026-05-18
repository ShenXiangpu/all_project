<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>实时数据</span>
      <div class="color9" style="float: right; padding: 3px 0" type="text">
        截止日期：{{ $moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <el-row :gutter="10" class="marginBottom10 user-data">
      <div class="user-data-title primaryColor">用户数据</div>
      <el-col class="user-data-container padding-40" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.universityNum || 0 }} (个)
          </div>
          <div class="color9 font15">高校数量</div>
        </div>
      </el-col>

      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.userNum || 0 }} (个)
          </div>
          <div class="color9 font15">用户数量</div>
        </div>
      </el-col>

      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.studentNum || 0 }} (个)
          </div>
          <div class="color9 font15">学生数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.courseNum || 0 }} (个)
          </div>
          <div class="color9 font15">课程数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.vmCount || 0 }} (个)
          </div>
          <div class="color9 font15">虚拟机数量</div>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="10" class="user-data">
      <div class="user-data-title primaryColor">平台数据</div>
      <el-col class="user-data-container padding-40" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.trialNum || 0 }} (个)
          </div>
          <div class="color9 font15">实验数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.questionBankNum || 0 }} (个)
          </div>
          <div class="color9 font15">题库数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.pdkNum || 0 }} (个)
          </div>
          <div class="color9 font15">PDK数量</div>
        </div>
      </el-col>

      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.ipNum || 0 }} (个)
          </div>
          <div class="color9 font15">IP数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.toolNum || 0 }} (个)
          </div>
          <div class="color9 font15">工具数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ userData.labNum || 0 }} (个)
          </div>
          <div class="color9 font15">Lab数量</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ onlineDate.cpu || 0 }}
          </div>
          <div class="color9 font15">CPU使用率</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
        <div class="flex flex-column align-center justify-between">
          <div class="font19 fontW7 marginBottom10">
            {{ onlineDate.sto || 0 }}
          </div>
          <div class="color9 font15">存储使用率</div>
        </div>
      </el-col>
      <el-col class="user-data-container" :xs="8" :sm="6" :md="4" :lg="2" :xl="2">
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
import { type } from "jquery";
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
      // userData: {},
      // onlineDate: {},
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

.user-data {
  position: relative;
  background-color: rgb(250, 251, 255);

  &-title {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    // writing-mode: vertical-lr;
    text-align: center;
    letter-spacing: 4px;
    border-radius: 0 6px 6px 0;
    height: 80%;
    line-height: 34px;
    font-size: 16px;
    font-weight: 600;
    border-right: 2px solid #dcdfe6;
  }

  &-container {
    padding: 15px;
  }

  .padding-40 {
    padding-left: 60px !important;
  }
}
</style>
