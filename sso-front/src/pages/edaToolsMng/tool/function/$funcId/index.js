import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import Page from 'components/Page/Page'
import ToolFuncList from './components/List'
import ToolFunctionModal from './components/ToolFunctionModal'
import EnvListModal from './components/EnvListModal'
import EnvModal from './components/EnvModal'
import debounce from 'lodash/debounce'
import { Row, Button, Breadcrumb, Col, message } from 'antd'
import Link from 'umi/link';
import { isEqual } from 'lodash'

@connect(({ app, tool, loading }) => ({ app, tool, loading }))
class ToolFuncMng extends PureComponent {
  state = {
    toolVersionId: undefined,
    envListMdlVisible: false,
    currentEnvItem: {},
    envMdlVisible: false,
    envMdlType: 'create',
    functionId: undefined,//功能id
  }

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = () => {
    const { dispatch, match: { params: { funcId } } } = this.props

    dispatch({
      type: 'tool/getFunctionListByToolId',
      payload: { funcId },
    })
  }

  onAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'tool/queryFunctionTreeList',
    }).then(() => {
      dispatch({
        type: 'tool/showModal',
        payload: {
          modalType: 'add',
        },
      })
    })


  }

  get listProps() {
    const { dispatch, tool, loading, match: { params: { funcId } } } = this.props
    const { functionList, currentItem, modalType } = tool

    return {
      item: modalType === 'add' ? {} : currentItem,
      dataSource: functionList,
      loading: loading.effects['tool/getFunctionListByToolId'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'tool/deleteFunction',
          payload: values,
        }).then((response) => {
          if (response && response.flag) {
            message.success('删除成功')
            this.handleQuery()
          } else {
            message.error('删除失败')
          }
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'tool/queryFunctionTreeList',
        }).then(() => {
          dispatch({
            type: 'tool/showModal',
            payload: {
              modalType: 'update',
              currentItem: item,
            },
          })
        })

      },
      // onFeatureClick: value => {
      //   router.push({
      //     pathname: `/edaToolsMng/tool/${toolId}/${value.id}`
      //   })
      // },
      onGetEnvs: value => {
        dispatch({
          type: 'tool/getToolEnv',
          payload: {
            toolVersionId: value
          },
        }).then(() => {
          this.setState({
            envListMdlVisible: true,
            toolVersionId: value
          })
        })
      },
      onHandleFunctionFeaMng: id => {
        dispatch({
          type: 'tool/getFunctionFeatureListById',
          payload: {
            functionId: id
          },
        })
        this.setState({
          envListMdlVisible: true,
          functionId: id
        })
      }
    }
  }


  get modalProps() {
    const { dispatch, tool, loading, match: { params: { funcId } } } = this.props
    const { modalVisible, modalType, currentItem, functionTypeList } = tool

    return {
      item: modalType === 'add' ? {} : currentItem,
      width: 600,
      funcId,
      functionTypeList,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/addToolFuction`],
      title: isEqual(modalType, 'add') ? `新增功能` : '修改功能',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `tool/${modalType}ToolFuction`,
          payload: {
            ...data
          },
        }).then(response => {

          if (response && response.flag) {
            dispatch({
              type: 'tool/hideModal',
            })
            this.handleQuery()
            message.success(response.resData)
          } else {
            message.error(response.errMessage)
          }

        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'tool/hideModal',
        })
      },
    }
  }
  get envListMdlProps() {
    const { dispatch, tool, loading } = this.props
    const { functionFeatureList } = tool
    const { envListMdlVisible, toolVersionId, functionId } = this.state;

    return {
      onShowEnvCfgMdl: () => {
        this.setState({
          envMdlVisible: true,
        })
      },
      modalProps: {
        width: 1000,
        visible: envListMdlVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        title: '功能Feature',
        centered: true,
        footer: null,
        onCancel: () => {
          this.setState({
            envListMdlVisible: false,
            toolVersionId: undefined
          })
        },
      },
      tableProps: {
        dataSource: functionFeatureList,
        loading: loading.effects['tool/getFunctionFeatureListById'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'tool/delFeatureById',
            payload: { relationId: values },
          }).then((response) => {
            if (response && response.flag) {
              message.success('删除成功')
              dispatch({
                type: 'tool/getFunctionFeatureListById',
                payload: {
                  functionId,
                },
              })
            } else {
              message.error(response.errMessage)
            }

          })
        }, 1000),
        onEditItem: (item) => {
          this.setState({
            envMdlVisible: true,
            envMdlType: 'update',
            currentEnvItem: item
          })
        },
      }
    }
  }

  get envModalProps() {
    const { dispatch, tool, loading } = this.props
    const { envMdlVisible, envMdlType, currentEnvItem, functionId } = this.state;

    return {
      width: 600,
      item: envMdlType === 'create' ? {} : currentEnvItem,
      visible: envMdlVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${envMdlType}FeatureById`],
      title: `${envMdlType === 'create' ? '新增功能Feature' : '修改功能Feature'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        console.log('envMdlType:', envMdlType);
        let params = {};
        if (isEqual(envMdlType, 'create')) {
          params = {
            functionId,
            ...data
          }
        } else if (isEqual(envMdlType, 'update')) {
          params = {
            featureType: data.featureType,
            relationId: data.id
          }
        }

        dispatch({
          type: `tool/${envMdlType}FeatureById`,
          payload: params,
        }).then((response) => {
          if (response && response.flag) {
            message.success(isEqual(envMdlType, 'create') ? `新增成功` : '修改成功')
            dispatch({
              type: 'tool/getFunctionFeatureListById',
              payload: {
                functionId,
              },
            })
            this.setState({
              envMdlVisible: false,
              currentEnvItem: {}
            })
          } else {
            message.error(response.errMessage)
          }
        })
      }, 1000),
      onCancel: () => {
        this.setState({
          envMdlVisible: false,
          currentEnvItem: {},
          envMdlType: 'create'
        })
      },
    }
  }



  render() {

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '14px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/edaToolsMng/tool'>工具信息管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>功能管理</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginBottom: '16px' }}>
            <Button onClick={this.onAdd}>新增</Button>
          </Col>
        </Row>
        <ToolFuncList {...this.listProps} />
        <ToolFunctionModal {...this.modalProps} />
        <EnvListModal {...this.envListMdlProps} />
        <EnvModal {...this.envModalProps} />
      </Page>
    )
  }
}

ToolFuncMng.propTypes = {
  tool: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ToolFuncMng
