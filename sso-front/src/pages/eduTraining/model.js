import { message } from 'antd';
import { isEqual } from 'lodash';
import { pathMatchRegexp } from '../../utils'
import {
  addOneEdu,
  updateOneEdu,
  eduList,
  oneFormFillList,
  userFillFormAudit,
  modifyOneTrainStatus,
  exportOne,
  getKeyValue,
  getOneTrainDetailById
} from './service.js'

export default {
  namespace: 'eduTraining',

  state: {
    eduList: [], //教学列表
    modalVisible: false,//报名列表modal\
    formFillList: [],//报名列表
    // currentItem: {},//更新的教学数据
    sign: 'add',
    courseDirectionList: [], 
    currentItem: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/eduTraining', location.pathname)) {
        }
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


    // 下载Excel模板
    *downloadTemplate({ payload = {} }, { call, put }) {
      const response = yield call(exportOne, payload)
      let blob = new Blob([response.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
      let fileName = decodeURI(response.headers['content-disposition']);
      if (fileName) {
        fileName = fileName.substring(fileName.indexOf('=') + 1);
      }

      let url = window.URL.createObjectURL(blob);
      // 生成一个a标签
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);  // 下载完成释放URL 对象
      document.body.removeChild(link); // 移除a标签
    },
    /**
     * 添加一个教学
     * @returns 
     */
    *addOneEdu({ payload = {} }, { call, put }) {
      const response = yield call(addOneEdu, payload)
      return response;
    },

    /**
 * 更新一个教学
 * @returns 
 */
    *updateOneEdu({ payload = {} }, { call, put }) {
      const response = yield call(updateOneEdu, payload)
      return response;
    },


    /**
     * 
     * @returns 
     */
    *userFillFormAudit({ payload = {} }, { call, put }) {
      const response = yield call(userFillFormAudit, payload)
      return response;
    },



    /**
     * 获取教学列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *queryEduList({ payload = {} }, { call, put }) {
      const response = yield call(eduList, payload)
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
     * 获取教学列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *oneFormFillList({ payload = {} }, { call, put }) {
      const response = yield call(oneFormFillList, payload)
      if (response && response.flag) {
        console.log('response', response);
        console.log('response123', response.resData.records);
        yield put({
          type: 'updateState',
          payload: {
            formFillList: response.resData.records,
            pagination1: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            formFillList: [],
          },
        })
      }
    },

    /**
     * 修改报名状态
     * @param {*} param0 
     * @param {*} param1 
     */
    *modifyOneTrainStatus({ payload = {} }, { call, put }) {
      const response = yield call(modifyOneTrainStatus, payload)
      return response;
    },


    /**
         * 查询课程介绍
         * @param {*} param0 
         * @param {*} param1 
         */
    *queryOneTrainDetailById({ payload = {} }, { call, put }) {
      const response = yield call(getOneTrainDetailById, payload)
      if (response && response.flag) {
        const currentItem = response.resData;
        return currentItem
      }
    },


  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },


  },
}
