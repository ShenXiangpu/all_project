import React, { PureComponent } from 'react'
// import { Radio, RadioChangeEvent } from 'antd'
// import { ConfigPostman } from './ConfigPostman'
import  OptionsSet  from './OptionsSet'
import styles from '../../../index.less'

// import { ConfigsContext } from '../..'


class ConfigOptions extends PureComponent {

// const { activeSchema, schemaListOptions } = useContext(ConfigsContext)

get optionsProps () {
  const { schemaList, activeSchema, updateRightProps,form } = this.props

  return {
    schemaList, activeSchema, updateRightProps,form
  }
}

render() {
const { handleChangePropValue,form } = this.props

  return (
    <div>
      <div className={styles.configsArea}>
        <OptionsSet {...this.optionsProps} handleChange={handleChangePropValue} />
      </div>
    </div>
  )

}

  
}

export default ConfigOptions