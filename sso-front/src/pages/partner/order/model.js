import { listOneRegistration } from './service.js'

export default {
  namespace: 'order',

  state: {
    orderList: [],
  },

  subscriptions: {

  },

  effects: {

    //校验账户信息
    *queryListOneRegistration({ payload = {} }, { put, call }) {
      const response = yield call(listOneRegistration, payload)
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            orderList: resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: resData.total || 0,
            },
          }
        })
      }
    },
    
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
