<template>
  <div class="name-container">
    <div class="name-icon">{{ nameStr }}</div>
    <i
      v-if="status"
      :class="[icon.iconfont]"
      class="font14"
      :style="{ color: icon.iconClass }"
    ></i>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "NameIcon",
  props: {
    icon: {
      type: Object,
      default: () => {},
    },

    name: {
      type: String,
      default: "张三",
    },
    status: {
      type: Number | String,
      default: 0 | "",
    },
  },
  components: {},
  computed: {
    nameStr() {
      let name = this.name;
      const length = name.length;
      if (length > 2) {
        return name.substring(length - 2, length);
      }
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
