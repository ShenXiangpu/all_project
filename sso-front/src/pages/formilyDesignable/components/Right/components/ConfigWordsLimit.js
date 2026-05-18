import React, { useContext, useReducer, useRef, useState } from 'react'
import { Button, Divider, Input, InputNumber, Popover, Radio, Switch } from 'antd';


const reducer= (state, action) => ({
  ...state,
  [action.type]: action.payload,
})


export function ConfigWordsLimit(props){
  const { extra }= props
  // const { forceRender }= useContext(ConfigsContext)
  // const [open, setOpen]= useState(false)
  let open = false
  const wordsLimitRef= {
    max: 10,
    min: 1,
    message: '输入字符数需要在1～10之间！',
    rules: {
      zh: 1, 
      others: 1, 
      blank: true,
    }
  }
  const CurrentRules=  wordsLimitRef.current.rules

  const handleOpen= (checked) => {
    extra.wordsLimit= checked ? wordsLimitRef.current : null
    open = checked
  }

  const handleChangeRules= (type, payload) => {
    //@ts-ignore
    wordsLimitRef.current[type]= payload
    // dispatch({type, payload})
    // forceRender()
  }

  const handleChangePropValue= (propName, newValue) => {
    // //@ts-ignore
    wordsLimitRef.current[propName]= newValue
    // forceRender()
  }

  return (
    <div>
      <strong>wordsLimit：</strong>
      <Switch checked={open} checkedChildren="开启" unCheckedChildren="关闭" onChange={handleOpen} />
      <Popover trigger="click" content={
        <div className="words-count-configs-content">
          <div>
            <span className="title">汉字：</span>
            <Radio.Group onChange={e => handleChangeRules('zh', e.target.value)} value={CurrentRules.zh}>
              <Radio value={1}>1个</Radio>
              <Radio value={2}>2个</Radio>
            </Radio.Group>
          </div>
          <Divider />
          <div>
            <span className="title">其它字符：</span>
            <Radio.Group onChange={e => handleChangeRules('others', e.target.value)} value={CurrentRules.others}>
              <Radio value={0.5}>0.5个</Radio>
              <Radio value={1}>1个</Radio>
            </Radio.Group>
          </div>
          <Divider />
          <div>
            <span className="title">空格：</span>
            <Radio.Group onChange={e => handleChangeRules('blank', e.target.value)} value={CurrentRules.blank}>
              <Radio value={true}>包含</Radio>
              <Radio value={false}>不包含</Radio>
            </Radio.Group>
          </div>
        </div>
        }>
        <Button type="link" size="small">字符数统计规则</Button>
      </Popover>
      {
        open && 
          <div className="configs-area">
            <Space>
              <strong>max：</strong>
              <InputNumber min={1} defaultValue={wordsLimitRef.current.max} onChange={value => handleChangePropValue('max', value)} bordered={false} />
            </Space>
            <Space>
              <strong>min：</strong>
              <InputNumber min={0} defaultValue={wordsLimitRef.current.min} onChange={value => handleChangePropValue('min', value)} bordered={false} />
            </Space>
            <Space>
              <strong>message：</strong>
              <Input prefix='"' suffix='"' defaultValue={wordsLimitRef.current.message} onChange={e => handleChangePropValue('message', e.target.value)} />
            </Space>
          </div>
      }
    </div>
  )
}