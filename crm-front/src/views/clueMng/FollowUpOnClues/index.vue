<template>
  <div class="app-container">
    <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的线索" name="first"></el-tab-pane>
      <el-tab-pane
        v-permission="[`subordinateTab`]"
        label="下属线索"
        name="second"
      ></el-tab-pane>
    </el-tabs>
    <component :is="componentName" />
  </div>
</template>

<script>
import MyClues from "./components/MyClues/index.vue";
import UnderlingClues from "./components/UnderlingClues/index.vue";
export default {
  name: "FollowUpOnClues",
  components: {
    MyClues,
    UnderlingClues,
  },
  created() {},
  computed: {},
  data() {
    return {
      activeName: "first",
      componentName: "MyClues",
    };
  },
  methods: {
    handleClick(tab, event) {
      tab.name === "first"
        ? (this.componentName = "MyClues")
        : (this.componentName = "UnderlingClues");
    },
  },
};
</script>

<style lang="scss" scoped></style>
