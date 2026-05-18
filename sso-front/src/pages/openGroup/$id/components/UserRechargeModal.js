import React, { PureComponent } from 'react'
import { Modal, Spin, Form, Table, Radio, Icon, Badge } from 'antd'
import styles from './UserRechargeModal.less'
import { isEqual, isEmpty } from 'lodash';
import moment from "moment";

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}

/**
 * 用户账号延期窗口，类似VM续费
 */
@Form.create()
class UserRechargeModal extends PureComponent {
  state = {
    checkedTimeId: undefined,  // 默认选中的续费年限
    rechargePrice: {},         // 续费价格
    userList: [],
    existVmAccount: false,     // 所选中的用户是否已经关联VM账号
  }

  componentDidMount() {
    const { selectedUsers, rechargeList } = this.props;
    if (selectedUsers && selectedUsers.length > 0 && rechargeList && rechargeList.length > 0) {
      const defaultTimeId = rechargeList[0].id
      this.setState({ checkedTimeId: defaultTimeId });

      // 判断是否需要计费，如果选中的用户尚未关联VM，无需计费
      let existVmAccount = false;
      selectedUsers.map(item => {
        if (item.vmInfos && item.vmInfos.length > 0) {
          existVmAccount = true;
        }
      })
      if (existVmAccount) {
        // 根据选择的续费时长计算价格
        this.calcVmCost(defaultTimeId);

        this.setState({ existVmAccount })
      }
    }
  }

  componentDidUpdate(preProps) {
    const { rechargeList, visible, selectedUsers } = this.props;
    const { rechargeList: old_rechargeList, visible: old_visible, selectedUsers: old_selectedUsers } = preProps;
    if ((rechargeList && !isEqual(rechargeList, old_rechargeList) || (visible && !isEqual(visible, old_visible))) && rechargeList.length > 0) {
      const defaultTimeId = rechargeList[0].id
      this.setState({ checkedTimeId: defaultTimeId });
      this.setNewExpireTime(defaultTimeId);

      let existVmAccount = false;
      selectedUsers && selectedUsers.map(item => {
        if (item.vmInfos && item.vmInfos.length > 0) {
          existVmAccount = true;
        }
      })
      if (existVmAccount) {
        // 根据选择的续费时长计算价格
        this.calcVmCost(defaultTimeId);

        this.setState({ existVmAccount })
      }
    }

    if (selectedUsers && !isEqual(selectedUsers, old_selectedUsers)) {
      this.setState({
        userList: selectedUsers
      })
    }
  }

