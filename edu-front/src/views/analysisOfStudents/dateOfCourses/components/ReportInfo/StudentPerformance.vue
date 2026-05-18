<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title fontW7 font18">学生表现</span>
      </div>
    </template>
    <el-row :gutter="40">
      <el-col :span="8">
        <define-table :list="reportObj.trailRank" title="实操分数榜"></define-table>
      </el-col>
      <el-col :span="8">
        <define-table :list="reportObj.vmTimeRank" unit="h" title="实操时长榜"></define-table
      ></el-col>
      <el-col :span="8">
        <define-table :list="reportObj.vmLoginNumRank" unit="次" title="实操次数榜"></define-table
      ></el-col>
    </el-row>
  </el-card>
</template>

<script>
import { propsMixin } from './propsMixin';
import DefineTable from "./DefineTable.vue";
export default {
  name: "StudentPerformance",
  components: { DefineTable },
  mixins: [propsMixin],
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
