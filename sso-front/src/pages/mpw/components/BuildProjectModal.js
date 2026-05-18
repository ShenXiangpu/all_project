import React, { PureComponent } from 'react'
import { Modal, Spin, Form, Row, Col, Input, Badge, Button } from 'antd'
import styles from './modal.less'
import { isEqual, isEmpty } from 'lodash';
import moment from "moment";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

/**
 * 续费窗口
 */
@Form.create()
class BuildProjectModal extends PureComponent {
  state = {

  }

  componentDidMount() {

  }

  componentDidUpdate(preProps) {

  }

  handleOk = (e) => {
    e.preventDefault();

    const { onBuildSubmit, form, id } = this.props;
    const { validateFields } = form;

    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        demandID: id,
        id: 0,
        ...values
      }

      console.log('data', data);

      onBuildSubmit(data);
    })
  }
  /**
   * 处理项目描述不少于5个字符相关的问题
   */
  handleProjectIntro = (rule, value, callback) => {
    const { dispatch } = this.props
    console.log(typeof value);
    if (value && value.length >= 5) {
      callback()
    } else {
      callback("请输入大于5个字符的项目描述");
    }
  }


  onCancel = () => {
    const { form, onCancel } = this.props
    form.resetFields();
    onCancel()
  }


  renderFooter = () => {

    return [
      <Button onClick={this.onCancel}>取消</Button>,
      <Button type='primary' onClick={(e) => this.handleOk(e)}>确定</Button>,
    ];
  };





  render() {
    const { form, ColProps, formItemLayout,btnLoading, ...modalProps } = this.props
    const { getFieldDecorator } = form;



    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
        // footer={this.renderFooter()}
      >
        <Form>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="项目英文名称" {...formItemLayout}>
                {getFieldDecorator('projectNameEn', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入单位全称",
                    },
                    {
                      pattern: /^[a-\z\A-\Z]*$/,
                      // pattern: /^(?!\d*$)/,
                      message: '请输入英文字母（不区分大小写）',
                    },
                  ],
                })(
                  <Input style={{ width: '300px' }} placeholder="请输入项目英文名称" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="项目名称" {...formItemLayout}>
                {getFieldDecorator('projectName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入项目名称",
                    },
                    // {
                    //   pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                    //   // pattern: /^(?!\d*$)/,
                    //   message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    // },
                  ],
                })(
                  <Input style={{ width: '300px' }} placeholder="请输入项目名称" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="项目描述" {...formItemLayout}>
                {getFieldDecorator('projectIntroduction', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入项目描述",
                    },
                    {
                      validator: this.handleProjectIntro
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <TextArea style={{ width: '360px', height: '100px' }} placeholder="请输入至少五个字符" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
              style={{textAlign:'right'}}
            >
              <Button onClick={this.onCancel}>取消</Button>&nbsp;&nbsp;
              <Button type='primary' loading={btnLoading} onClick={(e) => this.handleOk(e)}>确定</Button>
            </Col>
          </Row>

        </Form>
      </Modal >
    )
  }
}

export default BuildProjectModal
