import { message } from 'antd';
import { isEqual } from 'lodash';
import { pathMatchRegexp } from '../../utils'
import {
  getEnterpriseInfo,
  getAuditInfo,
  getCompanyTypes,
  checkCompanyName,
  checkCertificateCode,
  update
} from './service.js'

export default {
  namespace: 'enterprise',

  state: {
    epInfo: undefined,
    auditInfo: undefined,
    companyTypes: undefined,
    isUpdate: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/enterpriseInfo', location.pathname)) {
          dispatch({
            type: 'getEnterpriseInfo',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *getEnterpriseInfo({ payload = {} }, { call, put }) {
      const response = yield call(getEnterpriseInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            epInfo: response.resData
          }
        })

        if (response.resData) {
          if (!isEqual(Number(response.resData.isVerified), 1)) {
            dispatch({
              type: 'getCompanyTypes',
              payload: {},
            })
          }

          if (response.resData.isVerified === 2 || response.resData.isVerified === '2') {
            yield put({
              type: 'getAuditInfo',
              payload: {}
            })
          }
        }
      }
    },

    *getAuditInfo({ payload = {} }, { call, put }) {
      const response = yield call(getAuditInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            auditInfo: response.resData
          }
        })
      }
    },

    //获取企业类型
    *getCompanyTypes({ payload = {} }, { call, put }) {
      const response = yield call(getCompanyTypes, {})
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            companyTypes: response.resData
          },
        })
      }
    },

    *checkCompanyName({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkCompanyName, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *checkCertificateCode({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkCertificateCode, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *update({ payload = {} }, { call, put }) {
      const response = yield call(update, payload)
      if (response && response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.success("修改成功，请耐心等待重新审核...")

        // 重新获取企业信息
        yield put({
          type: 'getEnterpriseInfo',
          payload: {},
        })

        yield put({
          type: 'updateState',
          payload: {
            isUpdate: false
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
