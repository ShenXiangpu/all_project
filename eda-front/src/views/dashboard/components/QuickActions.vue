<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>快捷操作</span>
      <!-- <div style="float: right; padding: 3px 0" type="text">截止日期：{{ new Date() }}</div> -->
    </div>
    <el-row :gutter="10" style="height:108px;"> 
      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginBottom10">
        <div
          class="flex flex-column align-center"
          @click="goToPage('classMng/cloudEnvironment')"
        >
          <div
            class="qaItemContainer primaryBgColorb padding1020 primaryColorw"
          >
            IC设计云
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginBottom10">
        <div
          class="flex flex-column align-center"
          @click="goToPage('classMng/toolMng')"
        >
          <div
            class="qaItemContainer primaryBgColoro padding1020 primaryColorw"
          >
            EDA工具管理
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12">
        <div
          class="flex flex-column align-center"
          @click="goToPage('sysMng/usersMng')"
        >
          <div
            class="qaItemContainer primaryBgColory padding1020 primaryColorw"
          >
            用户管理
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12">
        <div
          class="flex flex-column align-center"
          @click="goToPage('userBehaviorMonitoring/userBehaviorMonitoring')"
        >
          <div
            class="qaItemContainer primaryBgColorp padding1020 primaryColorw"
          >
            用户行为监控
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.qaItemContainer {
  width: 80%;
  font-size: 16px;
  text-align: center;
}
.padding1020 {
  padding: 12px 20px;
}

.el-card-eda {
  min-height: 188px;
}
</style>