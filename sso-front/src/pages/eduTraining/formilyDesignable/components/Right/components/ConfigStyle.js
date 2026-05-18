import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'
// import { MinusCircleOutlined } from '@ant-design/icons'
// import { render } from 'nprogress'
// import { ConfigsContext } from '../..'


class ConfigStyle extends Component {

  state = {
    timeId: {
      current: ''
    },
    defaultStyle: ''
  }
  componentDidUpdate() {
    const { activeSchema, forceRender } = this.props
    const { inputProps: { style }
    } = activeSchema && activeSchema.current && activeSchema.current.configs
    const styleList = []
    if (style) {
      for (const [CSSPropertyName, value] of Object.entries(style)) {
        styleList.push({ CSSPropertyName, value })
      }
    }
    this.setStateValue('defaultStyle', { styleList })
  }
  //更新
  // const defaultStyle = useMemo(() => {
  //   const { style }= inputProps
  //   const styleList = []
  //   if (style) {
  //     for (const [CSSPropertyName, value] of Object.entries(style)) {
  //       styleList.push({CSSPropertyName, value})
  //     }
  //   }
  //   return { styleList }
  // }, [])


  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }

  onValuesChange = (_, allValues) => {
    const { timeId } = this.state
    const { activeSchema, forceRender } = this.props
    const { inputProps } = activeSchema && activeSchema.current && activeSchema.current.configs
    timeId.current && clearTimeout(timeId.current)
    timeId.current = setTimeout(() => {
      const newStyle = allValues.styleList.reduce((pre, cur) => {
        const { CSSPropertyName, value } = cur || {}
        if (CSSPropertyName && value) {
          pre[CSSPropertyName] = value
        }
        return pre
      }, {})
      inputProps.style = newStyle
      let timeIds = {
        current: null
      }

      this.setStateValue('timeId', timeIds)
      forceRender()
    }, 500)
  }
  render() {
    const { defaultStyle } = this.state
    // const { inputProps } = activeSchema && activeSchema.current && activeSchema.current.configs
    // let timeId = null


    return (
      <div>
        <strong>style：</strong>
        <Form onValuesChange={this.onValuesChange} initialValues={defaultStyle}>
          <Form.List name="styleList" >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'CSSPropertyName']} fieldKey={[fieldKey, 'CSSPropertyName']} rules={[{ required: true, message: '请定义CSSPropertyName' }]}>
                      <Input prefix='"' suffix='"' placeholder="CSSPropertyName" />
                    </Form.Item>
                    <span>:</span>
                    <Form.Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请定义value' }]}>
                      <Input prefix='"' suffix='"' placeholder="value" />
                    </Form.Item>
                    {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block >新增style属性</Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    )
  }


}
export default ConfigStyle;