import { Row, Select, Input,message, Tooltip, Icon, Col, Form, Radio, Checkbox, Divider, Button } from 'antd'
import { isEmpty, isEqual } from 'lodash';
import React, { PureComponent } from 'react'
import styles from "./UpdateMultiUsers.less";

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
    userPyData: [],         // 存放所有用户的vm用户名，避免重名
    users: [],
    userArr: [],            // 从群组添加的用户
    btnDisabled: false,     // “一键添加”按钮状态
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
        users: userCounts
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

  remove = (key, value) => {
    const { dataList, users } = this.state;
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

    // 群组内用户删除
    if (value) {
      let userIndex = undefined;
      users.map((item, index) => {
        if (isEqual(item.userId, value) || isEqual(item.username, value)) {
          userIndex = index;
        }
      })
      users.splice(userIndex, 1, {}); // 确保根据dataList的索引可以定位到指定数据，不能直接删除
    }
    this.setState({ users })

    this.forceUpdate();
  }

  onRadioChange = (e, index) => {
    const { users } = this.state;
    const rdValue = e.target.value;

    if (users && users.length > index) {
      users[index].randomPwd = isEqual(rdValue, 'autoCredential');
    }

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
          callback('VM用户名已存在，请重新输入');
        }
      }
    } else { // 非空校验
      callback();
    }
  }

  getMoreUser = () => {
    const { dataList, users } = this.state;
    const { form, formLayout, userList } = this.props;
    const { getFieldDecorator } = form;

    const layout = formLayout || formItemLayout;

    const nameTips = "Linux用户名只能有数字、字母、_和.四种字符组成，且不能是纯数字,长度为1-32。";
    const pwdTips = "密码需8-30位，至少包括三项（英文、数字和特殊字符，包括：[()`~!@#%^&*-+=_|{}[]:;' <>,.?/]）";

    const userItems = dataList && dataList.map((item, index) => {
      const randomPwdCfg = users && users.length > item && isEqual(users[item].randomPwd, false);
      return (
        <Row key={item} className={styles.row}>
          <Col span={22} className={styles.col}>
            <Row style={{ width: '100%' }}>
              <Col span={24}>
                {users && users.length > item && users[item].usernameZh
                  ?
                  <>
                    <Form.Item
                      style={{ display: 'none' }}
                      label="用户ID"
                      required={false}
                      {...layout}
                    >
                      {getFieldDecorator(`userIds[${item}]`, {
                        initialValue: users[item].userId,
                      })(
                        <Input style={{ width: 400 }} disabled={true} />
                      )}
                    </Form.Item>
                    <Form.Item
                      className={styles.noBtom}
                      label="用户名"
                      required={false}
                      {...layout}
                    >
                      {getFieldDecorator(`usernameZhs[${item}]`, {
                        initialValue: users[item].usernameZh,
                      })(
                        <Input style={{ width: 400 }} disabled={true} />
                      )}
                    </Form.Item>
                  </>
                  :
                  <Form.Item
                    className={styles.noBtom}
                    label="VM账号"
                    required={false}
                    extra={nameTips}
                    {...layout}
                  >
                    {getFieldDecorator(`usernames[${item}]`, {
                      initialValue: users && users.length > item ? users[item].username : '',
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入VM登录用户名，或删除该行（至少绑定一个）'
                        },
                        {
                          pattern: /^(?=[\S]{1,32}$)(?!\d+$)[\dA-Za-z_\.]+$/,
                          message: '请按规则重新设置VM用户名'
                        },
                        // {
                        //   validator: this.handleCheckName
                        // }
                      ],
                    })(
                      <Input style={{ width: 400 }} />
                    )}
                  </Form.Item>
                }
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
                    initialValue: isEqual(randomPwdCfg, true) ? 'credential' : 'autoCredential',
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
                      initialValue: (users && users.length > item && users[item].password) || '',
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
                      <Input.Password autoComplete='new-password' style={{ width: 400 }} />
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
                onClick={() => this.remove(item, users && users.length > item ? users[item].userId || users[item].username : undefined)}
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


  getMoreGroupUser = () => {
    const { dataList, users } = this.state;
    const { form, formLayout, userList } = this.props;
    const { getFieldDecorator } = form;

    const layout = formLayout || formItemLayout;

    const nameTips = "Linux用户名只能有数字、字母、_和.四种字符组成，且不能是纯数字,长度为1-32。";
    const pwdTips = "密码需8-30位，至少包括三项（英文、数字和特殊字符，包括：[()`~!@#%^&*-+=_|{}[]:;' <>,.?/]）";

    const userItems = dataList && dataList.map((item, index) => {
      const randomPwdCfg = users && users.length > item && isEqual(users[item].randomPwd, false);
      return (
        <Row key={item} className={styles.row}>
          <Col span={22} className={styles.col}>
            <Row style={{ width: '100%' }}>
              <Col span={24}>
                {users && users.length > item && users[item].usernameZh
                  ?
                  <>
                    <Form.Item
                      style={{ display: 'none' }}
                      label="用户ID"
                      required={false}
                      {...layout}
                    >
                      {getFieldDecorator(`userIds[${item}]`, {
                        initialValue: users[item].userId,
                      })(
                        <Input style={{ width: 400 }} disabled={true} />
                      )}
                    </Form.Item>
                    <Form.Item
                      className={styles.noBtom}
                      label="用户名"
                      required={false}
                      {...layout}
                    >
                      {getFieldDecorator(`usernameZhs[${item}]`, {
                        initialValue: users[item].username,
                      })(
                        <Input style={{ width: 400 }} disabled={true} />
                      )}
                    </Form.Item>
                  </>
                  :
                  <Form.Item
                    className={styles.noBtom}
                    label="VM账号"
                    required={false}
                    extra={nameTips}
                    {...layout}
                  >
                    {getFieldDecorator(`usernames[${item}]`, {
                      initialValue: users && users.length > item ? users[item].username : '',
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入VM登录用户名，或删除该行（至少绑定一个）'
                        },
                        {
                          pattern: /^(?=[\S]{1,32}$)(?!\d+$)[\dA-Za-z_\.]+$/,
                          message: '请按规则重新设置VM用户名'
                        },
                        // {
                        //   validator: this.handleCheckName
                        // }
                      ],
                    })(
                      <Input style={{ width: 400 }} />
                    )}
                  </Form.Item>
                }
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
                    initialValue: isEqual(randomPwdCfg, true) ? 'credential' : 'autoCredential',
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
                      initialValue: (users && users.length > item && users[item].password) || '',
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
                      <Input.Password autoComplete='new-password' style={{ width: 400 }} />
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
                onClick={() => this.remove(item, users && users.length > item ? users[item].userId || users[item].username : undefined)}
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

  handleSelectChange = value => {
    const { userList, userCounts, form,dispatch } = this.props;
    const { users, dataList } = this.state;
    const { setFields } = form;

    // 添加用户数量限制(总共对多10个)
    let length1 = 0
    if (users && users.length === 0) {
      length1 = dataList.length - 1;
    } else {
      length1 = dataList.length;
    }
    const length2 = value.length;
    const length = length1 + length2;
    if (length > 10) {
      setFields({
        'users': {
          value,
          errors: [new Error('超出用户上限，最多为服务器创建10个用户')]
        }
      })
      this.setState({ btnDisabled: true })
    } else {
      setFields({
        'users': {
          value,
          errors: null
        }
      })
      this.setState({ btnDisabled: false })
    }

    // 添加用户到动态展示列表
    const arr = [];
    userList.map(item => {
      value.map(i => {
        if (isEqual(item.id, i)) {
          const data = {
            userId: item.id,
            usernameZh: item.userName,
            username:item.userName,
          }
          dispatch({
            type: 'vm/handleNameToChinese',
            payload: {
              chinese:item.userName
            }
          }).then(response => {
              data.username = response
              arr.push(data);
          })

        }
      })
    })
    this.setState({ userArr: arr })
  }

  onAddUser = e => {
    const { userCounts,handleName, form } = this.props;
    const { setFields } = form;
    const { userArr, users } = this.state;

    if (userArr && userArr.length > 0) {

      // 判断是否重复添加,
      const existUsers = [];
      users.map((i, index) => {
        userArr.map(j => {
          if (Number(i.userId) === Number(j.userId)) {
            existUsers.push(j);
          }
        })
      })

      if (existUsers && existUsers.length > 0) {
        const arr = [];
        existUsers.map(i => {
          arr.push(i.usernameZh);
        })

        setFields({
          'users': {
            // value: userArr,
            errors: [new Error(`用户（${arr.join('、')}）账号已存在，请勿重复添加`)]
          }
        })

        return;
      } else {
        setFields({
          'users': {
            value: []
          }
        })

        // 去除users中的空对象,防止添加的时候有空数据
        const notEmptyUsers = [];
        users.map(item => {
          if (item.userId) {
            notEmptyUsers.push(item)
          }
        })
        // userArr.map(j => {
        //   j.username = handleName(j.usernameZh)
        // })


        console.log(userArr);

        const newUsers = notEmptyUsers.concat(userArr);
        id = newUsers.length;
        const arr = newUsers.map((item, index) => index);
        newUsers.map((item, index) => index);
        this.setState({
          dataList: arr,
          users: newUsers
        })
        this.forceUpdate();
      }
    } else {
      setFields({
        'users': {
          errors: [new Error('请先选择群组内的用户')]
        }
      })
    }
  }

  render() {
    const { userList, form, isGroupVM, isCompanyUser } = this.props;
    const { dataList, users, btnDisabled } = this.state;
    const { getFieldDecorator } = form;

    const tip = isCompanyUser ?
      <span>该部门内尚未添加用户，请先<a href={'/user'}>添加用户</a></span>
      :
      <span>该群组内没有尚未关联服务器账号的用户，可再次<a href={`/openGroup/${isGroupVM}`}>添加用户</a></span>;

    return (
      <div id='user'>
        <Form layout="inline">
          {isGroupVM &&
            <Row className={styles.userCheck}>
              <Col span={14}>
                <Form.Item
                  className={styles.noBtom}
                  label="选择用户"
                  required={false}
                >
                  {getFieldDecorator('users')(
                    <Select
                      mode="multiple"
                      style={{
                        width: 400,
                      }}
                      placeholder="选择用户为其创建账号"
                      onChange={this.handleSelectChange}
                      notFoundContent={tip}
                      optionLabelProp="label"
                    >
                      {userList.map(item => (
                        <Option key={item.id} value={item.id} label={item.userName}>
                          {item.userName}（{item.phone || item.email}）
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Button
                  type='primary'
                  ghost
                  onClick={this.onAddUser}
                  disabled={btnDisabled}
                >
                  一键添加
                </Button>
              </Col>
            </Row>
          }

          {isGroupVM ?
            (
              users && users.length > 0 &&
              this.getMoreGroupUser()
            )
            :
            this.getMoreUser()
          }

          <p style={{ marginBottom: 0 }}>
            {dataList.length < 50 && isEmpty(isGroupVM) &&
              <a
                onClick={() => this.addUser()}
              >
                <Icon type="plus" style={{ marginRight: '5px', fontSize: '14px' }} />添加VM用户
              </a>
            }
            <span className={styles.sp}>已创建<label>{users && users.length > 0 ? dataList.length : 0}</label>个VM用户</span>
            <span className={styles.tips}>（最多创建50个用户，<span style={users && users.length > 0 ? {} : { color: '#f5222d' }}>至少创建一个用户</span>）</span>
          </p>
        </Form>
      </div>
    )
  }
}
export default MultiUsers
