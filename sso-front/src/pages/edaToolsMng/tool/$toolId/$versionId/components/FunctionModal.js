import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio, Checkbox } from 'antd'
import { isEqual } from 'lodash'

const FormItem = Form.Item
const { Option, OptGroup } = Select

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class FeatureModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      let supportPlatform;
      if (values.supportPlatform && values.supportPlatform.length === 2) {
        supportPlatform = 3;
      } else {
        supportPlatform = values.supportPlatform.toString();
      }
      const data = {
        ...getFieldsValue(),
        supportPlatform,
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, taskTypes, vendors, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const frontTypeOptions = taskTypes && taskTypes.F && taskTypes.F.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const backTypeOptions = taskTypes && taskTypes.B && taskTypes.B.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const arr = [];
    if (item && item.supportPlatform) {
      arr.push(item.supportPlatform);
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='tool'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='功能名称'>
              {getFieldDecorator('functionName', {
                initialValue: item.functionName,
                rules: [
                  {
                    required: true,
                    message: '请输入工具版本'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具版本" />
              )}
            </FormItem>

            <FormItem label='运行平台'>
              {getFieldDecorator('supportPlatform', {
                initialValue: item.supportPlatform && isEqual(item.supportPlatform, 3) ? [1, 2] : arr,
                rules: [
                  {
                    required: true,
                    message: '请选择工具支持运行平台'
                  },
                ],
              })(
                <Checkbox.Group>
                  <Checkbox value={1}>云平台</Checkbox>
                  <Checkbox value={2}>超算</Checkbox>
                </Checkbox.Group>
              )}
            </FormItem>

            <Form.Item label="任务类型">
              {getFieldDecorator('taskTypeId', {
                initialValue: item.taskTypeId,
                rules: [
                  {
                    required: true,
                    message: '请选择任务类型'
                  },
                ],
              })(
                <Select
                  showSearch
                  notFoundContent={null}
                  // filterOption={(input, option) =>
                  //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  // }
                  placeholder="请选择任务类型"
                  getPopupContainer={() => document.getElementById('tool')}
                >
                  <OptGroup label="前端">
                    {frontTypeOptions}
                  </OptGroup>
                  <OptGroup label="后端">
                    {backTypeOptions}
                  </OptGroup>
                </Select>
              )}
            </Form.Item>

            <FormItem label='参考用例'>
              {getFieldDecorator('referenceCase', {
                initialValue: item.referenceCase,
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入参考用例" />
              )}
            </FormItem>

            <FormItem label='使用说明书'>
              {getFieldDecorator('userGuide', {
                initialValue: item.userGuide,
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入工具使用说明书" />
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}

FeatureModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default FeatureModal