  handleOk = (e) => {
    e.preventDefault();

    const { openRechargeOrder, form, rechargeList, selectedUsers } = this.props;
    const { validateFields } = form;

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const checkedId = values.rechargeTime;
      const checkedArr = rechargeList && rechargeList.filter(item => isEqual(item.id, checkedId));
      const checkedItem = checkedArr && checkedArr[0];
      const vmIds = this.getVmIds();

      // 获取实例名称列表
      const vmNameArr = [];
      selectedUsers && selectedUsers.map(user => {
        const vmInfos = user.vmInfos;
        if (vmInfos && vmInfos.length > 0) {
          const vmInfo = vmInfos[0];  // 群组内默认每个用户只关联一个VM信息
          const vmName = vmInfo.vmName;
          vmNameArr.push(vmName);
        }
      })
      const vmNames = Array.from(new Set(vmNameArr));

      const data = {
        orderSmallType: 'renew',
        buyDuration: checkedItem && checkedItem.buyDuration,
        buyUnit: checkedItem && checkedItem.buyUnit,
        discountRate: checkedItem && checkedItem.discountRate,
        vmIdList: vmIds,
        vmNames,
      }

      openRechargeOrder(data);
    })
  }

  onChange = e => {
    const value = e.target.value;
    // 用于计算续费后到期时间
    this.setState({
      checkedTimeId: value
    })

    this.setNewExpireTime(value);
    this.calcVmCost(value);
  }

  // 计算续费VM相关计费
  calcVmCost = (value) => {
    const { onCalcCost, rechargeList } = this.props;
    const checkedArr = rechargeList && rechargeList.filter(item => isEqual(item.id, value));
    const checkedItem = checkedArr && checkedArr[0];

    const vmIds = this.getVmIds();

    const data = {
      orderSmallType: 'renew',
      buyDuration: checkedItem && checkedItem.buyDuration,
      buyUnit: checkedItem && checkedItem.buyUnit,
      vmIdList: vmIds,
    }

    // 根据选择的续费时长计算价格
    onCalcCost(data);
  }

  // 设置续费后过期时间
  setNewExpireTime = checkedTimeId => {
    const { rechargeList } = this.props;
    const { userList } = this.state;

    const checkedArr = rechargeList && rechargeList.filter(item => isEqual(item.id, checkedTimeId));
    const checkedItem = checkedArr && checkedArr[0];
    let unit = '';
    if (checkedItem && checkedItem.buyUnit) {
      if (isEqual(checkedItem.buyUnit, '年')) {
        unit = 'years';
      } else if (isEqual(checkedItem.buyUnit, '月')) {
        unit = 'months';
      }
    }

    userList.map(user => {
      const vmInfos = user.vmInfos;
      if (vmInfos && vmInfos.length > 0) {
        const vmInfo = vmInfos[0];  // 群组内默认每个用户只关联一个VM信息
        const vmExpireTime = vmInfo.expirationTime;
        let newExpireTime;
        if (vmExpireTime && checkedItem && checkedItem.buyDuration) {
          newExpireTime = moment(vmExpireTime).add(checkedItem.buyDuration, unit).format('YYYY-MM-DD HH:mm:ss'); // 续费后到期时间
        }
        user.newExpireTime = newExpireTime;
      }
    })

    this.setState({ userList });
  }

  // 获取需要续费的实例ID
  getVmIds = () => {
    const { selectedUsers } = this.props;
    let vmIdArr = [];
    selectedUsers && selectedUsers.map(user => {
      const vmInfos = user.vmInfos;
      if (vmInfos && vmInfos.length > 0) {
        const vmInfo = vmInfos[0];  // 群组内默认每个用户只关联一个VM信息
        const vmId = vmInfo.vmId;
        vmIdArr.push(vmId);
      }
    })
    const rechargeVmIds = Array.from(new Set(vmIdArr));
    return rechargeVmIds;
  }

  render() {
    const { form, loading, selectedUsers, calcVmPrice, calcLoading, rechargeList, ...modalProps } = this.props
    const { getFieldDecorator } = form;
    const { checkedTimeId, userList } = this.state;

    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: text => isEmpty(text) ? <span style={{ color: '#faad14' }}>尚未绑定手机号</span> : text
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '实例ID',
        dataIndex: 'vmId',
        key: 'vmId',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].vmId : '-';
        }
      },
      {
        title: '实例名称',
        dataIndex: 'vmName',
        key: 'vmName',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].vmName : '-';
        }
      },
      {
        title: '到期时间',
        dataIndex: 'expirationTime',
        key: 'expirationTime',
        render: (text, record) => {
          const vmInfo = record.vmInfos;
          return vmInfo && vmInfo.length > 0 ? vmInfo[0].expirationTime : '-';
        },
      },
      {
        title: '续费后到期时间',
        dataIndex: 'newExpireTime',
        key: 'newExpireTime',
        render: text => <span style={{ color: '#000' }}>{text}</span>
      },
    ]

    const vmIds = this.getVmIds();
    const VmIdsLink = vmIds && vmIds.map(item => {
      return <a key={item} target="_blank" href={`/vm/${item}`} style={{ marginRight: 15 }}>{item}</a>
    })

    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
      >
        {/* <Spin spinning={loading}> */}
        <span>需要延期的用户：</span>
        <Table
          columns={columns}
          size="small"
          pagination={false}
          dataSource={userList}
          rowKey={record => record.id}
        />

        <p style={{ marginTop: 20 }}>
          <span>续费实例：</span>
          <span style={{ marginLeft: 20, color: '#000' }}>
            {VmIdsLink}
          </span>
        </p>

        <div className={styles.rechargeFromDiv}>
          <Form.Item
            label="续费时长"
            required={false}
            {...formItemLayout}
            colon={false}
            labelAlign="left"
          >
            {getFieldDecorator('rechargeTime', {
              initialValue: checkedTimeId,
            })(
              <Radio.Group
                onChange={this.onChange}
              >
                {rechargeList && rechargeList.map(item => {
                  if (isEqual(item.rebate, 100)) {
                    return (
                      <Radio.Button value={item.id} key={item.id}>{item.buyDuration}{item.buyUnit}</Radio.Button>
                    )
                  } else if (item.rebate < 100) {
                    return (
                      <Badge key={item.id} count={<label className={styles.rateLabel}>{item.rebateString}</label>}>
                        <Radio.Button value={item.id}>{item.buyDuration}{item.buyUnit}</Radio.Button>
                      </Badge>
                    )
                  }
                })}
              </Radio.Group>
            )}
          </Form.Item>
        </div>

        {calcVmPrice &&
          <p className={styles.cost}>
            优惠价
            {calcLoading ?
              <span className={styles.money}>费用计算中…</span> :
              <span>
                <span className={styles.money}>{calcVmPrice.realPrice}元</span>
                <span className={styles.moneyLine}>{calcVmPrice.originPrice}元</span>
              </span>
            }
          </p>
        }
        {/* </Spin> */}
      </Modal >
    )
  }
}

export default UserRechargeModal
