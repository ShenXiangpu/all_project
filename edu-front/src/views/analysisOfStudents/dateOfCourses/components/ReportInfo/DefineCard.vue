<template>
  <div>
    <el-card shadow="hover" class="el-card-define-edu">
      <template #header>
        <div class="clearfix text-center font16 fontW7">
          {{ title }}
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$title-bg-color: #10abb9;
$content-bg-color: #94d8df;
::v-deep .el-card.el-card.el-card-define-edu {
  border: 2px solid $title-bg-color;

  .el-card__header {
    border-bottom: 2px solid $title-bg-color;
    background-color:  $title-bg-color;
    color: #fff;
  }
}
</style>
