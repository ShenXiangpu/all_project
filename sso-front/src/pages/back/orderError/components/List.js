import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const STATUS = {
  0: '待生效',
  10: '生效中',
  20: '已过期',
  40: '已删除',
  70: '已成功',
  80: '已完成',
  100: '异常',
  101: '升降配失败',
  102: '创建失败',
  103: '续费失败',
}

class List extends PureComponent {
  onShowUserInfo = (id, e) => {
    const { showUserInfo } = this.props;
    showUserInfo(id);
  }

  handleRetryClick = (msgId, e) => {
    const { onRetry } = this.props;
    if (msgId) {
      onRetry(msgId);
    }
  }

  render() {
    const { showUserInfo, ...tableProps } = this.props

    const columns = [
      {
        title: '订单ID',
        dataIndex: 'orderId',
        key: 'orderId',
        width: 80,
        align: 'center'
      },
      {
        title: '操作人ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 90,
        align: 'center',
        render: text => <a href='#' onClick={e => this.onShowUserInfo(text, e)}>{text}</a>
      },
      {
        title: '报错时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 180,
        align: 'center'
      },
      {
        title: '订单号',
        dataIndex: 'orderNum',
        key: 'orderNum',
        width: 320,
        align: 'center'
      },
      {
        title: '产品类别',
        dataIndex: 'orderSmallTypeName',
        key: 'orderSmallTypeName',
        width: 100,
        align: 'center'
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatusName',
        key: 'orderStatusName',
      },
      {
        title: '错误原因',
        dataIndex: 'errMsg',
        key: 'errMsg',
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 80,
        render: (text, record) => {
          if (record.mqMsgId) {
            return (
              <a href='#' onClick={e => this.handleRetryClick(record.mqMsgId, e)}>重试</a>
            )
          }
          return null;
        }
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
        rowKey={record => record.uuid}
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
