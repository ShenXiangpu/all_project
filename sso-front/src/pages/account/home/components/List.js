import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import Link from 'umi/link';
import { isEqual } from 'lodash-es';
import { formatMoney } from 'utils/utils.js';

class List extends PureComponent {

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '欠费金额',
        dataIndex: 'currentArrearsPrice',
        key: 'currentArrearsPrice',
        render: text => text && formatMoney(text, true)
      },
      {
        title: '订单类别',
        dataIndex: 'orderBigType',
        key: 'orderBigType',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <div>
              {isEqual(record.relOrderStatus, 20) && <Link to='/account/licenseToPay'>License最近待缴费记录</Link>}
              {isEqual(record.relOrderStatus, 30) && <Link to={`/account/order?from=home&&type=license&&orderNum=${record.relOrderNum}&&orderType=license`}>立即付款</Link>}
            </div>
          )
        }
      },
    ]

    return (
      <Table
        {...tableProps}
        columns={columns}
        pagination={false}
        size='small'
        rowKey={record => record.id}
      />
    )
  }
}

export default List
