import React from "react"
import { Form, FormProps, Row, Col, Button, Input } from "antd"
import LeggoItem from "../../utils/LeggoItem"
import { Leggo } from "../../utils/Leggo"
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
  const { leggo, onFieldsChange, schemaModel, form, ...overlapFormProps } = props
  const { getFieldDecorator } = form

  const { formProps, schemaList } = leggoStores.get(leggo.ref).schemaModel || {}

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
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };




  const handleReset = e => {
    e.preventDefault();
    form.resetFields()
  };

  //取消 返回上一级
  const handleCancleClick = () => {
    const pathname = '/eduTraining'
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