import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { Button, Card, Divider, Row, Col, Drawer, Input, Result, Radio, Table, Form, Tag, DatePicker, message } from 'antd'
import difference from 'lodash/difference';
import styles from '../style.less'
import { isEqual } from 'lodash'
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const TextArea = Input.TextArea
const { Search } = Input;

/**
 * 穿梭框
 */



const leftTableColumns = [
    {
        dataIndex: 'phone',
        title: '手机号',
    },
    {
        dataIndex: 'userName',
        title: '姓名',
    },
];









const canPushCoupons = [
    {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
    },
    // {
    //     title: '优惠券类型',
    //     dataIndex: 'typeString',
    //     key: 'typeString',
    // },
    {
        title: '优惠券面值',
        dataIndex: 'parValue',
        key: 'parValue',
        render: (text, record) => {
            if (record && record.startValue) {
                return `${record.parValue}元 (起始金额：${record.startValue}元)`
            } else {
                return `${record.parValue}元`
            }
        }
    },
    {
        title: '适用范围',
        dataIndex: 'scope',
        key: 'scope',
    },
]
const FormItem = Form.Item;

@Form.create()
class TargetedPush extends PureComponent {

    state = {
        disabled: false,
        showSearch: false,
        targetKeys: [], //选中的内容
        isShow: false, //控制显示隐藏
        infoList: [],
    };

    componentDidUpdate() {

    }


    /**
     * 穿梭框 
     */
    // onTrChange = nextTargetKeys => {
    //     console.log(nextTargetKeys);
    //     this.setState({ targetKeys: nextTargetKeys });
    // };

    // triggerDisable = disabled => {
    //     this.setState({ disabled });
    // };

    // triggerShowSearch = showSearch => {
    //     this.setState({ showSearch });
    // };


    /**
     * 控制手机号填写显示隐藏
     * @param {*} item 
     */
    onRadioChange = (e) => {
        let value = e.target.value;
        let isShow = false;
        isEqual(value, 'role') ? isShow = false : isShow = true

        this.setState({
            isShow,
            targetKeys: []
        })

        const { onRadioChange } = this.props;
        onRadioChange(value);
    }

    /**
     * 通过手机号查询
     * @param {手机号} value 
     */
    onSearchPhone = (value) => {
        const { onSearchPhone } = this.props;
        onSearchPhone(value);
        // 查询后重置穿梭表格
        this.setState({
            targetKeys: [], //选中的内容
        })
    }
    /**
     * 穿梭框 
     */




    /**
     * 选择优惠券
     * @param {*} selectedRowKeys 
     */
    onSelectChange = (key) => {
        const { onSelectChange } = this.props;
        onSelectChange(key)
    };

    onSelectUserChange = (key) => {
        const { onSelectUserChange } = this.props;
        onSelectUserChange(key)
    };


