import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm } from 'antd'
import styles from './List.less'

class List extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      nodeName: record
    }
    onDeleteItem(values)
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '计费规则名称',
        align: 'center',
        dataIndex: 'feeRuleName',
        key: 'feeRuleName',
      },
      {
        title: '计费类型',
        align: 'center',
        dataIndex: 'feeType',
        key: 'feeType',
      },
      {
        title: '单价',
        align: 'center',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '计价单位',
        align: 'center',
        dataIndex: 'priceUnit',
        key: 'priceUnit',
      },
      {
        title: '资源类型',
        align: 'center',
        dataIndex: 'resourceName',
        key: 'resourceName',
      },
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 120,
      //   align: 'center',
      //   render: (text, record) => {
      //     return (
      //       <span>
      //         {/* <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
      //         <Divider type="vertical" /> */}
      //         <Popconfirm
      //           placement="bottomRight"
      //           title="确定删除该计费规则数据？"
      //           okText="确定"
      //           cancelText="取消"
      //           onConfirm={e => this.handleDeleteClick(record, e)}
      //         >
      //           <a href="#" >删除</a>
      //         </Popconfirm>
      //       </span>
      //     )
      //   },
      // },
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
        rowKey={record => record}
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
