import React, { PureComponent } from 'react'
import { Table, Divider, Modal, Checkbox } from 'antd'

class TaskTable extends PureComponent {
  state = {
    isDeleteFile: false,  //默认任务数据文件不一同删除
  }

  onExecuteClick = (e, record) => {
    e.preventDefault();
    const { onExecuteTask } = this.props
    onExecuteTask(record)
  }

  // 删除任务
  onDeleteTaskClick = (e, record) => {
    e.preventDefault();

    const content = (
      <Checkbox onChange={this.onChange}>同时删除该任务数据文件</Checkbox>
    )

    Modal.confirm({
      title: `确定删除任务：${record.taskName}？`,
      content,
      onOk: () => {
        this.handleDelete(record.id);
        this.setState({ isDeleteFile: false });
      },
      onCancel: () => {
        this.setState({ isDeleteFile: false });
      },
    });
  }

  onChange = (e) => {
    this.setState({ isDeleteFile: e.target.checked });
  }

  handleDelete = id => {
    const { onDeleteItem } = this.props;
    const { isDeleteFile } = this.state;
    const data = {
      taskId: id,
      isDeleteFile
    }

    onDeleteItem(data)
  }

  // 查看任务执行结果
  onResultClick = (e, record) => {
    e.preventDefault();
    const { onShowResult } = this.props;
    onShowResult(record);
  }

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
      },
      {
        title: '工具',
        dataIndex: 'toolName',
        key: 'toolName',
      },
      {
        title: '工具版本',
        dataIndex: 'toolVersion',
        key: 'toolVersion',
      },
      {
        title: '任务目录',
        dataIndex: 'workDir',
        key: 'workDir',
      },
      {
        title: '备注',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        width: 210,
        align: 'center',
        render: (text, record) => {
          return (
            <>
              <a href="#" onClick={e => this.onExecuteClick(e, record)}>执行任务</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.onResultClick(e, record)}>执行结果</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.onDeleteTaskClick(e, record)}>删除</a>
            </>
          )
        },
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
    )
  }
}

export default TaskTable
