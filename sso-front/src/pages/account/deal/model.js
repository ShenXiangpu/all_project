import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import modelExtend from 'dva-model-extend'

import {
  getOrderList,
  getVMOrderList,
  getLicenseOrderList,
  getLicenseDetailByNum,
  getVmDetailByNum,
  getVmReconfigDetailByNum,
  cancelOrder,
  getStatistics,
  getLicStatistics,
  getLicStatisticsEnum
} from './service.js'
import { isEqual } from 'lodash-es'

// 订单
export default modelExtend(pageModel, {
  namespace: 'deal',

  state: {
    list: [],                   // 订单列表
    licenseDetail: {},          // license 订单详情
    vmDetail: {},               // VM 订单详情
    stattistics: {},            // 统计数据
    statisticsEnum: {}          // License 用户 枚举
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    // 获取订单信息列表
    *getOrderList({ payload = {} }, { call, put }) {
      const response = yield call(getOrderList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
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

    // 获取VM订单信息列表
    *getVMOrderList({ payload = {} }, { call, put }) {
      const response = yield call(getVMOrderList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
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

    // 获取License订单信息列表
    *getLicenseOrderList({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseOrderList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
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

    *getLicenseDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseDetailByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseDetail: response.resData
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

    *getVmDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getVmDetailByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmDetail: response.resData
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

    // VM 升降配订单
    *getVmReconfigDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getVmReconfigDetailByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmDetail: response.resData
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

    // 取消订单
    *cancelOrder({ payload = {} }, { call, put }) {
      const response = yield call(cancelOrder, payload)
      return response;
    },

    *getStatistics({ payload = {} }, { call, put }) {
      const response = yield call(getStatistics, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            stattistics: response.resData
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

    *getLicStatistics({ payload = {} }, { call, put }) {
      const response = yield call(getLicStatistics, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            stattistics: response.resData
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

    *getLicStatisticsEnum({ payload = {} }, { call, put }) {
      const response = yield call(getLicStatisticsEnum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            statisticsEnum: response.resData
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
