import { addOneSalesman, listSalesman, oneSalesmanQrCode } from './service.js'

export default {
  namespace: 'salesmanMng',

  state: {
    salemanList:[],

  },

  subscriptions: {

  },

  effects: {

    //添加一个业务员
    *addOneSalesman({ payload = {} }, { put, call }) {
      const response = yield call(addOneSalesman,  payload )
      return response;
    },

    //校验账户信息
    *listSalesman({ payload = {} }, { put, call }) {
      const response = yield call(listSalesman, payload)
      console.log('payload',payload);
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            salemanList: resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: resData.total || 0,
            },
          }
        })
      }
    },

    //获取一个渠道二维码
    *oneSalesmanQrCode({ payload = {} }, { call, put }) {
      const response = yield call(oneSalesmanQrCode, payload)
      if (response && response.flag) {

      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
