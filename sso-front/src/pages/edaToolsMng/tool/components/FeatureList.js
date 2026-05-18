import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'

class List extends PureComponent {

  handleInUsedClick = (record, e) => {
    const { onGetInUsedList } = this.props;
    const data = {
      featureName: record.featureName
    }
    onGetInUsedList(data);
  }

  render() {
    const { switchLoading, ...tableProps } = this.props;

    const columns = [
      {
        title: '序号',
        align: 'center',
        dataIndex: 'num',
        key: 'num',
        render: (text, record, index) => index + 1
      },
      {
        title: 'Feature名称',
        align: 'center',
        dataIndex: 'featureName',
        key: 'featureName',
        sorter: (a, b) => a.featureName.localeCompare(b.featureName)
      },
      {
        title: 'Feature版本',
        align: 'center',
        dataIndex: 'featureVersion',
        key: 'featureVersion',
      },
      {
        title: 'License过期时间',
        align: 'center',
        dataIndex: 'expires',
        key: 'expires',
        sorter: (a, b) => {
          //将日期转成毫秒数，有利于计算大小
          let atime = new Date(a.expires.replace(/-/g, '/')).getTime();
          let btime = new Date(b.expires.replace(/-/g, '/')).getTime();
          return atime - btime
        },
      },
      {
        title: '已经使用License授权',
        align: 'center',
        dataIndex: 'inUsed',
        key: 'inUsed',
        sorter: (a, b) => a.inUsed - b.inUsed,
      },
      {
        title: '全部License授权',
        align: 'center',
        dataIndex: 'totalLicense',
        key: 'totalLicense',
        sorter: (a, b) => a.totalLicense - b.totalLicense,
      },
      // {
      //   title: '创建时间',
      //   align: 'center',
      //   dataIndex: 'createdAt',
      //   key: 'createdAt',
      //   sorter: (a, b) => {
      //     //将日期转成毫秒数，有利于计算大小
      //     let atime = new Date(a.expires.replace(/-/g, '/')).getTime();
      //     let btime = new Date(b.expires.replace(/-/g, '/')).getTime();
      //     return atime - btime
      //   },
      // },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <a href="#" onClick={e => this.handleInUsedClick(record, e)}>使用详情</a>
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
