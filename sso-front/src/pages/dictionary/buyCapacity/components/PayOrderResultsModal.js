import React, { PureComponent } from 'react'
import { Button, Modal, Table } from 'antd'
import styles from './PayOrderResultsModal.less'
import store from 'store';
const balance = store.get('balance');  // 余额
class PayOrderResultsModal extends PureComponent {



  render() {

    const { modalProps, tableProps } = this.props;

    console.log('this.props',this.props)
    
    const columns = [
      {
        title: '容量类型',
        dataIndex: 'key',
        key: 'key',
        align:'center',
      },
      {
        title: '容量',
        dataIndex: 'value',
        key: 'value',
        align:'center',

      },
      {
        title: '有效期',
        dataIndex: 'status',
        key: 'status',
        align:'center',

      },
    ]

    return (
      <Modal
        {...modalProps}
      >
        <Table
          {...tableProps}
          className={styles.table}
          bordered
          columns={columns}
          simple
          rowKey={record => record.id}
          scroll={{ y: 240 }}
        />

      </Modal>
    )
  }
}

export default PayOrderResultsModal
