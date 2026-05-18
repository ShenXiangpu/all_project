import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import debounce from 'lodash/debounce'
import { router } from 'utils'
import { Empty, Form, message, Row, Col, Input, Select, Button } from 'antd';
import { isEqual } from 'lodash'
import { log } from 'lodash-decorators/utils'
const { Option } = Select;

const ColProps = {
    xs: 24,
    sm: 24,
    xl: 8,
    md: 8,
    lg: 8
}
const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        xl: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
        xl: { span: 14 },
        md: { span: 14 },
        lg: { span: 14 },
    },
}
@Form.create()
@connect(({ enroll, loading }) => ({ enroll, loading }))
class Enroll extends PureComponent {
    state = {
        aff: '',
        isShowPrice: false
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'enroll/getRegistrationBasisInfo',
            payload: {},
        })
        const search = location.search;
        console.log('search', search);
        const aff = search.split('=')[1]; //详情id
        if (aff) {
            this.setStateValue('aff', aff);
            localStorage.setItem('aff', aff)
        } else {
            const aff = localStorage.getItem('aff')
            this.setStateValue('aff', aff || '');
        }


    }


    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props
        const { validateFields, getFieldsValue } = form
        const { aff } = this.state
        // const values = getFieldsValue();

        validateFields((errors, values) => {
            if (errors) {
                return
            }
            if (aff) {
                values.affiliateCode = aff
            }
            dispatch({
                type: 'enroll/addOneRegistration',
                payload: values,
            }).then(response => {
                if (response && response.flag) {
                    // message.success("报名成功")
                    let resData = response.resData;
                    let value = resData.id


                    router.push({
                        pathname: `/partner_enroll/${value}`
                    })
                } else {
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    message.error(response.errMessage)
                }
            })
        })


    };
    handleReset = e => {

    }
    handleCancleClick = e => {

    }

    selectChange = () => {
        this.setStateValue('isShowPrice', true)
    }

    render() {
        const { form, enroll } = this.props
        const { enrollInfo: { canBe, price } } = enroll
        const { getFieldDecorator } = form
        const { isShowPrice } = this.state

        return (
            <div className={styles.pages}>
                {isEqual(Number(canBe), 1) ?

                    <Row>

                        <Form>
                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                    <Form.Item label="姓名"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('name', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入姓名'
                                                },
                                            ],
                                        })(
                                            <Input placeholder='请输入姓名' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item label="身份证号码" {...formItemLayout}>
                                        {getFieldDecorator('idCode', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入身份证号码'
                                                },
                                            ],
                                        })(
                                            <Input placeholder='请输入身份证号码' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item label="报名手机号" {...formItemLayout}>
                                        {getFieldDecorator('phone', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入报名手机号'
                                                },
                                            ],
                                        })(
                                            <Input placeholder='请输入报名手机号' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item label="组别" {...formItemLayout}>
                                        {getFieldDecorator('groupLevel', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择组别'
                                                },
                                            ],
                                        })(
                                            <Select placeholder='请选择组别'>
                                                <Option value="小学">小学</Option>
                                                <Option value="初中">初中</Option>
                                                <Option value="高中">高中</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item label="语言" {...formItemLayout}>
                                        {getFieldDecorator('language', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择语言'
                                                },
                                            ],
                                        })(
                                            <Select onSelect={this.selectChange} placeholder='请选择语言'>
                                                <Option value="cpp">C++</Option>
                                                <Option value="py">Python</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            {isShowPrice ?
                                <Row style={{ marginBottom: 16 }}>
                                    <Col
                                        {...ColProps}
                                    // align="left"
                                    >
                                    </Col>
                                    <Col
                                        {...ColProps}
                                        align="left"
                                    >
                                        <Form.Item label="费用" {...formItemLayout}>
                                            {getFieldDecorator('price', {
                                                initialValue: `${price}元` || '399元',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择语言'
                                                    },
                                                ],
                                            })(
                                                <Input readOnly />,
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row> : null

                            }

                            <Row style={{ marginBottom: 16 }}>
                                <Col
                                    {...ColProps}
                                // align="left"
                                >
                                </Col>
                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item
                                        wrapperCol={{
                                            xs: { span: 24, offset: 0 },
                                            sm: { span: 16, offset: 6 },
                                            xs: { span: 24, offset: 0 },
                                            sm: { span: 16, offset: 6 },
                                        }}
                                    >

                                        <Button type="primary" onClick={(e) => this.handleSubmit(e)} >
                                            确定
                                        </Button>
                                        &nbsp;
                                        &nbsp;
                                        <Button type="default" onClick={this.handleReset}>
                                            重置
                                        </Button>

                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                    </Row> :
                    <div style={{ textAlign: 'center' }}>
                        <Empty
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            imageStyle={{
                                height: 160,
                            }}

                        > <Button type="primary"> 激活码被抢光了</Button>

                        </Empty>

                    </div>

                }
            </div>
        )
    }
}

Enroll.propTypes = {
    partner: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default Enroll