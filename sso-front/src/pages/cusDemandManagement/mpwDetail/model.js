import { pathMatchRegexp } from '../../../utils'
import { message } from 'antd'
import {
  getDemandList,
  submitMpwDemand,
  reviewMpwDemand,
  getDemandInfoById,
  getInfoByUserName,
  // 多列表
  getFoundryList,
  getProcessNodesList,
  getProcessTypeList,
  getProcessCharacteristicsList,
  getPolyAndMetalList,
  getTopMetalList,
  getCapacitanceList,
  getResistanceList,
  getCorevoltageList,
  getIovoltageList,
  getDesignPackageRequirementsList,
  getTapeOutPlanList,
  createProject,
  downloadReviewResult,
  listFiles,
  createFolder,
  downloadById,
  isEnoughStorage,
  checkStorage,
  deleteFileById,
  deleteRecycleById,
  recycleFileList,
  resumeById,
  emptyRecycleById,
  copyFiles, moveFiles,
  submit,
  getProjectInfo

} from './service.js'
import { isEqual, isEmpty } from 'lodash'

const getNewList = function (list, sublist, currentPath) {
  const folderList = list.map(ele => {
    if (ele.children) {
      getNewList(ele.children, sublist, currentPath)
    }

    if (ele.path === currentPath) {
      ele.children = sublist
    }

    return ele
  })

  return folderList;
}

