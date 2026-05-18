import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import {
  queryRoleList,
  create,
  remove,
  update,

} from './service.js'

export default {
  namespace: 'roles',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    // list: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system-manage/roles', location.pathname)) {
          const payload = location.query || {}

          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryRoleList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData
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
        message.success("新增成功")
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
        message.success("修改成功")
        yield put({ type: 'hideModal' })
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

  },
}
