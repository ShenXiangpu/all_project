import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm, Switch, message, Menu, Dropdown, Icon } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'

class List extends PureComponent {

  handleVersionClick = (record, e) => {
    const { onRedirectVersion } = this.props
    onRedirectVersion(record.id)
  }

  handleMng = (record, e) => {
    const { onRedirectVersion } = this.props
    onRedirectVersion(record.id)
  }

  handleEditClick = (record, e) => {
    const { onEditItem } = this.props;
    onEditItem(record);
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      functionId: record.functionId
    }
    onDeleteItem(values)
  }


  handleFunctionFeaMng = (record, e) => {
    const { onHandleFunctionFeaMng } = this.props;
    onHandleFunctionFeaMng(record.functionId)
  }

  onStatusChange = (record, checked) => {
    // debugger
    console.log(`switch to ${checked}`, record);
    const { onUpdateStatus } = this.props;
    const data = {
      toolId: record.id,
      status: checked ? 1 : 2
    }
    onUpdateStatus(data).then(response => {
      // debugger
      console.log("res", response);
      if (response && response.flag) {
        message.success("状态更新成功")
        this.setState({
          [`status_${record.id}`]: checked
        })
      } else {
        this.setState({
          [`status_${record.id}`]: !checked
        })

        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    })
  }

  render() {
    const { switchLoading, ...tableProps } = this.props;

    const columns = [
      {
        title: '功能名称',
        align: 'center',
        dataIndex: 'functionName',
        key: 'functionName',
      },
      {
        title: '功能分类',
        align: 'center',
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
      {
        title: '功能类型',
        align: 'center',
        dataIndex: 'functionType',
        key: 'functionType',
        ellipsis: true,
        render: record => {
          if (record && isEqual(record.functionType, '1')) {
            return (<span>基础功能</span>);
          } else {
            return (<span>一般功能</span>);
          }
        }
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'showStatus',
        key: 'showStatus',
        width: 120,
        render: (text, record) => (
          <Switch
            // x={switchLoading}
            checkedChildren="可用"
            unCheckedChildren="不可用"
            key={isEqual(Number(text), 1)}
            defaultChecked={isEqual(Number(text), 1) || (this.state && this.state[`status_${record.id}`])}
            // checked={(this.state && this.state[`status_${record.id}`]) } // 不用checked   使用 key配合defaultchecked
            onChange={e => this.onStatusChange(record, e)} />)
      },
      {
        title: '描述',
        align: 'center',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        width: 310,
        render: (text, record) => {
          const menu = (
            <Menu>
              <Menu.Item>
                <a href="#" onClick={e => this.handleEditClick(record, e)}>编辑</a>
              </Menu.Item>
              <Menu.Item>

              </Menu.Item>
            </Menu>
          )

          return (
            <div id={record.id}>
              <a href="#" onClick={e => this.handleFunctionFeaMng(record, e)}>功能Feature</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleEditClick(record, e)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="top"
                title="确定删除该工具？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#">删除</a>

              </Popconfirm>
              <Divider type="vertical" />
            </div>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        // className={styles.table}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
        scroll={{ y: 420 }}
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
