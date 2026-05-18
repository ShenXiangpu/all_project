import { message } from 'antd'
import router from 'umi/router'
import { pathMatchRegexp } from 'utils'
import {
  getKeyValue,
  uploadFile,
  addOne,
  courseList,
  getResourcebyCourseId
} from './service.js'



export default {
  namespace: 'curriculumResource',

  state: {
    courseDirectionList: [
    ],
    sourcesList: [],
    modalVisible: false,
    modalType: 'create',
    sourcesDetail: {},



  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
      })
    },
  },

  effects: {
    /**
     *  获取字典项：课程方向、课程分类等
     */
    *queryKeyValue({ payload }, { call, put }) {
      const response = yield call(getKeyValue, payload)
      return response
    },


    /**
     * 
     */
    *queryResourcebyCourseId({ payload }, { call, put }) {
      const response = yield call(getResourcebyCourseId, payload)
      if (response && response.flag) {
        let resData = response.resData
        yield put({
          type: 'updateState',
          payload: {
            sourcesDetail: resData
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
    *addOne({ payload }, { call, put }) {
      const response = yield call(addOne, payload)
      if (response && response.flag) {
        message.success('课程资源添加成功')
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
    *queryCourseList({ payload }, { call, put }) {
      const response = yield call(courseList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            sourcesList: response.resData.records,
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

    updateModalVisibleHidden(state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },
    updateModalVisibleShow(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
  },
}
