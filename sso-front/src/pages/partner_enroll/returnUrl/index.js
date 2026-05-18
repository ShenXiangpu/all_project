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
class ReturnUrl extends PureComponent {
    state = {
        num: '',
        id: ''
    }
    componentDidMount() {

        const { dispatch } = this.props
        const search = location.search;
        console.log('search', search);
        const num = search.split('=')[1]; //详情id
        if (num) {
            dispatch({
                type: 'enroll/queryOneRegistration',
                payload: { num },
            })
        }

    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
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

    reback = (num) => {
        const { dispatch } = this.props
        dispatch({
            type: 'enroll/goToPay4Query',
            payload: { num },
        })
    }


    render() {
        const { form, enroll: { registration } } = this.props
        const { name, num, status,activationCode, } = registration
        const { getFieldDecorator } = form
        const url = '';
        return (
            <div className={styles.pages}>
                <div className={styles.container}>

                    {!isEqual(status, 1) ?
                        <Button type='primary' onClick={() => this.reback(num)}>支付完成，立即获取网站和激活码</Button> : 
                        <div>
                            <div>支付完成</div>
                            <div>{name},请通过该地址:<br/><a href='http://sf.yuanpingjia.cn' target>http://sf.yuanpingjia.cn</a><br/>激活码：<br/>{activationCode} 开始课程</div>
                        </div>
                    }

                </div>




            </div>
        )
    }
}



export default ReturnUrl