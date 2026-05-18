import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import {
  attendForm,
  attendForm2,
  getOneTrainDetailById
} from './service.js'
import { isEqual, isEmpty, reduce } from 'lodash'



export default {
  namespace: 'formilyDesignable',

  state: {
    schemaList: [],//
    schemaModel: '',// 表单json
    modalVisible: false,
    trainDetail:{},
  },



  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // if (pathMatchRegexp('/mpw/createMpw', location.pathname)) {
        //   dispatch({
        //     type: 'updateState',
        //     payload: {
        //       showReview: false
        //     },
        //   })
        // }
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
     * 创建表单json
     * @param {*} param0 
     * @param {*} param1 
     */
    *attendForm({ payload = {} }, { call, put }) {
      const response = yield call(attendForm, payload)
      if (response && response.flag) {
        let resData = response.resData;
        let formJson = resData.formJson;
        message.success('创建成功')
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     formJson
        //   },
        // })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
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
        yield put({
          type: 'updateState',
          payload: {
            schemaModel
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

  // buildProjectVisible:false, //控制生成项目modal
  //   surveysModalVisible:false, //控制满意度调查modal
  //   verifyFileModalVisible:false, //控制验证文件modal
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
