import React, { PureComponent } from 'react'
import { Modal, Spin, Form, Table, Radio, Icon, Badge } from 'antd'
import styles from './ResetVmModal.less'
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
 * 续费窗口
 */
@Form.create()
class RechargeModal extends PureComponent {
  state = {
    checkedTimeId: undefined,  // 默认选中的续费年限
    rechargePrice: {},         // 续费价格
    vmList: []                 // 便于计算续费后到期时间
  }

  componentDidMount() {
    const { vmList, rechargeList } = this.props;
    if (vmList && vmList.length > 0 && rechargeList && rechargeList.length > 0) {
      const defaultTimeId = rechargeList[0].id
      this.setState({
        checkedTimeId: defaultTimeId,
        vmList
      });
      this.setNewExpireTime(defaultTimeId);

      // 根据选择的续费时长计算价格
      this.calcVmCost(defaultTimeId);
    }
  }

  componentDidUpdate(preProps) {
    const { rechargeList, visible, vmList } = this.props;
    const { rechargeList: old_rechargeList, visible: old_visible, vmList: old_vmList } = preProps;
    if ((rechargeList && !isEqual(rechargeList, old_rechargeList) || (visible && !isEqual(visible, old_visible))) && rechargeList.length > 0) {
      const defaultTimeId = rechargeList[0].id
      this.setState({
        checkedTimeId: defaultTimeId,
        // vmList
      });
      this.setNewExpireTime(defaultTimeId);

      // 根据选择的续费时长计算价格
      this.calcVmCost(defaultTimeId);
    }

    if (vmList && !isEqual(vmList, old_vmList)) {
      this.setState({ vmList })
    }
  }

  handleOk = (e) => {
    e.preventDefault();

    const { openRechargeOrder, form, rechargeList } = this.props;
    const { validateFields } = form;

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const checkedId = values.rechargeTime;
      const checkedArr = rechargeList && rechargeList.filter(item => isEqual(item.id, checkedId));
      const checkedItem = checkedArr && checkedArr[0];
      const data = {
        buyDuration: checkedItem && checkedItem.buyDuration,
        buyUnit: checkedItem && checkedItem.buyUnit,
        discountRate: checkedItem && checkedItem.discountRate,
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
    const { onCalcCost, rechargeList, vmList } = this.props;
    const checkedArr = rechargeList && rechargeList.filter(item => isEqual(item.id, value));
    const checkedItem = checkedArr && checkedArr[0];

    let vmIds = [];
    vmList && vmList.length > 0 && vmList.map(value => {
      vmIds.push(value.vmId);
    })

    const data = {
      orderSmallType: 'renew',
      buyDuration: checkedItem && checkedItem.buyDuration,
      buyUnit: checkedItem && checkedItem.buyUnit,
      vmIdList: vmIds,
    }

    // 根据选择的续费时长计算价格
    onCalcCost(data);
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
              {/* {factoryImg(item.company)} */}
              <b>{index + 1}. {item.company}</b>
            </span>
          </div>

          {tools}
        </div>
      )
    })
  }

  // 设置续费后过期时间
  setNewExpireTime = checkedTimeId => {
    const { rechargeList } = this.props;
    const { vmList } = this.state;

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

    vmList.map(item => {
      const vmExpireTime = item.expirationTime;
      let newExpireTime;
      if (vmExpireTime && checkedItem && checkedItem.buyDuration) {
        newExpireTime = moment(vmExpireTime).add(checkedItem.buyDuration, unit).format('YYYY-MM-DD HH:mm:ss'); // 续费后到期时间
      }
      item.newExpireTime = newExpireTime;
    })

    this.setState({ vmList });
  }


  render() {
    const { form, calcVmPrice, calcLoading, rechargeList, ...modalProps } = this.props
    const { getFieldDecorator } = form;
    const { checkedTimeId, vmList } = this.state;

    const columns = [
      {
        title: '实例ID',
        dataIndex: 'vmId',
        key: 'vmId',
      },
      {
        title: '实例名称',
        dataIndex: 'vmName',
        key: 'vmName',
      },
      {
        title: '系统配置',
        key: 'config',
        render: (text, record) => {
          return <span>{record.cpu}核 {record.memory / 1024}G</span>
        }
      },
      {
        title: '数据盘配置',
        key: 'disk',
        render: (text, record) => {
          return <span>{record.disk / 1024}G</span>
        }
      },
      {
        title: '到期时间',
        dataIndex: 'expirationTime',
        key: 'expirationTime',
      },
      {
        title: '续费后到期时间',
        dataIndex: 'newExpireTime',
        key: 'newExpireTime',
        render: text => <span style={{ color: '#000' }}>{text}</span>
      },
    ]


    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
      >
        <span>续费实例：</span>
        <Table
          columns={columns}
          size="small"
          pagination={false}
          expandedRowRender={record =>
            <div>
              <p style={{ marginBottom: 0 }}>当前EDA工具配置：</p>
              {this.renderTools(record.tools)}
            </div>
          }
          dataSource={vmList}
          rowKey={record => record.vmId}
        />

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
                {rechargeList.map(item => {
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
      </Modal >
    )
  }
}

export default RechargeModal
