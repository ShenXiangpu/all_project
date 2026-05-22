import axios from 'axios'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: '/',
  timeout: 15000
})

// 请求拦截器：自动附加认证头
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['auth-token'] = userStore.token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { code, data, message } = res.data
    if (code === 200) {
      return data
    }
    // 401 未授权：清除 token 并跳转登录页
    if (code === 401) {
      const userStore = useUserStore()
      userStore.logout()
      // 避免在登录页重复跳转
      if (window.location.hash !== '#/login') {
        window.location.hash = '#/login'
      }
    }
    return Promise.reject(new Error(message || '请求失败'))
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
