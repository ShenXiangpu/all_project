import { checkAccount, sendMobileCode, checkVerify, checkMobileCode, resetPassword } from './service.js'

export default {
  namespace: 'findPassword',

  state: {
    currentStep: -1,
    currentMobile: '',  //当前用户账号名称，手机号/邮箱
    errorMessage: '',
  },

  subscriptions: {

  },

  effects: {

    //校验图片验证码成功之后，校验账户信息
    *checkVerigyandAccount({ payload = {} }, { put, call }) {
      const response = yield call(checkVerify, { verifyInput: payload.verifyInput })
      if (response && response.flag) {
        //发送手机验证码
        yield put({
          type: 'checkAccount',
          payload: { loginName: payload.loginName }
        })
      }
      yield put({
        type: 'updateState',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    //校验账户信息
    *checkAccount({ payload = {} }, { put, call }) {
      const response = yield call(checkAccount, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentMobile: response.resData,
            currentStep: 0
          }
        })
      }
      yield put({
        type: 'updateState',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    //发送手机验证码
    *sendMobileCode({ payload = {} }, { call, put }) {
      const response = yield call(sendMobileCode, payload)
      if (response && response.flag) {

      }
    },

    //校验手机验证码
    *checkMobileCode({ payload = {} }, { call, put }) {
      const response = yield call(checkMobileCode, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentStep: 1
          },
        })
      }
      yield put({
        type: 'updateState',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    //重置密码
    *resetPassword({ payload = {} }, { call, put }) {
      const response = yield call(resetPassword, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentStep: 2
          },
        })
      }
      yield put({
        type: 'updateState',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
