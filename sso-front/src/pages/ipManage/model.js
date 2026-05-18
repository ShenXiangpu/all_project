import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  queryList,
  create,
  remove,
  update,
} from './service.js'

import { queryNodeList } from '../dict/services/node.js'
import { queryList as queryFoundryList } from '../dict/services/foundry.js'
import { queryList as queryIpCategoryList } from '../dict/services/ipCategory.js'

export default {
  namespace: 'ipManage',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    list: [],

    nodeList: [],
    foundryList: [],
    ipCategoryList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/ipManage', location.pathname)) {
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
      const response = yield call(queryList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData
          },
        })
      }
    },

    *queryNodeList({ payload = {} }, { call, put }) {
      const response = yield call(queryNodeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            nodeList: response.resData.nodeList
          },
        })
      }
    },

    *queryFoundryList({ payload = {} }, { call, put }) {
      const response = yield call(queryFoundryList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            foundryList: response.resData.foundryList
          },
        })
      }
    },

    *queryIpCategoryList({ payload = {} }, { call, put }) {
      const response = yield call(queryIpCategoryList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            ipCategoryList: response.resData.typeList
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const response = yield call(remove, payload.id)
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
