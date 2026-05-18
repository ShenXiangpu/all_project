import { addOneRegistration,goToPay,getOneRegistration,goToPay4Query,getRegistrationBasisInfo } from './service.js'

export default {
  namespace: 'enroll',

  state: {
    currentStep: -1,
    currentMobile: '',  //当前用户账号名称，手机号/邮箱
    errorMessage: '',
    registration:'',//报名和订单信息
    enrollResult:{},
    payResultMdlVisible:false,
    enrollInfo:{},//报名信息
  },

  subscriptions: {

  },

  effects: {

    //校验图片验证码成功之后，校验账户信息
    *addOneRegistration({ payload = {} }, { put, call }) {
      const response = yield call(addOneRegistration,  payload)
      return response;
    },

    *goToPay({ payload = {} }, { put, call }) {
      const response = yield call(goToPay,  payload)
      return response;
    },
    
    *queryOneRegistration({ payload = {} }, { put, call }) {
      const response = yield call(getOneRegistration, payload)
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            registration: resData,
          }
        })
      }
    },

    
    *goToPay4Query({ payload = {} }, { put, call }) {
      const response = yield call(goToPay4Query,  payload)
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            registration: resData,
          }
        })
      }
    },

    
    *getRegistrationBasisInfo({ payload = {} }, { put, call }) {
      const response = yield call(getRegistrationBasisInfo,  payload)
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            enrollInfo: resData,
          }
        })
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
