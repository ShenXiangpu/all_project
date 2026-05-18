import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import withRouter from 'umi/withRouter';
import Page from 'components/Page';
import { Skeleton, Descriptions, Tooltip, Breadcrumb, Button, Icon } from 'antd'
import FileEditorModal from 'components/FileEditorModal'
import PreviewModal from './components/PreviewModal'
import JobMain from './components/JobMain'
import PublicLibsModal from '../components/PublicLibsModal';
import ExecuteTaskModal from '../components/ExecuteTaskModal';
import SubTaskLogModal from './components/SubTaskLogModal';
import styles from './style.less';
import debounce from 'lodash/debounce';
import { isEqual, isEmpty } from 'lodash';
import store from 'store'
import Link from 'umi/link';
import { wsConnect, wsInit, wsClose } from 'services/api'

let logWS;    // 日志 WebSocket

@withRouter
@connect(({ app, task, loading }) => ({ app, task, loading }))
class TaskResult extends Component {

  state = {
    jobId: undefined,
    fieldValueList: [],            // 某个任务的字段列表
    fieldName: undefined,     // 正在匹配文件的字段
  }

  componentDidMount() {
    this.handleQuery();

    const { task: { fieldValueList } } = this.props;
    if (fieldValueList) {
      this.setState({ fieldValueList })
    }
  }

  componentWillUnmount() {
    // 断开连接
    logWS && wsClose(logWS);

    // 清空日志
    dispatch({
      type: 'task/updateState',
      payload: {
        taskJobLog: '',
      },
    })
  }

  handleQuery = () => {
    const { dispatch, match: { params: { taskId } } } = this.props

    dispatch({
      type: 'task/getTaskById',
      payload: { taskId },
    })

    dispatch({
      type: 'task/getJobList',
      payload: { taskId },
    })

    // 执行任务的参数
    dispatch({
      type: 'task/getTaskParams',
      payload: {
        taskId
      }
    })
  }

