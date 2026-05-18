import { constantRoutes,constantStuRoutes } from '@/router'
import { listRoutes } from '@/api/user';
import { setRouter, removeRouter } from '@/utils/auth'

import store from '@/store'


// import { Logger } from 'runjs/lib/common';
// import Layout from '@/layout'
export const Layout = () => import('@/layout');

//获取组件的方法
// const _import = require('@/router/_import_' + process.env.NODE_ENV)

// .......

//导入路径下的组件
// route.component = _import(route.path)
// export const Layout = () => import('@/layout/index.vue');

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    if (roles.includes('ROOT')) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta.roles !== undefined) {
        return (route.meta.roles).includes(role);
      }
    });
  }
  return false;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */

export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route };
    const component = tmp.component

    if (component == 'Layout') {
      tmp.component = Layout;
      tmp.redirect = `${tmp.path}/${tmp.children && tmp.children[0].path}`
    } else {
      // 接口组件字符串转换成组件对象
      tmp.component = (resolve) => require([`@/views/${component}`], resolve)

    }
    res.push(tmp);

    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children);
    }
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes

    let userRoles = store.getters.userRolesNames

    // if (userRoles === '学生') {
    //   state.routes = constantStuRoutes.concat(routes)
    // } else {
    //   state.routes = constantRoutes.concat(routes)

    // }


    state.routes = constantRoutes.concat(routes)
    // state.routes.push({ path: '*', redirect: '/404', hidden: true }); // 找不到路由或访问无权限路由跳转404，必须放在最后，因为只有找不到才会进入这个条件
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(async resolve => {
      const res = await listRoutes();
      if (res && res.flag) {
        const asyncRoutes = res.resData;
        const accessedRoutes = filterAsyncRoutes(asyncRoutes);
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true });
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
