import React, { PureComponent } from 'react';
import { Base64 } from 'js-base64';
import { Modal, Skeleton, Descriptions, Collapse, Alert } from 'antd';
import { isEqual } from 'lodash';
import styles from './Modal.less';

const { Panel } = Collapse;

// 快照恢复确认窗口
class ConfirmModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    onOk();
  }

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

  formatToDate = (str) => {
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    const hour = str.substring(8, 10);
    const min = str.substring(10, 12);
    const sed = str.substring(12, 14);
    const date = `${year}-${month}-${day} ${hour}:${min}:${sed}`;
    return date;
  }

  render() {
    const { detailLoading, snapshotDetail, ...modalProps } = this.props;

    const userCountsToPwd = snapshotDetail && snapshotDetail.userCountsToPwd && Base64.decode(snapshotDetail.userCountsToPwd);
    const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);

    const userArr = [];
    if (multiUsers && multiUsers.length > 0) {
      multiUsers.map(item => {
        let data = {};
        for (var key in item) {
          if (!isEqual(key, 'randomPwd')) {
            data = {
              username: key,
              password: item[key]
            }
          }
        }
        data.randomPwd = item.randomPwd;
        userArr.push(data);
      })
    }

    const snapshotArr = snapshotDetail && snapshotDetail.snapshotName && snapshotDetail.snapshotName.split('-');
    const time = snapshotArr && snapshotArr.length > 0 && snapshotArr.pop();
    const date = time && this.formatToDate(time);

    return (
      <Modal {...modalProps} onOk={this.handleOk} className={styles.cfmModal}>
        <Skeleton loading={detailLoading}>
          <h3>快照：{snapshotDetail && snapshotDetail.snapshotName}</h3>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="基本信息" key="1">
              <Descriptions title={null} size='small' bordered>
                <Descriptions.Item label="虚拟机IP">{snapshotDetail && snapshotDetail.ip}</Descriptions.Item>
                <Descriptions.Item label="主机名">{snapshotDetail && snapshotDetail.hostname}</Descriptions.Item>
                <Descriptions.Item label="CPU">{snapshotDetail && snapshotDetail.cpu}核</Descriptions.Item>
                <Descriptions.Item label="内存">{snapshotDetail && snapshotDetail.memory && snapshotDetail.memory / 1024}G</Descriptions.Item>
                <Descriptions.Item label="系统盘">{snapshotDetail && snapshotDetail.disk && snapshotDetail.disk / 1024}G</Descriptions.Item>
                <Descriptions.Item label="操作系统">{snapshotDetail && snapshotDetail.os}</Descriptions.Item>
                <Descriptions.Item label="多用户" span={3}>
                  {userArr && userArr.length > 0 && userArr.map((item, index) => {
                    return (
                      <div key={item.username}>
                        <p style={{ marginBottom: 0 }}>{index + 1}.
                          用户名: <span className={styles.name}>{item.username}</span>
                          密码: {item.password}
                        </p>
                      </div>
                    )
                  })}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
            <Panel header="EDA工具配置" key="2">
              {snapshotDetail && snapshotDetail.tools && this.renderTools(snapshotDetail.tools)}
            </Panel>
          </Collapse>
          <Alert style={{ marginTop: '20px' }} message={`系统盘的数据将回滚到 ${date} 此时刻之后的数据将被清除，请谨慎操作！`} type="warning" showIcon />
        </Skeleton>
      </Modal >
    )
  }
}
export default ConfirmModal
