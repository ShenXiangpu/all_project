import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { isEqual } from 'lodash-es';

class List extends PureComponent {

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '中奖机时',
        dataIndex: 'awardDegree',
        key: 'awardDegree',
      },
      {
        title: '兑奖码',
        dataIndex: 'awardCode',
        key: 'awardCode',
      },
      {
        title: '所属用户邮箱',
        dataIndex: 'userEmail',
        key: 'userEmail',
      },
      {
        title: '是否已经兑换',
        dataIndex: 'checked',
        key: 'checked',
        render: text => isEqual(text, '0') ? "未兑换" : "已兑换"
      },
      {
        title: '兑换人',
        dataIndex: 'operator',
        key: 'operator',
      },
      {
        title: '兑换时间 ',
        dataIndex: 'updateTime',
        key: 'updateTime',
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
