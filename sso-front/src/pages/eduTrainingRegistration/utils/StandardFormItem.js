import React, {PureComponent} from "react"
import { Form } from "antd"
import { Leggo } from "../utils/Leggo"


class StandardFormItem extends PureComponent {


  render () {
    const { StandardInput, configs,form } = this.props
    const { itemProps, inputProps, extra } = configs
    const  { getFieldDecorator } = form

    return (
      <Form.Item {...itemProps}>
        {getFieldDecorator(`${itemProps.name}`,
        
        { initialValue: itemProps.initialValue || '',
          rules: itemProps.rules,
        })(
          // <Input
          //   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          //   placeholder="Username"
          // />,
          <StandardInput  {...inputProps}>{Leggo.createChildren(extra?.childrenNode)}</StandardInput>
  
        )}
      </Form.Item>
    )
  }
  
}
export default StandardFormItem