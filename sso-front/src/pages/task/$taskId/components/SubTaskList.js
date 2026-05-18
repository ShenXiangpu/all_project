import React, { PureComponent } from 'react'
import { Table, Popconfirm, Badge, Divider } from 'antd'

const STATUS = {
  'FAILED': 'error',
  'COMPLETED': 'success',
  'RUNNING': 'processing',
  'PENDING': 'warning',
  'CANCELLED': 'default'
}

const COLOR = {
  'FAILED': '#f5222d',
  'COMPLETED': '#52c41a',
  'RUNNING': '#1890ff',
  'PENDING': '#faad14',
  'CANCELLED': '#d9d9d9'
}

class SubTaskList extends PureComponent {

  onDeleteClick = (e, value) => {
    e.preventDefault();
    const { onDeleteSubTask } = this.props
    onDeleteSubTask(value);
  }

  handleLogClick = (e, values) => {
    e.preventDefault();
    const { onSubTaskLogClick } = this.props;
    const subtaskInput = values && values.subtaskInput && values.subtaskInput.replaceAll('/', ',.');
    const logPath = values && values.subtaskOutput && values.subtaskOutput.replaceAll('/', ',.');
    const data = {
      jobName: ' ',
      subjobName: values.subjobName,
      subtaskInput,
      logPath,
    }
    onSubTaskLogClick(data);
  }

  render() {
    const { loading, ...tableProps } = this.props;
    const columns = [
      {
        title: 'slurm子任务名 ',
        dataIndex: 'subjobName',
        key: 'subjobName',
        width: 80,
      },
      {
        title: '执行状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: text => <div style={{ color: COLOR[text] }}><Badge status={STATUS[text]} />{text}</div>
      },
      {
        title: '任务顶层文件',
        dataIndex: 'subtaskInput',
        key: 'subtaskInput',
        width: 200,
      },
      {
        title: '任务创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 100,
      },
      {
        title: '开始执行时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 100,
      },
      {
        title: '任务结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 100,
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (text, record) => (
          <div>
            <a href="#" onClick={e => this.handleLogClick(e, record)}>日志</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该子任务"
              placement="bottomRight"
              onConfirm={e => this.onDeleteClick(e, record.id)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </div>
        ),
      }
    ]

    return (
      <Table
        {...tableProps}
        columns={columns}
        rowKey={record => record.id}
        scroll={{ x: 1300 }}
      />
    )
  }
}

export default SubTaskList
