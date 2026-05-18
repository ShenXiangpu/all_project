<template>
  <div class="app-container">
    <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的申请" name="first"></el-tab-pane>
      <el-tab-pane label="流程审批" name="second"></el-tab-pane>
    </el-tabs>
    <component :is="componentName" />
  </div>
</template>

<script>
import FlowApproval from "./flowApproval";
import MyApproval from "./myApproval";
export default {
  name: "resourceDel",
  components: {
    FlowApproval,
    MyApproval,
  },
  created() {},
  computed: {},
  data() {
    return {
      activeName: "first",
      componentName: "MyApproval",
    };
  },
  methods: {
    handleClick(tab, event) {
      tab.name === "first"
        ? (this.componentName = "MyApproval")
        : (this.componentName = "FlowApproval");
    },
  },
};
</script>

<style lang="scss" scoped></style>
