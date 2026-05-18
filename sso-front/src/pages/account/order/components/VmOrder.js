import React, { PureComponent } from 'react';
import Page from 'components/Page';
import VouchersList from './VouchersList';
import { Button, Row, Col, Skeleton, Select } from 'antd'
import styles from './styles.less'
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

// VM订单
class VmOrder extends PureComponent {
  state = ({
    isShow: false,
    disabled: false,
    currentItemId: 0, //控制选中的样式
    discountMoney: 0,//代金券折扣金额
  })

  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  handlePayClick = (value, e) => {
    e.preventDefault();
    const { onPayClick } = this.props;
    onPayClick(value);
  }

  handleClick = (value, e) => {
    e.preventDefault();
    const { onCreateOrder } = this.props;
    onCreateOrder(value);
  }

  renderTools = (tools, isJson) => {
    let toolInfo;
    if (isJson) {
      toolInfo = tools;
    } else {
      toolInfo = tools && JSON.parse(tools);
    }

    return toolInfo && toolInfo.map((item, index) => {
      const edaTools = item.edaTools;

      const tools = edaTools.map(ele => {
        return (
          <div key={ele.type}>
            <p className={styles.name}>{ele.type}：</p>
            {ele.tool_infos.map(t => (
              <p className={styles.toolValue} key={t.tool_name}>{t.tool_name}[{t.tool_version}]</p>
            ))}
          </div>
        )
      })

      return (
        <div key={item.company} className={styles.toolDiv}>
          <div className={styles.toolTitle}>
            <span>
              {index + 1}. {item.company}
            </span>
          </div>

          {tools}
        </div>
      )
    })
  }

  handleCompleteClick = (e) => {
    e.preventDefault();
    const { onCompleteClick } = this.props;
    onCompleteClick();
  }


  // 点击代金券选中添加样式
  checkVoucherItem = (e) => {
    const { onCheckVoucherItem } = this.props
    onCheckVoucherItem(e);
  }
  //显示隐藏优惠券
  showVouchers = (e) => {
    const { onShowVouchers } = this.props
    onShowVouchers(e);
  }


  // 测试传入优惠券列表和方法
  get vouchersProps() {

    const { canUseCouponList, currentItemId,isShow, disabled } = this.props
    console.log("this.props",this.props)
    return {
      canUseCouponList,//可使用的优惠券列表
      currentItemId,
      isShow,
      disabled,
      checkVoucherItem: (e) => {//选择优惠券
        this.checkVoucherItem(e)
      },
      showVouchers: (e) => {//显示隐藏优惠券，重置折扣金额
        this.showVouchers(e)
      }
    }
  }


