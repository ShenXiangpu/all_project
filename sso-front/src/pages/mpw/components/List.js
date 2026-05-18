import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, message } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import moment from 'moment'

const { confirm } = Modal;


class List extends PureComponent {


  checkDetail = (id, status,projectId) => {
    const { onCheckDetail } = this.props
    onCheckDetail(id, status,projectId,'3');
  }

  updateDetail = (id) => {
    const { onUpdateDetail } = this.props
    onUpdateDetail(id);
  }

  //点击生成项目，打开model
  buildProject = (id) => {
    const { onBuildProject } = this.props
    onBuildProject(id);
  }

  //验证文件打开 model
  verifyFile = (id,projectId) => {
    const { onVerifyFile } = this.props
    onVerifyFile(id,projectId);
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
        // render: (text, record, index) => {
        //   return index - 0 + 1
        // }
      },
      {
        title: '公司',
        dataIndex: 'companyName',
        key: 'companyName',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '联系人',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '提交时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: (text, record) => {
          return moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: "状态",
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          if (isEqual(record.status, 0)) {
            return (<span> 退回修改</span>)
          } else if (isEqual(record.status, 1)) {
            return (<span> 评审中</span>)
          } else if (isEqual(record.status, 2)) {
            return (<span> 评审通过</span>)
          } else if (isEqual(record.status, 3)) {
            return (<span> 评审不通过，需求结束</span>)
          } else if (isEqual(record.status, 4)) {
            return (<span> 已生成项目</span>)
          } else if (isEqual(record.status, 5)) {
            return (<span> 验证中</span>)
          } else if (isEqual(record.status, 6)) {
            return (<span> 验证结束</span>)
          } else {
            return (<span> 项目已关闭</span>)
          }
        }
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          return (
            <span>  
              {isEqual(record.status, 0) ? <a onClick={() => this.updateDetail(record.id)}>修改</a> : <a onClick={() => this.checkDetail(record.id, record.status,record.projectId)}>查看详情</a> } &nbsp;
              {isEqual(record.status, 2) ? <a onClick={() => this.buildProject(record.id)}>生成项目</a> : null} 
              {isEqual(record.status, 4) || record.status > 4 && record.status < 7 ? <a onClick={() => this.verifyFile(record.id, record.projectId)}>设计文件验证&nbsp;</a> : null} 
              {isEqual(record.status, 7) && isEqual(record.serviceRecordExists, 0)  ? <a onClick={() => this.ssurveys(record.id)}>满意度调查</a> : null}
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
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `共 ${total} 条`,
        }}
        dataSource={demandList}
        columns={columns}
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