    onInputNumberChange = (value) => {
        console.log('changed', value);
    }


    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }



    // 点击按钮打开侧边优惠券栏目
    onBtnClick = () => {
        const { onBtnClick } = this.props;
        onBtnClick();
    }



    onClose = () => {
        const { onClose } = this.props;
        onClose()
    };

    chooseCoupons = () => {
        const { onChooseCoupons } = this.props;
        onChooseCoupons()
    }

    cancleCoupons = () => {
        const { onCancleCoupons } = this.props;
        onCancleCoupons()
    }

    createCoupons = () => {
        router.push({ pathname: '/marketing/coupons/createcoupons' })
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current - 1 && current - 1 <= moment().subtract(1, 'days').endOf('day');

    }

    // 优惠券推送，空清除推送结果
    clearForm = () => {
        const { form, dispatch, onClearFrom } = this.props;
        const { isShow } = this.state
        this.setStateValue(isShow, false)
        form.resetFields();
        onClearFrom()
    }
    // 提交
    handleSubmit = (e) => {
        const { form, couponItem, selectedRowKeys, setFormValues, isSuccess } = this.props;

        if (!couponItem || !couponItem.id) {
            message.error('请选择优惠券')
            return
        }
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            const userTypeKey = values.userTypeKey
            const dates = values.date;
            const startTime = moment(dates[0]._d).format('YYYY-MM-DD HH:mm:ss')
            const endTime = moment(dates[1]._d).format('YYYY-MM-DD HH:mm:ss')
            const description = values.description
            const typeId = couponItem.id
            if (isEqual(userTypeKey, 'role')) {
                const userTypeValue = values.userTypeValue
                const couponPush = {
                    userTypeKey,
                    userTypeValue,
                    typeId,
                    description,
                    startTime,
                    endTime
                }
                setFormValues(couponPush)
            } else {
                if (!selectedRowKeys || isEqual(selectedRowKeys.length, 0)) {
                    message.error('请选择用户')
                    return
                }
                const userIds = selectedRowKeys.join(",")
                const couponPush = {
                    userTypeKey,
                    userIds,
                    typeId,
                    description,
                    startTime,
                    endTime
                }

                setFormValues(couponPush)


            }
        });
    }
    onSearch = (e) => {
        const { queryUseInfoByPhone } = this.props;
        queryUseInfoByPhone(e)
    }

    clickCloseTag = () => {

        const { onClickCloseTag } = this.props;
        onClickCloseTag()
    }

    chooseUserInfo = () => {
        const { onChooseUserInfo, selectedRowKeys } = this.props;
        if (selectedRowKeys && selectedRowKeys.length > 0) {
            onChooseUserInfo()
        } else {
            message.error('请选择用户')
        }
    }

    handleClose = removedTag => {
        const { onhandleCloseTag } = this.props;
        onhandleCloseTag(removedTag)
    };

    // 取消右侧的所有用户
    cancleAllUserInfo = () => {
        const { onCancleAllUserInfo } = this.props;
        onCancleAllUserInfo()
    }

    render() {
        const { isShow } = this.state;
        const { form, loading, isDisabled, remarks, drawerVisible, selectedRowKeys, selectedRowKeys1, userInfoList, userRoleInfoList, couponsList, chooseList, couponItem, isSuccess, ...tableProps } = this.props;
        const { getFieldDecorator } = form;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectUserChange,
            hideDefaultSelections: true,
        };

        const rowSelection1 = {
            selectedRowKeys: selectedRowKeys1,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            type: 'radio'
        };


        const tagEle = chooseList && chooseList.length > 0 && chooseList.map(item => {
            return (
                <Tag key={item.id} closable onClose={() => this.handleClose(item)}>
                    {item.phone}
                </Tag>
            );
        })




        return (
            <div>{isSuccess ? <Form>
                <Row>
                    <Col span={24}>
                        <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }} label="推送方式">
                            {getFieldDecorator('userTypeKey', { initialValue: !isShow ? 'role' : 'ids' })(
                                <Radio.Group onChange={this.onRadioChange} >
                                    <Radio.Button value="role">群体推券</Radio.Button>
                                    <Radio.Button value="ids">手机号推券</Radio.Button>
                                </Radio.Group>
                            )}
                        </FormItem>
                    </Col>
                    {isShow &&
                        <Col span={24}>
                            <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }} label="手机号">
                                {getFieldDecorator('phone', {
                                    initialValue: '', rules: [
                                        {
                                            required: true,
                                            message: "请输入用户手机号"
                                        }
                                    ],
                                })(
                                    <Search placeholder="请输入手机号查询" onSearch={value => this.onSearchPhone(value)} enterButton style={{ width: '250px' }} />
                                )}
                            </FormItem>
                        </Col>
                    }

                </Row>
                <Divider />
                {!isShow ?
                    <Row>
                        {/* <Col span={2}><span></span></Col> */}
                        <Col span={22}>
                            <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }} label="请选择">
                                {getFieldDecorator('userTypeValue', {
                                    initialValue: '', rules: [
                                        {
                                            required: true,
                                            message: "请选择用户类型"
                                        }
                                    ],
                                })(
                                    <Radio.Group>
                                        {userRoleInfoList && userRoleInfoList.length > 0 && userRoleInfoList.map(item => {
                                            return (
                                                <Radio key={item.id} value={item.id}>{item.cnName}</Radio>
                                            )
                                        })}
                                    </Radio.Group>
                                )}
                            </FormItem>


                        </Col>
                    </Row> :
                    <Row>
                        <Col span={2}><span>请选择</span></Col>
                        <Col span={22}>
                            <Col span={10}>
                                <Table bordered scroll={{ y: '200px' }} style={{ height: '200px' }} rowSelection={rowSelection} columns={leftTableColumns} dataSource={userInfoList} />
                            </Col>
                            <Col span={4}>
                                <div className={styles.btnContainer}>
                                    <Button type="primary" onClick={this.chooseUserInfo} style={{ width: '80px', marginBottom: '20px' }}>选择</Button>
                                    <Button type="primary" onClick={this.cancleAllUserInfo} style={{ width: '80px', marginBottom: '20px' }}>取消</Button>
                                </div>
                            </Col>

                            <Col span={10}>
                                <div className={styles.tagContainer}>
                                    {tagEle}

                                </div>

                            </Col>
                        </Col>
                    </Row>
                }

                <Divider />
                <Row>
                    <Col span={2}><span className={styles.beStyles}>选择优惠券：</span></Col>
                    {
                        couponItem && couponItem.id ?
                            <Col span={22}>
                                <Tag closable onClose={this.clickCloseTag} >
                                    {couponItem.name}
                                </Tag>
                            </Col>
                            :
                            <Col span={22}>
                                <Button type="primary" onClick={this.onBtnClick}>优惠券</Button>
                                {couponItem && couponItem.id ? '' : <div style={{ color: '#f5222d', fontSize: '14px' }}>请选择优惠券</div>}
                            </Col>
                    }
                </Row>
                <Divider />
                {/* 侧边优惠券 */}
                <Drawer
                    title="选择定向优惠券"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={drawerVisible}
                    width={1000}
                    style={{ height: '100vh' }}
                >
                    <Card title={<a onClick={this.createCoupons}>创建优惠券</a>} style={{ width: '100%', height: "100%" }}>
                        <Table {...tableProps}
                            pagination={{
                                ...tableProps.pagination,
                                showTotal: total => `共 ${total} 条`,
                            }}
                            rowSelection={rowSelection1} scroll={{ y: '300px' }} columns={canPushCoupons} dataSource={couponsList} />
                        {/* <Pagination onChange="{onChange}" total="{50}" /> */}

                    </Card>
                    <div className={styles.drawerFooter}>
                        <div>
                            <Button onClick={this.cancleCoupons}>取消</Button>
                            <Button disabled={isDisabled} onClick={this.chooseCoupons}>确定选择</Button>
                        </div>
                    </div>
                </Drawer>
                <Row>
                    {/* <Col span={2}><span></span></Col> */}
                    <Col span={24}>
                        <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }} label="有效期：">
                            {getFieldDecorator('date', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入有效期"
                                    }
                                ],
                            })(
                                <RangePicker
                                    format={dateFormat}
                                    disabledDate={this.disabledDate}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    {/* <Col span={2}><span></span></Col> */}
                    <Col span={24}>
                        <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }} label="备注：">
                            {getFieldDecorator('description', {
                                initialValue: '', rules: [
                                    {
                                        required: true,
                                        message: "请输入推送原因"
                                    }
                                ],
                            })(
                                <TextArea rows={4} style={{ width: '500px', height: '80px' }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <FormItem labelCol={{ span: 2, style: { textAlign: 'left' } }} wrapperCol={{ span: 22 }}>
                            {getFieldDecorator('Button', { initialValue: '' })(
                                <Button type='primary' loading={loading} onClick={this.handleSubmit}>确定</Button>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form> :

                <Result
                    status="success"
                    title="优惠券推送成功"
                    extra={[
                        <div style={{ margin: '10px auto', fontSize: '12px', textAlign: 'justify', width: '200px' }}>{remarks || ''}</div>,


                        <Button type="primary" key="console" onClick={this.clearForm}>
                            继续推送
                        </Button>

                        // <Button key="buy">查看推送记录</Button>,
                    ]}
                />
            }



            </div>

        )
    }
}

export default TargetedPush
