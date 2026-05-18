import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import Page from '../../../components/Page'
import List from './components/List'
import Modal from './components/Modal'
import ConfigModal from './components/ConfigModal'

@connect(({ app, vendor, loading }) => ({ app, vendor, loading }))
class Vendor extends PureComponent {

  handleQuery = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'vendor/query',
      payload: {}
    })
  }

  handleDeleteItems = () => {
    const { dispatch, vendor } = this.props
    const { list, pagination, selectedRowKeys } = vendor

    dispatch({
      type: 'vendor/multiDelete',
      payload: {
        edaVendorCode: selectedRowKeys,
      },
    }).then(() => {
      this.handleQuery()
    })
  }

  get modalProps() {
    const { dispatch, vendor, loading } = this.props
    const { currentItem, modalVisible, modalType } = vendor

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`vendor/${modalType}`],
      title: `${modalType === 'create' ? '新增EDA厂商' : '修改EDA厂商'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: data => {
        dispatch({
          type: `vendor/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleQuery()
        })
      },
      onCancel() {
        dispatch({
          type: 'vendor/hideModal',
        })
      },
    }
  }

  get configModalProps() {
    const { dispatch, vendor, loading } = this.props
    const { currentItem, configModalVisible, configList } = vendor

    return {
      item: currentItem,
      configList,
      visible: configModalVisible,
      width: 600,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      loading: loading.effects['vendor/getConfigList'],
      configLoading: loading.effects['vendor/sshConfig'],
      operateLoading: loading.effects['vendor/configOperate'],
      replaceBtnLoading: loading.effects['vendor/replaceFile'],
      limitBtnLoading: loading.effects['vendor/limit'],
      title: 'License配置',
      centered: true,
      onCancel() {
        dispatch({
          type: 'vendor/hideConfigModal',
        })
      },
      getConfigList: data => {
        dispatch({
          type: 'vendor/getConfigList',
          payload: data
        })
      },
      onConfig: data => {
        dispatch({
          type: 'vendor/sshConfig',
          payload: {
            ...data
          }
        })
      },
      configOperate: data => {
        dispatch({
          type: 'vendor/configOperate',
          payload: data
        })
      },
      onReplaceFile: data => {
        dispatch({
          type: 'vendor/replaceFile',
          payload: data
        })
      },
      onLimit: data => {
        dispatch({
          type: 'vendor/limit',
          payload: data
        })
      }
    }
  }

  get listProps() {
    const { dispatch, vendor, loading } = this.props
    const { vendorList, selectedRowKeys } = vendor

    return {
      dataSource: vendorList,
      loading: loading.effects['vendor/query'],
      bordered: true,
      pagination: false,
      onDeleteItem: (values, selectedRowKeys) => {
        //判断单独删除的行数据是否已被选中，如果被选中，从选中的数组中移除
        if (selectedRowKeys) { //批量删除
          const index = selectedRowKeys.indexOf(values.vendorCode)
          if (index !== -1) { //存在
            selectedRowKeys.splice(index, 1);
            dispatch({
              type: 'vendor/updateState',
              payload: {
                selectedRowKeys,
              },
            })
          }
        }

        dispatch({
          type: 'vendor/delete',
          payload: values,
        }).then(() => {
          this.handleQuery()
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'vendor/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      // TODO 批量删除
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'vendor/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
      onShowConfigModal(item) {
        dispatch({
          type: 'vendor/showConfigModal',
          payload: {
            currentItem: item,
          },
        })
      }
    }
  }

  onAdd = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'vendor/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  render() {
    const { vendor } = this.props
    const { selectedRowKeys } = vendor

    return (
      <Page inner>
        <Row style={{ marginBottom: 16 }}>
          {selectedRowKeys.length > 0 && (
            <Col span={12}>
              {`选中 ${selectedRowKeys.length} 条 `}
              <Popconfirm
                title="确定删除这些EDA厂商信息吗?"
                placement="left"
                okText="确定" cancelText="取消"
                onConfirm={this.handleDeleteItems}
              >
                <Button type="danger" ghost style={{ marginLeft: 8 }}>
                  删除
                </Button>
              </Popconfirm>
            </Col>
          )}
          <Col span={selectedRowKeys.length > 0 ? 12 : 24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.onAdd}>
              新增
            </Button>
          </Col>
        </Row>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
        <ConfigModal {...this.configModalProps} />
      </Page>
    )
  }
}

Vendor.propTypes = {
  vendor: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Vendor
