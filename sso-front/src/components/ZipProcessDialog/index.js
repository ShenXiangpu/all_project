import React, { PureComponent } from 'react'
import { Icon, Tooltip, Progress, Button } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import { isEqual } from 'lodash';

const ProcessColor = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

class ZipProcessDialog extends PureComponent {
  state = {
    isShowDialog: false
  }

  onShowClick = e => {
    e.preventDefault();
    const { isShowDialog } = this.state;
    this.setState({
      isShowDialog: !isShowDialog
    })
  }

  convertNum = value => {
    value = value.replace("%", "");
    return Number(value);
  }


  render() {
    const { isShowDialog } = this.state;
    const { list } = this.props;

    return (
      <div className={styles.widget}>
        <div className={styles.resetStyle}>
          <div className={isShowDialog ? styles.surveyContainer : classNames(styles.surveyContainer, styles.minimized)} style={{ backgroundColor: '#067951' }}>
            <button
              className={classNames(styles.openStateToggle, styles.bgColor)}
              onClick={this.onShowClick}
            >
              压缩/解压缩文件 <Icon type={isShowDialog ? "down" : "up"} />
            </button>
            <ul className={styles.panel}>
              {
                list && list.length > 0 ? list.map(item => (
                  <li key={`${item.filePath}-${item.fileName}-${item.progress}-${item.status}`}>
                    <span className={styles.name} title={item.fileName}>{item.fileName}</span>
                    <span className={styles.name} title={item.filePath}>{item.filePath}</span>
                    {item.status && item.status === 'true' ?
                      <span className={styles.type}>完成</span>
                      :
                      <>
                        <span className={styles.type}>{item.status}</span>
                        <div style={{ width: '250px' }}>
                          <Progress percent={this.convertNum(item.progress)} strokeColor={ProcessColor} size="small" />
                        </div>
                      </>
                    }
                  </li>
                ))
                  :
                  <li>当前没有正在压缩/解压缩的文件</li>
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ZipProcessDialog
