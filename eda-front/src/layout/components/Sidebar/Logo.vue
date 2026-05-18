<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" :to="toPage">
        <img v-if="logo" :src="logo" style="position: absolute; top:50%; transform: translateY(-50%);"
          class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" :to="toPage">
        <div class="flex flex-column justify-center align-center text-center sidebar-logo-link-div">
          <div class="text-logo">
            <img v-if="logo" :src="logo" style="margin: 0 6px 0 0;" class="sidebar-logo expand">
            <h1 class="sidebar-title font16">{{ title }} </h1>
          </div>
          <div class="head">
            <el-image class="img"  :src="head" fit="fit"></el-image>
          </div>
          <div class="welcome flex justify-center align-center font14">
            <div>{{ name }}</div>
          </div>
        </div>

      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import settings from '@/settings.js'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'userRolesNames'
    ]),
  },
  data() {
    return {
      title: settings.title || 'EDA云平台',
      nTitle: '',
      logo: require('../../../assets/img/zkxy_logo/zkxy.png'),
      head: require('../../../assets/img/head/head2.png'),
      toPage:'/'
    }
  }
}
</script>

<style lang="scss" scoped>
$common-color: #409EFF;

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 200px;
  line-height: 50px;
  // background: #2b2f3a;
  // background: #2b2f3a;
  // box-shadow: 10px 10px 10px $common-color;
  // text-align: center;
  overflow: hidden;

  .sidebar-logo-link-div {
    position: absolute;
    left: 50%;

    transform: translateX(-50%);
    top: -40%;
    width: 400px;
    height: 200px;
    border-radius: 0 0 200px 200px;
    // background: #03c1d3;
    background-image: linear-gradient(to top, #80adf0,#409EFF,#409EFF,#409EFF,#409EFF);
    // background: url('~@/assets/img/zkxy_logo/zkxy.png') no-repeat;

    .text-logo {
      margin-top: 50px;
    }

    .head {
      position: absolute;
      // left: -50%;
      bottom: -30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgb(33, 231, 245);
      border: 2px solid #fff;
      overflow: hidden;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .welcome {
      position: absolute;
      bottom: -80px;
      width: 200px;
      height: 50px;
      color: #fff;
      flex-wrap: wrap;

      .roleName {
        @extend .primaryColor;
        padding: 0px 2px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        font-size: 12px;
        background: #fff;
      }
    }
  }

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    position: relative;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin: 0 20px;
    }

    & .expand {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin: 0 12px 0 12px;
    }

    & .sidebar-title {
      // width: 100%;
      // height: 100%;
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      // font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    height: 100px;
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
