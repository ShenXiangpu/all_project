import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'
import Page from '../../components/Page/Page'
import List from './components/List'
import Modal from './components/Modal'
import ApplyModal from './components/ApplyModal'
import ApplyInfoModal from './components/ApplyInfoModal'
import debounce from 'lodash/debounce'
import store from 'store'

@connect(({ app, openGroup, loading }) => ({ app, openGroup, loading }))
class Department extends PureComponent {
  state = {
    currentUserId: undefined,  // 当前登录用户ID
    isCompanyUser: false       // 是否为企业用户
  }

  componentDidMount() {
    const user = store.get('user') || {};
    const userId = user && user.userInfo && user.userInfo.id;
    const companyId = user && user.userInfo && user.userInfo.companyId;
    this.setState({
      currentUserId: userId,
      isCompanyUser: companyId ? true : false
    })
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'openGroup/query'
    })
  }

  get modalProps() {
    const { dispatch, openGroup, loading } = this.props
    const { currentItem, modalVisible, modalType } = openGroup

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`openGroup/${modalType}`],
      title: `${modalType === 'create' ? '新增群组' : '修改群组'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `openGroup/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'openGroup/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, app, openGroup, loading } = this.props
    const { list } = openGroup
    const { currentUserId } = this.state;

    return {
      userId: currentUserId,
      dataSource: list,
      loading: loading.effects['openGroup/query'],
      onDeleteItem: (values) => {
        dispatch({
          type: 'openGroup/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'openGroup/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      showUserInfo: id => {
        dispatch({
          type: 'app/getUserInfoById',
          payload: {
            userId: id
          },
        }).then(() => {
          dispatch({
            type: 'app/showUserInfoModal'
          })
        })
      },
      onExist: vlaue => { // 退出群组
        dispatch({
          type: 'openGroup/existGroup',
          payload: vlaue,
        }).then(() => {
          this.handleRefresh()
        })
      }
    }
  }

  get applyMdlProps() {
    const { dispatch, openGroup, loading } = this.props
    const { applyModalVisible, groupInfo } = openGroup

    return {
      groupInfo,
      visible: applyModalVisible,
      width: 800,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      loading: loading.effects['openGroup/getGroupByNum'],
      title: '申请加入群组',
      centered: true,
      footer: null,
      onGetGroupInfo: value => {
        dispatch({
          type: 'openGroup/getGroupByNum',
          payload: {
            groupNum: value
          },
        })
      },
      showUserInfo: id => {
        dispatch({
          type: 'app/getUserInfoById',
          payload: {
            userId: id
          },
        }).then(() => {
          dispatch({
            type: 'app/showUserInfoModal'
          })
        })
      },
      showApplyInfoMdl: () => {
        dispatch({
          type: 'openGroup/showApplyInfoModal',
        })
      },
      onCancel() {
        dispatch({
          type: 'openGroup/hideApplyModal',
          payload: {
            groupInfo: {}
          }
        })
      },
    }
  }

  get applyInfoMdlProps() {
    const { dispatch, openGroup, loading } = this.props
    const { applyInfoMdlVisible, groupInfo } = openGroup

    return {
      groupInfo,
      visible: applyInfoMdlVisible,
      width: 400,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects['openGroup/personalApply'],
      title: '验证入群信息',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: 'openGroup/personalApply',
          payload: data,
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'openGroup/hideApplyInfoModal',
        })
      },
    }
  }


  handleAddClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'openGroup/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  handleApplyClick = () => {
    const { dispatch } = this.props

    dispatch({
      type: 'openGroup/showApplyModal',
      payload: {},
    })
  }

  render() {
    const { isCompanyUser } = this.state;

    return (
      <Page inner>
        <Row style={{ marginBottom: '16px', textAlign: 'right' }}>
          {!isCompanyUser &&
            <Button type="ghost" onClick={this.handleAddClick}>
              新增群组
            </Button>
          }
          <Button type="primary" onClick={this.handleApplyClick} style={{ marginLeft: '16px' }}>
            申请入群
          </Button>
        </Row>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
        <ApplyModal {...this.applyMdlProps} />
        <ApplyInfoModal {...this.applyInfoMdlProps} />
      </Page>
    )
  }
}

Department.propTypes = {
  openGroup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Department
