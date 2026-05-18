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
        title: '工艺节点',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => record
      },
      // {
      //   title: '创建时间',
      //   align: 'center',
      //   dataIndex: 'createdAt',
      //   key: 'createdAt',
      // },
      {
        title: '操作',
        key: 'operation',
        width: 120,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              {/* <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
              <Divider type="vertical" /> */}
              <Popconfirm
                placement="bottomRight"
                title="确定删除该工艺节点数据？"
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
