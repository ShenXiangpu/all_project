import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm, Icon } from 'antd'


class RecycleList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: []
  };

  handleResumeClick = (record, e) => {
    const { onResumeItem } = this.props
    const values = {
      taskIds: [record.id]
    }
    onResumeItem(values)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      taskId: record.id,
      isLogic: false
    }
    onDeleteItem(values)
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  handleMultiResumeClick = () => {
    const { onResumeItem } = this.props;
    const { selectedRows } = this.state;
    const arr = [];
    selectedRows.map(item => {
      arr.push(item.id);
    })
    if (arr.length > 0) {
      const data = {
        taskIds: arr
      }
      onResumeItem(data);
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      })
    }
  }

  render() {
    const { onDeleteItem, ...tableProps } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
      {
        title: hasSelected ?
          <span>已选中{selectedRowKeys.length}个任务
              <a href="#" style={{ marginLeft: 15 }} onClick={this.handleMultiResumeClick}>
              <Icon type="undo" /> 还原
            </a>
          </span> : '任务类型',
        dataIndex: 'typeName',
        key: 'typeName',
        width: 200,
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '工具',
        dataIndex: 'featureName',
        key: 'featureName',
        width: 110,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '创建时间',
        dataIndex: 'taskCreatedAt',
        key: 'taskCreatedAt',
        width: 80,
        render: text => <span style={{ fontSize: 12, color: '#afb3bf' }}>{text}</span>
      },
      {
        title: '操作',
        key: 'operation',
        width: 110,
        render: (text, record) => {
          return (
            <div style={{ fontSize: 12 }}>
              <a href="#" onClick={e => this.handleResumeClick(record, e)}>
                <Icon type="undo" /> 还原
              </a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="任务删除后将无法恢复，您确认要彻底删除该项任务吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#" ><Icon type="delete" /> 删除</a>
              </Popconfirm>
            </div>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        rowSelection={rowSelection}
        pagination={false}
        size="small"
        bordered={false}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

RecycleList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default RecycleList
