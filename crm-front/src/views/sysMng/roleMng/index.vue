<template>
  <div class="app-container">
    <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内部角色" name="zero"></el-tab-pane>
      <el-tab-pane label="外部角色" name="first"></el-tab-pane>
    </el-tabs>
    <component :is="componentName" />
  </div>
</template>

<script>
import ExternalRoles from "./components/ExternalRoles";
import InternalRoles from "./components/InternalUsers";
import { mapGetters } from "vuex";
export default {
  name: "TabsContainer",
  components: {
    ExternalRoles,
    InternalRoles,
  },
  created() {},
  computed: {
    ...mapGetters(["roleId", "userRolesNames"]),
  },
  data() {
    return {
      activeName: "zero",
      componentName: "InternalRoles",
    };
  },
  methods: {
    handleClick(tab, event) {
      let tabName = tab.name;
      if (tabName == "zero") {
        this.componentName = "InternalRoles";
      } else {
        this.componentName = "ExternalRoles";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tabs-edu {
  // padding: 0px 20px 0px 0;
  // padding: 0px 20px 0px 0;
}
</style>
