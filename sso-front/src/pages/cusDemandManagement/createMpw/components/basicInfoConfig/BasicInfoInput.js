import React, { PureComponent } from 'react'

import { Form, Row, Col, Input, Cascader } from 'antd'
import styles from './BasicInfoInput.less'



class BasicInfoInput extends PureComponent {
  state = {

  }


  onChange = (value) => {
    console.log(value);
  }

  render() {

    const { form, mpw, ColProps, formItemLayout, leftReadOnly, } = this.props;
    const { getFieldDecorator } = form;
    const { demandObj } = mpw
    return (
      <div className={styles.basicContainer}>
        <Form >
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="单位全称" {...formItemLayout}>
                {getFieldDecorator('companyName', {
                  initialValue: demandObj.companyName || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入单位全称",
                    },
                    // {
                    //   pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                    //   // pattern: /^(?!\d*$)/,
                    //   message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    // },
                  ],
                })(
                  <Input placeholder="请输入单位全称" disabled={leftReadOnly} />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="单位简称" {...formItemLayout}>
                {getFieldDecorator('companyAbbrevication', {
                  initialValue: demandObj.companyAbbrevication || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入单位全称",
                    },
                  ],
                })(
                  <Input placeholder="请输入单位简称" disabled={leftReadOnly} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="单位地址" {...formItemLayout}>
                {getFieldDecorator('companyAddress', {
                  initialValue: demandObj.companyAddress || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入单位地址",
                    },
                  ],
                })(
                  // <Cascader options={this.options} onChange={this.change} />
                  <Input placeholder="请输入单位地址" disabled={leftReadOnly} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 16 }}>

            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="联系人员" {...formItemLayout}>
                {getFieldDecorator('userName', {
                  initialValue: demandObj.userName || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入联系人",
                    },
                  ],
                })(
                  <Input placeholder="请输入联系人" disabled={leftReadOnly} />

                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="职位" {...formItemLayout}>
                {getFieldDecorator('deptName', {
                  initialValue: demandObj.deptName || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入联系人职位信息",
                    },
                  ],
                })(
                  <Input placeholder="请输入职位信息" disabled={leftReadOnly} />

                )}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 16 }}>

            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="联系电话" {...formItemLayout}>
                {getFieldDecorator('phone', {
                  initialValue: demandObj.phone || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入联系电话",
                    },
                    {
                      pattern: /^1[3456789]\d{9}$/,
                      message: "手机号码格式不正确，请重新输入"
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input placeholder="请输入联系电话" disabled={leftReadOnly} />

                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="电子邮箱" {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: demandObj.email || '',
                  rules: [
                    {
                      required: true,
                      message: "请输入邮箱",
                    },
                    {
                      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确',
                    },
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input placeholder="请输入电子邮箱" disabled={leftReadOnly} />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default BasicInfoInput