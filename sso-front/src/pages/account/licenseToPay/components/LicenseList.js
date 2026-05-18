import React, { PureComponent } from 'react';
import { Table, List } from 'antd';
import styles from './LicenseList.less';

function LicenseList(tableProps) {

  const toolRender = (data) => {
    const columns = [
      { title: '工具', dataIndex: 'toolName', key: 'toolName' },
      {
        title: '工具计价（元）', dataIndex: 'itemSubTotalPrice', key: 'itemSubTotalPrice',
        width: 200,
        render: text => <span style={{ color: '#ed711f' }}>￥{text}</span>
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        expandedRowRender={record => featureRender(record.aloneList)}
      />
    )
  };

  const featureRender = data => {
    const columns = [
      { title: 'Feature', dataIndex: 'featureName', key: 'featureName' },
      { title: '单价（元/时）', dataIndex: 'featurePrice', key: 'featurePrice', width: 300 },
      { title: '使用时长', dataIndex: 'buyDurationHoursString', key: 'buyDurationHoursString', width: 300 },
      {
        title: 'Feature计价（元）', dataIndex: 'aloneTotalPrice', key: 'aloneTotalPrice',
        width: 200,
        render: text => <span style={{ color: '#ed711f' }}>￥{text}</span>
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    )
  }

  const columns = [
    {
      title: '厂商',
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: '计价（元）',
      width: 200,
      dataIndex: 'itemTotalPrice',
      key: 'itemTotalPrice',
      render: text => <span style={{ color: '#ed711f' }}>￥{text}</span>
    },
  ]

  return (
    <div className={styles.licTb}>
      <Table
        {...tableProps}
        columns={columns}
        rowKey={record => record.vendorCode}
        expandedRowRender={record => toolRender(record.itemSubList)}
      />
    </div>
  )
}

export default LicenseList
