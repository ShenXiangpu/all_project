<template>
  <div>
    <el-card shadow="hover" class="el-card-define-edu">
      <template #header>
        <el-popover :title="title" placement="top" width="210" trigger="hover">
          <div>
            <div v-html="overall[title]"></div>
          </div>
          <div slot="reference" class="bgColor primaryColorw p-2 font16">
            <i class="el-icon-question primaryColorw"></i> {{ title }} :
            <span :class="evaluateColor[evaluate]">{{ evaluate }} </span>
          </div>
        </el-popover>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
import { overall } from "@/utils/html";
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: "",
    },
    evaluate: {
      type: String,
      default: "",
    },
  },
  components: {},
  created() { },
  data() {
    return {
      overall,

      evaluateColor: {
        "靠前": "primaryColorr",
        "较为靠前": "primaryColoro",
        "中等偏上": "primaryColorg",
        "中等偏下": "primaryColory",
        "靠后": "color9",
      }
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$title-bg-color: #10abb9;
$content-bg-color: #94d8df;

::v-deep .el-card.el-card.el-card-define-edu {
  border: 2px solid $title-bg-color;

  .el-card__header.el-card__header {
    border-bottom: 2px solid $title-bg-color;
    background-color: $title-bg-color;
    color: #fff;
    padding: 6px;
  }
}

.bgColor {
  background-color: $title-bg-color;
}

.contentBgColor {
  background-color: $content-bg-color;
}

.mb-1 {
  margin-bottom: 1px;
}

.p-2 {
  padding: 6px;
}
</style>
