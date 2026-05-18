import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd';
import store from 'store'
import Page from '../../components/Page/Page'
import KeyFilter from './components/KeyFilter'
import EnterpriseFilter from './components/EnterpriseFilter'
import AdminList from './components/AdminList'
import styles from './style.less'
import RightModal from './components/RightModal';
import debounce from 'lodash/debounce'

const { TabPane } = Tabs;

/**
 * 平台管理员（superAdmin/supremeAdmin）：用户管理
 */
@connect(({ app, user, loading }) => ({ app, user, loading }))
class Platform extends PureComponent {
  state = {
    formValues: {},     // 查询条件
    tabActiveKey: 'sys_user'
  };

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'app/getAllCompanies'
    })

    dispatch({
      type: 'user/query',
      payload: {
        type: 'sys_user'  // 查询平台用户
      },
    })
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }


  // 平台管理员
  handleAdminQuery = (values) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'user/query',
      payload: {
        ...values,
        ...formValues
      }
    })
  }

  // 平台管理员查询平台用户、个人用户
  // 根据关键字进行查询
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
          type: 'user/query',  //区分平台用户、个人用户的接口
          payload: {
            type: tabActiveKey,
            ...values
          }
        })
      },
    }
  }

  // 平台管理员查询企业用户
  get enterpriseFilterProps() {
    const { app, dispatch } = this.props
    const { companies } = app
    const { tabActiveKey } = this.state
    const { formValues } = this.state

    return {
      tabActiveKey,
      filter: {
        companies,
        ...formValues
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'user/query',   //  企业用户查询接口
          payload: {
            type: tabActiveKey,
            ...values
          }
        })
      }
    }
  }

  get adminListProps() {
    const { user, loading, dispatch } = this.props
    const { list, pagination } = user
    const currentUser = store.get('user') || {}
    const id = currentUser && currentUser.id
    const { tabActiveKey } = this.state;

    return {
      tabActiveKey,
      currentUserCode: id,
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onShowRolesModal: (values) => {
        dispatch({
          type: 'user/getRoleList',
          payload: {
            roleType: 1
          }
        }).then(() => {
          dispatch({
            type: 'user/showRightModal',
            payload: {
              currentItem: values
            }
          })
        })
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
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

    const { tabActiveKey } = this.state
    dispatch({
      type: 'user/query',
      payload: {
        type: tabActiveKey,
        ...params
      },
    });
  };

  get rightMdlProps() {
    const { user, loading, dispatch } = this.props
    const { rightModalVisible, currentItem, roleList } = user
    const { tabActiveKey, formValues } = this.state

    return {
      roleList,
      item: currentItem,
      visible: rightModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects['user/updateUserRole'],
      title: '设置为平台内部角色',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: 'user/updateUserRole',
          payload: data,
        }).then(() => {
          dispatch({
            type: 'user/query',
            payload: {
              type: tabActiveKey,
              ...formValues
            },
          });

          dispatch({
            type: 'user/updateState',
            payload: {
              currentItem: {}
            }
          })
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'user/hideRightModal',
          payload: {
            currentItem: {}
          }
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
    return (
      <Page inner>
        <Tabs defaultActiveKey="sys_user" onChange={this.onTabChange}>
          <TabPane tab="平台" key="sys_user">
            <div className={styles.formFilter}><KeyFilter key='1-filter' {...this.keyfilterProps} /></div>
            <AdminList key='1-list' {...this.adminListProps} />
          </TabPane>
          <TabPane tab="企业" key="en_user">
            <div className={styles.formFilter}><EnterpriseFilter {...this.enterpriseFilterProps} /></div>
            <AdminList key='2-list' {...this.adminListProps} />
          </TabPane>
          <TabPane tab="个人" key="per_user">
            <div className={styles.formFilter}><KeyFilter key='3-filter' {...this.keyfilterProps} /></div>
            <AdminList key='3-list' {...this.adminListProps} />
          </TabPane>
        </Tabs>
        <RightModal {...this.rightMdlProps} />
      </Page>
    )
  }
}

Platform.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Platform
