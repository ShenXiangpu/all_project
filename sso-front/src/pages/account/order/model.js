import { message } from 'antd'
import { isEqual } from 'lodash'
import { pathMatchRegexp } from '../../../utils'

import {
  createLicOrder,
  getLicenseDebt,
  getLicenseDetailByNum,
  getVmDetailByNum,
  getVmReconfigDetailByNum,
  createReconfigOrder,
  createRechargeOrder,
  getVmByVmId,
  oneOrderType,
  calcVMCost2,
  calcVMCost,
  calcVMCostLicense,
  calcVMCostLicense2
} from './service.js'

export default {
  namespace: 'order',

  state: {
    licenseDetail: {},                // license 欠费订单详情
    vmDetail: {},                     // VM 订单详情

    payModalVisible: false,           // 支付窗口
    amountToPay: 0,                   // 待支付金额
    orderNum: undefined,              // 待支付订单

    payResultMdlVisible: false,       // 支付结果确认窗口


    vouchersList: [], //可使用优惠券列表

    vmCapaDetail: [],//订单详情

    calcData: {},//计算返回包含可用优惠券列表

    vmBeOrderInfo: {},//传入优惠券后显示的订单详情

    licenseVData: {},//计算license返回包含可用

  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {

    *createLicOrder({ payload = {} }, { call, put }) {
      const response = yield call(createLicOrder, payload)
      return response;
    },

    *getLicenseDebt({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseDebt, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseDetail: response.resData,
            vmDetail: {}
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

    *getLicenseDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getLicenseDetailByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseDetail: response.resData,
            vmDetail: {}
          },
        })
        //使用订单明细接口的参数传入，获取可使用的列表
        let { orderNum, payStatus } = response.resData
        if (orderNum && payStatus !== 1) {
          let payload = {
            orderNum
          }
          yield put({
            type: 'calcVMCostLicense2',
            payload
          })
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getVmDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getVmDetailByNum, payload)
      if (response && response.flag) {

        //使用订单明细接口的参数传入，获取可使用的列表
        const { orderNum, payStatus } = response.resData
        const couponId = payload.couponId
        if (orderNum && !isEqual(payStatus, 1)) {
          let payload = {
            orderNum,
            couponId
          }
          yield put({
            type: 'calcVMCost2',
            payload
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            vmDetail: response.resData,
            licenseDetail: {}
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
    //计算接口1，传入订单信息
    *calcVMCost({ payload }, { call, put }) {
      const response = yield call(calcVMCost, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            calcData: response.resData,
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

    //计算接口，传入订单号和优惠券id
    *calcVMCost2({ payload }, { call, put }) {
      const response = yield call(calcVMCost2, payload)
      if (response && response.flag) {
        console.log('calcVMCost2')
        yield put({
          type: 'updateState',
          payload: {
            calcData: response.resData,
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
    //计算接口1，传入订单信息
    *calcVMCostLicense({ payload }, { call, put }) {
      const response = yield call(calcVMCostLicense, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseVData: response.resData,
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
    //计算接口1，传入订单信息
    *calcVMCostLicense2({ payload }, { call, put }) {
      const response = yield call(calcVMCostLicense2, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            licenseVData: response.resData,
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

    // VM 升降配订单
    *getVmReconfigDetailByNum({ payload = {} }, { call, put }) {
      const response = yield call(getVmReconfigDetailByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmDetail: response.resData,
            licenseDetail: {}
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



    // 创建 VM 升降配订单
    *createReconfigOrder({ payload }, { call, put }) {
      const response = yield call(createReconfigOrder, payload)
      return response;
    },

    // 创建 VM 续费订单
    *createRechargeOrder({ payload }, { call, put }) {
      const response = yield call(createRechargeOrder, payload)
      return response;
    },

    *getVmByVmId({ payload }, { call, put }) {
      const response = yield call(getVmByVmId, payload)
      return response;
    },
    // 获取可使用优惠券列表
    *oneOrderType({ payload }, { call, put }) {
      const response = yield call(oneOrderType, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vouchersList: response.resData,
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
    showPayModal(state, { payload }) {
      return { ...state, ...payload, payModalVisible: true }
    },
    hidePayModal(state, { payload }) {
      return { ...state, ...payload, payModalVisible: false }
    },
    showPayResultModal(state, { payload }) {
      return { ...state, ...payload, payResultMdlVisible: true }
    },
    hidePayResultModal(state, { payload }) {
      return { ...state, ...payload, payResultMdlVisible: false }
    },
  },
}
