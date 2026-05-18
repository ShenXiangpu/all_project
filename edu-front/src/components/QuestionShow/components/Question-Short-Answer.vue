<template>
  <div>
    <el-card class="el-card-question marginBottom20">
      <template #header>
        参考答案
      </template>
      <div class="v-html" v-html="answers && answers[0] && answers[0].content"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  props:{
    answers:{
      type:Array,
      default(){
        return []
      }
    }
    
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(26, 217, 102);
$gray: rgb(244, 244, 244);

::v-deep {
  .el-card-question {
    .el-card__header {
      padding: 10px;
      font-size: 16px;
      color: #fff;
      background: $green !important;
    }

    .v-html {
      max-width: 100%;
    }
  }

}
</style>