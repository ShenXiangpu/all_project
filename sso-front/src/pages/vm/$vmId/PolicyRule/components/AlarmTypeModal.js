import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Row, Col } from 'antd'
import { isEmpty, isEqual } from 'lodash-es'
import styles from '../style.less'

const { Option } = Select
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
}

@Form.create()
class AlarmTypeModal extends PureComponent {

  state = {
    selectedType: '',  //选中的类型
  }

  componentDidMount() {
    const { alarmTypes } = this.props;
    if (alarmTypes && alarmTypes.length > 0) {
      this.setState({ selectedType: alarmTypes[0].type })
    }
  }

  componentDidUpdate(preProps) {
    const { alarmTypes } = this.props;
    const { alarmTypes: old_alarmTypes } = preProps;
    if (alarmTypes && alarmTypes.length > 0 && !isEqual(alarmTypes, old_alarmTypes)) {
      this.setState({ selectedType: alarmTypes[0].type })
    }
  }

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form;

    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        percent: Number(values.percent),
        interval: Number(values.interval),
        emails: values.emails.split(","),
        alarmId: item.alarmId,
      }

      onOk(data)
    })
  }

  onChange = value => {
    this.setState({ selectedType: value });
  }

  onInputChange = (e) => {
    let val = e.target.value;
    if (val < 0) {
      val = 0;
    }
    if (val > 100) {
      val = 100;
    }

    console.log(val);

    const { form } = this.props;
    const { setFieldsValue } = form;
    setFieldsValue({
      percent: val
    })
  }

  handleCheckName = (rule, value, callback) => {
    const { item = {}, onCheckPolicyName } = this.props
    if (value && value !== item.name) {
      onCheckPolicyName(rule, value, callback);
    } else {
      // Note: 必须总是返回一个 callback
      callback()
    }
  }

  render() {
    const { item = {}, onOk, form, alarmTypes, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { selectedType } = this.state;

    let currentItem;
    if (alarmTypes && alarmTypes.length > 0 && selectedType) {
      const arr = alarmTypes.filter(item => item.type == selectedType);
      currentItem = arr && arr.length > 0 && arr[0];
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk} className={styles.modal}>
        <Form layout="horizontal">
          <FormItem label="策略名称" required  {...formItemLayout2}>
            {getFieldDecorator('name', {
              initialValue: item.name || '',
              rules: [
                {
                  required: true,
                  message: '请输入策略名称',
                },
                {
                  validator: this.handleCheckName
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="备注"  {...formItemLayout2}>
            {getFieldDecorator('desc', {
              initialValue: item.desc || '',
            })(
              <Input.TextArea />
            )}
          </FormItem>

          <div className={styles.alarmWrap}>
            <span>IF</span>
            <Row>
              <Col span={8}>
                <FormItem  {...formItemLayout}>
                  {getFieldDecorator('type', {
                    initialValue: item.type || alarmTypes[0].type,
                  })(
                    <Select
                      onChange={this.onChange}
                    >
                      {
                        alarmTypes && alarmTypes.map(item => {
                          return <Option key={item.type}>{item.label}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              {currentItem && !isEqual(currentItem.type, 'POWEREDOFF') &&
                <>
                  <Col span={4}>
                    <FormItem  {...formItemLayout}>
                      {getFieldDecorator('operator', {
                        initialValue: item.operators || (currentItem && currentItem.operators && currentItem.operators[0]),
                      })(
                        <Select>
                          {
                            currentItem && currentItem.operators && currentItem.operators.map((item, index) => {
                              return <Option key={index} value={item}>{item}</Option>
                            })
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem  {...formItemLayout}>
                      {getFieldDecorator('percent', {
                        initialValue: item.percent || 0,
                        rules: [
                          {
                            required: true,
                            message: '请输入',
                          },
                          {
                            pattern: /^([0-9][0-9]{0,1}|100)$/,
                            message: '输入整数(0-100)',
                          },
                        ]
                      })(
                        <Input
                          placeholder='请输入'
                          type='number'
                          max="100"
                          min="0"
                          // onChange={this.onInputChange}
                          addonAfter={currentItem && currentItem.unit} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem  {...formItemLayout}>
                      {getFieldDecorator('interval', {
                        initialValue: item.interval || 60,
                        rules: [
                          {
                            required: true,
                            message: '请输入',
                          }
                        ]
                      })(
                        <Input
                          placeholder='请输入'
                          type='number'
                          addonAfter='秒' />
                      )}
                    </FormItem>
                  </Col>
                </>
              }
            </Row>
            <span>THEN</span>
            <FormItem label="触发警报和" required  {...formItemLayout2}>
              {getFieldDecorator('levels', {
                initialValue: item.levels || (currentItem && currentItem.levels && currentItem.levels[0]),
              })(
                <Select>
                  {
                    currentItem && currentItem.levels && currentItem.levels.map(item => {
                      return <Option key={item}>{item}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="邮件收件人" required  {...formItemLayout2}>
              {getFieldDecorator('emails', {
                initialValue: item.emails || '',
              })(
                <Input.TextArea placeholder='请输入，多个以逗号（,）分隔' />
              )}
            </FormItem>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default AlarmTypeModal
