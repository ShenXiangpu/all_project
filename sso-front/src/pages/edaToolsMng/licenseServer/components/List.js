import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm, Switch, message } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash'
import Link from 'umi/link'

class List extends PureComponent {

  handleEditClick = (record, e) => {
    const { onEditItem } = this.props;
    onEditItem(record);
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const values = {
      serverId: record.id
    }
    onDeleteItem(values)
  }

  onStatusChange = (record, checked) => {
    const { onUpdateStatus } = this.props;
    const data = {
      serverId: record.id,
      status: checked ? 1 : 2
    }
    onUpdateStatus(data);
  }

  render() {
    const { switchLoading, ...tableProps } = this.props;

    const columns = [
      {
        title: 'License服务器名称',
        align: 'center',
        dataIndex: 'licenseServerName',
        key: 'licenseServerName',
        fixed: true,
        render: (text, record) => <Link to={`/edaToolsMng/licenseServer/${record.id}`}>{text}</Link>
      },
      {
        title: '厂商',
        align: 'center',
        dataIndex: 'vendorName',
        key: 'vendorName',
        // fixed: true,
      },
      {
        title: '是否临时License',
        align: 'center',
        dataIndex: 'isTemporary',
        key: 'isTemporary',
        width: 120,
        render: text => isEqual(Number(text), 1) && '是' || isEqual(Number(text), 2) && '否'
      },
      {
        title: '环境变量Home',
        align: 'center',
        dataIndex: 'licenseServerHome',
        key: 'licenseServerHome',
        ellipsis: true,
      },
      {
        title: '主机名',
        align: 'center',
        dataIndex: 'licenseServerHostname',
        key: 'licenseServerHostname',
      },
      {
        title: 'IP地址',
        align: 'center',
        dataIndex: 'licenseServerIp',
        key: 'licenseServerIp',
      },
      {
        title: 'License端口',
        align: 'center',
        dataIndex: 'licenseServerPort',
        key: 'licenseServerPort',
      },
      {
        title: '代理IP地址',
        align: 'center',
        dataIndex: 'agentIp',
        key: 'agentIp',
      },
      {
        title: '代理端口',
        align: 'center',
        dataIndex: 'agentPort',
        key: 'agentPort',
      },
      {
        title: 'SSH端口',
        align: 'center',
        dataIndex: 'sshPort',
        key: 'sshPort',
      },
      {
        title: 'SSH登录密码',
        align: 'center',
        dataIndex: 'sshPassword',
        key: 'sshPassword',
      },
      {
        title: '脚本路径',
        align: 'center',
        dataIndex: 'scriptPath',
        key: 'scriptPath',
        ellipsis: true,
      },
      {
        title: '日志目录',
        align: 'center',
        dataIndex: 'licenseServerLog',
        key: 'licenseServerLog',
        ellipsis: true,
      },
      {
        title: 'License文件',
        align: 'center',
        dataIndex: 'licenseServerPath',
        key: 'licenseServerPath',
        ellipsis: true,
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (text, record) => (
          <Switch
            checkedChildren="正常"
            unCheckedChildren="失效"
            checked={isEqual(Number(text), 1)}
            onChange={e => this.onStatusChange(record, e)} />)
      },
      {
        title: '创建人',
        align: 'center',
        dataIndex: 'createdBy',
        key: 'createdBy',
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
              <a href="#" onClick={e => this.handleEditClick(record, e)}>编辑</a>
              {/* <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="确定删除该License服务器？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#" >删除</a>
              </Popconfirm> */}
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
        scroll={{ x: 'max-content' }}
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
