import React, { PureComponent } from 'react'
import { Table, Divider, Modal, Checkbox, message, Popover, Button, Input } from 'antd'
import { isEqual } from 'lodash';
import { router } from 'umi'
import styles from '../index.less'

class EduTable extends PureComponent {
  state = {
    isDeleteFile: false,  //默认任务数据文件不一同删除
  }

  createForm = (id) => {
    router.push(`./eduTraining/formilyDesignable?id=${id}`)
  }

  seachForm = (item) => {
    const { onSeachForm } = this.props
    onSeachForm(item)
  }

  watchMadalList = (id) => {
    const { onWatchList } = this.props
    onWatchList(id)
  }

  handleActionStatus = (id, status) => {
    const { onHandleActionStatus } = this.props
    onHandleActionStatus(id, status)
  }

  //queryOneUserDetail



  content1 = (id) => (
    <div>
      <a onClick={() => this.handleActionStatus(id, '1')}>培训中</a>
    </div>
  )

  content2 = (id) => (
    <div>
      <a onClick={() => this.handleActionStatus(id, '0')}>报名中</a>  &nbsp; &nbsp;&nbsp;
      <a onClick={() => this.handleActionStatus(id, '2')}>已结束</a>
    </div>
  )
  copyRegistrationLink = (content) => {

    var aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    message.success('复制成功')
  }
  //编辑
  handleUpdateTeach = (item) => {
    const { onHandleUpdateTeach } = this.props
    onHandleUpdateTeach(item)
  }


  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: 80
      },
      {
        title: '群组名称',
        dataIndex: 'groupName',
        key: 'groupName',
        width: 180
      },
      {
        title: '教学方式',
        dataIndex: 'trainingFormatName',
        key: 'trainingFormatName',
        width: 100
      },
      {
        title: '教学名称',
        dataIndex: 'name',
        key: 'name',
        width: 180
      },
      {
        title: '课程方向',
        dataIndex: 'courseDirectionName',
        key: 'courseDirectionName',
        width: 180
      },
      {
        title: '课程分类',
        dataIndex: 'courseClassificationName',
        key: 'courseClassificationName',
        width: 180
      },
      {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
        width: 100
      },
      {
        title: '报名开始时间',
        dataIndex: 'signStartDate',
        key: 'signStartDate',
        ellipsis: true,
        width: 120
      },
      {
        title: '报名结束时间',
        dataIndex: 'signEndDate',
        key: 'signEndDate',
        width: 120
      },
      {
        title: '教学开始时间',
        dataIndex: 'attendStartDate',
        key: 'attendStartDate',
        // ellipsis: true,
        width: 120
      },
      {
        title: '教学结束时间',
        dataIndex: 'attendEndDate',
        key: 'attendEndDate',
        width: 120
      },
      {
        title: '主办方',
        dataIndex: 'sponsor',
        key: 'sponsor',
        align: 'center',
        width: 180
      },
      {
        title: '是否公开',
        dataIndex: 'ofOpen',
        key: 'ofOpen',
        align: 'center',
        width: 180,
        render: (text, record) => {
          if (isEqual(record.ofOpen, 1)) {
            return (
              <span> 公开</span>
            )
          } else if (isEqual(record.ofOpen, 2)) {
            return (
              <span> 不公开</span>
            )
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: (text, record) => {
          if (isEqual(record.status, 0)) {
            return (
              <span> 报名中</span>
            )
          } else if (isEqual(record.status, 1)) {
            return (
              <span> 培训中</span>
            )
          } else if (isEqual(record.status, 2)) {
            return (
              <span> 已结束</span>
            )
          }
        }
      },
      {
        title: '表单',
        key: 'status1',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (record) => {
          if (record.signFormId) {
            return (
              <a onClick={() => this.seachForm(record)}>查看表单</a>
            )
          } else {
            return (
              <a onClick={() => this.createForm(record.id)}>生成表单</a>
            )
          }

        }
      },
      {
        title: '操作',
        key: 'handle',
        fixed: 'right',
        width: 360,
        render: (record) => {
          return (
            <div>
              <a onClick={() => this.watchMadalList(record.id)}>查看报名</a>
              <Divider type="vertical" />
              {
                record.signFormId ?
                  <span>
                    <a onClick={() => this.copyRegistrationLink(`${window.location.origin}/login?from=/eduTrainingRegistration/testFormCreate?id=${record.id}`)}>复制报名链接</a>
                    <Divider type="vertical" />
                  </span>
                  : null
              }

              {
                isEqual(record.status, 2) ?
                  null : <Popover content={isEqual(record.status, 0) ? this.content1(record.id) : this.content2(record.id)} title="修改状态为:">
                    <a>修改状态</a>
                    <Divider type="vertical" />

                  </Popover>
              }
              <a onClick={() => this.handleUpdateTeach(record)}>编辑</a>
            </div>

          )

        }
      }
    ]

    return (

      <>
        <Table
          {...tableProps}
          columns={columns}
          pagination={{
            ...tableProps.pagination,
            // showTotal: total => `共 ${total} 条`,
          }}
          column
          rowKey={record => record.id}
          scroll={{ x: 1500 }}
        />


      </>
    )
  }
}

export default EduTable
