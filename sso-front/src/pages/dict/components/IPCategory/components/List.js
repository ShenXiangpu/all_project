import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'

class List extends PureComponent {

  handleAddClick = (record, e) => {
    const { onAddSubTypeItem } = this.props
    onAddSubTypeItem(record)
  }

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
    const { ...tableProps } = this.props

    const columns = [
      {
        title: 'IP类型',
        dataIndex: 'typeName',
        key: 'typeName',
      },
      {
        title: '是否已关联IP',
        dataIndex: 'count',
        key: 'count',
        align: 'center',
        render: text => Number(text) > 0 ? '是' : '否'
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'operation',
        width: 120,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              {isEqual(Number(record.parentId), 0) &&
                <>
                  <a href="#" onClick={e => this.handleAddClick(record, e)}>添加子菜单</a>
                  <Divider type="vertical" />
                </>
              }
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
