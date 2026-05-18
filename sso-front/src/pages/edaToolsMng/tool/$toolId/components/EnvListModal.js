import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, Popconfirm, Button, Divider } from 'antd'

class EnvListModal extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props.tableProps
    onEditItem(record)
  }

  handleDeleteClick = (value, e) => {
    const { onDeleteItem } = this.props.tableProps
    onDeleteItem(value)
  }

  render() {
    const { onShowEnvCfgMdl, tableProps, modalProps } = this.props

    const columns = [
      {
        title: '变量',
        dataIndex: 'variableName',
        key: 'variableName',
        width: 140,
      },
      {
        title: '值',
        dataIndex: 'variableValue',
        key: 'variableValue',
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 160,
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        width: 100,
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleClick(record, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该环境变量配置？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record.id, e)}
              >
                <a href="#" >删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]

    return (
      <Modal {...modalProps}>
        <p style={{ textAlign: 'right' }}>
          <Button onClick={onShowEnvCfgMdl}>新增</Button>
        </p>
        <Table
          {...tableProps}
          pagination={false}
          // className={styles.table}
          // bordered
          columns={columns}
          simple
          size="small"
          rowKey={record => record.id}
        />
      </Modal>
    )
  }
}

export default EnvListModal
