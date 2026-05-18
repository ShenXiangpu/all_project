import { pathMatchRegexp } from 'utils'
import { message } from 'antd'
import {
  queryNavi,
  query,
  queryNewIPList,
  queryHotIPList,
  getIpDetailByID,
  getIpsByProviderName
} from './service.js'

export default {
  namespace: 'ipCloud',

  state: {
    nodeList: [],
    foundryList: [],
    ipCategoryList: [],
    ipProviderList: [],

    list: [],
    swiperList: [],   // 最热列表（轮播）
    newIpList: [],    // 最新列表

    currentIP: {},         // 当前IP详情
    providerIpList: []     // 供应商对应IP列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const params = {
        keyword: payload.keyword || '',
        foundryName: payload.foundryName || '',
        providerName: payload.providerName || '',
        typeName: payload.typeName || '',
        nodeName: payload.nodeName ?
          (payload.nodeName instanceof Array ? payload.nodeName : [payload.nodeName])
          : []
      }

      const response = yield call(query, params)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData
          },
        })
      }
    },

    *queryNavi({ payload = {} }, { call, put }) {
      const response = yield call(queryNavi, payload)
      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            nodeList: resData.nodeList,
            foundryList: resData.foundryList,
            ipProviderList: resData.providerList,
            ipCategoryList: resData.typeList,
          },
        })
      }
    },

    // 推荐列表（轮播列表）
    *querySwiperList({ payload = {} }, { call, put }) {
      const response = yield call(queryHotIPList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            swiperList: response.resData
          },
        })
      }
    },

    *queryNewIPList({ payload = {} }, { call, put }) {
      const response = yield call(queryNewIPList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            newIpList: response.resData
          },
        })
      }
    },

    *getIpDetailByID({ payload = {} }, { call, put }) {
      const response = yield call(getIpDetailByID, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentIP: response.resData
          },
        })

        console.log('in:', response);

        if (response.resData && response.resData.providerName) {
          yield put({
            type: 'getIpsByProviderName',
            payload: {
              companyName: response.resData.providerName
            },
          })
        }
      }
    },

    *getIpsByProviderName({ payload = {} }, { call, put }) {
      const response = yield call(getIpsByProviderName, payload.companyName)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            providerIpList: response.resData
          },
        })
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
