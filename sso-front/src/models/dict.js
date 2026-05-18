import { pathMatchRegexp } from 'utils'
import {
  getProjectDicts
} from '../services/dict';

const DictModel = {
  namespace: 'dict',
  state: {
    processNodeList: [],
    processTypeList: [],
    processCharList: []
  },
  effects: {
    *getProjectDicts({ payload }, { call, put }) {
      const response = yield call(getProjectDicts, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            processCharList: response.resData.processChar,
            processNodeList: response.resData.processNode,
            processTypeList: response.resData.processType,
          }
        })
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/project', location.pathname)) {
          dispatch({
            type: 'getProjectDicts',
            payload: {},
          })

        }
      })
    },
  },
};
export default DictModel;
