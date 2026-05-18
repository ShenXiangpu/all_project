import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm } from 'antd'
import { PRICEUNIT } from 'utils/constant'
import styles from './List.less'
import { isEqual } from 'lodash-es'

class List extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '是否可用',
        dataIndex: 'status',
        key: 'status',
        render: text => text ? '可用' : '不可用'
      },
      {
        title: '规格类型',
        dataIndex: 'flavorType',
        key: 'flavorType',
      },
      {
        title: '规格名称',
        dataIndex: 'flavorName',
        key: 'flavorName',
        ellipsis: true,
      },
      {
        title: 'vCPU',
        dataIndex: 'cpu',
        key: 'cpu',
        render: text => <span>{text} 核</span>
      },
      {
        title: '内存',
        dataIndex: 'memory',
        key: 'memory',
        render: text => <span>{text} GB</span>
      },
      {
        title: '根磁盘',
        dataIndex: 'rootDisk',
        key: 'rootDisk',
        render: text => <span>{text} GB</span>
      },
      {
        title: '数据盘',
        dataIndex: 'dataDisk',
        key: 'dataDisk',
        render: text => <span>{text} GB</span>
      },
      {
        title: '是否裸机',
        dataIndex: 'ironic',
        key: 'ironic',
        render: text => text ? '是' : '否'
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
      },
      {
        title: '日付价格',
        dataIndex: 'dayPrice',
        key: 'dayPrice',
      },
      {
        title: '包月每日价格',
        dataIndex: 'monthPrice',
        key: 'monthPrice',
      },
      {
        title: '半年套餐每日价格',
        dataIndex: 'halfYearPrice',
        key: 'halfYearPrice',
      },
      {
        title: '包年套餐每日价格',
        dataIndex: 'yearPrice',
        key: 'yearPrice',
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
        size="small"
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
