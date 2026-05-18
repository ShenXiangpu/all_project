import { message } from 'antd'
import { pathMatchRegexp } from 'utils'

import {
  getProvince,
  getAllUniversityList,
  getListByProvince,
  getStudentList,
  getTeacherList,
  audit,
  getAuditInfo
} from './service.js'

export default {
  namespace: 'auditUniversity',

  state: {
    provinceList: [],      // 所有省份列表
    universityList: [],    // 某省份下所有学校列表
    allUniversityList: [], // 所有学校
    list: [],              // 学生或教师列表
    currentItem: {},
    modalVisible: false,
    modalType: '',
    auditInfo: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('*/auditUniversity', location.pathname)) {
          dispatch({
            type: 'getAllUniversityList',
            payload: {},
          })

          dispatch({
            type: 'getProvince',
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

    *getStudentList({ payload = {} }, { call, put }) {
      const response = yield call(getStudentList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData
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

    *getTeacherList({ payload = {} }, { call, put }) {
      const response = yield call(getTeacherList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData
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
}
