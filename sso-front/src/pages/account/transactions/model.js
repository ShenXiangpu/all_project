import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import modelExtend from 'dva-model-extend'

import {
  getTransList,
  getTradeEventList
} from './service.js'

// 交易明细
export default modelExtend(pageModel, {
  namespace: 'transactions',

  state: {
    list: [],
    tradeEventList: [],    // 交易类型
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    // 获取交易明细列表
    *getTransList({ payload = {} }, { call, put }) {
      const response = yield call(getTransList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
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

    *getTradeEventList({ payload = {} }, { call, put }) {
      const response = yield call(getTradeEventList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            tradeEventList: response.resData
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
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
