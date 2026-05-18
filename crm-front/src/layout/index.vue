<template>
  <div
    :class="classObj"
    class="app-wrapper"
    style="min-width: 1200px; overflow: auto"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar
      v-if="this.$store.state.user.isScreenFull"
      :class="theme && theme.style == 2 ? 'sidebar-container' : 'sidebar-container sidebar-container-gradent'"
    />
    <!-- <sidebar class="sidebar-container" /> -->
    <div :class="this.$store.state.user.isScreenFull ? 'main-container' : ''">
      <!-- <div class="main-container"> -->
      <div
        v-if="this.$store.state.user.isScreenFull"
        :class="{ 'fixed-header': fixedHeader }"
      >
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>

      <!-- <div class="fixed-header">
        <navbar />
      </div> -->
      <app-main />

      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
// import RightPanel from "@/components/RightPanel";
import { Navbar, Sidebar, Settings, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import groupBy from "lodash/groupBy";
import { isEqual } from "lodash";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Settings,
    // RightPanel,
  },

  mixins: [ResizeMixin],
  data() {
    return {};
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    needTagsView() {
      return this.$store.state.settings.tagsView;
    },
    ...mapState({
      showSettings: (state) => state.settings.showSettings,
      theme: (state) => state.settings.theme,
    }),
  },
  created() {},

  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style></style>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

$primaryBg: var(--color);

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: $primaryBg;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 73px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
