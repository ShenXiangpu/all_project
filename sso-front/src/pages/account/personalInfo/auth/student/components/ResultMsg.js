import React from 'react';
import { Icon, Button } from 'antd';
import styles from './AuditMsg.less'
import isEqual from 'lodash.isequal';

class ResultMsg extends React.PureComponent {


  render() {

    const { auditStatus, auditResultMsg, setCurrentStep } = this.props;

    return (
      <>
        {/* 认证成功 */}
        {auditStatus && isEqual(auditStatus, 2) &&
          <div className={styles.content} >
            <div className={styles.icon} style={{ color: '#52c41a' }}>
              <Icon type="check-circle" theme="filled" />
            </div>
            <h1 style={{ color: '#52c41a' }}>认证成功</h1>
            <p>欢迎使用 高性能EDA云平台</p>
            <img style={{ height: 365 }} src={require('assets/result_success.png')} />
          </div>
        }

        {/* 认证失败 */}
        {auditStatus && isEqual(auditStatus, 3) &&
          <div className={styles.content} >
            <div className={styles.icon} style={{ color: '#faad14' }}>
              <Icon type="frown" theme="filled" />
            </div>
            <h1 style={{ color: '#faad14' }}>认证失败</h1>
            <p>原因：{auditResultMsg}</p>
            <Button type="primary" onClick={setCurrentStep}>返回修改</Button>
          </div>
        }
      </>
    )
  }
}

export default ResultMsg
