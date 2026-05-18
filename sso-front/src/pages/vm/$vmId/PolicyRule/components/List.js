import React from 'react';
import { Table, Switch } from 'antd';

function PolicyList({ onDeletePolicyRule, onChangeEnabled, ...tableProps }) {

  const onStatusChange = (record, checked) => {
    const data = {
      ...record,
      enabled: checked
    }
    onChangeEnabled(data);
  }

  const handleDeletePolicyRule = (e, alarmId) => {
    e.preventDefault();
    onDeletePolicyRule(alarmId);
  }

  const TYPE = {
    'POWEREDOFF': '电源',
    "DISK": '磁盘',
    "CPU": 'CPU',
    "MEMORY": '内存'
  }

  const columns = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
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
      title: '告警规则',
      dataIndex: 'operator',
      key: 'operator',
      ellipsis: true,
      render: (text, record) => {
        let content;
        switch (record.type) {
          case 'POWEREDOFF':
            content = "关闭电源";
            break;
          case "DISK":
            content = "磁盘使用率" + record.operator + record.percent + "KBps" + "，统计粒度" + record.interval + "秒";
            break;
          case "CPU":
            content = "CPU使用率" + record.operator + record.percent + "%" + "，统计粒度" + record.interval + "秒";
            break;
          case "MEMORY":
            content = "内存使用率" + record.operator + record.percent + "%" + "，统计粒度" + record.interval + "秒";
            break;
        }
        return content;
      }
    },
    {
      title: '告警规则描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '收件人',
      dataIndex: 'emails',
      key: 'emails',
      render: text => text.map(item => <p style={{ marginBottom: 0 }} key={item}>{item}</p>)
    },
    {
      title: '告警等级',
      dataIndex: 'levels',
      key: 'levels',
      width: 100,
    },
    {
      title: '最后修改',
      dataIndex: 'lastModifiedTime',
      key: 'lastModifiedTime',
      width: 180,
    },
    {
      title: '告警启停',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 90,
      render: (text, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          checked={text}
          onChange={e => onStatusChange(record, e)} />)
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      render: (text, record) => {
        return (
          <a href="#" onClick={e => handleDeletePolicyRule(e, record.alarmId)}>删除</a>
        )
      },
    }
  ]

  return (
    <Table
      {...tableProps}
      columns={columns}
      rowKey={record => record.alarmId}
    />
  );
}

export default PolicyList;
