import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Radio, Divider, message } from 'antd'
import Review from './Review'
import ElseTextArea from './ElseTextArea'
import styles from './ProInfoCheck.less'
import { isEqual, isWeakMap } from 'lodash-es'
const { TextArea } = Input;


const ColProps = {
    xs: 24,
    sm: 12,
    xl: 12,
    md: 8,
    // style: {
    //   marginBottom: 16,
    // },
}





const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
    },
};


@Form.create()
class ProInfoCheck extends PureComponent {
    state = {

    }
    componentDidMount() {



    }





    onChange = (e, array, objName) => {
        const { onChange } = this.props
        console.log(e);
        let name = e.target.value;
        if (!isEqual(name.indexOf('其他'), -1)) {
            // this.setStateValue(objName, true)
            onChange(objName, true)
        } else {
            // this.setStateValue(objName, false)
            onChange(objName, false)
        }

    }



    render() {


        const {
            form,
            showReview,
            foundryList,
            processNodesList,
            processTypeList,
            processCharacteristicsList,
            polyAndMetalList,
            topMetalList,
            capacitanceList,
            resistanceList,
            corevoltageList,
            iovoltageList,
            demandObj,



            FoundryModel,
            ProcessNodeModel,
            ProcessTypeModel,
            ProcessCharacterModel,
            PloyMetalModel,
            TopMetalModel,
            CapacitanceModel,
            ResistanceModel,
            CoreVoltageModel,
            IoVoltageModel,

            leftReadOnly,
            rightReadOnly


        } = this.props
        const { getFieldDecorator } = form

        const elseEle = (name, message) => {

            return (
                < Form.Item className={styles.elseEle} style={{ display: 'inline-block', margin: '0' }}
                    required={true}
                >
                    {
                        getFieldDecorator(`${name}.elseName`, {
                            initialValue: demandObj[`${name}`] && demandObj[`${name}`].elseName || '',
                            rules: [
                                {
                                    required: true,
                                    message: `${message || '请输入'}`
                                },
                            ],
                        })(<Input disabled={leftReadOnly} className={styles.inputSty} style={{ width: 100, marginLeft: 10 }} />)
                    }
                </Form.Item>)
        }
        const reviewLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 1 },
                sm: { span: 15 },
            },
        };

        const review = (name, message) => {
            const { reviewLayout } = this.props
            return (
                <>
                    <Row>
                        <div>
                            <Form.Item
                                label="能否满足该项客户需求:"
                                required={true}
                                {...reviewLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator(`${name}.reviewStatus`, {
                                    initialValue: demandObj[`${name}`] && demandObj[`${name}`].reviewStatus || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: message || '请选择'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={rightReadOnly} >
                                        <Radio value={1}>满足</Radio>
                                        <Radio value={2}>不满足</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>

                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Form.Item
                                label="备注:"
                                required={false}
                                {...reviewLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator(`${name}.reviewRemark`, {
                                    initialValue: demandObj[`${name}`] && demandObj[`${name}`].reviewRemark || '',
                                    rules: [
                                        {
                                            required: false,
                                            message: message || ''
                                        },
                                    ],
                                })(
                                    <TextArea disabled={rightReadOnly} style={{ width: '250px' }} />
                                )}
                            </Form.Item>
                        </div>
                    </Row>
                </>
            )

        }

        /**
         * 找其他参数
         */





        // 顶层金属
        return (
            <div className={styles.proContainer}>
                {/* <Form> */}
                {/* 代工厂 */}
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="代工厂:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('foundryModel.optionName', {
                                    initialValue: demandObj && demandObj.foundryModel && demandObj.foundryModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写代工厂'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, foundryList, 'FoundryModel')}>
                                        {foundryList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {FoundryModel && isEqual(item.name, '其他') ? elseEle('foundryModel', '请填写') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>

                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('foundryModel', '')}
                        </Col> : null
                    }


                </Row>
                {/* 工艺节点 */}
                <Divider />
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="工艺节点:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('processNodeModel.optionName', {
                                    initialValue: demandObj && demandObj.processNodeModel && demandObj.processNodeModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺节点'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, processNodesList, 'ProcessNodeModel')}>
                                        {processNodesList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {ProcessNodeModel && isEqual(item.name, '其他') ? elseEle('processNodeModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>

                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('processNodeModel', '')}
                        </Col> : null
                    }

                </Row>
                {/* 工艺类型 */}
                <Divider />
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="工艺类型:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('processTypeModel.optionName', {
                                    initialValue: demandObj && demandObj.processTypeModel && demandObj.processTypeModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺节点'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, processTypeList, 'ProcessTypeModel')}>
                                        {processTypeList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {ProcessTypeModel && isEqual(item.name, '其他') ? elseEle('processTypeModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>

                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('processTypeModel', '')}
                        </Col> : null
                    }
                </Row>
                <Divider />
                {/* 工艺特征 */}
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="工艺特征:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('processCharacterModel.optionName', {
                                    initialValue: demandObj && demandObj.processCharacterModel && demandObj.processCharacterModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, processCharacteristicsList, 'ProcessCharacterModel')}>
                                        {processCharacteristicsList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {ProcessCharacterModel && isEqual(item.name, '其他') ? elseEle('processCharacterModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('processCharacterModel', '')}
                        </Col> : null
                    }

                </Row>

                <Divider />
                {/* Poly和Metal的使用 */}

                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="Poly和Metal的使用:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('ployMetalModel.optionName', {
                                    initialValue: demandObj && demandObj.ployMetalModel && demandObj.ployMetalModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, polyAndMetalList, 'PloyMetalModel')}>
                                        {polyAndMetalList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {PloyMetalModel && isEqual(item.name, '其他') ? elseEle('ployMetalModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>

                    {
                        showReview ? <Col {...ColProps}>
                            {review('ployMetalModel', '')}
                        </Col> : null
                    }

                </Row>
                <Divider />
                {/* 顶层金属 */}
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="顶层金属:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('topMetalModel.optionName', {
                                    initialValue: demandObj && demandObj.topMetalModel && demandObj.topMetalModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, topMetalList, 'TopMetalModel')}>
                                        {topMetalList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {TopMetalModel && isEqual(item.name, '其他') ? elseEle('topMetalModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('topMetalModel', '')}
                        </Col> : null
                    }
                </Row>

                <Divider />
                {/* 电容 */}
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="电容:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('capacitanceModel.optionName', {
                                    initialValue: demandObj && demandObj.capacitanceModel && demandObj.capacitanceModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, capacitanceList, 'CapacitanceModel')}>
                                        {capacitanceList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {CapacitanceModel && isEqual(item.name, '其他') ? elseEle('capacitanceModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('capacitanceModel', '')}
                        </Col> : null
                    }
                </Row>
                <Divider />
                {/* 电阻 */}

                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="电阻:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('resistanceModel.optionName', {
                                    initialValue: demandObj && demandObj.resistanceModel && demandObj.resistanceModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, resistanceList, 'ResistanceModel')}>
                                        {resistanceList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {ResistanceModel && isEqual(item.name, '其他') ? elseEle('resistanceModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('resistanceModel', '')}
                        </Col> : null
                    }
                </Row>
                <Divider />
                {/* Core电压 */}

                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="Core电压:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('coreVoltageModel.optionName', {
                                    initialValue: demandObj && demandObj.coreVoltageModel && demandObj.coreVoltageModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, corevoltageList, 'CoreVoltageModel')}>
                                        {corevoltageList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {CoreVoltageModel && isEqual(item.name, '其他') ? elseEle('coreVoltageModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('coreVoltageModel', '')}
                        </Col> : null
                    }
                </Row>

                <Divider />
                {/* IO器件电压 */}

                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="IO器件电压:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('ioVoltageModel.optionName', {
                                    initialValue: demandObj && demandObj.ioVoltageModel && demandObj.ioVoltageModel.optionName || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择或填写工艺特征'
                                        },
                                    ],
                                })(
                                    <Radio.Group disabled={leftReadOnly} onChange={e => this.onChange(e, iovoltageList, 'IoVoltageModel')}>
                                        {iovoltageList.map(item => {
                                            return (
                                                <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                                                    {item.name}
                                                    {IoVoltageModel && isEqual(item.name, '其他') ? elseEle('ioVoltageModel', '') : null}
                                                </Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Row>

                    </Col>
                    {
                        showReview ? <Col {...ColProps}>
                            {review('ioVoltageModel', '')}
                        </Col> : null
                    }
                </Row>

                <Divider />
                <Row>
                    <Col
                        {...ColProps}
                    >
                        <Row>
                            <Form.Item
                                label="产品应用方向:"
                                required={true}
                                {...formItemLayout}
                                colon={false}
                                labelAlign="right"
                            >
                                {getFieldDecorator('applyDirection', {
                                    initialValue: demandObj && demandObj.applyDirection || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入产品应用方向'
                                        },
                                    ],
                                })(
                                    <Input disabled={leftReadOnly} placeholder='请输入产品应用方向' style={{ width: '50%' }} />
                                )}
                            </Form.Item>
                        </Row>
                    </Col>
                </Row>
                {/* </Form> */}
                <Divider />
            </div>
        )
    }
}

export default ProInfoCheck;
