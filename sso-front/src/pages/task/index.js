import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import store from 'store'
import withRouter from 'umi/withRouter';
import { router } from 'utils'
import { stringify } from 'qs'
import { Button, Card, Row, Col, Icon, Tooltip, Drawer, Modal } from 'antd'
import Page from 'components/Page'
import Filter from './components/Filter'
import TaskTable from './components/TaskTable'
import TaskModal from './components/TaskModal'
import ExecuteTaskModal from './components/ExecuteTaskModal'
import PublicLibsModal from './components/PublicLibsModal'
import FileEditorModal from 'components/FileEditorModal'
import styles from './style.less';
import TotalSvg from 'assets/task/task-total2.svg';
import FinishedSvg from 'assets/task/task-finished2.svg';
import TodoSvg from 'assets/task/task-todo3.svg';
import MemberSvg from 'assets/task/members2.svg';
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce'
import recycleBinSvg from 'assets/recycleBin.svg'
import RecycleList from './components/RecycleList'
import { Debounce } from 'lodash-decorators'

const { confirm } = Modal

@withRouter
@connect(({ task, loading, app }) => ({ task, loading, app }))
class Task extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},           // 查询条件
      taskId: undefined,
      fieldValueList: [],       // 某个任务的字段列表
      fieldName: undefined,     // 正在匹配文件的字段
      fieldType: undefined,     // 正则匹配的字段的类型
    };
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    this.handleQuery()
  }

  componentDidUpdate(preProps) {
    const { fieldValueList, formVisible } = this.props.task;
    const { formVisible: old_formVisible } = preProps.task;

    if (formVisible && !isEqual(formVisible, old_formVisible)) {
      this.setState({ fieldValueList })
    }
  }

  handleQuery = (values) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'task/query',
      payload: {
        ...values,
        ...formValues
      }
    })
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'task/query',
      payload: {},
    })
  }

  get filterProps() {
    const { dispatch, loading } = this.props;
    const { formValues } = this.state
    return {
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'task/query',
          payload: {
            ...values
          }
        })
      },
    }
  }

  get listProps() {
    const { dispatch, task, loading } = this.props
    const { list = [], pagination } = task;

    return {
      loading: loading.effects['task/query'],
      dataSource: list,
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onExecuteTask: item => {
        // 根据任务类型获取执行任务的对应表单
        dispatch({
          type: 'task/getTaskParams',
          payload: {
            taskId: item.id
          }
        }).then(() => {
          dispatch({  // 获取当前用户工作空间
            type: 'task/getUserPath',
            payload: {},
          })
        }).then(() => {
          dispatch({
            type: 'task/showModal',
            payload: {
              modalType: 'execute',
              currentItem: item,
            }
          })
        })
      },
      onDeleteItem: (values) => {
        dispatch({
          type: 'task/delete',
          payload: values
        }).then(() => {
          const data = {
            pageNum:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          }
          this.handleQuery(data);
        })
      },
      onEditTask: item => {
        dispatch({
          type: 'task/queryFields',
          payload: {
            taskType: item.taskType,
            toolName: item.toolName,
            toolVersion: item.toolVersion
          }
        }).then(() => {
          dispatch({
            type: 'task/showModal',
            payload: {
              modalType: 'update',
              currentItem: item,
            }
          })
        })
      },
      onShowResult: values => {
        const { location } = this.props
        const { query, pathname } = location

        router.push({
          pathname: pathname + `/${values.id}`,
          search: stringify(
            {
              ...query
            },
            { arrayFormat: 'repeat' }
          ),
        })
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { filterValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filterValues,
      ...filters,
    };

    this.setState({
      filterValues: {
        ...filterValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'task/query',
      payload: params,
    });
  };

  setTaskTitle = (item) => {
    const readme = () => (
      <div style={{ color: '#fff' }}>
        <p>使用说明</p>
        <pre>xxx</pre>
      </div>
    );

    return (
      <div>
        执行任务：{item.taskName}
        <Tooltip placement="bottomLeft" title={readme}>
          <a href="#" style={{ fontSize: '12px', marginLeft: 15 }} >
            使用说明<Icon type="question-circle-o" />
          </a>
        </Tooltip>
      </div>
    )
  }

  get taskModalProps() {
    const { dispatch, task, loading, } = this.props;
    const { taskModalVisible, userWorkDir, vendorList, vendorToolList } = task;

    return {
      userWorkDir,
      vendorList,
      vendorToolList,
      visible: taskModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '新建任务',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      confirmLoading: loading.effects['task/createTask'],
      onOk: debounce(values => {
        dispatch({
          type: 'task/createTask',
          payload: {
            ...values
          },
        }).then(() => {
          dispatch({
            type: 'task/query',
            payload: {},
          })
        })
      }, 1000),
      onCancel: () => {
        dispatch({
          type: 'task/hideTaskModal',
        })
      },
      onGetVendorTools: value => {
        dispatch({
          type: 'task/getToolByVendor',
          payload: {
            vendorId: value
          },
        })
      }
    }
  }

  get formModalProps() {
    const { fieldValueList } = this.state;
    const { dispatch, task, loading, app } = this.props
    const { formVisible, modalType, currentItem, netList } = task;
    const { fileList } = app;

    return {
      loading: loading.effects['task/getTaskParams'],
      fieldValueList,
      item: currentItem,
      netList,  // 网表文件(子任务列表)
      visible: formVisible,
      width: 800,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`task/${modalType}`],
      title: this.setTaskTitle(currentItem),
      centered: true,
      okText: '执行',
      // cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `task/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleQuery()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'task/hideModal'
        })
      },
      onSetfieldValueList: value => {
        this.setState({
          fieldValueList: value
        })
      },
      handleModalVisible: flag => {
        this.handleModalVisible(flag)
      },
      onCheckOption: values => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'task/checkOption',
            payload: values
          }).then(res => {
            reslove(res);
          })
        })
      },
      showDataModal: (fieldName, fieldType) => {
        this.setState({
          fieldName,
          fieldType
        });
        // 弹出共享数据选择窗口
        dispatch({
          type: 'task/showLibsModal'
        })
      },
      uploaderProps: {
        dispatch,
        isTaskUploader: true,
        beforeFileQueued: (file) => {
          if (file.size === 0) {
            alert('不能上传空文件');
            return false;
          }
          return true;
        },
        fileList,
        uploadUrl: '/service/datamanage-service/v1/datamanage/uploadBigFile',
        rootPath: currentItem.workDir,
        currentPathId: currentItem.folderId,
        onChange: (file, list) => console.log('Modal onChange >>>> ', file, list),
        onShowModal: (value) => {
          dispatch({
            type: 'app/showUploadModal',
            payload: {
              webUploader: value
            },
          })
        },
        onSetFileList: (value) => {
          dispatch({
            type: 'app/updateState',
            payload: {
              fileList: value
            },
          })
        },
        refreshList: () => {
          // TODO 刷新任务工作空间下的文件 tree
          dispatch({
            type: 'task/getFilesByPath',
            payload: {
              // taskPath: currentItem.workDir
              taskPathId: currentItem.folderId
            },
          })
        }
      },
    }
  }

  get libsModalProps() {
    const { fieldValueList, fieldName } = this.state;
    const { dispatch, task, loading } = this.props;
    const { libsModalVisible, currentItem } = task;

    return {
      loading: loading.effects['task/getFilesByPath'],
      // taskPath: currentItem.workDir,
      taskPathId: currentItem.folderId,
      title: '选择文件',
      visible: libsModalVisible,
      width: 800,
      destroyOnClose: true,
      maskClosable: false,  // 点击蒙层是否允许关闭，默认 true
      centered: true,
      onCancel: () => {
        dispatch({
          type: 'task/hideLibsModal'
        })
      },
      onSetFieldPath: (path, fileName) => { // 添加选中的文件的路径到对应的field
        const arr = fieldValueList && fieldValueList.params
          && fieldValueList.params.map(item => {
            item.params.map(subItem => {
              // 设置值为选中的文件/文件夹的路径
              if (subItem.name === fieldName) {
                subItem.default_value = path;
              }

              // 是否需要获取子任务列表
              if (isEqual(Number(subItem.need_trigger), 1)) {
                dispatch({
                  type: 'task/readNetList',
                  payload: {
                    path,
                    fileName
                  }
                })
              }

              return subItem;
            })
            return item;
          });

        fieldValueList.params = arr;

        this.setState({
          fieldValueList,
          fieldName: undefined
        });

        dispatch({
          type: 'task/hideLibsModal'
        })
      },
      onLoadFolderList: id => {
        // 根据路径获取文件
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'task/getFilesByPath',
            payload: {
              // taskPath: path
              taskPathId: id
            },
          }).then(res => {
            if (res && res.flag) {
              reslove(res.resData)
            } else {
              reject();
            }
          })
        })
      },
      onShowFile: values => {
        dispatch({
          type: 'app/getFileContent',
          payload: {
            fileId: values.id,
          }
        }).then(() => {
          dispatch({
            type: 'app/showFileEditorModal',
            payload: {
              editorModalType: 'edit',
              fileName: values.title,
              fileId: values.id
            }
          })
        })
      },
    }
  }

  handleModalVisible = (flag) => {
    const { dispatch } = this.props
    if (!!flag) {
      dispatch({
        type: 'task/showModal',
        payload: {},
      })
    } else {
      dispatch({
        type: 'task/hideModal',
        payload: {
          reviewValues: {}
        },
      })
    }
  };

  handleAddClick = () => {
    const { dispatch } = this.props;

    dispatch({  // 获取当前用户工作空间
      type: 'task/getUserPath',
      payload: {},
    }).then(() => {
      dispatch({  // 获取所有厂商列表
        type: 'task/getAllVendor',
        payload: {},
      })
    }).then(() => {
      dispatch({
        type: 'task/showTaskModal',
      })
    })

  }

  get editorModalProps() {
    const { dispatch, app, loading } = this.props;
    const { editorVisible, fileContent, editorModalType, fileName, fileId } = app;
    return {
      fileContent,
      editorModalType,
      loading: loading.effects['app/getFileContent'],
      saveBtnLoading: loading.effects['app/editFileContent'],
      visible: editorVisible,
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: editorModalType === 'edit' ? `查看：${fileName}` : `预览：${fileName}`,
      centered: true,
      footer: null,
      onEditorFile: value => {
        dispatch({
          type: 'app/editFileContent',
          payload: {
            fileContent: value,
            fileId
          }
        })
      },
      onCancel() {
        dispatch({
          type: 'app/hideFileEditorModal',
          payload: {
            fileContent: undefined,
            fileName: undefined,
            fileId: undefined
          }
        })
      },
    }
  }

  render() {
    const { task: { countInfo } } = this.props;
    const user = store.get('user');

    return (
      <Page inner style={{ overflow: 'hidden' }}>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <p>
          <Button icon="plus" type="primary" onClick={this.handleAddClick}>
            新建任务
          </Button>
        </p>

        <TaskTable {...this.listProps} />
        <TaskModal {...this.taskModalProps} />
        <ExecuteTaskModal {...this.formModalProps} />
        <PublicLibsModal {...this.libsModalProps} />
        <FileEditorModal {...this.editorModalProps} />

      </Page>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Task
