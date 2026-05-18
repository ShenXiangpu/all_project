<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link" :to="toPage">
        <el-image v-if="logo" :src="logo" fit="contain"
          style="position: absolute; top: 50%; transform: translateY(-50%)" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </div>
      <div v-else key="expand" class="sidebar-logo-link" :to="toPage">
        <div class="flex flex-column justify-center align-center text-center sidebar-logo-link-div">
          <div class="text-logo">
            <el-image v-if="logo" :src="logo" fit="contain" style="margin: 0 6px 0 0" class="sidebar-logo expand" />
            <h1 class="sidebar-title font16">{{ title }}</h1>
          </div>
          <div class="head">
            <el-image class="img" :src="avatar" fit="contain"></el-image>
          </div>
          <div class="welcome flex justify-center align-center font14">
            <div>{{ name }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import settings from "@/settings.js";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["name", "avatar", "userRolesNames"]),
  },
  data() {
    return {
      title: "客户管理平台" || settings.title,
      nTitle: "",
      logo: require("../../../assets/img/logo/logo1.png"),
      // logo:'https://dev.chip-cloud.com/static/company-logo.36cf164d.png'
      toPage:
        this.$store.state.user.userRolesNames == "学生"
          ? "/attendClass/attendClass"
          : "/",
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
