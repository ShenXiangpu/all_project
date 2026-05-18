import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  queryNodeList,
  create as createNode,
  remove as removeNode,
} from './services/node.js'

import {
  queryList as queryFoundryList,
  create as createFoundry,
  remove as removeFoundry,
} from './services/foundry.js'

import {
  queryList as queryTypeList,
  create as createType,
  remove as removeType,
} from './services/ipCategory.js'

import {
  queryList as queryVendorList,
  create as createVendor,
  update as updateVendor,
  remove as removeVendor,
} from './services/vendor.js'

import {
  queryList as queryTaskTypeList,
  create as createTaskType,
  update as updateTaskType,
  remove as removeTaskType,
} from './services/taskType'

import {
  queryFlavorList,
  createFlavor,
  updateFlavor,
  queryBizConfigList,
  updateBizConfig
} from './services/icharge'

export default {
  namespace: 'systemDict',

  state: {
    nodeList: [],
    foundryList: [],
    ipCategoryList: [],
    vendorList: [],
    taskTypeList: [],
    feeList: [],
    flavorList: [],
    bizConfigList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/dict', location.pathname)) {
        }
      })
    },
  },

  effects: {
    *queryNodeList({ payload = {} }, { call, put }) {
      const response = yield call(queryNodeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            nodeList: response.resData.nodeList
          },
        })
      }
    },

    *queryFoundryList({ payload = {} }, { call, put }) {
      const response = yield call(queryFoundryList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            foundryList: response.resData.foundryList
          },
        })
      }
    },

    *queryIpCategoryList({ payload = {} }, { call, put }) {
      const response = yield call(queryTypeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            ipCategoryList: response.resData.typeList
          },
        })
      }
    },

    *createNode({ payload }, { call, put }) {
      const response = yield call(createNode, payload);
      return response;
    },

    *removeNode({ payload }, { call, put, select }) {
      const response = yield call(removeNode, payload)
      if (response && response.flag) {
        message.success("工艺节点删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *createFoundry({ payload }, { call, put }) {
      const response = yield call(createFoundry, payload)
      return response;
    },

    *removeFoundry({ payload }, { call, put, select }) {
      const response = yield call(removeFoundry, payload)
      if (response && response.flag) {
        message.success("代工厂删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *createIpCategory({ payload }, { call, put }) {
      const response = yield call(createType, payload)
      return response;
    },

    *removeIpCategory({ payload }, { call, put, select }) {
      const response = yield call(removeType, payload)
      if (response && response.flag) {
        message.success("IP类型删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },


    *queryVendorList({ payload = {} }, { call, put }) {
      const response = yield call(queryVendorList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vendorList: response.resData
          },
        })
      }
    },

    *createVendor({ payload }, { call, put }) {
      const response = yield call(createVendor, payload)
      return response;
    },

    *updateVendor({ payload }, { call, put }) {
      const response = yield call(updateVendor, payload)
      return response;
    },

    *removeVendor({ payload }, { call, put, select }) {
      const response = yield call(removeVendor, payload.id)
      if (response && response.flag) {
        message.success("工具供应商删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *queryTaskTypeList({ payload = {} }, { call, put }) {
      const response = yield call(queryTaskTypeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            taskTypeList: response.resData
          },
        })
      }
    },

    *createTaskType({ payload }, { call, put }) {
      const response = yield call(createTaskType, payload)
      return response;
    },

    *updateTaskType({ payload }, { call, put }) {
      const response = yield call(updateTaskType, payload)
      return response;
    },

    *removeTaskType({ payload }, { call, put, select }) {
      const response = yield call(removeTaskType, payload.id)
      if (response && response.flag) {
        message.success("任务类型删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *queryFlavorList({ payload = {} }, { call, put }) {
      const response = yield call(queryFlavorList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            flavorList: response.resData
          },
        })
      }
    },

    *createFlavor({ payload }, { call, put }) {
      const response = yield call(createFlavor, payload)
      return response;
    },

    *updateFlavor({ payload }, { call, put }) {
      const response = yield call(updateFlavor, payload)
      return response;
    },

    *queryBizConfigList({ payload = {} }, { call, put }) {
      const response = yield call(queryBizConfigList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            bizConfigList: response.resData
          },
        })
      }
    },

    *updateBizConfig({ payload }, { call, put }) {
      const response = yield call(updateBizConfig, payload)
      return response;
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
