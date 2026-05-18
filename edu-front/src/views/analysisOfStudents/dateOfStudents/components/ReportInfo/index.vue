<template>
  <div class="report-info">
    <primary-info :reportObj="reportObj" class="marginBottom10"></primary-info>
    <overall-performance :reportObj="reportObj" class="marginBottom10"></overall-performance>
    <data-display :reportObj="reportObj" class="marginBottom10"></data-display>
    <analysis-of-students :reportObj="reportObj" class="marginBottom10"></analysis-of-students>
  </div>
</template>

<script>
import PrimaryInfo from "./PrimaryInfo.vue";
import AnalysisOfStudents from "./AnalysisOfStudents.vue";
import DataDisplay from "./DataDisplay.vue";
import OverallPerformance from "./OverallPerformance.vue";
import { propsMixin } from './propsMixin';
export default {
  name: "",
  mixins: [propsMixin],
  components: {
    PrimaryInfo,
    AnalysisOfStudents,
    DataDisplay,
    OverallPerformance,
  },
  created() {},
  data() {
    return {};
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
