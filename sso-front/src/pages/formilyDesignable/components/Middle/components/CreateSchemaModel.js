import { Button, Form, FormProps, Input, Modal } from 'antd'
import { render } from 'nprogress'
import React, { Component } from 'react'
// import { ConfigsContext } from '../..'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@Form.create()
class CreateSchemaModel extends Component {
  //   const { formProps, schemaModelJSONCache } = props
  // const { schemaList, onGetSchemaModel } = useContext(ConfigsContext)
  // const [form] = Form.useForm()
  // const schemaModelJSON = useRef('')
  // const [visible, setVisible] = useState(false)
  // const [visibleJSON, setVisibleJSON] = useState(false)

  state = {
    visibleJSON: false,
    visible: false,
    schemaModelJSON: {
      current: ''
    }
  }

  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }


  handleClick = () => {
    const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel } = this.props
    const { form } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state


    // const { name, description } = schemaModelJSONCache && schemaModelJSONCache.current
    form.setFieldsValue({})
    this.setStateValue('visible', true)
  }

  handleSend = (e) => {
    const { formProps, schemaModelJSONCache, schemaList, form, onGetSchemaModel } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state

    e.preventDefault();
    const { validateFields, getFieldsValue } = form
    let values = ''
    validateFields(errors => {
      if (errors) {
        return
      }
      values = {
        ...getFieldsValue(),
      }
      console.log('values',values);
    })

    const schemaModel = { ...values, formProps, schemaList }
    // onGetSchemaModel(schemaModel)
    schemaModelJSON.current = JSON.stringify(schemaModel, null, 4)
    schemaModelJSONCache.current = schemaModelJSON.current
    this.setStateValue('visible', false)
    this.setStateValue('visibleJSON', true)
  }

  handleCopy = () => {
    const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state

    navigator.clipboard.writeText(schemaModelJSON.current)
    this.setStateValue('visibleJSON', false)

  }

  handleOk = (e) => {
    e.preventDefault();
    const { form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
    })
  }

  render() {
    const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel, form } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state
    const { getFieldDecorator } = form
    console.log('!schemaList',schemaList);
    return (
      <>
        <Button type="primary" disabled={!(schemaList && schemaList.length > 0)} onClick={this.handleClick}>生成模板</Button>
        <Modal title="生成并发送模板" visible={visible} onOk={this.handleSend} onCancel={() => this.setStateValue('visible', false)} getContainer={false}>
          <Form {...layout} >

            <Form.Item label='模板名称'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请填写模板名称！'
                  },
                ],
              })(
                <Input placeholder="请填写模板名称！" />
              )}
            </Form.Item>
            <Form.Item label="描述" name="description">
              <Input.TextArea />
            </Form.Item>

          </Form>
        </Modal>
        <Modal title="schemaModel"
          width='50vw'
          bodyStyle={{ height: '60vh', overflow: 'auto' }}
          visible={visibleJSON}
          onOk={this.handleCopy}
          okText="复制"
          onCancel={() => this.setStateValue('visibleJSON', false)}
        >
          <pre>{schemaModelJSON.current}</pre>
        </Modal>
      </>
    )
  }
}

export default CreateSchemaModel;