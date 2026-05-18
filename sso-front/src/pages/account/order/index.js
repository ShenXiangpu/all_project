import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import { Icon, message } from 'antd';
import store from 'store';
import LicenseOrder from './components/LicenseOrder';
import VmOrder from './components/VmOrder';
import CapacityOrder from './components/CapacityOrder';
import VouchersList from './components/VouchersList';

import { isEqual, isEmpty } from 'lodash-es';
import { Link, router } from 'umi';
import PayModal from './components/PayModal';
import PayResultModal from './components/PayResultModal';

// 订单管理
@connect(({ app, order, loading }) => ({ app, order, loading }))
class Check extends PureComponent {
  state = {
    currentItemId: 0,
    disabled: false,
    isShow: false
  }

  componentWillUnmount() {
    const vmReconfig = store.get('vmReconfig');  // 升降配信息
    const vmRecharge = store.get('vmRecharge');  // 续费信息
    if (vmReconfig) {
      store.set('vmReconfig', {});
    }
    if (vmRecharge) {
      store.set('vmRecharge', {});
    }
  }

  get licProps() {
    const { location, dispatch, loading, order } = this.props;
    const { currentItemId, disabled, isShow } = this.state;
    const { licenseDetail, licenseVData, vmBeOrderInfo } = order;
    const { canUseCouponList } = licenseVData;//可使用的优惠券列表

    // const { licenseDetail } = order;
    const query = location.query;
    const from = query.from;
    const orderNum = query.orderNum;
    // 判断优惠券列表是否为零
    if (canUseCouponList && canUseCouponList.length > 0) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }

