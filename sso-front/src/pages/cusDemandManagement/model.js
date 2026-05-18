import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  getDemandList,
  submitMpwDemand,
  reviewMpwDemand,
  getDemandInfoById,
  getInfoByUserName,
  // 多列表
  getFoundryList,
  getProcessNodesList,
  getProcessTypeList,
  getProcessCharacteristicsList,
  getPolyAndMetalList,
  getTopMetalList,
  getCapacitanceList,
  getResistanceList,
  getCorevoltageList,
  getIovoltageList,
  getDesignPackageRequirementsList,
  getTapeOutPlanList,
  getRecordById,
  reviewSa,
  downloadServiceRecord,
  closeProject
} from './service.js'
import { isEqual } from 'lodash'

export default {
  namespace: 'cusDemandManagement',

  state: {
    demandList: [],//需求列表
    pagination: {},
    userInfo: {},//用户的基本信息
    showReview: false,
    // 多列表
    foundryList: [],//代工厂里列表
    processNodesList: [],//工艺节点列表
    processTypeList: [],//工艺类型列表
    processCharacteristicsList: [],//工艺特征列表
    polyAndMetalList: [],//Poly和Metal的使用
    topMetalList: [],//顶层金属
    capacitanceList: [],//电容
    resistanceList: [],//电阻
    corevoltageList: [],//Core电压
    iovoltageList: [],//IO器件电压
    designPackageRequirementsList: [], //设计包需求
    tapeOutPlanList: [], //流片计划
    demandObj: {},//需求对象
    surveysModalVisible: false,
    satisfaction: {},//满意度调查

    leftReadOnly: false, //左边只读
    rightReadOnly: false,//右边只读

    isOpenListen:false,//控制开启向文本框开启监听
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/mpw/createMpw', location.pathname)) {
          dispatch({
            type: 'updateState',
            payload: {
              showReview: false
            },
          })
        }
      })
    },
  },


  // getCapacitanceList,
  // getResistanceList,
  // getCorevoltageList,
  // getIovoltageList,
  effects: {

    /**
 * 导出文件
 * @param {*} param0 
 * @param {*} param1 
 */
    *downloadServiceRecord({ payload }, { call, put }) {
      const response = yield call(downloadServiceRecord, payload)
      if (response && !response.flag && response.errMessage) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },



    // 评审满意度调查
    *reviewSa({ payload }, { call, put }) {
      const response = yield call(reviewSa, payload)
      return response
    },

    // 评审满意度调查
    *getRecordById({ payload }, { call, put }) {
      const response = yield call(getRecordById, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            satisfaction: response.resData
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

    // 流片计划
    *getTapeOutPlanList({ payload = {} }, { call, put }) {
      const response = yield call(getTapeOutPlanList, payload)
      return response
    },
    // 设计包需求
    *getDesignPackageRequirementsList({ payload = {} }, { call, put }) {
      const response = yield call(getDesignPackageRequirementsList, payload)
      return response
    },
    // IO器件电压
    *getIovoltageList({ payload = {} }, { call, put }) {
      const response = yield call(getIovoltageList, payload)
      return response
    },
    // Core电压
    *getCorevoltageList({ payload = {} }, { call, put }) {
      const response = yield call(getCorevoltageList, payload)
      return response
    },
    // 获取电阻
    *getResistanceList({ payload = {} }, { call, put }) {
      const response = yield call(getResistanceList, payload)
      return response
    },
    // 获取电容
    *getCapacitanceList({ payload = {} }, { call, put }) {
      const response = yield call(getCapacitanceList, payload)
      return response
    },
    // 获取顶层金属
    *getTopMetalList({ payload = {} }, { call, put }) {
      const response = yield call(getTopMetalList, payload)
      return response
    },
    // 获取Poly和Metal的使用
    *getPolyAndMetalList({ payload = {} }, { call, put }) {
      const response = yield call(getPolyAndMetalList, payload)
      return response
    },
    // 获取工艺特征列表
    *getProcessCharacteristicsList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessCharacteristicsList, payload)
      return response
    },
    // 获取工艺类型列表
    *getProcessTypeList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessTypeList, payload)
      return response
    },
    // 获取工艺节点列表
    *getProcessNodesList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessNodesList, payload)
      return response
    },
    // 获取代工厂列表
    *getFoundryList({ payload = {} }, { call, put }) {
      const response = yield call(getFoundryList, payload)
      return response
    },




    *getDemandList({ payload = {} }, { call, put }) {
      const response = yield call(getDemandList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            demandList: response.resData.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
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
    // 通过用户useName获取用户信息
    *getInfoByUserName({ payload }, { call, put, select }) {
      const response = yield call(getInfoByUserName, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: response.resData
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

    //提交流片需求
    *submitMpwDemand({ payload }, { call, put, select }) {
      const response = yield call(submitMpwDemand, payload)
      return response
      // const response = yield call(submitMpwDemand, payload)
      // if (response && response.flag) {
      //   message.success(`提交成功`);
      // } else {
      //   message.config({
      //     top: 100,
      //     duration: 2,
      //   });
      //   message.error(response.errMessage)
      // }
    },
    *getDemandInfoById({ payload }, { call, put, select }) {
      const response = yield call(getDemandInfoById, payload)
      return response
    },


    *closeProject({ payload }, { call, put, select }) {
      const response = yield call(closeProject, payload)
      return response
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
    hideSurveysModal(state, { payload }) {
      return { ...state, ...payload, surveysModalVisible: false }
    },
    showSurveysModal(state, { payload }) {
      return { ...state, ...payload, surveysModalVisible: true }
    },
  },
}
