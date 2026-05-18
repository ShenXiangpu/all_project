import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Divider, Popconfirm, Checkbox } from 'antd'
import styles from './List.less'
import { defaultHeadImg } from '../../../utils/config'
import { isEmpty } from 'lodash'

const { confirm } = Modal

class List extends PureComponent {
  state = {
    isDeleteFile: false,  //默认任务数据文件不一同删除
  }

  handleMenuClick = (record, e) => {
    const { onEditItem, onDeleteItem, resetPassword } = this.props
    if (e.key === '1') {  //修改
      onEditItem(record)
    } else if (e.key === '2') { //删除
      confirm({
        title: '确定删除该用户信息吗?',
        onOk() {
          const values = {
            userId: record.id,
          }
          onDeleteItem(values)
        },
      })
    }
    // else if (e.key === '3') {  //重置密码
    //   resetPassword({ id: record.id })
    // }
  }

  handleEditClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  // 删除任务
  onDeleteUserClick = (record, e) => {
    e.preventDefault();

    const content = (
      <Checkbox onChange={this.onChange}>同时删除该用户空间下的数据文件</Checkbox>
    )

    Modal.confirm({
      title: `确定删除用户：${record.userName} ？`,
      content,
      onOk: () => {
        this.handleDeleteClick(record.id);
        this.setState({ isDeleteFile: false });
      },
      onCancel: () => {
        this.setState({ isDeleteFile: false });
      },
    });
  }

  onChange = (e) => {
    this.setState({ isDeleteFile: e.target.checked });
  }

  handleDeleteClick = (id, e) => {
    const { onDeleteItem } = this.props
    const { isDeleteFile } = this.state;
    const values = {
      userId: id,
      deleteFlag: isDeleteFile
    }
    onDeleteItem(values)
  }

  handleResetPwdClick = (record, e) => {
    const { onResetPwd } = this.props
    const values = {
      userId: record.id,
    }
    onResetPwd(values)
  }

  render() {
    const { onDeleteItem, onEditItem, enterpriseRoles, isEnterpriseAdmin, ...tableProps } = this.props


    const columns = [
      {
        title: '用户',
        key: 'avatar',
        width: 80,
        align: 'center',
        render: (text, record) => {
          const headUrl = record.headUrl
          return <Avatar style={{ background: '#c9e5cd' }} src={headUrl ? headUrl : defaultHeadImg} />
        },
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: text => isEmpty(text) ? <span style={{ color: '#faad14' }}>尚未绑定手机号</span> : text
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '所在部门',
        dataIndex: 'deptName',
        key: 'deptName',
        sorter: true,
        render: (text, record) => record.department ? record.department.deptName : '无'
      },
      {
        title: '用户角色',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => {
          if (record.userRoles) {
            const userRoles = record.userRoles;
            const arr = [];
            userRoles.map(item => arr.push(item.cnName));
            return arr.toString();
          }
          return null;
        }
      },
      {
        title: '创建时间',
        width: 100,
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleEditClick(record, e)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottom"
                title="确定为该用户重置密码？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleResetPwdClick(record, e)}
              >
                <a href="#">重置密码</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.onDeleteUserClick(record, e)}>删除</a>
            </span>
          )
        },
      },
    ]

    const pmColumns = [
      {
        title: '用户',
        key: 'avatar',
        width: 80,
        align: 'center',
        render: (text, record) => {
          const headUrl = record.headUrl
          return <Avatar style={{ background: '#c9e5cd' }} src={headUrl ? headUrl : defaultHeadImg} />
        },
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: text => isEmpty(text) ? <span style={{ color: '#faad14' }}>尚未绑定手机号</span> : text
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '所在部门',
        dataIndex: 'group',
        key: 'group',
        render: (text, record) => record.department ? record.department.deptName : '无'
      },
      {
        title: '用户角色',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => {
          if (record.userRoles) {
            const userRoles = record.userRoles;
            const arr = [];
            userRoles.map(item => arr.push(item.cnName));
            return arr.toString();
          }
          return null;
        }
      },
      {
        title: '创建时间',
        width: 100,
        dataIndex: 'createdAt',
        key: 'createdAt',
      }
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
        className={styles.table}
        bordered
        columns={isEnterpriseAdmin
          ? columns : pmColumns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
