import React, { PureComponent } from 'react'
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import styles from './VmConfig.less';

class VmConfig extends PureComponent {
  state = {
    activeDiv: ''
  }

  componentDidMount() {
    const { templateList, setVmConfigValues } = this.props;
    if (templateList && templateList.length > 0) {
      const firstItem = templateList[0];
      // 默认选中的数据
      const defaultChecked = firstItem.cpu + '*' + firstItem.memory[0] + '*' + firstItem.hardDisk + '*' + firstItem.network;
      this.setState({ activeDiv: defaultChecked });
      setVmConfigValues(defaultChecked);
    }
  }

  componentDidUpdate(prvProps) {
    const { templateList, setVmConfigValues } = this.props;
    const { templateList: old_templateList } = prvProps;
    if (templateList && templateList.length > 0 && !isEqual(old_templateList, templateList)) {
      const firstItem = templateList[0];
      // 默认选中的数据
      const defaultChecked = firstItem.cpu + '*' + firstItem.memory[0] + '*' + firstItem.hardDisk + '*' + firstItem.network;
      this.setState({ activeDiv: defaultChecked });
      setVmConfigValues(defaultChecked);
    }
  }

  onCheckVm = (e, key) => {
    e.preventDefault();
    const { setVmConfigValues } = this.props;
    this.setState({ activeDiv: key })
    this.forceUpdate()
    setVmConfigValues(key);
  }

  render() {
    const { activeDiv } = this.state;
    const { templateList } = this.props;

    const liList = templateList && templateList.map(v =>
      v.memory.map(m => {
        return (
          <li className={styles.itemBox} key={`${v.cpu}*${m}*${v.hardDisk}*${v.network}`}>
            <div
              className={activeDiv === `${v.cpu}*${m}*${v.hardDisk}*${v.network}` ? classNames(styles.item, styles.actived) : styles.item}
              onClick={(e) => this.onCheckVm(e, `${v.cpu}*${m}*${v.hardDisk}*${v.network}`)}
            >
              <p className={styles.tipsItem}>
                <label>CPU:</label>
                <span><em>{v.cpu}</em>核</span>
              </p>
              <p className={styles.tipsItem}>
                <label>内存:</label>
                <span><em>{m}</em>GB</span>
              </p>
              <p className={styles.tipsItem}>
                <label>SSD:</label>
                <span><em>{v.hardDisk}</em>GB</span>
              </p>
              <p className={styles.tipsItem}>
                <label>网络:</label>
                <span><em>{v.network}</em>M</span>
              </p>
            </div>
          </li>
        )
      }
      )
    )

    return (
      <div>
        <ul className={styles.list}>
          {liList}
        </ul>
      </div >
    )
  }
}

export default VmConfig
