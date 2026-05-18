import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm } from 'antd'
import Link from 'umi/link';
import styles from './List.less'

const STATUS = {
  'active': '运行中',
  'inactive': '暂停',
  'updating': '更新中',
  "error": '异常'
}

class List extends PureComponent {

  handleDetailClick = (record, e) => {
    const { onGetDetailInfo } = this.props;
    const data = {
      vmName: record.containers && record.containers.length > 0 ? record.containers[0].name : '',
      workloadId: record.id
    }
    onGetDetailInfo(data);
  }

  handleRemoteClick = (record, e) => {
    const { onShowRemoteModal } = this.props;
    const data = {
      workloadId: record.id,
      projectId: record.projectId
    }
    onShowRemoteModal(data);
  }

  handleResClick = (record, e) => {
    const { onGetResourceUsage } = this.props;
    const data = {
      vmName: record.containers && record.containers.length > 0 ? record.containers[0].name : '',
      workloadId: record.id,
      projectId: record.projectId,
    }
    onGetResourceUsage(data);
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '主机名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => record.containers && record.containers.length > 0 ? record.containers[0].name : ''
      },
      {
        title: '运行状态',
        dataIndex: 'state',
        key: 'state',
        render: text => STATUS[text]
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
        render: text => text && text.replace("T", " ").replace("Z", " ")
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleDetailClick(record, e)}>详情</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleRemoteClick(record, e)}>远程连接</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleResClick(record, e)}>资源监控</a>
            </span>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        className={styles.table}
        bordered
        columns={columns}
        simple
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
