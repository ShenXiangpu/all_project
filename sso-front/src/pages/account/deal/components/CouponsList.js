import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { isEqual } from 'lodash-es';
import Link from 'umi/link';

const MODE = {
  1: '预付费',
  2: '后付费',
  3: '机时抵扣',
}

const COLOR = {
  0: '#ff7200',
  1: '#8dc16b',
  2: '#000000',
}

class CouponsList extends PureComponent {

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
        title: '购买方式',
        dataIndex: 'paymentMode',
        key: 'paymentMode',
        render: (text, record) => MODE[text]
      },
      {
        title: '兑换时长',
        dataIndex: 'buyDuration',
        key: 'buyDuration',
        render: (text, record) => <span>{text} {record.buyUnit}</span>
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatusName',
        key: 'orderStatusName',
      },
      {
        title: '支付状态',
        dataIndex: 'payStatusName',
        key: 'payStatusName',
        render: (text, record) => <span style={{ color: COLOR[record.payStatus] }}>{text}</span>
      },
      {
        title: '订单创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <Link to={`/account/deal/info?orderNum=${record.orderNum}&&orderType=${record.orderBigType}`}>详情</Link>
          )
        },
      }
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
        rowKey={record => record.id}
      />
    )
  }
}

export default CouponsList
