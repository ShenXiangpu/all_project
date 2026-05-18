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
      toolId: record.id
    }
    onDeleteItem(values)
  }

  handleFeatureMng = (record, e) => {
    const { onGetFeatures } = this.props;
    onGetFeatures(record)
  }

  
  handleFunctionMng = (record, e) => {
    const { onFunctionMng } = this.props;
    onFunctionMng(record.id)
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
        title: '工具名',
        align: 'center',
        dataIndex: 'toolName',
        key: 'toolName',
      },
      {
        title: '厂商',
        align: 'center',
        dataIndex: 'vendorName',
        key: 'vendorName',
      },
      {
        title: '任务类型',
        align: 'center',
        dataIndex: 'types',
        key: 'types',
        ellipsis: true,
        render: text => {
          if (text && text.length > 0) {
            const arr = text.map(item => item.typeName);
            return arr.join(' / ').toString();
          }
        }
      },
      {
        title: '是否开源',
        align: 'center',
        dataIndex: 'openSource',
        key: 'openSource',
        width: 120,
        render: text => isEqual(Number(text), 1) && '是' || isEqual(Number(text), 2) && '否'
      },
      {
        title: '工具状态',
        align: 'center',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (text, record) => (
          <Switch
            // loading={switchLoading}
            checkedChildren="可用"
            unCheckedChildren="不可用"
            key={isEqual(Number(text), 1)}
            defaultChecked={isEqual(Number(text), 1) || (this.state && this.state[`status_${record.id}`])}
            // checked={(this.state && this.state[`status_${record.id}`]) } // 不用checked   使用 key配合defaultchecked
            onChange={e => this.onStatusChange(record, e)} />)
      },
      {
        title: '支持挂载方式使用',
        align: 'center',
        dataIndex: 'supportMount',
        key: 'supportMount',
        width: 120,
        render: text => isEqual(Number(text), 1) && '是' || isEqual(Number(text), 2) && '否'
      },
      {
        title: '占用资源类型',
        align: 'center',
        dataIndex: 'useResourceType',
        key: 'useResourceType',
        width: 120,
        render: text => isEqual(Number(text), 1) && '内存型' || isEqual(Number(text), 2) && '计算型' || isEqual(Number(text), 3) && '通用型'
      },
      {
        title: '支持web端',
        align: 'center',
        dataIndex: 'allowWeb',
        key: 'allowWeb',
        width: 120,
        render: text => isEqual(Number(text), 1) && '支持' || isEqual(Number(text), 2) && '不支持'
      },
      // {
      //   title: '描述',
      //   align: 'center',
      //   dataIndex: 'description',
      //   key: 'description',
      //   ellipsis: true,
      //   render: text => <span title={text}>{text}</span>
      // },
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
                <Popconfirm
                  placement="bottomRight"
                  title="确定删除该工具？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={e => this.handleDeleteClick(record, e)}
                >
                  <a href="#" >删除</a>
                </Popconfirm>
              </Menu.Item>
            </Menu>
          )

          return (
            <div id={record.id}>
              {/* <a href="#" onClick={e => this.handleFunctionMng(record, e)}>功能管理</a>
              <Divider type="vertical" />
              <a href="#" onClick={e => this.handleFeatureMng(record, e)}>Feature</a>
              <Divider type="vertical" /> */}
              <a href="#" onClick={e => this.handleVersionClick(record, e)}>版本管理</a>
              <Divider type="vertical" />
              <Dropdown
                overlay={menu}
                getPopupContainer={() => document.getElementById(record.id)}
              >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  更多 <Icon type="down" />
                </a>
              </Dropdown>
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
        scroll={{y:420}}
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
