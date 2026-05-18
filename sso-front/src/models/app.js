/* global window */

import { router } from '../utils'
import { stringify } from 'qs'
import { CANCEL_REQUEST_MESSAGE } from '../utils/constant'
import store from 'store'
import { queryLayout, pathMatchRegexp } from '../utils'
import config from '../utils/config'
import { message, notification, Button } from 'antd'
import { isEqual } from 'lodash-es';

import {
  logoutUser,
  queryCurrentUser,
  getAllCompanies,
  checkMobile,
  checkEmail,
  updateCurrentUser,
  queryMenuList,
  checkPassword,
  updatePassword,
  getUserInfoById,
  otherLogin,
  getFileContent,
  editFileContent,
  wsConnect,
  wsInit,
  wsClose,
  removeAllClients,
  queryBalance,
  queryMachineHours,
  isEnoughStorage,
  pay,
  modifyPhone,
  bindPhoneSend,
} from '../services/api'
import { isEmpty } from 'lodash'

export default {

  /**
   * namespace : model的命名空间，同时也是他在全局 state 上的属性。
   */
  namespace: 'app',

  /**
   * state : 初始值。
   */
  state: {
    locationPathname: '',
    locationQuery: {},
    companies: [],                    // 企业列表
    uploadPopWrapVisible: false,      // 上传悬浮球是否可见
    uploadModalVisible: false,        // 上传弹出框是否可见
    fileList: [],                     // 上传弹出框文件列表
    webUploader: undefined,           // WebUploader对象

    userInfoModalVisible: false,
    userInfo: {},                     // 查看用户基本信息

    editorVisible: false,             // 任务文件内容编辑框
    editorModalType: 'edit',          // 任务编辑框默认类型，eidt/preview
    fileContent: undefined,           // 输入的任务文件内容
    fileName: undefined,
    fileId: undefined,

    noticeList: [],                   // 消息列表

    mainMenus: [],                    // 菜单列表

    zipFileList: [],                  // 正在压缩或解压缩的文件列表
    isDataRefresh: false,             // 数据模块是否局部刷新

    bindTipModalVisible: false,       // 绑定手机号提示窗口
    bindingPhoneMdlVisible: false,    // 绑定手机号窗口
  },

  /**
   * subscriptions : 订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。
   * 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
   * 格式为 ({ dispatch, history }, done) => unlistenFunction。
   * dispatch 是redux的store中的dispatch ，history是 react-router中的history。
   * 放在subscriptions下的订阅可以理解为一个个任务，方法名称可以自定义。
   */
  subscriptions: {

    /**
     * 监听 history 变化，每次路由切换都会执行
     * 目的：获取当前变化的history路径以及参数并记录，方便登录后跳转回指定页。
     */
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,   // 记录 from 的页面
          },
        })
      })
    },

    /**
     * 监听 history 变化，每次路由切换都会执行
     * 目的：TODO ?
     */
    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    /**
     * 目的：查询当前用户信息。
     */
    setup({ dispatch, history }) {
      history.listen(location => {
        if (!pathMatchRegexp(['/login*', '/register/*', '/password_find', '*/remoteConn', '/agreement/*'], location.pathname)) {
          const payload = location.query || {}  //查询条件：获取级联的上一级参数，查取下一级列表
          if (payload.code && !isEmpty(payload.code)) {
            // 获取token接口
            dispatch({ type: 'otherLogin', payload })
          } else {
            dispatch({
              type: 'query',
              payload
            })
          }

        }
      })
    },
  },

  /**
   * effects : 用于处理异步操作和业务逻辑，不直接修改 state。
   * call: 用于调用异步逻辑，支持 promise。
   * put: 用于触发 action。
   * select: 用于从 state 里获取数据。可以获取别的model中的state值
   */
  effects: {
    *otherLogin({ payload }, { put, call, select }) {
      const response = yield call(otherLogin, payload.code)
      const { locationPathname } = yield select(_ => _.app)

      if (response && response.flag) {
        store.set('Token', response.resData.access_token)  //保存token
        yield put({ type: 'query' })
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)

        router.push({
          pathname: '/login',
        })
      }
    },

    * query({ payload }, { call, put, select }) {
      const response = yield call(queryCurrentUser, payload);

      const isInit = store.get('isInit')
      if (isInit) {
        const user = store.get('user');

        // 判断是否已经绑定手机号,若尚未绑定,弹出提示框
        // if (user.userInfo && isEmpty(user.userInfo.phone)) {
        //   yield put({ type: 'showBindTipModal' })
        // }

        if (isEqual(user, response.resData)) {
          return
        }
      }

      const { locationPathname } = yield select(_ => _.app)
      if (response && response.flag) {
        store.set('isInit', true)
        store.set('user', response.resData)

        // 判断是否已经绑定手机号,若尚未绑定,弹出提示框
        if (response.resData.userInfo && isEmpty(response.resData.userInfo.phone)) {
          yield put({ type: 'showBindTipModal' })
        }

        //获取菜单
        const menuResponse = yield call(queryMenuList, {})
        if (menuResponse && menuResponse.flag) {
          store.set('menus', menuResponse.resData);
          yield put({
            type: 'updateState',
            payload: {
              mainMenus: menuResponse.resData,
            },
          })
        }

        // 判断是否为公司普通用户（项目经理、工程师）
        const userInfo = response.resData && response.resData.userInfo;
        const userRoles = userInfo && userInfo.userRoles;
        const isCompanyNormalArr = userRoles && userRoles.filter(item => {
          if (isEqual(item.name, 'admin') || isEqual(item.name, 'engineer')) {
            return item;
          }
        })
        const isCompanyNormal = isCompanyNormalArr && isCompanyNormalArr.length > 0;
        if (!isCompanyNormal) {
          // 获取用户余额
          const balanceResponse = yield call(queryBalance, payload)
          if (balanceResponse && balanceResponse.flag) {
            store.set('balance', balanceResponse.resData);
          }

          // 获取用户剩余机时
          const machResponse = yield call(queryMachineHours, payload)
          if (machResponse && machResponse.flag) {
            store.set('machineHours', machResponse.resData)
          }
        }

        const roleId = response.resData.userInfo.roleId
        if (roleId === 1) {  //超级管理员
          //查询所有企业信息列表
          yield put({
            type: 'getAllCompanies',
            payload: {}
          })
        }

        // if (pathMatchRegexp(['/', '/login'], location.pathname)) {
        //   // 跳转至 menu 列表的第一个路由页面
        //   router.push({
        //     pathname: menuResponse.resData && menuResponse.resData.length > 0 ? menuResponse.resData[0].menuUrl : '/',
        //   })
        // }

      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          // search: stringify({
          //   from: locationPathname,
          // }),
        })
      }

    },

    * signOut({ payload }, { call, put, select }) {
      removeAllClients();
      const response = yield call(logoutUser)
      if (response && response.flag) {
        store.clearAll();

        router.push({
          pathname: '/login'
        });
      } else {
        // throw response
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * getAllCompanies({ payload }, { call, put, select }) {
      const response = yield call(getAllCompanies, payload)

      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            companies: response.resData
          }
        })
      }
    },

    * checkMobile({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkMobile, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    * checkEmail({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkEmail, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    * updateCurrentUser({ payload }, { call, put }) {
      const response = yield call(updateCurrentUser, payload)
      if (response && response.flag) {
        message.success("修改成功")

        //刷新当前用户信息
        const response2 = yield call(queryCurrentUser, payload)
        if (response2 && response2.flag) {
          store.set('user', response2.resData)
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * queryCurrentUser({ payload }, { call, put }) {
      const response = yield call(queryCurrentUser, payload)
      if (response && response.flag) {
        store.set('user', response.resData)
      }
    },

    * queryMenuList({ payload = {} }, { call, put }) {
      const response = yield call(queryMenuList, payload)
      if (response && (response.flag)) {
        store.set('menus', response.resData)
        yield put({
          type: 'updateState',
          payload: {
            mainMenus: response.resData,
          },
        })
      }
    },

    * checkPassword({ payload, callback }, { put, call }) {
      const response = yield call(checkPassword, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    * updatePassword({ payload, callback }, { put, call }) {
      const response = yield call(updatePassword, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *getUserInfoById({ payload }, { call, put }) {
      const response = yield call(getUserInfoById, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: response.resData
          }
        })
      } else {
        // throw response
      }
    },

    // 获取某个文件的文本内容
    *getFileContent({ payload = {} }, { call, put }) {
      const response = yield call(getFileContent, payload.fileId)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            fileContent: response.resData,
          },
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *editFileContent({ payload = {} }, { call, put }) {
      const response = yield call(editFileContent, payload)
      if (response && (response.flag)) {
        message.success('文件内容保存成功')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 余额
    * queryBalance({ payload }, { call, put }) {
      const response = yield call(queryBalance, payload)
      if (response && response.flag) {
        store.set('balance', response.resData)
      }
    },

    // 剩余机时
    * queryMachineHours({ payload }, { call, put }) {
      const response = yield call(queryMachineHours, payload)
      if (response && response.flag) {
        store.set('machineHours', response.resData)
      }
    },

    *isEnoughStorage({ payload }, { call, put }) {
      const response = yield call(isEnoughStorage, payload)
      return response;
    },

    *pay({ payload }, { call, put }) {
      const response = yield call(pay, payload);
      return response;
    },

    *modifyPhone({ payload, callback }, { put, call }) {
      const response = yield call(modifyPhone, payload)
      if (response && response.flag) {
        message.success('手机号绑定成功')
        // 重新获取用户信息
        yield put({
          type: 'queryCurrentUser',
          payload: {}
        })
        yield put({ type: 'hideBindPhoneModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *bindPhoneSend({ payload, callback }, { put, call }) {
      const response = yield call(bindPhoneSend, payload)
      return response;
    },
  },

  /**
   * reducers : 用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
   */
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    showUploadModal(state, { payload }) {
      return { ...state, ...payload, uploadModalVisible: true }
    },

    hideUploadModal(state, { payload }) {
      return { ...state, ...payload, uploadModalVisible: false }
    },

    showUserInfoModal(state, { payload }) {
      return { ...state, ...payload, userInfoModalVisible: true }
    },

    hideUserInfoModal(state, { payload }) {
      return { ...state, ...payload, userInfoModalVisible: false, userInfo: {} }
    },

    showFileEditorModal(state, { payload }) {
      return { ...state, ...payload, editorVisible: true }
    },

    hideFileEditorModal(state, { payload }) {
      return { ...state, ...payload, editorVisible: false }
    },

    showBindTipModal(state, { payload }) {
      return { ...state, ...payload, bindTipModalVisible: true }
    },

    hideBindTipModal(state, { payload }) {
      return { ...state, ...payload, bindTipModalVisible: false }
    },

    showBindPhoneModal(state, { payload }) {
      return { ...state, ...payload, bindingPhoneMdlVisible: true }
    },

    hideBindPhoneModal(state, { payload }) {
      return { ...state, ...payload, bindingPhoneMdlVisible: false }
    },
  },
}
