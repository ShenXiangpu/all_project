import { cloneDeep } from "lodash"


export class LeggoSchema{
  id
  type
  configs
  currentItemValue
  needDefineGetterProps
  constructor(schemaType,leggoItemInfo){
    this.id= Date.now().toString()
    this.type= schemaType
    this.configs= cloneDeep(leggoItemInfo).configs
    this.currentItemValue= null
    this.needDefineGetterProps= {}
    const name= this.configs.itemProps.name
    if(name !== undefined){
      this.configs.itemProps.name= name + Math.random().toString(36).substring(2, 5)
    }
  }
  getStringedName= () => String(this.configs.itemProps.name)
}