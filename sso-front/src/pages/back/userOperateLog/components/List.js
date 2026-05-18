import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

class List extends PureComponent {
  render() {
    const { ...tableProps } = this.props

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        align: 'center'
      },
      {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type',
        width: 120,
        align: 'center'
      },
      {
        title: '执行者',
        dataIndex: 'userName',
        key: 'userName',
        width: 120,
        align: 'center'
      },
      {
        title: '所在公司',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 150,
        align: 'center',
        ellipsis: true,
        render: text => text || '-'
      },
      {
        title: '操作IP',
        dataIndex: 'ip',
        key: 'ip',
        width: 150,
        align: 'center'
      },
      {
        title: '操作时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 180,
        align: 'center'
      },
      {
        title: '操作浏览器',
        dataIndex: 'userAgent',
        key: 'userAgent',
        ellipsis: true,
      },
      {
        title: '操作数据',
        dataIndex: 'etc',
        key: 'etc',
        ellipsis: true,
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
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
