import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Switch, Row, Col, Divider } from 'antd'
import { isEqual } from 'lodash-es'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
@Form.create()
class NodeModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldValue } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        id: item.id,
        ...values,
        ironic: values.ironic ? 1 : 0,
        status: values.status ? 1 : 0
      }
      console.log(data);
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, flavorModalType, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} width={800} onOk={this.handleOk}>
        <Form layout="horizontal"  {...formItemLayout}>
          <Row>
            <Col span={12}>
              <FormItem label='规格名称'>
                {getFieldDecorator('flavorName', {
                  initialValue: item.flavorName,
                  rules: [
                    {
                      required: true,
                      message: '请输入规格名称'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入规格名称" disabled={isEqual(flavorModalType, 'update')} />
                )}
              </FormItem>
              <FormItem label='规格类型'>
                {getFieldDecorator('flavorType', {
                  initialValue: item.flavorType,
                  rules: [
                    {
                      required: true,
                      message: '请输入规格类型'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入规格类型" disabled={isEqual(flavorModalType, 'update')} />
                )}
              </FormItem>
              <FormItem label='内存'>
                {getFieldDecorator('memory', {
                  initialValue: item.memory || 0,
                  rules: [
                    {
                      required: true,
                      message: '请输入内存大小'
                    },
                  ],
                })(
                  <InputNumber min={0} disabled={isEqual(flavorModalType, 'update')} />
                )} GB
              </FormItem>
              <FormItem label='CPU'>
                {getFieldDecorator('cpu', {
                  initialValue: item.cpu || 0,
                  rules: [
                    {
                      required: true,
                      message: '请输入CPU大小'
                    },
                  ],
                })(
                  <InputNumber min={0} disabled={isEqual(flavorModalType, 'update')} />
                )} 核
              </FormItem>
              <FormItem label='根磁盘'>
                {getFieldDecorator('rootDisk', {
                  initialValue: item.rootDisk || 0,
                  rules: [
                    {
                      required: true,
                      message: '请输入根磁盘大小'
                    },
                  ],
                })(
                  <InputNumber min={0} disabled={isEqual(flavorModalType, 'update')} />
                )} GB
              </FormItem>
              <FormItem label='数据盘'>
                {getFieldDecorator('dataDisk', {
                  initialValue: item.dataDisk || 0,
                  rules: [
                    {
                      required: true,
                      message: '请输入数据盘大小'
                    },
                  ],
                })(
                  <InputNumber min={0} disabled={isEqual(flavorModalType, 'update')} />
                )} GB
              </FormItem>
              <FormItem label='是否裸机'>
                {getFieldDecorator('ironic', {
                  initialValue: Boolean(item.ironic) || false,
                  valuePropName: 'checked'
                })(
                  <Switch checkedChildren="是" unCheckedChildren="否" disabled={isEqual(flavorModalType, 'update')} />
                )}
              </FormItem>
              <FormItem label='描述'>
                {getFieldDecorator('description', {
                  initialValue: item.description,
                })(
                  <Input.TextArea disabled={isEqual(flavorModalType, 'update')} />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label='日付价格'>
                {getFieldDecorator('dayPrice', {
                  initialValue: item.dayPrice,
                  rules: [
                    {
                      required: true,
                      message: '请输入日付价格'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入日付价格" />
                )}
              </FormItem>
              <FormItem label='包月套餐日价'>
                {getFieldDecorator('monthPrice', {
                  initialValue: item.monthPrice,
                  rules: [
                    {
                      required: true,
                      message: '请输入包月每日价格'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入包月每日价格" />
                )}
              </FormItem>
              <FormItem label='半年套餐日价'>
                {getFieldDecorator('halfYearPrice', {
                  initialValue: item.halfYearPrice,
                  rules: [
                    {
                      required: true,
                      message: '请输入半年套餐每日价格'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入半年套餐每日价格" />
                )}
              </FormItem>
              <FormItem label='包年套餐日价'>
                {getFieldDecorator('yearPrice', {
                  initialValue: item.yearPrice,
                  rules: [
                    {
                      required: true,
                      message: '请输入包年套餐每日价格'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入包年套餐每日价格" />
                )}
              </FormItem>
              <FormItem label='是否可用'>
                {getFieldDecorator('status', {
                  initialValue: Boolean(item.status) || true,
                  valuePropName: 'checked'
                })(
                  <Switch checkedChildren="可用" unCheckedChildren="不可用" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

NodeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default NodeModal
