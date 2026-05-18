<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <!-- <el-popover :title="title" placement="top" width="210" trigger="hover">
          <div>
            <div v-html="overall[title]"></div>
          </div>
          <div slot="reference" class="bgColor primaryColorw p-2 font16">
            <span class="card-title fontW7 font18">学情分析</span>
            <i class="el-icon-question primaryColorw"></i>
          </div>
        </el-popover> -->
        <span class="card-title fontW7 font18">学情分析</span>
      </div>
    </template>
    <div>
      <h3>一、学习积极性</h3>
      <p class="" style="text-indent: 20px">
        {{ reportObj.initiativeAnalysis }}
      </p>
      <h3>二、学习效果</h3>
      <p style="text-indent: 20px">{{ reportObj.effectAnalysis }}</p>
      <h3>三、总结</h3>
      <p style="text-indent: 20px">{{ reportObj.sumAnalysis }}</p>
    </div>
  </el-card>
</template>

<script>
import DefineCard from "./DefineCard.vue";
export default {
  name: "AnalysisOfStudents",
  components: { DefineCard },
  props: {
    reportObj: {
      type: Object,
      default: () => {
        return {};
      },
    },

  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
