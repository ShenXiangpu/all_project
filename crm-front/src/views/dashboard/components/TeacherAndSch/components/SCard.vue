<template>
  <div
    class="s-card-container flex justify-center align-center"
    :class="backChoose == 1 ? 'back1' : 'back2'"
    :style="{ '--color': defaultTheme || '#10abb9' }"
  >
    <div class="flex flex-column align-center">
      <div class="font14 marginBottom5" style="position: relative">
        <el-tooltip
          class="item"
          effect="dark"
          :content="titleName"
          placement="top-start"
        >
          <div
            class="marginBottom5 text-center view-text"
            :class="isShow ? 'text-width' : ''"
          >
            {{ titleName }}
          </div>
        </el-tooltip>
        <div class="icon-container" v-if="isShowIcon">
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            :content="iconContent"
          >
            <i class="el-icon-question" slot="reference"></i>
          </el-popover>
        </div>
      </div>

      <div class="width view-text text-center" v-if="type == 2">
        <span class="font16 fontW7"
          >{{ num }}{{ unit || "" }} / {{ total || total == "0" ? total : "--"
          }}{{ total || total == "0" ? unit : "" }}</span
        >
      </div>
      <div v-if="type == 1">
        <el-tooltip
          class="item"
          :content="`${num}${unit || ''}`"
          placement="top-start"
        >
          <span class="font16 fontW7">{{ num }}</span>
        </el-tooltip>
        <span class="font16 text-center">{{ unit || "" }}</span>
      </div>
    </div>

    <el-progress
      v-if="isShow && type == 1"
      type="circle"
      :stroke-width="14"
      class="el-progress-edu"
      :percentage="Number(percentage)"
      :color="customColors"
    ></el-progress>

    <el-progress
      v-if="isShow && percentage && type == 2"
      type="circle"
      :stroke-width="14"
      class="el-progress-edu"
      :percentage="Number(percentage)"
      :color="customColors"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name: "",
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  props: {
    iconContent: {
      default: "",
      type: String,
    },
    isShowIcon: {
      default: false,
      type: Boolean,
    },
    isShow: {
      default: false,
      type: Boolean,
    },
    backChoose: {
      type: Number,
      default: 1,
    },

    titleName: {
      type: String,
      default: "标题",
    },
    num: {
      type: Number | String,
      default: 0 | "0",
    },
    total: {
      type: Number | String,
      default: 0 | "0",
    },
    unit: {
      type: String,
      default: "",
    },
    percentage: {
      type: Number | String,
      default: 0 | "0",
    },
    type: {
      type: Number | String,
      default: 1 | "1",
    },
  },
  components: {},
  created() {},
  data() {
    return {
      customColors: [
        { color: "#409EFF", percentage: 20 },
        { color: "#409EFF", percentage: 40 },
        { color: "#409EFF", percentage: 60 },
        { color: "#409EFF", percentage: 80 },
        { color: "#f00", percentage: 100 },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.back1 {
  background-image: linear-gradient(
    to bottom,
    rgb(225, 249, 249),
    rgb(239, 252, 252),
    rgb(255, 255, 255)
  );
}
.back2 {
  background-image: linear-gradient(
    to bottom,
    rgb(252, 239, 195),
    rgb(253, 246, 221),
    rgb(255, 255, 255)
  );
}
.s-card-container {
  width: 160px;

  color: #636ab1;
  padding: 10px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #dcdfe6;

  .marginBottom5 {
    margin-bottom: 5px;
  }
  .text-width {
    width: 84px;
  }

  .el-progress-edu {
    margin-left: 20px;
    ::v-deep {
      .el-progress-circle {
        width: 60px !important;
        height: 60px !important;
      }
      .el-progress__text {
        font-size: 14px !important;
      }
    }
  }
  .width {
    max-width: 140px;
  }

  .icon-container {
    position: absolute;
    right: -20px;
    top: 0px;
  }
}

@media screen and (max-width: 1600px) {
  .s-card-container {
    min-width: 160px;
    height: 100px;
    margin-top: 10px;
    font-size: 18px;
  }
}
</style>
