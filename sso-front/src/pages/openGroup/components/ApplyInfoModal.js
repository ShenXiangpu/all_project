import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item

@Form.create()
class ApplyInfoModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { groupInfo = {}, onOk, form } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const data = {
        description: values.description,
        groupNum: groupInfo.groupNumber,
      }
      onOk(data)
    })
  }

  render() {
    const { form, groupInfo, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        {groupInfo &&
          <div>
            <p>
              <span>您将申请加入群组 <label style={{ color: '#000' }}>{groupInfo.groupName}({groupInfo.groupNumber})</label> </span>
              <br />
              <span>创建人：<label style={{ color: '#000' }}>{groupInfo.groupOwnerName}</label> </span>
              <br />
              <span>创建人需要验证您的身份，请输入您的请求信息：</span>
            </p>
            <FormItem>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证信息'
                  },
                ],
              })(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </div>
        }
      </Modal>
    )
  }
}

export default ApplyInfoModal
