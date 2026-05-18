import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Table } from 'antd'
import { isEqual } from 'lodash-es';
import moment from 'moment'


class List extends PureComponent {

  handleStatus = (status, id) => {
    const { onHandleStatus } = this.props
    console.log('status',status,id);
    if (isEqual(status, 0)) {
      onHandleStatus(1, id)
    } else if (isEqual(status, 1)) {
      onHandleStatus(0, id)
    }
  }

  render() {

    const columns = [
      {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '优惠券面值',
        dataIndex: 'parValue',
        key: 'parValue',
        render: (text, record) => {
          if (record && record.startValue) {
            return `${record.parValue}元 (起始金额：${record.startValue}元)`
          } else {
            return `${record.parValue}元`
          }
        }
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          if (record && isEqual(record.type, 10)) {
            return `满减券`
          } else if (record && isEqual(record.type, 20)) {
            return `代金券`
          } else {
            return `未知参数${record.type}`
          }
        }
      },
      {
        title: '是否到官网',
        dataIndex: 'ofPublic ',
        key: 'ofPublic ',
        render: (text, record) => {
          if (record && isEqual(record.ofPublic, 1)) {
            return `是`
          } else if (isEqual(record.ofPublic, 0)) {
            return `否`
          } else {
            return `未知参数${record.ofPublic}`
          }
        }
      },
      {
        title: '领取限制',
        dataIndex: 'receiptLimit ',
        key: 'receiptLimit ',
        render: (text, record) => {
          if (record && isEqual(record.receiptLimit, 1)) {
            return (
              <span style={{ color: '#333' }}>所有用户</span>
            )
          } else if (isEqual(record.receiptLimit, 2)) {
            return (
              <span style={{ color: 'blue' }}>仅新用户</span>
            )
          } else {
            return `未知参数${record.receiptLimit}`
          }
        }
      },
      {
        title: '适用范围',
        dataIndex: 'scope',
        key: 'scope',
      },
      {
        title: '有效期',
        key: 'time',
        render: (text,record) => {
          if(record && record.startTime && record.endTime){
            return moment(record.startTime).format('YYYY-MM-DD') + "至" + moment(record.endTime).format('YYYY-MM-DD')

          }else {
            return ''
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          if (record && isEqual(record.status, 0)) {
            return (
              <span style={{ color: '#333' }}>禁用</span>
            )
          } else if (isEqual(record.status, 1)) {
            return (
              <span style={{ color: 'blue' }}>启用</span>
            )
          } else if (isEqual(record.status, 2)) {
            return (
              <span style={{ color: '#bbb' }}>过期已失效</span>
            )
          } else {
            return `未知参数${record.status}`
          }
        }
      },
      {
        title: '操作（使用记录）',
        dataIndex: 'status1',
        key: 'status1',
        render: (text, record) => {
          if (record && isEqual(record.status, 1)) {
            return (
              <a style={{ color: 'blue' }} onClick={() => this.handleStatus(record.status, record.id)}>禁用</a>
            )
          } else if (isEqual(record.status, 0)) {
            return (
              <a style={{ color: 'blue' }} onClick={() => this.handleStatus(record.status, record.id)}>启用</a>
            )
          } else if(isEqual(record.status, 2)){
            return (
              <span style={{ color: '#bbb' }}>过期已失效</span>
            )
          } 
        }

      },
    ]

    const { couponsList, ...tableProps } = this.props;

    return (
      <div>
        <Table
          {...tableProps}
          bordered
          columns={columns}
          dataSource={couponsList}
          simple
          rowKey={record => record.id}
        />
      </div>
    )
  }
}

export default List
