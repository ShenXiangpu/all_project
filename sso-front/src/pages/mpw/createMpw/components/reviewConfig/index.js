import React, { PureComponent } from 'react'
import { Icon, Button } from 'antd';
import styles from './index.less'
import { router } from 'umi'
import { isEqual } from 'lodash';


class ReviewConfig extends PureComponent {


  returnList = () => {
    const pathname = '/mpw'
    router.push({
      pathname
    })
  }
  //通过id查看详情
  watchDetailById = () => {
    const {  onWatchDetailById } = this.props
    onWatchDetailById()
  }

  render() {
    const { id, status,op, projectId } = this.props
    return (
      <>
        {
          status && isEqual(status, '1') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>提交成功</div>
            <div className={styles.bottomTips}>我们会在您提及申请的7个工作日内完成需求评审，请耐心等待~</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.returnList}>返回列表</Button></div>
          </div>
        }

        {
          status && isEqual(status, '0') && < div className={styles.main}>
            <div className={styles.topIcon}><Icon type="info-circle" theme="filled" style={{ fontSize: '60px', color: '#ffa500' }} /></div>
            <div className={styles.sectionTitle}>评审未通过，请查看详情，修改后，重新提交！</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.returnList}>返回列表</Button></div>
          </div>
        }
        {
          status && isEqual(status, '2') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>评审通过</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.returnList}>返回列表</Button></div>
          </div>
        }
        {
          status && isEqual(status, '4') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>已生成项目</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.returnList}>返回列表</Button></div>
          </div>
        }
        {
          status && isEqual(status, '5') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>验证中</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.watchDetailById}>返回列表</Button></div>
          </div>
        }
        {
          status && isEqual(status, '6') &&
          <div className={styles.main}>
            <div className={styles.topIcon}><Icon type="check-circle" theme="filled" style={{ fontSize: '60px', color: 'rgb(82,192,26)' }} /></div>
            <div className={styles.sectionTitle}>验证结束</div>
            <div className={styles.reBtn}><Button onClick={this.watchDetailById}>查看详情</Button> &nbsp; <Button onClick={this.watchDetailById}>返回列表</Button></div>
          </div>
        }
      </>

    )
  }
}

export default ReviewConfig;
