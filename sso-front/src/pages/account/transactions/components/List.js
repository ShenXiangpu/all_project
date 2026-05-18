import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { isEqual } from 'lodash-es';

const MODE = {
  'AL': '支付宝',
  'AB': '余额',
  'WX': '微信',
  'UN': '银联'
}

class List extends PureComponent {

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '交易时间 ',
        dataIndex: 'payTime',
        key: 'payTime',
      },
      {
        title: '收支类型',
        dataIndex: 'awardDegree',
        key: 'awardDegree',
        render: (text, record) => {
          if (record.tradeEvent) {
            if (record.tradeEvent < 20) {
              return <span style={{ color: '#52c41a' }}>入账</span>;
            } else {
              return <span style={{ color: '#ff7200' }}>支出</span>;
            }
          }
          return null;
        }
      },
      {
        title: '交易类型',
        dataIndex: 'tradeEventName',
        key: 'tradeEventName',
      },
      {
        title: '交易渠道',
        dataIndex: 'tradeType',
        key: 'tradeType',
        render: text => MODE[text]
      },
      {
        title: '交易单号',
        dataIndex: 'flowNum',
        key: 'flowNum',
        render: (text, record) => <span>{record.flowNum || record.relOrderNum}</span>
      },
      {
        title: '交易备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '交易金额（元）',
        dataIndex: 'tradelAmount',
        key: 'tradelAmount',
      },
      {
        title: '余额（元）',
        dataIndex: 'afterBalanceAmount',
        key: 'afterBalanceAmount',
      },
      {
        title: '创建时间 ',
        dataIndex: 'createTime',
        key: 'createTime',
      },
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
