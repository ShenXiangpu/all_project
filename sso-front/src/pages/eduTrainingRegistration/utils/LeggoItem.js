import { Form } from "antd"
import axios from "axios"
import React from "react"
import { leggoItemStore } from "./itemStore"
import { Leggo } from "../utils/Leggo"


export default function LeggoItem(props) {
  // debugger
  const { leggo, schema, schemaList,form } = props
  const { getFieldDecorator } = form
  const { type, configs,id, needDefineGetterProps } = schema
  const { itemProps, inputProps, extra } = configs
  const StandardInput = leggoItemStore.total[type].StandardInput || (() => <div />)
  console.log('configs',schema);
  // debugger
  const rules = Leggo.createRules(itemProps.rules, extra && extra.wordsLimit)
  const children = Leggo.createChildren(extra && extra.childrenNode)

  return (
    // SuperSuccessor ? <SuperSuccessor /> :
    //   Successor ?
    // <Form.Item label={itemProps.label} required={rules[0].required}>
    //     <Form.Item {...itemProps} rules={rules} noStyle={true}>
    //       {/* <StandardInput {...inputProps}>{children}</StandardInput> */}

    //       {getFieldDecorator(`${itemProps.name}`,

    //         {
    //           initialValue: itemProps.initialValue || '',
    //           rules: itemProps.rules,
    //         })(
    //           // <Input
    //           //   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    //           //   placeholder="Username"
    //           // />,
    //           <StandardInput  {...inputProps}>{children}</StandardInput>

    //         )}
    //     </Form.Item>
    // </Form.Item>

    <Form.Item {...itemProps}>
      {getFieldDecorator(`${id}`,

        {
          initialValue: itemProps.initialValue || '',
          rules: itemProps.rules,
        })(
          // <Input
          //   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          //   placeholder="Username"
          // />,
          <StandardInput  {...inputProps}>{children}</StandardInput>

        )}
    </Form.Item>
    // :
    // <Form.Item {...itemProps} rules={rules}>
    //   <StandardInput {...inputProps}>{children}</StandardInput>
    // </Form.Item>
  )
}