import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, Popconfirm, Button, Divider } from 'antd'

class ParamsListModal extends PureComponent {

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
    const { onShowParamsMdl, tableProps, modalProps } = this.props

    const columns = [
      {
        title: '参数名称',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '字段名Label',
        align: 'center',
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: '类型',
        align: 'center',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'HTML类型',
        align: 'center',
        dataIndex: 'html_type',
        key: 'html_type',
      },
      {
        title: '默认值',
        align: 'center',
        dataIndex: 'default_value',
        key: 'default_value',
      },
      {
        title: '是否必填',
        align: 'center',
        dataIndex: 'necessity',
        key: 'necessity',
      },
      {
        title: 'placeholder',
        align: 'center',
        dataIndex: 'placeholder',
        key: 'placeholder',
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '描述信息',
        align: 'center',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleClick(record, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该配置参数？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
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
          <Button onClick={onShowParamsMdl}>新增</Button>
        </p>
        <Table
          {...tableProps}
          pagination={false}
          // className={styles.table}
          bordered
          columns={columns}
          simple
          size="small"
          rowKey={record => record.id}
        />
      </Modal>
    )
  }
}

ParamsListModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ParamsListModal
