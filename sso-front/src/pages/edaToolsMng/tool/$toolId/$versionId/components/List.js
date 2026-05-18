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
      functionId: record.id
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

  render() {
    const { taskTypes, ...tableProps } = this.props

    const columns = [
      {
        title: '功能名称',
        align: 'center',
        dataIndex: 'functionName',
        key: 'functionName',
      },
      {
        title: '支持运行平台',
        align: 'center',
        dataIndex: 'supportPlatform',
        key: 'supportPlatform',
        render: text => isEqual(Number(text), 1) && '云平台' || isEqual(Number(text), 2) && '超算' || isEqual(Number(text), 3) && '云平台/超算'
      },
      {
        title: '任务类型',
        align: 'center',
        dataIndex: 'taskTypeId',
        key: 'taskTypeId',
        render: text => {
          if (taskTypes) {
            const itemB = taskTypes.B && taskTypes.B.filter(item => item.id === text);
            const itemF = taskTypes.F && taskTypes.F.filter(item => item.id === text);
            if (itemB && itemB.length > 0) {
              return itemB[0].name;
            } else if (itemF && itemF.length > 0) {
              return itemF[0].name;
            }
          }
          return text;
        }
      },
      {
        title: '参考用例',
        align: 'center',
        dataIndex: 'referenceCase',
        key: 'referenceCase',
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '使用说明书',
        align: 'center',
        dataIndex: 'userGuide',
        key: 'userGuide',
        ellipsis: true,
        render: text => <span title={text}>{text}</span>
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleFeatureClick(record, e)}>参数列表</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleClick(record, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该工具Function？"
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
