import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Page from 'components/Page';
import styles from './index.less'
import debounce from 'lodash/debounce'
import { Link, router } from 'umi';
import { Steps, Form, message, Icon, Row, Col, Select, Button } from 'antd';
const { Option } = Select;
import { isEqual, isEmpty } from 'lodash';
import PayResultModal from './components/PayResultModal';

const leftColProps = {
    xs: 24,
    sm: 24,
    xl: 18,
    md: 18,
    lg: 18
}
const rightColProps = {
    xs: 24,
    sm: 24,
    xl: 6,
    md: 6,
    lg: 6
}
@Form.create()
@connect(({ enroll, loading }) => ({ enroll, loading }))
class OrderDetail extends PureComponent {
    state = {
        aff: '',
        isPc: true,
    }
    componentDidMount() {
        const { dispatch, match: { params: { id } } } = this.props
        dispatch({
            type: 'enroll/queryOneRegistration',
            payload: { id },
        })

        dispatch({
            type: 'enroll/getRegistrationBasisInfo',
            payload: {},
        })

        this.setStateValue('isPc', this.isPc())
    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }

    isPc = () => {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }
    onOnlinePay = () => {// 在线支付
        const { dispatch, form, enroll: { registration = {} } } = this.props
        const { id, name, phone, idCode, language, groupLevel, num } = registration
        const { isPc } = this.state
        const data = {
            orderId: id,
            // orderNum: '847522229313867800',
            aliPayType: isPc ? 'page' : 'wap',
        }
        dispatch({
            type: 'enroll/goToPay',
            payload: data,
        }).then(response => {
            if (response && isEqual(response.flag, false)) { // 失败
                message.config({
                    top: 100,
                    duration: 2,
                });
                message.error(response.errMessage)
            } else if (response && response.flag) {

                if (isPc) {

                    const myWindow = window.open('', '_blank');
                    myWindow.document.write(response.resData);
                    myWindow.focus();

                    dispatch({
                        type: 'enroll/showPayResultModal',
                        payload: {},
                    })
                } else {
                    const div = document.createElement('div')
                    /* 此处form就是后台返回接收到的数据 */
                    div.innerHTML = response.resData
                    document.body.appendChild(div)
                    document.forms[0].submit()
                }
            }
        })
    }
    handleRefreshOrder = () => {
        const { dispatch, enroll: { registration = {} } } = this.props
        const { num } = registration
        dispatch({
            type: 'enroll/goToPay4Query',
            payload: { num },
        })
    }

    get payResultProps() {
        const { dispatch, enroll, location } = this.props;
        const { payResultMdlVisible, status, } = enroll;
        return {
            visible: payResultMdlVisible,
            destroyOnClose: true,
            width: 600,
            centered: true,
            closable: true,
            status,
            maskClosable: false,
            onCancel: () => {
                dispatch({
                    type: 'enroll/hidePayResultModal',
                    payload: {},
                })
            },
            checkPayComplete: () => {
                // 重新刷新订单，payStatus
                this.handleRefreshOrder();

                // 检验是否支付完成之后，关闭窗口
                dispatch({
                    type: 'enroll/hidePayResultModal',
                    payload: {},
                })
            }
        }
    }


    render() {
        const { form, enroll: { registration, enrollInfo: { canBe, price } } } = this.props
        const { name, phone, idCode, language, groupLevel, num, status } = registration
        const { getFieldDecorator } = form
        const url = '/partner_enroll';
        return (
            <div className={styles.pages}>
                <div style={{ margin: '0 0 20px 0' }}>
                    <Link to={url}>
                        <Icon type="arrow-left" style={{ fontSize: '16px' }} />
                    </Link>
                </div>
                <Row>
                    <Col {...leftColProps}>
                        <div className={styles.leftContainer}>
                            <div className={styles.titleStyle}>订单:{num}</div>
                            <div className={styles.enrollContainer}>
                                <div className={styles.secondTitleStyle}>报名信息</div>
                                <div className={styles.detailInfo}>
                                    <div>姓名：{name}</div>
                                    <div>身份证号码：{idCode}</div>
                                    <div>报名手机号：{phone}</div>
                                    <div>组别：{groupLevel}</div>
                                    {isEqual(language, 'cpp') ? <div>语言：C++</div> : <div>语言：Python</div>}
                                </div>
                            </div>
                        </div>

                    </Col>
                    <Col  {...rightColProps}>
                        <div className={styles.rightContainer}>
                            <div className={styles.titleStyle}>核对订单</div>
                            <div className={styles.orderInfo}>
                                <div>组别：{groupLevel}</div>
                                {isEqual(language, 'cpp') ? <div>语言：C++</div> : <div>语言：Python</div>}
                                <div>价格：{price}元</div>
                                <div>实付金额：{price}元</div>
                            </div>

                            <div>{isEqual(status, 0) ?
                                <Button type='primary' block onClick={this.onOnlinePay}>立即支付</Button> : <Button type='primary' block>支付完成</Button>}</div>
                        </div>
                    </Col>
                </Row>
                <PayResultModal {...this.payResultProps} />

            </div>
        )
    }
}



export default OrderDetail