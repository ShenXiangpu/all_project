import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Popconfirm, Modal } from 'antd'
import styles from './List.less'
import { defaultHeadImg } from 'utils/config'
import { isEmpty } from 'lodash'

const { confirm } = Modal;

class List extends PureComponent {
  state = {
    selectedRowKeys: [],
    doubleArr: [],  // 存放二维数组，将每一页作为二维数组的下标，将每一页选中的数组作为参数值
    filterRows: [], // 存放拼接后的一维数组的变量
  }

  handleReomveUserClick = (record, e) => {
    const { onRemoveUser } = this.props
    confirm({
      title: `确定将用户 ${record.userName} 移出群组？`,
      content: '用户移出群组后用户所关联的IC设计云服务器账号也将被注销。',
      width: 500,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        onRemoveUser(record)
      }
    });
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { pagination, onRowChange } = this.props;
    const { doubleArr } = this.state
    const current = pagination && pagination.current || 1;

    doubleArr[current ? current - 1 : 0] = selectedRows; // 勾选生成二维数组
    const filterRows = this.mapRows(doubleArr);  // 扁平化成为一位数组

    onRowChange(selectedRowKeys, filterRows);
  }

  // 扁平化二维数组的方法
  mapRows = params => {
    var res = [];
    for (var i = 0; i < params.length; i++) {
      if (Array.isArray(params[i])) {
        res = res.concat(this.mapRows(params[i]));
      } else {
        res.push(params[i]);
      }
    }
    return res.filter(Boolean); //去掉undefined的情况
  };

  render() {
    const { onDeleteItem, onEditItem, selectedRowKeys, ...tableProps } = this.props

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const columns = [
      {
        title: '用户',
        key: 'avatar',
        width: 80,
        align: 'center',
        render: (text, record) => {
          const headUrl = record.headUrl
          return <Avatar style={{ background: '#c9e5cd' }} src={headUrl ? headUrl : defaultHeadImg} />
        },
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: text => isEmpty(text) ? <span style={{ color: '#faad14' }}>尚未绑定手机号</span> : text
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '创建时间',
        width: 100,
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '实例ID',
        width: 100,
        dataIndex: 'vmId',
        key: 'vmId',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].vmId : '-';
        }
      },
      {
        title: '实例名称',
        width: 100,
        dataIndex: 'vmName',
        key: 'vmName',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].vmName : '-';
        }
      },
      {
        title: '过期时间',
        width: 100,
        dataIndex: 'expirationTime',
        key: 'expirationTime',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].expirationTime : '-';
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleReomveUserClick(record, e)}>移出群组</a>
            </span>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
        className={styles.table}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
        rowSelection={rowSelection}
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
