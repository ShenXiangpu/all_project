import { pathMatchRegexp } from '../../utils'
import { pageModel } from 'utils/model'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { isEmpty } from 'lodash';

import {
  queryVmList,
  queryVmPagedList,
  getConsoleUrl,
  getResourceUsage,
  create,
  createVmOrder,
  getVmTypes,
  getVmStandardList,
  getToolList,
  checkVmName,
  powerOffVM,
  powerOnVM,
  rebootVM,
  suspendVM,
  getVmByVmId,
  queryVMPerformanceSummary,
  queryPeriodPerformance,
  getConsole,
  queryDeptList,
  queryEnterpriseUserList,
  queryDeptUserList,
  queryGroupList,
  queryGroupUserList,
  cn2py,
  user2py,
  checkHostname,
  getConsoleForUser,
  calcCost,
  calcVMCost,
  getVMSnapshotList,
  getVmInfoBySnapshotName,
  deleteAllSnapshot,
  deleteSnapshot,
  revertVM,
  getPolicyByVmId,
  updatePolicy,
  changeUserCounts,
  getRebateList,

  getNetworkList,

  getAlarmConfigsByVmId,
  getIcSupportAlarmTypes,
  validateAlarmName,
  addOrUpdatePolicy,
  deleteAlarmConfig,

  queryAlarmEvent,
  handleNameToChinese,
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'vm',

  state: {
    list: [],                          // 虚拟机列表

    currentStep: 0,                    // 创建虚拟机时，默认当前所处的步骤
    toolList: [],                      // 工具列表
    vmTypes: [],                       // 虚拟机分类列表，计算型、内存型、通用型
    templateList: [],                  // 系统大小设置的模板列表，包括内存、cpu、磁盘等

    // remoteModalVisible: false,        // 远程连接窗口
    // chartsData: [],                   // 资源监控页面，各个图表的数据
    vmInfo: {},                          // 某台虚拟机的全部信息

    selectedRowKeys: [],

    vmPerformanceSummary: {},            // VM性能摘要
    vmChartsData: [],                    // VM时间段内性能指标

    remoteConn: {},                      // 远程连接信息

    deptList: [],                        // 部门列表
    groupList: [],                       // 群组列表
    userList: [],                        // 多用户选择列表（部门内或群组内）
    selectedUserKeys: [],                // 当前选择的群组/部门内的用户列表
    userPyList: [],                      // 用户姓名转拼音列表
    currentUserPy: undefined,            // 当前用户的用户名拼音

    resetVmMdlVisible: false,             // 调整资源窗口
    currentItem: {},                      // 当前VM

    calcPrice: {},                        // 升降配计算价格
    calcVmPrice: {},                      // 创建VM时计算价格

    snapshotMdlVisible: false,            // 创建快照窗口
    snapshotList: [],                     // 快照列表
    snapshotPolicy: {},                   // VM快照策略
    snapshotCfmMdlVisible: false,         // 快照回滚确认窗口
    snapshotDetail: {},                   // 某快照详情

    rechargeMdlVisible: false,            // 续费窗口

    usersMdlVisible: false,               // 多用户管理窗口

    rebateList: [],                        // 时间及相应折扣列表

    networkList: [],                        // 网络规格list

    alarmConfigList: [],                    // VM的告警策略列表
    alarmTypes: [],                         // VM告警配置类型
    alarmHistory: [],                       // VM告警历史
    policyMdlVisible: false,                // 告警策略窗口
    policyMdlType: 'create',                 // 窗口状态：新增、编辑
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/vm', location.pathname)) {
          // dispatch({
          //   type: 'query',
          //   payload: {},
          // })
        }
      })
    },
  },

  effects: {
    // *query({ payload = {} }, { call, put }) {
    //   const response = yield call(queryVmList, payload)
    //   if (response && response.flag) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         list: response.resData,
    //         selectedRowKeys: [],
    //       },
    //     })
    //   }
    // },

    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryVmPagedList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: (response.resData && response.resData.result) || [],
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: (response.resData && response.resData.total) || 0,
              selectedRowKeys: [],
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

    *getResourceUsage({ payload = {} }, { call, put }) {
      const response = yield call(getResourceUsage, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            chartsData: response.resData ? response.resData : [],
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            chartsData: [],
          },
        })
      }
    },


    *getToolList({ payload = {} }, { call, put }) {
      const response = yield call(getToolList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            toolList: response.resData,
          },
        })
      }
    },

    *getVmTypes({ payload = {} }, { call, put }) {
      const response = yield call(getVmTypes, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmTypes: response.resData,
          },
        })
      }
    },

    *getVmStandardList({ payload = {} }, { call, put }) {
      const response = yield call(getVmStandardList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            templateList: response.resData,
          },
        })
      }
    },

    *validateVmName({ payload }, { call, put }) {
      const response = yield call(checkVmName, payload)
      if (response && response.flag) {
        return response.resData;
      }
      return true;
    },

    *create({ payload }, { call, put }) {
      const response = yield call(create, payload)
      return response;
    },

    // 生成创建VM订单
    *createVmOrder({ payload }, { call, put }) {
      const response = yield call(createVmOrder, payload)
      return response;
    },

    *powerOffVM({ payload }, { call, put }) {
      const response = yield call(powerOffVM, payload)
      if (response && response.flag) {
        message.success('云服务器已关机');
        yield put({
          type: 'query',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *powerOnVM({ payload }, { call, put }) {
      const response = yield call(powerOnVM, payload)
      if (response && response.flag) {
        message.success('云服务器已开机');
        yield put({
          type: 'query',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *rebootVM({ payload }, { call, put }) {
      const response = yield call(rebootVM, payload)
      if (response && response.flag) {
        message.success('云服务器已重启');
        yield put({
          type: 'query',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *suspendVM({ payload }, { call, put }) {
      const response = yield call(suspendVM, payload)
      if (response && response.flag) {
        message.success('云服务器已挂起');
        yield put({
          type: 'query',
          payload: {},
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getVmByVmId({ payload }, { call, put }) {
      const response = yield call(getVmByVmId, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmInfo: response.resData,
          },
        })
      }
      return response;
    },

    *queryVMPerformanceSummary({ payload }, { call, put }) {
      const response = yield call(queryVMPerformanceSummary, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmPerformanceSummary: response.resData,
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

    *queryPeriodPerformance({ payload }, { call, put }) {
      const response = yield call(queryPeriodPerformance, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmChartsData: response.resData,
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

    *getConsole({ payload }, { call, put }) {
      const response = yield call(getConsole, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            remoteConn: response.resData,
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

    // 查询所有部门
    *queryDeptList({ payload }, { call, put }) {
      const response = yield call(queryDeptList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            deptList: response.resData,
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

    // 查询部门内用户
    *queryEnterpriseUserList({ payload }, { call, put }) {
      const response = yield call(queryEnterpriseUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userList: (response.resData && response.resData.list) || [],
            // pagination: {
            //   current: Number(payload.pageNum) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: (response.resData && response.resData.total) || 0,
            //   selectedUserKeys: [],
            // },
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

    *queryDeptUserList({ payload }, { call, put }) {
      const response = yield call(queryDeptUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userList: (response.resData && response.resData.list) || [],
            // pagination: {
            //   current: Number(payload.pageNum) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: (response.resData && response.resData.total) || 0,
            //   selectedUserKeys: [],
            // },
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

    // 查询所有群组
    *queryGroupList({ payload }, { call, put }) {
      const response = yield call(queryGroupList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            groupList: response.resData,
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

    // 查询群组内用户（尚未创建VM账号的用户）
    *queryGroupUserList({ payload }, { call, put }) {
      const response = yield call(queryGroupUserList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userList: response.resData || []
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

    *cn2py({ payload }, { call, put }) {
      const response = yield call(cn2py, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentUserPy: response.resData,
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

    *user2py({ payload }, { call, put }) {
      const response = yield call(user2py, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userPyList: response.resData,
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

    *checkHostname({ payload }, { call, put }) {
      const response = yield call(checkHostname, payload)
      if (response && response.flag) {
        return response.resData;
      }
      return true;
    },

    *getConsoleForUser({ payload }, { call, put }) {
      const response = yield call(getConsoleForUser, payload)
      return response;
    },

    // *calcCost({ payload }, { call, put }) {
    //   const response = yield call(calcCost, payload)
    //   if (response && response.flag) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         calcPrice: response.resData,
    //       },
    //     })
    //   } else {
    //     message.config({
    //       top: 100,
    //       duration: 2,
    //     });
    //     message.error(response.errMessage)
    //   }
    // },

    *calcVMCost({ payload }, { call, put }) {
      const response = yield call(calcVMCost, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            calcVmPrice: response.resData,
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

    *getVMSnapshotList({ payload }, { call, put }) {
      const response = yield call(getVMSnapshotList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            snapshotList: response.resData,
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

    *deleteAllSnapshot({ payload }, { call, put }) {
      const response = yield call(deleteAllSnapshot, payload)
      if (response && response.flag) {
        message.success('全部快照删除成功！');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *deleteSnapshot({ payload }, { call, put }) {
      const response = yield call(deleteSnapshot, payload)
      if (response && response.flag) {
        message.success('快照删除成功！');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 某快照详情，快照回滚确认窗口
    *getVmInfoBySnapshotName({ payload }, { call, put }) {
      const response = yield call(getVmInfoBySnapshotName, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            snapshotDetail: response.resData,
          },
        })

        yield put({
          type: 'showSnapshotCfmMdl'
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 从指定快照恢复VM
    *revertVM({ payload }, { call, put }) {
      const response = yield call(revertVM, payload)
      if (response && response.flag) {
        message.success('VM恢复成功！');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 根据VMID获取该VM的快照策略
    *getPolicyByVmId({ payload }, { call, put }) {
      const response = yield call(getPolicyByVmId, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            snapshotPolicy: response.resData,
          },
        })

        yield put({
          type: 'showSnapshotMdl',
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 变更某VM的快照策略
    *updatePolicy({ payload }, { call, put }) {
      const response = yield call(updatePolicy, payload)
      if (response && response.flag) {
        message.success('快照策略修改成功！');
        yield put({
          type: 'hideSnapshotVmMdl',
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // VM关联多用户的编辑
    *changeUserCounts({ payload }, { call, put }) {
      const response = yield call(changeUserCounts, payload)
      if (response && response.flag) {
        message.success(`${payload.vmId} 多用户编辑成功！`);
        yield put({
          type: 'hideUsersMdl',
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 获取购买时间及折扣列表
    *getRebateList({ payload }, { call, put }) {
      const response = yield call(getRebateList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            rebateList: response.resData,
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

    // 获取网络宽带规格的列表
    *getNetworkList({ payload }, { call, put }) {
      const response = yield call(getNetworkList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            networkList: response.resData,
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

    // 获取VM告警策略列表
    *getAlarmConfigsByVmId({ payload }, { call, put }) {
      const response = yield call(getAlarmConfigsByVmId, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            alarmConfigList: response.resData,
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

    // 获取IC设计云支持的告警配置类型
    *getIcSupportAlarmTypes({ payload }, { call, put }) {
      const response = yield call(getIcSupportAlarmTypes, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            alarmTypes: response.resData,
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

    *validateAlarmName({ payload }, { call, put }) {
      const response = yield call(validateAlarmName, payload)
      if (response && response.flag) {
        return response.resData;
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
      return false;
    },

    *addOrUpdatePolicy({ payload }, { call, put }) {
      const response = yield call(addOrUpdatePolicy, payload)
      if (response && response.flag) {
        if (!isEmpty(payload.alarmId)) {
          message.success(payload.enabled ? `${payload.name} 已启用` : `${payload.name} 已停用`);
        } else {
          message.success('告警策略添加成功');
        }

        yield put({
          type: 'hidePolicyMdl',
        })

        yield put({
          type: 'getAlarmConfigsByVmId',
          payload: {
            vmId: payload.vmId
          }
        })

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *deleteAlarmConfig({ payload }, { call, put }) {
      const response = yield call(deleteAlarmConfig, payload)
      if (response && response.flag) {
        message.success('告警策略删除成功');

        yield put({
          type: 'getAlarmConfigsByVmId',
          payload: {
            vmId: payload.vmId
          }
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    //告警历史
    *queryAlarmEvent({ payload }, { call, put }) {
      const response = yield call(queryAlarmEvent, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            alarmHistory: (response.resData && response.resData.result) || [],
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: (response.resData && response.resData.total) || 0,
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
    //告警历史
    *handleNameToChinese({ payload }, { call, put }) {
      const response = yield call(handleNameToChinese, payload)
      return response.resData
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    showRemoteModal(state, { payload }) {
      return { ...state, ...payload, remoteModalVisible: true }
    },

    hideRemoteModal(state) {
      return { ...state, remoteModalVisible: false, remoteConn: {} }
    },

    showResetVmModal(state, { payload }) {
      return { ...state, ...payload, resetVmMdlVisible: true }
    },

    hideResetVmModal(state, { payload }) {
      return { ...state, ...payload, resetVmMdlVisible: false }
    },

    showSnapshotMdl(state, { payload }) {
      return { ...state, ...payload, snapshotMdlVisible: true }
    },

    hideSnapshotVmMdl(state) {
      return { ...state, snapshotMdlVisible: false, snapshotPolicy: {} }
    },

    showSnapshotCfmMdl(state, { payload }) {
      return { ...state, ...payload, snapshotCfmMdlVisible: true }
    },

    hideSnapshotCfmMdl(state) {
      return { ...state, snapshotCfmMdlVisible: false, snapshotDetail: {} }
    },

    showRechargeMdl(state, { payload }) {
      return { ...state, ...payload, rechargeMdlVisible: true }
    },

    hideRechargeMdl(state, { payload }) {
      return { ...state, ...payload, rechargeMdlVisible: false }
    },

    showUsersMdl(state, { payload }) {
      return { ...state, ...payload, usersMdlVisible: true }
    },

    hideUsersMdl(state, { payload }) {
      return { ...state, ...payload, usersMdlVisible: false }
    },

    showPolicyMdl(state, { payload }) {
      return { ...state, ...payload, policyMdlVisible: true }
    },

    hidePolicyMdl(state, { payload }) {
      return { ...state, ...payload, policyMdlVisible: false }
    },
  },
})
