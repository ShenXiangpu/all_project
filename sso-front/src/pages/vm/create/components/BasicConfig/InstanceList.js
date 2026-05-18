import React, { PureComponent } from 'react'
import { Table } from 'antd';
import { PRICEUNIT } from 'utils/constant'
import styles from "./InstanceList.less";
import { isEqual } from 'lodash';

class InstanceList extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    const { list, onSetInstanceConfig, item } = this.props;

    let checkedItem = {};
    if (item && item.id) { // 回显
      checkedItem = item;
    } else if (list && list.length > 0) { // 默认选中第一条
      checkedItem = list[0];
    }

    if (checkedItem && checkedItem.id) {
      this.setState({ selectedRowKeys: [checkedItem.id] });
      onSetInstanceConfig(checkedItem);
    }
  }

  componentDidUpdate(preProps) {
    const { list: old_list } = preProps;
    const { list, onSetInstanceConfig } = this.props;
    if (list && list.length > 0 && !isEqual(old_list, list)) { // 默认选中第一条
      this.setState({ selectedRowKeys: [list[0].id] });
      onSetInstanceConfig(list[0]);
    }
  }

  onRowClick = (record) => {
    console.log('record', record);
    const { onSetInstanceConfig } = this.props;
    // console.log('record:', record);
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
          // onChange:(record) => {
          //   this.setState({ selectedRowKeys: [record.id] });
          // },
          onSelect: (record) => {
            this.onRowClick(record)
          }
        }}
        onRow={record => {
          return {
            onClick: () => this.onRowClick(record), // 点击行
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
