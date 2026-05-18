import React, { PureComponent } from 'react'

import { Form, Input, Row, Col, Divider, Radio, DatePicker } from 'antd'
import moment from 'moment'
import ElseTextArea from './ElseTextArea'
import styles from './NeedInfoInput.less'
import Review from './Review'
import { isEqual } from 'lodash-es';
const { TextArea } = Input;



const InputGroup = Input.Group;
@Form.create()
class NeedInfoInput extends PureComponent {
  state = {

  }

  componentDidMount() {
    const { dispatch } = this.props


  }




  onChange = (e, array, objName) => {
    const { onChange } = this.props
    console.log(e);
    let name = e.target.value;
    if (!isEqual(name.indexOf('其他'), -1)) {
      console.log(objName);
      onChange(objName, true)
    } else {
      onChange(objName, false)
    }

  }





  render() {
    const dateFormat = 'YYYY年MM月DD日';

    const { form, designPackageRequirementsList, tapeOutPlanList, showReview, RequirementModel,
      TapeOutPlanModel, demandObj, ColProps, formItemLayout,leftReadOnly,rightReadOnly  } = this.props
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
            })(<Input className={styles.inputSty} style={{ width: 100, marginLeft: 10 }}  disabled={leftReadOnly}/>)
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
                  <Radio.Group disabled={rightReadOnly}>
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
                  <TextArea style={{ width: '250px' }}  disabled={rightReadOnly}/>
                )}
              </Form.Item>
            </div>
          </Row>
        </>
      )

    }



    return (
      <div className={styles.needContainer}>
        {/* 设计包需求 */}
        <Row>
          <Col
            {...ColProps}
          >
            <Row>
              <Form.Item
                label="设计包需求:"
                required={true}
                {...formItemLayout}
                colon={false}
                labelAlign="right"
              >
                {getFieldDecorator('requirementModel.optionName', {
                  initialValue: demandObj && demandObj.requirementModel && demandObj.requirementModel.optionName || '',
                  rules: [
                    {
                      required: true,
                      message: '请选择或填写设计包需求'
                    },
                  ],
                })(
                  <Radio.Group  disabled={leftReadOnly} onChange={e => this.onChange(e, designPackageRequirementsList, 'RequirementModel')}>
                    {designPackageRequirementsList.map(item => {
                      return (
                        <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                          {item.name}
                          {RequirementModel && isEqual(item.name, '其他IP') ? elseEle('requirementModel', '请填写') : null}
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
              {review('requirementModel', '')}
            </Col> : null
          }


        </Row>
        <Divider />

        {/* 流片计划 TapeOutPlanOptions*/}

        <Row>
          <Col
            {...ColProps}
          >
            <Row>
              <Form.Item
                label="流片计划:"
                required={true}
                {...formItemLayout}
                colon={false}
                labelAlign="right"
              >
                {getFieldDecorator('tapeOutPlanModel.optionName', {
                  initialValue: demandObj && demandObj.tapeOutPlanModel && demandObj.tapeOutPlanModel.optionName || '',
                  rules: [
                    {
                      required: true,
                      message: '请选择或填写流片计划'
                    },
                  ],
                })(
                  <Radio.Group  disabled={leftReadOnly} onChange={e => this.onChange(e, tapeOutPlanList, 'TapeOutPlanModel')}>
                    {tapeOutPlanList.map(item => {
                      return (
                        <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                          {item.name}
                          {/* {TapeOutPlanModel && isEqual(item.name, '其他IP') ? elseEle('tapeOutPlanModel', '请填写') : null} */}
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
              {review('tapeOutPlanModel', '')}
            </Col> : null
          }


        </Row>
        <Divider />

        {/* 芯片面积 ChipAreaOptions*/}
        <Row>
          <Col
            {...ColProps}
          >
            <Form.Item
              label="芯片面积:"
              required={true}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('chipAreaModel.optionName', {
                initialValue: '',
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择执行定期快照的时间'
                //   },

                // ],
              })(
                <InputGroup compact>
                  <>
                    <Form.Item
                      required={true}
                      style={{ width: '120px' }}
                    >
                      {getFieldDecorator('chipAreaModel.left', {
                        initialValue: demandObj && demandObj.chipAreaModel && demandObj.chipAreaModel.left || '',
                        rules: [
                          {
                            required: true,
                            message: '请输入'
                          },

                        ],
                      })(
                        <Input   disabled={leftReadOnly} style={{ width: '100%' }} addonAfter="mm" />
                      )}
                    </Form.Item>
                  </>

                  <span className={styles.span}> * </span>
                  <>
                    <Form.Item
                      style={{ width: '120px' }}
                      required={true}

                    >
                      {getFieldDecorator('chipAreaModel.right', {
                        initialValue: demandObj && demandObj.chipAreaModel && demandObj.chipAreaModel.right || '',
                        rules: [
                          {
                            required: true,
                            message: '请输入'
                          },

                        ],
                      })(
                        <Input   disabled={leftReadOnly} style={{ width: '100%' }} addonAfter="mm" />
                      )}
                    </Form.Item>
                  </>
                </InputGroup>
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('chipAreaModel', '')}
            </Col> : null
          }
        </Row>
        <Divider />

        {/* IP Merge IPMergeOptions*/}
        <Row>
          <Col
            {...ColProps}
          >
            <Form.Item
              label="IP Merge:"
              required={true}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('ipMergeModel.optionName', {
                initialValue: demandObj && demandObj.ipMergeModel && demandObj.ipMergeModel.optionName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择是否IP Merge'
                  },
                ],
              })(
                <Radio.Group   disabled={leftReadOnly}>
                  <Radio value='1'>是</Radio>
                  <Radio value='0'>否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('ipMergeModel', '')}
            </Col> : null
          }

        </Row>
        <Divider />

        {/* 二次拼版 SecondaryImpositionOptions*/}
        <Row>
          <Col
            {...ColProps}
          >
            <Form.Item
              label="二次拼版:"
              required={true}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('secondMakeupModel.optionName', {
                initialValue: demandObj && demandObj.secondMakeupModel && demandObj.secondMakeupModel.optionName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择是否二次拼版'
                  },
                ],
              })(
                <Radio.Group   disabled={leftReadOnly}>
                  <Radio value='1'>是</Radio>
                  <Radio value='0'>否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('secondMakeupModel', '')}
            </Col> : null
          }

        </Row>
        <Divider />

        {/* 计划流片时间 ScheduleTheTapetimeOptions*/}
        <Row>
          <Col
            {...ColProps}
          >
            <Form.Item
              label="计划流片时间:"
              required={true}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('tapeOutDateModel.optionName', {
                initialValue: demandObj && demandObj.tapeOutDateModel && moment(demandObj.tapeOutDateModel.optionName) || '',
                rules: [
                  {
                    required: true,
                    message: '请选择计划流片时间'
                  },
                ],
              })(
                <DatePicker   disabled={leftReadOnly} format={dateFormat} />
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('tapeOutDateModel', '')}
            </Col> : null
          }

        </Row>
        <Divider />

        {/* 划片信息 SliceInformationOptions*/}
        <Row>
          <Col
            {...ColProps}
          >
            <Form.Item
              label="划片信息:"
              required={true}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('scribingInfoModel.optionName', {
                initialValue: demandObj && demandObj.scribingInfoModel && demandObj.scribingInfoModel.optionName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择划片信息'
                  },
                ],
              })(
                <Radio.Group   disabled={leftReadOnly}>
                  <Radio value='1'>是</Radio>
                  <Radio value='0'>否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('scribingInfoModel', '')}
            </Col> : null
          }

        </Row>
        <Divider />

        {/* 备注 */}
        <Row>
          <Col {...ColProps}>

            <Form.Item
              label="其它需求（请备注）:"
              required={false}
              {...formItemLayout}
              colon={false}
              labelAlign="right"
            >
              {getFieldDecorator('otherRequirementModel.optionName', {
                initialValue: demandObj && demandObj.otherRequirementModel && demandObj.otherRequirementModel.optionName || '',
                // rules: [
                //   {
                //     required: true,
                //     message: '请选择执行定期快照的时间'
                //   },
                // ],
              })(
                <TextArea style={{ width: '200px' }} disabled={leftReadOnly}/>
              )}
            </Form.Item>
          </Col>
          {
            showReview ? <Col {...ColProps}>
              {review('otherRequirementModel', '')}
            </Col> : null
          }
        </Row>
        <Divider />
        {showReview ? <>
          <Row>
            <Col {...ColProps}>
            </Col>
            <Col {...ColProps}>

              <Form.Item
                label="综合评审建议:"
                required={false}
                {...formItemLayout}
                colon={false}
                labelAlign="right"
              >
                {getFieldDecorator('reviewInfoModel.description', {
                  initialValue:  demandObj && demandObj.reviewInfoModel && demandObj.reviewInfoModel.description || '', 
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请选择执行定期快照的时间'
                  //   },
                  // ],
                })(
                  <TextArea style={{ width: '250px' }}   disabled={rightReadOnly}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Divider />


        </>
          : null}

      </div>
    )
  }
}

export default NeedInfoInput;
