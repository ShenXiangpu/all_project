import React, { PureComponent } from 'react'

import { Form, Row, Col, Input, Cascader } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
// import styles from './projectDetail.less'
class ProjectDetail extends PureComponent {
    state = {

    }


    onChange = (value) => {
        console.log(value);
    }

    render() {

        const { form, projectInfo, ColProps, formItemLayout } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div style={{ margin: '30px 0 0 0' }}>
                <Form >
                    <Row>
                        <Col
                            {...ColProps}
                        >
                            <Form.Item label="项目英文名称" {...formItemLayout}>
                                {getFieldDecorator('projectNameEn', {
                                    initialValue: projectInfo.projectNameEn || '',
                                    rules: [

                                    ],
                                })(
                                    <Input readOnly={true} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 16 }}>
                        <Col
                            {...ColProps}
                            align="left"
                        >
                            <Form.Item label="项目名称" {...formItemLayout}>
                                {getFieldDecorator('projectName', {
                                    initialValue: projectInfo.projectName || '',
                                    rules: [

                                    ],
                                })(
                                    // <Cascader options={this.options} onChange={this.change} />
                                    <Input readOnly={true} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 16 }}>

                        <Col
                            {...ColProps}
                            align="left"
                        >
                            <Form.Item label="项目描述" {...formItemLayout}>
                                {getFieldDecorator('projectIntroduction', {
                                    initialValue: projectInfo.projectIntroduction || '',
                                    rules: [

                                    ],
                                })(
                                    <TextArea rows={7} readOnly={true} />

                                )}
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </div>
        )
    }
}

export default ProjectDetail