import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, Popconfirm, Button, Divider } from 'antd'

class InUsedModal extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props.tableProps
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props.tableProps
    const values = {
      id: record.id
    }
    onDeleteItem(values)
  }

  render() {
    const { tableProps, modalProps } = this.props

    const columns = [
      {
        title: '序号',
        align: 'center',
        dataIndex: 'num',
        key: 'num',
        render: (text, record, index) => index + 1
      },
      {
        title: '用户',
        align: 'center',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '主机',
        align: 'center',
        dataIndex: 'hostname',
        key: 'hostname',
      },
      {
        title: '版本',
        align: 'center',
        dataIndex: 'version',
        key: 'version',
      },
      {
        title: '开始时间',
        align: 'center',
        dataIndex: 'startTime',
        key: 'startTime',
      }
    ]

    return (
      <Modal {...modalProps}>
        <Table
          {...tableProps}
          pagination={false}
          bordered
          columns={columns}
          simple
          size="small"
          rowKey={record => record.username}
        />
      </Modal>
    )
  }
}

InUsedModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default InUsedModal
