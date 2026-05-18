import React, { PureComponent } from 'react'
import { Icon, Button } from 'antd';
import styles from './index.less'
import { router } from 'utils'
import { isEqual } from 'lodash';
class FinishConfig extends PureComponent {


  //通过id查看详情
  watchDetailById = () => {
    const { id, onWatchDetailById } = this.props
    onWatchDetailById(id)
  }

  returnList = () => {
    const pathname = '/cusDemandManagement'
    router.push({
      pathname
    })
  }




  render() {
    const { id, status } = this.props
    return (
      <div>

        {
          status && isEqual(status, '7') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>项目已关闭</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>返回列表</Button></div>
          </div>
        }

        {
          status && isEqual(status, '3') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="stop" theme="filled" style={{ fontSize: '60px', color: '#ff5100' }} /></div>
            <div className={styles.sectionTitle}>评审不通过</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.returnList}>返回列表</Button></div>
          </div>
        }
      </div>
    )
  }
}

export default FinishConfig;
