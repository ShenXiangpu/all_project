import defaultSettings from "@/settings";
import { getTheme, saveTheme } from "@/api/crm/settings";
// import * as Types from '../mutation-types'

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings;

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView,
  theme: localStorage.getItem("theme") || "#10abb9",
  sidebarType: "1", // 默认暗色
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // localStorage.setItem(key, value); // 缓存起来，刷新的时候重新取用
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      console.log(key, value);
      state[key] = value;
    }
  },

  CHANGESIDEBARTYPE: (state, { key, value }) => {
    localStorage.setItem("sidebarType", value); // 缓存起来，刷新的时候重新取用
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    return new Promise((resolve, reject) => {
      saveTheme(data.value)
        .then((res) => {
          commit("CHANGE_SETTING", data);
          resolve(res.resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTheme({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTheme()
        .then((res) => {
          let data = res.resData;
          let color = data && data.color;
          let style = data && data.style;
          let logoUrl = (data && data.logoUrl) || "";
          if (color == null) {
            localStorage.setItem("theme", "#10abb9");
          }
          if (style == null) {
            localStorage.setItem("style", "1");
          }
          localStorage.setItem("logoUrl", logoUrl);
          data = {
            color: (data && data.color) || "#10abb9",
            style: (data && data.style) || "1",
            logoUrl: logoUrl || "",
          };
          commit("CHANGE_SETTING", { key: "theme", value: data });

          resolve(res.resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changeSidebarType({ commit }, data) {
    commit("CHANGESIDEBARTYPE", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
