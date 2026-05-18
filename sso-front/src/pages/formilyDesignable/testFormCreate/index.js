import React, { Component } from 'react';
import { connect } from 'dva';
import Page from '../../../components/Page'
import { router } from 'utils'
import { Steps, Form, message, Modal, Row, Col } from 'antd';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';

import { LeggoForm } from './components/Engine';

const { Step } = Steps;
@Form.create()
@connect(({ app, formilyDesignable, loading }) => ({ app, formilyDesignable, loading }))
class TestFormCreate extends Component {
    state = {
        activeSchema: '',
        setForceRender: 0,
        schemaModel: {
            "name": "123",
            "formProps": {
                "labelCol": {
                    "span": 6,
                    "offset": 0
                },
                "wrapperCol": {
                    "span": 14,
                    "offset": 0
                },
                "colon": true,
                "labelAlign": "right",
                "layout": "horizontal",
                "scrollToFirstError": false,
                "validateTrigger": "onChange",
                "preserve": true,
                "requiredMark": true
            },
            "schemaList": [
                {
                    "id": "1663832006161",
                    "type": "inputTexArea",
                    "configs": {
                        "itemProps": {
                            "name": "inputTexArea9tl",
                            "label": "多行文本",
                            "initialValue": 123123123123,
                            "rules": [
                                {
                                    "required": true,
                                    "message": "请输入文本！"
                                }
                            ],
                            "noStyle": false,
                            "trigger": "onChange",
                            "hidden": false
                        },
                        "inputProps": {
                            "disabled": true,
                            "placeholder": "请输入",
                            "rows": 4,
                            "autoSize": false,
                            "allowClear": false,
                            "showCount": false,
                            "bordered": true
                        },
                        "extra": {
                            "wordsLimit": null
                        }
                    },
                    "currentItemValue": null,
                    "needDefineGetterProps": {}
                },
                {
                    "id": "1663832007550",
                    "type": "inputPassword",
                    "configs": {
                        "itemProps": {
                            "name": "inputPassword97b",
                            "label": "密码",
                            "rules": [
                                {
                                    "required": true,
                                    "message": "请输入密码！"
                                }
                            ],
                            "noStyle": false,
                            "trigger": "onChange",
                            "hidden": false
                        },
                        "inputProps": {
                            "disabled": false,
                            "placeholder": "请输入",
                            "visibilityToggle": true
                        }
                    },
                    "currentItemValue": null,
                    "needDefineGetterProps": {}
                },
                {
                    "id": "1663832697353",
                    "type": "submit",
                    "configs": {
                        "itemProps": {
                            "label": "",
                            "wrapperCol": {
                                "offset": 6
                            },
                            "noStyle": false,
                            "hidden": false
                        },
                        "inputProps": {
                            "disabled": false,
                            "type": "primary",
                            "htmlType": "submit",
                            "block": false,
                            "danger": false,
                            "ghost": false
                        },
                        "extra": {
                            "childrenNode": "Submit"
                        }
                    },
                    "currentItemValue": null,
                    "needDefineGetterProps": {}
                }
            ]
        }
    }

    componentDidMount() {
    }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }

    render() {
        const { schemaModel } = this.state
        const { form } = this.props
        // const {} = this.
        // console.log(LeggoForm);
        const leggo = LeggoForm.useLeggo(schemaModel, null, {
            test: true,
            func: () => false,
        })
        return (
            <Page inner>

                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <LeggoForm leggo={leggo} form={form} />
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                {/* <iframe width='100%' height='1500px'  src="https://www.wjx.top/vm/e002AQ4.aspx"></iframe> */}
            </Page>
        )
    }
}

export default TestFormCreate;
