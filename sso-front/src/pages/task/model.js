import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
// import { pathMatchRegexp } from '../../utils'
import { message } from 'antd'

import {
  getTaskList,
  getUserPath,
  getAllVendor,
  getToolByVendor,
  createTask,
  readNetList,
  executeTask,
  getSubtaskList,
  getJobList,
  cancelJob,
  deleteTask,
  deleteSubTask,
  checkOption,

  getTaskById,
  getToolFields,
  updateTask,
  deleteResultLog,
  previewResultLog,
  getVersionList,
  getInputList,
  getOutputList,
  getOutputListSuper,
  getTaskLog,
  getTaskParams,
  getFilesByPath,
  resumeTask,
  emptyTrash,
} from './service.js'

export default modelExtend(pageModel, {
  namespace: 'task',

  state: {
    currentItem: {},
    list: [],                      // 任务列表
    fieldList: [],                 // 工具字段列表
    netList: [],                   // 网表列表（子任务列表）

    userWorkDir: undefined,        // 用户工作空间目录
    vendorList: [],                // 所有厂商
    vendorToolList: [],            // 某厂商的所有工具
    taskModalVisible: false,

    formVisible: false,            // 执行任务弹出框
    modalType: 'execute',          // execute/update，执行任务/编辑任务
    fieldValueList: [],            // 任务版本对应的工具字段及相应的输入值
    currentTask: {},               // 当前任务
    jobList: [],                   // 任务结果Job列表
    subtaskList: [],               // 子任务列表

    taskJobLog: '',                // 主任务日志
    subTaskLogMdlVisible: false,   // 子任务日志窗口
    currentSubTask: {},            // 当前子任务
    subTaskLog: '',                // 子任务日志


    logVisible: false,             // 预览结果日志弹出框
    logContent: undefined,         // 日志内容
    fileName: undefined,           // 查看/预览的文件名

    versionList: [],                // 任务结果版本列表
    inputList: [],                  // 提交的任务文件（输入）
    outputList: [],                 // 任务结果列表（输出）
    taskLog: [],                    // 任务不同版本对应的日志输出

    referLibsList: [],
    libsModalVisible: false,

    platform: 'cloudcomputing',   // 可运行的平台：cloudcomputing（云平台）、supercomputing（超算）、allcomputing（前二者都可以）
    recycleList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //   history.listen(location => {
      //     if (pathMatchRegexp('/task', location.pathname)) {
      //       dispatch({
      //         type: 'query',
      //         payload: {},
      //       })
      //     }
      //   })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const params = {
        ...payload,
        taskStatus: 1    // 任务状态，1：正常 2：删除
      }
      const response = yield call(getTaskList, params)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.records,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: response.resData.total,
            },
          },
        })
      }
    },

    *getUserPath({ payload = {} }, { call, put }) {
      const response = yield call(getUserPath, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            userWorkDir: response.resData,
          },
        })
      }
    },

    *getAllVendor({ payload = {} }, { call, put }) {
      const response = yield call(getAllVendor, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            vendorList: response.resData,
          },
        })
      }
    },

    *getToolByVendor({ payload = {} }, { call, put }) {
      const response = yield call(getToolByVendor, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            vendorToolList: response.resData,
          },
        })
      }
    },

    *createTask({ payload }, { call, put }) {
      const response = yield call(createTask, payload)
      if (response && response.flag) {
        message.success("任务创建成功");

        yield put({
          type: 'hideTaskModal',
          payload: {
            vendorList: [],
            vendorToolList: [],
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

    *readNetList({ payload }, { call, put }) {
      const response = yield call(readNetList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            netList: response.resData,
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

    *getTaskById({ payload = {} }, { call, put }) {
      const response = yield call(getTaskById, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            currentTask: response.resData,
          },
        })
      }
    },

    // 执行任务时，获取任务对应的输入字段
    *queryFields({ payload = {} }, { call, put }) {
      const response = yield call(getToolFields, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            fieldList: response.resData,
          },
        })
      }
    },

    *execute({ payload }, { call, put }) {
      const response = yield call(executeTask, payload)
      if (response && (response.flag)) {
        message.success("任务已执行");

        yield put({
          type: 'hideModal',
          payload: { currentItem: {} }
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *checkOption({ payload = {} }, { call, put }) {
      const response = yield call(checkOption, payload)
      return response;
    },

    // 获取子任务列表
    *getSubtaskList({ payload = {} }, { call, put }) {
      const response = yield call(getSubtaskList, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            subtaskList: response.resData.records,
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

    *getJobList({ payload = {} }, { call, put }) {
      const response = yield call(getJobList, payload)
      if (response && (response.flag)) {
        const jobList = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            jobList,
          },
        })
        return jobList;
      }

      return [];
    },

    // 取消某个正在执行或排队的任务Job
    *cancelJob({ payload = {} }, { call, put }) {
      const response = yield call(cancelJob, payload)
      if (response && (response.flag)) {
        message.success('任务取消成功！');
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTask, payload)
      if (response && response.flag) {
        if (payload.isDeleteFile) {
          message.success('任务及其数据文件删除成功！')
        } else {
          message.success('任务删除成功（数据文件仍保留）！')
        }
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *deleteSubTask({ payload }, { call, put }) {
      const response = yield call(deleteSubTask, payload)
      if (response && response.flag) {
        message.success('子任务删除成功！')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    *getRecycleList({ payload = {} }, { call, put }) {
      const params = {
        ...payload,
        taskStatus: 2,    // 任务状态，1：正常 2：删除
        pageSize: 100000
      }
      const response = yield call(getTaskList, params)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            recycleList: response.resData.records,
          },
        })
      }
    },

    *update({ payload }, { select, call, put }) {
      const response = yield call(updateTask, payload)
      if (response && (response.flag)) {
        yield put({ type: 'hideModal' })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *deleteResultLog({ payload }, { call, put }) {
      const response = yield call(deleteResultLog, payload)
      if (response && (response.flag)) {
        message.success("删除成功")
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *previewResultLog({ payload = {} }, { call, put }) {
      const response = yield call(previewResultLog, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            logContent: response.resData,
          },
        })
      }
    },

    // 根据任务Id获取任务所对应的所有版本列表
    *getVersionList({ payload = {} }, { call, put }) {
      const response = yield call(getVersionList, payload)
      if (response && (response.flag)) {
        const versionList = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            versionList,
          },
        })
        return versionList;
      }

      return [];
    },

    // 获取执行任务所需参数，包含字段及value
    *getTaskParams({ payload = {} }, { call, put }) {
      const response = yield call(getTaskParams, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            fieldValueList: response.resData,
          },
        })
      }
    },

    // 获取任务版本对应的输入文件列表
    *getInputList({ payload = {} }, { call, put }) {
      const response = yield call(getInputList, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            inputList: response.resData,
          },
        })
      }
    },

    // 获取任务版本对应的输出文件列表
    *getOutputList({ payload = {} }, { call, put }) {
      const response = yield call(getOutputList, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            outputList: response.resData,
          },
        })
      }
    },

    // 获取任务版本对应的输出文件列表, 超算
    *getOutputListSuper({ payload = {} }, { call, put }) {
      const response = yield call(getOutputListSuper, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            outputList: response.resData,
          },
        })
      }
    },

    *getTaskLog({ payload = {} }, { call, put, select }) {
      const response = yield call(getTaskLog, payload)
      if (response && (response.flag)) {
        return response;
      } else if (response && !response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage);
        return;
      }
      return;
    },

    *getFilesByPath({ payload = {} }, { call, put }) {
      const response = yield call(getFilesByPath, payload)
      if (response && (response.flag)) {
        yield put({
          type: 'updateState',
          payload: {
            referLibsList: response.resData,
          },
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
      return response
    },

    *emptyTrash({ payload }, { call, put }) {
      const response = yield call(emptyTrash, payload)
      if (response && response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.success('清空完成！')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *resume({ payload }, { call, put }) {
      const response = yield call(resumeTask, payload)
      if (response && response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.success('还原成功！')
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

    showTaskModal(state, { payload }) {
      return { ...state, ...payload, taskModalVisible: true }
    },

    hideTaskModal(state) {
      return {
        ...state,
        taskModalVisible: false
      }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, formVisible: true }
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload, formVisible: false, netList: [] }
    },

    showPreviewModal(state, { payload }) {
      return { ...state, ...payload, logVisible: true }
    },

    hidePreviewModal(state) {
      return { ...state, logVisible: false }
    },

    showLibsModal(state, { payload }) {
      return { ...state, ...payload, libsModalVisible: true }
    },

    hideLibsModal(state) {
      return { ...state, libsModalVisible: false }
    },

    showSubTaskLogModal(state, { payload }) {
      return { ...state, ...payload, subTaskLogMdlVisible: true }
    },

    hideSubTaskLogModal(state, { payload }) {
      return { ...state, ...payload, subTaskLogMdlVisible: false }
    },
  },
})
