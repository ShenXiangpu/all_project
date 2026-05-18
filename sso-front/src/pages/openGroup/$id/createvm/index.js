import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Form, message, Modal } from 'antd';
import ReviewConfig from './components/ReviewConfig';
import debounce from 'lodash/debounce';
import Bottom from './components/Bottom';
import { isEmpty, isEqual } from 'lodash';
import styles from './style.less';
import store from 'store';

@Form.create()
@connect(({ app, openGroup, loading }) => ({ app, openGroup, loading }))
class CreateVm extends Component {
  state = {
    periodKey: undefined,      // 选中的购买时长
    currentItem: {},
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } }, openGroup } = this.props;
    const { currentGroupVMConfig } = openGroup;
    const { periodKey } = this.state;

    // 获取购买年限列表
    dispatch({
      type: 'openGroup/getRebateList',
    })

    dispatch({
      type: 'openGroup/getGroupById',
      payload: {
        groupId: id
      }
    })

    dispatch({
      type: 'openGroup/getVmNewConfigByGroupId',
      payload: {
        groupId: id
      }
    })

    // 获取规格
    dispatch({
      type: 'openGroup/getVmStandardList',
      payload: { status: 1 }
    })

    if (currentGroupVMConfig && !isEmpty(currentGroupVMConfig)) {
      this.calcVMConst(periodKey);
    }
  }

  componentDidUpdate(preProps, preState) {
    const { openGroup: { rebateList, currentGroupVMConfig, templateList } } = this.props;
    const { periodKey } = this.state;
    const { periodKey: old_periodKey } = preState;
    const { currentGroupVMConfig: old_currentGroupVMConfig, old_templateList } = preProps.openGroup;
    if ((currentGroupVMConfig && !isEqual(currentGroupVMConfig, old_currentGroupVMConfig))
      && (templateList && !isEqual(templateList, old_templateList))
      || (periodKey && !isEqual(periodKey, old_periodKey))) {
      this.calcVMConst(periodKey);
    }
  }

  calcVMConst = (periodKey) => {
    const { dispatch, openGroup: { rebateList, currentGroupVMConfig, templateList } } = this.props;
    const flavorId = currentGroupVMConfig && currentGroupVMConfig.flavorId;
    let flavor = {};
    if (flavorId) {
      const arr = templateList.filter(item => item.id === Number(flavorId));
      flavor = arr && arr.length > 0 && arr[0];
    }

    const currentItem = {
      ...currentGroupVMConfig,
      instanceConfig: flavor,
    }

    this.setState({ currentItem });

    let arr = rebateList.slice(0, 1);
    if (periodKey) {
      arr = rebateList.filter(item => isEqual(item.id, periodKey));
    }

    if (arr && arr.length > 0) {
      let data = {
        orderSmallType: 'vmware',
        flavorId,
        buyDuration: arr[0].buyDuration,
        buyUnit: arr[0].buyUnit,
        discountRate: arr[0].rebate,
        groupId: currentItem.groupId,
        // userCounts: currentItem.userCounts
      }

      dispatch({
        type: 'openGroup/calcVMCost',
        payload: data
      })
    }
  }

  get reviewProps() {
    const { loading, openGroup, form } = this.props
    const { rebateList } = openGroup;
    const { currentItem } = this.state;
    return {
      loading: loading.effects['openGroup/getVmNewConfigByGroupId'],
      periods: rebateList,
      form,
      item: currentItem
    }
  }

  get bottomProps() {
    const { dispatch, openGroup, loading, form: { validateFieldsAndScroll }, match: { params: { id } } } = this.props
    const { calcVmPrice, rebateList } = openGroup;
    const { periodKey, currentItem } = this.state;

    return {
      periods: rebateList,
      calcVmPrice,
      item: currentItem,
      calcLoading: loading.effects['openGroup/calcVMCost'],
      onSubmit: debounce((value, isHourChage) => { // 立即购买
        validateFieldsAndScroll(['protocol'], (errors, values) => {
          if (errors) {
            return
          }

          const createVMInfo = currentItem;

          let arr = rebateList.slice(0, 1);
          if (periodKey) {
            arr = rebateList.filter(item => isEqual(item.id, periodKey));
          }

          const data = {
            createVMInfo: {
              ...createVMInfo,
              hostName: createVMInfo.hostname,
              edaTools: createVMInfo.tools && JSON.parse(createVMInfo.tools),
              diskSizeMB: createVMInfo.disk,
            },
            flavorId: currentItem.flavorId,
            buyDuration: isHourChage ? createVMInfo.day : arr[0].buyDuration,
            buyUnit: isHourChage ? '天' : arr[0].buyUnit,
            paymentMode: isHourChage ? 3 : 1,
            discountRate: 0,
            networkFlavorId: createVMInfo.netNameId
          }

          dispatch({
            type: 'openGroup/createVmOrder',  // 创建订单
            payload: data
          }).then(response => {
            if (response && response.flag) {
              // this.createSuccessModal();
              router.push(`/account/order?from=openGroup/${id}&&type=vm&&orderNum=${response.resData}&&orderType=vmware`);
            } else if (response) {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        })
      }, 1000),
      onSetPeriodKey: value => { // 购买时长
        this.setState({ periodKey: value })
      }
    }
  }

  createSuccessModal = () => {
    const { dispatch, match: { params: { projectId } } } = this.props;
    let secondsToGo = 5;
    let timer, timer2;
    const modal = Modal.success({
      title: '虚拟机正在创建',
      content: (<div><p>创建虚拟机将需要些时间，请耐心等待...</p><p>将在 {secondsToGo} 秒后返回虚拟机列表页</p></div>),
      okText: '返回',
      onOk: () => {
        clearInterval(timer);
        modal.destroy();

        clearTimeout(timer2);  //停止, 清除Timeout

        router.push('/openGroup');

        // 设置为初始值
        dispatch({
          type: 'openGroup/updateState',
          payload: {
            currentStep: 0
          }
        })
      }
    });

    timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: (<div><p>创建虚拟机将需要些时间，请耐心等待...</p><p>将在 {secondsToGo} 秒后返回虚拟机列表页</p></div>),
      });
    }, 1000);

    timer2 = setTimeout(() => {
      clearInterval(timer);
      modal.destroy();

      router.push('/openGroup');

      // 设置为初始值
      dispatch({
        type: 'openGroup/updateState',
        payload: {
          currentStep: 0
        }
      })
    }, secondsToGo * 1000);
  }

  render() {
    const { openGroup: { currentGroup } } = this.props;

    return (
      <div>
        <p className={styles.title}>
          当前群组：{currentGroup.groupName}（{currentGroup.groupNumber}）
        </p>
        <ReviewConfig {...this.reviewProps} />
        <Bottom {...this.bottomProps} />
      </div>
    )
  }
}

export default CreateVm;
