import { defineStore } from 'pinia'
import { login as loginApi, getInfo as getInfoApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('crm_token') || '',
    name: '',
    avatar: '',
    roles: [],
    userId: null
  }),
  actions: {
    async login(loginForm) {
      const data = await loginApi(loginForm)
      // data = { token: 'xxx' } (unwrapped by interceptor)
      this.token = data.token
      localStorage.setItem('crm_token', data.token)
    },
    async getInfo() {
      const data = await getInfoApi()
      this.name = data.name
      this.avatar = data.avatar
      this.roles = data.roles
      this.userId = data.userId
      return data
    },
    logout() {
      this.token = ''
      this.name = ''
      this.avatar = ''
      this.roles = []
      this.userId = null
      localStorage.removeItem('crm_token')
    }
  }
})
