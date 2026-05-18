import axios from 'axios'
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: '/',
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Auth-token'] = userStore.token
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (res) => {
    const { code, data, message } = res.data
    if (code === 200) {
      return data
    }
    return Promise.reject(new Error(message || '请求失败'))
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
