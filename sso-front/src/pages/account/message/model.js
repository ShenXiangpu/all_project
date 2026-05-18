import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  queryMsgList,
  updateBatch,
  update,
  allReadOrDel,
  queryById,
  canReceive,
  receiveCoupons
} from './service.js'
import { isEqual } from 'lodash-es'

export default modelExtend(pageModel, {
  namespace: 'msg',

  state: {
    list: [],
    selectedRows: [],
    selectedRowKeys: [],
    currentItem: {},
    canUseCouponsList: [],

    isClick: false,//控制立即领取的样式
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {

      })
    },
  },

  effects: {
    /**
     * 
     * @param {*} param0 
     * @param {*} param1 
     */
    *receiveCoupons({ payload = {} }, { call, put }) {
      const response = yield call(receiveCoupons, payload)
      console.log(payload);

      if (response && response.flag) {
        // 点击领取优惠券不刷新列表，改变优惠券的样式，使用isClick标记
        let canUseCouponsList = payload.canUseCouponsList
        canUseCouponsList.find((item) => {
          if(item.id == payload.typeId){
            item.isClick = true
          }
        })
        yield put({
          type: 'updateState',
          payload: {
            canUseCouponsList,
          },
        })
        message.success('领取成功');

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },


    /**
     * 获取用户可以领取的优惠券
     */

    *canReceive({ payload = {} }, { call, put }) {
      const response = yield call(canReceive, payload)
      if (response && response.flag) {
        let canUseCouponsList = response.resData
        canUseCouponsList.map(item => {
          item.isClick = false;
        })
        yield put({
          type: 'updateState',
          payload: {
            canUseCouponsList,
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
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryMsgList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData.result,
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

    *updateBatch({ payload = {} }, { call, put }) {
      const response = yield call(updateBatch, payload.list)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRows: [],
            selectedRowKeys: []
          },
        })

        isEqual(payload.msgStatus, '1') && message.success('成功设置消息为已读');
        isEqual(payload.msgStatus, '2') && message.success('成功删除消息');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage);
      }
    },
    *allReadOrDel({ payload = {} }, { call, put }) {
      const response = yield call(allReadOrDel, payload.status)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRows: [],
            selectedRowKeys: []
          },
        })

        message.success('成功设置全部已读');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage);
      }
    },
    *queryById({ payload = {} }, { call, put }) {
      const response = yield call(queryById, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentItem: response.resData
          },
        })
        
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage);
      }
    },
    *update({ payload = {} }, { call, put }) {
      const response = yield call(update, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRows: [],
            selectedRowKeys: []
          },
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage);
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state, ...payload
      }
    }
  },
})
