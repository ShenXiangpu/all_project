<template>
  <div class="app-container">
    <el-tabs class="el-tabs-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消息推送" name="zero"></el-tab-pane>
      <el-tab-pane label="广播通知" name="first"></el-tab-pane>
    </el-tabs>
    <component :is="componentName" />
  </div>
</template>

<script>
import NewsMng from "@/views/newsMng";
import BroadCast from "./components/Broadcast/index.vue";
import CustomerType from ".././clueMng/components/FormItem/CustomerType.vue";
import { mapGetters } from "vuex";
export default {
  name: "TabsContainer",
  components: {
    NewsMng,
    BroadCast,
    CustomerType,
  },
  created() {
    this.$route.query.activeName &&
      (this.activeName = this.$route.query.activeName);
    if (this.activeName == "first") {
      this.componentName = "BroadCast";
    }
  },
  computed: {
    ...mapGetters(["roleId", "userRolesNames"]),
  },
  data() {
    return {
      activeName: "zero",
      componentName: "NewsMng",
    };
  },
  methods: {
    handleClick(name) {
      let tabName = name.name;
      this.componentName = tabName == "first" ? "BroadCast" : "NewsMng";
    },
  },
};
</script>

<style lang="scss" scoped></style>
