import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import TaskField from './TaskField';
import styles from './style.less'
import { Form, Modal, Spin, Select, Menu, Button, Icon, Input, Row, Col, InputNumber } from 'antd'
import FileUpload from 'components/FileUpload'
import { isEmpty, isEqual, isNil } from 'lodash';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

@Form.create()
class ExecuteTaskModal extends PureComponent {
  state = {
    currentFieldList: [], // 当前所选的任务类型对应的参数字段
  }

  componentDidMount() {
    const { fieldValueList } = this.props;
    if (fieldValueList && fieldValueList.params && fieldValueList.params.length > 0) {
      this.setState({
        currentFieldList: fieldValueList.params[0]
      })
    }
  }

  componentDidUpdate(preProps) {
    const { fieldValueList: old_fieldValueList } = preProps;
    const { fieldValueList } = this.props;
    if (!isEqual(old_fieldValueList, fieldValueList) && fieldValueList && fieldValueList.params && fieldValueList.params.length > 0) {
      this.setState({
        currentFieldList: fieldValueList.params[0]
      })
    }
  }

  handleSelect = value => {
    const { fieldValueList } = this.props;
    const params = fieldValueList && fieldValueList.params;
    const currentSelectedFeature = params && params.filter(ele => ele.featureId === value);
    if (currentSelectedFeature && currentSelectedFeature.length > 0) {
      this.setState({
        currentFieldList: currentSelectedFeature[0]
      })
    }
  }

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form;
    const { currentFieldList } = this.state;

    validateFields((errors, values) => {
      console.log(errors, values);
      if (errors) {
        return
      }

      const featureId = values.featureId;
      const featureName = currentFieldList.featureName;
      const runDirectory = item.workDir + '/' + values.runDirectory;
      const argus = values.arguments;
      const cpusPerTask = values.cpusPerTask;
      const subTasks = values.subTasks;

      delete values.featureId;
      delete values.runDirectory;
      delete values.arguments;
      delete values.cpusPerTask;
      delete values.subTasks;

      const data = {
        taskId: item.id,
        featureId,
        featureName,
        runDirectory,
        arguments: argus,
        cpusPerTask,
        subTasks,
        data: {
          ...values,
        }
      }

      console.log(data);
      onOk(data);
    })
  }

  redirectToData = () => {
    const { handleModalVisible } = this.props;
    handleModalVisible(false);
    router.push({
      pathname: '/dictionary',
    })
  }

  onSetFieldList = value => {
    const { fieldValueList, onSetfieldValueList } = this.props;
    fieldValueList && fieldValueList.length > 0 && fieldValueList.map(ele => {
      if (ele.step_name === step) {
        ele.params = value;
      }
    })

    onSetfieldValueList(fieldValueList);
  }

  handleCheckArguments = (rule, value, callback) => {
    console.log('arguments check:');
    const { item, onCheckOption } = this.props;
    if (value && !isEmpty(value)) {
      const data = {
        toolName: item.toolName,
        option: value
      }
      onCheckOption(data).then(response => {
        if (response && !response.flag) {
          callback(response.errMessage)
        } else {
          callback()
        }
      })
    } else {
      callback();
    }
  }

  render() {
    const {
      item = {},
      onOk,
      form,
      fieldValueList,
      loading,
      handleModalVisible,
      showDataModal,
      uploaderProps,
      netList,
      ...modalProps
    } = this.props;

    const { currentFieldList } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
        onCancel={() => handleModalVisible(false)}
        afterClose={() => handleModalVisible()}
        className={styles.modal}
      >
        <Form layout="horizontal" {...formItemLayout}>
          <Spin spinning={loading}>

            <div style={{ display: 'inline-block', float: 'right' }}>
              <FileUpload {...uploaderProps} pickerId="filePicker" />
              <FileUpload {...uploaderProps} pickerId="folderPicker" isDirectory={true} />
            </div>

            <p><span style={{ color: '#000' }}>当前工作空间：</span> {item.workDir}</p>
            <Form.Item
              label="任务类型"
              required='required'
            >
              {getFieldDecorator('functionId', {
                initialValue: fieldValueList && fieldValueList.params && fieldValueList.params.length > 0 && fieldValueList.params[0].functionId,
                rules: [{
                  required: true,
                  message: '请选择任务类型'
                }]
              })(
                <Select
                  style={{ width: 200 }}
                  onSelect={this.handleSelect}
                >
                  {fieldValueList && fieldValueList.params && fieldValueList.params.length > 0 && fieldValueList.params.map(ele => {
                    return <Select.Option key={ele.functionId} value={ele.functionId}>{ele.functionName}</Select.Option>
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item
              label='任务执行目录'
              required
            >
              {getFieldDecorator('runDirectory', {
                initialValue: '',
                rules: [{
                  required: true,
                  whitespace: true,
                  message: '请输入任务执行目录'
                }]
              })(
                <Input addonBefore={item.workDir + '/'} placeholder="执行目录" />
              )}
            </Form.Item>

            <Form.Item
              label='任务并发数'
              required
            >
              {getFieldDecorator('cpusPerTask', {
                initialValue: 1,
              })(
                <InputNumber max={currentFieldList.max_cpus} />
              )}
              <span className={styles.extraTip}>&nbsp;最大支持{currentFieldList.max_cpus}条并发数</span>
            </Form.Item>

            <b>工具参数<Icon type="caret-down" /></b>
            {/* 获取工具参数 */}
            {currentFieldList && currentFieldList.params &&
              <TaskField
                taskId={item.id}
                fieldList={currentFieldList.params}
                onSetFieldList={this.onSetFieldList}
                form={form}
                showDataModal={showDataModal}
                netList={netList}
              />
            }

            <p><b>执行Command<Icon type="caret-down" /></b></p>
            <Form.Item
              label="命令"
            >
              {getFieldDecorator('arguments', {
                initialValue: "",
                rules: [
                  {
                    validator: this.handleCheckArguments
                  }
                ],
                validateTrigger: 'onBlur'
              })(
                <TextArea rows={4} placeholder="#请在此输入你的执行命令" />
              )}
            </Form.Item>
          </Spin>
        </Form>
      </Modal>
    )
  }
}

ExecuteTaskModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ExecuteTaskModal
