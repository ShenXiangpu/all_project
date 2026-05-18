import React, { PureComponent } from 'react'
import { Divider } from 'antd'
import ReplaceConfigForm from './ReplaceConfigForm'
import ReplaceFileForm from './ReplaceFileForm'

class ReplaceMain extends PureComponent {

  render() {
    const { configFormProps, replaceFormProps } = this.props;
    return (
      <div>
        <p>步骤1：</p>
        <ReplaceConfigForm {...configFormProps} />
        <Divider></Divider>
        <p>步骤2：</p>
        <ReplaceFileForm {...replaceFormProps} />
      </div>
    )
  }
}

export default ReplaceMain
