import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import {
  getAllVendor,
  queryList,
  create,
  remove,
  update,
  updateStatus
} from './services/licenseServer.js'

import {
  queryLicenseList,
  getLicenseInUsedList,
} from './services/license.js'


export default modelExtend(pageModel, {
  namespace: 'licenseServer',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    list: [],               // license Server 列表
    vendorList: [],         // 厂商列表

    licenseInUsedList: [],         // license 使用详情
    licInUsedMdlVisible: false,    // license feature 正在使用的用户列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * query({ payload = {} }, { call, put }) {
      const response = yield call(queryList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *getAllVendor({ payload = {} }, { call, put }) {
      const response = yield call(getAllVendor, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vendorList: response.resData,
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

    * delete({ payload }, { call, put, select }) {
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

    * create({ payload }, { call, put }) {
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

    * update({ payload }, { select, call, put }) {
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

    * updateStatus({ payload }, { select, call, put }) {
      const response = yield call(updateStatus, payload)
      return response;
    },

    * queryLicenseList({ payload = {} }, { call, put }) {
      const response = yield call(queryLicenseList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *getLicenseInUsedList({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseInUsedList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseInUsedList: response.resData,
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

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    showLicInUsedModal(state, { payload }) {
      return { ...state, ...payload, licInUsedMdlVisible: true }
    },

    hideLicInUsedModal(state) {
      return { ...state, licInUsedMdlVisible: false }
    },
  },
})
