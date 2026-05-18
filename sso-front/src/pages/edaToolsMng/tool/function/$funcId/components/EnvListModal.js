import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, Popconfirm, Button, Divider, Tag } from 'antd'
import { isEqual } from 'lodash'

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
        title: '名称',
        dataIndex: 'featureName',
        key: 'featureName',
        // width: 140,
      },
      {
        title: '标识',
        dataIndex: 'featureType',
        key: 'featureType',
        render: (text, record) => {
          if (isEqual(record.featureType,1)) {
            return (
              <Tag color="#f50">核心</Tag>
            )
          } else {
            return (
              <Tag color="#108ee9">普通</Tag>
            )
          }

        }
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
