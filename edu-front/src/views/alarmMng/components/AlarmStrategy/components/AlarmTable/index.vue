<template>
  <table border class="table-container">
    <thead>
      <tr>
        <th></th>
        <th colspan="3">告警参数</th>

        <th colspan="2">持续时间</th>
      </tr>
    </thead>
    <table-tr-td alarmName="1" />
    <table-tr-td alarmName="2"/>
  </table>
</template>

<script>
import TableTrTd from "./components/TableTrTd.vue";
export default {
  name: "AlarmTable",
  components: {
    TableTrTd,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.table-container {
    width: 500px;
    border: 1px solid #C0C4CC;
}
</style>
