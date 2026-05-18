import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'


import 'element-ui/lib/theme-chalk/display.css';

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/element-variables.scss'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n 国际化
import vueParticles from 'vue-particles'
import Vcomp from './components/index'

import '@/styles/index.scss' // global css
// import'lib-flexible/flexible.js';
import './utils/rem'
import 'virtual:svg-icons-register'
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
// if (import.meta.env.MODE === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }



import permission from './directive/permission/index'



import '@/utils/websocket' // 全局引入 WebSocket 通讯组件


import uploader from 'vue-simple-uploader'
import axios from 'axios'
// axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 6000;
Vue.prototype.$http = axios
Vue.use(uploader)
Vue.use(permission)






import './plugins/element.js'
import func from './plugins/preload.js'
Vue.prototype.$func = func;
Vue.config.productionTip = false;
Vue.directive('enterNumber', {
    bind: function (el, { value = 2 }) {
        el = el.nodeName == "INPUT" ? el : el.children[0]
        var RegStr = value == 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${value}}`;
        el.addEventListener('keyup', function () {
            el.value = el.value.match(new RegExp(RegStr, 'g'));
            el.dispatchEvent(new Event('input'))
        })
    }
});

Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el) {
        el.focus()
    }
});


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
