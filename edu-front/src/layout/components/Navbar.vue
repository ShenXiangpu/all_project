<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="hamburger-container" @click="reBack">
      <i class="el-icon-d-arrow-left" />返回
    </div>
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <div class="primaryColorb pointer marginRight20" @click="toManual">
        操作手册
      </div>
      <div class="message-container">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" @click="initActive">
            <el-badge
              :value="unreadCount"
              :hidden="unreadCount && unreadCount != '0' ? false : true"
              class="item"
            >
              <i class="el-icon-bell font20"></i>
            </el-badge>
          </span>
          <el-dropdown-menu slot="dropdown" class="el-dropdown-menu-edu">
            <el-tabs
              class="el-tabs-container"
              v-model="activeName"
              type="card"
              @tab-click="handleClick"
              style="width: 100%"
            >
              <el-tab-pane :label="`通知（${unreadMsg[0] || 0}）`" name="first">
                <div
                  v-if="noticeData && noticeData[0] && noticeData[0].length > 0"
                  class="tab-container"
                >
                  <div class="tab-container-content">
                    <div
                      @click="goToDetail(item.id)"
                      class="tab-container-item"
                      :class="item.msgStatus == 1 ? 'colord' : ''"
                      v-for="(item, index) in noticeData[0]"
                      :key="index"
                    >
                      <div class="tab-container-item-title font14">
                        {{ item.msgTitle }}
                      </div>
                      <div class="tab-container-item-text">
                        {{ item.msgInfo }}
                      </div>
                      <div class="tab-container-item-time">
                        {{ item.datetime }}
                      </div>

                      <div v-if="item && item.expired">{{ item.expired }}</div>
                    </div>
                  </div>

                  <div
                    class="tab-container-more text-center font14"
                    @click="goToMore"
                  >
                    查看更多
                  </div>
                </div>
                <div
                  v-else
                  class="flex flex-column justify-center align-center"
                  style="width: 100%; padding: 20px 0"
                >
                  <img
                    style="width: 50%"
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                  />
                  <div class="color9">您已读完所有通知</div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                :label="`告警（${unreadMsg[1] || 0}）`"
                name="second"
              >
                <div
                  v-if="noticeData && noticeData[1] && noticeData[1].length > 0"
                  class="tab-container"
                >
                  <div class="tab-container-content">
                    <div
                      @click="goToDetail(item.id)"
                      class="tab-container-item"
                      :class="item.msgStatus == 1 ? 'colord' : ''"
                      v-for="(item, index) in noticeData[1]"
                      :key="index"
                    >
                      <div class="tab-container-item-title font14">
                        {{ item.msgTitle }}
                      </div>
                      <div class="tab-container-item-text">
                        {{ item.msgInfo }}
                      </div>
                      <div class="tab-container-item-time">
                        {{ item.datetime }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="tab-container-more text-center font14"
                    @click="goToMore"
                  >
                    查看更多
                  </div>
                </div>
                <div
                  v-else
                  class="flex flex-column justify-center align-center"
                  style="width: 100%; padding: 20px 0"
                >
                  <img
                    style="width: 50%"
                    src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                    alt="not found"
                  />
                  <div class="color9">您已读完所有告警</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-image :src="avatar" fit="contain" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/" v-if="userRolesNames != '学生'">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <router-link to="/personalCenter">
            <el-dropdown-item
              :divided="userRolesNames != '学生' ? true : false"
            >
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import router from "@/router";
import settings from "@/settings";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "avatar",
      "name",
      "userRolesNames",
      "unreadMsg",
      "noticeData",
      "unreadCount",
    ]),
  },
  props: {},

  data() {
    return {
      isShowTab: false,
      activeName: "first",
      fromPath: "",
      toObj: {},
      fromObj: {},
    };
  },
  watch: {
    $route(to, from) {
      console.log("to", to, from);
      this.toObj = to;
      this.fromObj = from;
    },
  },
  methods: {
    toManual() {
      this.$router.push({ path: "/operationManual/operationManual" });
    },
    initActive() {
      this.isShowTab = true;
      setTimeout(() => {
        this.activeName = "first";
      }, 200);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    goToDetail(id) {
      window.location.href = `/newsMng/newsDetail?id=${id}`;
      // this.$router.push({ path: '/newsMng/newsDetail', query: { id } });
    },
    goToMore(id) {
      // window.location.href = `/newsMng/newsDetail?id=${id}`;

      this.$router.push({ path: `/newsMng/newsList` });
    },
    async logout() {
      // this.$router.push(`/login`);
      await this.$store.dispatch("user/logout").then(() => {
        location.reload(); //刷新页面
      });
    },
    reBack() {
      let userRolesNames = this.$store.state.user.userRolesNames;
      if (
        this.$router.history.current.path == "/attendClass/attendClass" &&
        userRolesNames == "学生"
      ) {
        this.$router.push({
          path: "/attendClass/attendClass",
        });
        return;
      } else {
        // // this.$router.back()
        // let toObj = this.toObj;
        // let fromObj = this.fromObj;
        // let activeName =
        //   (toObj && toObj.query && toObj.query.activeName) || "";
        //   debugger
        // if (activeName) {
        //   let queryObj = fromObj.query;
        //   this.$router.push({
        //     path: fromObj.path,
        //     query: {
        //       ...queryObj,
        //       activeName,
        //     },
        //   });
        // } else {
        //   this.$router.push();
        // }
        this.$router.back();
        // return;
        // this.$router.push();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #fff;
$primaryBg: rgb(0, 156, 170);

.el-icon-bell {
  color: #333;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  color: #333;

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    font-size: 14px;
    margin-right: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    padding-right: 10px;

    .name {
      min-width: 40px;
      max-width: 80px;
      padding-right: 20px;
      // color: $primaryColor;
    }

    .view-text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      width: 80%;
      text-overflow: ellipsis;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      // color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .message-container {
      margin-right: 30px;

      // width: 200px;
      ::v-deep {
        .el-badge__content.is-fixed {
          top: 10px;
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border-radius: 50%;
          border: 1px solid $primaryBg;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
}

.el-tabs-container {
  // color: $primaryBg;

  .tab-container {
    .tab-container-content {
      max-height: 300px;
      overflow: auto;
    }

    &-item:hover {
      cursor: pointer;
      background-color: #e6f7ff;
    }

    &-item {
      padding: 20px;
      border-bottom: 1px solid #ddd;

      &-title {
      }

      &-text {
        font-size: 12px;
        margin: 5px 0;
      }

      &-time {
      }
    }

    .colord {
      color: #ddd;
    }

    &-more:hover {
      cursor: pointer;
    }

    &-more {
      padding: 5px 0 0 0;
      box-shadow: 0px 0 10px #ddd;
    }
  }

  ::v-deep {
    .el-tabs__item {
      color: $primaryBg;
    }

    .el-tabs__item.is-active {
      color: $primaryBg;
      background: none;
    }

    .el-tabs__active-bar {
      background: $primaryBg;
      // width: 98px !important;
      // transform: translateX(20px) !important;
    }

    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }

    .el-tabs__item {
      // width: 118px;
      // display: block;
      padding: 0 20px;
      text-align: center;
    }
  }
}

.el-dropdown-menu-edu.el-dropdown-menu {
  width: 336px;
}
</style>
