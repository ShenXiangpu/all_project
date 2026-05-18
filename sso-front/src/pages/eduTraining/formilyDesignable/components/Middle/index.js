import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Button } from 'antd';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from '../../index.less'
import CreateSchemaModel from './components/CreateSchemaModel'
import { leggoItemStore } from '../../utils/itemStore'
import { LeggoSchema } from '../../utils/LeggoSchema'
import StandardFormItem from '../../utils/StandardFormItem'




const defaultFormProps = {
    name: undefined,
    labelCol: { span: 6, offset: 0 },
    wrapperCol: { span: 14, offset: 0 },
    colon: true,
    labelAlign: 'right',
    layout: 'horizontal',
    scrollToFirstError: false,
    size: undefined,
    validateTrigger: 'onChange',
    preserve: true,
    requiredMark: true,
}

@Form.create()
class Middle extends Component {
    state = {
        targetIndex: {
            current: ''
        },
        formProps: defaultFormProps,
        schemaModelJSONCache: {

        },
        useDisablsed: false,
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
                        "placeholder": "请输入手机号！",
                        "maxLength": 11
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

    componentDidMount() {
    }

    // componentDidUpdate(prevProps, prevState) {

    //     const { schemaList, activeSchema, updateRightProps } = this.props
    //     if (prevProps.schemaList !== schemaList && prevState.activeSchema !== activeSchema) {
    //         updateRightProps()
    //     }
    // }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }

    handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }

    handleDrop = (e) => {
        debugger
        const { setSchemaList, schemaList } = this.props
        e.preventDefault()
        const schemaType = e.dataTransfer.getData('text/plain')
        if (!schemaType) { return }
        const leggoItemInfo = leggoItemStore.total[schemaType]
        const newSchema = new LeggoSchema(schemaType, leggoItemInfo)
        if (schemaList && schemaList.length > 0) {
            setSchemaList([...schemaList, newSchema])
        } else {
            setSchemaList([newSchema])
        }
    }

    clearAllSchemas = () => {
        const { setSchemaList, setActiveSchema } = this.props
        let activeSchema = {
            current: null
        }
        setActiveSchema(activeSchema)
        setSchemaList([])
    }

    cancleAndReturn = () => {
        const { onCancleRetrun } = this.props
        onCancleRetrun()
    }




    get createProps() {
        const { schemaList, id, onHandleSubmit } = this.props

        const { formProps, schemaModelJSONCache } = this.state

        return {
            id,
            schemaList,
            formProps: formProps,
            schemaModelJSONCache,
            onHandleSubmit,
            onGetSchemaModel: (value) => {

            }
        }
    }

    onClick(e) {
        console.log(e);
    }
    useModalTable = () => {
        const { schemaList, activeSchema, setSchemaList, forceRender, setForceRender, } = this.props
        const { modalList } = this.state
        // modal = JSON.parse(modalList)
        setSchemaList(modalList)
    }


    render() {
        const { schemaList, activeSchema, setActiveSchema, form } = this.props
        const { targetIndex, formProps, useDisablsed } = this.state
        const DroppedItem = (index, key, targetIndex, schema) => {
            const { schemaList, activeSchema, setSchemaList, forceRender, setForceRender, } = this.props

            const { id, type, configs } = schema
            const active = activeSchema && activeSchema.current === schema
            const StandardInput = leggoItemStore.total[type].StandardInput

            const deleteSchema = (e) => {
                e.stopPropagation()
                if (active) { activeSchema.current = null }
                let nolist = schemaList.filter(it => it.id !== id)
                setSchemaList(nolist)
                setActiveSchema({})
                let preforceRender = forceRender
                setForceRender(preforceRender)
            }

            const activateSchema = (e) => {
                const { schemaList, setSchemaList, forceRender, setForceRender, setActiveSchema } = this.props
                e.stopPropagation()
                let activeSchema = {
                    current: schema
                }
                setActiveSchema(activeSchema)
                console.log('activeSchema123', activeSchema);
                let preforceRender = forceRender
                setForceRender(preforceRender)
            }

            const handleDragEnter = () => {
                targetIndex.current = index
            }

            const handleDragEnd = () => {
                const { schemaList, activeSchema, setSchemaList, forceRender, setForceRender } = this.props
                let preSchemaList = schemaList
                const temp = preSchemaList[targetIndex.current]
                preSchemaList[targetIndex.current] = preSchemaList[index]
                preSchemaList[index] = temp
                setSchemaList(preSchemaList)
                let preforceRender = forceRender
                setForceRender(preforceRender)
            }

            return (
                <div draggable
                    className={`${styles.droppedItem} ${active ? styles.activeItem : ''}`}
                    onClick={e => activateSchema(e)}
                    onDragEnd={handleDragEnd}
                    onDragEnter={handleDragEnter}
                    key={key}
                >
                    <Button type="text" className={styles.deleteButt} onClick={deleteSchema}>X</Button>
                    <StandardFormItem form={form} class="div" onClick={e => this.onClick(e, this)} StandardInput={StandardInput} configs={configs} />
                </div>
            )
        }


        return (
            <div className={styles.leggoConfigsMiddle}>
                <div className={styles.topArea}>
                    <strong>表单模板</strong>
                    <div className={styles.topActions}>
                        {/* <FormPropsSettingModal formProps={formProps} visible={visible} setVisible={setVisible} /> */}
                        {/* <InjectSchemaModel schemaModelJSONCache={schemaModelJSONCache} /> */}
                        <CreateSchemaModel {...this.createProps} />
                        <Button type='primary' disabled={useDisablsed} onClick={this.useModalTable} style={{ width: '100px' }}>使用模板</Button>

                        <div>
                            <Button onClick={this.clearAllSchemas}>清空模板</Button> &nbsp; &nbsp; &nbsp;
                            <Button onClick={this.cancleAndReturn}>退回首页</Button>
                        </div>

                    </div>
                </div>
                <Form formLayout='vertical' className={styles.leggoConfigsMiddleForm}>
                    <div className={styles.dropArea} onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        {
                            schemaList && schemaList.map((schema, index) => {
                                return (
                                    DroppedItem(index, schema.id, targetIndex, schema)
                                )
                            })
                        }
                    </div>
                </Form>
            </div>
        )
    }
}

export default Middle;
