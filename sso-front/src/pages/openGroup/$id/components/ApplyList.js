import React, { PureComponent } from 'react'
import { List, Avatar, Skeleton, Card, Button, Empty } from 'antd'
import styles from './ApplyList.less'
import { defaultHeadImg } from 'utils/config'

const { Meta } = Card;

class ApplyList extends PureComponent {

  handleAudit = (id, e) => {
    const { onAudit } = this.props
    const values = {
      applyId: id,
      status: 1   // 通过
    }
    onAudit(values)
  }

  handleShowAuditMdl = (id, e) => {
    const { showAuditMdl } = this.props
    showAuditMdl(id)
  }

  onShowUserInfo = (id, e) => {
    const { showUserInfo } = this.props;
    showUserInfo(id);
  }

  render() {
    const { loading, dataSource, showAuditMdl, ...listProps } = this.props

    return (
      <div>
        {dataSource && dataSource.length > 0 ?
          <List
            dataSource={dataSource}
            {...listProps}
            grid={{ gutter: 16, column: 2 }}
            renderItem={item => (
              <List.Item
                className={styles.listCard}
              >
                <Card>
                  <Skeleton loading={loading} avatar active>
                    <Card.Grid style={{ width: 'calc(100% - 152px)' }}>
                      <Meta
                        avatar={
                          <div className={styles.avatarDiv} onClick={e => this.onShowUserInfo(item.userId, e)}>
                            <Avatar src={item.headUrl ? item.headUrl : defaultHeadImg} />
                          </div>
                        }
                        title={<a href='#' style={{ color: '#000' }} onClick={e => this.onShowUserInfo(item.userId, e)}>{item.userName}</a>}
                        description={
                          <span className={styles.content}>
                            <div className={styles.desp} title={item.description}>验证信息：{item.description}</div>
                            <span>申请时间：<span>{item.applyAt}</span></span>
                          </span>
                        }
                      />
                    </Card.Grid>
                    <Card.Grid style={{ width: '152px', textAlign: 'right' }}>
                      <Button type="primary" size="small" onClick={e => this.handleAudit(item.id, e)}>
                        通过
                      </Button>
                      <Button size="small" type="danger" style={{ marginLeft: 12 }} onClick={e => this.handleShowAuditMdl(item.id, e)}>
                        不通过
                      </Button>
                    </Card.Grid>
                  </Skeleton>
                </Card>
              </List.Item>
            )}
          />
          :
          <Empty description="当前暂无加入群组申请" />
        }
      </div>
    )
  }
}

export default ApplyList
