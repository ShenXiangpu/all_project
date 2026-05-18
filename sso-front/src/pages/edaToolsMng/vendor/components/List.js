import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Tooltip, Divider, Popconfirm } from 'antd'
import styles from './List.less'

class List extends PureComponent {
  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      vendorId: record.id
    }
    // const { rowSelection: { selectedRowKeys } } = this.props
    // onDeleteItem(values, selectedRowKeys)
    onDeleteItem(values)
  }

  handleConfigClick = (record, e) => {
    const { onShowConfigModal } = this.props;
    onShowConfigModal(record);
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '厂商代码',
        dataIndex: 'vendorCode',
        key: 'vendorCode',
        ellipsis: true,
      },
      {
        title: '厂商名称',
        dataIndex: 'vendorName',
        key: 'vendorName',
        ellipsis: true,
      },
      {
        title: '联系人',
        dataIndex: 'vendorContact',
        key: 'vendorContact',
        ellipsis: true,
      },
      {
        title: '联系电话',
        dataIndex: 'vendorPhone',
        key: 'vendorPhone',
        ellipsis: true,
      },
      {
        title: '邮箱',
        dataIndex: 'vendorEmail',
        key: 'vendorEmail',
        ellipsis: true,
      },
      {
        title: '地址',
        dataIndex: 'vendorAddress',
        key: 'vendorAddress',
        ellipsis: true,
      },
      {
        title: '操作人',
        dataIndex: 'maintainer',
        key: 'maintainer',
      },
      {
        title: '录入时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 170,
      },
      {
        title: '操作',
        key: 'operation',
        width: 110,
        render: (text, record) => {
          return (
            <>
              {/* <a href="#" onClick={e => this.handleConfigClick(record, e)}>配置</a> */}
              {/* <Divider type="vertical" /> */}
              <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除该厂商信息吗?"
                placement="left"
                okText="确定" cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#">删除</a>
              </Popconfirm>
            </>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        className={styles.table}
        columns={columns}
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
