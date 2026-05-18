import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { isEqual, isEmpty } from 'lodash-es';
import styles from './style.less';

class List extends PureComponent {

  renderTools = (tools, isJson) => {
    let toolInfo;
    if (isJson) {
      toolInfo = tools;
    } else {
      toolInfo = tools && JSON.parse(tools);
    }

    return toolInfo && toolInfo.map((item, index) => {
      const edaTools = item.edaTools;

      const tools = edaTools.map(ele => {
        return (
          <div key={ele.type}>
            <p className={styles.name}>{ele.type}：</p>
            {ele.tool_infos.map(t => (
              <p className={styles.toolValue} key={t.tool_name}>{t.tool_name}[{t.tool_version}]</p>
            ))}
          </div>
        )
      })

      return (
        <div key={item.company} className={styles.toolDiv}>
          <div className={styles.toolTitle}>
            <span>
              {/* {factoryImg(item.company)} */}
              <b>{index + 1}. {item.company}</b>
            </span>
          </div>

          {tools}
        </div>
      )
    })
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
        title: '规格',
        dataIndex: 'vm',
        key: 'vm',
        render: (text, record) => {
          const vmInfos = record && record.virtualMachines;
          const vmDetail = vmInfos && vmInfos.length > 0 && vmInfos[0];

          const vmIds = [];
          const vmNames = [];
          const hostNames = [];
          vmInfos && vmInfos.map(item => {
            vmIds.push(item.vmId);
            vmNames.push(item.vmName);
            hostNames.push(item.hostname);
          })

          return (
            <div>
              <p className={styles.line}>
                <span className={styles.title}>实例ID：</span>
                <span>{vmIds && vmIds.toString()}</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>实例名称：</span>
                <span>{vmNames && vmNames.toString()}</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>主机名：</span>
                <span>{hostNames && hostNames.toString()}</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>CPU：</span>
                <span>{vmDetail && vmDetail.cpu} 核</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>内存：</span>
                <span>{vmDetail && (vmDetail.memory / 1024)} G</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>数据盘：</span>
                <span>{vmDetail && (vmDetail.disk / 1024)} G</span>
              </p>
              <p className={styles.line}>
                <span className={styles.title}>带宽：</span>
                <span>按带宽计费（带宽{record && record.networkFlavorName}）</span>
              </p>
            </div>
          )
        }
      },
      {
        title: '购买时长',
        dataIndex: 'buyDuration',
        key: 'buyDuration',
        render: (text, record) => <span>{text} {record.buyUnit}</span>
      },
      {
        title: '订单金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text, record) => <span style={{ color: '#ff7643' }}>{text} {record.priceUnit}</span>
      }
    ]

    return (
      <Table
        {...tableProps}
        pagination={false}
        size="small"
        columns={columns}
        rowKey={record => record.id}
        expandedRowRender={record => {
          const vmInfos = record && record.virtualMachines;
          const vmDetail = vmInfos && vmInfos.length > 0 && vmInfos[0];

          return (
            <div>
              <p style={{ marginBottom: 0 }}>EDA工具配置：</p>
              {vmDetail && this.renderTools(vmDetail.tools)}
            </div>
          )
        }
        }
      />
    )
  }
}

export default List
