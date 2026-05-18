import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  queryEnterpriseList,
  audit,
  getAuditInfo
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'audit',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: '',
    auditInfo: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('*/auditEnterprise', location.pathname)) {
          const payload = location.query || {
            pageNum: 1,
            pageSize: 10,
          }

          dispatch({
            type: 'query',
            payload: {
              ...payload
            },
          })

        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryEnterpriseList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *audit({ payload }, { call, put }) {
      const response = yield call(audit, payload)
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

    *getAuditInfo({ payload, callback }, { call, put }) {
      const response = yield call(getAuditInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            auditInfo: response.resData
          },
        })

        if (callback && typeof callback === 'function') {
          callback(response.resData); // 返回结果
        }
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
