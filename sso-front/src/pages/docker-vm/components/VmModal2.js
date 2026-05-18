import { Button, DatePicker, Form, Input, Modal, Radio, Select, Steps, Row, Col } from 'antd';
import React, { Component } from 'react';
import CheckTools from './CheckTools'
import VmConfig from './VmConfig'
import ConnectConfig from './ConnectConfig'

const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;

@Form.create()
class VmModal extends Component {
  static defaultProps = {
    handleReview: () => { },
    handleModalVisible: () => { },
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      formValues: props.formValues,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.formValues !== prevProps.formValues) {
      this.setState({ formValues: this.props.formValues });
    }

    if (this.props.visible !== prevProps.visible && !this.props.visible) {
      this.setState({ currentStep: 0 })
    }
  }

  handleNext = currentStep => {
    const { form, handleReview } = this.props;
    const { formValues: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formValues = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formValues,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            const values = {
              ...formValues
            }
            handleReview(values);
          }
        },
      );
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

  renderContent = (currentStep, formValues) => {
    const { form } = this.props;

    if (currentStep === 0) { // 工具选择
      return [
        <CheckTools key="tool" />
      ];
    }

    if (currentStep === 1) { // 虚拟机配置
      return [
        <VmConfig key="vmConfig" />
      ];
    }

    if (currentStep === 2) { // 连接设置
      return [
        <ConnectConfig key="connect" />
      ];
    }

    return null;
  };

  renderFooter = currentStep => {
    const { handleModalVisible } = this.props;

    if (currentStep > 0 && currentStep < 2) {
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
        <Button key="cancel" onClick={() => handleModalVisible(false)}>
          取消
               </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
                </Button>,
      ];
    }

    if (currentStep === 2) {
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
        <Button key="cancel" onClick={() => handleModalVisible(false)}>
          取消
                </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          创建
                </Button>,
      ];
    }

    return [
      <Button key="cancel" onClick={() => handleModalVisible(false)}>
        取消
            </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
            </Button>,
    ];
  };

  render() {
    const { handleModalVisible, ...modalProps } = this.props;
    const { currentStep, formValues } = this.state;
    return (
      <Modal
        {...modalProps}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModalVisible(false)}
        afterClose={() => handleModalVisible()}
      >
        <Steps
          style={{
            marginBottom: 28,
          }}
          size="small"
          current={currentStep}
        >
          <Step title="工具选择" />
          <Step title="虚拟机配置" />
          <Step title="连接设置" />
        </Steps>
        <div id="area">
          {this.renderContent(currentStep, formValues)}
        </div>
      </Modal>
    );
  }
}

export default VmModal
