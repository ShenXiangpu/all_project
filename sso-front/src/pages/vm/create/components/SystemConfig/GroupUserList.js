import React, { PureComponent } from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: (text, record, index) => index + 1
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

class GroupUserList extends PureComponent {

  onSelectChange = (selectedRowKeys) => {
    const { onRowChange } = this.props;
    onRowChange(selectedRowKeys);
  };

  onRowClick = (event, record) => {
  }

  render() {
    const { selectedRowKeys, data, ...tableProps } = this.props;
    // const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        {...tableProps}
        rowKey={record => record.id}
      // onRow={record => {
      //   return {
      //     onClick: event => this.onRowClick(event, record), // 点击行
      //   };
      // }}
      />
    )
  }
}

export default GroupUserList
