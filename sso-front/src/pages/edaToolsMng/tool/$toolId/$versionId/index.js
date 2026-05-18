import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Page from 'components/Page/Page'
import FunctionList from './components/List'
import FunctionModal from './components/FunctionModal'
import debounce from 'lodash/debounce'
import { Row, Button, Breadcrumb, Col } from 'antd'
import Link from 'umi/link';
import ParamsListModal from './components/ParamsListModal'
import ParamsModal from './components/ParamsModal'

@connect(({ app, tool, loading }) => ({ app, tool, loading }))
class ToolFunction extends PureComponent {
  state = {
    functionId: undefined,
    paramsListMdlVisible: false,
    currentParamItem: {},
    paramsMdlVisible: false,
    paramsMdlType: 'create'
  }

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = () => {
    const { dispatch, match: { params: { toolId, versionId } } } = this.props

    dispatch({
      type: 'tool/getToolFunctions',
      payload: { versionId },
    })

    dispatch({
      type: 'tool/queryTaskType',
      payload: {},
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
    const { dispatch, tool, loading } = this.props
    const { taskTypes, versionList } = tool

    return {
      taskTypes,
      dataSource: versionList,
      loading: loading.effects['tool/getToolFunctions'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'tool/deleteFunction',
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
        dispatch({
          type: 'tool/getParams',
          payload: value
        }).then(() => {
          this.setState({
            paramsListMdlVisible: true,
            functionId: value.functionId
          })
        })
      }
    }
  }


  get modalProps() {
    const { dispatch, tool, loading, match: { params: { versionId } } } = this.props
    const { taskTypes, currentItem, modalVisible, modalType } = tool

    return {
      taskTypes,
      width: 600,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${modalType}Function`],
      title: `${modalType === 'create' ? '新增工具Function' : '修改工具Function'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `tool/${modalType}Function`,
          payload: {
            toolVersionId: versionId,
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


  get paramsListModalProps() {
    const { dispatch, tool, loading } = this.props
    const { paramsList } = tool
    const { functionId, paramsListMdlVisible } = this.state;

    const list = paramsList && paramsList.length > 0 && paramsList[0].params;

    return {
      onShowParamsMdl: () => {
        this.setState({
          paramsMdlVisible: true,
        })
      },
      modalProps: {
        width: 1000,
        visible: paramsListMdlVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        title: '参数列表',
        centered: true,
        footer: null,
        onCancel: () => {
          this.setState({
            paramsListMdlVisible: false,
            functionId: undefined
          })
        },
      },
      tableProps: {
        dataSource: list,
        loading: loading.effects['tool/getParams'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'tool/deleteParam',
            payload: values,
          }).then(() => {
            dispatch({
              type: 'tool/getParams',
              payload: { functionId }
            })
          })
        }, 1000),
        onEditItem: (item) => {
          this.setState({
            paramsMdlVisible: true,
            paramsMdlType: 'update',
            currentParamItem: item
          })
        },
      }
    }
  }

  get paramsModalProps() {
    const { dispatch, tool, loading } = this.props
    const { paramsMdlVisible, paramsMdlType, currentParamItem, functionId } = this.state;

    return {
      width: 600,
      item: paramsMdlType === 'create' ? {} : currentParamItem,
      visible: paramsMdlVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${paramsMdlType}Param`],
      title: `${paramsMdlType === 'create' ? '新增工具参数' : '修改工具参数'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `tool/${paramsMdlType}Param`,
          payload: {
            functionId,
            params: [{
              ...data
            }],
            stepName: 1
          },
        }).then(() => {
          dispatch({
            type: 'tool/getParams',
            payload: { functionId }
          })

          this.setState({
            paramsMdlVisible: false,
            currentParamItem: {}
          })
        })
      }, 1000),
      onCancel: () => {
        this.setState({
          paramsMdlVisible: false,
          currentParamItem: {},
          paramsMdlType: 'create'
        })
      },
    }
  }

  render() {
    const { match: { params: { toolId } } } = this.props
    const versionPath = `/tool/${toolId}`

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '14px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/edaToolsMng/tool'>工具信息管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/edaToolsMng${versionPath}`}>版本信息</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>功能信息</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginBottom: '16px' }}>
            <Button onClick={this.onAdd}>新增</Button>
          </Col>
        </Row>
        <FunctionList {...this.listProps} />
        <FunctionModal {...this.modalProps} />
        <ParamsListModal {...this.paramsListModalProps} />
        <ParamsModal {...this.paramsModalProps} />
      </Page>
    )
  }
}

export default ToolFunction
