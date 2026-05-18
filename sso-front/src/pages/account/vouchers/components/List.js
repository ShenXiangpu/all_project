import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { isEqual } from 'lodash-es';
import moment from 'moment'

class List extends PureComponent {



  handleUserInfoClick = (id, e) => {
    e.preventDefault();
    const { onShowUserLogInfoModal } = this.props;
    onShowUserLogInfoModal(id);
  }


  render() {
    const { index, ...tableProps } = this.props;
    // console.log('index',index);
    
    const columns1 = [
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
        title: '优惠券面值',
        dataIndex: 'parValue',
        key: 'parValue',
        render: (text,record) => {
          if(record && record.startValue){
            return `${record.parValue}元 (起始金额：${record.startValue}元)`
          }else {
            return  `${record.parValue}元`
          }
        }
      },
      // {
      //   title: '起始金额',
      //   dataIndex: 'startValue',
      //   key: 'startValue',
      // },
      {
        title: '优惠券状态',
        dataIndex: 'statusString',
        key: 'statusString',
      },
      {
        title: '生效时间/失效时间 ',
        // dataIndex: 'startTime',
        key: 'Time',
        render: (text) => {
          return moment(text.startTime).format('YYYY-MM-DD') + "至" + moment(text.endTime).format('YYYY-MM-DD')
        }
      },
      // {
      //   title: '使用',
      //   dataIndex: 'endTime',
      //   key: 'endTime',
      //   render: record => {
      //     const userProps = (
      //       <span>
      //         <a href="#" onClick={e => this.handleUserInfoClick(record.id, e)}>
      //           使用记录
      //         </a>
      //       </span>
      //     )
      //     return userProps
      //   }
      // },
    ]

    const columns3 = [
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
        title: '优惠券面值',
        dataIndex: 'parValue',
        key: 'parValue',
        render: (text,record) => {
          if(record && record.startValue){
            return `${record.parValue}元 (起始金额：${record.startValue}元)`
          }else {
            return  `${record.parValue}元`
          }
        }
      },
      {
        title: '订单类型',
        dataIndex: 'orderSmallTypeName',
        key: 'orderSmallTypeName',
      },
      {
        title: '关联订单',
        dataIndex: 'relOrderNum',
        key: 'relOrderNum',
      },
      
    ]
    const columns4 = [
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
        title: '优惠券面值',
        dataIndex: 'parValue',
        key: 'parValue',
        render: (text,record) => {
          if(record && record.startValue){
            return `${record.parValue}元 (起始金额：${record.startValue}元)`
          }else {
            return  `${record.parValue}元`
          }
        }
      },
      {
        title: '生效时间/失效时间 ',
        // dataIndex: 'startTime',
        key: 'Time',
        render: (text) => {
          return moment(text.startTime).format('YYYY-MM-DD') + "至" + moment(text.endTime).format('YYYY-MM-DD')
        }
      },
    ]

    return (
      <div>
        { index == 1 && <Table
          {...tableProps}
          bordered
          columns={columns1}
          simple
          rowKey={record => record.id}
        />}
        {index == 3 && <Table
          {...tableProps}
          bordered
          columns={columns3}
          simple
          rowKey={record => record.id}
        />}
        {index == 4 && <Table
          {...tableProps}
          bordered
          columns={columns4}
          simple
          rowKey={record => record.id}
        />}

      </div>

    )
  }
}

export default List
