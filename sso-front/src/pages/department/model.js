import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  queryDeptList,
  create,
  remove,
  update,

  createUser,
  removeUser,
  updateUser,
  resetPassword,
  getRoles,
  queryEnterpriseUserList,
  queryGroupUserList,
} from './service.js'

export default {
  namespace: 'department',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    list: [],

    // 用户
    currentUserItem: {},
    userModalVisible: false,
    userModalType: 'create',
    enterpriseRoles: [],            //企业内部用户角色列表
    userList: [],                       // 用户列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/department', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryDeptList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const response = yield call(remove, payload)
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
      const response = yield call(create, payload)
      if (response && response.flag) {
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
      const response = yield call(update, payload)
      if (response && response.flag) {
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

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

    *queryEnterpriseUserList({ payload = {} }, { call, put }) {
      const response = yield call(queryEnterpriseUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userList: response.resData.list,
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
          type: 'updateState',
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

    *deleteUser({ payload }, { call, put, select }) {
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

    *createUser({ payload }, { call, put }) {
      const response = yield call(createUser, payload)
      if (response && response.flag) {
        message.success('添加成功')
        yield put({ type: 'hideUserModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *updateUser({ payload }, { select, call, put }) {
      const response = yield call(updateUser, payload)
      if (response && response.flag) {
        message.success('修改成功')
        yield put({ type: 'hideUserModal' })
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

    showUserModal(state, { payload }) {
      return { ...state, ...payload, userModalVisible: true }
    },

    hideUserModal(state) {
      return { ...state, userModalVisible: false }
    },
  },
}
