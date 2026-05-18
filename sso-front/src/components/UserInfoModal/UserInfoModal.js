import React, { PureComponent } from 'react';
import { Modal, Avatar, Skeleton } from 'antd';
import styles from './userInfoModal.less'

class UserInfoModal extends PureComponent {

  render() {
    const { userInfo, loading, ...infoProps } = this.props;

    return (
      <Modal
        {...infoProps}
      >
        <Skeleton loading={loading}>
          {userInfo &&
            <div className={styles.userInfoMain}>
              <div className={styles.centerInfo}>
                <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size={64}>
                  {userInfo.userName && userInfo.userName.substring(0, 1)}
                </Avatar>
                <p>{userInfo.userName}</p>
                <p>{userInfo.email}</p>
                <p>{userInfo.phone}</p>
              </div>
              {/* <div className={styles.content}>
                                <p><span>姓名</span>{userInfo.userName}</p>
                                <p><span>部门</span>{userInfo.group && userInfo.group.groupName}</p>
                            </div> */}
            </div>
          }
        </Skeleton>
      </Modal>
    );
  }
}

export default UserInfoModal
