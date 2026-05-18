import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import store from 'store'
import Page from '../../components/Page/Page'
import List from './components/List'
import KeyFilter from './components/KeyFilter'
import GroupFilter from './components/GroupFilter'
import Modal from './components/Modal'
import debounce from 'lodash/debounce'
import styles from './style.less'

/**
 * 企业管理员（enterpriseAdmin）、企业项目经理（admin）：用户管理
 */
@connect(({ user, loading }) => ({ user, loading }))
class Enterprise extends PureComponent {
  state = {
    formValues: {},     // 查询条件
  };

  componentDidMount() {
    const { dispatch, isEnterpriseAdmin } = this.props;
    if (isEnterpriseAdmin) { // 企业管理员
      dispatch({
        type: 'user/getGroupList',
      })

      dispatch({
        type: 'user/getEnterpriseRoles',
      })

      dispatch({
        type: 'user/queryEnterpriseUserList',
      })
    } else { // 组内用户
      dispatch({
        type: 'user/queryGroupUserList',
      })
    }
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleQuery = (values) => {
    const { dispatch, isEnterpriseAdmin } = this.props
    const { formValues } = this.state
    if (isEnterpriseAdmin) { // 企业管理员
      dispatch({
        type: 'user/queryEnterpriseUserList',
        payload: {
          ...values,
          ...formValues
        }
      })
    } else { // 组内用户
      dispatch({
        type: 'user/queryGroupUserList',
        payload: {
          ...values,
          ...formValues
        }
      })
    }

  }

  // 项目经理：根据关键字进行查询
  get keyfilterProps() {
    const { dispatch } = this.props
    const { formValues } = this.state
    const { tabActiveKey } = this.state

    return {
      tabActiveKey,
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'user/queryGroupUserList',
          payload: {
            ...values
          }
        })
      },
    }
  }


  // 企业管理员：根据群组及关键字查询
  get groupfilterProps() {
    const { dispatch, user } = this.props
    const { enterpriseGroupList } = user
    const { formValues } = this.state

    return {
      filter: {
        enterpriseGroupList,
        ...formValues
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'user/queryEnterpriseUserList',
          payload: values
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, user, loading, isEnterpriseAdmin } = this.props
    const { list, pagination, enterpriseRoles } = user
    const currentUser = store.get('user') || {}
    const id = currentUser && currentUser.id

    return {
      isEnterpriseAdmin,
      enterpriseRoles,
      currentUserCode: id,
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'user/delete',
          payload: values,
        }).then(() => {
          this.handleQuery({
            pageNum:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onResetPwd: debounce(values => {
        dispatch({
          type: 'user/resetPassword',
          payload: values,
        })
      }, 1000),
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, isEnterpriseAdmin } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    let order;
    if (sorter.order === 'ascend') {
      order = 'asc';
    } else if (sorter.order === 'descend') {
      order = 'desc'
    }

    if (sorter.field) {
      params.sorter = `${sorter.field}_${order}`;
    }

    if (isEnterpriseAdmin) { // 企业管理员
      dispatch({
        type: 'user/queryEnterpriseUserList',
        payload: {
          ...params
        },
      });
    } else { // 组内用户
      dispatch({
        type: 'user/queryGroupUserList',
        payload: {
          ...params
        },
      });
    }
  };


  get modalProps() {
    const { dispatch, user, loading } = this.props
    const { currentItem, modalVisible, modalType, enterpriseRoles, enterpriseGroupList } = user

    return {
      enterpriseRoles,
      enterpriseGroupList,
      dispatch,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `${modalType === 'create' ? '新增用户' : '修改用户'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `user/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleQuery()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'user/hideModal',
        })
      },
    }
  }

  onTabChange = tabActiveKey => {
    const { dispatch } = this.props;
    this.setState({
      tabActiveKey,
      formValues: {}
    });

    dispatch({
      type: 'user/query',
      payload: {
        type: tabActiveKey
      }
    })
  };

  render() {
    const { isEnterpriseAdmin } = this.props;

    return (
      <Page inner>
        <div className={styles.formFilter}>
          {isEnterpriseAdmin ?
            <GroupFilter {...this.groupfilterProps} />
            :
            <KeyFilter {...this.keyfilterProps} />
          }
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Enterprise.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Enterprise
