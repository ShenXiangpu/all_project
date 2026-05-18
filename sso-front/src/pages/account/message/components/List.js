import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd'
import { isEqual } from 'lodash-es';

const MSGTYPE = {
  '0': '通知',
  '1': '告警',
}

const MSGCOLOR = {
  '0': '#faad14',  // 通知
  '1': '#f5222d',  // 告警
}

class List extends PureComponent {

  render() {
    const { selectedRows, onShowMsgDetail, ...tableProps } = this.props

    const columns = [
      {
        title: '',
        dataIndex: 'msgStatus',
        key: 'msgStatus',
        width: 20,
        filters: [
          {
            text: '未读',
            value: '0',
          },
          {
            text: '已读',
            value: '1',
          },
        ],
        render: text => {
          if (isEqual(text, '0')) {
            return <Icon type="mail" theme="filled" />
          }
          return null;
        }
      },
      {
        title: '消息类型',
        dataIndex: 'msgType',
        key: 'msgType',
        width: 110,
        filters: [
          {
            text: '通知',
            value: '0',
          },
          {
            text: '告警',
            value: '1',
          },
        ],
        render: (text, record) => {
          return (
            <span style={{ color: MSGCOLOR[text] }}>
              <span style={{ marginLeft: 5 }}>{MSGTYPE[text]}</span>
            </span>
          )
        },
      },
      {
        title: '消息标题',
        dataIndex: 'msgTitle',
        key: 'msgTitle',
        ellipsis: true,
        render: (text, record) => {
          return (
            <span style={{ fontWeight: isEqual(record.msgStatus, '0') ? 'bold' : 'normal' }}>
              {text}
            </span>
          )
        }
      },
      {
        title: '消息内容',
        dataIndex: 'msgInfo',
        key: 'msgInfo',
        ellipsis: true,
        render: (text, record) => {
          return (
            <span style={{ fontWeight: isEqual(record.msgStatus, '0') ? 'bold' : 'normal' }}>
              {text}
            </span>
          )
        }
      },
      {
        title: '接收时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'right',
        render: (text, record) => {
          return (
            <span style={{ fontSize: 12, color: '#BBBBBB' }}>
              {text}
            </span>
          )
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
        columns={columns}
        simple
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: event => onShowMsgDetail(record.id), // 点击行
          };
        }}
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
