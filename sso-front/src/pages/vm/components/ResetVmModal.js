import React, { PureComponent } from 'react'
import { Modal, Button, Spin, Steps, Form, Table, message, Checkbox, Icon } from 'antd'
import styles from './ResetVmModal.less'
import { isEqual, isEmpty } from 'lodash';
import BasicConfig from './BasicConfig';
import ShutdownTip from './ShutdownTip'

const { Step } = Steps;

/**
 * 调整配置窗口
 */
@Form.create()
class ResetVmModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      formValues: {},
      vmTools: [],               // 第一步：选中的“工具”
      instanceConfig: {},        // 第一步：选中的实例配置
      retentionDays: 30,         // 第一步：快照保留时间，默认30天
      instanceFilterParams: {    // 第一步：实例过滤条件
        status: 1
      },
      isContractChecked: false,  // 第二步：协议选择
      isShutDown: false,         // 第三步：同意强制关机
    };
  }

  componentDidMount() {
    this.setState({
      currentItem: this.props.vmInfo
    })
  }

  componentDidUpdate(prevProps) {
    const { vmInfo, visible } = this.props;
    const { vmInfo: old_vmInfo } = prevProps;

    if (visible !== prevProps.visible && !visible) {
      this.setState({ currentStep: 0 })
    }

    if (vmInfo && !isEqual(vmInfo, old_vmInfo)) {
      this.setState({
        currentItem: vmInfo
      })
    }

  }

  get basicConfigProps() {
    const { form, toolList, vmTypes, vmInfo, templateList, onGetVmStandardList, onCalcCost, networkList } = this.props
    const { instanceFilterParams, vmTools, currentItem } = this.state;

    return {
      vmTools,
      form,
      item: currentItem,
      toolList,
      vmTypes,
      templateList,
      networkList,
      vmInfo, //回显信息
      setInstanceFilter: values => {
        const data = {
          ...instanceFilterParams,
          ...values
        }

        this.setState({
          instanceFilterParams: data,
          currentItem: {
            ...currentItem,
            instanceFilter: data
          }
        })

        onGetVmStandardList(data);
      },
      setInstanceConfig: values => {
        const data = {
          cpu: values.cpu,
          memory: values.memory,
          flavorId: values.id
        }

        this.setState({
          instanceConfig: data,
          currentItem: {
            ...currentItem,
            instanceConfig: values
          }
        })

        // 获取价格
        const calcParams = {
          orderSmallType: 'reVm',
          flavorId: values.id,
          vmIdList: [currentItem.vmId],
          networkFlavorId: currentItem && (currentItem.networkFlavorId || currentItem.netNameId) ? (currentItem.networkFlavorId || currentItem.netNameId) : networkList[0].id
        }

        onCalcCost(calcParams);
      },
      setVmToolsInfo: values => {
        this.setState({
          vmTools: values,
          currentItem: {
            ...currentItem,
            vmTools: values
          }
        })
      },
      setActiveDiv: values => {
        setTimeout(() => {
          this.setState({
            currentItem: {
              ...currentItem,
              activeDiv: values
            }
          })
        }, 100);

      },
      setScanDays: value => {
        this.setState({
          retentionDays: value
        })
      },
      setNetWork: value => {
        const flavorId = currentItem && currentItem.instanceConfig && currentItem.instanceConfig.id;
        this.setState({
          currentItem: {
            ...currentItem,
            networkFlavorId: value
          }
        })

        if (flavorId) {
          // 获取价格
          const calcParams = {
            orderSmallType: 'reVm',
            flavorId,
            vmIdList: [currentItem.vmId],
            networkFlavorId: value
          }

          onCalcCost(calcParams);
        }
      }
    }
  }

  handleNext = currentStep => {
    const { form, vmInfo, openReconfigOrder, networkList } = this.props;
    const { formValues: oldValue, currentItem, vmTools, instanceConfig } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (isEmpty(vmTools)) {
        message.error('请选择工具');
        return
      }

      if (isEmpty(instanceConfig)) {
        message.error('请选择实例');
        return
      }

      const formValues = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formValues,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          }

          const netNameId = currentItem.networkFlavorId || currentItem.netNameId;
          const arr = networkList.filter(item => item.id === netNameId);

          const data = {
            orderSmallType: 'reVm',
            flavorId: instanceConfig.flavorId,
            vmIdList: [vmInfo.vmId],
            vmNames: vmInfo.vmName,
            networkFlavorId: netNameId,
            networkFlavorName: arr && arr.length > 0 ? arr[0].flavorName : '-',
            reconfigVMInfo: {
              vmId: vmInfo.vmId,
              cpu: instanceConfig.cpu,
              memory: instanceConfig.memory,
              disk: formValues.diskSizeMB,
              edaTools: vmTools
            }
          }

          this.setState({
            currentItem: {
              ...formValues,
              ...currentItem,
              config: data
            }
          })

          if (isEqual(currentStep, 2)) {
            openReconfigOrder(data);
          }

        },
      );

      // 合同是否选择
      this.setState({
        isContractChecked: false
      })
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderFooter = currentStep => {
    const { vmTools, instanceConfig, isContractChecked, isShutDown } = this.state;

    if (isEqual(currentStep, 0)) {
      return [
        <Button key="cancel" onClick={() => this.handleCancel()}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)} disabled={isEmpty(vmTools) || isEmpty(instanceConfig)}>
          下一步
        </Button>,
      ];
    }
    else if (isEqual(currentStep, 1)) {
      return [
        <Button
          key="back"
          style={{
            float: 'left',
          }}
          onClick={this.backward}
        >
          上一步
        </Button>,
        <Button key="cancel" onClick={() => this.handleCancel()}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)} disabled={!isContractChecked}>
          下一步
        </Button>,
      ];
    } else if (isEqual(currentStep, 2)) {
      return [
        <Button
          key="back"
          style={{
            float: 'left',
          }}
          onClick={this.backward}
        >
          上一步
        </Button>,
        <Button key="cancel" onClick={() => this.handleCancel()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)} disabled={!isShutDown}>
          开始调整
        </Button>,
      ];
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    // 重置state
    this.setState({
      currentStep: 0,
      formValues: {},
      vmTools: [],               // 第一步：选中的“工具”
      instanceConfig: {},        // 第一步：选中的实例配置
      retentionDays: 30,         // 第一步：快照保留时间，默认30天
      instanceFilterParams: {    // 第一步：实例过滤条件
        status: 1
      },
      isContractChecked: false,  // 第二步：协议选择
      isShutDown: false,         // 第三步：同意强制关机
    })

    onCancel();
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

  onContractChange = e => {
    this.setState({
      isContractChecked: e.target.checked
    })
  }

  onShutDownChange = e => {
    this.setState({
      isShutDown: e.target.checked
    })
  }

  render() {
    const { form, loading, vmInfo, calcVmPrice, calcLoading, networkList, ...modalProps } = this.props
    const { getFieldDecorator } = form;
    const { currentStep, vmTools, instanceConfig, currentItem } = this.state;

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
        title: '当前配置',
        key: 'config',
        render: (text, record) => {
          return <span>{record.cpu}核 {record.memory / 1024}G</span>
        }
      },
      {
        title: '当前数据盘配置',
        key: 'disk',
        render: (text, record) => {
          return <span>{record.disk / 1024}G</span>
        }
      },
      {
        title: '操作',
        key: 'operation',
        render: text => <span>调整配置</span>
      },
    ]

    const columns2 = [
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
        title: '当前配置',
        key: 'config',
        render: (text, record) => {
          return <span>{record.cpu}核 {record.memory / 1024}G</span>
        }
      },
      {
        title: '目标配置',
        key: 'goalConfig',
        render: (text, record) => {
          return <span>
            {record.config && record.config.reconfigVMInfo &&
              <label>{record.config.reconfigVMInfo.cpu}核 {record.config.reconfigVMInfo.memory}G </label>}
          </span>
        }
      },
      {
        title: '当前数据盘配置',
        key: 'disk',
        render: (text, record) => {
          return <span>{record.disk / 1024}G</span>
        }
      },
      {
        title: '目标数据盘配置',
        key: 'goalDisk',
        render: (text, record) => {
          return <span>{record.config && record.config.reconfigVMInfo && record.config.reconfigVMInfo.disk}G</span>
        }
      },
      {
        title: '当前带宽',
        key: 'disk',
        render: (text, record) => {
          const arr = networkList.filter(item => item.id === record.netNameId);
          if (arr && arr.length > 0) {
            return arr[0].flavorName;
          }
          return '-'
        }
      },
      {
        title: '目标带宽',
        key: 'goalDisk',
        render: (text, record) => {
          return <span>{record.config && record.config.networkFlavorName}</span>
        }
      },
      {
        title: '计费时长',
        key: 'expirationTime',
        render: (text, record) => <span>{record && record.expirationTime} 到期</span>
      },
      {
        title: '费用',
        key: 'price',
        render: text => <span style={{ color: '#ed711f' }}>{calcVmPrice && calcVmPrice.realPrice}元</span>
      },
    ]

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <Modal
        {...modalProps}
        onCancel = {this.handleCancel}
        footer={this.renderFooter(currentStep)}
      >
        <Steps
          style={{
            marginBottom: 28,
          }}
          size="small"
          current={currentStep}
        >
          <Step title="选择目标配置" />
          <Step title="费用明细" />
          <Step title="关机提示" />
        </Steps>
        <div id="area">
          {/* 第一步：工具配置、实例配置 */}
          {currentStep === 0 &&
            <Spin spinning={loading}>
              <span>当前实例：</span>
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
                dataSource={[vmInfo]}
                rowKey={record => record.vmId}
              />
              <BasicConfig {...this.basicConfigProps} />
              {calcVmPrice && !isEmpty(instanceConfig) &&
                <p className={styles.cost}>
                  需支付费用合计
                  {calcLoading ?
                    <span className={styles.money}>费用计算中…</span> :
                    <span>
                      <span className={styles.money}>{calcVmPrice.realPrice}元</span>
                      <span className={styles.moneyLine}>{calcVmPrice.originPrice}元</span>
                    </span>
                  }
                </p>
              }
            </Spin>
          }

          {/* 第二步：确认信息 */}
          {currentStep === 1 &&
            <div>
              <Table
                columns={columns2}
                size="small"
                pagination={false}
                expandedRowRender={record =>
                  <div className={styles.wrap}>
                    <div className={styles.wrap}>
                      <p className={styles.title}>当前EDA工具配置：</p>
                      {this.renderTools(record.tools)}
                    </div>
                    <div className={styles.wrap}>
                      <p className={styles.title}>目标EDA工具配置：</p>
                      {this.renderTools(vmTools, true)}
                    </div>
                  </div>
                }
                dataSource={[currentItem]}
                rowKey={record => record.vmId}
              />
              <Checkbox onChange={this.onContractChange} style={{ marginTop: '5px' }}>
                <label style={{ color: '#000' }}> 已阅读并同意</label>
                <a target='_blank' rel='noopener noreferrer' href="/agreement/reconfigInfo">实例调整配置费用说明</a>
              </Checkbox>
            </div>
          }

          {currentStep === 2 &&
            <div>
              <ShutdownTip />
              <p>
                强制关机<label className={styles.red}>*</label>
                <Checkbox onChange={this.onShutDownChange} style={{ marginTop: '5px', color: '#000' }}>
                  同意强制关机
                </Checkbox>
              </p>
            </div>
          }
        </div>

      </Modal >
    )
  }
}

export default ResetVmModal
