import {  isLicenseEnabled } from "@/api/crm/user";
import { login, getInfo,logout } from "@/api/crm/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { Encrypt } from "@/utils/secret";
import { wsInit, wsConnect, removeAllClients } from "@/utils/websocket";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    userId: "",
    roles: [],
    roleId: "",
    companyId: "",
    userRolesNames: "",
    isScreenFull: false,
    isLicenseEnabled: true,
    userInfo: "",
    roleType: 0,
    perms:[]
  };
};
const DEFAULT_HEADER_URL = require("@/assets/img/head/head2.png");
const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ID: (state, id) => {
    state.userId = id;
  },
  SET_ROlEID: (state, id) => {
    state.roleId = id;
  },
  SET_COMPANTID: (state, id) => {
    state.companyId = id;
  },
  SET_ROLES: (state, userRoles) => {
    state.roles = userRoles;
  },
  SET_USERROLES: (state, userRolesNames) => {
    state.userRolesNames = userRolesNames;
  },
  SET_SCREEN_FULL: (state, isFull) => {
    state.isScreenFull = isFull;
  },
  SET_ISLICENSEENABLED: (state, isLicenseEnabled) => {
    state.isLicenseEnabled = isLicenseEnabled;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_ROLETYPE: (state, roleType) => {
    state.roleType = roleType;
  },
  SET_PERMS: (state, perms) => {
    state.perms = perms;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: Encrypt(password) })
        .then((response) => {
          const { resData } = response;
          commit("SET_TOKEN", resData.access_token);
          setToken(resData.access_token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  loginByPhone({ commit }, userInfo) {
    const { phone, sms } = userInfo;
    return new Promise((resolve, reject) => {
      loginMobile({ phone: phone, smsCode: sms })
        .then((response) => {
          const { resData } = response;
          commit("SET_TOKEN", resData.access_token);
          setToken(resData.access_token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get period of validity
  getPeriodOfValidity({ commit, state }) {
    return new Promise((resolve, reject) => {
      isLicenseEnabled(state.token)
        .then((res) => {
          // const { userName, headUrl, id, permissions, roleName } = res.resData
          // commit('SET_NAME', userName)
          // commit('SET_AVATAR', headUrl != '' && headUrl != null ? headUrl : DEFAULT_HEADER_URL)
          // commit('SET_ID', id)
          commit("SET_ISLICENSEENABLED", res && res.resData);
          resolve(res.resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((res) => {
          commit("SET_USERINFO", res.resData);
          const {
            userName,
            headUrl,
            id,
            perms,
            roleName,
            roleType,
            roleId,
          } = res.resData;
          commit("SET_NAME", userName);
          commit(
            "SET_AVATAR",
            headUrl != "" && headUrl != null ? headUrl : DEFAULT_HEADER_URL
          );
          commit("SET_ID", id);
          commit("SET_ROlEID", roleId);
          commit("SET_USERROLES", roleName);
          commit("SET_ROLETYPE", roleType);
          commit("SET_PERMS", perms);
          resolve(res.resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //全屏
  screenFull({ commit }) {
    commit("SET_SCREEN_FULL", true);
  },

  //全屏
  screenNoFull({ commit }) {
    commit("SET_SCREEN_FULL", false);
  },

  // user logout
  logout({ commit, state }) {
    // removeToken() // must remove  token  first
    // resetRouter()
    removeAllClients();
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          // resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  toReLogin({ commit, state }) {
    // removeToken() // must remove  token  first
    // resetRouter()
    return new Promise((resolve, reject) => {
      
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      // this.$router.push(`/login`)
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
