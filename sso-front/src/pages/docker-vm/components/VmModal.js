import { Form, Modal, Divider, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import CheckTools from './CheckTools'
import VmConfig from './VmConfig'
import ConnectConfig from './ConnectConfig'

@Form.create()
class VmModal extends Component {

  state = {
    vmConfig: '',   // 选中的“虚拟机配置”
    vmTools: []     // 选中的“工具”
  }

  handleOk = (e) => {
    e.preventDefault();

    const { vmConfig, vmTools } = this.state;
    const { onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      if(isEmpty(vmTools)) {
        message.error('请选择工具');
        return
      }

      let data = {
        ...getFieldsValue(),
      }
      const portsArr = this.dedupe(data.ports);
      const newPorts = portsArr.filter(item => !isEmpty(item));
      data = {
        ...vmConfig,
        vmTools,
        vmName: data.vmName,
        password: data.password,
        userName: data.userName,
        ports: newPorts,

      }

      // console.log('data:', data);

      onOk(data);
    })
  }

  dedupe = (arr) => {
    const newSet = new Set(arr);  // arr变成了set的数据结构，并去除了其中重复的元素
    return Array.from(newSet);  // Array.from方法将set数据结构转为数组数据结构
  }

  setVmConfigValues = values => {
    const arr = values.split('*');
    const data = {
      cpu: arr[0],
      memory: arr[1],
      hardDisk: arr[2],
      network: arr[3]
    }

    this.setState({
      vmConfig: data
    })
  }

  setVmToolsInfo = values => {
    this.setState({ vmTools: values })
  }

  handleCheckVmName = (rule, value, callback) => {
    const { onCheckVmName } = this.props;
    onCheckVmName(rule, value, callback);
  }

  render() {
    const { form, handleModalVisible, toolList, templateList, ...modalProps } = this.props;

    return (
      <Modal
        {...modalProps}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        onOk={this.handleOk}
        onCancel={() => handleModalVisible(false)}
        afterClose={() => handleModalVisible()}
      >
        <div id="area">
          <Row>
            <Col span={3}><span>工具选择</span></Col>
            <Col span={21}>
              <CheckTools toolList={toolList} form={form} setVmToolsInfo={this.setVmToolsInfo} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3}><span>实例配置</span></Col>
            <Col span={21}>
              <VmConfig templateList={templateList} setVmConfigValues={this.setVmConfigValues} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={3}><span>连接设置</span></Col>
            <Col span={21}>
              <ConnectConfig form={form} handleCheckVmName={this.handleCheckVmName} />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default VmModal
