<template>
  <div class="app-container">
    <my-lab></my-lab>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import MyLab from "./myLab";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "labMng",
  components: {
    MyLab
  },
  props: {},
  data() {
    return {



    };
  },
  watch: {},
  computed: {

  },
  created() {
  },
  methods: {

  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {

  },

};
</script>

<style lang='scss' scoped>
$common-color: #10abb9;

::v-deep {
  .el-tab-lab {
    #tab-zero.el-tabs__item {
      padding: 0 20px;
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
  }
}

.border-container {
  ::v-deep {
    .left-circle {
      width: 16px;
      height: 32px;
      border-radius: 0 16px 16px 0;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 0 8px 8px 0;
        top: 6px;
      }
    }

    .right-circle {
      width: 16px;
      height: 32px;
      border-radius: 16px 0 0 16px;
      right: -2px;


      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 8px 0 0 8px;
        top: 6px
      }
    }
  }
}

.delete-el {
  position: absolute;
  right: 25px;
  top: 20px;
}

.choose-container {
  max-width: 700px;
  overflow: auto;

  .choose-item {
    // width: 50px;
    text-align: center;
    border: 1px solid $common-color;
    border-right: 0;



    // border-radius: 8px;

  }

  .no-active {
    .choose-item-container {
      width: 80px;
      // padding: 5px 10px;
      // height: 40px;
      // line-height: 40px;

      .item-text-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .container-text {
          height: 48px;
          line-height: 40px;
          font-size: 20px;
          color: #10abb9;
          line-height: 48px;
        }
      }
    }
  }

  .choose-item:hover {
    cursor: pointer;
  }

  .is-active {
    background-color: $common-color;
    min-width: 200px;

    color: #fff;

    .choose-item-container {
      min-width: 200px;
      // text-align: center;
      padding: 4px 10px;
      // height: 50px;
      font-size: 12px;

      .item-text-container {


        .container-text {
          height: 20px;
          // line-height: 20px;
        }
      }

    }
  }
}

@media screen and (max-width: 1440px) {
  .choose-container {
    max-width: 700px;
    overflow: auto;

    .choose-item {
      // width: 50px;
      text-align: center;
      border: 1px solid $common-color;
      border-right: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      // border-radius: 8px;

    }

    .no-active {
      .choose-item-container {
        width: 80px;
        // padding: 5px 10px;
        // height: 40px;
        // line-height: 40px;

        .item-text-container {


          .container-text {
            height: 60px;
            font-size: 20px;
            color: #10abb9;
            line-height: 60px;
          }
        }
      }
    }

    .choose-item:hover {
      cursor: pointer;
    }

    .is-active {
      background-color: $common-color;
      min-width: 200px;

      color: #fff;


      .choose-item-container {
        min-width: 200px;
        // text-align: center;
        padding: 4px 10px;
        // height: 50px;
        font-size: 12px;
        display: flex;

        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-text-container {


          .container-text {
            height: 20px;
            // line-height: 20px;
          }
        }

      }
    }
  }
}

.choose-item:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid $common-color;
}

.choose-item:first-child {
  border-radius: 4px 0px 0px 4px;
}


.color333 {
  color: #999;
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;

}

.marginRt30 {
  margin-right: 35px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.searchBarCard .el-form-item {
  margin-bottom: 0px
}

.marginTRL {
  margin: 20px 0px 10px 10px;


  .el-input-edu {
    width: 180px;
  }

  .width {
    width: 100px;
  }

}

.marginTop10 {
  ::v-deep {
    // .is-active {
    //     width: 100px;
    // }

    .el-radio-button__inner {
      width: 100%;
    }
  }

}


.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
    }

    // .el-dialog__footer {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 0px
    // }
  }

  &-form {
    width: 50%;
  }
}

.dialog-form {
  width: 100%;
}

.dialog-userContainer {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  max-height: 30vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}

::v-deep {
  .el-carousel__container {
    height: 50px;
  }
}

::v-deep {
  .el-input__count {
    right: 15px;
  }
}

.i-hover:hover {
  cursor: pointer;
}

.i-hoverD:hover {
  cursor: default;
}

.data-count {
  width: 160px;
  height: 80px;
  color: #000;
  font-weight: 700;
  border-radius: 10px;

  .data-count-num {
    font-size: 20px;
  }
}

.bg1 {
  color: rgb(29, 45, 133);
  background-image: linear-gradient(45deg, rgb(235, 237, 255), rgb(247, 247, 255), rgb(235, 237, 255));
}

.bg2 {
  color: rgb(24, 73, 98);
  background-image: linear-gradient(45deg, rgb(232, 247, 254), rgb(235, 248, 254), rgb(221, 241, 253));
}

.bg3 {
  color: rgb(16, 71, 62);
  background-image: linear-gradient(45deg, rgb(234, 252, 253), rgb(241, 254, 252), rgb(224, 251, 253));
}

.bg4 {
  color: rgb(11, 65, 9);
  background-image: linear-gradient(45deg, rgb(230, 250, 234), rgb(235, 251, 233), rgb(219, 247, 233));
}
</style>
