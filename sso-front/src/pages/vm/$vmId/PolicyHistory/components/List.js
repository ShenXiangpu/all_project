import React from 'react';
import { Table } from 'antd';

function PolicyHistoryList({ ...tableProps }) {

  const TYPE = {
    'POWEREDOFF': '电源',
    "DISK": '磁盘',
    "CPU": 'CPU',
    "MEMORY": '内存'
  }

  const columns = [
    {
      title: '策略名称',
      dataIndex: 'alarmName',
      key: 'alarmName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '策略类型',
      dataIndex: 'type',
      key: 'type',
      width: 90,
      render: text => TYPE[text] || text
    },
    {
      title: '告警等级',
      dataIndex: 'level',
      key: 'level',
      width: 100,
    },
    {
      title: '警报事件信息',
      dataIndex: 'eventMessage',
      key: 'eventMessage',
      ellipsis: true,
    },
    {
      title: '收件人',
      dataIndex: 'toMail',
      key: 'toMail',
      ellipsis: true,
    },
    {
      title: '告警时间',
      dataIndex: 'triggerTime',
      key: 'triggerTime',
      width: 180,
    }
  ]

  return (
    <Table
      {...tableProps}
      columns={columns}
      pagination={{
        ...tableProps.pagination,
        showTotal: total => `共 ${total} 条`,
      }}
      column
      rowKey={record => record.id}
    />
  );
}

export default PolicyHistoryList;
