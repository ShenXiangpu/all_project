import React, { PureComponent } from 'react';
import { Table, Row, Col } from 'antd';
import { isEqual } from 'lodash-es';
import Link from 'umi/link';
import styles from './style.less';

class LicenseList extends PureComponent {

  renderEDAs = (itemList) => {
    return itemList.map(ele => (
      <Row key={ele.id}>
        <Col span={8}>
          <div className={styles.panel}>
            <div className={styles.text}>
              <div className={styles.lb}>
                <label>EDA工具厂商：</label>
              </div>
              <div className={styles.value}>
                {ele.vendorName}
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          {/* <div className={styles.panel}>
            <div className={styles.text}>
              <div className={styles.lb}>
                <label>使用时长：</label>
              </div>
              <div className={styles.value}>
                {ele.buyDuration} {ele.buyUnit}
              </div>
            </div>
          </div> */}
        </Col>
        <Col span={8}>
          <div className={styles.panel}>
            <div className={styles.text}>
              <div className={styles.lb}>
                <label>单价：</label>
              </div>
              <div className={styles.value}>
                {ele.itemTotalPrice} 元
              </div>
            </div>
          </div>
        </Col>
      </Row>
    ))
  }

  render() {
    const { ...tableProps } = this.props;

    const columns = [
      {
        title: '订单号',
        dataIndex: 'orderNum',
        key: 'orderNum',
      },
      {
        title: '产品',
        dataIndex: 'orderBigTypeName',
        key: 'orderBigTypeName',
      },

      {
        title: '订单金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text, record) => <span style={{ color: '#ff7643' }}>{text} {record.priceUnit}</span>
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        size="small"
        columns={columns}
        rowKey={record => record.id}
        expandedRowRender={record =>
          <div className={styles.boxbd}>
            <p>License使用详情：</p>
            {record && record.itemList && LicenseDetailList(record.itemList)}
          </div>
        }
      />
    )
  }
}

function LicenseDetailList(data) {

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
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={record => record.vendorCode}
        expandedRowRender={record => toolRender(record.itemSubList)}
      />
    </div>
  )
}

export default LicenseList
