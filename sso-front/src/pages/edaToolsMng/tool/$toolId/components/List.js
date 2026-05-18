import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'

class List extends PureComponent {

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleFeatureClick = (record, e) => {
    const { onFeatureClick } = this.props
    const values = {
      id: record.id
    }
    onFeatureClick(values)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      id: record.id
    }
    onDeleteItem(values)
  }

  handleEnvClick = (value, e) => {
    const { onGetEnvs } = this.props
    onGetEnvs(value)
  }


  render() {
    const { ...tableProps } = this.props

    const columns = [
      {
        title: '工具版本',
        align: 'center',
        dataIndex: 'toolVersion',
        key: 'toolVersion',
      },
      {
        title: '服务器安装地址',
        align: 'center',
        dataIndex: 'toolLocation',
        key: 'toolLocation',
      },
      {
        title: '主机host地址',
        align: 'center',
        dataIndex: 'hostAddress',
        key: 'hostAddress',
      },
      // {
      //   title: '安装路径',
      //   align: 'center',
      //   dataIndex: 'toolPath',
      //   key: 'toolPath',
      //   ellipsis: true,
      //   render: text => <span title={text}>{text}</span>
      // },
      // {
      //   title: '环境变量',
      //   align: 'center',
      //   dataIndex: 'environmentPath',
      //   key: 'environmentPath',
      //   ellipsis: true,
      //   render: text => <span title={text}>{text}</span>
      // },
      {
        title: '安装包下载地址',
        align: 'center',
        dataIndex: 'toolSourcePath',
        key: 'toolSourcePath',
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '工具安装脚本',
        align: 'center',
        dataIndex: 'installScript',
        key: 'installScript',
        ellipsis: true,
      },
      {
        title: '工具指南',
        align: 'center',
        dataIndex: 'installGuide',
        key: 'installGuide',
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleEnvClick(record.id, e)}>环境变量</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleFeatureClick(record, e)}>功能管理</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleClick(record, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该工具版本？"
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
      <Table
        {...tableProps}
        pagination={false}
        className={styles.table}
        bordered
        columns={columns}
        simple
        size="small"
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
