import React, { PureComponent } from 'react'
import { Input, message } from 'antd'
import { render } from 'nprogress'
const propsNamsObj = {
  'name':'标识',
  'label':'名称',
  'initialValue':'默认值',
  'required':'是否必填',
  'disabled':'是否禁用',
  'placeholder':'提示',
}


class JsonInput extends PureComponent {
  state = {
    value: ''
  }

  handleBlur = () => {
    const { propOwner, propName ,updateRightProps } = this.props
    const { value } = this.state
    try {
      propOwner[propName] = JSON.parse(value)
      updateRightProps()
      this.setState(JSON.stringify(propOwner[propName]))
    } catch (e) {
      message.error(`${propName}值请输入正确JSON格式！`)
    }
  }

  // value = JSON.stringify(propOwner[propName])
  setValue = (value) => {
    this.setState({
      value
    })
  }

  render() {
    const { propOwner, propName } = this.props
    const { value } = this.state
    return (
      <div>
        <strong>{propsNamsObj[propName]}：</strong>
        <Input  value={value} onChange={e => this.setValue(e.target.value)} onBlur={this.handleBlur}/>
      </div>
    )
  }


}
export default JsonInput