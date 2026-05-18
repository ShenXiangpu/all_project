import { message } from 'antd'

import {
  getLicenseDebt
} from './service.js'

export default {
  namespace: 'licensePay',

  state: {
    debtList: [],  // 欠费列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *getLicenseDebt({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseDebt, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            debtList: response.resData
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
}
