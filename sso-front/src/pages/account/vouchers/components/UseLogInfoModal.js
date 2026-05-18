import React, { PureComponent } from 'react';
import { Modal, Table } from 'antd';
import { isEqual } from 'lodash-es';
import styles from './UseLogInfoModal.less'
import moment from 'moment'

class UseLogInfoModal extends PureComponent {



    get listProps() {
        // const { dispatch, vouchers, loading } = this.props
        // const { list, pagination } = vouchers
    
        return {
        //   dataSource: list,
        //   loading: loading.effects['vouchers/getCoupons'],
        //   pagination,
        //   onChange: (pagination, filters, sorter) => {
        //     this.handleTableChange(pagination, filters, sorter)
        //   },
        //   onShowUserLogInfoModal:(e) => {
        //     this.onShowUserLogInfoModal(e);
        //   }
        }
      }
    render() {
        const columns = [
            {
                title: '使用产品',
                dataIndex: 'typeName',
                key: 'typeName',
            },
            {
                title: '子产品',
                dataIndex: 'typeString',
                key: 'typeString',
            },
            {
                title: '付费场景',
                dataIndex: 'parValue',
                key: 'parValue',
            },
            {
                title: '订单号',
                dataIndex: 'startValue',
                key: 'startValue',
            },
            {
                title: '使用金额',
                dataIndex: 'statusString',
                key: 'statusString',
            },
            
        ]
        const { ...modalProps } = this.props;

        return (
            <Modal
                {...modalProps}
                className={styles.modal}
                footer={null}
            >
                <div>代金券（）待使用，累计已使用0.00元，剩余150.00元</div>
                <div>
                    <Table
                        {...this.listProps}
                        bordered
                        columns={columns}
                        simple
                        rowKey={record => record.id}
                    />

                </div>



            </Modal>
        );
    }
}

export default UseLogInfoModal
