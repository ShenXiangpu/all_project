import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'

class List extends PureComponent {
  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      feaSeq: record.feaSeq,
      feaCode: record.feaCode
    }
    const { rowSelection: { selectedRowKeys } } = this.props
    onDeleteItem(values, selectedRowKeys)
  }

  render() {
    const { onDeleteItem, onEditItem, role, ...tableProps } = this.props

    const columns = [
      {
        title: '所属厂商',
        dataIndex: 'edaVendorName',
        key: 'edaVendorName',
        ellipsis: true,
      },
      {
        title: '所属EDA工具',
        dataIndex: 'edaToolName',
        key: 'edaToolName',
        ellipsis: true,
      },
      {
        title: 'EDA Feature',
        dataIndex: 'feaCode',
        key: 'feaCode',
        ellipsis: true,
      },
      {
        title: '总数量（个）',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      },
      {
        title: `正在使用（个）`,
        dataIndex: 'useNum',
        key: 'useNum',
        align: 'center',
      },
      {
        title: `剩余可用（个）`,
        dataIndex: 'counts',
        key: 'counts',
        align: 'center',
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
        columns={columns}
        simple
        scroll={{ x: 1000 }}
        rowKey={record => record.feaCode}
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
