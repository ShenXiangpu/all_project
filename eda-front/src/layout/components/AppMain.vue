<template>
  <section :class="this.$store.state.user.isScreenFull ? 'app-main-full' : 'app-main'">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <!-- <div class="app-main-footer"  v-if="this.$store.state.user.isScreenFull"></div> -->

  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* max-height: calc(100vh - 50px); */
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
}

.app-main-full {
  /*50 = navbar  */
  max-height: calc(100vh - 50px);
  /* height: 100vh; */
  width: 100%;
  position: relative;
  overflow: auto;
}

.app-main-footer {
  width: 100%;
  height: 50px;
  /* position: absolute;
  bottom: 0px; */
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