    return {
      from,
      licenseVData,
      disabled,
      currentItemId,
      isOrdered: orderNum && !isEmpty(orderNum),  // 是否已经生成订单
      orderNum,
      isShow,
      licenseDetail,
      canUseCouponList,
      licLoading: orderNum && !isEmpty(orderNum) ?
        loading.effects['order/getLicenseDetailByNum']
        :
        loading.effects['order/getLicenseDebt'],
      onInit: () => {
        if (orderNum && !isEmpty(orderNum)) {
          // 根据订单号查询详情
          dispatch({
            type: 'order/getLicenseDetailByNum',
            payload: {
              orderNum
            }
          })
        } else {
          dispatch({
            type: 'order/getLicenseDebt'
          })
          const values = {
            orderSmallType: 'license',
          }
          dispatch({
            type: 'order/calcVMCostLicense',
            payload: values
          })
        }
      },
      btnLoading: orderNum && !isEmpty(orderNum) ? false : loading.effects['order/createLicOrder'],
      onCreateOrder: value => {
        dispatch({
          type: 'order/createLicOrder',
          payload: {
            couponId: ''  // TODO 优惠券
          }
        }).then(response => {
          if (response && response.flag) {
            dispatch({
              type: 'order/getLicenseDetailByNum',
              payload: {
                orderNum: response.resData
              }
            })

            router.push(`/account/order?from=${from}&&orderNum=${response.resData}`)

            // 展示选择支付方式窗口
            dispatch({
              type: 'order/showPayModal',
              payload: {
                amountToPay: value,
                orderNum: response.resData
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
      onPayClick: value => {
        // 展示选择支付方式窗口
        console.log('onPayClick', value)
        dispatch({
          type: 'order/showPayModal',
          payload: {
            amountToPay: value,
            orderNum
          }
        })
      },
      onCompleteClick: () => {
        this.toDealInfo();
      },
      // 点击代金券选中添加样式
      onCheckVoucherItem: (e) => {
        let couponId = e.id
        if (!isEqual(currentItemId, 0) && isEqual(currentItemId, e.id)) {
          couponId = 0
        }

        if (orderNum && !isEmpty(orderNum)) { // 已经生成订单

          this.setState({
            currentItemId: couponId,
            discountMoney: e.parValue
          })
          dispatch({
            type: 'order/calcVMCostLicense2',
            payload: {
              orderNum,
              couponId
            }
          })


        } else { //尚未生成订单
          this.setState({
            currentItemId: couponId,
            discountMoney: e.parValue
          })
          const values = {
            orderSmallType: 'license',
            couponId
          }
          dispatch({
            type: 'order/calcVMCostLicense',
            payload: values
          })
        }

      },
      // 控制优惠券显示隐藏
      onShowVouchers: (e) => {
        let isShow = e.target.checked;
        this.setState({
          currentItemId: 0,
        })
        if (orderNum && !isEmpty(orderNum)) { // 已经生成订单
          dispatch({
            type: 'order/calcVMCostLicense2',
            payload: {
              orderNum,
            }
          })
        } else { //尚未生成订单
          const values = {
            orderSmallType: 'license',
          }
          dispatch({
            type: 'order/calcVMCostLicense',
            payload: values
          })
        }
        if (!disabled) {
          this.setState({
            isShow
          })
        }
      },
    }
  }

  get vmProps() {
    const { location, dispatch, loading, order } = this.props;
    const { vmDetail, calcData, vmBeOrderInfo } = order;
    const { currentItemId, disabled, isShow } = this.state;
    const { canUseCouponList } = calcData;//可使用的优惠券列表
    const query = location.query;
    const from = query.from;
    const type = query.type;
    const orderNum = query.orderNum;
    const orderType = query.orderType;
    const vmReconfig = store.get('vmReconfig');  // 升降配信息
    const vmRecharge = store.get('vmRecharge');  // 续费信息

    // 判断优惠券列表是否为零
    if (canUseCouponList && canUseCouponList.length > 0) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }

    return {
      isOrdered: orderNum && !isEmpty(orderNum),  // 是否已经生成订单
      isReConfigStore: !isEmpty(vmReconfig),   // store中是否存储升降配数据
      isRechargeStore: !isEmpty(vmRecharge),            // store中是否存储续费数据
      orderNum,
      disabled,
      currentItemId,
      isShow,
      canUseCouponList,
      orderType,
      vmBeOrderInfo,
      vmDetail,
      calcData,
      dispatch,
      vmLoading: orderNum && !isEmpty(orderNum) ?
        loading.effects['order/getVmDetailByNum']
        : false,
      onInit: () => {
        // 根据订单号查询详情
        if (orderNum && !isEmpty(orderNum)) {
          // VM 新购订单、升降配订单、续费订单
          dispatch({
            type: 'order/getVmDetailByNum',
            payload: {
              orderNum
            }
          })
        } else if (vmReconfig && !isEmpty(vmReconfig)) { // 升降配尚未生成订单
          dispatch({
            type: 'order/updateState',
            payload: {
              vmDetail: vmReconfig
            }
          })

          const values = {
            orderSmallType: 'reVm',
            flavorId: vmReconfig && vmReconfig.flavorId,
            networkFlavorId: vmReconfig && vmReconfig.networkFlavorId,
            vmIdList: vmReconfig && vmReconfig.vmIdList,
          }
          dispatch({
            type: 'order/calcVMCost',
            payload: values
          })
        } else if (vmRecharge && !isEmpty(vmRecharge)) { // 续费尚未生成订单
          const vmIdList = vmRecharge.vmIdList;
          if (vmIdList && vmIdList.length > 0) {
            // 一个群组下多个vmId，环境配置是一致的，只需要取一个vmId，获取详情即可
            const vmId = vmIdList[0];
            dispatch({
              type: 'order/getVmByVmId',
              payload: {
                vmId
              }
            }).then(response => {
              if (response && response.flag) {
                dispatch({
                  type: 'order/updateState',
                  payload: {
                    vmDetail: {
                      ...vmRecharge,
                      vmInfo: response.resData
                    }
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

            const values = {
              orderSmallType: 'renew',
              buyDuration: vmRecharge && vmRecharge.buyDuration,
              buyUnit: vmRecharge && vmRecharge.buyUnit,
              vmIdList: vmRecharge && vmRecharge.vmIdList,
            }
            dispatch({
              type: 'order/calcVMCost',
              payload: values
            })

          }
        }
      },
      btnLoading: orderNum && !isEmpty(orderNum) ? false : loading.effects['order/createReconfigOrder'],
      onPayClick: value => {
        // 展示选择支付方式窗口
        console.log('onPayClick', value)
        dispatch({
          type: 'order/showPayModal',
          payload: {
            amountToPay: value,
            orderNum
          }
        })
      },
      // 点击代金券选中添加样式
      onCheckVoucherItem: (e) => {
        let couponId = e.id
        if (!isEqual(currentItemId, 0) && isEqual(currentItemId, e.id)) {
          couponId = 0
        }

        if (vmRecharge && !isEmpty(vmRecharge)) { // 续费尚未生成订单
          const vmIdList = vmRecharge.vmIdList;
          if (vmIdList && vmIdList.length > 0) {
            this.setState({
              currentItemId: couponId,
              discountMoney: e.parValue
            })
            const values = {
              orderSmallType: 'renew',
              buyDuration: vmRecharge && vmRecharge.buyDuration,
              buyUnit: vmRecharge && vmRecharge.buyUnit,
              vmIdList: vmRecharge && vmRecharge.vmIdList,
              couponId
            }
            dispatch({
              type: 'order/calcVMCost',
              payload: values
            })
          }

        } else if (vmReconfig && !isEmpty(vmReconfig)) { // 升降调整配置尚未生成订单
          this.setState({
            currentItemId: couponId,
            discountMoney: e.parValue
          })
          const values = {
            orderSmallType: 'reVm',
            flavorId: vmReconfig && vmReconfig.flavorId,
            networkFlavorId: vmReconfig && vmReconfig.networkFlavorId,
            vmIdList: vmReconfig && vmReconfig.vmIdList,
            couponId
          }
          dispatch({
            type: 'order/calcVMCost',
            payload: values
          })
        } else { //已经生成订单
          this.setState({
            currentItemId: couponId,
            discountMoney: e.parValue
          })
          dispatch({
            type: 'order/calcVMCost2',
            payload: {
              orderNum,
              couponId
            }
          })
        }
      },
      // 控制优惠券显示隐藏
      onShowVouchers: (e) => {
        let isShow = e.target.checked;
        this.setState({
          currentItemId: 0,
        })
        if (vmRecharge && !isEmpty(vmRecharge)) { // 续费尚未生成订单
          const vmIdList = vmRecharge.vmIdList;
          if (vmIdList && vmIdList.length > 0) {
            const values = {
              orderSmallType: 'renew',
              buyDuration: vmRecharge && vmRecharge.buyDuration,
              buyUnit: vmRecharge && vmRecharge.buyUnit,
              vmIdList: vmRecharge && vmRecharge.vmIdList,
            }
            dispatch({
              type: 'order/calcVMCost',
              payload: values
            })
          }

        } else if (vmReconfig && !isEmpty(vmReconfig)) { // 升降调整配置尚未生成订单
          const values = {
            orderSmallType: 'reVm',
            flavorId: vmReconfig && vmReconfig.flavorId,
            networkFlavorId: vmReconfig && vmReconfig.networkFlavorId,
            vmIdList: vmReconfig && vmReconfig.vmIdList,
          }
          dispatch({
            type: 'order/calcVMCost',
            payload: values
          })
        } else { //已经生成订单
          this.setState({
            currentItemId: 0,
          })
          dispatch({
            type: 'order/calcVMCost2',
            payload: {
              orderNum
            }
          })
        }

        if (!disabled) {
          this.setState({
            isShow
          })
        }
      },

      onCreateOrder: value => {
        if (vmReconfig && !isEmpty(vmReconfig)) {
          // 创建升降配订单
          dispatch({
            type: 'order/createReconfigOrder',
            payload: vmReconfig
          }).then(response => {
            if (response && response.flag) {
              dispatch({
                type: 'order/getVmDetailByNum',
                payload: {
                  orderNum: response.resData,
                  couponId: currentItemId
                }
              })

              router.push(`/account/order?from=${from}&&orderNum=${response.resData}&&orderType=reconfig`)

              // 展示选择支付方式窗口
              dispatch({
                type: 'order/showPayModal',
                payload: {
                  amountToPay: value,
                  orderNum: response.resData
                }
              })

              // 清空数据
              store.set('vmReconfig', {});
              dispatch({
                type: 'order/updateState',
                payload: {
                  vmDetail: {}
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
        } else if (vmRecharge && !isEmpty(vmRecharge)) {
          // 创建续费订单
          dispatch({
            type: 'order/createRechargeOrder',
            payload: {
              orderSmallType: 'renew',
              buyDuration: vmRecharge.buyDuration,
              buyUnit: vmRecharge.buyUnit,
              discountRate: vmRecharge.discountRate,
              vmIdList: vmRecharge.vmIdList,
              paymentMode: 1  // 预付费
            }
          }).then(response => {
            if (response && response.flag) {
              dispatch({
                type: 'order/getVmDetailByNum',
                payload: {
                  orderNum: response.resData,
                  couponId: currentItemId
                }
              })

              router.push(`/account/order?from=${from}&&orderNum=${response.resData}`)

              // 展示选择支付方式窗口
              dispatch({
                type: 'order/showPayModal',
                payload: {
                  amountToPay: value,
                  orderNum: response.resData
                }
              })

              // 清空数据
              store.set('vmRecharge', {});
              dispatch({
                type: 'order/updateState',
                payload: {
                  vmDetail: {}
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
        }

      },
      onCompleteClick: () => {
        this.toDealInfo();
      }
    }
  }



  get caProps() {
    const { location, dispatch, loading, order } = this.props;
    const { vmDetail, calcData, vmBeOrderInfo } = order;
    const { currentItemId, disabled, isShow } = this.state;
    const { canUseCouponList } = calcData;//可使用的优惠券列表
    const query = location.query;
    const from = query.from;
    const orderNum = query.orderNum;

    return {
      orderNum,
      disabled,
      currentItemId,
      isShow,
      canUseCouponList,
      vmBeOrderInfo,
      vmDetail,
      calcData,
      dispatch,
      onInit: () => {
        console.log('onInit1', orderNum)
        if (orderNum && !isEmpty(orderNum)) {
          // 根据订单号查询详情
          dispatch({
            type: 'order/getVmDetailByNum',
            payload: {
              orderNum
            }
          })
          console.log('onInit2', orderNum)
        }
      },
      onCreateOrder: value => {
        // 展示选择支付方式窗口
        dispatch({
          type: 'order/showPayModal',
          payload: {
            amountToPay: value,
            orderNum: response.resData
          }
        })
      },
      // 点击代金券选中添加样式
      onCheckVoucherItem: (e) => {
        let couponId = e.id
        if (!isEqual(currentItemId, 0) && isEqual(currentItemId, e.id)) {
          couponId = 0
        }
        this.setState({
          currentItemId: couponId,
          discountMoney: e.parValue
        })
        dispatch({
          type: 'order/calcVMCost2',
          payload: {
            orderNum,
            couponId
          }
        })
      },
      // 控制优惠券显示隐藏
      onShowVouchers: (e) => {
        let isShow = e.target.checked;
        this.setState({
          currentItemId: 0,
        })
        dispatch({
          type: 'order/calcVMCost2',
          payload: {
            orderNum
          }
        })
        if (!disabled) {
          this.setState({
            isShow
          })
        }
      },
      onPayClick: value => {
        // 展示选择支付方式窗口
        dispatch({
          type: 'order/showPayModal', //ST2022050913595963826065007357680
          payload: {
            amountToPay: value,
            orderNum
          }
        })
      },
      onCompleteClick: () => {
        this.toDealInfo();
      }
    }
  }



  // 跳转到订单详情页面
  toDealInfo = () => {
    const { location, order } = this.props;
    const { licenseDetail, vmDetail } = order;

    const query = location.query;
    const url_orderNum = query.orderNum;

    const detail = isEmpty(vmDetail) ? licenseDetail : vmDetail;
    const url_orderType = detail && detail.orderBigType;

    if (url_orderNum) {
      router.push(`/account/deal/info?orderNum=${url_orderNum}&&orderType=${url_orderType}`);
    }
  }
  getFromUrl = (from) => {
    let url = from;
    switch (from) {
      case 'license':
        url = '/account/licenseToPay';
        break;
      case 'deal':
        url = '/account/deal';
        break;
      case 'home':
        url = '/account/home';
        break;
      case 'vm':
        url = '/vm';
        break;
      case 'capacityOrder':
        url = '/dictionary';
        break;
      default:
        url = from;
        break
    }
    return url;
  }

  get payModalProps() {
    const { dispatch, order, location } = this.props;
    const { currentItemId } = this.state;
    const { payModalVisible, amountToPay, orderNum, licenseDetail, vmDetail, calcData } = order;
    const query = location.query;
    const from = query.from
    const url_orderNum = query.orderNum;

    let detail;
    if (isEqual(from, "capacityOrder")) {
      detail = calcData;
    } else if (!isEqual(from.indexOf("openGroup"), -1) || isEqual(from, "vm")) {
      detail = vmDetail
      console.log('vmDetail', vmDetail)

    } else {
      detail = licenseDetail
    }

    console.log('detail', detail)
    console.log('from', isEqual(from.indexOf("openGroup"), -1))



    const url_orderType = detail && detail.orderBigType;

    return {
      detail,
      amountToPay,
      // orderNum,
      visible: payModalVisible,
      destroyOnClose: true,
      width: 680,
      centered: true,
      closable: true,
      maskClosable: false,
      title: '订单提交成功！请选择支付方式',
      onCancel: () => {
        dispatch({
          type: 'order/hidePayModal',
          payload: {
            // amountToPay: 0,
            // orderNum: undefined,
            // licenseDetail: {},
            // vmDetail: {},
            // calcData: {},
          },
        })
        // console.log('url_orderNum', url_orderNum)
        // if (url_orderNum) {
        //   router.push(`/account/deal/info?orderNum=${url_orderNum}&&orderType=${url_orderType}`);
        // }
      },
      onOnlinePay: value => {// 在线支付
        const data = {
          orderNum,
          payModes: value,
          couponId: currentItemId
        }
        console.log('data', data)

        dispatch({
          type: 'app/pay',
          payload: data,
        }).then(response => {
          if (response && isEqual(response.flag, false)) { // 失败
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          } else if (response && response.flag) {
            dispatch({
              type: 'order/hidePayModal',
              payload: {
                amountToPay: 0,
                orderNum: undefined
              },
            })

            // 打开支付确认窗口
            dispatch({
              type: 'order/showPayResultModal',
              payload: {},
            })

            // 支付宝支付，跳转至支付宝支付页面
            if (value.indexOf('AL') > -1) {
              const myWindow = window.open('', '_blank');
              myWindow.document.write(response.resData);
              myWindow.focus();
            }

            // 余额支付，重新获取当前余额
            if (value.indexOf('AB') > -1) {
              dispatch({
                type: 'app/queryBalance',
                payload: {},
              })

            }

          }
        })
      }
    }
  }

  get payResultProps() {
    const { dispatch, order, location } = this.props;
    const { payResultMdlVisible, licenseDetail, vmDetail, calcData } = order;
    return {
      detail: isEmpty(calcData) ? licenseDetail : calcData,
      visible: payResultMdlVisible,
      destroyOnClose: true,
      width: 600,
      centered: true,
      closable: true,
      maskClosable: false,
      onCancel: () => {
        dispatch({
          type: 'order/hidePayResultModal',
          payload: {},
        })
      },
      checkPayComplete: () => {
        // 重新刷新订单，payStatus
        this.handleRefreshOrder();

        // 检验是否支付完成之后，关闭窗口
        dispatch({
          type: 'order/hidePayResultModal',
          payload: {},
        })
      }
    }
  }

  handleRefreshOrder = () => {
    const { location, dispatch } = this.props;
    const query = location.query;
    const from = query.from;
    const type = query.type;
    const orderNum = query.orderNum;
    const orderType = query.orderType;

    const isLicenseOrder = isEqual(from, 'license') || isEqual(type, 'license');
    const isVmOrder = isEqual(from, 'vm') || (isEqual(from, 'deal') && isEqual(type, 'vm')) || isEqual(orderType, 'reconfig');

    // 根据订单号查询详情
    if (orderNum && !isEmpty(orderNum)) {
      if (isLicenseOrder) {
        // License订单
        dispatch({
          type: 'order/getLicenseDetailByNum',
          payload: {
            orderNum
          }
        })
      } else {
        // VM 新购订单、升降配订单
        dispatch({
          type: 'order/getVmDetailByNum',
          payload: {
            orderNum
          }
        })
      }
    }
  }

  render() {
    const { location } = this.props;
    const query = location.query;
    const from = query.from;
    const url = this.getFromUrl(from);
    const type = query.type;

    const isCapacityOrder = isEqual(from, 'capacityOrder') || isEqual(type, 'capacityOrder');//判断是不是扩容订单
    const isLicenseOrder = isEqual(from, 'license') || isEqual(type, 'license');
    const isVmOrder = isEqual(from, 'vm') || (isEqual(from, 'deal') && isEqual(type, 'vm')) || from.indexOf('openGroup') > -1;
    return (
      <Page inner>
        <Link to={url}>
          <Icon type="arrow-left" style={{ fontSize: '16px' }} />
        </Link>

        {isLicenseOrder
          &&
          <LicenseOrder {...this.licProps} />
        }

        {isVmOrder
          &&
          <VmOrder {...this.vmProps} />
        }

        {isCapacityOrder
          &&
          <CapacityOrder {...this.vmProps} />
        }
        <PayModal {...this.payModalProps} />
        <PayResultModal {...this.payResultProps} />
      </Page>
    )
  }
}

export default Check

