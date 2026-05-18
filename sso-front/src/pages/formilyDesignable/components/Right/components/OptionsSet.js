import React, { PureComponent } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { render } from 'nprogress'
// import { ConfigsContext } from '../..'

let id = 0;

class OptionsSet extends PureComponent {


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  handleSubmit = e => {
    const { handleChange } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        const newOptions = names && names.filter((item) => item && item !== undefined)
        debugger
        const newOptionsParsed = newOptions.map((item) => ({
          label: item,
          value: item,
        }))
        newOptionsParsed.length && handleChange(newOptionsParsed)

      }
    });
  };
  // handleBlur = () => {
  //   const { handleChange, form, activeSchema } = this.props

  //   const allValues = form.getFieldsValue(true)
  //   const newOptions = allValues.options.filter((item) => item?.label !== undefined && item?.value !== undefined)
  //   try {
  //     const newOptionsParsed = newOptions.map((item) => ({
  //       label: item.label,
  //       value: JSON.parse(item.value),
  //     }))
  //     newOptionsParsed.length && handleChange(newOptionsParsed)
  //   } catch (e) {
  //     message.error('value值请正确输入JSON格式！')
  //   }
  // }
  // optionsStringified = () => {
  //   const { activeSchema } = this.props
  //   const options = activeSchema.current.configs.inputProps.options
  //   return options.map((item) => ({
  //     label: item.label,
  //     value: JSON.stringify(item.value),
  //   }))
  // }

  render() {
    const { getFieldDecorator, getFieldValue, activeSchema } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...formItemLayout}
        label={`选项${index + 1}`}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "选项不能为空",
            },
          ],
        })(<Input placeholder="选项名称" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加选项
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            确认选项
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default OptionsSet

