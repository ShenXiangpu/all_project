import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd'

import {
  getUserOperateLog,
  getUserOperateType,
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'userLog',

  state: {
    list: [],
    operateTypes: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/*/userOperateLog', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {},
          })

          dispatch({
            type: 'getUserOperateType',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(getUserOperateLog, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: (response.resData && response.resData.list) || [],
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

    *getUserOperateType({ payload = {} }, { call, put }) {
      const response = yield call(getUserOperateType, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            operateTypes: response.resData,
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
      return {
        ...state, ...payload
      }
    }
  },
})
