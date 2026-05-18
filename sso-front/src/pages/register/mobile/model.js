import { router } from 'utils'
import { Modal, message } from 'antd';
import styles from './index.less'
import { sendValidate, checkVerify, checkMobileCode, createAccount } from './service.js'

export default {
  namespace: 'mobile',

  state: {
    currentStep: 0,
    currentMobile: '',
    errorMessage: '',
    modalVisible: false
  },

  subscriptions: {

  },

  effects: {
    //重新发送手机验证码
    *sendValidate({ payload = {} }, { call, put }) {
      const response = yield call(sendValidate, payload)

      yield put({
        type: 'querySuccess',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    //校验图片验证码成功之后，发送手机验证码
    *sendMobile({ payload = {} }, { put, call }) {
      const response = yield call(checkVerify, { verifyInput: payload.verifyInput })
      if (response && response.flag) {
        //发送手机验证码
        yield put({
          type: 'sendValidate',
          payload: { phone: payload.phone }
        })

        //显示弹出框，待输入手机验证码
        yield put({
          type: 'showModal',
          payload: { currentMobile: payload.phone }
        })
      }

      yield put({
        type: 'querySuccess',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    //校验手机验证码，同时判断手机号是否已被注册
    *checkMobileCode({ payload = {} }, { call, put }) {

      const response = yield call(checkMobileCode, { code: payload.code })
      if (response && response.flag) {
        yield put({ type: 'hideModal' })

        //成功并且账户不存在，跳转下一步填写账号信息
        yield put({
          type: 'querySuccess',
          payload: {
            currentStep: 1
          },
        })
      } else if (response && !response.flag) {
        const errMsg = response.errMessage;

        console.log(errMsg);

        if (errMsg.indexOf('已注册') > -1) {
          yield put({ type: 'hideModal' })

          //账户已存在的判断
          const modal = Modal.confirm({
            title: null,
            className: styles.warnModal,
            content: `手机号 ${payload.phone} 已注册，请确认该账户是否为你本人所有`,
            okText: '该账户是我的，立即登录',
            cancelText: '重新注册',
            onOk: () => {
              modal.destroy();
              router.push('/login')
            },
            onCancel: () => {
              modal.destroy();
            }
          });
        } else {
          message.config({
            top: 100,
            duration: 2,
          });
          message.error(errMsg);
        }
      }
    },

    //创建用户账号
    *createAccount({ payload = {} }, { call, put }) {
      const response = yield call(createAccount, payload)
      if (response.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentStep: 2
          },
        })
      }
    },

  },

  reducers: {
    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, errorMessage: '' }
    },
  },
}
