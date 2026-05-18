<template>
  <el-switch
    @change="updataAlarm(scope.row)"
    v-model="scope.row.enabled"
    v-loading="isCanClick"
    :disabled="isCanClick"
    active-text="启用"
    inactive-text="停用"
  >
  </el-switch>
</template>

<script>
import { deleteAlarmConfig, addOrUpdate } from "@/api/edu/cloud";
export default {
  name: "ElSwitchEdu",
  props: {
    scope: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  created() {},
  data() {
    return {
      isCanClick: false,
    };
  },
  methods: {
    updataAlarm(item) {
      let alarmEmails = item && item.alarmEmails;
      let index = alarmEmails && alarmEmails.indexOf(",");
      if (index != -1) {
        item.alarmEmails = alarmEmails && alarmEmails.split(",");
      } else {
        item.alarmEmails = [item.alarmEmails];
      }
      console.log(item);
      let items = {
        id: item.id,
        desc: item.desc,
        emails: [],
        enabled: item.enabled,
        interval: item.interval,
        levels: item.alarmLevel,
        name: item.alarmName,
        operator: item.alarmOperator,
        percent: item.alarmPercent,
        type: item.alarmType,
      };
      this.isCanClick = true;
      addOrUpdate(items).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警策略修改成功");
          this.$emit("queryAlarmConfigsBySchool");
          setTimeout(() => {
            this.isCanClick = false;
          }, 500);
        } else {
          this.$message.error("告警策略修改失败");
          this.isCanClick = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
