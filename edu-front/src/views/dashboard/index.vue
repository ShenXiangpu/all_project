<template>
  <div>
    <component :is="userDashboard" />
  </div>
</template>

<script>
import TeacherAndSch from "./TeacherAndSch";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    TeacherAndSch,
  },
  created() { },
  computed: {

    userDashboard() {
      return "TeacherAndSch"
    },
  },
  mounted() {},
  destroyed() { }, //生命周期 - 销毁完成
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style></style>

<style lang="scss" scoped>
::v-deep {
  .el-card {
    .el-card__header {
      border-bottom: none;
      // padding: 0;

      span {
        font-size: 18px;
        font-weight: 700;
      }
    }

    .el-card__body {
      padding-top: 0px;
      // background-color: rgb(242, 248, 252);
    }
  }
}
</style>
