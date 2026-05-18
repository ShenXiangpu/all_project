import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import {
  queryList,
  create,
  remove,
  update,
  getTaskType,
  getAllVendor,
  updateToolStatus
} from './services/tool.js'

import {
  getVersions,
  createVersion,
  removeVersion,
  updateVersion,
  getToolEnv,
  addToolEnv,
  updateToolEnv,
  delToolEnv
} from './services/toolVersion.js'

import {
  getToolFunctions,
  createFunction,
  updateFunction,
  removeFunction,
  getParams,
  createParam,
  updateParam,
  removeParam,
  getListByToolById,
  addToolFuction,
  updateToolFuction,
  functionTreeList,
  deleteFunctionById,
  getFeature,
  addFeature,
  updateFeature,
  delFeature,
  getFeaturesList,
  getFeaturesUseInfo
} from './services/toolFunction'

import {
  getToolFeatures,
  queryFeatureListByVendor,
  updateToolFeature,
} from './services/toolFeature'

export default modelExtend(pageModel, {
  namespace: 'tool',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'add',
    list: [],               // 工具列表
    taskTypes: {},          // 任务类型列表
    vendors: [],            // 厂商列表

    versionList: [],        // 版本列表
    envList: [],            // 环境变量列表

    paramsList: [],         // 参数列表

    vendorFeatureList: [],      // 厂商下Feature列表
    vendorFeaturePagination: {},
    toolFeatureList: [],        // 工具对应的Feature列表
    featureMdlVisible: false,
    licInUsedMdlVisible:false,
    functionList: [],//功能列表
    functionTypeList: [],//新增功能-功能分类
    functionFeatureList: [],//功能featureList,
    toolFeaturesList:[],//工具feature列表
    toolFeaturePagination:{},
    licenseInUsedList:[],//feature使用情况
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

    * queryTaskType({ payload = {} }, { call, put }) {
      const response = yield call(getTaskType, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            taskTypes: response.resData
          },
        })
      }
    },

    * getAllVendor({ payload = {} }, { call, put }) {
      const response = yield call(getAllVendor, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vendors: response.resData
          },
        })
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

    * updateToolStatus({ payload }, { select, call, put }) {
      const response = yield call(updateToolStatus, payload)
      return response;
    },

    * getVersions({ payload }, { call, put }) {
      const response = yield call(getVersions, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            versionList: response.resData
          },
        })
      }
    },

    * deleteVersion({ payload }, { call, put, select }) {
      const response = yield call(removeVersion, payload)
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

    * createVersion({ payload }, { call, put }) {
      const response = yield call(createVersion, payload)
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

    * updateVersion({ payload }, { select, call, put }) {
      const response = yield call(updateVersion, payload)
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

    * getToolFunctions({ payload }, { call, put }) {
      const response = yield call(getToolFunctions, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            versionList: response.resData
          },
        })
      }
    },

    * deleteFunction({ payload }, { call, put, select }) {
      const response = yield call(removeFunction, payload)
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

    * createFunction({ payload }, { call, put }) {
      const response = yield call(createFunction, payload)
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

    * updateFunction({ payload }, { select, call, put }) {
      const response = yield call(updateFunction, payload)
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

    * getParams({ payload }, { call, put }) {
      const response = yield call(getParams, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            paramsList: response.resData
          },
        })
      }
    },

    * deleteParam({ payload }, { call, put, select }) {
      const response = yield call(removeParam, payload)
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

    * createParam({ payload }, { call, put }) {
      const response = yield call(createParam, payload)
      if (response && response.flag) {
        message.success("新增成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * updateParam({ payload }, { select, call, put }) {
      const response = yield call(updateParam, payload)
      if (response && response.flag) {
        message.success("修改成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * getToolEnv({ payload }, { call, put }) {
      const response = yield call(getToolEnv, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            envList: response.resData
          },
        })
      }
    },

    * createToolEnv({ payload }, { call, put }) {
      const response = yield call(addToolEnv, payload)
      if (response && response.flag) {

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * updateToolEnv({ payload }, { select, call, put }) {
      const response = yield call(updateToolEnv, payload)
      if (response && response.flag) {

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    * delToolEnv({ payload }, { call, put, select }) {
      const response = yield call(delToolEnv, payload)
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

    * getToolFeatures({ payload }, { call, put }) {
      const response = yield call(getToolFeatures, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            toolFeatureList: response.resData
          },
        })
      }
    },

    *queryFeatureListByVendor({ payload = {} }, { call, put }) {
      const response = yield call(queryFeatureListByVendor, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            vendorFeatureList: resData.records,
            vendorFeaturePagination: {
              current: Number(payload.pageNum) || 1,
              pageNum: Number(resData.pages) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: resData.total,
            },
          },
        })
      }
    },


    *queryFeaturesList({ payload = {} }, { call, put }) {
      const response = yield call(getFeaturesList, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            toolFeaturesList: resData.records,
            toolFeaturePagination: {
              current: Number(payload.pageNum) || 1,
              pageNum: Number(resData.pages) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: resData.total,
            },
          },
        })
      }
    },


     
    
    *getFeaturesUseInfo({ payload = {} }, { call, put }) {
      const response = yield call(getFeaturesUseInfo, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            licenseInUsedList: response.resData,
            
          },
        })
      }
    },



    *updateToolFeature({ payload }, { select, call, put }) {
      const response = yield call(updateToolFeature, payload)
      if (response && response.flag) {
        message.success("Feature更新成功")
        yield put({
          type: 'hideFeatureModal',
          payload: {
            currentItem: {},
            toolFeatureList: [],
            vendorFeatureList: []
          }
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getFunctionListByToolId({ payload = {} }, { call, put }) {
      const response = yield call(getListByToolById, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            functionList: resData,
          },
        })
      }
    },

    *getFunctionFeatureListById({ payload = {} }, { call, put }) {
      const response = yield call(getFeature, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            functionFeatureList: resData,
          },
        })
      }
    },

    //新增功能feature
    *createFeatureById({ payload = {} }, { call, put }) {
      const response = yield call(addFeature, payload)
      return response;
    },

    //修改功能feature
    *updateFeatureById({ payload = {} }, { call, put }) {
      const response = yield call(updateFeature, payload)
      return response;
    },

    //删除功能feature
    *delFeatureById({ payload = {} }, { call, put }) {
      const response = yield call(delFeature, payload)
      return response;
    },
    //新增工具
    *addToolFuction({ payload = {} }, { call, put }) {
      const response = yield call(addToolFuction, payload)
      return response;
    },

    //编辑工具
    *updateToolFuction({ payload = {} }, { call, put }) {
      const response = yield call(updateToolFuction, payload)
      return response;
    },


    //新增工具-功能分类
    *queryFunctionTreeList({ payload = {} }, { call, put }) {
      const response = yield call(functionTreeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            functionTypeList: response.resData
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
    //
    *deleteFunction({ payload = {} }, { call, put }) {
      const response = yield call(deleteFunctionById, payload)
      return response
    },

    //
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

    showFeatureModal(state, { payload }) {
      return { ...state, ...payload, featureMdlVisible: true }
    },

    hideFeatureModal(state) {
      return { ...state, featureMdlVisible: false }
    },
    showLicInUsedModal(state, { payload }) {
      return { ...state, ...payload, licInUsedMdlVisible: true }
    },
    hideLicInUsedModal(state) {
      return { ...state, licInUsedMdlVisible: false }
    },
  },
})
