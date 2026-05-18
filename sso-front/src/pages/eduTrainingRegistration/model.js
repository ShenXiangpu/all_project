import { message } from 'antd';
import { isEqual } from 'lodash';
import { pathMatchRegexp } from '../../utils'
import {
  userFillForm,
  oneUserCanLooklist,
  attendForm2,
  oneUserDetail,
  getKeyValue,
  getOneTrainDetailById
} from './service.js'

export default {
  namespace: 'eduTrainingRegistration',

  state: {
    eduList: [], //教学列表
    schemaModel: [],
    formJson: '',
    trainInfoId: '',//培训表单id
    oneUserDetail: {},//细节
    isShowQCode: false,

    courseDirectionList: [],
    sourcesList: [],
    currentItem: {},
    trainDetail: {},
    modalVisible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/eduTrainingRegistration', location.pathname)) {
        }
      })
    },
  },

  effects: {

    /**
     * 查询课程介绍
     * @param {*} param0 
     * @param {*} param1 
     */
    *queryOneTrainDetailById({ payload = {} }, { call, put }) {
      const response = yield call(getOneTrainDetailById, payload)
      if (response && response.flag) {
        const trainDetail = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            trainDetail
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
 *  获取字典项：课程方向、课程分类等
 */
    *queryKeyValue({ payload }, { call, put }) {
      const response = yield call(getKeyValue, payload)
      return response
    },

    /**
     * step3: 用户填写培训的报名表单
     * @returns 
     */
    *userFillForm({ payload = {} }, { call, put }) {
      const response = yield call(userFillForm, payload)
      return response;
    },

    /**
     * 获取教学列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *queryEduList({ payload = {} }, { call, put }) {
      const response = yield call(oneUserCanLooklist, payload)
      console.log(payload);
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            eduList: response.resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    /**
     * 获取表单json
     * @param {*} param0 
     * @param {*} param1 
     */
    *attendForm2({ payload = {} }, { call, put }) {
      const response = yield call(attendForm2, payload)
      if (response && response.flag) {
        let resData = response.resData;
        let schemaModel = JSON.parse(resData.formJson);
        let id = resData.id
        yield put({
          type: 'updateState',
          payload: {
            schemaModel,
            trainInfoId: id
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

    //
    *queryOneUserDetail({ payload = {} }, { call, put }) {
      const response = yield call(oneUserDetail, payload)
      if (response && response.flag) {
        let resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            oneUserDetail: resData
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

    updateStateShowEduModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    updateStateHiddenEduModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },

  },
}
