<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ title }}数据</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div >
      <data-monitor-circle :title="title" :id="id" :userData="userData"></data-monitor-circle>
    </div>
  </el-card>
</template>

<script>
import DataMonitorCircle from "./DataMonitorCircle.vue";
export default {
  name: "",
  props: {
    id: {
      type: String,
      default: "tea",
    },
    title: {
      type: String,
      default: "教师",
    },
    userData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    DataMonitorCircle,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
