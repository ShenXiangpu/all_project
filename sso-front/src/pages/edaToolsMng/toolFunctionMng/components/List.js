import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm, Switch, message } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'

class List extends PureComponent {

  handleAddClick = (record, e) => {
    const { onAddSubMenuItem } = this.props
    onAddSubMenuItem(record)
  }

  handleClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      catId: record.catId
    }
    onDeleteItem(values)
  }

  onStatusChange = (record, checked) => {
    console.log(`switch to ${checked}`, record);
    const { onUpdateStatus } = this.props;
    const data = {
      id: record.id,
      status: checked ? 1 : 2
    }
    onUpdateStatus(data);
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: '功能名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
      },
      
      {
        title: '状态',
        align: 'center',
        dataIndex: 'showStatus',
        key: 'showStatus',
        // width: 100,
        render: (text, record) => (
          <Switch
            // loading={switchLoading}
            checkedChildren="可用"
            unCheckedChildren="不可用"
            // defaultChecked={isEqual(Number(text), 1)}
            checked={(this.state && this.state[`status_${record.id}`]) || isEqual(Number(text), 1)}
            onChange={e => this.onStatusChange(record, e)} />)
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleAddClick(record, e)}>添加子菜单</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleClick(record, e)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定删除该菜单信息吗?"
                placement="left"
                okText="确定" cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#">删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        className={styles.table}
        bordered
        columns={columns}
        pagination={false}
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
