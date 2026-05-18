import React from "react"
import { message } from "antd"
// import { TConfigs, TMiddleware, TSchemaModel, TWordsLimit } from "../interface"
import { wordsLimitValidator } from "./wordsLimitValidator"


export class Leggo {

  static createRules(rules, wordsLimit) {

    return wordsLimit ? [...rules, { validator: wordsLimitValidator.bind(null, wordsLimit) }] : rules
  }
  static createChildren(childrenNode) {

    if (!childrenNode) { return }
    const childrenType = typeof childrenNode
    if (childrenType === 'function') {
      const Node = childrenNode
      return <Node />
    }
    if (childrenType === 'string') {
      return childrenNode
    }
  }
  forceLeggoFormRender = () => { }
  ref
  schemaModel
  publicStates = {}
  allDisabledIsLockedToTrue = false
  forceRenderMark = false
  constructor(
    keyRef,
    setForceRender,
    schemaModel0,
    middleware,
    publicStates,
  ) {
    this.ref = keyRef
    this.schemaModel = this.parseSchemaModel(schemaModel0, middleware)
    if (publicStates) { this.publicStates = publicStates }
    this.forceLeggoFormRender = () => {
      this.forceRenderMark = !this.forceRenderMark
      setForceRender(pre => pre + 1)
    }
  }
  parseSchemaModel(schemaModel0, middleware) {
    try {
      schemaModel0?.schemaList.forEach((schema, index) => {
        schema.linkingStringedNames = new Set()
        schema.getStringedName = () => String(schema.configs.itemProps.name)
        middleware && middleware(schema.configs, index)
      })
    } catch (e) {
      // message.error('解析失败!')
      console.log(e);
    } finally {
      return schemaModel0
    }
  }
  resetSchemaModel(newSchemaModel0, middleware, publicStates) {
    this.schemaModel = this.parseSchemaModel(newSchemaModel0, middleware)
    if (publicStates) { this.publicStates = publicStates }
    this.forceLeggoFormRender()
  }
  updateSchema(formItemName, changeSchemaFunc) {
    const targetSchema = this.schemaModel?.schemaList.find(schema => schema.getStringedName() === String(formItemName))
    if (targetSchema) {
      const { configs } = targetSchema
      changeSchemaFunc(configs)
      targetSchema.forceLeggoFormItemRender?.()
    }
  }
  lockAllDisabledToTrue(status) {
    this.allDisabledIsLockedToTrue = status
    this.schemaModel.schemaList.forEach(schema => schema.configs.inputProps.disabled = status)
    this.forceLeggoFormRender()
  }
}