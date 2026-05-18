<template>
  <div id="app" :class="bg" style="overflow: auto">
    <router-view />
  </div>
</template>

<script></script>

<script>
import store from "./store";
import fullRoutes from "./utils/fullRoutes";
import { isEqual } from "lodash";
import $ from "jquery";
window.jQuery = $;

// (function noDebuger() {
//   console.log('执行了吗');
//   debugger
//   function testDebuger() {
//     var d = new Date();
//     debugger;
//     if (new Date() - d > 10) {
//       document.body.innerHTML = "<div>年轻人，不要太好奇</div>";
//       return true;
//     }
//     return false;
//   }

//   function start() {
//     while (testDebuger()) {
//       testDebuger();
//     }
//   }
//   if (!testDebuger()) {
//     window.onblur = function () {
//       setTimeout(function () {
//         start();
//       }, 500);
//     };
//   } else {
//     start();
//   }
// })();

export default {
  name: "App",
  watch: {
    $route(route) {
      //监听路由
      // 如果是首页隐藏侧边栏和顶部。否则显示
      let urlName = route.name;
      if (fullRoutes.indexOf(urlName) == -1) {
        store.commit("user/SET_SCREEN_FULL", true);
      } else {
        store.commit("user/SET_SCREEN_FULL", false);
      }
    },
  },
  mounted() {
  },
  data() {
    return {
      bg: "bg",
    };
  },

  methods: {

  },
};
</script>
<style lang="scss">
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

.el-select-dropdown__item {
  background: #fff !important;
}

.el-select-dropdown__item.selected {
  color: #10abb9 !important;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  font-weight: 700;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #10abb9;
}

.el-select .el-input .el-select__caret {
  color: #10abb9;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: #10abb9;
  font-weight: 700;
}

.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: #10abb9;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #10abb9;
}

.el-tooltip__popper.is-dark {
  background: #10abb9 !important;
  color: #fff !important;
  border-color: #10abb9 !important;
}

.el-tooltip__popper .popper__arrow,
.el-tooltip__popper .popper__arrow::after {
  /* color: rgb(0, 156, 170) !important;
  background: rgb(0, 156, 170) !important; */
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  /* border-color: transparent; */
  border: 0px solid #10abb9;
  border-style: solid;
}

// .el-switch__label.is-active {
//   color: #13ce66;
// }

// .el-switch.is-checked .el-switch__core {
//   border-color: #13ce66;
//   background-color: #13ce66;
// }

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #10abb9;
  border-color: #10abb9;
  color: #fff;
}

.el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
  background-color: #a5b9bb;
  border-color: #a5b9bb;
  box-shadow: -1px 0 0 0 #a5b9bb;
}

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  box-shadow: -1px 0 0 0 #10abb9;
}

.el-radio-button__inner:hover {
  color: #10abb9;
}

.el-radio__input.is-checked .el-radio__inner,
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #10abb9;
  background: #10abb9;
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #10abb9;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #10abb9;
}

.el-checkbox__inner:hover {
  border-color: #10abb9;
}

.el-checkbox .el-checkbox__inner.is-focus {
  border-color: #10abb9 !important;
}

.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
  border-left-color: #10abb9 !important;
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #10abb9 !important;
  border-color: #10abb9 !important;
  color: #fff !important;
  box-shadow: -0.01rem 0 0 0 #c3e0e2;
}

.el-checkbox-button__inner:hover {
  color: #10abb9 !important;
}

.el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: #10abb9 !important;
}



.el-input-number .focusing {
  border-color: #10abb9 !important;
}

.el-step__title {
  line-height: 30px !important;
}

.el-step__title.is-finish {
  color: #10abb9 !important;
}

.el-step__head.is-finish {
  border-color: #10abb9 !important;
}

.el-step__head {
  display: flex;
  justify-items: center;
}


.el-popconfirm__action .el-button--text {
  color: #10abb9;
  background-color: #fff;
  border: none;
}

.el-tag {
  background: rgba(16, 171, 185, 0.1) !important;
  color: #10abb9;
  border: none;
}

.el-tooltip__popper.is-define {
  background-color: #fff;
  border: 1px solid #c1c5c6;
}
</style>

<style scoped lang="scss">
$common-color: #10abb9;

.fontColor {
  font-weight: 700;
}

::v-deep {
  .el-button--primary {
    background: $common-color;
    border: 1px solid $common-color;
    color: #fff;
  }

  .el-button--primary.is-disabled:hover {
    background: #6b979b;
    border-color: #5b9196;
  }

  .el-button--primary.is-disabled {
    background: #5b9196;
    border-color: #5b9196;
  }

  .el-tabs__item {
    // padding: 0 20px;
    font-weight: 700;
  }

  #tab-first.el-tabs__item {
    padding: 0 20px;
    // font-weight: 700;
  }

  .el-tabs__item.is-active {
    background: $common-color;
    color: #fff;
    padding: 0 20px;
    border-radius: 4px;
  }

  .el-tabs__active-bar {
    background: $common-color;
    color: #fff;
  }

  .el-tabs__item:hover {
    color: $common-color;
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
      color: $common-color;
    }

    .el-loading-text {
      color: $common-color;
    }
  }
}

::v-deep {
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
      background: $common-color;
      border-color: $common-color;
    }
  }
}
</style>