  componentDidUpdate(preProps) {
    const { task: { fieldValueList } } = this.props;
    const { task: { fieldValueList: old_fieldValueList } } = preProps;

    if (fieldValueList && !isEqual(fieldValueList, old_fieldValueList)) {
      this.setState({ fieldValueList })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/updateState',
      payload: {
        versionList: [],
        inputList: [],
        outputList: [],
        taskLog: [],
        fieldValueList: []
      },
    })
  }

  logWsConnect = (values) => {
    const { task, dispatch } = this.props;
    let { taskJobLog, subTaskLog } = task;

    const user = store.get('user');
    const userId = user && user.userInfo && user.userInfo.id;

    const host = window.location.host;
    const jobValue = values.jobId || values.jobName;
    const url = `wss://${host}/wslog/queryLog/${userId}/${jobValue}/${values.subjobName}/${values.subtaskInput}/${values.logPath}`;
    // const url = `wss://172.18.0.95:30227/queryLog/${userId}/${jobValue}/${values.subjobName}/${values.subtaskInput}/${values.logPath}`;   // 本地测试
    logWS = wsConnect(url);
    wsInit(logWS, (value) => {
      const jobData = jobValue.trim();
      if (!isEmpty(jobData)) { // 主任务
        taskJobLog = taskJobLog.concat(value + '\n');
        dispatch({
          type: 'task/updateState',
          payload: {
            taskJobLog,
          },
        })
      } else {  // 子任务
        subTaskLog = subTaskLog.concat(value + '\n');
        dispatch({
          type: 'task/updateState',
          payload: {
            subTaskLog,
          },
        })
      }
    })
  }

  get modalProps() {
    const { dispatch, task, loading } = this.props;
    const { logVisible, logContent } = task;
    return {
      logContent,
      loading: loading.effects['task/previewResultLog'],
      visible: logVisible,
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: 'TODO文件名',
      centered: true,
      footer: null,
      onCancel() {
        dispatch({
          type: 'task/hidePreviewModal'
        })
      },
    }
  }

  get resultProps() {
    const { dispatch, task, app, loading, match: { params: { taskId } } } = this.props;
    const { jobList, subtaskList, pagination, outputList, currentTask } = task;
    let { taskJobLog } = task;
    const { jobId, fieldValueList } = this.state;
    const { fileList } = app;

    const currentVersionArr = jobList.filter(item => isEqual(item.jobId, jobId));
    const currentJob = currentVersionArr && currentVersionArr[0];

    let platform = 'cloudcomputing';
    if (currentJob && currentJob.jobName && !currentJob.jobName.startsWith('zkxy')) {
      platform = 'supercomputing';
    }

    return {
      taskId,
      jobId,
      currentJob,
      version: currentJob && currentJob.version,
      jobList,
      subTaskListProps: {
        loading: loading.effects['task/getSubtaskList'],
        dataSource: subtaskList,
        pagination,
        onChange: (pagination, filters, sorter) => {
          this.handleTableChange(pagination, filters, sorter)
        },
        onDeleteSubTask: id => {
          dispatch({
            type: 'task/deleteSubTask',
            payload: [id]
          }).then(() => {
            const params = {
              pageNum:
                subtaskList.length === 1 && pagination.current > 1
                  ? pagination.current - 1
                  : pagination.current,
              pageSize: pagination.pageSize,
              taskId,
              jobId,
            };

            dispatch({
              type: 'task/getSubtaskList',
              payload: params,
            });
          })
        },
        onSubTaskLogClick: values => {
          dispatch({
            type: 'task/showSubTaskLogModal',
            payload: {
              currentSubTask: values
            }
          })
        }
      },
      cancelBtnLoading: loading.effects['task/cancelJob'],
      onCancelJob: () => {
        dispatch({
          type: 'task/cancelJob',
          payload: { jobId },
        })
      },
      logProps: {
        taskJobLog,
        onGetTaskJobLog: () => {
          if (currentJob && currentJob.jobId && currentJob.logPath) {
            const data = {
              jobId: currentJob.jobId,
              subjobName: ' ',
              subtaskInput: ' ',
              logPath: currentJob.logPath.replaceAll('/', ',.')
            }
            if (!logWS || (logWS && isEqual(logWS.readyState, 3))) {
              this.logWsConnect(data);
            }
          }
        },
        closeLogConnect: () => {
          if (logWS && isEqual(logWS.readyState, 1)) {
            wsClose(logWS);
          }
        }
      },
      inProps: {
        platform,
        item: currentTask,
        fieldValueList,
        inLoading: jobList.length > 0 ? loading.effects['task/getInputFieldsValues'] : false,
        onOk: debounce(data => {
          dispatch({
            type: 'task/execute',
            payload: data,
          }).then(() => {
            this.handleQuery();
          })
        }, 1000),
        onPreviewTask: values => {
          dispatch({
            type: 'task/showEditModal',
            payload: {
              editorModalType: 'preview',
              fileName: values.fileName
            }
          })
        },
        onSetfieldValueList: value => {
          this.setState({
            fieldValueList: value
          })
        },
        showDataModal: (fieldName) => {
          this.setState({ fieldName });
          // 弹出共享数据选择窗口
          dispatch({
            type: 'task/showLibsModal'
          })
        },
        uploaderProps: {
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
          rootPath: currentTask.workDir,
          currentPathId: currentTask.folderId,
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
                taskPathId: currentTask.folderId
              },
            })
          }
        },
      },
      outProps: {
        outputList,
        outLoading: loading.effects['task/getOutputList'],
        onDownloadResult: value => {
        },
        onDeleteResult: value => {
          dispatch({
            type: 'task/deleteResultLog',
            payload: {
              resultId: value,
            }
          }).then(() => {
            this.handleQuery()
          })
        }
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, match: { params: { taskId } } } = this.props;
    const { jobId } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      taskId,
      jobId,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'task/getSubtaskList',
      payload: params,
    });
  };

  getTaskVersionLog = (values) => {
    const { dispatch, task } = this.props;
    let { taskLog } = task;
    let versionLog = taskLog && taskLog[`${values.jobId}`];

    if (!isEmpty(versionLog) && values.startLine === 0) {
      return;
    }

    dispatch({
      type: 'task/getTaskLog',
      payload: {
        ...values
      }
    }).then(response => {
      if (response && response.flag) {
        const platform = response.resData.platform;
        if (platform === 'cloudcomputing') { //云平台：递归自调
          const total = response.resData.total;
          const startLine = response.resData.startLine;
          if (startLine < total) { // 迭代
            if (versionLog && versionLog instanceof Array) {
              versionLog = versionLog.concat(response.resData.log);
            } else {
              versionLog = response.resData.log;
            }

            if (taskLog) {
              taskLog[`${values.jobId}`] = versionLog;
              dispatch({
                type: 'updateState',
                payload: {
                  taskLog
                },
              })
            }

            const data = {
              ...values,
              startLine
            }
            this.getTaskVersionLog(data);
          } else { // 结束
            if (values.startLine === 0) {
              versionLog = response.resData.log;
            } else {
              if (versionLog && versionLog instanceof Array) {
                versionLog = versionLog.concat(response.resData.log);
              } else {
                versionLog = response.resData.log;
              }
            }

            if (taskLog) {
              taskLog[`${values.jobId}`] = versionLog;
              dispatch({
                type: 'task/updateState',
                payload: {
                  taskLog: taskLog
                },
              })
            }
          }

        } else { // 超算平台：结果一次返回
          if (taskLog) {
            taskLog[`${values.jobId}`] = response.resData.log;
            dispatch({
              type: 'task/updateState',
              payload: {
                taskLog: taskLog,
              },
            })
          }
        }
      }
    })
  }

  get subTaskProps() {
    const { dispatch, task, loading } = this.props;
    const { jobList } = task;
    const { jobId } = this.state;
    return {
      listProps: {
        jobId,
        dataSource: jobList,
        versionLoading: loading.effects['task/getJobList'],
        onGetSubTask: (values) => {
          dispatch({
            type: 'task/getSubtaskList',
            payload: values
          })
        },
        onGetLog: (values) => {
          // 查看版本对应的日志
          // dispatch({
          //   type: 'task/getTaskLog',
          //   payload: {
          //     ...values,
          //     startLine: 0
          //   }
          // })
          const data = {
            ...values,
            startLine: 0
          }
          this.getTaskVersionLog(data);
        },
        onGetOuts: (values, platform) => {
          // 查看版本对应的输出文件
          if (isEqual(platform, 1)) {
            dispatch({
              type: 'task/getOutputList',
              payload: values
            })
          } else if (isEqual(platform, 2)) {
            dispatch({
              type: 'task/getOutputListSuper',
              payload: values
            })
          }
        },
        onGetIns: values => {
          dispatch({
            type: 'task/getInputFieldsValues',
            payload: values
          })
        },
        onSetTaskVersion: value => {
          this.setState({ jobId: value });

          // 断开连接
          logWS && wsClose(logWS);

          // 清空日志
          dispatch({
            type: 'task/updateState',
            payload: {
              taskJobLog: '',
            },
          })
        }
      },
      resultProps: this.resultProps
    }
  }


  get formModalProps() {
    const { fieldValueList } = this.state;
    const { dispatch, task, loading, app } = this.props
    const { formVisible, modalType, currentTask, netList } = task;
    const { fileList } = app;

    return {
      loading: loading.effects['task/getTaskParams'],
      fieldValueList,
      item: currentTask,
      netList,  // 网表文件(子任务列表)
      visible: formVisible,
      width: 800,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`task/${modalType}`],
      title: this.setTaskTitle(currentTask),
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
        rootPath: currentTask.workDir,
        currentPathId: currentTask.folderId,
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
              // taskPath: currentTask.workDir
              taskPathId: currentTask.folderId
            },
          })
        }
      },
    }
  }

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

  get libsModalProps() {
    const { fieldValueList, fieldName } = this.state;
    const { dispatch, task, loading } = this.props;
    const { libsModalVisible, currentTask } = task;

    return {
      loading: loading.effects['task/getFilesByPath'],
      taskPathId: currentTask.folderId,
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

  handleClick = e => {
    e.preventDefault();
    const { dispatch, match: { params: { taskId } } } = this.props;

    // 根据任务类型获取执行任务的对应表单
    dispatch({
      type: 'task/getTaskParams',
      payload: {
        taskId
      }
    }).then(() => {
      dispatch({
        type: 'task/showModal',
        payload: {
          modalType: 'execute',
        }
      })
    })
  }

  get subTaskLogMdlProps() {
    const { task, dispatch } = this.props;
    const { subTaskLogMdlVisible, subTaskLog, currentSubTask } = task;

    return {
      subTaskLog,
      visible: subTaskLogMdlVisible,
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: `子任务日志: ${currentSubTask && currentSubTask.subjobName}`,
      centered: true,
      footer: null,
      onCancel: () => {
        dispatch({
          type: 'task/hideSubTaskLogModal',
          payload: {
            subTaskLog: '',
            currentSubTask: {}
          }
        })

        // 断开连接
        logWS && wsClose(logWS);
      },
      subTaskWsConnect: () => { // ws连接
        this.logWsConnect(currentSubTask);
      },
      subTaskWsClose: () => {
        dispatch({
          type: 'task/hideSubTaskLogModal',
          payload: {
            subTaskLog: '',
            currentSubTask: {}
          }
        })

        // 断开连接
        logWS && wsClose(logWS);
      }
    }
  }

  render() {
    const { task: { currentTask }, loading } = this.props;
    const despLoading = loading.effects['task/getTaskById'];

    const description = (
      <Skeleton loading={despLoading}>
        <Descriptions className={styles.headerList} size="small" column={3}>
          <Descriptions.Item label="任务名称">{currentTask && currentTask.taskName}</Descriptions.Item>
          <Descriptions.Item label="工具">{currentTask && currentTask.toolName}</Descriptions.Item>
          <Descriptions.Item label="工具版本">{currentTask && currentTask.toolVersion}</Descriptions.Item>
          <Descriptions.Item label="feature">{currentTask && currentTask.featureName}</Descriptions.Item>
          <Descriptions.Item label="任务创建时间">{currentTask && currentTask.createdAt}</Descriptions.Item>
        </Descriptions>
      </Skeleton>
    );

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '5px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/task'>任务管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>执行结果</Breadcrumb.Item>
        </Breadcrumb>

        <h3 className={styles.header}>
          {currentTask && currentTask.taskName}
          <Button type="primary" onClick={this.handleClick}>执行任务</Button>
        </h3>

        <div className={styles.panel}>
          {description}
        </div>

        <div className={styles.wrap}>
          <h3 className={styles.title}>
            执行结果
          </h3>
          <JobMain {...this.subTaskProps} />
        </div>

        <ExecuteTaskModal {...this.formModalProps} />

        <PreviewModal {...this.modalProps} />
        <FileEditorModal {...this.editorModalProps} />
        <PublicLibsModal {...this.libsModalProps} />
        <SubTaskLogModal {...this.subTaskLogMdlProps} />
      </Page>
    )
  }
}

TaskResult.propTypes = {
  taskId: PropTypes.string,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default TaskResult
