<template>
  <div>
    <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        label="本校资源"
        name="zero"
        v-if="roleId == '11' || roleId == '42'"
      ></el-tab-pane>
      <el-tab-pane label="EDA²资源" name="first"></el-tab-pane>
      <el-tab-pane
        label="高校资源"
        name="second"
        v-if="roleId == '3' || roleType == 1"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TabsContainer",
  components: {},
  created() {
    const roleId = this.$store.state.user.roleId;
    if (roleId == "11" || roleId == "42") {
      this.activeName = "zero";
    }
  },
  computed: {
    ...mapGetters(["roleId", "userRolesNames", "roleType"]),
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$emit("handleClick", tab.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
