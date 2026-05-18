import React, { PureComponent } from 'react'
import { Table } from 'antd';
import { PRICEUNIT } from 'utils/constant'
import styles from "./InstanceList.less";
import { isEqual } from 'lodash';

class InstanceList extends PureComponent {
  state = {
    selectedRowKeys: [7],
  };

  componentDidMount() {
    const { list, onSetInstanceConfig, item, vmInfo, } = this.props;
    let flavorId = vmInfo && vmInfo.flavorId;//用于回显
    if(flavorId){
      this.setState({
        selectedRowKeys: [flavorId]
      })
      const item = list.filter(item => {return item.id == flavorId})
      if(item && item.length === 1){
        onSetInstanceConfig(item[0])
      }
    }


    console.log('vmInfo',vmInfo,list);
    
    let checkedItem = {};
    if (item && item.id) { // 回显
      checkedItem = item;
    }

    if (checkedItem && checkedItem.id) {
      this.setState({ selectedRowKeys: [checkedItem.id] });
      onSetInstanceConfig(checkedItem);
    }
  }

  onRowClick = (record) => {
    const { onSetInstanceConfig } = this.props;
    console.log('record:', record);
    this.setState({ selectedRowKeys: [record.id] });
    onSetInstanceConfig(record);
  }

  render() {

    const columns = [
      {
        title: '机型',
        dataIndex: 'flavorType',
        key: 'flavorType',
        width: 100,
      },
      {
        title: '实例规格',
        dataIndex: 'flavorName',
        key: 'flavorName',
        width: 150,
        ellipsis: true,
      },
      {
        title: 'vCPU',
        dataIndex: 'cpu',
        key: 'cpu',
        width: 90,
        render: text => <span>{text} 核</span>
      },
      {
        title: '内存',
        dataIndex: 'memory',
        key: 'memory',
        width: 90,
        render: text => <span>{text} GB</span>
      },
      {
        title: '参考价格',
        dataIndex: 'dayPrice',
        key: 'dayPrice',
        width: 120,
        render: (text, record) => <div><span className={styles.price}><label>{text}</label>元</span> / 天</div>
      },
    ];

    const { selectedRowKeys } = this.state;
    const { list } = this.props;

    return (
      <Table
        className={styles.table}
        pagination={false}
        columns={columns}
        dataSource={list}
        // scroll={{ x: 1500, y: 300 }}
        rowSelection={{
          // fixed: true,
          type: "radio",
          selectedRowKeys,
          onSelect: (record) => {
            this.onRowClick(record)
          }
        }}
        onRow={record => {
          return {
            onClick: event => this.onRowClick(record), // 点击行
          };
        }}
        locale={{
          emptyText: '暂无满足该筛选条件的实例，请选择其他类型的实例'
        }}
        rowKey={record => record.id}
      />
    )
  }
}
export default InstanceList
