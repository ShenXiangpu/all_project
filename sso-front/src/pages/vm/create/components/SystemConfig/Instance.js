import React, { PureComponent } from 'react'
import { Form, Icon, Input } from 'antd';
import styles from './index.less';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}

class Instance extends PureComponent {

  handleVmName = (rule, value, callback) => {
    const { onCheckVmName } = this.props;
    onCheckVmName(rule, value, callback);
  }

  handleHostName = (rule, value, callback) => {
    const { onCheckHostName } = this.props;
    onCheckHostName(rule, value, callback);
  }

  render() {
    const { form: { getFieldDecorator }, item, currentUserPy } = this.props;

    const tips = "2～80个字符，以大小写字母或中文开头，可包含数字、点号（.）、下划线（_）、半角冒号（:）或连字符（-）";
    const despTips = "长度为2～255个字符，不能以http://或https://开头";
    const hostNameTips = (<span><b>Linux 等其他操作系统：</b>长度为 1～63 个字符，允许使用大小写字母、数字或连字符（-）和点号（.），但不能连续使用点号（.），连字符（-）前后不能是点号（.）。不能以数字、点号（.）或连字符（-）开头或结尾。</span>);

    return (
      <Form
        labelAlign="left"
        colon={false}
        className={styles.form}
        hideRequiredMark
      >

        <FormItem
          label='实例名称'
          {...formItemLayout}
          extra={tips}
        >
          {getFieldDecorator('vmName', {
            initialValue: item.vmName || '',
            rules: [
              {
                required: true,
                message: '请输入实例名称'
              },
              {
                pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
                message: '请按规则重新设置实例名称'
              },
              {
                validator: this.handleVmName
              }
            ],
            validateTrigger: 'onBlur'
          })(<Input style={{ width: '400px' }} />)}
        </FormItem>

        <FormItem
          label='描述'
          {...formItemLayout}
          help={despTips}
        >
          {getFieldDecorator('annotation', {
            initialValue: item.annotation || '',
            rules: [
              {
                pattern: /^(?=[\s\S]{2,255}$)(?!(http:\/\/)|(https:\/\/))[\w\W]*$/,
                message: '请按规则重新填写描述信息'
              },
            ]
          })(<Input.TextArea style={{ width: '800px' }} />)}
        </FormItem>

        <FormItem
          label='主机名'
          {...formItemLayout}
          extra={hostNameTips}
        >
          {getFieldDecorator('hostName', {
            initialValue: item.hostName || currentUserPy,
            rules: [
              {
                required: true,
                message: '请输入主机名'
              },
              {
                pattern: /^(?=[\S]{1,63}$)[A-Za-z]+((-(?!\.)|\.(?!-|\.))*[\dA-Za-z]+)*$/,
                message: '请按规则重新设置主机名'
              },
              {
                validator: this.handleHostName
              }
            ],
            validateTrigger: 'onBlur'
          })(<Input style={{ width: '400px' }} />)}
        </FormItem>

      </Form >
    )
  }
}
export default Instance
