import { message } from 'antd'
import router from 'umi/router'
import { pathMatchRegexp } from 'utils'
import {
  queryScopeList,
  createCoupons,
  couponsList,
  handleStatus

} from './service.js'



export default {
  namespace: 'coupons',

  state: {
    scopeList:[],
    couponsList:[],
    isBtnLoading:false,
    status:'all',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
       
        
      })
    },
  },

  effects: {
    /**
     * 获取优惠券使用范围列表
     */
    *queryScopeList({ payload }, { call, put }) {
      const response = yield call(queryScopeList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            scopeList: response.resData,
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
     * 
     */
     *createCoupons({ payload }, { call, put }) {
      const response = yield call(createCoupons, payload)
      if (response && response.flag) {
        message.success('创建成功')
        yield put({
          type: 'updateStateBtnFalse',
          payload: {
          },
        })
        router.push({pathname:'/marketing/coupons'})
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },
    /**
     * 
     */
     *couponsList({ payload }, { call, put }) {
      const response = yield call(couponsList, payload)
      if (response && response.flag) {
        let couponsList = response.resData.records
        yield put({
          type: 'updateState',
          payload: {
            couponsList,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
            status:payload.status
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
     * 使优惠券失效或生效
     */
     *handleStatus({ payload }, { call, put }) {
      const response = yield call(handleStatus, payload)
      return response
      // if (response && response.flag) {
      //   // yield put({
      //   //   type: 'updateState',
      //   //   payload: {
      //   //     status: response.resData,
      //   //   },
      //   // })
      // } else {
      //   message.config({
      //     top: 100,
      //     duration: 2,
      //   });
      //   message.error(response.errMessage)
      // }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    updateStateBtnFalse(state, { payload }) {
      return { ...state, ...payload,isBtnLoading:false }
    },
    updateStateBtnTrue(state, { payload }) {
      return { ...state, ...payload,isBtnLoading:true }
    },
  },
}
