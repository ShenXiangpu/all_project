import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Divider, Popconfirm } from 'antd'
import styles from './List.less'

const TYPE = {
  0: '管理员',
  1: '个人',
  2: '企业'
}

class List extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      id: record.id
    }
    onDeleteItem(values)
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '角色名称',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        key: 'operation',
        width: 120,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该角色信息？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#" >删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        className={styles.table}
        bordered
        columns={columns}
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
