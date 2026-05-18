import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from './styles.less'
import { router } from 'utils'
import { connect } from 'dva'
import Page from '../../../../components/Page'
import moment from 'moment'
import CouponsItems from './components/CouponsItems'
import Filter from './components/Filter'
const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

@Form.create()
@connect(({ app, coupons, loading }) => ({ app, coupons, loading }))
class CreateCoupons extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'coupons/queryScopeList',
            payload: {

            }
        })
    }

    handleSearch = e => {

    };

    handleFormReset = () => {

    }

    handleRouter = () => {
        router.push({
            pathname: '/CreateCoupons'
        })
    }

    get couponsProps () {
        const { coupons,dispatch,form } = this.props;
        const {scopeList} =  coupons;
        return {
            scopeList,
            onCheckedChange: (value) => {
                console.log(value)
            },
            setFormValues: (value) => {
                const date = value.date;
                const name = value.name;
                const ofPublic = value.ofPublic;
                const parValue = value.parValue;
                const startValue = value.startValue;
                const type = value.type;
                const maxQuantity = value.maxQuantity;
                const startTime = moment(date[0]._d).format('YYYY-MM-DD HH:mm:ss')
                const endTime = moment(date[1]._d).format('YYYY-MM-DD HH:mm:ss')
                const receiptLimit = value.receiptLimit;
                const scopeArr = value.scope;
                const scope = scopeArr.join (',')
                dispatch({
                    type:'coupons/updateStateBtnTrue'
                })
                // return
                dispatch({
                    type:'coupons/createCoupons',
                    payload: {
                        name ,
                        ofPublic,
                        parValue,
                        startValue,
                        type,
                        maxQuantity,
                        receiptLimit,
                        scope,
                        startTime,
                        endTime
                    }
                })
                
            }
        }
    }

    render() {
        const { form, storage, onBuyCapacity } = this.props;
        const { getFieldDecorator } = form;



        return (
            <Page inner style={{ overflow: 'hidden' }}>
                {/* <Filter/> */}
                <CouponsItems {...this.couponsProps}/>
            </Page>

        );
    }
}



export default CreateCoupons
