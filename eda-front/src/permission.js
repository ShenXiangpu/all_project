import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/layout'
import { getItemById } from './api/edu/question'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/passwordReset', '/modifyPassword'] // 路由白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  //debugger
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const userRolesNames = store.getters.userRolesNames;
      const userRoles = store.getters.userId;
      if (userRoles) {
        if (!(userRolesNames && userRolesNames == '系统最高管理员' || userRolesNames == '企业管理员')) {
          const permissionRoutes = store.getters.permission_routes
          if (to.path == '/dashboard') {
            if (permissionRoutes && permissionRoutes.length > 0) {
              let redirectList = []
              permissionRoutes && permissionRoutes.length > 0 && permissionRoutes.map(item => {
                if (!item.hidden) {
                  redirectList.push(item.redirect)
                }
              })
              next(redirectList[0]);
            }
          } else {
            next();
          }

        } else {

          next();
        }
      } else {
        try {
          // 获取用户的信息
          const userRoles = await store.dispatch('user/getInfo')
          // const userRoles = store.set
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          store.dispatch('ws/connectWSAndGetInfo', {})
          store.dispatch('user/getPeriodOfValidity')
          // // dynamically add accessible routes
          let roleName = userRoles && userRoles.roleName
          if (!(roleName && roleName == '系统最高管理员' || roleName == '企业管理员')) {
            let routes = router && router.options && router.options.routes && router.options.routes
            routes.map(item => {
              if (item.redirect == '/dashboard') {
                item.hidden = true
              }
            })
            router.addRoutes(accessRoutes);
            if (to.path == '/dashboard') {
              if (accessRoutes && accessRoutes.length > 0) {
                let redirectList = []
                accessRoutes && accessRoutes.length > 0 && accessRoutes.map(item => {
                  if (!item.hidden) {
                    redirectList.push(item.redirect)
                    return
                  }
                })
                next(redirectList[0]);
                // let routeItem = accessRoutes[0]
                // if (routeItem) {
                //   // let next = `${routeItem && routeItem.path}/${routeItem.children[0].path}`
                //   // console.log('next', next);
                //   next(routeItem.redirect);
                // }
              }
              // let routeItem = accessRoutes && accessRoutes[0] || null;
              // let next = `${routeItem && routeItem.path}/${routeItem.children[0].path}`
              // console.log('next', next);
              // next({ ...to, replace: true });
            } else {
              next({ ...to, replace: true });
            }

          } else {
            router.addRoutes(accessRoutes);
            next({ ...to, replace: true });
          }

          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      let redirect = to && to.fullPath
      redirect = decodeURI(redirect)
      redirect = redirect && redirect.replaceAll("%2F", '/').replaceAll("%3A", ':').replaceAll("%3F", '?').replaceAll("%3D", '=').replaceAll("%26", '&');
      next(`/login?redirect=${redirect}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
