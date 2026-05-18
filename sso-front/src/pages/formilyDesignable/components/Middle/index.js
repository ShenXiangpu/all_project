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




    get createProps() {
        const { schemaList } = this.props

        const { formProps, schemaModelJSONCache } = this.state

        return {
            schemaList,
            formProps: formProps,
            schemaModelJSONCache,
            onGetSchemaModel: (value) => {

            }
        }
    }

    onClick(e ) {
        console.log(e);
    }


    render() {
        const { schemaList, activeSchema,setActiveSchema ,form} = this.props
        console.log(activeSchema);
        const { targetIndex, formProps } = this.state
        const DroppedItem = (index, key, targetIndex, schema) => {
            const { schemaList, activeSchema, setSchemaList, forceRender, setForceRender,} = this.props

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
                    onClick={e =>activateSchema(e)}
                    onDragEnd={handleDragEnd}
                    onDragEnter={handleDragEnter}
                    key={key}
                >
                    <Button type="text" className={styles.deleteButt} onClick={deleteSchema}>X</Button>
                    <StandardFormItem form={form} class="div" onClick={e => this.onClick(e,this)} StandardInput={StandardInput} configs={configs} />
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
                        <Button onClick={this.clearAllSchemas}>clear</Button>
                    </div>
                </div>
                <Form  {...formProps} className={styles.leggoConfigsMiddleForm}>
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
