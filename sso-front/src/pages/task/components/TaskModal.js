import { Form, Modal, Select, Input, DatePicker, Row, Col } from 'antd';
import React, { Component } from 'react';
import NavLink from 'umi/navlink';
import isEqual from 'lodash.isequal';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
}

@Form.create()
class TaskModal extends Component {
  state = {
    versions: [],
    taskName: ''
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({
      taskName: value
    })
  }

  handleVendorChange = value => {
    if (value) {
      const { onGetVendorTools, form: { setFieldsValue } } = this.props;
      setFieldsValue({
        toolId: '',
        toolVersion: ''
      })
      this.setState({ versions: [] });

      onGetVendorTools(value);
    }
  }

  handleToolChange = value => {
    if (value) {
      const { vendorToolList } = this.props;
      const tools = vendorToolList.filter(ele => isEqual(ele.toolId, value));
      this.setState({
        versions: tools && tools.length > 0 && tools[0].versions
      })
    }
  }

  handleOk = (e) => {
    e.preventDefault();
    const { onOk, form, userWorkDir, vendorToolList } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const tools = vendorToolList.filter(ele => isEqual(ele.toolId, values.toolId));

      const data = {
        ...values,
        workDir: userWorkDir + '/' + values.folderName,
        toolName: tools && tools.length > 0 && tools[0].toolName
      }

      onOk(data)
    })
  }

  render() {
    const { onOk, form, userWorkDir, vendorList, vendorToolList, ...modalProps } = this.props;
    const { getFieldDecorator } = form;
    const { versions, taskName } = this.state;

    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
      >
        <div id="task">
          <FormItem label='任务名称' {...formItemLayout} required>
            {getFieldDecorator('taskName', {
              initialValue: '',
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入任务名称'
              }]
            })(
              <Input placeholder="任务名称" onChange={this.onChange} />
            )}
          </FormItem>

          <FormItem label='任务目录' {...formItemLayout} required>
            {getFieldDecorator('folderName', {
              initialValue: '' || taskName,
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入任务工作空间'
              }]
            })(
              <Input addonBefore={userWorkDir + '/'} placeholder="目录" />
            )}
          </FormItem>

          <FormItem label='工具厂商' {...formItemLayout} required>
            {getFieldDecorator('vendorId', {
              initialValue: '',
              rules: [{
                required: true,
                message: '工具厂商'
              }]
            })(
              <Select
                style={{ width: '100%' }}
                getPopupContainer={() => document.getElementById('task')}
                onChange={this.handleVendorChange}
              >
                <Option value=''>---请选择---</Option>
                {
                  vendorList && vendorList.map(ele => <Option value={ele.id} key={ele.id}>{ele.vendorName}</Option>)
                }
              </Select>
            )}
          </FormItem>

          <FormItem label='工具' {...formItemLayout} required>
            {getFieldDecorator('toolId', {
              initialValue: '',
              rules: [{
                required: true,
                message: '请选择工具'
              }]
            })(
              <Select
                style={{ width: '100%' }}
                getPopupContainer={() => document.getElementById('task')}
                onChange={this.handleToolChange}
              >
                <Option value=''>---请选择---</Option>
                {
                  vendorToolList && vendorToolList.map(ele => <Option value={ele.toolId} key={ele.toolId}>{ele.toolName}</Option>)
                }
              </Select>
            )}
          </FormItem>

          <FormItem label='版本' {...formItemLayout} required>
            {getFieldDecorator('toolVersion', {
              initialValue: '',
              rules: [{
                required: true,
                message: '请选择工具版本'
              }]
            })(
              <Select
                style={{ width: '100%' }}
                getPopupContainer={() => document.getElementById('task')}
              >
                <Option value=''>---请选择---</Option>
                {
                  versions && versions.map(ele => <Option value={ele} key={ele}>{ele}</Option>)
                }
              </Select>
            )}
          </FormItem>

          <FormItem label='备注' {...formItemLayout}>
            {getFieldDecorator('description')(
              <Input.TextArea rows={4} />
            )}
          </FormItem>
        </div>
      </Modal>
    );
  }
}

export default TaskModal
