import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: { template: '<h1 style="text-align:center;margin-top:100px">欢迎进入系统</h1>' }
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
