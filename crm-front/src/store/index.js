import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import ws from './modules/ws'
import sse from './modules/sse'
import approval from './modules/approval'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView,
    ws,
    sse,
    approval
  },
  getters
})

export default store
