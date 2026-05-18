import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider, Popconfirm } from 'antd'
const { confirm } = Modal

class List extends PureComponent {

  // 从指定的快照恢复虚拟机
  handleRevertClick = (name, e) => {
    const { onRevertVM } = this.props
    // confirm({
    //   title: `确定从快照 ${name} 恢复虚拟机吗？`,
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk() {
    //     const data = {
    //       snapshotName: name
    //     }
    //     onRevertVM(data);
    //   },
    // })
    const data = {
      snapshotName: name
    }
    onRevertVM(data);
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      snapshotName: record.name
    }
    onDeleteItem(values)
  }

  render() {
    const { onDeleteItem, onEditItem, isVmOwner, ...tableProps } = this.props

    const columns = [
      {
        title: '快照ID',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        align: 'center'
      },
      {
        title: '快照名称',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a href='#' onClick={e => this.handleNameClick(text, e)}>{text}</a>
      },
      {
        title: '快照创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '快照到期时间',
        dataIndex: 'expiryTime',
        key: 'expiryTime',
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleRevertClick(record.name, e)}>回滚</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该快照？"
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

    if (!isVmOwner) {
      columns.splice(columns.length - 1, 1);
    }

    return (
      <Table
        {...tableProps}
        pagination={false}
        bordered
        size="small"
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
