import React from "react"
import { Form, FormProps } from "antd"
import LeggoItem from "../../utils/LeggoItem"
import { Leggo } from "../../utils/Leggo"

const leggoStores= new WeakMap()


export function LeggoForm(props){
  const { leggo, onFieldsChange, form,...overlapFormProps }= props

  const { formProps, schemaList }= leggoStores.get(leggo.ref).schemaModel || {}

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

  return (
    <Form {...formProps} {...overlapFormProps} onSubmit={handleSubmit}>
      {
        schemaList?.map(schema => <LeggoItem form={form} key={schema.id} leggo={leggo} schema={schema} schemaList={schemaList} />)
      }
    </Form>
  )
}

LeggoForm.useLeggo= (schemaModel0, middleware, publicStates) => {
  let keyRef = {current:''};
  const setForceRender = () => {
    
  }
  let leggo= null
  if (!leggoStores.has(keyRef)) {
    leggo= new Leggo(keyRef, setForceRender, schemaModel0, middleware, publicStates)
    leggoStores.set(keyRef, leggo) 
  }

  return leggo || leggoStores.get(keyRef)
}