import React, { PureComponent } from "react"
import StandardFormItem from "./StandardFormItem"
import { leggoItemStore } from "./itemStore"


class CreateLeggoItem extends PureComponent {
  state = {
    result: [],
    selectedStore: {}
  }

  componentDidMount() {
    const selectedStore = leggoItemStore['antd']
    let result = [];
    for (const value of Object.values(selectedStore)) {
      result.push(value)
    }
    this.setStateValue('result', result)
  }
  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }


  handleDragStart = (e) => {
    //@ts-ignore
    // debugger
    const schemaType = e.target.dataset.type
    e.dataTransfer.setData('text/plain', schemaType)
  }

  // for (const value of Object.values(selectedStore)) {
  //   // debugger
  //   const { type, StandardInput, configs } = value
  //   const item = (
  //     <div key={type} className="item" draggable onDragStart={handleDragStart} data-type={type}>
  //       <div className="item-forbidden">
  //         <StandardFormItem StandardInput={StandardInput} configs={configs} />
  //       </div>
  //     </div>
  //   )
  //   result.push(item)
  // }

  // return result
  render() {
    const { result } = this.state
    const { form } = this.props
    const resultEl =  (
      result && result.map((item) => {
        return (
          <div key={item.type} className="item" draggable onDragStart={this.handleDragStart} data-type={item.type}>
            <div className="item-forbidden">
              <StandardFormItem form={form} StandardInput={item.StandardInput} configs={item.configs} />
            </div>
          </div>
        )
      })
    )



    return (
      <div>
        {resultEl}
      </div>
    )
  }
}

export default CreateLeggoItem