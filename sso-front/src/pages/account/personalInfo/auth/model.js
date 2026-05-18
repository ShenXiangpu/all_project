import { message } from 'antd'
import { pathMatchRegexp } from 'utils'

import {
  getProvince,
  getAllUniversityList,
  getListByProvince,
  getIdentityInfo,
  studentAuth,
  updateStudentAuth,
  teacherAuth,
  updateTeacherAuth,
  checkCompanyName,
  checkCertificateCode,
  getCompanyTypes,
  companyAuth,
  updateCompanyAuth
} from './service.js'

export default {
  namespace: 'userAuth',

  state: {
    current: 1,            // 当前所处步骤，默认 1 ，尚未进行认证
    provinceList: [],      // 所有省份列表
    universityList: [],    // 某省份下所有学校列表
    allUniversityList: [], // 所有学校
    identityResult: {},    // 用户认证信息

    companyTypes: [],      //企业类型

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('*/auth*', location.pathname)) {
          dispatch({
            type: 'getIdentityInfo',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *getProvince({ payload = {} }, { call, put }) {
      const response = yield call(getProvince, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            provinceList: response.resData
          },
        })
      }
    },

    *getAllUniversityList({ payload = {} }, { call, put }) {
      const response = yield call(getAllUniversityList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            allUniversityList: response.resData
          },
        })
      }
    },

    *getListByProvince({ payload = {} }, { call, put }) {
      const response = yield call(getListByProvince, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            universityList: response.resData
          },
        })
      }
    },

    *getIdentityInfo({ payload = {} }, { call, put }) {
      const response = yield call(getIdentityInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            identityResult: response.resData
          },
        })
      }
    },

    *studentAuth({ payload = {} }, { call, put }) {
      const response = yield call(studentAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *updateStudentAuth({ payload = {} }, { call, put }) {
      const response = yield call(updateStudentAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *teacherAuth({ payload = {} }, { call, put }) {
      const response = yield call(teacherAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *updateTeacherAuth({ payload = {} }, { call, put }) {
      const response = yield call(updateTeacherAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
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

    *companyAuth({ payload = {} }, { call, put }) {
      const response = yield call(companyAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *updateCompanyAuth({ payload = {} }, { call, put }) {
      const response = yield call(updateCompanyAuth, payload)
      if (response && response.flag) {
        yield put({
          type: 'getIdentityInfo',
          payload: {},
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
