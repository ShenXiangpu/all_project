import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  collectInfoAdd,
  exportOne,
  listMine,
  setPath
} from './service.js'
import { isEqual, isEmpty } from 'lodash'



export default {
  namespace: 'formilyDesignable',

  state: {

    schemaList:[]
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
     * 回收站列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *queryRecycleFileList({ payload = {} }, { call, put }) {
      const response = yield call(recycleFileList, payload)

      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            recycleFileList: resData.list,
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            recycleFileList: [],
          },
        })

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
  },
}
