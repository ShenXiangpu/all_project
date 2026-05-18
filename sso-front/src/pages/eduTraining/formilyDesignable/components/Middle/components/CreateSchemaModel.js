import { Button, Form, DatePicker, Input, Modal, Radio } from 'antd'
import { render } from 'nprogress'
import React, { Component } from 'react'
// import { ConfigsContext } from '../..'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@Form.create()
class CreateSchemaModel extends Component {
  //   const { formProps, schemaModelJSONCache } = props
  // const { schemaList, onGetSchemaModel } = useContext(ConfigsContext)
  // const [form] = Form.useForm()
  // const schemaModelJSON = useRef('')
  // const [visible, setVisible] = useState(false)
  // const [visibleJSON, setVisibleJSON] = useState(false)

  componentDidMount() {

  }

  state = {
    visibleJSON: false,
    visible: false,
    schemaModelJSON: {
      current: ''
    },
    modalList: [
      {
        "id": "1666837125403",
        "type": "inputTexArea",
        "configs": {
          "itemProps": {
            "name": "inputTexAreaie7",
            "label": "",
            "rules": [
              {
                "required": false,
                "message": "请输入"
              }
            ]
          },
          "inputProps": {
            "disabled": true,
            "placeholder": " Formality培训（10.17-18）\n \n 主办：中科芯云微电子科技有限公司\n （青岛EDA中心）\n Synopsys \n 时间：2022年10月17日-18日（周一~周二）\n 培训方式：Zoom+专业云平台 在线理论+Lab"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837187522",
        "type": "name",
        "configs": {
          "itemProps": {
            "name": "nameean",
            "label": "姓名",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入姓名！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入姓名！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837194219",
        "type": "dempt",
        "configs": {
          "itemProps": {
            "name": "demptv8b",
            "label": "公司/学校",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入公司/学校！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入公司/学校！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837198306",
        "type": "team",
        "configs": {
          "itemProps": {
            "name": "team462",
            "label": "部门/学院",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入部门/学院！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入部门/学院！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837204846",
        "type": "prof",
        "configs": {
          "itemProps": {
            "name": "proflgt",
            "label": "职位/专业",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入职位/专业！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入职位/专业！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837209686",
        "type": "workYears",
        "configs": {
          "itemProps": {
            "name": "workYears443",
            "label": "工作年限/在校年级",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入工作年限/在校年级！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入工作年限/在校年级！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837214971",
        "type": "phone",
        "configs": {
          "itemProps": {
            "name": "phonewf4",
            "label": "手机号",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入手机号！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入手机号！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837216732",
        "type": "email",
        "configs": {
          "itemProps": {
            "name": "emailpe7",
            "label": "邮箱",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入邮箱！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入邮箱！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837220077",
        "type": "booksAddress",
        "configs": {
          "itemProps": {
            "name": "booksAddressnh8",
            "label": "教材邮寄地址",
            "initialValue": "",
            "rules": [
              {
                "required": true,
                "message": "请输入教材邮寄地址！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "placeholder": "请输入教材邮寄地址！"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837230918",
        "type": "input",
        "configs": {
          "itemProps": {
            "name": "inputm70",
            "label": "",
            "initialValue": "",
            "rules": [
              {
                "required": false,
                "message": "请输入！"
              }
            ]
          },
          "inputProps": {
            "disabled": true,
            "placeholder": "报名后请在24小时内完成交费，否则学位不再保留。"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837276852",
        "type": "charges",
        "configs": {
          "itemProps": {
            "name": "chargesaja",
            "label": "收费标准",
            "rules": [
              {
                "required": false,
                "message": ""
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "rows": 8,
            "placeholder": "1.标准学费1600元/人；2.学费早鸟价1200元/人,即日起至10月11日前缴费可享受，仅限10个名额，先到先得；3.在校大学生，凭学生证可以享受800元/人优惠价格；4.青岛国际创新园区内，政府招商引资的微电子企业，每单位有一个免费参加培训的名额，超出名额按1200/人付费（需提供认定企业专用申请表<青岛EDA中心提供申请表>,企业盖章有效）。"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837296992",
        "type": "radioGroup",
        "configs": {
          "itemProps": {
            "name": "radioGrouppxo",
            "label": "交费类型",
            "rules": [
              {
                "required": true,
                "message": "请选择！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "options": [
              {
                "label": "1600元 标准缴费",
                "value": "1600元 标准缴费"
              },
              {
                "label": "1200元 早鸟价",
                "value": "1200元 早鸟价"
              },
              {
                "label": "800元 高校在校生",
                "value": "800元 高校在校生"
              }
            ]
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837298555",
        "type": "radioGroup",
        "configs": {
          "itemProps": {
            "name": "radioGrouph4a",
            "label": "是否已缴费",
            "rules": [
              {
                "required": true,
                "message": "请选择！"
              }
            ]
          },
          "inputProps": {
            "disabled": false,
            "options": [
              {
                "label": "已缴费",
                "value": "已缴费"
              },
              {
                "label": "未缴费",
                "value": "未缴费"
              },
              {
                "label": "免费",
                "value": "免费"
              }
            ]
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      },
      {
        "id": "1666837305005",
        "type": "inputTexArea",
        "configs": {
          "itemProps": {
            "name": "inputTexArea0a0",
            "label": "付款信息",
            "rules": [
              {
                "required": false,
                "message": "请输入"
              }
            ]
          },
          "inputProps": {
            "disabled": true,
            "placeholder": "户 名：中科芯云微电子科技有限公司\n开户行：中国建设银行青岛崂山支行\n账 号：37150198682700000951\n请于10月12日前，将报名费汇入以下账户，并在备注中注明（10月17日培训+公司/学校+学员姓名）"
          }
        },
        "currentItemValue": null,
        "needDefineGetterProps": {
        }
      }
    ]

  }

  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }


  handleClick = () => {
    const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel } = this.props
    const { form } = this.props
    const { visibleJSON, visible, schemaModelJSON,modalList } = this.state


    // const { name, description } = schemaModelJSONCache && schemaModelJSONCache.current
    form.setFieldsValue({})
    this.setStateValue('visible', true)

    let modal = JSON.stringify(schemaList)
    localStorage.setItem('modal', modal)
  }

  handleSend = (e) => {
    const { formProps, schemaModelJSONCache, schemaList, form, onHandleSubmit, onGetSchemaModel } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state
    const { validateFields, getFieldsValue } = form

    e.preventDefault();

    let trainDragFormList = [];
    schemaList.map(item => {
      let arrItem = {
        lebel: item.configs.itemProps.label,
        type: item.type,
        field: item.id
      }
      trainDragFormList.push(arrItem)
    })
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      // const signStartDate = values.date[0].format('YYYY-MM-DD')
      // const signEndDate = values.date[1].format('YYYY-MM-DD')
      const schemaModel = { ...values, formProps, schemaList }
      schemaModelJSON.current = JSON.stringify(schemaModel, null, 4)
      schemaModelJSONCache.current = schemaModelJSON.current
      let formJson = schemaModelJSONCache.current
      values = {
        ...getFieldsValue(),
        trainDragFormList,
        formJson,
        // signEndDate,
        // signStartDate
      }
      console.log(values);
      this.setStateValue('visible', false)
      onHandleSubmit(values)
    })
  }

  // handleCopy = () => {
  //   const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel } = this.props
  //   const { visibleJSON, visible, schemaModelJSON } = this.state
  //   navigator.clipboard.writeText(schemaModelJSON.current)
  //   this.setStateValue('visibleJSON', false)
  // }

  // handleOk = (e) => {
  //   e.preventDefault();
  //   const { form } = this.props
  //   const { validateFields, getFieldsValue } = form

  //   validateFields(errors => {
  //     if (errors) {
  //       return
  //     }
  //     const data = {
  //       ...getFieldsValue(),
  //     }
  //   })
  // }

  render() {
    const { formProps, schemaModelJSONCache, schemaList, onGetSchemaModel, form, id } = this.props
    const { visibleJSON, visible, schemaModelJSON } = this.state
    const { getFieldDecorator } = form
    return (
      <>
        <Button type="primary" disabled={!(schemaList && schemaList.length > 0)} onClick={this.handleClick}>生成模板</Button>
        <Modal title="生成并发送模板" visible={visible} onOk={this.handleSend} onCancel={() => this.setStateValue('visible', false)} getContainer={false}>
          <Form {...layout} >
            <Form.Item label='培训表单名称' style={{ display: 'none' }}>
              {getFieldDecorator('trainId', {
                initialValue: Number(id),
                rules: [
                  {
                    required: true,
                    message: '请填写培训表单名称！'
                  },
                ],
              })(
                <Input placeholder="请填写培训表单名称！" />
              )}
            </Form.Item>
            <Form.Item label='培训表单名称'>
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请填写培训表单名称！'
                  },
                ],
              })(
                <Input placeholder="请填写培训表单名称！" />
              )}
            </Form.Item>
            <Form.Item label='表单类型'>
              {getFieldDecorator('type', {
                initialValue: 'SG',
                rules: [
                  {
                    required: true,
                    message: '请选择表单类型'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio.Button value="SG">报名</Radio.Button>
                  <Radio.Button disabled value="QA">QA</Radio.Button>
                  <Radio.Button disabled value="EV">评价</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            {/* <Form.Item label='报名时间'>
              {getFieldDecorator('date', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请选择报名时间！'
                  },
                ],
              })(
                <RangePicker />
              )}
            </Form.Item> */}
            <Form.Item label="描述">
              {getFieldDecorator('remarks', {
                initialValue: '',
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择报名时间！'
                //   },
                // ],
              })(
                <Input.TextArea />
              )}
            </Form.Item>
          </Form>
        </Modal>
        {/* <Modal title="schemaModel"
          width='50vw'
          bodyStyle={{ height: '60vh', overflow: 'auto' }}
          visible={visibleJSON}
          onOk={this.handleCopy}
          okText="复制"
          onCancel={() => this.setStateValue('visibleJSON', false)}
        >
          <pre>{schemaModelJSON.current}</pre>
        </Modal> */}
      </>
    )
  }
}

export default CreateSchemaModel;