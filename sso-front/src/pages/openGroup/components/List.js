import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider, Popconfirm } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'

const { confirm } = Modal

class List extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    if (record.vmExist) {
      Modal.error({
        title: `当前群组（${record.groupName}）内存在IC设计云服务器，不能执行删除操作`,
        okText: '确定'
      });
    } else {
      const { onDeleteItem } = this.props
      const values = {
        groupId: record.id
      }
      onDeleteItem(values)
    }
  }

  onShowUserInfo = (id, e) => {
    const { showUserInfo } = this.props;
    showUserInfo(id);
  }

  handleExist = (record, e) => {
    const { onExist } = this.props
    const values = {
      groupId: record.id
    }

    confirm({
      title: `确定退出群组（${record.groupName}）？`,
      onOk() {
        onExist(values)
      },
    });
  }

  render() {
    const { userId, onDeleteItem, onEditItem, showUserInfo, ...tableProps } = this.props

    const columns = [
      {
        title: '群组编号',
        dataIndex: 'groupNumber',
        key: 'groupNumber',
        render: (text, record) => isEqual(userId, record.groupOwnerId) ? <a href={`/openGroup/${record.id}?num=${record.groupNumber}`}>{text}</a> : text
      },
      {
        title: '群组',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '成员数',
        dataIndex: 'memberNum',
        key: 'memberNum',
        render: (text, record) => {
          const isOwner = isEqual(Number(userId), Number(record.groupOwnerId));
          return isOwner ? (text || 0) : '-';
        }
      },
      {
        title: '描述',
        dataIndex: 'groupDescription',
        key: 'groupDescription',
      },
      {
        title: '群主',
        dataIndex: 'groupOwnerName',
        key: 'groupOwnerName',
        render: (text, record) => <a href='#' onClick={e => this.onShowUserInfo(record.groupOwnerId, e)}>{text}</a>
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        render: (text, record) => {
          const isOwner = isEqual(Number(userId), Number(record.groupOwnerId));

          return (
            <>
              {isOwner ?
                <span>
                  <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="bottomRight"
                    title="确定删除该群组信息？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={e => this.handleDeleteClick(record, e)}
                  >
                    <a href="#" >删除</a>
                  </Popconfirm>
                </span>
                :
                // <a href="#" onClick={e => this.handleExist(record, e)}>退出群组</a>
                <span>-</span>
              }
            </>
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
