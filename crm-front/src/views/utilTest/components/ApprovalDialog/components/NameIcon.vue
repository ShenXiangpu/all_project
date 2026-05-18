<template>
  <div class="name-container">
    <div class="name-icon">{{ nameStr }}</div>
    <i :class="[iconfont]" class="font14" :style="{ color: iconClass }"></i>
  </div>
</template>

<script>
export default {
  name: "NameIcon",
  props: {
    iconfont: {
      type: String,
      default: "el-icon-success",
    },
    iconClass: {
      type: String,
      default: "rgb(7,186,86)",
    },
    name: {
      type: String,
      default: "张三",
    },
  },
  components: {},
  computed: {
    nameStr() {
      return this.name;
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$wdith: 50px;
$height: 50px;
.name-container {
  width: $wdith;
  height: $height;
  border-radius: 3px;
  background-color: #2a82e4;
  color: #fff;
  position: relative;

  .name-icon {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    line-height: $height;
  }
  i {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
