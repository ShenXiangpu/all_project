import React from "react"
import { Form, FormProps, Row, Col, Button,Input } from "antd"
import LeggoItem from "../../../eduTrainingRegistration/utils/LeggoItem"
import { Leggo } from "../../../eduTrainingRegistration/utils/Leggo"
import { router } from 'umi'
const leggoStores = new WeakMap()
const ColProps = {
  xs: 24,
  sm: 24,
  xl: 24,
  md: 24,
  // style: {
  //   marginBottom: 16,
  // },
}

export function LeggoForm(props) {
  const { leggo, onFieldsChange, form, eduTraining, onHandleSubmit, ...overlapFormProps } = props
  const { schemaModel } = eduTraining
  const { name, remarks }  =  schemaModel
  const { formProps, schemaList } = leggoStores.get(leggo.ref).schemaModel || {}
  const { getFieldDecorator } = form
  // const handleFieldsChange= (changedFields, allFields) => {
  //   changedFields.forEach(({name, value}) => {
  //     const changedSchema= schemaList.find(schema => schema.getStringedName() === String(name))
  //     if(changedSchema){ 
  //       changedSchema.currentItemValue= value
  //       changedSchema.linkingStringedNames.forEach(linkingName => {
  //         const targetSchema= schemaList.find(schema => schema.getStringedName() === linkingName)
  //         targetSchema.forceLeggoFormItemRender()
  //       })
  //      }
  //   })
  //   onFieldsChange?.(changedFields, allFields)
  // }
  const handleSubmit = e => {
    e.preventDefault();
    let formUserFillItemList = [];
    schemaList.map(item => {
      console.log('item',item);
      let arrItem = {
        label: item.configs.itemProps.label,
        frontFieldId: item.id,
        userValue: '',
        type: item.type
      }
      console.log('arrItem',arrItem);
      formUserFillItemList.push(arrItem)
      // if (arrItem && arrItem.label != '') {
      //   formUserFillItemList.push(arrItem)
      // }
    })
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      formUserFillItemList.map(item => {
        for (const key in values) {
          if (item.frontFieldId == key) {
            console.log(typeof values[key])
            if (item.type == "checkboxGroup") {
              item.userValue = values[key].toString();
            } else {
              item.userValue = values[key];
            }
          }
        }
      })
      onHandleSubmit(formUserFillItemList)
    });
  };
  const formItemLayout = {

    labelCol: { span: 4 },
    wrapperCol: { span: 14 },

  }

  const handleReset = e => {
    e.preventDefault();
    form.resetFields()
  };

  //取消 返回上一级
  const handleCancleClick = () => {
    const pathname = '/eduTrainingRegistration'
    router.push({
      pathname
    })
  }

  return (
    <div>
      {schemaModel && schemaModel.name ?
        <div>
          {
            schemaModel && schemaModel.name ? <div style={{
              fontSize: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {schemaModel.name}
            </div> : null
          }

          <Form formLayout='vertical'  {...overlapFormProps} onSubmit={handleSubmit}>
            {
              schemaList?.map(schema => <LeggoItem form={form} key={schema.id} leggo={leggo} schema={schema} schemaList={schemaList} />)
            }
            {
              schemaModel && schemaModel.remarks ?
                <Row style={{ marginBottom: 16 }}>
                  <Col
                    {...ColProps}
                    align="left"
                  >
                    <Form.Item label="提示">
                      {getFieldDecorator('name', {
                        initialValue: schemaModel.remarks,
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })(
                        <Input.TextArea readOnly />
                      )}
                    </Form.Item>
                  </Col>

                </Row> : null
            }

            <Row style={{ marginBottom: 16 }}>
              <Col
                {...ColProps}
                align="left"
              >
                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >

                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
                  &nbsp;
                  &nbsp;
                  <Button type="default" onClick={handleReset}>
                    重置
                  </Button>
                  &nbsp;
                  &nbsp;
                  <Button onClick={handleCancleClick}>
                    取消
                  </Button>
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </div> : null
      }
    </div>

  )
}

LeggoForm.useLeggo = (schemaModel0, middleware, publicStates) => {
  let keyRef = { current: '' };
  const setForceRender = () => {

  }
  let leggo = null
  if (!leggoStores.has(keyRef)) {
    leggo = new Leggo(keyRef, setForceRender, schemaModel0, middleware, publicStates)
    leggoStores.set(keyRef, leggo)
  }

  return leggo || leggoStores.get(keyRef)
}