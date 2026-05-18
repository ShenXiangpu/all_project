/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Checkbox } from 'antd'
const { Search } = Input;
const { Option } = Select

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 0,
    },
}

const TwoColProps = {
    ...ColProps,
    xl: 96,
}

const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
    },
};

const formItemLayout2 = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
    },
};

@Form.create()
class Filter extends Component {

    handleSubmit = () => {
        const { onFilterChange, form } = this.props
        const { getFieldsValue } = form

        let fields = getFieldsValue()
        onFilterChange(fields)
    }

    handleReset = () => {
        const { form, onReset } = this.props
        const { getFieldsValue, setFieldsValue } = form

        const fields = getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else if (typeof fields[item] !== 'string') {
                    fields[item] = undefined
                } else {
                    fields[item] = ''
                }
            }
        }
        setFieldsValue(fields)
        this.setState({
            checkedValues: ['person', 'enterprise']
        })

        onReset();
    }

    handleChange = (value) => {
        const { onFilterChange, form } = this.props
        const { getFieldsValue } = form
        let fields = getFieldsValue()
        const data = {
            ...fields,
            isVerified: value
        }

        onFilterChange(data)        
    }

    render() {
        const { filter, form } = this.props
        const { getFieldDecorator } = form
        const { companies, groupId, keyWord } = filter

        return (
            <Form {...formItemLayout}>
                <Row gutter={24}>
                    <Col
                        {...ColProps}
                        xl={{ span: 6 }}
                        md={{ span: 8 }}
                    >
                        <Form.Item>
                            {getFieldDecorator('keyWord', { initialValue: keyWord })(
                                <Search placeholder="请输入关键字进行查询" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col
                        {...TwoColProps}
                        xl={{ span: 12 }}
                        md={{ span: 24 }}
                        sm={{ span: 24 }}
                    >
                        <Row type="flex" align="middle" justify="space-between">
                            <div>
                                <Button
                                    type="primary"
                                    className="margin-right"
                                    onClick={this.handleSubmit}
                                >
                                    查询
                                </Button>
                                <Button style={{ marginLeft: 18 }} onClick={this.handleReset}>
                                    重置
                                </Button>
                            </div>
                        </Row>
                    </Col>
                    <Col
                        {...ColProps}
                        xl={{ span: 6 }}
                        md={{ span: 8 }}
                    >
                        <Form.Item label="审核状态" {...formItemLayout2}>
                            {getFieldDecorator('isVerified', { initialValue: groupId || '' })(
                                <Select
                                    showSearch
                                    notFoundContent={null}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={this.handleChange}
                                >
                                    <Option value=''>----全部----</Option>
                                    <Option value='0'>未审核</Option>
                                    <Option value='1'>审核通过</Option>
                                    <Option value='2'>审核未通过</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func,
}

export default Filter
