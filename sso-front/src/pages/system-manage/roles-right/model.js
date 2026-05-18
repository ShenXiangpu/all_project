import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import { queryMenuList } from '../menus/service'
import {
  queryRoleList,
  getRoleMenus,
  updateRoleMenus
} from './service.js'

export default {
  namespace: 'roleMenus',

  state: {
    list: [],     // menu列表
    roles: [],    // 角色列表
    roleCheckedMenus: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system-manage/roles-right', location.pathname)) {
          // 判断 location.query 是否为空json对象
          const payload = location.query || {}

          dispatch({
            type: 'queryRoleList',
            payload,
          })

          dispatch({
            type: 'query',
            payload,
          }).then(() => {
            // dispatch({
            //   type: 'getRoleMenus',
            //   payload: {
            //     roleCode: 'admin'
            //   },
            // })
          })
        }
      })
    },

  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryMenuList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.resData,
          },
        })
      }
    },

    *queryRoleList({ payload = {} }, { call, put }) {
      const response = yield call(queryRoleList, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            roles: response.resData,
          },
        })
      }
    },

    *getRoleMenus({ payload = {} }, { call, put }) {
      const response = yield call(getRoleMenus, payload)
      if (response && response.flag) {
        yield put({
          type: 'querySuccess',
          payload: {
            roleCheckedMenus: response.resData,
          },
        })
      }
    },

    *update({ payload }, { select, call, put }) {
      const response = yield call(updateRoleMenus, payload)
      if (response && response.flag) {
        message.success('角色权限分配成功！');
        yield put({ type: 'hideModal' })
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
    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
