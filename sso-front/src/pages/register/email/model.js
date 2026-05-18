import { pathMatchRegexp } from '../../../utils'
import { checkVerify, checkEmail, createAccount, sendEmail, decodeParams, checkMobile, getCompanyTypes, checkCompanyName, checkCertificateCode } from './service.js'
import { router } from 'utils'
import { Modal, message } from 'antd'

export default {
  namespace: 'email',

  state: {
    currentStep: 0,
    currentEmail: '',
    errorMessage: '',
    modalVisible: false,
    isSent: false,  //是否已发送邮件
    contactInfos: {},  //暂存企业联系人信息，待第三步企业基本信息填写完成之后，一起传给后端
    companyTypes: [],  //企业类型
    licenseUrl: undefined  //上传营业执照路图片后，图片的保存路径
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/register/email', location.pathname)) {
          const query = location.query
          if (query && query.p) {
            dispatch({
              type: 'decodeParams',
              payload: query
            })

            dispatch({
              type: 'getCompanyTypes',
              payload: {}
            })
          }
        }
      })
    },
  },

  effects: {
    *checkAndSendEmail({ payload = {} }, { put, call }) {
      //1. 校验图片验证码成功
      const response = yield call(checkVerify, { verifyInput: payload.verifyInput })
      if (response && response.flag) {
        //2. 校验邮箱是否已被注册
        yield put({
          type: 'checkEmail',
          payload: { email: payload.email }
        })
      }

      yield put({
        type: 'querySuccess',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    *checkEmail({ payload = {} }, { call, put }) {
      const response = yield call(checkEmail, payload)

      //邮箱未被注册
      if (response && response.flag) {
        //3. 发送邮件
        yield put({
          type: 'sendEmail',
          payload: { email: payload.email }
        })
      }

      //邮箱已被注册
      yield put({
        type: 'querySuccess',
        payload: { errorMessage: response.flag ? '' : "此邮箱作为登录名已存在，请更换邮箱或登录" }
      })
    },

    //发送邮件
    *sendEmail({ payload = {} }, { call, put }) {
      const response = yield call(sendEmail, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            isSent: true,
            currentEmail: payload.email
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

    //参数解密：根据邮箱链接判断用户是否过期
    *decodeParams({ payload = {} }, { call, put }) {
      const response = yield call(decodeParams, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentStep: 1,
            currentEmail: response.resData
          },
        })
        router.push('/register/email')
      } else if (response.errCode === 500 || response.errCode === '500') {
        const modal = Modal.success({
          title: '该邮箱已注册，请重新登录。',
          okText: '跳转登录',
          onOk: () => {
            modal.destroy();
            router.push('/login')
          }
        });
      } else if (response.errCode === 501 || response.errCode === '501') {
        const modal = Modal.success({
          title: '链接已过期，请重新注册。',
          okText: '确定',
          onOk: () => {
            modal.destroy();
            router.push('/register/email')
          }
        });
      }
    },

    *checkMobile({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkMobile, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *checkCompanyName({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkCompanyName, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *checkCertificateCode({ payload = {}, callback }, { put, call }) {
      const response = yield call(checkCertificateCode, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    //获取企业类型
    *getCompanyTypes({ payload = {} }, { call, put }) {
      const response = yield call(getCompanyTypes, {})
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            companyTypes: response.resData
          },
        })
      }
    },

    //创建用户账号
    *createAccount({ payload = {} }, { call, put }) {
      const response = yield call(createAccount, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentStep: 3
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
    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },

    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
}
