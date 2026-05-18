<template>
  <div id="app" :class="bg" style="overflow: auto" :style="{ '--color': defaultTheme || '#10abb9' }">
    <!-- <theme-picker @change="themeChange" v-show="false" /> -->
    <router-view />
  </div>
</template>

<script>
import store from "./store";
import fullRoutes from "./utils/fullRoutes";
export default {
  name: "App",
  components: {
  },
  watch: {
    $route(route) {
      //监听路由
      // 如果是首页隐藏侧边栏和顶部。否则显示
      let urlName = route.name;
      console.log(urlName);
      if (fullRoutes.indexOf(urlName) == -1) {
        store.commit("user/SET_SCREEN_FULL", true);
      } else {
        store.commit("user/SET_SCREEN_FULL", false);
      }
    },
  },
  computed: {
    defaultTheme() {

      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },

  mounted() {
    // if (localStorage.getItem("theme")) {
    //   this.themeChange(
    //     localStorage.getItem("theme"),
    //     localStorage.getItem("style")
    //   );
    // }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch("settings/changeSetting", {
        key: "theme",
        value: { color: val, style: localStorage.getItem("style") || 1 },
      });
    },
  },
  created() { },
  data() {
    return {
      bg: "bg",
    };
  },
};
</script>
<style lang="scss">
// @import "@/styles/variables.scss";
body,
html {
  width: 100%;
  height: 100%;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}

body {
  padding-right: 0 !important;
  min-height: 700px;
  min-width: 700px;
  /* overflow: auto; */
}

//处理chrome浏览器时间框样式
.el-range-input {
  background: #fff;
  -webkit-background: #fff;
}

.el-select-dropdown__item {
  background: #fff !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  font-weight: 700;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: var(--color);
  font-weight: 700;
}

.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: var(--color);
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: var(--color);
}

// .el-tooltip__popper.is-dark {
//   background: var(--color) !important;
//   color: #fff !important;
//   border-color: var(--color) !important;
// }

.el-tooltip__popper .popper__arrow,
.el-tooltip__popper .popper__arrow::after {
  /* color: rgb(0, 156, 170) !important;
  background: rgb(0, 156, 170) !important; */
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  // /* border-color: transparent; */
  border: 0px solid var(--color);
  border-style: solid;
}

.el-switch__label.is-active {
  color: #13ce66;
}

.el-switch.is-checked .el-switch__core {
  border-color: #13ce66;
  background-color: #13ce66;
}

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: var(--color);
  border-color: var(--color);
  color: #fff;
}

.el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
  background-color: #a5b9bb;
  border-color: #a5b9bb;
  box-shadow: -1px 0 0 0 #a5b9bb;
}

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  box-shadow: -1px 0 0 0 var(--color);
}

.el-radio-button__inner:hover {
  color: var(--color);
}


.el-checkbox__input.is-checked+.el-checkbox__label {
  color: var(--color);
}

.el-radio__input.is-checked+.el-radio__label {
  color: var(--color);
}

.el-checkbox__inner:hover {
  border-color: var(--color);
}

.el-checkbox .el-checkbox__inner.is-focus {
  border-color: var(--color) !important;
}

.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
  border-left-color: var(--color) !important;
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: var(--color) !important;
  border-color: var(--color) !important;
  color: #fff !important;
  box-shadow: -0.01rem 0 0 0 #c3e0e2;
}

.el-checkbox-button__inner:hover {
  color: var(--color) !important;
}

.el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: var(--color) !important;
}

.el-input-number .focusing {
  border-color: var(--color) !important;
}

.el-step__title {
  line-height: 30px !important;
}

.el-step__icon {
  color: var(--color) !important;
}

.el-step__head {
  display: flex;
  justify-items: center;
}

.el-step__head.is-finish {
  color: var(--color) !important;
  border-color: var(--color) !important;
}

.el-step__title.is-finish {
  color: var(--color) !important;
  border-color: var(--color) !important;
}

/* .el-popconfirm__action .el-button--primary,
.el-button--text {
  color: #FFF;
  background-color: #f56c6c;
  border-color: #f56c6c;
} */

.el-popconfirm__action .el-button--text {
  border: none;
}

.el-tag {
  background: rgba(16, 171, 185, 0.1) !important;
  border: none;
}

.el-tooltip__popper.is-define {
  background-color: #fff;
  border: 1px solid #c1c5c6;
}

.el-dialog {
  border-radius: 4px;

  .el-dialog__header {
    border-radius: 4px 4px 0 0;
    padding: 10px 20px;
    background-color: rgb(233, 233, 233);

    .el-dialog__title {
      color: #333;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }

  .el-button--primary {
    background: var(--color);
    border-color: var(--color);
  }
}
</style>

<style scoped lang="scss">
// @import "@/styles/variables.scss";

.fontColor {
  font-weight: 700;
}

::v-deep {
  .el-button--primary {
    background: var(--color);
    border: 1px solid var(--color);
    color: #fff;
  }

  // .el-button--primary.is-disabled:hover {
  //   background: #6b979b;
  //   border-color: #5b9196;
  // }

  // .el-button--primary.is-disabled {
  //   background: #5b9196;
  //   border-color: #5b9196;
  // }
  .el-tabs__item {
    // padding: 0 20px;
    font-weight: 700;
  }

  #tab-first.el-tabs__item {
    padding: 0 20px;
    // font-weight: 700;
  }

  #tab-zero.el-tabs__item {
    padding: 0 20px;
    // font-weight: 700;
  }

  .el-tabs__item.is-active {
    background: var(--color);
    color: #fff;
    padding: 0 20px;
    border-radius: 4px;
  }

  .el-tabs__active-bar {
    background: var(--color);
    color: #fff;
  }

  .el-tabs__item:hover {
    color: var(--color);
  }

  .el-tabs__item.is-active:hover {
    color: #fff;
  }

  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
}

.tox-tinymce-aux {
  z-index: 3300 !important;
}

//全局修改loading
::v-deep {
  .el-loading-mask {
    .el-icon-loading {
      color: var(--color);
    }

    .el-loading-text {
      color: var(--color);
    }
  }
}
</style>
