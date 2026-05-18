import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, message } from 'antd'
import Page from '../../components/Page/Page'
import List from './components/List'
import Modal from './components/Modal'
import debounce from 'lodash/debounce'

@connect(({ app, department, loading }) => ({ app, department, loading }))
class Department extends PureComponent {

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'department/query'
    })
  }

  get modalProps() {
    const { dispatch, department, loading } = this.props
    const { currentItem, modalVisible, modalType } = department

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`department/${modalType}`],
      title: `${modalType === 'create' ? '新增部门' : '修改部门'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `department/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'department/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, app, department, loading } = this.props
    const { list } = department

    return {
      dataSource: list,
      loading: loading.effects['department/query'],
      onDeleteItem: (values) => {
        dispatch({
          type: 'department/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'department/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }
  }


  handleAddClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'department/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  render() {
    return (
      <Page inner>
        <Row style={{ marginBottom: '16px', textAlign: 'right' }}>
          <Button type="ghost" onClick={this.handleAddClick}>
            新增部门
          </Button>
        </Row>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Department.propTypes = {
  department: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Department
