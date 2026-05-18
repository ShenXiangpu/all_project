import React, { PureComponent } from 'react'
import { Base64 } from 'js-base64';
import { Form, Modal, message } from 'antd'
import UpdateMultiUsers from './UpdateMultiUsers'
import { isEmpty, isEqual } from 'lodash';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

/**
 * 多用户管理
 */
@Form.create()
class UsersModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { vmInfo = {}, onOk, form, userList } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      const data = getFieldsValue();
      const usernames = data.usernames;
      const randomPwds = data.randomPwds;
      const passwords = data.passwords;
      const userIds = data.userIds;
      const usernameZhs = data.usernameZhs;

      const userCounts = [];
      if (vmInfo && vmInfo.groupId) {  // 如果是群组内用户
        if (isEmpty(userIds)) {
          message.error('请选择群组中用户为其创建服务器账号');
          return;
        }

        // 校验：判断用户唯一
        const arr = [];
        userIds && userIds.map((item, index) => {
          if (!isEmpty(item)) {
            arr.push(item);
          }
        })
        const setArr = Array.from(new Set(arr));
        if (arr.length > setArr.length) {
          message.error('用户账号已存在，请勿重复添加');
          return;
        }

        userIds && userIds.map((item, index) => {
          let userData = {}

          userData = {
            userId: item,
            usernameZh: usernameZhs[index] || '',
          }

          if (!isEmpty(randomPwds[index])) {
            if (isEqual(randomPwds[index], 'autoCredential')) {
              userData = {
                ...userData,
                randomPwd: true,
              }
            } else {
              userData = {
                ...userData,
                randomPwd: false,
                password: passwords[index],
              }
            }

            if (userList && userList.length > 0) {
              userList.map(user => {
                if (isEqual(Number(item), user.id)) {
                  userData = {
                    ...userData,
                    usernameZh: user.userName,
                    phone: user.phone,
                    email: user.email,
                  }
                }
              })
            }

            userCounts.push(userData);
          }
        })
      } else {
        // 校验：判断用户名唯一
        const arr = [];
        usernames && usernames.map((item, index) => {
          if (!isEmpty(item)) {
            arr.push(item);
          }
        })

        const setArr = Array.from(new Set(arr));
        if (arr.length > setArr.length) {
          message.error('多用户 VM用户名必须唯一，请重新设置');
          return;
        }

        usernames && usernames.map((item, index) => {
          if (!isEmpty(item)) {
            let userData = {}
            if (!isEmpty(randomPwds[index])) {
              if (isEqual(randomPwds[index], 'autoCredential')) {
                userData = {
                  username: item,
                  randomPwd: true,
                }
              } else {
                userData = {
                  username: item,
                  randomPwd: false,
                  password: passwords[index],
                }
              }

              userCounts.push(userData);
            }
          }
        })
      }

      const params = {
        userCounts,
        vmId: vmInfo.vmId,
      }
      onOk(params);
    })
  }

  get multiUserProps() {
    const { form, userList, userPyList, vmInfo, isCompanyUser,handleName,dispatch } = this.props;

    const userCountsToPwd = vmInfo && vmInfo.userCountsToPwd && Base64.decode(vmInfo.userCountsToPwd);
    const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);
    const arr = [];
    if (multiUsers && multiUsers.length > 0) {
      multiUsers.map(item => {
        let data = {};
        for (var key in item) {
          if (!isEqual(key, 'randomPwd') && !isEqual(key, 'userName') && !isEqual(key, 'userId')) {
            data = {
              username: key,
              password: item[key]
            }
          }
        }
        // data.randomPwd = item.randomPwd;
        data.randomPwd = false;

        //如果是群组内用户，则会包括userId、userName字段
        if (item.userId && item.userName) {
          data.userId = item.userId;
          data.usernameZh = item.userName;
        }

        arr.push(data);
      })
    }

    console.log('arr',arr);

    return {
      isCompanyUser,
      isGroupVM: vmInfo.groupId,
      form,
      formLayout: formItemLayout,
      userList,
      userPyList,
      userCounts: arr,
      handleName,
      dispatch
    }
  }

  render() {
    const { vmInfo = {}, isCompanyUser, groupList, onOk, form, ...modalProps } = this.props;
    let groupName = '-';
    if (vmInfo && vmInfo.groupId) {
      const arr = groupList.filter(item => item.id === Number(vmInfo.groupId));
      if (arr && arr.length > 0) {
        const item = arr[0];
        groupName = isCompanyUser ? item.deptName : item.groupName;
      }
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk} >
        <p>当前实例： {vmInfo && vmInfo.vmName}</p>
        <p>{vmInfo && isEqual(vmInfo.ifDept, 1) ? '所属部门：' : '所属群组：'} {groupName}</p>
        <UpdateMultiUsers {...this.multiUserProps} />
      </Modal>
    )
  }
}

export default UsersModal
