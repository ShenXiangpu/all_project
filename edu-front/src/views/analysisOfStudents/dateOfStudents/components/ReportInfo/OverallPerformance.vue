<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title fontW7 font18">整体表现</span>
      </div>
    </template>
    <el-row :gutter="40">
      <el-col :span="6">
        <define-card title="作业表现" :evaluate="reportObj && reportObj.homeworkScoreTag">
          <div>作业分数：{{ reportObj && reportObj.homeworkScore || 0 }}分</div>
          <div>作业分数排名：{{ reportObj && reportObj.homeworkScoreRank || 0 }}名</div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="实操表现" :evaluate="reportObj && reportObj.trialScoreTag || 0">
          <div>实操分数：{{ reportObj && reportObj.trialScore || 0 }}分</div>
          <div>实操分数排名：{{ reportObj && reportObj.trialScoreRank || 0 }}名</div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="实操次数" :evaluate="reportObj && reportObj.vmLoginNumTag">
          <div>实操次数：{{ reportObj && reportObj.vmLoginNum || 0 }}次</div>
          <div>实操次数排名：{{ reportObj && reportObj.vmLoginNumRank || 0 }}名</div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="实操时长" class="" :evaluate="reportObj && reportObj.vmLoginTimeTag">
          <div>
            <div>实操时长：{{ reportObj && reportObj.vmLoginTime || 0 }}小时</div>
            <div>实操时长排名：{{ reportObj && reportObj.vmLoginTimeRank || 0 }}名</div>
          </div>
        </define-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import DefineCard from "./DefineCard.vue";
export default {
  name: "OverallPerformance",
  components: {
    DefineCard,
  },
  props: {
    reportObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {

  },
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
