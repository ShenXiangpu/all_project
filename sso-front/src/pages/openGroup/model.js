import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'
import {
  queryGroupList,
  create,
  remove,
  update,

  createUser,
  removeUser,
  updateUser,
  resetPassword,
  queryGroupUserList,
  getUserInfoByParam,

  getGroupByNum,
  personalApply,
  getApplyList,
  verify,
  downloadTemplate,
  importExcel,

  releaseVmsByGroupIds,
  addUserCounts,
  releaseUserCounts,

  getRebateList,
  calcVMCost,
  getVmIdsByGroupId,

  queryVmPagedList,
  powerOffVM,
  powerOnVM,
  rebootVM,
  suspendVM,
  getToolList,
  getVmTypes,
  getVmStandardList,

  getVmNewConfigByGroupId,
  createVmOrder,
  getGroupById,

  existGroup,

  getNetworkList,
} from './service.js'
import { isEqual } from 'lodash'

export default {
  namespace: 'openGroup',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    list: [],

    // 用户
    selectedUserKeys: [],              // 选择用户进行账号操作
    selectedUsers: [],
    currentUserItem: {},
    userModalVisible: false,
    userModalType: 'create',
    userList: [],                       // 用户列表

    applyModalVisible: false,           // 申请加入群组窗口
    groupInfo: {},                      // 根据编号获取的群组信息
    applyInfoMdlVisible: false,         // 申请加入群组窗口：填入验证信息

    applyList: [],                      // 群主待审核入群申请列表
    auditMdlVisible: false,             // 审核不通过窗口
    currentAuditId: undefined,          // 当前审核的申请id

    importExlMdlVisible: false,         // 导入Excel窗口

    vmIds: [],                          // 当前群组下的vmId列表
    userRechargeMdlVisible: false,      // 账号延期窗口
    rebateList: [],                     // 延期时长及相应折扣列表
    calcVmPrice: {},                    // 账号延期导致的VM续费，计算价格

    vmList: [],                         // VM列表
    createResultMdlVisible: false,      // VM创建是否完成，确认窗口

    resetVmMdlVisible: false,           // 一键调整配置窗口
    toolList: [],                       // 工具列表
    vmTypes: [],                        // 虚拟机分类列表，计算型、内存型、通用型
    templateList: [],                   // 系统大小设置的模板列表，包括内存、cpu、磁盘等

    rechargeMdlVisible: false,          // 续费窗口

    currentGroupVMConfig: {},           // 获取当前群组内VM的配置信息
    currentGroup: {},                   // 当前群组信息

    networkList: [],                    // 网络规格list
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/openGroup', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(queryGroupList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const response = yield call(remove, payload)
      if (response && response.flag) {
        message.success("删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *create({ payload }, { call, put }) {
      const response = yield call(create, payload)
      if (response && response.flag) {
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *update({ payload }, { select, call, put }) {
      const response = yield call(update, payload)
      if (response && response.flag) {
        message.success("编辑成功")
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *queryGroupUserList({ payload = {} }, { call, put }) {
      const response = yield call(queryGroupUserList, payload.params)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userList: response.resData.list,
            pagination: {
              current: (payload.params && Number(payload.params.pageNum)) || 1,
              pageSize: (payload.params && Number(payload.params.pageSize)) || 10,
              total: response.resData.total,
            },
            selectedUserKeys: payload.selectedUserKeys,
            selectedUsers: payload.selectedUsers
          },
        })
      }
    },

    *removeUser({ payload }, { call, put, select }) {
      const response = yield call(removeUser, payload)
      if (response && response.flag) {
        message.success("移出成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *createUser({ payload }, { call, put }) {
      const response = yield call(createUser, payload)
      if (response && response.flag) {
        message.success('添加成功')
        yield put({ type: 'hideUserModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *updateUser({ payload }, { select, call, put }) {
      const response = yield call(updateUser, payload)
      if (response && response.flag) {
        message.success('修改成功')
        yield put({ type: 'hideUserModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload)
      if (response && response.flag) {
        message.success('密码重置成功')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getUserInfoByParam({ payload, callback }, { call, put }) {
      const response = yield call(getUserInfoByParam, payload)
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    *getGroupByNum({ payload = {} }, { call, put }) {
      const response = yield call(getGroupByNum, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            groupInfo: response.resData,
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

    // 个人申请入群
    *personalApply({ payload = {} }, { call, put }) {
      const response = yield call(personalApply, payload)
      if (response && response.flag) {
        message.success('验证信息已发送，请耐心等待')
        yield put({
          type: 'hideApplyInfoModal',
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

    // 群主查询待审核的入群申请列表
    *getApplyList({ payload = {} }, { call, put }) {
      const response = yield call(getApplyList, payload.groupId)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            applyList: response.resData,
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

    // 群主审核申请入群信息
    *verify({ payload = {} }, { call, put }) {
      const response = yield call(verify, payload.params)
      if (response && response.flag) {
        message.success('已审核');

        yield put({
          type: 'getApplyList',
          payload: {
            groupId: payload.groupId
          },
        })

        if (payload.params && isEqual(payload.params.status, 2)) {
          yield put({
            type: 'hideAuditModal',
            payload: {},
          })
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 下载Excel模板
    *downloadTemplate({ payload = {} }, { call, put }) {
      const response = yield call(downloadTemplate, payload)
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

    // 导入Excel
    *importExcel({ payload, callback }, { call, put }) {
      const response = yield call(importExcel, payload)
      return response;
    },

    *releaseVmsByGroupIds({ payload = {} }, { call, put }) {
      const response = yield call(releaseVmsByGroupIds, payload.groupIds)
      if (response && response.flag) {
        message.success("该群组下所有IC设计云服务器及关联账号注销成功！")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    // 获取群组下的所有vmId
    *getVmIdsByGroupId({ payload = {} }, { call, put }) {
      const response = yield call(getVmIdsByGroupId, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmIds: response.resData,
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

    *addUserCounts({ payload = {} }, { call, put }) {
      const response = yield call(addUserCounts, payload)
      return response;
    },

    *releaseUserCounts({ payload = {} }, { call, put }) {
      const response = yield call(releaseUserCounts, payload)
      if (response && response.flag) {
        message.success("您所选中的用户IC设计云服务器账号注销成功！")
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

    *queryVmPagedList({ payload = {} }, { call, put }) {
      const response = yield call(queryVmPagedList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            vmList: (response.resData && response.resData.result) || [],
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

    *powerOffVM({ payload }, { call, put }) {
      const response = yield call(powerOffVM, payload)
      if (response && response.flag) {
        message.success('云服务器已关机');
        yield put({
          type: 'queryVmPagedList',
          payload: {
            groupId: payload.groupId
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

    *powerOnVM({ payload }, { call, put }) {
      const response = yield call(powerOnVM, payload)
      if (response && response.flag) {
        message.success('云服务器已开机');
        yield put({
          type: 'queryVmPagedList',
          payload: {
            groupId: payload.groupId
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

    *rebootVM({ payload }, { call, put }) {
      const response = yield call(rebootVM, payload)
      if (response && response.flag) {
        message.success('云服务器已重启');
        yield put({
          type: 'queryVmPagedList',
          payload: {
            groupId: payload.groupId
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

    *suspendVM({ payload }, { call, put }) {
      const response = yield call(suspendVM, payload)
      if (response && response.flag) {
        message.success('云云服务器已挂起');
        yield put({
          type: 'queryVmPagedList',
          payload: {
            groupId: payload.groupId
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

    *getVmNewConfigByGroupId({ payload = {} }, { call, put }) {
      const response = yield call(getVmNewConfigByGroupId, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentGroupVMConfig: response.resData,
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

    // 生成创建VM订单
    *createVmOrder({ payload }, { call, put }) {
      const response = yield call(createVmOrder, payload)
      return response;
    },

    *getGroupById({ payload = {} }, { call, put }) {
      const response = yield call(getGroupById, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            currentGroup: response.resData,
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

    *existGroup({ payload = {} }, { call, put }) {
      const response = yield call(existGroup, payload)
      if (response && response.flag) {
        // message.success('退出成功');
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
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    showUserModal(state, { payload }) {
      return { ...state, ...payload, userModalVisible: true }
    },

    hideUserModal(state) {
      return { ...state, userModalVisible: false }
    },

    showApplyModal(state, { payload }) {
      return { ...state, ...payload, applyModalVisible: true }
    },

    hideApplyModal(state) {
      return { ...state, applyModalVisible: false }
    },

    showApplyInfoModal(state, { payload }) {
      return { ...state, ...payload, applyInfoMdlVisible: true }
    },

    hideApplyInfoModal(state) {
      return { ...state, applyInfoMdlVisible: false }
    },

    showAuditModal(state, { payload }) {
      return { ...state, ...payload, auditMdlVisible: true }
    },

    hideAuditModal(state) {
      return { ...state, auditMdlVisible: false }
    },

    showImportExlModal(state, { payload }) {
      return { ...state, ...payload, importExlMdlVisible: true }
    },

    hideImportExlModal(state) {
      return { ...state, importExlMdlVisible: false }
    },

    showUserRechargeMdl(state, { payload }) {
      return { ...state, ...payload, userRechargeMdlVisible: true }
    },

    hideUserRechargeMdl(state, { payload }) {
      return { ...state, ...payload, userRechargeMdlVisible: false }
    },

    showRechargeMdl(state, { payload }) {
      return { ...state, ...payload, rechargeMdlVisible: true }
    },

    hideRechargeMdl(state, { payload }) {
      return { ...state, ...payload, rechargeMdlVisible: false }
    },

    showCreateResultModal(state, { payload }) {
      return { ...state, ...payload, createResultMdlVisible: true }
    },

    hideCreateResultModal(state, { payload }) {
      return { ...state, ...payload, createResultMdlVisible: false }
    },

    showResetVmModal(state, { payload }) {
      return { ...state, ...payload, resetVmMdlVisible: true }
    },

    hideResetVmModal(state, { payload }) {
      return { ...state, ...payload, resetVmMdlVisible: false }
    },
  },
}
