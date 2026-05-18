import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import {
  queryMenuList,
  createMenu,
  removeMenu,
  updateMenu,
  editStatus
} from './service.js'

export default {
  namespace: 'toolFunctionMng',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/edaToolsMng/toolFunctionMng', location.pathname)) {
          // 判断 location.query 是否为空json对象
          // const payload = Object.getOwnPropertyNames(location.query).length === 0 ? { pageNum: 1, pageSize: 10 } : location.query
          const payload = location.query || {}

          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryMenuList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const response = yield call(removeMenu, payload)
      const { selectedRowKeys } = yield select(_ => _.menus)
      if (response && response.flag) {
        message.success("删除成功")
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
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

    *create({ payload }, { call, put }) {
      const response = yield call(createMenu, payload)
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

    *update({ payload }, { select, call, put }) {
      const response = yield call(updateMenu, payload)
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

    *editStatus({ payload }, { select, call, put }) {
      const response = yield call(editStatus, payload)
      return response;
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
