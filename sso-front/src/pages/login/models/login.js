import { router, pathMatchRegexp } from '../../../utils'
import { loginUserByAccount, loginUserByPhone, send } from '../services/login'
import { message } from 'antd';
import store from 'store'
import { isEmpty, isEqual } from 'lodash';

export default {
  namespace: 'login',

  state: {
    errorMessage: "",
    from: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/login', location.pathname)) {
          const token = store.get('Token')
          // 判断是否已经登录
          if (token && !isEmpty(token)) {
            const from = location.query && location.query.from;
            if (from && !isEmpty(from)) {
              // 页面跳转至指定页面
              window.location.href = window.location.origin + from;
            } else {
              // 回到首页
              const user = store.get('user') || {}
              if (user && !isEmpty(user.userInfo)) {
                const userInfo = user.userInfo;
                message.info(`${userInfo.nickName || userInfo.phone}，您已登录`)
              }
              router.push('/')
            }
          } else {
            const from = location.query && location.query.from;
            if (from && !isEmpty(from)) {
              store.set('from', from)
            }

          }
        }
      })

    },
  },

  effects: {
    * loginUserByPhone({ payload }, { put, call, select }) {
      const response = yield call(loginUserByPhone, payload)
      if (response && response.flag) {
        // yield put({ type: 'app/query' })  //查询当前用户
        store.set('Token', response.resData.access_token)  //保存token
        // 如果用户是从邮件-优惠券过来，并storeget(from) 有值则跳转至站内信页面
        const from = store.get('from')
        if (from && !isEmpty(from)) {
          window.location.href = window.location.origin + from
        } else {
          // 当用户已经登录又返回到登录页面，此时，LocalStorage 里已经保存相关信息，直接跳转
          router.push({
            pathname: '/', // 首页
          })
        }
      }

      yield put({
        type: 'putErrorMsg',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    * loginUserByAccount({ payload }, { put, call, select }) {
      const response = yield call(loginUserByAccount, payload)
      if (response && response.flag) {
        store.set('Token', response.resData.access_token)  //保存token
        // 如果用户是从邮件-优惠券过来，并storeget(from) 有值则跳转至站内信页面
        const from = store.get('from')
        if (from && !isEmpty(from)) {
          window.location.href = window.location.origin + from
        } else {
          // 当用户已经登录又返回到登录页面，此时，LocalStorage 里已经保存相关信息，直接跳转
          router.push({
            pathname: '/', // 首页
          })
        }

      }

      yield put({
        type: 'putErrorMsg',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },

    * send({ payload, callback }, { put, call }) {
      const response = yield call(send, payload)
      yield put({
        type: 'putErrorMsg',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
      return response;
    },
  },

  reducers: {
    putErrorMsg(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    putFromValue(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
}
