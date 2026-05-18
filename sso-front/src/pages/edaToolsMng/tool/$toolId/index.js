import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import Page from 'components/Page/Page'
import ToolVersionList from './components/List'
import ToolVersionModal from './components/ToolVersionModal'
import EnvListModal from './components/EnvListModal'
import EnvModal from './components/EnvModal'
import debounce from 'lodash/debounce'
import { Row, Button, Breadcrumb, Col } from 'antd'
import Link from 'umi/link';
import { isEqual } from 'lodash'

@connect(({ app, tool, loading }) => ({ app, tool, loading }))
class ToolVersion extends PureComponent {
  state = {
    toolVersionId: undefined,
    envListMdlVisible: false,
    currentEnvItem: {},
    envMdlVisible: false,
    envMdlType: 'create'
  }

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = () => {
    const { dispatch, match: { params: { toolId } } } = this.props

    dispatch({
      type: 'tool/getVersions',
      payload: { toolId },
    })
  }

  onAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'tool/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  get listProps() {
    const { dispatch, tool, loading, match: { params: { toolId } } } = this.props
    const { versionList } = tool

    return {
      dataSource: versionList,
      loading: loading.effects['tool/getVersions'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'tool/deleteVersion',
          payload: values,
        }).then(() => {
          this.handleQuery()
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'tool/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onFeatureClick: value => {
        router.push({
          pathname: `/edaToolsMng/tool/${toolId}/${value.id}`
        })
      },
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
      }
    }
  }


  get modalProps() {
    const { dispatch, tool, loading, match: { params: { toolId } } } = this.props
    const { currentItem, modalVisible, modalType } = tool

    return {
      width: 600,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${modalType}Version`],
      title: `${modalType === 'create' ? '新增工具版本' : '修改工具版本'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `tool/${modalType}Version`,
          payload: {
            toolId,
            ...data
          },
        }).then(() => {
          this.handleQuery()
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
    const { envList } = tool
    const { envListMdlVisible, toolVersionId } = this.state;

    return {
      onShowEnvCfgMdl: () => {
        this.setState({
          envMdlVisible: true,
          envMdlType: 'create',
        })
      },
      modalProps: {
        width: 1000,
        visible: envListMdlVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        title: '环境变量',
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
        dataSource: envList,
        loading: loading.effects['tool/getToolEnv'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'tool/delToolEnv',
            payload: { envId: values },
          }).then(() => {
            dispatch({
              type: 'tool/getToolEnv',
              payload: { toolVersionId }
            })
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
    const { envMdlVisible, envMdlType, currentEnvItem, toolVersionId } = this.state;

    return {
      width: 600,
      item: envMdlType === 'create' ? {} : currentEnvItem,
      visible: envMdlVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${envMdlType}ToolEnv`],
      title: `${envMdlType === 'create' ? '新增环境变量' : '修改环境变量'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        console.log('envMdlType:', envMdlType);
        let params = {};
        if (isEqual(envMdlType, 'create')) {
          params = {
            toolVersionId,
            variable: [{
              ...data
            }]
          }
        } else if (isEqual(envMdlType, 'update')) {
          params = data
        }

        dispatch({
          type: `tool/${envMdlType}ToolEnv`,
          payload: params,
        }).then(() => {
          dispatch({
            type: 'tool/getToolEnv',
            payload: { toolVersionId }
          })

          this.setState({
            envMdlVisible: false,
            currentEnvItem: {}
          })
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
          <Breadcrumb.Item>版本信息</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginBottom: '16px' }}>
            <Button onClick={this.onAdd}>新增</Button>
          </Col>
        </Row>
        <ToolVersionList {...this.listProps} />
        <ToolVersionModal {...this.modalProps} />
        <EnvListModal {...this.envListMdlProps} />
        <EnvModal {...this.envModalProps} />
      </Page>
    )
  }
}

ToolVersion.propTypes = {
  tool: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ToolVersion
