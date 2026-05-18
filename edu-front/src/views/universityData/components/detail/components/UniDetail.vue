<template>
  <el-card class="el-card-edu">
    <div class="title primaryBgColor font20 fontW7">{{ tableItem.universityName || "-" }}</div>
    <div class="info flex justify-start">
      <div class="marginRight20">类型：{{ tableItem.type || "-" }}</div>
      <div class="marginRight20">人数：{{ tableItem.userNum || 0 }}人</div>
      <div class="marginRight20">课程数量：{{ tableItem.courseNum || 0 }}个</div>
      <div class="marginRight20">虚拟机数量：{{ tableItem.vmNum || 0 }}个</div>
      <div class="marginRight20">状态：<span :class="tableItem.status == 1 ? 'primaryColorg' : 'primaryColor9'">
          {{ tableItem.status == 1 ? '启用' : '停用' }}
        </span></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UniDetail',
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {

  },
  created() {

  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-card-edu {
  position: relative;


  .title {
    font-weight: 500;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    width: 200px;
    text-align: center;
    border-radius: 0 0 10px 10px;
    color: #fff;
    z-index: 1000;
  }

  .info {
    margin-top: 30px;
    font-size: 14px;
    color: #666;
  }
}
</style>
