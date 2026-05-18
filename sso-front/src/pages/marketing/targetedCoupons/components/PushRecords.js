import React, { PureComponent } from 'react';
import { Table } from 'antd';
import moment from 'moment'
import { isEqual } from 'lodash-es';

class List extends PureComponent {

  render() {
    const { couponPushList,...tableProps } = this.props;

    const columns = [
      {
        title: '优惠券名称',
        dataIndex: 'typeName',
        key: 'typeName',
      },
      {
        title: '优惠券类型',
        dataIndex: 'typeString',
        key: 'typeString',
      },
      {
        title: '推送状态',
        dataIndex: 'statusString',
        key: 'statusString',
      },
      {
        title: '用户id',
        dataIndex: 'userId',
        key: 'userId',
      },
      
      {
        title: '用户邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '可领取时间',
        // dataIndex: 'startTime',
        key: 'Time',
        render: (text,record) => {
          return moment(record.startTime).format('YYYY-MM-DD') + "至" + moment(record.endTime).format('YYYY-MM-DD')
        }
      },
    //   {
    //     title: '是否使用',
    //     dataIndex: 'checked',
    //     key: 'checked',
        
    //   },
      {
        title: '发送时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text,record) => {
          return moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')
        }
      },
    //   {
    //     title: '操作（使用记录）',
    //     dataIndex: 'updateTime',
    //     key: 'updateTime',
    //   },
    ]

    return (
      <Table
        {...tableProps}
        bordered
        columns={columns}
        dataSource={couponPushList}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
