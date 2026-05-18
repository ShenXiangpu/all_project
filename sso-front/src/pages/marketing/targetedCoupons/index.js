import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { message, Tabs, Card, Divider, Row, Col, Modal, Drawer, Input, Transfer, Radio, Table, Pagination, InputNumber, Form } from 'antd'
import Page from '../../../components/Page'
import TargetedPush from './components/TargetedPush'
import PushRecords from './components/PushRecords'
import Filter from './components/Filter'

import difference from 'lodash/difference';
import styles from './style.less'
const { TabPane } = Tabs;
import { isEqual } from 'lodash'

@Form.create()
@connect(({ app, targetedCoupons, loading }) => ({ app, targetedCoupons, loading }))
class TargetedCoupons extends PureComponent {

    state = {
        isDisabled: true,
        visible: false,

        selectedRowKeys: [],//选择用户的
        selectedRowKeys1: [],//选择优惠券的
        couponsItem: {},//选择的优惠券
        couponItem: [], //选中的优惠券
        chooseList: [],

        formValues: {},//查询条件
        isSuccess: false,//判断是否执行成功
        remarks:'',

    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'targetedCoupons/getUserRole',
            payload: {

            }
        })
    }
    // componentDidUpdate() {
    //     const { form, dispatch, isSuccess } = this.props
    //     if (isSuccess) {
    //         this.setState({
    //             selectedRowKeys1: [],
    //             selectedRowKeys: [],
    //             couponsItem: {},//选择的优惠券
    //             couponItem: [], //选中的优惠券
    //         });
    //         form.resetFields();
    //         dispatch({
    //             type: 'targetedCoupons/isSuccessFalse'
    //         })
    //     }
    // }
    //根据手机号查询用户信息
    queryUserInfo = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'targetedCoupons/getUserByPhone',
            payload: {}
        })
    }
    //查询角色信息
    queryUserRole = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'targetedCoupons/getUserRole',
            payload: {}
        })
    }


    callback = (key) => {
        const { dispatch } = this.props;
        if (isEqual(Number(key), 1)) {
            dispatch({
                type: 'targetedCoupons/getUserRole',
                payload: {}
            })
        } else if (isEqual(Number(key), 2)) {
            dispatch({
                type: 'targetedCoupons/getCouponPushList',
                payload: {}
            })
        }
    }

    get PushRecordsProps() {
        const { targetedCoupons, dispatch, loading } = this.props;
        const { couponPushList, pagination, status, startTime, endTime } = targetedCoupons
        return {
            couponPushList,
            pagination,
            loading: loading.effects['targetedCoupons/getCouponPushList'],
            onChange: (pagination, filters, sorter) => {
                const params = {
                    pageNum: pagination.current,
                    pageSize: pagination.pageSize,
                };
                dispatch({
                    type: 'targetedCoupons/getCouponPushList',
                    payload: {
                        ...params,
                        status,
                        startTime,
                        endTime
                    }
                })
            },
        }

    }






    handleTableChange = (pagination) => {
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            status: 1
        };
        this.handleQuery(params);
    }
    handleQuery = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'targetedCoupons/queryCouponsList',
            payload: {
                ...values,
            }
        })
    }





    get TargetedProps() {
        const { targetedCoupons, dispatch, loading, } = this.props;
        const { form, userInfoList, userRoleInfoList, drawerVisible, couponsList, pagination, isSuccess } = targetedCoupons;
        const { isDisabled, couponsItem, selectedRowKeys, selectedRowKeys1, couponItem, chooseList, remarks } = this.state;


        const roleInfoList = userRoleInfoList.filter(item => {
            return !isEqual(item.cnName, '企业项目经理') && !isEqual(item.cnName, '工程师') //过滤推送角色
        })

        console.log('roleInfoList',roleInfoList);

        return {
            isDisabled,
            drawerVisible,
            dispatch,
            couponsItem,
            selectedRowKeys,
            selectedRowKeys1,
            userInfoList,
            userRoleInfoList:roleInfoList,
            couponsList,
            pagination,
            couponItem,
            chooseList,
            isSuccess,
            remarks,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination)
            },
            onClose: () => {
                dispatch({
                    type: 'targetedCoupons/drawerVisibleFalse'
                })
            },
            onBtnClick: () => {
                dispatch({
                    type: 'targetedCoupons/queryCouponsList',
                    payload: {
                        pageNum: 1,
                        pageSize: 10,
                        status: 1
                    }
                })
                dispatch({
                    type: 'targetedCoupons/drawerVisibleTrue'
                })
            },
            onSearchPhone: value => {
                dispatch({
                    type: 'targetedCoupons/getUserByPhone',
                    payload: {
                        phone: value
                    }
                })
            },
            //传入优惠券
            onSelectChange: selectedRowKeys1 => {

                this.setState({ selectedRowKeys1, isDisabled: false });
            },
            //传入用户
            onSelectUserChange: selectedRowKeys => {

                console.log(selectedRowKeys)
                this.setState({ selectedRowKeys, isDisabled: false });
            },
            //删除右侧标签
            onhandleCloseTag: (removedTag) => {
                const tags = chooseList.filter(item => item.id !== removedTag.id);
                const index = selectedRowKeys.indexOf(removedTag.id.toString())
                if (index > -1) {
                    selectedRowKeys.splice(index, 1)
                    this.setState({ selectedRowKeys });
                }
                this.setState({ chooseList: tags });
            },
            // 取消选中的用户和右侧的列表
            onCancleAllUserInfo: () => {
                this.setState({
                    chooseList: [],
                    selectedRowKeys: []
                });
            },
            onChooseUserInfo: () => {
                let choosesList = [];
                // 将选中的用户筛选出来，放入右侧
                console.log('selectedRowKeys', selectedRowKeys)
                selectedRowKeys.map(item => {
                    for (let i = 0; userInfoList && userInfoList.length > 0 && i < userInfoList.length; i++) {
                        if (isEqual(userInfoList[i].id, Number(item))) {
                            choosesList.push(userInfoList[i])
                        }
                    }
                })
                let newChooseList = chooseList.concat(choosesList);
                // 数组去重，防止相同用户重复发券
                let deWeightUser = () => {
                    let map = new Map();
                    for (let item of newChooseList) {
                        if (!map.has(item.id)) {
                            map.set(item.id, item);
                        }
                    }
                    return [...map.values()];
                }
                this.setState({ chooseList: deWeightUser() });
            },
            //确认选择优惠券，返回给页面显示
            onChooseCoupons: () => {
                const index = selectedRowKeys1[0];
                if (couponsList && couponsList.length > 0) {
                    const couponItem = couponsList[index];
                    this.setState({ couponItem, isDisabled: false, selectedRowKeys1: [] });
                    dispatch({
                        type: 'targetedCoupons/drawerVisibleFalse'
                    })
                }
            },
            // 取消选择优惠券，并关闭框
            onCancleCoupons: () => {
                this.setState({ couponItem: {}, isDisabled: true, selectedRowKeys1: [] });
                dispatch({
                    type: 'targetedCoupons/drawerVisibleFalse'
                })
            },
            //点击切换列表
            onRadioChange: (e) => {
                isEqual(e, 'role') ? this.queryUserRole() : this.queryUserInfo()
            },

            //根据手机号查询
            queryUseInfoByPhone: (phone) => {
                setTimeout(() => {
                    dispatch({
                        type: 'targetedCoupons/getUserByPhone',
                        payload: {
                            phone
                        },
                    })
                }, 200);

            },
            onClickCloseTag: () => {
                this.setState({ couponItem: {}, isDisabled: true, selectedRowKeys1: [] });
            },
            setFormValues: (params) => {
                dispatch({
                    type: 'targetedCoupons/createPush',
                    payload: params
                }).then(response => {
                    if (response && response.flag) {
                        message.success("推送成功")
                        const remarks = response.resData.remarks
                        this.setState({
                            selectedRowKeys1: [],
                            selectedRowKeys: [],
                            couponsItem: {},//选择的优惠券
                            couponItem: [], //选中的优惠券
                            chooseList:[],
                            remarks,
                        });
                        dispatch({
                            type: 'targetedCoupons/isSuccessFalse',
                            payload:{
                                userInfoList:[]
                            }
                        })
                    } else {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.error(response.errMessage)
                    }
                })
            },
            onClearFrom: () => {
                dispatch({
                    type: 'targetedCoupons/isSuccessTrue'
                })
                this.setState({
                    requestSize:0,
                    realSize:0,
                });
            }




            // triggerDisable : disabled => {
            //     this.setState({ disabled });
            // },

            // triggerShowSearch: showSearch => {
            //     this.setState({ showSearch });
            // },



        }
    }

    get filterProps() {
        const { targetedCoupons, dispatch, status, date, } = this.props;
        const { formValues } = this.state;
        const { userInfoList, userRoleInfoList, drawerVisible, couponsList, pagination, isSuccess } = targetedCoupons;
        return {
            dispatch,
            date,
            status,
            couponsList,
            onhandleSelectChange: (value) => {
                dispatch({
                    type: 'targetedCoupons/getCouponPushList',
                    payload: {
                        ...value
                    }
                })
            },
            onHandleFormRendTimeeset: () => {
                const params = {
                    pageNum: 1,
                    pageSize: 10,
                    status: '',
                    searchStartTime : '',
                    searchEndTime : ''
                };
                dispatch({
                    type: 'targetedCoupons/getCouponPushList',
                    payload: {
                        ...params
                    }
                })

            },
            setFormValues: value => {
                this.setState({
                    formValues: value,
                })
            },
        }
    }

    render() {

        return (
            <Page inner style={{ overflow: 'hidden' }}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="定向推券" key="1">
                        <TargetedPush {...this.TargetedProps} />
                    </TabPane>
                    <TabPane tab="推送记录" key="2">
                        <Filter {...this.filterProps} />
                        <PushRecords {...this.PushRecordsProps} />
                    </TabPane>

                </Tabs>

            </Page>
        )
    }
}

export default TargetedCoupons
