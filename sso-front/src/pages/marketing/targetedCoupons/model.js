import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import {
  getUserByPhone,
  getUserRole,
  getCouponPushList,
  couponsList,
  createPush
} from './service.js'



export default {
  namespace: 'targetedCoupons',

  state: {
    userInfoList: [], //用户记录
    userRoleInfoList: [],// 用户角色记录
    couponPushList: [],//优惠券推送记录
    couponsList: [],
    drawerVisible: false,
    // chooseList:[],
    isSuccess: true,
    status: '',
    startTime: '',
    endTime: '',
    date:'',


  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // if (pathMatchRegexp('/marketing/targetedCoupons', location.pathname)) {
        //   dispatch({
        //     type: 'getUserByPhone',
        //     payload: {},
        //   })

        // }

      })
    },
  },

  effects: {
    /**
     * 获取优惠券列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *createPush({ payload }, { call, put }) {
      const response = yield call(createPush, payload)
      return response;
    },
    /**
     * 获取优惠券列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *queryCouponsList({ payload }, { call, put }) {
      const response = yield call(couponsList, payload)
      if (response && response.flag) {
        let couponsList = response.resData.records;
        yield put({
          type: 'updateState',
          payload: {
            couponsList,
            pagination: {
              pageNum: Number(payload.pageNum) || 1,
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

    /**
     * 获取外部用户角色
     * @param {*} param0 
     * @param {*} param1 
     */
    *getUserRole({ payload }, { call, put }) {
      const response = yield call(getUserRole, payload)
      if (response && response.flag) {
        let userRoleInfoList = response.resData;
        for (let i = 0; userRoleInfoList && i < userRoleInfoList.length; i++) {
          userRoleInfoList[i].key = userRoleInfoList[i].id.toString()
          userRoleInfoList[i].disabled = false
        }
        yield put({
          type: 'updateState',
          payload: {
            userRoleInfoList,
            userInfoList: []
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
    /**
     * 获取推送记录列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *getCouponPushList({ payload }, { call, put }) {
      const response = yield call(getCouponPushList, payload)
      if (response && response.flag) {
        const startTime = payload.startTime;
        const endTime = payload.endTime;
        let couponPushList = response.resData.records;
        yield put({
          type: 'updateState',
          payload: {
            couponPushList,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
            status: payload.status || '',
            startTime,
            endTime,
            date: startTime
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
    /**
     * 使用手机号查询用户信息
     */
    *getUserByPhone({ payload }, { call, put }) {
      const response = yield call(getUserByPhone, payload)
      if (response && response.flag) {
        let userInfoList = response.resData.list;
        for (let i = 0; userInfoList && i < userInfoList.length; i++) {
          // userInfoList[i].key = i.toString()
          userInfoList[i].key = userInfoList[i].id.toString()

          // targetKeys.push(i.toString())
          userInfoList[i].disabled = false
        }
        yield put({
          type: 'updateState',
          payload: {
            userInfoList,
            userRoleInfoList: [],
            // targetKeys,
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
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    drawerVisibleTrue(state, { payload }) {
      return { ...state, ...payload, drawerVisible: true }
    },

    drawerVisibleFalse(state, { payload }) {
      return { ...state, ...payload, drawerVisible: false }
    },
    isSuccessTrue(state, { payload }) {
      return { ...state, ...payload, isSuccess: true }
    },
    isSuccessFalse(state, { payload }) {
      return { ...state, ...payload, isSuccess: false }
    },

  },
}
