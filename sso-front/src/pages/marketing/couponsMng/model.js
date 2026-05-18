import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import modelExtend from 'dva-model-extend'

import {
  getCoupons,
  sendAwardCode,
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'couponsMng',

  state: {
    list: [],              // 兑换信息列表
    modalVisible: false,
    modalType: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    // 获取兑奖信息列表
    *getCoupons({ payload = {} }, { call, put }) {
      const response = yield call(getCoupons, payload)
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

    *sendAwardCode({ payload }, { call, put }) {
      const response = yield call(sendAwardCode, payload)
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
})
