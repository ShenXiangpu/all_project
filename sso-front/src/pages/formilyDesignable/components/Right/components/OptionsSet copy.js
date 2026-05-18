import React, { PureComponent } from 'react'
import { Button, Form, Input, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { render } from 'nprogress'
// import { ConfigsContext } from '../..'


class OptionsSet extends PureComponent {


  handleBlur = () => {
    const { handleChange, form, activeSchema } = this.props

    const allValues = form.getFieldsValue(true)
    const newOptions = allValues.options.filter((item) => item?.label !== undefined && item?.value !== undefined)
    try {
      const newOptionsParsed = newOptions.map((item) => ({
        label: item.label,
        value: JSON.parse(item.value),
      }))
      newOptionsParsed.length && handleChange(newOptionsParsed)
    } catch (e) {
      message.error('value值请正确输入JSON格式！')
    }
  }
  optionsStringified = () => {
    const { activeSchema } = this.props
    const options = activeSchema.current.configs.inputProps.options
    return options.map((item) => ({
      label: item.label,
      value: JSON.stringify(item.value),
    }))
  }

  render() {
    const { handleChange } = this.props


    return (
      <>
        <div>
          <strong>*注意value值需要输入JSON格式！</strong>
        </div>
        <Form>
          <Form.List name="options" initialValue={this.optionsStringified}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <span key={key} style={{ display: 'flex' }} align="start">
                    <Form.Item {...restField} name={[name, 'label']} fieldKey={[fieldKey, 'label']} rules={[{ required: true, message: '请定义label' }]}>
                      <Input placeholder="label" prefix='"' suffix='"' />
                    </Form.Item>
                    <span>:</span>
                    <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                      <Input onBlur={this.handleBlur} placeholder="value" addonAfter="JSON" />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name)
                        this.handleBlur()
                      }}
                    />
                  </span>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>新增选项</Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </>
    )
  }
}

export default OptionsSet

