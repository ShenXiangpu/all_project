import React, { PureComponent } from 'react'
import { Input, InputNumber, Switch } from 'antd'
import { LinkSet } from './LinkSet'
import { ConfigWordsLimit } from './ConfigWordsLimit'
import JsonInput from './JsonInput'
import { render } from 'nprogress'
import styles from '../../../index.less'
import { isEqual } from 'lodash'
const propsNamsObj = {
  'name': '标识',
  'label': '名称',
  'initialValue': '默认值',
  'required': '是否必填',
  'disabled': '是否禁用',
  'message': '未填写内容警示',
  'rows':'展示行数'
}

class ConfigProp extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      propCurrentValue: props.propDefaultValue
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const { schemaList, activeSchema, updateRightProps } = this.props
    if (prevProps.schemaList !== schemaList && prevState.activeSchema !== activeSchema) {
      updateRightProps()
    }
  }


  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }

  handleChangePropValue = (e) => {
    const { propOwner, propName, setActiveSchema, updateRightProps } = this.props
    const newValue = e.currentTarget.value
    propOwner[propName] = newValue
    this.setStateValue('propCurrentValue', newValue)
    updateRightProps()
  }

  handleChangePropValue = (e) => {
    const { propOwner, propName, setActiveSchema, updateRightProps } = this.props
    const newValue = e.currentTarget.value
    propOwner[propName] = newValue
    this.setStateValue('propCurrentValue', newValue)
    updateRightProps()
  }

  handleChangeBoolPropValue = (e) => {

    console.log(e);
    const { propOwner, propName, setActiveSchema, updateRightProps } = this.props
    const newValue = e
    propOwner[propName] = newValue
    this.setStateValue('propCurrentValue', newValue)
    updateRightProps()
  }

  get configProps() {
    const { updateRightProps } = this.props
    return {
      updateRightProps() {
        updateRightProps()
      }
    }
  }
  get jsonProps() {
    const { updateRightProps } = this.props
    return {
      updateRightProps() {
        updateRightProps()
      }
    }
  }







  render() {
    const { namepath, propName, propOwner, propDefaultValue } = this.props
    const typeofPropDefaultValue = typeof propDefaultValue
    const json = (propName) => {
      console.log('propName', propName);
      // switch (propName) {
      //   // case 'name':
      //   //   return <JsonInput propOwner={propOwner} {...this.jsonProps} propName='name' />
      //   case 'initialValue':
      //     return <JsonInput propOwner={propOwner} {...this.jsonProps} propName='initialValue' />
      //   // case 'wordsLimit':
      //   //   return <ConfigWordsLimit extra ={propOwner} />
      // }
    }
    const ele = (typeofPropDefaultValue) => {
      const { propCurrentValue } = this.state
      switch (typeofPropDefaultValue) {
        case 'object':
          const propOwner = propDefaultValue
          const propOwnerEntries = Object.entries(propOwner)
          return (
            <div>
              <div>
                {
                  propOwnerEntries.map(([pName, value]) =>
                    <ConfigProp
                      key={pName}
                      propOwner={propOwner}
                      namepath={[...namepath, pName]}
                      propName={pName}
                      propDefaultValue={value}
                      {...this.configProps}
                    />
                  )
                }
              </div>
            </div>
          );
        case 'boolean':
          return (
            <div>
              <strong>{propsNamsObj[propName]}：</strong>
              <Switch checked={propCurrentValue} onChange={this.handleChangeBoolPropValue} />
              {/* <LinkSet targetType='boolean' namepath={namepath} /> */}
            </div>
          );
        case 'string':
          return (
            <div>
              {
                isEqual(propsNamsObj[propName], '标识') ? null :
                  <div>
                    <strong>{propsNamsObj[propName]}：</strong>
                    <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => this.handleChangePropValue(e)} />
                    {/* <LinkSet targetType='string' namepath={namepath} /> */}
                  </div>
              }

            </div>


          );
        case 'number':
          return (
            <div>
              <strong>{propsNamsObj[propName]}：</strong>
              <InputNumber value={propCurrentValue} onChange={e => this.handleChangePropValue(e)} bordered={false} />
              {/* <LinkSet targetType='number' namepath={namepath} /> */}
            </div>
          );
        default:
          return null;
      }
    }

    return (
      <>
        {json(propName)}
        {ele(typeofPropDefaultValue)}
      </>
    )
  }
}
export default ConfigProp

