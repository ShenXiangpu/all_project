import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page/Page';
import { Progress, Card, Button } from 'antd';
import styles from './style.less';
import PayModal from './components/PayModal'
import BuyResultModal from '../components/BuyResultModal'
import PayOrderResultsModal from './components/PayOrderResultsModal'
import isEqual from 'lodash.isequal';
import { isEmpty } from 'lodash'
import store from 'store';
import { router } from "umi";

const balance = store.get('balance'); 

@connect(({ app, dictionary, loading }) => ({ app, dictionary, loading }))
class BuyCapacity extends PureComponent {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      isModalShow: false, // 控制弹出框的显示隐藏
      // 传递所有套餐，供用户切换
      payMoney:0,//套餐的价格
      capacityList: [],
      capacityItem: {},
      buyResultMdlVisible: false,
      payOrderResultsMdlVisible: false,//购买容量订单结果列表
      payLoading:false,
      isBalance:false,//是否可用余额支付
      checked: 'balance',//默认首选余额支付
      closable:true,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dictionary/queryList',
      payload: {},
    })

    dispatch({
      type: 'dictionary/checkStorage',
      payload: {},
    })
  }


  // 生成预订单
  createPayOrder = (flavorId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'dictionary/createCapacityOrderId',
      payload: {
        flavorId
      }
    })
  }

  /**
 * 点击立即购买，打开对话框，传入对应的套餐
 * @param {*} item 套餐
 */
  openPayModal = (index, capacityList, item) => {
    if(item.yearPrice <= balance || isEqual(item.yearPrice,0) ){ //余额大于等于订单金额
      this.setState({
        isModalShow: true,
        capacityList,
        capacityItem: item,
        isBalance:true,
        checked:'balance'
      })
    }else {
      this.setState({
        isModalShow: true,
        capacityList,
        capacityItem: item,
        isBalance:false,
        checked:'online'
      })
    }
    
  }

  get payModalProps() {

    const {  isModalShow, capacityList,isBalance, capacityItem,payMoney,payLoading,checked,closable } = this.state;

    return {
      // cardList,
      visible: isModalShow,
      capacityList,
      capacityItem,
      payMoney,
      closable,
      payLoading,
      destroyOnClose: true,
      isBalance,
      checked,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '套餐容量',
      centered: true,
      width: 800,
      footer: null,
      onCancel: () => { //点击关闭X
        this.setState({ isModalShow: false,payMoney:0 })
      },
      // 生成预订单
      createPayOrder: (flavorId, value) => {
        const { dispatch } = this.props
        this.setState({closable:false})
        dispatch({
          type: 'dictionary/createCapacityOrderId',
          payload: {
            flavorId
          }
        }).then(response => {
          if (response && isEqual(response.flag, true)) {
          console.log('response',response)
          router.push(`/account/order?from=capacityOrder&&type=capacityOrder&&orderNum=${response.resData}&&orderType=capacityOrder`);

            // const data = {
            //   orderNum: response.resData,
            //   payModes: value
            // }
            // dispatch({
            //   type: 'app/pay',
            //   payload: data,
            // }).then(response => {
            //   if (response && isEqual(response.flag, false)) { // 失败
            //     message.config({
            //       top: 100,
            //       duration: 2,
            //     });
            //     message.error(response.errMessage)
            //     this.setState({ isModalShow: false, buyResultMdlVisible: true, payLoading:false,payMoney:0,checked:'balance',isBalance,closable:true })
            //   } else if (response && response.flag) {
            //     this.setState({ isModalShow: false, buyResultMdlVisible: true, payLoading:false,payMoney:0,checked:'balance',isBalance,closable:true })
            //     // 支付宝支付，跳转至支付宝支付页面
            //     if (value.indexOf('AL') > -1) {
            //       const myWindow = window.open('', '_blank');
            //       myWindow.document.write(response.resData);
            //       myWindow.focus();
            //     }
            //     // 余额支付，重新获取当前余额
            //     if (value.indexOf('AB') > -1) {
            //       dispatch({
            //         type: 'app/queryBalance',
            //         payload: {},
            //       })

            //     }

            //   }
            // })
          }
        })
      },
      handlerChange:(propsValue) => {
        const { payLoading , payMoney,isBalance,checked,closable } = propsValue;
        this.setState({payMoney,payLoading,isBalance,checked,closable})
      }
    }
  }
  handleRefresh = () => {
    const { location, dispatch } = this.props
    const payload = isEmpty(location.query) ? {
      currentPath: '/'
    } : location.query;
    dispatch({
      type: 'dictionary/query',
      payload: payload,
    })
    dispatch({
      type: 'dictionary/checkStorage',
      payload: {},
    })
  }
  /**
   * 打开扩容详情
   */
  openOrderList = () => {
    const { dispatch, } = this.props;
    const defaultPagination = {
      pageNum: 1,
      pageSize: 10,
    }
    dispatch({
      type: 'dictionary/getOneUserInfo',
      payload: {
        ...defaultPagination
      },
    })
    this.setState({ payOrderResultsMdlVisible: true })
  }
  /**
   * 支付结果
   */
  get buyResultProps() {
    const { dispatch, dictionary, location } = this.props;
    const { buyResultMdlVisible } = this.state;

    return {
      visible: buyResultMdlVisible,
      destroyOnClose: true,
      width: 500,
      centered: true,
      closable: true,
      maskClosable: false,
      onCancel: () => {
        this.setState({ buyResultMdlVisible: false })
      },
      checkBuyComplete: () => {
        this.handleRefresh();
        this.setState({ buyResultMdlVisible: false })
      }
    }
  }
  /**
   * 改变扩容modal订单的页面
   * @param {*} pagination 
   * @param {*} filtersArg 
   * @param {*} sorter 
   */
  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };


    dispatch({
      type: 'dictionary/getOneUserInfo',
      payload: params,
    });
  };

  get payOrderResultsProps() {
    const { dispatch, dictionary, location,loading } = this.props;
    const {capatityOrderslist, pagination} = dictionary;
    const { payOrderResultsMdlVisible } = this.state;

    return {
      modalProps: {
        visible: payOrderResultsMdlVisible,
        destroyOnClose: true,
        width: 1000,
        title: '扩容详情',
        centered: true,
        closable: true,
        maskClosable: false,
        footer: null,
        onCancel: () => {
          this.setState({ payOrderResultsMdlVisible: false })
        }
      },
      tableProps: {
        // dataSource: licenseInUsedList,
        // loading: loading.effects['licenseServer/getLicenseInUsedList'],
        dataSource: capatityOrderslist,
        loading: loading.effects['dictionary/getOneUserInfo'],
        // pagination,
        // onChange: (pagination, filters, sorter) => {
        //   this.handleTableChange(pagination, filters, sorter)
        // },
      }

    }
  }


  render() {

    const { capacityList, storage } = this.props.dictionary;

    const percent = storage.usedStorageRate;
    const used = storage.usedStorage
    const usedStorage = (
      <div className={styles.item}>
        <span className={styles.sub}>已使用：{used}</span>
        {/* 查看购买详情 */}
        <a className={styles.sub} style={{ fontWeight: 'bold' }} onClick={() => this.openOrderList()} >查看详情</a>
      </div>
    );

    let color = '#70e622';
    if (percent) {
      if (percent > 0.5 && percent < 0.8) {
        color = '#fadb14';
      } else if (percent > 0.8 || percent === 0.8) {
        color = "#f5222d";
      }
    }



    return (
      <Page inner>
        <div className={styles.bannerBox}>
          <p><span className={styles.title}>扩充存储容量</span><span>（购买后随即生效）</span></p>
          <div className={styles.progressDiv}>
            <Progress
              className={styles.progress}
              size="big"
              percent={percent * 100}
              format={() => usedStorage}
              strokeColor={color}
              status={percent && percent >= 1 ? "exception" : null}
            />
          </div>
          {/* 扩容套餐模块 */}
          <div className={styles.cardContainer}>
            {
              capacityList && capacityList.length > 0 && capacityList.map((item, index) => {
                return (
                  <div className={styles.itemContainer} key={index} >
                    <Card style={{ width: 200 }}>
                      <div className={styles.itemP}>
                        <div className={styles.itemTop}>{item.flavorName}</div>
                        <div className={styles.itemSection}>￥{item.description}</div>
                        <Button type="primary" shape="round" onClick={() => this.openPayModal(index, capacityList, item)}>
                          立即购买
                        </Button>
                      </div>
                    </Card>

                  </div>

                )
              })
            }
          </div>
        </div>
        {/* 支付对话框,跳转支付，关闭PayModal,打开BuyResultModal */}
        <PayModal {...this.payModalProps} />
        <BuyResultModal {...this.buyResultProps} />
        <PayOrderResultsModal {...this.payOrderResultsProps} />
      </Page>
    );
  }
}

export default BuyCapacity;
