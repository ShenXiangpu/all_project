import axios from 'axios'
import router from '@/router'
import store from '@/store'
import messageup from './resetMessaeg'
import { getToken, } from '@/utils/auth'
import {  removeAllClients } from '@/utils/websocket'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// let isRefreshing = false

const service = axios.create({
  baseURL: '/',
  timeout: 50000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Auth-token'] = getToken()
      config.headers['_t'] =  new Date().getTime()
    }
    // let url = config.url
    // if (url.indexOf('?') !== -1) {  // 判定http url上是否存在'?'(即是否存在参数，一般get请求url上都拼接有参数)
    //   config.url = url + '&iot_time=' + new Date().getTime() // 请求后添加时间戳，保证每次请求都是最新请求
    // } else {
    //   config.url = url + '?iot_time=' + new Date().getTime() // 请求后添加时间戳，保证每次请求都是最新请求
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let refreshing = false,// 正在刷新标识，避免重复刷新
  waitQueue = [] // 请求等待队列

service.interceptors.response.use(
  (res) => {
    const { data, headers } = res
    const { flag, errMessage, message, errCode } = data
    if (flag) {
      return data
    } else if (data instanceof Blob) {  // 文件下载接口返回为Blob数据结构
      let result = {
        data,
        headers
      };
      return result;
    }
    else {
      if (errCode === 'A0230') { // access_token过期，尝试续期token
        // MessageBox('当前页面已失效，请重新登录?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   localStorage.clear();
        //   window.location.href = '/';
        // });
        removeAllClients()
        messageup({
          message: '当前页面已失效，请重新登录',
          showClose: true,
          type: 'error'
        })
        store.dispatch('user/toReLogin').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(errMessage || 'Error'))
      } else if (errCode === 'A0233') { // token被禁止访问，添加到黑名单，跳转至登录页
        removeAllClients()
        messageup({
          message: errMessage,
          showClose: true,
          type: 'error'
        })
        store.dispatch('user/toReLogin').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(errMessage || 'Error'))

      } else if (errCode === 'A0202' || errCode === 'A0201') { // token被禁止访问，添加到黑名单，跳转至登录页
        removeAllClients()

        messageup({
          message: errMessage,
          showClose: true,
          type: 'error'
        })
        store.dispatch('user/toReLogin').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(errMessage || 'Error'))

      }else if (errCode === 'A0233') { // token被禁止访问，添加到黑名单，跳转至登录页
        removeAllClients()

        messageup({
          message: 'token已被禁止访问',
          showClose: true,
          type: 'error'
        })
        store.dispatch('user/toReLogin').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(errMessage || 'Error'))
      } else if (errCode === 'A0303') {
        messageup({
          message: errMessage || '系统出错',
          showClose: true,
          type: 'error'
        })
        return Promise.reject(new Error(errMessage || 'Error'))
      } else if (errCode === 'A0300') {
        messageup({
          message: '访问权限异常',
          showClose: true,
          type: 'error'
        })
        return Promise.reject(new Error(errMessage || 'Error'))
      } else if (errCode === 'A0304') {
        removeAllClients()
        messageup({
          message: '该账号已在其他同类设备登录，如非本人操作，则密码可能已经泄露，建议立即更换密码',
          showClose: true,
          type: 'error'
        })
        store.dispatch('user/toReLogin').then(() => {
          location.reload()
        })
      } else {
        messageup({
          message: errMessage || '系统出错',
          showClose: true,
          type: 'error'
        })

      }
    }
  },
  error => {
    
    const { errCode, errMessage } = error.response.data
    messageup({
      message: errMessage || error || '系统出错',
      showClose: true,
      type: 'error'
    })
    // router.push({ path: "/" });
    // Message({
    //   message: '访问权限异常',
    //   type: 'error'
    // })
    // Message({
    //   message: error || '系统出错',
    //   type: 'error'
    // })
    // return Promise.reject(new Error(error || 'Error'))
  }
)
export default service
