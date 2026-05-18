import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  queryVmList,
  getConsoleUrl,
  getResourceUsage,
  create,
  getTemplateList,
  getToolList,
  checkVmName,
  getDockerInfoById
} from './service.js'

export default {
  namespace: 'dockerVm',

  state: {
    list: [],                          // 虚拟机列表
    consoleUrl: '',                    // 命令窗口地址
    toolList: [],                       // 工具列表
    templateList: [],                  // 系统大小设置的模板列表，包括内存、cpu、磁盘等
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    remoteModalVisible: false,          // 远程连接窗口
    chartsData: [],                     // 资源监控页面，各个图表的数据
    dockerVmInfo: {}                    // 某台虚拟机的全部信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/dockerVm', location.pathname)) {
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
      const response = yield call(queryVmList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.data,
          },
        })
      }
    },

    *getConsoleUrl({ payload = {} }, { call, put }) {
      const response = yield call(getConsoleUrl, payload)
      if (response && response.flag) {
        if (response.resData && response.resData.length > 0) {
          yield put({
            type: 'updateState',
            payload: {
              consoleUrl: response.resData[0],
            },
          })
        }
      }

      return response
    },

    *getResourceUsage({ payload = {} }, { call, put }) {
      const response = yield call(getResourceUsage, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            chartsData: response.resData ? response.resData : [],
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            chartsData: [],
          },
        })
      }
    },


    *getToolList({ payload = {} }, { call, put }) {
      const response = yield call(getToolList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            toolList: response.resData,
          },
        })
      }
    },

    *getTemplateList({ payload = {} }, { call, put }) {
      const response = yield call(getTemplateList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            templateList: response.resData,
          },
        })
      }
    },

    *checkVmName({ payload }, { call, put }) {
      const response = yield call(checkVmName, payload)
      if (response && response.flag) {  // 不存在
        return response.resData;
      }
      return false;
    },

    *create({ payload }, { call, put }) {
      const response = yield call(create, payload)
      if (response && response.flag) {
        if (response.resData.type === 'error') {
          message.config({
            top: 100,
            duration: 2,
          });
          message.error(response.resData.message)
        } else {
          yield put({ type: 'hideModal' })
          message.success('虚拟机创建成功')
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getDockerInfoById({ payload }, { call, put }) {
      const response = yield call(getDockerInfoById, payload.workloadId)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            dockerVmInfo: response.resData,
          },
        })
      }
      return response;
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

    showRemoteModal(state, { payload }) {
      return { ...state, ...payload, remoteModalVisible: true }
    },

    hideRemoteModal(state) {
      return { ...state, remoteModalVisible: false, consoleUrl: '' }
    },

  },
}
