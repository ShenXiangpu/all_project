import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Divider, Input, InputNumber, Switch } from 'antd';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from '../../index.less'
import  ConfigInputProp  from './components/ConfigInputProps'
import ConfigStyle from './components/ConfigStyle'
import ConfigProp from './components/ConfigProp'

const { Step } = Steps;



@Form.create()
class Right extends PureComponent {
  state = {
    propCurrentValue: ''
  }

  componentDidMount() {
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

  get configProps() {
    
    const { updateRightProps } = this.props
    return {
      updateRightProps() {
        updateRightProps()
      }
    }
  }


  get configInputProps() {
    const { schemaList, activeSchema, updateRightProps,form } = this.props

    return {
      schemaList,
      activeSchema,
      form,
      updateRightProps() {
        updateRightProps()
      }
    }
  }


  render() {

    const { itemPropsEntries, inputPropsEntries, extraEntries, activeSchema, schemaList, updateRightProps } = this.props
    const { id, configs } = activeSchema.current || {}
    const { itemProps, inputProps, extra } = configs || {}

    // const ConfigProps = (propOwner, namepath, propName, propDefaultValue) => {
    //   const typeofPropDefaultValue = typeof propDefaultValue

    //   let propCurrentValue = propDefaultValue

    //   const handleChangePropValue = (e) => {
    //     debugger
    //     const newValue = e.currentTarget.value
    //     propOwner[propName] = newValue
    //     // debugger
    //     propCurrentValue = newValue
    //     // let activeSchema = {
    //     //   current:{
    //     //     configs:{
    //     //       itemProps:propOwner
    //     //     }
    //     //   }
    //     // }
    //     // setActiveSchema(activeSchema)
    //     updateRightProps()
    //   }

    //   switch (typeofPropDefaultValue) {
    //     case 'object':
    //       const propOwner = propDefaultValue
    //       const propOwnerEntries = Object.entries(propOwner)
    //       return (
    //         <div>
    //           <strong>{propName}：</strong>
    //           <div className="configs-area">
    //             {
    //               propOwnerEntries.map(([pName, value]) => {
    //                 return (ConfigProps(propOwner, [...namepath, pName], pName, value))
    //               }
    //               )
    //             }
    //           </div>
    //         </div>
    //       );
    //     case 'boolean':
    //       return (
    //         <div>
    //           <strong>{propName}：</strong>
    //           <Switch checked={propCurrentValue} onChange={handleChangePropValue} />
    //           {/* <LinkSet targetType='boolean' namepath={namepath} /> */}
    //         </div>
    //       );
    //     case 'string':
    //       return (
    //         <div>
    //           <strong>{propName}：</strong>
    //           <Input prefix='"' suffix='"' value={propCurrentValue} onChange={e => handleChangePropValue(e)} />
    //           {/* <LinkSet targetType='string' namepath={namepath} /> */}
    //         </div>
    //       );
    //     case 'number':
    //       return (
    //         <div>
    //           <strong>{propName}：</strong>
    //           <InputNumber value={propCurrentValue} onChange={e => handleChangePropValue(e)} bordered={false} />
    //           {/* <LinkSet targetType='number' namepath={namepath} /> */}
    //         </div>
    //       );
    //     default:
    //       return null;
    //   }
    // }



    return (
      <div className={styles.leggoConfigsRight}>
        <div className={styles.topArea}>
          <strong>属性配置</strong>
        </div>
        <div className={styles.scrollContainer}>
          <div className={styles.configsArea}>
            {/* <Divider>ItemProps</Divider> */}
            {
              Array.from(itemPropsEntries).map(([propName, value]) => {
                return (
                  <ConfigProp key={id + propName}
                    propOwner={itemProps}
                    namepath={['itemProps', propName]}
                    propName={propName}
                    propDefaultValue={value}
                    {...this.configProps}
                  />
                )

              }

              )
            }
          </div>
          <div className={styles.configsArea}>
            {/* <Divider>InputProps</Divider> */}
            {/* {
              activeSchema && activeSchema.current && activeSchema.current && <ConfigStyle key={id} />
            } */}
            {
              Array.from(inputPropsEntries).map(([propName, value]) => {
                return (
                  <ConfigInputProp key={id + propName}
                    propOwner={inputProps}
                    namepath={['inputProps', propName]}
                    propName={propName}
                    propDefaultValue={value}
                    {...this.configInputProps}
                  />
                )
              })
            }
          </div>
          {/* <div className={styles.configsArea}>
            <Divider>Extra</Divider>
            {
              extraEntries && Array.from(extraEntries).map(([propName, value]) =>
                <ConfigProp key={id + propName}
                  propOwner={extra}
                  namepath={['extra', propName]}
                  propName={propName}
                  propDefaultValue={value}
                />
              )
            }
          </div> */}
        </div>
      </div>
    )
  }
}

export default Right;
