<template>
  <div class="app-container">
    <el-tabs class="el-tab-edu" v-model="type" @tab-click="handleClick">
      <el-tab-pane label="告警策略" name="AlarmStrategy"></el-tab-pane>
      <el-tab-pane label="告警列表" name="AlarmList"></el-tab-pane>
    </el-tabs>
    <component :is="type"></component>
  </div>
</template>

<script>
import AlarmList from "./components/AlarmList";
import AlarmStrategy from "./components/AlarmStrategy";

export default {
  name: "AlarmMng",
  components: { AlarmList, AlarmStrategy },
  created() {
    let type = this.$route.query.type;
    if (type) {
      this.type = type;
    }
  },
  data() {
    return {
      type: "AlarmStrategy",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

::v-deep {
  .el-tab-edu {
    #tab-AlarmList.el-tabs__item {
      padding: 0 20px;
    }
    #tab-AlarmStrategy.el-tabs__item {
      padding: 0 20px;
    }

    .el-tabs__item.is-active {
      background: $common-color;
      color: #fff;
      padding: 0 20px;
      border-radius: 4px;
    }

    .el-tabs__active-bar {
      background: $common-color;
      color: #fff;
    }

    .el-tabs__item:hover {
      color: $common-color;
    }

    .el-tabs__item.is-active:hover {
      color: #fff;
    }
  }
}
</style>
