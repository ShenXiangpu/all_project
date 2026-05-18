import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Breadcrumb, Tabs, message } from 'antd';
import Link from 'umi/link';
import store from 'store';
import Page from 'components/Page';
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import { debounce } from 'lodash-es';
import styles from './style.less'

@connect(({ department, loading }) => ({ department, loading }))
class DeptUser extends PureComponent {
  state = {
    formValues: {},     // 查询条件
  };

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    const currentUser = store.get('user') || {}
    const companyId = currentUser && currentUser.userInfo.companyId

    dispatch({
      type: 'department/getEnterpriseRoles',
    })

    dispatch({
      type: 'department/queryEnterpriseUserList',
      payload: {
        deptId: id,
        companyId
      }
    })

    this.setState({
      formValues: {
        deptId: id,
        companyId
      }
    })
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleQuery = (values) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'department/queryEnterpriseUserList',
      payload: {
        ...values,
        ...formValues
      }
    })
  }

  // 企业管理员：根据群组及关键字查询
  get deptfilterProps() {
    const { dispatch, department } = this.props
    const { enterpriseGroupList } = department
    const { formValues } = this.state

    return {
      filter: {
        enterpriseGroupList,
        ...formValues
      },
      setFormValues: values => {
        const data = {
          deptId: formValues.deptId,
          companyId: formValues.companyId,
          ...values
        }
        this.setStateValue('formValues', data)
      },
      onSearch: values => {
        dispatch({
          type: 'department/queryEnterpriseUserList',
          payload: {
            deptId: formValues.deptId,
            companyId: formValues.companyId,
            ...values,
          }
        })
      },
      onAdd() {
        dispatch({
          type: 'department/showUserModal',
          payload: {
            userModalType: 'create',
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, department, loading } = this.props
    const { userList, pagination, enterpriseRoles } = department
    const currentUser = store.get('user') || {}
    const id = currentUser && currentUser.id

    return {
      enterpriseRoles,
      currentUserCode: id,
      dataSource: userList,
      loading: loading.effects['department/queryUserList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'department/deleteUser',
          payload: values,
        }).then(() => {
          this.handleQuery({
            pageNum:
              userList.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'department/showUserModal',
          payload: {
            userModalType: 'update',
            currentUserItem: item,
          },
        })
      },
      onResetPwd: debounce(values => {
        dispatch({
          type: 'department/resetPassword',
          payload: values,
        })
      }, 1000),
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

    dispatch({
      type: 'department/queryEnterpriseUserList',
      payload: {
        ...params
      },
    });
  };


  get modalProps() {
    const { dispatch, department, loading, match: { params: { id } } } = this.props
    const { currentUserItem, userModalVisible, userModalType, enterpriseRoles, enterpriseGroupList } = department

    return {
      enterpriseRoles,
      enterpriseGroupList,
      dispatch,
      item: userModalType === 'create' ? {} : currentUserItem,
      visible: userModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`department/${userModalType}User`],
      title: `${userModalType === 'create' ? '新增用户' : '修改用户'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `department/${userModalType}User`,
          payload: {
            ...data,
            deptId: id
          },
        }).then(() => {
          this.handleQuery()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'department/hideUserModal',
        })
      },
    }
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { query } = this.props.location;

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '5px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/department'>部门</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>部门员工</Breadcrumb.Item>
        </Breadcrumb>

        <h2>{query && query.name}</h2>

        <div className={styles.formFilter}>
          <Filter {...this.deptfilterProps} />
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />

      </Page>
    )
  }
}

export default DeptUser
