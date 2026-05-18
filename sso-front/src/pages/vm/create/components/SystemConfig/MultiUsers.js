import { Row, Select, Input, Tooltip, Icon, Col, Form, Radio, Checkbox, Divider, Button } from 'antd'
import { isEqual } from 'lodash';
import React, { PureComponent } from 'react'
import styles from "./MultiUsers.less";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}

let id = 1;
class MultiUsers extends PureComponent {
  state = {
    dataList: [0],           // 更多用户列表，必须至少关联一个，数组长度
    userArr: [],            // 添加的用户列表
    userPyData: [],         // 存放所有用户的vm用户名，避免重名
  }

  componentDidMount() {
    this.setUserValues();
  }

  setUserValues = () => {
    const { userCounts } = this.props;
    if (userCounts && userCounts.length > 0) {
      id = userCounts.length;
      const arr = userCounts.map((item, index) => index);
      this.setState({
        dataList: arr,
      })
      this.forceUpdate();
    }
  }

  componentDidUpdate(preProps) {
    const { userPyList } = this.props;
    const { userPyList: old_userPyList } = preProps;
    if (userPyList && !isEqual(userPyList, old_userPyList)) {
      // TODO set userPyData
    }
  }

  addUser = () => {
    const { dataList } = this.state;
    dataList.push(id++);
    this.setState({
      dataList
    });
    this.forceUpdate();
  }

  remove = key => {
    const { dataList, userNum } = this.state;
    var index = dataList.indexOf(key);
    if (isEqual(index, 0)) {
      dataList.shift();
    } else if (isEqual(index, dataList.length - 1)) {
      dataList.pop();
    } else {
      dataList.splice(index, 1);
    }

    this.setState({
      dataList
    });
    this.forceUpdate();
  }

  onRadioChange = (e, index) => {
    const rdValue = e.target.value;

    this.setState({
      [`credentialVisible_${index}`]: isEqual(rdValue, 'credential')
    })
  }

  handleCheckName = (rule, value, callback) => {
    const { dataList } = this.state;
    const { form: { getFieldValue } } = this.props;

    if (value) {
      const pattern = /^[a-zA-Z\d]+$/
      if (!pattern.test(value)) { // 正则校验
        callback();
      } else { // 唯一值判断
        const arr = [];
        dataList.forEach(item => {
          const fieldValue = getFieldValue(`usernames[${item}]`);
          if (fieldValue) {
            arr.push(fieldValue);
          }
        })

        const filterArr = arr.filter(item => isEqual(item, value));
        if (filterArr && filterArr.length > 1) {
          callback('用户名已存在，请重新输入');
        }
      }
    } else { // 非空校验
      callback();
    }
  }