  render() {
    const { vmLoading, vmDetail,canUseCouponList, calcData, isOrdered, orderNum, vmBeOrderInfo, isReConfigStore, isRechargeStore } = this.props;
    const { priceInfo } = vmDetail;
    const vmInfos = vmDetail && vmDetail.virtualMachines;
    const vmCfg = vmInfos && vmInfos.length > 0 && vmInfos[0];
    const vmIds = [];
    const vmNames = [];
    const hostNames = [];
    vmInfos && vmInfos.map(item => {
      vmIds.push(item.vmId);
      vmNames.push(item.vmName);
      hostNames.push(item.hostname);
    })

    let vmId;
    let vmName;
    if (isReConfigStore || isRechargeStore) {
      vmId = vmDetail.vmIdList && vmDetail.vmIdList.toString();
      vmName = vmDetail.vmNames && vmDetail.vmNames.toString();
    } else if (vmDetail && vmDetail.virtualMachines) {
      vmId = vmIds.toString();
      vmName = vmNames.toString();
    }
    // 
    if (vmDetail && isEqual(vmDetail.totalPrice, 0) || canUseCouponList && canUseCouponList.length === 0) {
      this.setState({
        disabled: true
      })
    }


    return (
      <Page inner>
        <Skeleton loading={vmLoading}>
          <Row>
            <Col span={18} className={styles.leftCol}>
              <div className={styles.payCard}>
                <div className={styles.hd}>
                  {isOrdered ?
                    <h3 className={styles.title}>订单{orderNum}</h3>
                    :
                    <h3 className={styles.title}>商品清单</h3>
                  }
                </div>
                <div className={styles.bd}>
                  <div className={styles.box}>
                    <div className={styles.inner}>
                      <div className={styles.boxHd}>
                        <div className={styles.title}>
                          {(isReConfigStore || vmDetail && isEqual(vmDetail.orderBigType, 'reconfig')) && 'IC设计云服务器配置变更'}
                          {(isRechargeStore || (vmDetail && isEqual(vmDetail.orderBigType, 'vmware') && isEqual(vmDetail.orderSmallType, 'renew'))) && 'IC设计云服务器续费'}
                          {(vmDetail && isEqual(vmDetail.orderBigType, 'vmware') && isEqual(vmDetail.orderSmallType, 'vmware')) && '新购IC设计云服务器'}
                        </div>
                        <div className={styles.extra}>
                          <span className={styles.cost}>
                            <span className={styles.num}>
                              {vmDetail && vmDetail.totalPrice}
                            </span>
                            <span className={styles.unit}>
                              元
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className={styles.boxbd}>
                        <Row>
                          <Col span={12}>
                            <div className={styles.panel}>

                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>实例ID：</label>
                                </div>
                                <div className={styles.value}>
                                  {vmId}
                                </div>
                              </div>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>实例名称：</label>
                                </div>
                                <div className={styles.value}>
                                  {vmName}
                                </div>
                              </div>

                            </div>
                          </Col>
                          <Col span={12}>
                            <div className={styles.panel}>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>付费方式：</label>
                                </div>
                                <div className={styles.value}>
                                  预付费
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div className={styles.panel}>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>CPU：</label>
                                </div>
                                <div className={styles.value}>
                                  {isReConfigStore && vmDetail && vmDetail.reconfigVMInfo && vmDetail.reconfigVMInfo.cpu}
                                  {isRechargeStore && vmDetail && vmDetail.vmInfo && vmDetail.vmInfo.cpu}
                                  {vmCfg && vmCfg.cpu}
                                  核
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div className={styles.panel}>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>内存：</label>
                                </div>
                                <div className={styles.value}>
                                  {isReConfigStore && vmDetail && vmDetail.reconfigVMInfo && vmDetail.reconfigVMInfo.memory}
                                  {isRechargeStore && vmDetail && vmDetail.vmInfo && (vmDetail.vmInfo.memory / 1024)}
                                  {vmCfg && (vmCfg.memory / 1024)}
                                  G
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div className={styles.panel}>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>数据盘：</label>
                                </div>
                                <div className={styles.value}>
                                  {isReConfigStore && (vmDetail && vmDetail.reconfigVMInfo && vmDetail.reconfigVMInfo.disk)}
                                  {isRechargeStore && vmDetail && vmDetail.vmInfo && (vmDetail.vmInfo.disk / 1024)}
                                  {vmCfg && (vmCfg.disk / 1024)}
                                  G
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <div className={styles.panel}>
                              <div className={styles.text}>
                                <div className={styles.lb}>
                                  <label>带宽：</label>
                                </div>
                                <div className={styles.value}>
                                  按带宽计费（带宽
                                  {vmDetail && vmDetail.networkFlavorName}
                                  ）
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <div className={styles.panel}>
                              <div className={styles.toolText}>
                                <div className={styles.lb}>
                                  <label>EDA工具配置：</label>
                                </div>
                                <div className={styles.value}>
                                  {isReConfigStore && vmDetail && vmDetail.reconfigVMInfo && this.renderTools(vmDetail.reconfigVMInfo.edaTools, true)}
                                  {isRechargeStore && vmDetail && vmDetail.vmInfo && this.renderTools(vmDetail.vmInfo.tools)}
                                  {vmCfg && this.renderTools(vmCfg.tools)}
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={classNames(styles.payCoupon, styles.payCard)}>
              <div className={styles.hd}>
                <h3 className={styles.title}>优惠券</h3>
              </div>
            </div> */}

            </Col>
            <Col span={6} className={styles.side}>
              <div className={styles.inner}>
                <div className={styles.card}>
                  <div className={styles.cardHd}>
                    <div className={styles.cardTitle}>
                      核对订单
                    </div>
                  </div>

                  <div className={styles.cardBd}>
                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label>
                            {(isReConfigStore || vmDetail && isEqual(vmDetail.orderBigType, 'reconfig') || isEqual(vmDetail.orderSmallType, 'reVm')) && 'IC设计云服务器配置变更'}
                            {(isRechargeStore || (vmDetail && isEqual(vmDetail.orderBigType, 'vmware') && isEqual(vmDetail.orderSmallType, 'renew'))) && 'IC设计云服务器续费'}
                            {(vmDetail && isEqual(vmDetail.orderBigType, 'vmware') && isEqual(vmDetail.orderSmallType, 'vmware')) && '新购IC设计云服务器'}
                          </label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num}>
                              { isEqual(vmDetail.payStatus, 1) ? priceInfo && priceInfo.rebatePrice  : calcData && calcData.rebatePrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label>商品总计：</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num} style={{ fontWeight: 'bold' }}>
                            { isEqual(vmDetail.payStatus, 1) ? priceInfo && priceInfo.rebatePrice  : calcData && calcData.rebatePrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label style={{ fontSize: '14px' }}>代金券抵扣：</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num}> { isEqual(vmDetail.payStatus, 1) ? priceInfo && priceInfo.couponPrice  : calcData && calcData.couponPrice || 0} </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className={styles.hr} style={{ marginBottom: 0 }} />

                    <div className={styles.form}>
                      <div className={classNames(styles.formText, styles.total)}>
                        <div className={styles.formLabel}>
                          <label>实付金额</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={classNames(styles.cost, styles.costXL)}>
                            <span className={styles.num} style={{ marginBottom: '10px' }}>
                              { isEqual(vmDetail.payStatus, 1) ? priceInfo && priceInfo.realPrice   : calcData && calcData.realPrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {isEqual(vmDetail.payStatus, 1) ?
                      <Button type="primary" className={classNames(styles.btn, styles.completeBtn)} onClick={e => this.handleCompleteClick(e)}>支付完成</Button>
                      :
                      (isOrdered ?
                        <Button type="primary" className={styles.btn} onClick={e => this.handlePayClick(calcData.realPrice, e)}>立即支付</Button>
                        :
                        <Button type="primary" className={styles.btn} onClick={e => this.handleClick(calcData.realPrice, e)}>提交订单</Button>
                      )
                    }

                    <p className={styles.weaker}>
                      所有消费 (包括购买、续费等）均可开票，订单支付成功后，可前往&nbsp;
                      <a href="#" className={styles.link}>发票管理开票</a>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* 优惠券 */}
          
          {!isEqual(vmDetail.payStatus, 1) ?<VouchersList {...this.vouchersProps} />:''}
        </Skeleton>
      </Page >
    )
  }
}

export default VmOrder

