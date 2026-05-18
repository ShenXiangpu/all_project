import React, { PureComponent } from 'react';
import { Table } from 'antd';

class List extends PureComponent {

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '订单号',
        dataIndex: 'orderNum',
        key: 'orderNum',
      },
      {
        title: '资源类型',
        dataIndex: 'resourceName',
        key: 'resourceName',
      }
    ]

    return (
      <Table
        {...tableProps}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