  getMoreUser = () => {
    const { dataList } = this.state;
    const { form, userPyList, userCounts, formLayout } = this.props;
    const { getFieldDecorator } = form;

    const layout = formLayout || formItemLayout;

    const nameTips = "Linux用户名只能有数字、字母、_和.四种字符组成，且不能是纯数字,长度为1-32。";
    const pwdTips = "密码需8-30位，至少包括三项（英文、数字和特殊字符，包括：[()`~!@#%^&*-+=_|{}[]:;' <>,.?/]）";

    const userItems = dataList && dataList.map((item, index) => {
      const randomPwdCfg = userCounts && userCounts.length > item && isEqual(userCounts[item].randomPwd, false);
      return (
        <Row key={item} className={styles.row}>
          <Col span={22} className={styles.col}>
            <Row style={{ width: '100%' }}>
              <Col span={24}>
                <Form.Item
                  className={styles.noBtom}
                  label="用户名"
                  required={false}
                  extra={nameTips}
                  {...layout}
                >
                  {getFieldDecorator(`usernames[${item}]`, {
                    initialValue: (userCounts && userCounts.length > item && userCounts[item].username) || '',
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入登录用户名，或删除该行（至少绑定一个）'
                      },
                      {
                        pattern: /^(?=[\S]{1,32}$)(?!\d+$)[\dA-Za-z_\.]+$/,
                        message: '请按规则重新设置用户名'
                      },
                      // {
                      //   validator: this.handleCheckName
                      // }
                    ],
                  })(
                    <Input style={{ width: 400 }} />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ width: '100%' }}>
              <Col span={24}>
                <Form.Item
                  className={styles.noBtom}
                  label="登录凭证"
                  {...layout}
                >
                  {getFieldDecorator(`randomPwds[${item}]`, {
                    initialValue: randomPwdCfg ? 'credential' : 'autoCredential',
                  })(
                    <Radio.Group
                      size="small"
                      className={styles.rd}
                      onChange={e => this.onRadioChange(e, item)}
                    >
                      <Radio.Button value="credential">设置密码</Radio.Button>
                      <Radio.Button value="autoCredential">自动生成密码</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ width: '100%' }}>
              <Col span={24}>
                {(this.state[`credentialVisible_${item}`] || randomPwdCfg)
                  &&
                  <Form.Item
                    className={styles.noBtom}
                    label="密码"
                    required={false}
                    extra={pwdTips}
                    {...layout}
                  >
                    {getFieldDecorator(`passwords[${item}]`, {
                      initialValue: (userCounts && userCounts.length > item && userCounts[item].password) || '',
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                        {
                          required: true,
                          message: '请输入用户登录密码'
                        },
                        {
                          pattern: /^(?!.*\$)(?!.*\s)(?!.*\\)(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                          message: '请按规则重新设置密码'
                        },
                      ],
                    })(
                      <Input.Password style={{ width: 400 }} autoComplete='new-password' />
                    )}
                  </Form.Item>
                }
              </Col>
            </Row>

          </Col>
          <Col span={2}>
            {dataList && dataList.length > 1 &&
              <a
                className={styles.close}
                onClick={() => this.remove(item)}
              >
                <Icon type="close" />
              </a>
            }
          </Col>
        </Row>
      )
    });

    return userItems;
  }

  // handleSelectChange = value => {
  //   const userArr = value && value.map(item => {
  //     const arr = item.split('_');
  //     return {
  //       id: arr[0],
  //       userName: arr[1]
  //     }
  //   })
  //   this.setState({
  //     userArr
  //   })
  // }

  onAddUser = e => {
    const { user2py } = this.props;
    const { userArr } = this.state;
    user2py(userArr);

    id = userArr.length;
    const arr = userArr.map(item => item.id);
    this.setState({
      dataList: arr,
    })
    this.forceUpdate();
  }

  render() {
    const { userList, form } = this.props;
    const { dataList } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div id='user'>
        <Form layout="inline">
          {/* <div style={{ height: '42px' }}>
            <Form.Item
              className={styles.noBtom}
              label="选择用户"
            >
              {getFieldDecorator('owner', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  style={{
                    minWidth: 300,
                  }}
                  placeholder="选择用户为其创建VM用户名"
                  onChange={this.handleSelectChange}
                >
                  {userList && userList.map(item => (
                    <Option key={item.id} value={`${item.id}_${item.userName}`}>
                      {item.userName}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <a className={styles.addLink} onClick={this.onAddUser}>
              一键添加
            </a>
          </div>
          <Divider style={{ margin: '12px 0' }} /> */}

          {this.getMoreUser()}

          <p style={{ marginBottom: 0 }}>
            {dataList.length < 50 &&
              <a
                onClick={() => this.addUser()}
              >
                <Icon type="plus" style={{ marginRight: '5px', fontSize: '14px' }} />添加用户
              </a>
            }
            <span className={styles.sp}>已创建<label>{dataList.length}</label>个用户</span>
            <span className={styles.tips}>（最多创建50个用户，至少创建一个用户）</span>
          </p>
        </Form>
      </div>
    )
  }
}
export default MultiUsers
