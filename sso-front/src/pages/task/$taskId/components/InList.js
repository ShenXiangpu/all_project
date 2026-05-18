import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TaskField from '../../components/TaskField';
import styles from './inList.less'
import { Form, Spin, Steps, Button, Icon, Input, Menu, Dropdown } from 'antd'
import FileUpload from 'components/FileUpload'
import { isEqual, isNil } from 'lodash';

const { Step } = Steps;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

@Form.create()
class InList extends PureComponent {
  state = {
    currentStep: 0,     // 当前所处步骤
    formValues: {}      // 需要记录每个步骤下的form fields value
  }

  componentDidUpdate(preProps) {
    const { fieldValueList, form: { setFieldsValue } } = this.props;
    const { fieldValueList: old_fieldValueList } = preProps;
    const { currentStep } = this.state;
    if (fieldValueList && !isEqual(fieldValueList, old_fieldValueList)) {
      // 获取对应步骤下的工具参数
      const currentFieldList = fieldValueList.filter(ele => {
        const step = currentStep + 1; //当前所处步骤
        return ele.step_name === step;
      })
      // currentFieldList && currentFieldList.length > 0 ? currentFieldList[0].commands.join('\n') : '',
      if (currentFieldList && currentFieldList.length > 0) {
        const commands = currentFieldList[0].commands;
        setFieldsValue({
          ['command']: !isNil(commands) ? commands.join('\n') : ''
        });
      }
    }
  }

  handleNext = (currentStep, platform) => {
    const { form, onOk, fieldValueList, item = {} } = this.props;
    const { formValues: oldValue } = this.state;

    const inputInfo = fieldValueList && fieldValueList[currentStep];
    const stepsInfo = inputInfo && inputInfo.step_name;
    const steps = stepsInfo && Number(stepsInfo);

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formValues = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formValues,
        },
        () => {
          if (currentStep + 1 < steps) {
            this.forward();
          } else {
            const values = {
              step_name: steps,
              taskId: item.id,
              platform,
              params: [{  // TODO 分步骤，各个步骤的form表单内容，拼接成数据
                ...formValues,
              }]
            }

            onOk(values);
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

  renderFooter = currentStep => {
    const { fieldValueList, platform } = this.props;

    const inputInfo = fieldValueList.user_input_info && fieldValueList.user_input_info[0];
    const stepsInfo = inputInfo && inputInfo.step_name;
    const steps = stepsInfo && parseInt(stepsInfo);

    const menu = (
      <Menu
        defaultSelectedKeys={['cloudcomputing']}
        onClick={() => this.handleNext(currentStep, 'cloudcomputing')}
      >
        <Menu.Item key="cloudcomputing">
          提交至EDA平台
        </Menu.Item>
      </Menu>
    );

    const submitButton = (currentStep, platform) => {
      if (platform === 'supercomputing') {
        return (<Button key="submit" type="primary" onClick={() => this.handleNext(currentStep, 'supercomputing')}>提交至超算</Button>)
      }

      if (platform === 'allcomputing') {
        return (
          <Dropdown key="submit" overlay={menu}>
            <Button type="primary" onClick={() => this.handleNext(currentStep, 'supercomputing')}>
              提交至超算 <Icon type="down" />
            </Button>
          </Dropdown>
        )
      }

      return (<Button key="submit" type="primary" onClick={() => this.handleNext(currentStep, 'cloudcomputing')}>提交至云平台</Button>)
    }

    if (currentStep > 0 && currentStep + 1 < steps) {
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
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
                </Button>,
      ];
    }

    if (currentStep + 1 === steps && steps > 1) {
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
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          提交
                </Button>,
      ];
    }

    return [
      submitButton(currentStep, platform),
    ];
  };

  onSetFieldList = value => {
    const { fieldValueList, onSetfieldValueList } = this.props;
    const { currentStep } = this.state;

    const step = currentStep + 1; //当前所处步骤

    fieldValueList.map(ele => {
      if (ele.step_name === step) {
        ele.params = value;
      }
    })

    onSetfieldValueList(fieldValueList);
  }

  render() {
    const { item = {}, form, fieldValueList, inLoading, uploaderProps, showDataModal } = this.props;
    const { currentStep } = this.state;
    const { getFieldDecorator } = form;

    // 总步骤数
    const steps = fieldValueList && fieldValueList.length;

    // 获取对应步骤下的工具参数
    const currentFieldList = fieldValueList.filter(ele => {
      const step = currentStep + 1; //当前所处步骤
      return ele.step_name === step;
    })

    return (
      <Form layout="horizontal">
        <Spin spinning={inLoading}>

          <div style={{ display: 'inline-block', float: 'right' }}>
            <FileUpload {...uploaderProps} pickerId="filePicker" />
            <FileUpload {...uploaderProps} pickerId="folderPicker" isDirectory={true} />
          </div>

          <p style={{ color: '#000' }}>{item.toolName}[{item.toolVersion}] - {item.featureName}</p>
          <p><span style={{ color: '#000' }}>当前工作空间：</span> {item.workDir}</p>

          {/* 显示步骤（每个步骤下都有工具参数列表及命令输入） */}
          {steps > 1 &&
            <div className={styles.stepsContent}>
              <Steps type="navigation" size="small" className={styles.steps} current={currentStep}>
                {steps.map(index => <Step key={index} title={`第${index + 1}步`} />)}
              </Steps>
            </div>
          }

          <b>工具参数<Icon type="caret-down" /></b>
          {/* 获取工具参数 */}
          {currentFieldList && currentFieldList.length > 0 &&
            <TaskField
              taskId={item.id}
              fieldList={currentFieldList[0].params}
              onSetFieldList={this.onSetFieldList}
              form={form}
              showDataModal={showDataModal}
            />
          }

          <p><b>执行Command<Icon type="caret-down" /></b></p>
          <Form.Item
            label="命令"
            {...formItemLayout}
            required='required'
          >
            {getFieldDecorator('command', {
              initialValue: currentFieldList && currentFieldList.length > 0 ?
                !isNil(currentFieldList[0].commands) ? currentFieldList[0].commands.join('\n') : ''
                : '',
              rules: [{
                required: true,
                message: '请输入执行命令'
              }]
            })(
              <TextArea rows={4} placeholder="#请在此输入你的执行命令" />
            )}
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            {this.renderFooter(currentStep)}
          </div>
        </Spin>
      </Form>
    )
  }
}

InList.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default InList
