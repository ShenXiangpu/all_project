import { wsInit, wsConnect, removeAllClients } from "@/utils/websocket";
import { queryUnreadCount } from "@/api/ws";
import { isEqual } from "lodash";
import groupBy from "lodash/groupBy";
import user from "./user";
import store from "@/store";
import moment from "moment";
import { messageWebSocketUrl, labWebSocketUrl } from "@/utils/wsHost";

const getDefaultState = () => {
  return {
    noticeData: {},
    unreadMsg: {},
    unreadCount: 0,
    studentList: [],
    teaReply: "",
  };
};
const state = getDefaultState();

const mutations = {
  SET_NOTICEDATA: (state, token) => {
    state.noticeData = token;
  },
  SET_UNREADMSG: (state, token) => {
    state.unreadMsg = token;
  },
  SET_UNREADCOUNT: (state, token) => {
    state.unreadCount = token;
  },
  SET_STUDENTLIST: (state, token) => {
    state.studentList = token;
  },
  SET_TEAREPLY: (state, token) => {
    state.teaReply = token;
  },
};

function getNoticeData(notices) {
  if (notices.length === 0) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.createTime) {
      newNotice.datetime = moment(notice.createTime).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.ifExpired) {
      newNotice.expired = "已过期";
    }
    return newNotice;
  });
  return groupBy(newNotices, "msgType"); // 消息类型(0:通知;1:告警;..)
}

function getUnreadData(noticeData) {
  const unreadMsg = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) =>
        isEqual(item.msgStatus, "0")
      ).length;
    }
  });
  return unreadMsg;
}
const actions = {
  connectWSAndGetInfo({ commit }) {
    // ws 连接，包括VM创建、升降配、消息中心（站内信）
    const userId = user.state.userId;
    let noticeList = [];

    if (userId) {
      // 断开之前连接
      removeAllClients();
      // 监听 VM 创建结果
      const host = window.location.host;
      // 监听消息
      const appName = "xx";
      const limit = 10;
      console.log("测试连接"); // 本地测试
      const msgUrl = `${messageWebSocketUrl}/${appName}/${userId}/${limit}`;
      const msgWS = wsConnect(msgUrl);
      wsInit(msgWS, (value) => {
        if (!noticeList || noticeList.length == 0) {
          noticeList = value;
        } else {
          noticeList.splice(0, 0, ...value);
          if (noticeList && noticeList.length > 10) {
            noticeList.splice(10, 1);
          }
        }
        let noticeData = getNoticeData(noticeList);
        let unreadMsg = getUnreadData(noticeData);

        commit("SET_NOTICEDATA", noticeData);
        commit("SET_UNREADMSG", unreadMsg);

        return new Promise((resolve, reject) => {
          queryUnreadCount()
            .then((response) => {
              const { resData } = response;
              commit("SET_UNREADCOUNT", resData);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    }
  },

  connectWSAndGetAssisance({ commit }) {
    // ws 连接，包括VM创建、升降配、消息中心（站内信）
    const userId = user.state.userId;

    if (userId) {
      // 断开之前连接
      removeAllClients();
      // 监听 VM 创建结果
      const host = window.location.host;
      // 监听消息
      const appName = "assist";
      const limit = 1;
      console.log("测试连接", process.env.NODE_ENV);
      const msgUrl = `${labWebSocketUrl}/${appName}/${userId}/${0}`;

      const msgWS = wsConnect(msgUrl);
      wsInit(msgWS, (value) => {
        let msgInfo = value && value[0] && value[0].msgInfo;
        msgInfo = JSON.parse(msgInfo) || msgInfo;
        let messageInfo = msgInfo && msgInfo.messageInfo;
        let messageType = msgInfo && msgInfo.messageType;
        if (messageType == "studentList") {
          messageInfo = JSON.parse(messageInfo);
          console.log("messageType", messageInfo);
          commit("SET_STUDENTLIST", messageInfo);
        } else if (messageType == "accept") {
          commit("SET_TEAREPLY", "accept");
        } else if (messageType == "reject") {
          commit("SET_TEAREPLY", "reject");
        } else if (messageType == "completed") {
          commit("SET_TEAREPLY", "completed");
        }
      });
    }
  },

  initAssist({ commit }) {
    commit("SET_TEAREPLY", "");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
