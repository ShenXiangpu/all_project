import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Icon, Spin, Popconfirm, Modal, message, Menu, Dropdown } from 'antd'
import Link from 'umi/link';
import styles from './List.less'
import { isEmpty, isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import moment from 'moment'
import { router } from 'umi'



class List extends PureComponent {
  state = {

  }


  handleClick = (id, status, projectId, str) => {
    const { onHandleClick } = this.props
    onHandleClick(id, status, projectId, str)
  }

  handleCloseClick = (projectId) => {
    const { onHandleCloseClick } = this.props
    onHandleCloseClick(projectId)
  }


  ssurveys = (id) => {
    const { onSsurveys } = this.props
    onSsurveys(id);
  }








  render() {
    const { orderList, ...tableProps } = this.props;

    const columns = [
      {
        title: '业务员ID',
        dataIndex: 'id',
        key: 'affiliateId',
      },
      {
        title: '业务员姓名',
        dataIndex: 'affiliateName',
        key: 'affiliateName',
      },
      {
        title: '组别',
        dataIndex: 'groupLevel',
        key: 'groupLevel ',
      },
      {
        title: '语言',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: '客户姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '客户手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '订单编号',
        dataIndex: 'num',
        key: 'num',
        
      },
      {
        title: '支付时间',
        dataIndex: 'payTime',
        key: 'payTime',
        render: (text, record) => {
          return record && record.payTime ? moment(record.payTime).format('YYYY-MM-DD HH:mm:ss') : null
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          if (isEqual(record.status, 0)) {
            return (<span>待支付</span>)
          } else if (isEqual(record.status, 1)) {
            return (<span> 支付成功</span>)
          } else if (isEqual(record.status, 2)) {
            return (<span> 支付失败</span>)
          } 
        }
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
        className={styles.table}
        bordered
        columns={columns}
        simple
        dataSource={orderList}
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
