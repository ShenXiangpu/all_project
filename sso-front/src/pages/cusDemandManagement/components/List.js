import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Icon, Spin, Popconfirm, Modal, message, Menu, Dropdown } from 'antd'
import Link from 'umi/link';
import styles from './List.less'
import { isEmpty, isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import moment from 'moment'
import { router } from 'umi'



class List extends PureComponent {
  state = {

  }


  handleClick = (id, status, projectId, str) => {
    const { onHandleClick } = this.props
    onHandleClick(id, status, projectId, str)
  }

  handleCloseClick = (projectId) => {
    const { onHandleCloseClick } = this.props
    onHandleCloseClick(projectId)
  }


  ssurveys = (id) => {
    const { onSsurveys } = this.props
    onSsurveys(id);
  }








  render() {
    const { demandList, ...tableProps } = this.props;

    const columns = [
      {
        title: '需求ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '客户姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '公司',
        dataIndex: 'companyName',
        key: 'companyName',
      },
      {
        title: '需求',
        dataIndex: 'requirementModel',
        key: 'requirementModel',
        render: (text, record) => {
          return record && record.requirementModel && record.requirementModel.optionName ? record.requirementModel.optionName : null
        }
      },
      {
        title: '提交时间',
        dataIndex: 'create',
        key: 'create',
        render: (text, record) => {
          return record && record.createdTime ? moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss') : null
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          if (isEqual(record.status, 0)) {
            return (<span>待修改</span>)
          } else if (isEqual(record.status, 1)) {
            return (<span> 评审中</span>)
          } else if (isEqual(record.status, 2)) {
            return (<span> 评审通过</span>)
          } else if (isEqual(record.status, 3)) {
            return (<span> 评审不通过</span>)
          } else if (isEqual(record.status, 4)) {
            return (<span> 已生成项目</span>)
          } else if (isEqual(record.status, 5)) {
            return (<span> 验证中</span>)
          } else if (isEqual(record.status, 6)) {
            return (<span> 验证结束</span>)
          } else if (isEqual(record.status, 7)) {
            return (<span> 项目已关闭</span>)
          }
        }
      },
      {
        title: '操作',
        key: 'operation',
        // dataIndex: 'operation',
        render: (text, record) => {
          let id = record.id
          let status = record.status
          let projectId = record.projectId

          if (isEqual(record.status, 0)) {
            return (
              <span>
                <a className={styles.statusColor} onClick={() => { this.handleClick(id, status, projectId, '3') }}> 查看详情 </a>
                {/* <a className={styles.statusColor} onClick={() => { this.handleCloseClick(projectId) }}>关闭项目</a> */}
              </span>
            )
          } else if (isEqual(record.status, 1)) {
            return (
              <span>
                <a className={styles.statusColor} onClick={() => { this.handleClick(id, status, projectId, '1') }}> 评审 </a>
                {/* <a className={styles.statusColor} onClick={() => { this.handleCloseClick(projectId) }}>关闭项目</a> */}
              </span>
            )

          }
          else if (
            isEqual(record.status, 2) ||
            isEqual(record.status, 3) ||
            isEqual(record.status, 5) ||
            isEqual(record.status, 6)
          ) {
            return (
              <span>
                <a className={styles.statusColor} onClick={() => { this.handleClick(id, status, projectId, '3') }}> 查看详情</a>&nbsp;

              </span>

            )
          } else if (isEqual(record.status, 4)) {
            return (
              <span>
                <a className={styles.statusColor} onClick={() => { this.handleClick(id, status, projectId, '3') }}> 查看详情</a>&nbsp;
                <a className={styles.statusColor} onClick={() => { this.handleCloseClick(projectId) }}>关闭项目</a>
              </span>

            )
          }
          else if (isEqual(record.status, 7)) {
            return (
              <>
                <a className={styles.statusColor} onClick={() => { this.handleClick(id, status, projectId, '3') }}> 查看详情</a>&nbsp;
                {record.serviceRecordExists > 0 ? <a className={styles.statusColor} onClick={() => { this.ssurveys(record.id) }}> 满意度调查</a> : null}
              </>
            )
          }

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
        dataSource={demandList}
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
