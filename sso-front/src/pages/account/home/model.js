import { message } from 'antd'
import { isEqual } from 'lodash-es'

import {
  getArrearList,
  recharge,
  rechargeCheck,
} from './service.js'

export default {
  namespace: 'accountCenter',

  state: {
    arrearList: [],                // 欠费列表
    rechargeOrderNum: undefined,   // 充值订单
    payResultMdlVisible: false,    // 充值确认框
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *getArrearList({ payload = {} }, { call, put }) {
      const response = yield call(getArrearList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            arrearList: response.resData
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

    *recharge({ payload = {} }, { call, put }) {
      const response = yield call(recharge, payload)
      if (response && response.flag) {

        // 充值订单
        yield put({
          type: 'updateState',
          payload: {
            rechargeOrderNum: response.resData.orderNum
          },
        })

        // 打开支付确认窗口
        yield put({
          type: 'showPayResultModal',
          payload: {},
        })

        // 支付宝支付，跳转至支付宝支付页面
        const payModes = payload.payModes;
        if (payModes && payModes.indexOf('AL') > -1) {
          const myWindow = window.open('', '_blank');
          myWindow.document.write(response.resData.linkPayForm);
          myWindow.focus();
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *rechargeCheck({ payload = {} }, { call, put }) {
      const response = yield call(rechargeCheck, payload)
      if (response && response.flag) {
        const payStatus = response.resData.payStatus;
        if (!isEqual(payStatus, 1)) {
          message.config({
            top: 100,
            duration: 2,
          });
          message.error('充值未成功，请确认是否完成支付！');
        } else if (isEqual(payStatus, 1)) {
          message.success('充值完成！');
          yield put({
            type: 'app/queryBalance',
            payload: {},
          })

          yield put({
            type: 'hidePayResultModal',
            payload: {},
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
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
    showPayResultModal(state, { payload }) {
      return { ...state, ...payload, payResultMdlVisible: true }
    },
    hidePayResultModal(state, { payload }) {
      return { ...state, ...payload, payResultMdlVisible: false }
    },
  },
}
