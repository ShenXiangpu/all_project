import React, { PureComponent } from 'react'
import { Row, Col, Divider, Radio, Form, Checkbox, Select, Empty } from 'antd';
import Credential from './Credential'
import Instance from './Instance'
import MultiUsers from './MultiUsers';
import styles from '../BasicConfig/index.less'
import sysStyles from './index.less'
import { isEmpty, isEqual } from 'lodash';
import GroupUserList from './GroupUserList';

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}

class SystemConfig extends PureComponent {
  state = {
    credentialVisible: false,
    isGroupUser: false,     // 设置多用户时，是否选择群组用户成员
  }

  componentDidMount() {
    const { item } = this.props;
    if (item && isEqual(item.randomRootPwd, false)) {
      this.setState({
        credentialVisible: true
      })
    }

    if (item && isEqual(item.multiUser, 'groupUser')) {
      this.setState({
        isGroupUser: true
      })
    }
  }

  onChange = e => {
    const rdValue = e.target.value;
    this.setState({
      credentialVisible: isEqual(rdValue, 'credential')
    })
  }

  get multiUserProps() {
    const { form, userList, userPyList, item, user2py } = this.props;
    return {
      form,
      userList,
      userPyList,
      userCounts: item && isEqual(item.multiUser, 'customUser') ? item.userCounts : [],
      user2py: value => {
        user2py(value)
      }
    }
  }

  onGroupChange = e => {
    const rdValue = e.target.value;
    this.setState({
      isGroupUser: isEqual(rdValue, 'groupUser')
    })
  }

  handleSelectChange = value => {
    const { isEnterpriseAdmin, onGetGroupUserList, } = this.props;
    if (!isEnterpriseAdmin && value) {
      onGetGroupUserList(value);
    }
  }

