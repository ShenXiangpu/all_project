import React, { PureComponent } from 'react';
import { Table, Divider, Modal } from 'antd';
import { isEqual } from 'lodash-es';
import Link from 'umi/link';
const { confirm } = Modal;

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

class LicenseList extends PureComponent {

  handleCancelOrder = (orderNum, e) => {
    e.preventDefault();
    const { onCancelOrder } = this.props;

    confirm({
      title: '提示',
      content: `是否取消订单 ${orderNum}`,
      okText: '确定',
      cancelText: '取消',
      width: 500,
      onOk: () => {
        onCancelOrder(orderNum);
      },
    })
  }

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
        title: '使用总时长',
        dataIndex: 'buyDurationString',
        key: 'buyDurationString',
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
        title: '订单金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text, record) => <span>{text} {record.priceUnit}</span>
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              {isEqual(record.payStatus, 0) &&
                <span>
                  <Link to={`/account/order?from=deal&&type=license&&orderNum=${record.orderNum}`}>付款</Link>
                  <Divider type="vertical" />
                  <a href="#" onClick={e => this.handleCancelOrder(record.orderNum, e)}>取消</a>
                  <Divider type="vertical" />
                </span>
              }
              <Link to={`/account/deal/info?orderNum=${record.orderNum}&&orderType=${record.orderBigType}`}>详情</Link>
            </div>
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

export default LicenseList
