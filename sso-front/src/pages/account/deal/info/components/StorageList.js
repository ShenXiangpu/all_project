import React, { PureComponent } from 'react';
import { Table } from 'antd';

class StorageList extends PureComponent {


  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '订单号',
        dataIndex: 'orderNum',
        key: 'orderNum',
      },
      {
        title: '产品',
        dataIndex: 'orderBigTypeName',
        key: 'orderBigTypeName',
      },
      {
        title: '规格',
        dataIndex: 'storageName',
        key: 'storageName',
      },
      {
        title: '购买时长',
        dataIndex: 'buyDuration',
        key: 'buyDuration',
        render: (text, record) => <span>{text} {record.buyUnit}</span>
      },
      {
        title: '订单金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text, record) => <span style={{ color: '#ff7643' }}>{text} {record.priceUnit}</span>
      }
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        size="small"
        columns={columns}
        rowKey={record => record.id}
      />
    )
  }
}

export default StorageList
