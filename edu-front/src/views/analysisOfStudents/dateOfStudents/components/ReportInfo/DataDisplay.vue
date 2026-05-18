<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title fontW7 font18">数据展示</span>
      </div>
    </template>
    <el-row :gutter="40">
      <el-col :span="12">
        <my-echarts
          class="chart"
          id="chart1"
          :width="'100%'"
          :height="'300px'"
          titleText="--作业数据--"
          :data="reportObj.homeworkEcharts"
        ></my-echarts>
      </el-col>
      <el-col :span="12">
        <my-echarts
          class="chart"
          id="chart2"
          :width="'100%'"
          :height="'300px'"
          titleText="--实操数据--"
           :data="reportObj.vmEcharts"
        ></my-echarts>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import DefineTable from "./DefineTable.vue";
import MyEcharts from "./Echarts.vue";
export default {
  name: "DataDisplay",
  components: { DefineTable, MyEcharts },
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
