<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="(route, index) in permission_routes" :key="index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style >

</style>
<style lang="scss" scoped>

::v-deep {
  .el-menu .is-active {
    border-radius: 10px;
    // background: $menuColorCheck !important;
  }

  .el-menu {
    // background: none !important;

    .el-submenu {
      // background: $menuColorCheck;
      border-radius: 10px;
      padding: 0;
      .el-menu-item {
        min-width: 100px;
        font-size: 16px;
      }

      margin: 0px 0px 10px 0;

      .el-submenu__title:hover {
        // background: $menuColorCheck !important;
        border-radius: 10px !important;
      }

      .el-submenu__title {
        border-radius: 10px !important;
        // color: $menuColorCheck !important;
        font-size: 16px;
      }
    }

    .el-submenu.is-opened {
      // background: $menuColorCheck;
      padding: 8px !important;
      border-radius: 10px;

      .el-submenu__title {
        // background: $menuColor !important;
        border-radius: 10px;
      }
    }

    .el-menu-item.is-active {
      // color: $checkMenuColor !important;
    }

    .nest-menu {
      height: 52px;

      .el-menu-item {
        padding-left: 40px !important;
        padding-right: 0 !important ;
        font-size: 16px;
      }
    }
  }
  .el-menu-item {
    font-size: 16px !important;
  }
}
</style>
