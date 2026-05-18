<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="collapsed"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="logo">{{ collapsed ? 'CRM' : 'CRM 管理系统' }}</div>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuSelect"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="header">
        <div class="header-right">
          <n-dropdown trigger="click" :options="userOptions" @select="handleUserSelect">
            <n-button quaternary>{{ username }}</n-button>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout-content class="content" embedded>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  SettingsOutline,
  BookOutline,
  PeopleOutline,
  KeyOutline,
  ShieldOutline,
  ReaderOutline
} from '@vicons/ionicons5'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const collapsed = ref(false)

const username = computed(() => userStore.name || '管理员')

const iconMap = {
  SettingsOutline, BookOutline, PeopleOutline, KeyOutline, ShieldOutline, ReaderOutline
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(iconMap[icon]) })
}

const menuOptions = [
  { label: '字典管理', key: '/system/dict', icon: renderIcon('BookOutline') },
  { label: '菜单管理', key: '/system/menu', icon: renderIcon('SettingsOutline') },
  { label: '组织管理', key: '/system/org', icon: renderIcon('PeopleOutline') },
  { label: '权限管理', key: '/system/permission', icon: renderIcon('KeyOutline') },
  { label: '角色管理', key: '/system/role', icon: renderIcon('ShieldOutline') },
  { label: '用户管理', key: '/system/user', icon: renderIcon('ReaderOutline') }
]

const activeKey = computed(() => route.path)

function handleMenuSelect(key) {
  router.push(key)
}

const userOptions = [
  { label: '退出登录', key: 'logout' }
]

function handleUserSelect(key) {
  if (key === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.layout {
  height: 100vh;
}
.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #18a058;
  overflow: hidden;
  white-space: nowrap;
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;
  height: 48px;
  border-bottom: 1px solid #eee;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.content {
  padding: 16px;
  min-height: calc(100vh - 48px);
  background: #f5f7fa;
}
</style>
