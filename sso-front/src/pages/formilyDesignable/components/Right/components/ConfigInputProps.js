import React, { PureComponent } from 'react'
import { Input, InputNumber, Select, Switch } from 'antd'
import  ConfigOptions  from './ConfigOptions'
import { LinkSet } from './LinkSet'
// import { render } from 'nprogress'
// import { ConfigsContext } from '../..'


class ConfigInputProp extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      type:'',
      options: '',
      propCurrentValue:props.propDefaultValue
    }
  }
  // const { forceRender }= useContext(ConfigsContext)
  // const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)

  componentDidMount() {
    const { propName,propDefaultValue } = this.props
    const type = inputPropsInfo && inputPropsInfo[propName] && inputPropsInfo[propName].type || typeof propDefaultValue;
    const options = inputPropsInfo && inputPropsInfo[propName] && inputPropsInfo[propName].options
    this.setStateValue("type",type)
    this.setStateValue("options",options)
  }

  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }

  optionsForSelect = () => {
    const { options } = this.props
    return options && options.map((item) => ({
      label: item,
      value: item,
    }))
  }


  handleChangePropValue = (newValue) => {
    const { propOwner, namepath, propName, propDefaultValue ,updateRightProps} = this.props
    propOwner[propName] = newValue
    this.setStateValue('propCurrentValue',newValue)
    updateRightProps()
  }

  get configOptionsProps() {
    const { schemaList, activeSchema, updateRightProps,form } = this.props
    return {
      schemaList,
      activeSchema,
      updateRightProps,
      form
    }
  }


  render() {

    const { propOwner, namepath, propName, propDefaultValue,form } = this.props
    const { type,propCurrentValue,options } = this.state

    const ele = (type) => {
      switch (type) {
        case 'options':
          return (
            <ConfigOptions { ...this.configOptionsProps} form={form} handleChangePropValue={this.handleChangePropValue} />
          )
        case 'boolean':
          return (
            <div>
              <strong>{propName}：</strong>
              <Switch checked={propCurrentValue} onChange={this.handleChangePropValue} />
              {/* <LinkSet targetType='boolean' namepath={namepath} /> */}
            </div>
          );
        case 'string':
          return (
            <div>
              <strong>{propName}：</strong>
              {
                options ?
                  <Select allowClear style={{ minWidth: 150 }} defaultValue={propCurrentValue} options={this.optionsForSelect} onChange={this.handleChangePropValue} />
                  :
                  <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => this.handleChangePropValue(e.target.value)} />
              }
            </div>
          );
        case 'number':
          return (
            <div>
              <strong>{propName}：</strong>
              <InputNumber value={propCurrentValue} onChange={this.handleChangePropValue} bordered={false} />
              {/* <LinkSet targetType='number' namepath={namepath} /> */}
            </div>
          );
        default:
          return null;
      }
    }
    return (
      <>
        {ele(type)}
      </>
    )
  }
}
export default ConfigInputProp


export const inputPropsInfo = {
  options: {
    type: 'options',
  },
  maxLength: {
    type: 'number',
  },
  max: {
    type: 'number',
  },
  min: {
    type: 'number',
  },
  decimalSeparator: {
    type: 'string',
  },
  maxTagCount: {
    type: 'number',
  },
  maxTagTextLength: {
    type: 'number',
  },
  mode: {
    type: 'string',
    options: ['multiple', 'tags'],
  },
  optionFilterProp: {
    type: 'string',
    options: ['label', 'value']
  },
  popupPlacement: {
    type: 'string',
    options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
  },
  expandTrigger: {
    type: 'string',
    options: ['click', 'hover'],
  },
  optionType: {
    type: 'string',
    options: ['default', 'button'],
  },
  buttonStyle: {
    type: 'string',
    options: ['outline', 'solid'],
  },
  picker: {
    type: 'string',
    options: ['time', 'date', 'week', 'month', 'quarter', 'year']
  },
  listType: {
    type: 'string',
    options: ["text", "picture", "picture-card"]
  },
  maxCount: {
    type: 'number',
  },
  type: {
    type: 'string',
    options: ['default', 'primary', 'link', 'text', 'ghost', 'dashed']
  },
  htmlType: {
    type: 'string',
    options: ["submit", "button", "reset"],
  },
  shape: {
    type: 'string',
    options: ['circle', 'round']
  },
  tooltipPlacement: {
    type: 'string',
    options: ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'],
  }
}