
import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import {
  queryVendorList,
  createVendor,
  removeVendor,
  updateVendor,
  removeVendorList,
  sshConfig,
  getConfigList,
  configOperate,
  replaceFile,
  limit
} from './service.js'

export default {
  namespace: 'vendor',

  state: {
    vendorList: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    configModalVisible: false,
    configList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/edaToolsMng/vendor', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryVendorList, payload)
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

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeVendor, payload)
      const { selectedRowKeys } = yield select(_ => _.vendor)
      if (data && data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        // throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeVendorList, payload)
      if (data && data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        // throw data
      }
    },

    *create({ payload }, { call, put }) {
      const response = yield call(createVendor, payload)
      if (response && response.flag) {
        yield put({ type: 'hideModal' })
        message.success("添加成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.msg)
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateVendor, payload)
      if (data && data.success) {
        yield put({ type: 'hideModal' })
      } else {
        // throw data
      }
    },

    *sshConfig({ payload }, { call, put }) {
      const data = yield call(sshConfig, payload)
      if (data && data.success) {
        message.success("ssh配置成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(data.msg)
      }
    },

    * getConfigList({ payload }, { call, put }) {
      const res = yield call(getConfigList, payload)
      if (res && res.flag) {
        yield put({
          type: 'updateState',
          payload: {
            configList: res.resData,
          },
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(res.errMessage)
      }
    },

    *configOperate({ payload }, { call, put }) {
      const res = yield call(configOperate, payload)
      if (res && res.flag) {
        console.log(payload.operation);
        const operate = (payload.operation).toUpperCase() === 'START' ? '启动' : '停止';
        message.success(`成功${operate}！`)
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(res.errMessage)
      }
    },

    *replaceFile({ payload }, { call, put }) {
      const res = yield call(replaceFile, payload)
      if (res && res.flag) {
        message.success('文件替换成功')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(res.errMessage)
      }
    },

    *limit({ payload }, { call, put }) {
      const res = yield call(limit, payload)
      if (res && res.flag) {
        message.success('限制成功')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(res.errMessage)
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

    showConfigModal(state, { payload }) {
      return { ...state, ...payload, configModalVisible: true }
    },

    hideConfigModal(state) {
      return { ...state, configModalVisible: false }
    },
  },
}
