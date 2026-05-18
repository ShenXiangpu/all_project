import React, { PureComponent } from 'react'

import { Form, Input} from 'antd'

const { TextArea } = Input;

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 12,
  md: 8,
}





const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};

@Form.create()

class ElseTextArea extends PureComponent {
  state = {

  }
  options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  onChange = (value) => {
    console.log(value);
  }





  render() {

    const { form, } = this.props
    const { getFieldDecorator } = form


    return (
      <div>
        <Form>
          <Form.Item
            label="   "
            required={false}
            {...formItemLayout}
            colon={false}
            labelAlign="right"
          >
            {getFieldDecorator('dayOfWeek', {
              initialValue: [],
              // rules: [
              //   {
              //     required: true,
              //     message: '请选择执行定期快照的时间'
              //   },
              // ],
            })(
              <TextArea />
            )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default ElseTextArea;
