import React, { useContext, useRef, useState } from 'react'
import { Input, InputNumber, Switch } from 'antd'
// import { LinkSet } from './LinkSet'
// import { ConfigWordsLimit } from './ConfigWordsLimit'
// import { JsonInput } from './JsonInput'

export function ConfigProp(props){
  const { propOwner, namepath, propName, propDefaultValue }= props
  // const { forceRender }= useContext(ConfigsContext)
  const typeofPropDefaultValue= typeof propDefaultValue
  // const [propCurrentValue, setPropCurrentValue]= useState(propDefaultValue)
  const  propCurrentValue  = propDefaultValue

  const setPropCurrentValue = () => {

  }


  const handleChangePropValue= (newValue) => {
    propOwner[propName]= newValue
    propCurrentValue = newValue
    // forceRender()
  }

  // switch(propName){
  //   case 'name':
  //     return <JsonInput propOwner={propOwner} propName='name' />
  //   case 'initialValue':
  //     return <JsonInput propOwner={propOwner} propName='initialValue' />
  //   case 'wordsLimit':
  //     return <ConfigWordsLimit extra ={propOwner} />
  // }

  switch(typeofPropDefaultValue){
    case 'object':
      const propOwner= propDefaultValue
      const propOwnerEntries= Object.entries(propOwner)
      return (
        <div>
          <strong>{propName}：</strong>
          <div className="configs-area">
            {
              propOwnerEntries.map(([pName, value]) => 
                <ConfigProp key={pName}
                  propOwner={propOwner} 
                  namepath= {[...namepath, pName]}
                  propName={pName}
                  propDefaultValue={value}
                />
              )
            }
          </div>
        </div>
      );
    case 'boolean':
      return (
        <span>
          <strong>{propName}：</strong>
          <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
          {/* <LinkSet targetType='boolean' namepath={namepath} /> */}
        </span>
      );
    case 'string':
      return (
        <span>
          <strong>{propName}：</strong>
          <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => handleChangePropValue(e.currentTarget.value)} />
          {/* <LinkSet targetType='string' namepath={namepath} /> */}
        </span>
      );
    case 'number':
      return (
        <span>
          <strong>{propName}：</strong>
          <InputNumber value={propCurrentValue} onChange={handleChangePropValue} bordered={false} />
          {/* <LinkSet targetType='number' namepath={namepath} /> */}
        </span>
      );
    default:
      return null;
  }
}

