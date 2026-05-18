import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Input, Modal, Card, Icon, Avatar, Skeleton, Form } from 'antd'
import GroupSvg from 'assets/openGroup/group.svg'
import styles from './ApplyModal.less'
import { isEmpty } from 'lodash'

const { Search } = Input;
const { Meta } = Card;

const FormItem = Form.Item

@Form.create()
class ApplyModal extends PureComponent {

  handleGetGroupInfo = value => {
    if (!isEmpty(value)) {
      const { onGetGroupInfo } = this.props;
      onGetGroupInfo(value);
    }
  }

  onShowUserInfo = (id, e) => {
    const { showUserInfo } = this.props;
    showUserInfo(id);
  }

  render() {
    const { form, groupInfo, loading, showApplyInfoMdl, ...modalProps } = this.props
    const { getFieldDecorator } = form;

    return (
      <Modal {...modalProps} className={styles.modal}>
        <FormItem>
          {getFieldDecorator('num', {
            getValueFromEvent: (event) => {
              return event.target.value.replace(/\D/g, '');   // 只能输入数字
            },
          })(
            <Search
              style={{ width: '400px' }}
              placeholder="请输入群组编号进行查找"
              enterButton="查找"
              onSearch={value => this.handleGetGroupInfo(value)}
              allowClear={true}
            />
          )}
        </FormItem>

        <Alert type="success" message="群组编号是群组的唯一标识，请向群组管理员或者已经在群组中的成员索要群组编号" style={{ marginTop: 16 }} />

        {groupInfo && groupInfo.id &&
          <Card
            style={{ width: 752, marginTop: 16 }}
          >
            <Skeleton loading={loading} avatar active>
              <Card.Grid style={{ width: 'calc(100% - 140px)' }}>
                <Meta
                  avatar={
                    <Avatar icon={<Icon component={GroupSvg} />} />
                  }
                  title={groupInfo.groupName}
                  description={
                    <span>
                      <span>群主：<a href='#' onClick={e => this.onShowUserInfo(groupInfo.groupOwnerId, e)}>{groupInfo.groupOwnerName}</a></span>
                      <br />
                      {/* <span> 成员人数：{groupInfo.memberNum}</span>
                      <br /> */}
                      <span>群组介绍：{groupInfo.groupDescription}</span>
                    </span>
                  }
                />
              </Card.Grid>
              <Card.Grid style={{ width: '140px', textAlign: 'right' }}>
                <Button type="primary" size="small" className={styles.btn} onClick={showApplyInfoMdl}>
                  <Icon type='plus' />加入群组
                </Button>
              </Card.Grid>
            </Skeleton>
          </Card>
        }
      </Modal>
    )
  }
}

export default ApplyModal
