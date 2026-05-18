<template>
  <div class="app-container">
    <!-- <el-tabs
      v-if="roleId != 11 && roleId != 42"
      class="el-tabs-edu"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="内部用户" name="zero"></el-tab-pane>
      <el-tab-pane label="外部用户" name="first"></el-tab-pane>
    </el-tabs> -->
    <component :is="componentName" />
  </div>
</template>

<script>
import ExternalUsers from "./components/ExternalUsers";
import InternalUsers from "./components/InternalUsers";
import { mapGetters } from "vuex";
export default {
  name: "TabsContainer",
  components: {
    ExternalUsers,
    InternalUsers,
  },
  created() {},
  computed: {
    ...mapGetters(["roleId", "userRolesNames"]),
  },
  mounted() {},
  data() {
    return {
      activeName: "zero",
      componentName: "InternalUsers",
    };
  },
  methods: {
    handleClick(tab, event) {
      let tabName = tab.name;
      if (tabName == "zero") {
        this.componentName = "InternalUsers";
      } else {
        this.componentName = "ExternalUsers";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tabs-edu {
  // padding: 0px 20px 0px 0;
}
</style>