  render() {
    const { form, onCheckVmName, item, currentUserPy, onCheckHostName, isEnterpriseAdmin, deptList, groupList, userList, userListProps } = this.props;
    const { credentialVisible, isGroupUser } = this.state;
    const { getFieldDecorator } = form;

    const options = isEnterpriseAdmin ?
      deptList && deptList.map(item => {
        return <Option key={item.id} value={item.id}>{item.deptName}</Option>
      }) :
      groupList && groupList.map(item => {
        const emptyTip = item.vmExist ? (isEnterpriseAdmin ? `部门（${item.groupName}）内已存在服务器，可进入部门内再次创建` : `群组（${item.groupName}）内已存在服务器，可进入群组内再次创建`) : null;
        return <Option key={item.id} value={item.id} disabled={item.vmExist} title={emptyTip}>{item.groupName}</Option>
      })

    const list = isEnterpriseAdmin ? deptList : groupList;
    const tip = list && list.length > 0 ? (isEnterpriseAdmin ? "请选择部门" : "请选择群组") :
      (isEnterpriseAdmin ? <span>部门数据为空，请先<a href="/department">创建部门</a>，并添加用户</span> : <span>群组数据为空，请先<a href="/openGroup">创建群组</a>，并添加用户</span>);

    return (
      <div>
        <div id="area" className={sysStyles.main}>
          {/* <Row style={{ marginBottom: '24px' }}>
            <Col span={2}><span>登录凭证</span></Col>
            <Col span={22}>
              <Form.Item
                className={sysStyles.noBtom}
              >
                {getFieldDecorator('randomRootPwd', {
                  initialValue: item && isEqual(item.randomRootPwd, false) ? "credential" : "autoCredential"
                })(
                  <Radio.Group
                    size="small"
                    // defaultValue={item && isEqual(item.randomRootPwd, false) ? "credential" : "autoCredential"}
                    className={styles.rd}
                    onChange={this.onChange}
                  >
                    <Radio.Button value="credential">设置密码</Radio.Button>
                    <Radio.Button value="autoCredential">自动生成密码</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>

              {!credentialVisible && <p className={sysStyles.tip}>注：创建后，自动生成的密码将通过站内信发送给您，也可登录IC设计云控制台重置密码。</p>}
            </Col>
          </Row> */}
          {/* {credentialVisible && <Credential form={form} rootPwd={item.rootPwd} />} */}
          {/* <Divider /> */}
          <Instance
            form={form}
            onCheckVmName={onCheckVmName}
            item={item}
            currentUserPy={currentUserPy}
            onCheckHostName={onCheckHostName}
          />
          {/* <Divider />
          <Row>
            <Col span={2}>
              <span className={sysStyles.spanTitle}>VPN</span>
            </Col>
            <Col span={22}>
              <Form.Item
                className={sysStyles.noBtom}
              >
                {getFieldDecorator('sendMail', {
                  valuePropName: 'checked',
                  initialValue: isEqual(item.sendMail, false) ? false : true
                })(
                  <Checkbox>是否需要发送创建VPN的邮件</Checkbox>
                )}
              </Form.Item>
            </Col>
          </Row> */}
        </div>
        <div id="group" className={sysStyles.main} style={{ marginTop: 0, marginBottom: '50px' }}>
          <Row>
            <Col span={2}><span>多用户</span></Col>
            <Col span={22}>
              <Form.Item
                className={sysStyles.noBtom}
              >
                {getFieldDecorator('multiUser', {
                  initialValue: item.multiUser || 'customUser'
                })(
                  <Radio.Group
                    size="small"
                    className={styles.rd}
                    onChange={this.onGroupChange}
                  // style={{ width: 300 }}
                  >
                    <Radio.Button value="customUser">自定义用户</Radio.Button>
                    <Radio.Button value="groupUser">{isEnterpriseAdmin ? '部门用户' : '群组用户'}</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>

              {
                isGroupUser && isEnterpriseAdmin && <p className={sysStyles.tip}>注：分配给指定部门。</p>
              }
              {
                isGroupUser && !isEnterpriseAdmin &&
                <p className={sysStyles.tip}>注：默认给您选择的群组内所有用户创建账号。对于已存在服务器的群组，请群组内创建。</p>
              }

            </Col>
          </Row>
          {isGroupUser ?
            <>
              <Row>
                <Col span={2}></Col>
                <Col span={6}>
                  <Form.Item
                    className={sysStyles.noBtom}
                  >
                    {getFieldDecorator('groupId', {
                      initialValue: item.groupId,
                      rules: [
                        {
                          required: true,
                          message: tip,
                        },
                      ]
                    })(
                      <Select
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        getPopupContainer={() => document.getElementById('group')}
                        style={{ width: "100%" }}
                        onChange={this.handleSelectChange}
                        placeholder={isEnterpriseAdmin ? "请选择部门" : "请选择群组"}
                        notFoundContent={tip}
                      >
                        {options}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={14}>
                  {
                    isGroupUser &&
                    <Form.Item
                      className={sysStyles.noBtom}
                    >
                      {getFieldDecorator('createdSharedDisk', {
                        initialValue: item.createdSharedDisk && isEqual(item.createdSharedDisk, true) ? [true] : [false],
                      })(
                        <Checkbox.Group>
                          <Checkbox value={true} style={{ marginLeft: 10 }}>是否为该{isEnterpriseAdmin ? "部门" : "群组"}申请创建共享存储空间（目录：/home/shared）</Checkbox>
                        </Checkbox.Group>
                      )}
                    </Form.Item>
                  }
                </Col>
              </Row>
              {/* {!isEnterpriseAdmin && userList && userList.length > 0 &&
                <Row>
                  <Col span={2}></Col>
                  <Col span={22}>
                    <GroupUserList data={userList} {...userListProps} />
                  </Col>
                </Row>
              } */}
            </>
            :
            <Row>
              <Col span={2}></Col>
              <Col span={22}>
                <MultiUsers {...this.multiUserProps} />
              </Col>
            </Row>
          }
        </div>
      </div >
    )
  }
}
export default SystemConfig
