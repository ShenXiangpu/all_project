import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css';

import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n 国际化
import vueParticles from 'vue-particles'
import Vcomp from './components/index'

import '@/styles/index.scss' // global css
// import'lib-flexible/flexible.js';
import './utils/rem'

import App from './App'
import store from './store'
import router from './router'

// import 'default-passive-events'




import '@/assets/styles/base.scss'
import '@/assets/iconfont/iconfont.css'
import '@/assets/styles/common.scss'
import 'qweather-icons/font/qweather-icons.css'
// import '@/assets/iconfont/iconfont.css'

import '@/icons' // icon
import '@/permission' // permission control

import moment from 'moment'
Vue.prototype.$moment = moment
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

import dataV from '@jiaminghi/data-view'


import permission from './directive/permission/index'

import watermarker from './directive/watermarker/index'

import '@/utils/websocket' // 全局引入 WebSocket 通讯组件


import uploader from 'vue-simple-uploader'
import axios from 'axios'
axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 6000;
Vue.prototype.$http = axios
Vue.use(uploader)


Vue.use(permission)
Vue.use(watermarker)

Vue.use(dataV)



// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(vueParticles)
Vue.use(Vcomp)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
