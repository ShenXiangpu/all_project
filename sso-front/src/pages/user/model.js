import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  resetPassword,
  getRoles,
  queryGroupList,
  queryEnterpriseUserList,
  queryGroupUserList,
  getRoleList,
  updateUserRole
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    rightModalVisible: false,
    roleList: [],

    enterpriseRoles: [],            //企业内部用户角色列表
    enterpriseGroupList: [],        //企业内部群组列表

    list: [],                       // 用户列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    *getEnterpriseRoles({ payload = {} }, { call, put }) {
      const response = yield call(getRoles, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            enterpriseRoles: response.resData,
          },
        })
      }
    },

    *getGroupList({ payload = {} }, { call, put }) {
      const response = yield call(queryGroupList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            enterpriseGroupList: response.resData,
          },
        })
      }
    },

    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *queryEnterpriseUserList({ payload = {} }, { call, put }) {
      const response = yield call(queryEnterpriseUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *queryGroupUserList({ payload = {} }, { call, put }) {
      const response = yield call(queryGroupUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const response = yield call(removeUser, payload)
      if (response && response.flag) {
        message.success("删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *create({ payload }, { call, put }) {
      const response = yield call(createUser, payload)
      if (response && response.flag) {
        message.success('添加成功')
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *update({ payload }, { select, call, put }) {
      const response = yield call(updateUser, payload)
      if (response && response.flag) {
        message.success('修改成功')
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload)
      if (response && response.flag) {
        message.success('密码重置成功')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getRoleList({ payload }, { call, put }) {
      const response = yield call(getRoleList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            roleList: response.resData,
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

    *updateUserRole({ payload }, { call, put }) {
      const response = yield call(updateUserRole, payload)
      if (response && response.flag) {
        message.success('角色设置成功')
        yield put({
          type: 'hideRightModal',
          payload: {
            currentItem: {}
          }
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    showRightModal(state, { payload }) {
      return { ...state, ...payload, rightModalVisible: true }
    },

    hideRightModal(state) {
      return { ...state, rightModalVisible: false }
    },

  },
})