export default {
  namespace: 'mpw',

  state: {
    demandList: [],//需求列表
    pagination: {},
    userInfo: {},//用户的基本信息
    showReview: false, //用来控制评审相关的显示隐藏
    isDetail: true, //查看详情是不显示评审相关的按钮
    showSubmit: false, //用来控制提交按钮显示隐藏
    showUpdate: false, //修改按钮是否显示
    showUpload: false,
    // 多列表
    foundryList: [],//代工厂里列表
    processNodesList: [],//工艺节点列表
    processTypeList: [],//工艺类型列表
    processCharacteristicsList: [],//工艺特征列表
    polyAndMetalList: [],//Poly和Metal的使用
    topMetalList: [],//顶层金属
    capacitanceList: [],//电容
    resistanceList: [],//电阻
    corevoltageList: [],//Core电压
    iovoltageList: [],//IO器件电压
    designPackageRequirementsList: [], //设计包需求
    tapeOutPlanList: [], //流片计划
    demandObj: {},//需求对象
    buildProjectVisible: false, //控制生成项目modal
    surveysModalVisible: false, //控制满意度调查modal
    verifyFileModalVisible: false, //控制验证文件modal

    btnLoading: false,

    modalVisible: false,
    currentPath: '/',  //文件列表初始默认查看路径
    list: [],
    operateAuth: {},   // 当前路径下的操作权限
    selectedRowKeys: [],
    treeModalType: 'move',
    treeModalVisible: false,
    folderList: [
      {
        path: "/",
        dir: true,
      },
    ],        //复制/移动弹出框，列表数据
    currentSelectFolder: {},    // “移动/复制”窗口，树状数据当前选中的文件夹
    recycleFileList: [],
    storage: {},                // 存储空间
    // capacityList: [], //可购买套餐列表
    // capatityOrderslist: [],//订单
    // VmCapaDetail: [],//订单详情

    isShowText: false,//点击的目录，用来判断是否有扩容功能
    fileList: [],                     // 上传弹出框文件列表
    satisfaction:{},


    leftReadOnly:false, //左边只读
    rightReadOnly:false,//右边只读

    projectInfo:{},
  },



  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/mpw/createMpw', location.pathname)) {
          dispatch({
            type: 'updateState',
            payload: {
              showReview: false
            },
          })
        }
      })
    },
  },



  effects: {
    /**
     * 
     * @param {*} param0 
     * @param {*} param1 
     * @returns 
     */
    *submitSatis({ payload }, { call, put }) {
      const response = yield call(submit, payload)
      return response;
    },



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

    *emptyRecycle({ payload }, { call, put }) {
      const response = yield call(emptyRecycleById, payload)
      return response;
    },

    /**
     * 下载文件
     * @param {*} param0 
     * @param {*} param1 
     */
    *download({ payload }, { call, put }) {
      const response = yield call(downloadById, payload)
      if (response && !response.flag && response.errMessage) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *deleteRecycleById({ payload }, { call, put }) {
      const response = yield call(deleteRecycleById, payload)
      return response
    },

    *deleteFileById({ payload }, { call, put }) {
      const response = yield call(deleteFileById, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: [],
          },
        })
        message.config({
          top: 100,
          duration: 2,
        });
        message.success('删除成功！')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *isEnoughStorage({ payload }, { call, put }) {
      const response = yield call(isEnoughStorage, payload)
      return response;
    },
    *checkStorage({ payload }, { call, put }) {
      const response = yield call(checkStorage, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            storage: response.resData,
            path: payload.path || ''
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

    *moveFiles({ payload }, { call, put }) {
      const response = yield call(moveFiles, payload)
      if (response && response.flag) {

        yield put({
          type: 'hideTreeModal',
          payload: {
            currentSelectFolder: {},
            selectedRowKeys: []
          },
        })

        message.config({
          top: 100,
          duration: 2,
        });
        message.success('移动完成！')

      } else {
        yield put({
          type: 'hideTreeModal',
          payload: {
            currentSelectFolder: {},
            selectedRowKeys: []
          },
        })

        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *zipFile({ payload }, { call, put }) {
      const response = yield call(zipFile, payload)
      if (response && response.flag) {
        // message.config({
        //   top: 100,
        //   duration: 2,
        // });
        // message.success('压缩完成！')

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *unZipFile({ payload }, { call, put }) {
      const response = yield call(unZipFile, payload)
      if (response && response.flag) {
        // message.config({
        //   top: 100,
        //   duration: 2,
        // });
        // message.success('文件解压完成！')

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *copyFiles({ payload }, { call, put }) {
      const response = yield call(copyFiles, payload)
      if (response && response.flag) {

        yield put({
          type: 'hideTreeModal',
          payload: {
            currentSelectFolder: {},
            selectedRowKeys: []
          },
        })

        message.config({
          top: 100,
          duration: 2,
        });
        message.success('复制完成！')

      } else {
        yield put({
          type: 'hideTreeModal',
          payload: {
            currentSelectFolder: {},
            selectedRowKeys: []
          },
        })

        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },



    *query({ payload = {} }, { call, put }) {
      const path = payload.currentPath || ''
      const response = yield call(listFiles, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.list,
            currentPath: payload.currentPath,
            selectedRowKeys: [],
            operateAuth: {
              canCreateDir: response.resData.canCreateDir,
              canUpload: response.resData.canUpload,
              canDeleted: response.resData.canDeleted,
              canDownload: response.resData.canDownload,
              canMove: response.resData.canMove,
              canCopy: response.resData.canCopy,
              canZip: response.resData.canZip
            }
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

    *queryFolderList({ payload = {} }, { call, put, select }) {
      const response = yield call(listFiles, payload)
      const { folderList } = yield select(_ => _.mpw)

      if (response && response.flag) {
        const newFolderList = getNewList(folderList, response.resData.list, payload.currentPath)
        console.log('newFolderList', newFolderList);
        yield put({
          type: 'updateState',
          payload: {
            folderList: newFolderList
          },
        })
      }
    },

    *addFolder({ payload }, { call, put }) {
      const response = yield call(createFolder, payload)
      return response
    },

    // 流片计划
    *getTapeOutPlanList({ payload = {} }, { call, put }) {
      const response = yield call(getTapeOutPlanList, payload)
      return response
    },
    // 设计包需求
    *getDesignPackageRequirementsList({ payload = {} }, { call, put }) {
      const response = yield call(getDesignPackageRequirementsList, payload)
      return response
    },
    // IO器件电压
    *getIovoltageList({ payload = {} }, { call, put }) {
      const response = yield call(getIovoltageList, payload)
      return response
    },
    // Core电压
    *getCorevoltageList({ payload = {} }, { call, put }) {
      const response = yield call(getCorevoltageList, payload)
      return response
    },
    // 获取电阻
    *getResistanceList({ payload = {} }, { call, put }) {
      const response = yield call(getResistanceList, payload)
      return response
    },
    // 获取电容
    *getCapacitanceList({ payload = {} }, { call, put }) {
      const response = yield call(getCapacitanceList, payload)
      return response
    },
    // 获取顶层金属
    *getTopMetalList({ payload = {} }, { call, put }) {
      const response = yield call(getTopMetalList, payload)
      return response
    },
    // 获取Poly和Metal的使用
    *getPolyAndMetalList({ payload = {} }, { call, put }) {
      const response = yield call(getPolyAndMetalList, payload)
      return response
    },
    // 获取工艺特征列表
    *getProcessCharacteristicsList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessCharacteristicsList, payload)
      return response
    },
    // 获取工艺类型列表
    *getProcessTypeList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessTypeList, payload)
      return response
    },
    // 获取工艺节点列表
    *getProcessNodesList({ payload = {} }, { call, put }) {
      const response = yield call(getProcessNodesList, payload)
      return response
    },
    // 获取代工厂列表
    *getFoundryList({ payload = {} }, { call, put }) {
      const response = yield call(getFoundryList, payload)
      return response
    },




    *resume({ payload }, { call, put }) {
      const response = yield call(resumeById, payload)
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



    *getDemandList({ payload = {} }, { call, put }) {
      const response = yield call(getDemandList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            demandList: response.resData.list,
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
    // 通过用户useName获取用户信息
    *getInfoByUserName({ payload }, { call, put, select }) {
      const response = yield call(getInfoByUserName, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: response.resData
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

    //提交流片需求
    *submitMpwDemand({ payload }, { call, put, select }) {
      const response = yield call(submitMpwDemand, payload)
      return response
      // const response = yield call(submitMpwDemand, payload)
      // if (response && response.flag) {
      //   message.success(`提交成功`);
      // } else {
      //   message.config({
      //     top: 100,
      //     duration: 2,
      //   });
      //   message.error(response.errMessage)
      // }
    },
    *getDemandInfoById({ payload }, { call, put, select }) {
      const response = yield call(getDemandInfoById, payload)
      return response
    },

    *reviewMpwDemand({ payload }, { call, put, select }) {
      const response = yield call(reviewMpwDemand, payload)
      return response
    },

    *createProject({ payload }, { call, put, select }) {
      const response = yield call(createProject, payload)
      return response
    },

    *downloadReviewResult({ payload }, { call, put, select }) {
      const response = yield call(downloadReviewResult, payload)
      if (response && !response.flag && response.errMessage) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *getProjectInfo({ payload }, { call, put, select }) {
      const response = yield call(getProjectInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            projectInfo: response.resData
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
    hideBuildModal(state, { payload }) {
      return { ...state, ...payload, buildProjectVisible: false }
    },
    showBuildModal(state, { payload, }) {
      return { ...state, ...payload, buildProjectVisible: true }
    },
    hideSurveysModal(state, { payload }) {
      return { ...state, ...payload, surveysModalVisible: false }
    },
    showSurveysModal(state, { payload }) {
      return { ...state, ...payload, surveysModalVisible: true }
    },
    hideVerifyFileModal(state, { payload }) {
      return { ...state, ...payload, verifyFileModalVisible: false }
    },
    showVerifyFileModal(state, { payload }) {
      return { ...state, ...payload, verifyFileModalVisible: true }
    },


    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },

    showTreeModal(state, { payload }) {
      return { ...state, ...payload, treeModalVisible: true }
    },

    hideTreeModal(state, { payload }) {
      return { ...state, ...payload, treeModalVisible: false }
    },
  },
}
