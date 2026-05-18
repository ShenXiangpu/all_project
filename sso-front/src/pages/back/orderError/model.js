import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd'

import {
  getErrorList,
  retry
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'orderError',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(getErrorList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: (response.resData && response.resData.records) || [],
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: (response.resData && response.resData.total) || 0,
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

    *retry({ payload = {} }, { call, put }) {
      const response = yield call(retry, payload)
      if (response && response.flag) {
        message.success("重试中~")
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
      return {
        ...state, ...payload
      }
    }
  },
})
