import { router, pathMatchRegexp } from 'utils'
import { verifyPhone, modifyPhone, send, sendToNewPhone, resetPassword, resetPwdSend, bindPhoneSend } from './service.js'
import { message } from 'antd';

export default {
  namespace: 'accountSettings',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    *verifyPhone({ payload, callback }, { put, call }) {
      const response = yield call(verifyPhone, payload)
      return response;
    },

    // 解绑手机号，发送短信验证码给当前手机号
    *send({ payload, callback }, { put, call }) {
      const response = yield call(send, payload)
      if (response && !response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *sendToNewPhone({ payload, callback }, { put, call }) {
      const response = yield call(sendToNewPhone, payload)
      if (response && !response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *modifyPhone({ payload, callback }, { put, call }) {
      const response = yield call(modifyPhone, payload)
      return response;
    },

    *resetPwdSend({ payload, callback }, { put, call }) {
      const response = yield call(resetPwdSend, payload)
      return response;
    },

    *resetPassword({ payload, callback }, { put, call }) {
      const response = yield call(resetPassword, payload)
      return response;
    },

    *bindPhoneSend({ payload, callback }, { put, call }) {
      const response = yield call(bindPhoneSend, payload)
      return response;
    },
  },

  reducers: {
  }
}
