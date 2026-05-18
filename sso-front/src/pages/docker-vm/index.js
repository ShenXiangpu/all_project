import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Button, message } from 'antd'
import router from 'umi/router'
import { stringify } from 'qs'
import Page from 'components/Page'
import List from './components/List'
import VmModal from './components/VmModal'
import RemoteModal from './components/RemoteModal'
import debounce from 'lodash/debounce'

@connect(({ app, dockerVm, loading }) => ({ app, dockerVm, loading }))
class DockerVM extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dockerVm/query',
      payload: {},
    })
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'dockerVm/query'
    })
  }

  get listProps() {
    const { dispatch, dockerVm, loading } = this.props
    const { list } = dockerVm

    return {
      dataSource: list,
      loading: loading.effects['dockerVm/query'],
      onShowRemoteModal: values => {
        // 获取 console 窗口地址
        // iframe cookie 问题
        dispatch({
          type: 'dockerVm/getConsoleUrl',
          payload: values
        }).then(() => {
          dispatch({
            type: 'dockerVm/showRemoteModal',
            payload: {},
          })
        })

        // dispatch({
        //   type: 'dockerVm/getConsoleUrl',
        //   payload: values
        // }).then(response => {
        //   if (response && response.flag) {
        //     window.open(response.resData);
        //   } else {
        //     message.config({
        //       top: 100,
        //       duration: 2,
        //     });
        //     message.error(response.errMessage)
        //   }
        // })
      },
      onGetResourceUsage: values => {
        const data = {
          workloadId: values.workloadId,
          projectId: values.projectId,
          timeSpan: '5m',  //初始默认值
        }
        dispatch({
          type: 'dockerVm/getResourceUsage',
          payload: data
        }).then(() => {
          // router.push(`/docker-vm/${values.vmName}`)
          const pathname = `/docker-vm/${values.vmName}`;
          router.push({
            pathname,
            search: stringify(
              {
                workloadId: values.workloadId,
                projectId: values.projectId,
              },
              { arrayFormat: 'repeat' }
            ),
          })
        })
      },
      onGetDetailInfo: values => {
        // const data = {
        //   workloadId: values.workloadId,
        //   projectId: values.projectId,
        //   timeSpan: '5m',  //初始默认值
        // }
        // dispatch({
        //   type: 'dockerVm/getResourceUsage',
        //   payload: data
        // }).then(() => {
        const pathname = `/docker-vm/${values.vmName}`;
        router.push({
          pathname,
          search: stringify(
            {
              workloadId: values.workloadId,
              detail: true
            },
            { arrayFormat: 'repeat' }
          ),
        })
        // })
      }
    }
  }

  get modalProps() {
    const { dispatch, dockerVm, loading } = this.props
    const { currentItem, modalVisible, modalType, toolList, templateList } = dockerVm

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      toolList,
      templateList,
      width: '1070px',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`dockerVm/${modalType}`],
      title: `${modalType === 'create' ? '创建实例' : '编辑实例'
        }`,
      centered: true,
      onOk: debounce(data => {
        dispatch({
          type: `dockerVm/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      handleModalVisible: flag => {
        this.handleModalVisible(flag)
      },
      onCheckVmName: (rule, value, callback) => {
        const { dispatch } = this.props
        if (value) {
          const pattern = /^[a-z]([-a-z0-9]*[a-z0-9])?$/
          if (!pattern.test(value)) {
            callback("请重新输入主机名称（只能包含字母和数字，且以字母开头）");
          } else {
            dispatch({
              type: 'dockerVm/checkVmName',
              payload: {
                vmName: value
              },
            }).then(response => {
              if (response) {
                callback("主机名称已存在，请重新输入");
              } else {
                callback()
              }
            })
          }
        } else {
          // Note: 必须总是返回一个 callback
          callback()
        }
      }
    }
  }

  handleModalVisible = (flag) => {
    const { dispatch } = this.props
    if (!!flag) {
      dispatch({
        type: 'dockerVm/showModal',
        payload: {},
      })
    } else {
      dispatch({
        type: 'dockerVm/hideModal',
        payload: {
        },
      })
    }
  };


  get remoteModalProps() {
    const { dispatch, dockerVm, loading } = this.props;
    const { remoteModalVisible, consoleUrl } = dockerVm;
    return {
      visible: remoteModalVisible,
      consoleUrl,
      loading: loading.effects['dockerVm/getConsoleUrl'],
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '远程连接',
      maxmin: true,
      centered: true,
      footer: null,
      onCancel() {
        dispatch({
          type: 'dockerVm/hideRemoteModal'
        })
      },
    }
  }

  handleAddClick = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'dockerVm/getToolList',
    }).then(() => {
      dispatch({
        type: 'dockerVm/getTemplateList',
      })
    }).then(() => {
      dispatch({
        type: 'dockerVm/showModal',
        payload: {
          modalType: 'create',
        },
      })
    })
  }

  render() {
    return (
      <Page inner>
        <Row style={{ marginBottom: '16px', textAlign: 'right' }}>
          <Button type="primary" onClick={this.handleAddClick}>
            创建实例
          </Button>
        </Row>
        <List {...this.listProps} />
        <VmModal {...this.modalProps} />
        <RemoteModal {...this.remoteModalProps} />
      </Page >
    )
  }
}

DockerVM.propTypes = {
  dockerVm: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default DockerVM
