import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import {
  queryDictList,
  createFolder,
  deleteMulti,
  queryRecycleFileList,
  resumeById,
  deleteRecycleById,
  emptyRecycle,
  downloadById,
  moveFiles,
  zipFile,
  unZipFile,
  copyFiles,
  checkStorage,
  queryCapacityList,
  createCaOrder,
  getCapatityOrders,
  getVMDetailByNo,
  getOneUserInfo
} from './service.js'
import { isEmpty,isEqual } from 'lodash'

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
  namespace: 'dictionary',

  state: {
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
    capacityList: [], //可购买套餐列表
    capatityOrderslist: [],//订单
    VmCapaDetail: [],//订单详情

    isShowText: false,//点击的目录，用来判断是否有扩容功能


    downModalVisible: false,//大文件下载延迟时的提示
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/dictionary', location.pathname)) {
          // const payload = isEmpty(location.query) ? {
          //   currentPath: '/'
          // } : location.query;

          // dispatch({
          //   type: 'query',
          //   payload: payload,
          // })
        } else if (pathMatchRegexp('/dictionary/buyCapacity', location.pathname)) {
          dispatch({
            type: 'queryList',
            payload: {},
          })

          dispatch({
            type: 'checkStorage',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    /**
     * getVMDetailByNo 根据订单号获取订单信息
     */
    /**
     * 获得容量预订单号
     */
    *getVMDetailByNo({ payload }, { call, put }) {
      const response = yield call(getVMDetailByNo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            VmCapaDetail: response.resData,
            // pagination: {
            //   current: Number(payload.pageNum) || 1,
            //   pageNum: Number(payload.pageNum) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: response.resData.total,
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


    /**
     * 获取用户扩容信息组成
     * @param {*} param0
     * @param {*} param1
     */
    * getOneUserInfo({ payload }, { call, put }) {
      const response = yield call(getOneUserInfo, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            capatityOrderslist: response.resData,
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
     * 获得容量预订单号
     */
    *createCapacityOrderId({ payload }, { call, put }) {
      const response = yield call(createCaOrder, payload)
      return response;
    },
    /**
    * 查询可购买套餐 state=1
    * @param {*} param0
    * @param {*} param1
    */
    *queryList({ payload = { state: '1' } }, { call, put }) {
      const response = yield call(queryCapacityList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            capacityList: response.resData,
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
    *query({ payload = {} }, { call, put }) {
      // 接收当前文件路径，判断是否显示扩容
      const path = payload.currentPath || ''
     
      yield put({
        type: 'updateState',
        payload: {
          isShowText: false
        },
      })

      if (path && !isEmpty(path)) {
        const index = path.indexOf('vm')
        if (!isEqual(index, -1)) {
          yield put({
            type: 'updateState',
            payload: {
              isShowText: false
            },
          })
        } else {
          yield put({
            type: 'updateState',
            payload: {
              isShowText: true
            },
          })
        }
      }else {
        yield put({
          type: 'updateState',
          payload: {
            isShowText: true
          },
        })
      }

      const response = yield call(queryDictList, payload)
      if (response && response.flag) {
        yield put({
          type: 'updateState',
          payload: {
            list: response.resData.data,
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

    *addFolder({ payload }, { call, put }) {
      const response = yield call(createFolder, payload)
      if (response && response.flag) {
        message.success("添加成功")
        yield put({
          type: 'query',
          payload: {
            currentPath: payload.currentPath
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

    *delete({ payload }, { call, put, select }) {
      const response = yield call(deleteMulti, payload)
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

    *queryFolderList({ payload = {} }, { call, put, select }) {
      const response = yield call(queryDictList, payload)
      const { folderList } = yield select(_ => _.dictionary)

      if (response && response.flag) {
        const newFolderList = getNewList(folderList, response.resData.data, payload.currentPath)
        yield put({
          type: 'updateState',
          payload: {
            folderList: newFolderList
          },
        })
      }
    },

    *queryRecycleFileList({ payload = {} }, { call, put }) {
      const response = yield call(queryRecycleFileList, payload)

      if (response && response.flag) {
        const resData = response.resData;
        yield put({
          type: 'updateState',
          payload: {
            recycleFileList: resData.data,
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

    *deeplyDelete({ payload }, { call, put }) {
      const response = yield call(deleteRecycleById, payload)
      if (response && response.flag) {
        message.config({
          top: 100,
          duration: 2,
        });
        message.success('已从回收站中彻底移除！')
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    },

    *emptyRecycle({ payload }, { call, put }) {
      const response = yield call(emptyRecycle, payload)
      return response;
    },

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

    *moveFiles({ payload }, { call, put }) {
      const response = yield call(moveFiles, payload.fileId)
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

    showTreeModal(state, { payload }) {
      return { ...state, ...payload, treeModalVisible: true }
    },

    hideTreeModal(state, { payload }) {
      return { ...state, ...payload, treeModalVisible: false }
    },
  },
}
