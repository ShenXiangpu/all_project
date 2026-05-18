import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import Layout from "@/layout";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/passwordReset", "/modifyPassword"]; // 路由白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  //debugger
  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      const userRoles = store.getters.userId;
      if (userRoles) {
        next();
      } else {
        try {
          // 获取用户的信息
          const userRoles = await store.dispatch("user/getInfo");
          // const userRoles = store.set
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes"
          );
          // await store.dispatch("settings/getTheme");

          store.dispatch("ws/connectWSAndGetInfo", {});
          // store.dispatch("ws/connectWSAndGetAssisance", {});

          // store.dispatch("user/getPeriodOfValidity");
          // // dynamically add accessible routes

          // router.addRoutes(accessRoutes);
          accessRoutes.forEach((route) => {
            if (route.path) {
              router.addRoute(route);
            } else {
              console.warn("Skipping route without path:", route);
            }
          });
          if (to.path == "/") {
            let redirect =
              accessRoutes && accessRoutes[0] && accessRoutes[0].redirect;
            next(redirect);
          } else {
            next({ ...to, replace: true });
          }
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          Message.error(error || "Has Error");
          // next(`/login?redirect=${to.path}`)
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // let redirect = to && to.fullPath;
      // redirect = decodeURI(redirect);
      // redirect =
      //   redirect &&
      //   redirect
      //     .replaceAll("%2F", "/")
      //     .replaceAll("%3A", ":")
      //     .replaceAll("%3F", "?")
      //     .replaceAll("%3D", "=")
      //     .replaceAll("%26", "&");
      // next(`/login?redirect=${redirect}`);
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
