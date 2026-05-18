import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  getEdaVendorList,
  getToolList,
  getFeatureList,
  queryFeatureList,
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'license',

  state: {
    reload: false,
    vendorList: [],
    toolList: [],
    featureList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/license', location.pathname)) {
          // dispatch({
          //   type: 'query',
          //   payload,
          // })

          dispatch({
            type: 'getEdaVendorList',
            payload: {},
          })

          dispatch({
            type: 'getToolList',
            payload: {},
          })

          dispatch({
            type: 'getFeatureList',
            payload: {},
          })

          // // 用于重置 filter 参数
          // dispatch({
          //   type: 'updateState',
          //   payload: { reload: true },
          // })

        }
      })
    },
  },

  effects: {
    *getEdaVendorList({ payload = {} }, { call, put }) {
      const response = yield call(getEdaVendorList, payload)
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            vendorList: response.data,
          },
        })
      }
    },
    *getToolList({ payload = {} }, { call, put }) {
      const response = yield call(getToolList, payload)
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            toolList: response.data,
          },
        })
      }
    },
    *getFeatureList({ payload = {} }, { call, put }) {
      const response = yield call(getFeatureList, payload)
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            featureList: response.data,
          },
        })
      }
    },

    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryFeatureList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
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
