import { uploadHeadImg } from './service.js'

export default {
  namespace: 'baseInfo',

  state: {
    cropperModalVisible: false
  },

  subscriptions: {

  },

  effects: {
    *uploadHeadImg({ payload = {} }, { call, put }) {
      const response = yield call(uploadHeadImg, payload)

      yield put({
        type: 'updateState',
        payload: { errorMessage: response.flag ? '' : response.errMessage }
      })
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    showCropperModal(state, { payload }) {
      return { ...state, ...payload, cropperModalVisible: true }
    },

    hideCropperModal(state) {
      return { ...state, cropperModalVisible: false }
    },

  },
}
