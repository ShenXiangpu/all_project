import React, { PureComponent } from 'react'

import { Form, Row, Col, Input, Radio, Divider, Checkbox, Select, Button, DatePicker, message } from 'antd'
import styles from './BasicInfoInput.less'
import { isEqual } from 'lodash-es';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment'

const { Option } = Select
const ColProps = {
  xs: 24,
  sm: 12,
  xl: 8,
  md: 8,
}

const ProcessColProps = {
  xs: 24,
  sm: 24,
  xl: 24,
  md: 24,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 9 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  }
}
const ProcessFormItemLayout = {
  labelCol: {
    xs: { span: 3 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  }
}







class BasicInfoInput extends PureComponent {
  constructor(props) {
    super(props)
    this.forms = React.createRef()
    this.state = {
      option1: '-请选择-', //默认值
      option2: '-请选择-', //默认值
      option3: '-请选择-', //默认值
      optionsList: [
        { num: '-请选择-', isCheck: false },
        { num: '1', isCheck: false },
        { num: '2', isCheck: false },
        { num: '3', isCheck: false }
      ],
    }
  }







  onChange = (e, objName) => {
    const { onChange } = this.props
    console.log(e);
    let name = e.target.value;
    if (!isEqual(name.indexOf('Other'), -1)) {
      console.log(objName);
      onChange(objName, true)
    } else {
      onChange(objName, false)
    }
  }

  onCheckChange = (e, objName) => {
    const { onChange } = this.props
    console.log(e);
    let values = e
    if (values.includes('Other', 0)) {
      console.log(objName);
      onChange(objName, true)
    } else {
      onChange(objName, false)
    }

  }

  //控制E801和E902显示内容
  onCpuShow = (e, str, objName) => {
    let name = e.target.value;
    const { onChange } = this.props
    console.log(e);
    if (isEqual(name, str)) {
      onChange(objName, true)
    } else {
      onChange(objName, false)
    }

  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  //处理选择框的变化
  /**
   * 1.点击框，选中数字，对应的isCheck为true
   * 2.选择isCheck为true的值，其他的选择框的值，为默认值
   * @param {*} e 
   */
  handleChange = (e) => {
    const { optionsList, option1, option2, option3 } = this.state;
    console.log('this.forms', this.forms);

    this.setStateValue(option1, '1')
  }

  /**
   *  提交信息 
   * @returns 
   */
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, onSubmit } = this.props
    const { validateFieldsAndScroll } = form

    const { getFieldsValue } = form
    // const values = getFieldsValue();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      let value1 = values.value1;
      let value2 = values.value2;
      let value3 = values.value3;
      if (value1 === value2 || value2 === value3 || value1 === value3) {
        message.error('Area,Speed,Power值不能相同！')
        return
      }
      values.optimizationPriorities = `${values.value1},${values.value2},${values.value3}`
      values.process = values.process && values.process.join()
      values.plannedTapeOutDate = moment(values.plannedTapeOutDate).format('YYYY-MM-DD')
      onSubmit(values)
    })


  }

  handleCancle = () => {
    const {  onCancle } = this.props
    onCancle();
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current - 1 && current - 1 <= moment().subtract(1, 'days').endOf('day');

  }

  render() {

    const {
      form,
      foundryName,
      foundryModel,
      process,
      processModel,
      CPUSeries,
      CPUModel,
      multiplyType,
      tightlyCoupledIP,
      HWBreakpoint,
      Cache,
      PMPRegions,
      CLIC,
      RVISA,
      RVISAModel,
      MultiplierType,
      loading
    } = this.props;
    const { getFieldDecorator } = form;

    const { optionsList, option1, option2, option3 } = this.state;

    const Title = (title) => {
      return (
        <div className={styles.titleContainer} >
          <div className={styles.left}></div><div className={styles.right}>{title}</div>
        </div>
      )
    }

    // 点击其他填写内容
    const elseEle = (name, message) => {

      return (
        < Form.Item className={styles.elseEle} style={{ display: 'inline-block', margin: '0' }}
          required={true}
        >
          {
            getFieldDecorator(`${name}`, {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: `${message || '请输入'}`
                },
              ],
            })(<Input className={styles.inputSty} style={{ width: 100, marginLeft: 10 }} />)
          }
        </Form.Item>)
    }
    // Technode and Process 部分
    const Technode = () => {

      return (
        < Form.Item className={styles.Technode} style={{ display: 'inline-block', margin: '0' }}
          required={true}
        >
          {
            getFieldDecorator(`technode`, {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: `请输入`
                },
              ],
            })(<Input className={styles.inputSty} style={{ width: 80, marginLeft: 10 }} />)
          }
        </Form.Item>)
    }
    // 选择部分
    const selectOptionEl = (name, option, defaultValue) => {
      return (
        < Form.Item required={true}>
          {
            getFieldDecorator(`${name}`, {
              initialValue: `${defaultValue}`,
              rules: [
                {
                  required: true,
                  message: `请选择`
                },
              ],
            })(
              <Select style={{ width: 100 }} onChange={(e) => this.handleChange(e)}>


                {option && option.map(item => {
                  return (
                    <Option value={item.num}>{item.num}</Option>
                  )
                })}

                {

                }
              </Select>
            )
          }
        </Form.Item>)
    }




    return (
      <div className={styles.basicContainer} >
        <Form ref={this.forms}>
          <Row style={{ marginBottom: 16 }}>
            {Title('客户项目信息')}
          </Row>
          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ColProps}
            >
              <Form.Item label="Company Name" {...formItemLayout}>
                {getFieldDecorator('companyName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入单位全称",
                    },
                    // {
                    //   pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                    //   // pattern: /^(?!\d*$)/,
                    //   message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    // },
                  ],
                })(
                  <Input placeholder="请输入公司名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="Contact Person" {...formItemLayout}>
                {getFieldDecorator('contactPerson', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入联系人",
                    },
                  ],
                })(
                  <Input placeholder="请输入联系人" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Telephone" {...formItemLayout}>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入联系电话",
                    },
                    {
                      pattern: /^1[3456789]\d{9}$/,
                      message: "手机号码格式不正确，请重新输入"
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input placeholder="请输入联系电话" />

                )}
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="E-mail" {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入电子邮箱",
                    },
                    {
                      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确',
                    },
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input placeholder="请输入电子邮箱" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Project Name" {...formItemLayout}>
                {getFieldDecorator('projectName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入项目名称",
                    },
                  ],
                })(
                  <Input placeholder="请输入项目名称" />

                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Application(应用方向)" {...formItemLayout}>
                {getFieldDecorator('application', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入应用方向",
                    },
                  ],
                })(
                  <Input placeholder="请输入应用方向" />

                )}
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Target Frequency" {...formItemLayout}>
                {getFieldDecorator('targetFrequency', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "Target Frequency",
                    },
                  ],
                })(
                  <Input placeholder="请输入目标频率" />

                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Planned Tape Out Date" {...formItemLayout}>
                {getFieldDecorator('plannedTapeOutDate', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请选择预期流片日期",
                    },
                  ],
                })(
                  <DatePicker
                    disabledDate={this.disabledDate}
                  />

                )}
              </Form.Item>
            </Col>

            <Col
              {...ColProps}
              align="left"
            >
              <Form.Item label="Other Comments" {...formItemLayout}>
                {getFieldDecorator('customerComments', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入其他意见",
                    },
                  ],
                })(
                  <Input placeholder="其他意见" />

                )}
              </Form.Item>
            </Col>

          </Row>
          <Row style={{ marginBottom: 16 }}>
            {Title('进程信息')}
          </Row>
          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ProcessColProps}
            >
              {/* <Row> */}
              <Form.Item
                label="foundry name"
                required={true}
                {...ProcessFormItemLayout}
                colon={true}
                labelAlign="right"
              >
                {getFieldDecorator('foundryName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请选择或填写设计包需求'
                    },
                  ],
                })(
                  <Radio.Group onChange={e => this.onChange(e, 'foundryModel')}>
                    {foundryName && foundryName.map(item => {
                      return (
                        <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                          {item.name}
                          {foundryModel && isEqual(item.name, 'Other') ? elseEle('foundryNameOther', '请填写') : null}
                        </Radio>
                      )
                    })}
                  </Radio.Group>

                )}
              </Form.Item>
              {/* </Row> */}

            </Col>
          </Row>
          <Divider />
          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ProcessColProps}
            >
              {/* <Row> */}
              <Form.Item
                label="Technode and Process"
                required={true}
                {...ProcessFormItemLayout}
                colon={true}
                labelAlign="right"
              >
                {getFieldDecorator('process', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请选择或填写设计包需求'
                    },
                  ],
                })(
                  <Checkbox.Group onChange={e => this.onCheckChange(e, 'processModel')}>

                    {Technode()}nm &nbsp;&nbsp;

                    {process && process.map(item => {
                      return (
                        <Checkbox style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                          {item.name}
                          {processModel && isEqual(item.name, 'Other') ? elseEle('processOther', '请填写') : null}
                        </Checkbox >
                      )
                    })}
                  </Checkbox.Group>


                )}
              </Form.Item>
              {/* </Row> */}

            </Col>
          </Row>
          <Divider />
          <Row style={{ marginBottom: 16 }}>
            {Title('CPU 信息')}
          </Row>
          <Row style={{ marginBottom: 16 }}>
            <Col
              {...ProcessColProps}
            >
              {/* <Row> */}
              <Form.Item
                label="CPUSeries"
                required={true}
                {...ProcessFormItemLayout}
                colon={true}
                labelAlign="right"
              >
                {getFieldDecorator('cpuSeries', {
                  initialValue: CPUSeries[0].name,
                  rules: [
                    {
                      required: true,
                      message: '请选择或填写设计包需求'
                    },
                  ],
                })(
                  <Radio.Group onChange={e => this.onCpuShow(e, CPUSeries[0].name, 'CPUModel')}>
                    {CPUSeries && CPUSeries.map(item => {
                      return (
                        <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                          {item.name}
                        </Radio>
                      )
                    })}
                  </Radio.Group>

                )}
              </Form.Item>
              {/* </Row> */}

            </Col>
          </Row>
          <Divider />
          {CPUModel ?
            <>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="Multiply Type"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('multiplyType', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group >
                        {multiplyType && multiplyType.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>

              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="Tightly Coupled IP"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('tightlyCoupledIp', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group >
                        INTC (<Radio value={'16'} style={{ padding: '10px 0', margin: '0' }}>
                          16
                        </Radio>
                        <Radio value={'32'} style={{ padding: '10px 0', margin: '0' }}>
                          32
                        </Radio>) &nbsp;
                        <Radio value={'SYSTIMER'} style={{ padding: '10px 0', margin: '0' }}>
                          SYSTIMER
                        </Radio>
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="System BUS"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('systemBus', {
                      initialValue: 'AHB-Lite',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Input readOnly={true} style={{ width: '200px' }} />

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="HW Breakpoint "
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('hwBreakpoint', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group >
                        {HWBreakpoint && HWBreakpoint.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>

              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="C-sky Debug Interface"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('cSkyDebugInterface', {
                      initialValue: 'JTAG2',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Input readOnly={true} style={{ width: '200px' }} />

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="Other Comments"
                    required={false}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('remarks', {
                      initialValue: '',
                      // rules: [
                      //   {
                      //     required: true,
                      //     message: '请选择或填写设计包需求'
                      //   },
                      // ],
                    })(
                      <TextArea style={{ width: '200px' }} />

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>

            </> :
            <>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="RVISA"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('rvIsa', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group onChange={e => this.onCpuShow(e, RVISA[0].name, 'RVISAModel')}>
                        {RVISA && RVISA.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="Cache"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('cache', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group >
                        {Cache && Cache.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="PMP Regions"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('pmpRegions', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group>
                        {PMPRegions && PMPRegions.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="CLIC"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('clic', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group>
                        {CLIC && CLIC.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>

              {RVISAModel ? <> <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="MultiplierType"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('multiplyType', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group>
                        {MultiplierType && MultiplierType.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row> </> : null}

              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="BUS Interface"
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('BUSInterface', {
                      initialValue: 'Dual Bus: I-AHB Lite + AHB-Lite',
                      // rules: [
                      //   {
                      //     required: true,
                      //     message: '请选择或填写设计包需求'
                      //   },
                      // ],
                    })(
                      <Input readOnly={true} style={{ width: '400px' }} />

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="HW Breakpoint "
                    required={true}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('HWBreakpoint', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请选择或填写设计包需求'
                        },
                      ],
                    })(
                      <Radio.Group >
                        {HWBreakpoint && HWBreakpoint.map(item => {
                          return (
                            <Radio style={{ padding: '10px 0', margin: '0' }} value={item.name} key={item.id}>
                              {item.name}
                            </Radio>
                          )
                        })}
                      </Radio.Group>

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col
                  {...ProcessColProps}
                >
                  {/* <Row> */}
                  <Form.Item
                    label="Other Comments"
                    required={false}
                    {...ProcessFormItemLayout}
                    colon={true}
                    labelAlign="right"
                  >
                    {getFieldDecorator('Comments', {
                      initialValue: '',
                      // rules: [
                      //   {
                      //     required: true,
                      //     message: '请选择或填写设计包需求'
                      //   },
                      // ],
                    })(
                      <TextArea style={{ width: '400px' }} />

                    )}
                  </Form.Item>
                  {/* </Row> */}

                </Col>
              </Row>
            </>}
        </Form>
        <Row style={{ marginBottom: 16 }}>
          {Title('设计信息')}
        </Row>
        <Row style={{ marginBottom: 16 }}>
          <Col
            {...ProcessColProps}
          >
            < Form.Item
              label="Optimization Priorities"
              required={true}
              {...ProcessFormItemLayout}
              colon={true}
              labelAlign="right">
              {
                getFieldDecorator('optimizationPriorities', {
                  initialValue: '',
                })(
                  <div className={styles.select}>
                    {selectOptionEl('value1', optionsList, option1)} &nbsp;Area &nbsp; &nbsp;
                    {selectOptionEl('value2', optionsList, option2)} &nbsp;Speed &nbsp; &nbsp;
                    {selectOptionEl('value3', optionsList, option3)} &nbsp;Power &nbsp; &nbsp;  (Value: 1,2,3…1 means 1st priority)
                  </div>



                )
              }
            </Form.Item>

          </Col>

        </Row>

        <Row style={{ marginBottom: 16 }}>
          <Col
            {...ProcessColProps}
          >
            <div className={styles.bottomBtn}>
              <Button type="primary" onClick={(e) => this.handleSubmit(e)} loading={loading}>提交</Button> &nbsp;&nbsp;
              <Button onClick={(e) => this.handleCancle(e)} >取消</Button>
            </div>


          </Col>

        </Row>
      </div>
    )
  }
}

export default BasicInfoInput