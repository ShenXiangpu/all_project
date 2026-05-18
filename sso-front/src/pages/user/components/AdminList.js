import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Icon } from 'antd'
import styles from './List.less'
import { defaultHeadImg } from '../../../utils/config'
import { isEmpty, isEqual } from 'lodash'

class AdminList extends PureComponent {

  handleShowRolesModal = (record, e) => {
    const { onShowRolesModal } = this.props;
    onShowRolesModal(record);
  }

  render() {
    const { tabActiveKey, ...tableProps } = this.props

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
        title: '用户角色',
        dataIndex: 'userRoles',
        key: 'userRoles',
        render: (text, record) => {
          if (record.userRoles) {
            const userRoles = record.userRoles;
            const arr = [];
            userRoles.map(item => arr.push(item.cnName));
            return (
              isEqual(tabActiveKey, 'per_user') ?
                <span className={styles.item}>
                  <span className={styles.sub}>{arr.toString()}</span>
                  <a className={styles.sub} onClick={e => this.handleShowRolesModal(record, e)}><Icon type="edit" /></a>
                </span>
                :
                arr.toString()
            )
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
    ]

    const enterpriseColumns = [
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
        title: '所属企业',
        dataIndex: 'company',
        key: 'company',
        sorter: true,
        render: (text, record) => record.company ? record.company.companyName : '无'
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
        columns={tabActiveKey === 'en_user' ? enterpriseColumns : columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

AdminList.propTypes = {
  location: PropTypes.object,
}

export default AdminList
