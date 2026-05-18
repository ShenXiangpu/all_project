<template>
  <div class="report-info">
    <primary-info :reportObj="reportObj" class="marginBottom10"></primary-info>
    <teacher-performance :reportObj="reportObj" class="marginBottom10"></teacher-performance>
    <student-performance :reportObj="reportObj" class="marginBottom10"></student-performance>
    <resource-allocation :reportObj="reportObj" class="marginBottom10"></resource-allocation>
  </div>
</template>

<script>
import { propsMixin } from './propsMixin';
import PrimaryInfo from "./PrimaryInfo.vue";
import ResourceAllocation from "./ResourceAllocation.vue";
import StudentPerformance from "./StudentPerformance.vue";
import TeacherPerformance from "./TeacherPerformance.vue";

export default {
  name: "ReportInfo",
  mixins: [propsMixin],
  components: {
    PrimaryInfo,
    ResourceAllocation,
    StudentPerformance,
    TeacherPerformance,
  },

  created() { },
  data() {
    return {
      report: {}
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.report-info {
  ::v-deep {
    .el-card {
      border: 2px solid #ebeef5;
    }

    .el-card__header {
      padding: 10px 20px;
    }
  }
}
</style>
