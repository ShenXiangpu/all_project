import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
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


  ssurveys = (id) => {
    const { onSsurveys } = this.props
    onSsurveys(id);
  }







  downloadFile = (fileName, fileData) => {
    let a = document.createElement('a'); //创建a标签
    a.setAttribute('href', fileData);
    a.setAttribute('download', fileName);
    a.setAttribute('target', '_blank'); //打开一个新的窗口
    a.setAttribute('id', "downLoad");
    if (document.getElementById('downLoad')) {
      document.body.removeChild(document.getElementById('downLoad'));
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  render() {
    const { salemanList, ...tableProps } = this.props;

    const columns = [
      {
        title: '需求ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '渠道名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '渠道手机号',
        dataIndex: 'phone',
        key: 'phone',

      },

      {
        title: '分享链接',
        dataIndex: 'affiliateLink',
        key: 'affiliateLink',
        width: '100px'
        // render: (text, record) => {
        //   return record && record.requirementModel && record.requirementModel.optionName ? record.requirementModel.optionName : null
        // }
      },
      {
        title: '下载分享码',
        dataIndex: 'qrCode64',
        key: 'qrCode64',
        render: (text, record) => {
          return (
            <a onClick={() => this.downloadFile(record.affiliateCode, 'data:image/jpeg;base64,' + record.qrCode64)} >下载分享码</a>
          )
        }
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
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
        dataSource={salemanList}
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
