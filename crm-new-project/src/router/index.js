import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/system/menu',
    children: [
      { path: 'system/dict', name: 'Dict', component: () => import('@/views/system/dict/index.vue') },
      { path: 'system/menu', name: 'Menu', component: () => import('@/views/system/menu/index.vue') },
      { path: 'system/org', name: 'Org', component: () => import('@/views/system/org/index.vue') },
      { path: 'system/permission', name: 'Permission', component: () => import('@/views/system/permission/index.vue') },
      { path: 'system/role', name: 'Role', component: () => import('@/views/system/role/index.vue') },
      { path: 'system/user', name: 'User', component: () => import('@/views/system/user/index.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('crm_token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
