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
/**.el-menu 颜色
$menuBg:#10abb9;

*/
/* 
  有二级菜单的一级菜单鼠标hover事件
*/
#app .sidebar-container .el-submenu__title:hover {
  background: #fff !important;
  color: #10abb9 !important;
}

#app .sidebar-container .el-submenu__title:hover i {
  color: #10abb9 !important;
}

/*
二级菜单展开样式
*/
#app .sidebar-container .el-submenu .el-menu-item {
  background-color: rgb(255, 255, 255) !important;
  color: #10abb9 !important;
  min-width: 100px !important;
}


/*
  只有一级菜单时,鼠标hover样式
*/
#app .sidebar-container .submenu-title-noDropdown:hover {
  background-color: #fff !important;
  color: #10abb9 !important;
}

.submenu-title-noDropdown {
  border-radius: 10px !important;
}

#app .sidebar-container .el-submenu .el-menu-item:hover {
  background-color: #ffffff !important;
  color: #10abb9 !important;

}

.el-submenu__title i {
  color: #fff;
}



/* #app .hideSidebar .submenu-title-noDropdown {
  background-color:rgb(0, 156, 170) !important;
  color: #fff !important;
} */
.el-menu-item {
  background-color: #10abb9 !important;
  /* padding: 8px !important; */
  color: #ffffff;
}

.el-menu--vertical .el-menu-item.is-active {
  background-color: #fff !important;
}

.el-menu--vertical .el-menu-item:hover {
  background-color: #ffffff !important;
  color: #10abb9 !important;

}





.el-menu-item .is-opened {
  background-color: #10abb9 !important;
  padding: 8px !important;
}

.scrollbar-wrapper {
  padding: 0px 10px 150px 10px !important;
  
}

.el-submenu__title i {
  color: #fff;
}

#app .sidebar-container .el-submenu .el-menu-item.is-active {
  color: #409EFF !important;
  font-weight: 700;
}

.el-menu .el-menu-item.submenu-title-noDropdown {
  color: #fff !important;
}
</style>
<style lang="scss" scoped>
$menuColor: #10abb9;
$checkMenuColor: #10abb9;
$menuColorCheck: #fff;
// $checkColor: #f2b146;

::v-deep {
  .el-menu .is-active {
    border-radius: 10px;
    background: $menuColorCheck !important;
  }

  .el-menu {
    background: none !important;
    padding: 0 0 10px 0;

    .el-submenu {
      background: $menuColorCheck;
      border-radius: 10px;
      .el-menu-item {
        min-width: 100px;
        font-size: 16px;
      }

      margin: 10px 0px 20px 0;

      .el-submenu__title:hover {
        background: $menuColorCheck !important;
        border-radius: 10px !important;
      }

      .el-submenu__title {
        border-radius: 10px !important;
        color: $menuColorCheck !important;
        font-size: 16px;
      }
    }

    .el-submenu.is-opened {
      background: $menuColorCheck;
      padding: 8px !important;
      border-radius: 10px;

      .el-submenu__title {
        background: $menuColor !important;
        border-radius: 10px;
      }
    }

    .el-menu-item.is-active {
      color: $checkMenuColor !important;
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
    font-size: 16px;
  }
}
</style>
