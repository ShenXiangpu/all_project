import React, { PureComponent } from 'react'
import { Form, Icon, Input } from 'antd';
import styles from './ConnectConfig.less';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

let id = 1;

class ConnectConfig extends PureComponent {
  state = {
    portsList: []           // 更多端口的列表
  }

  addPorts = () => {
    const { portsList } = this.state;
    portsList.push(id++);
    this.setState({ portsList });
    this.forceUpdate();
  }

  remove = key => {
    const { portsList } = this.state;
    var index = portsList.indexOf(key);
    portsList.splice(index, 1);
    this.setState({ portsList });
    this.forceUpdate();
  }

  getMorePorts = () => {
    const { portsList } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const formItems = portsList && portsList.map(item => {
      return (
        <Form.Item
          key={item}
          className={styles.noBtom}
          {...formItemLayoutWithOutLabel}
          required={false}
        >
          {getFieldDecorator(`ports[${item}]`, {
            initialValue: ''
          })(
            <Input placeholder="端口，默认：22" style={{ width: '80%', marginRight: '5px' }} />
          )}

          <Icon
            className={styles.dynamicButton}
            type="minus-circle-o"
            onClick={() => this.remove(item)}
          />
        </Form.Item>
      )
    });

    return formItems;
  }

  render() {
    const { form: { getFieldDecorator }, handleCheckVmName } = this.props;

    return (
      <Form>
        <FormItem label='主机名称' {...formItemLayout}>
          {getFieldDecorator('vmName', {
            rules: [
              {
                required: true,
                message: '请输入主机名称',
              },
              {
                validator: handleCheckVmName
              }
            ],
            validateTrigger: 'onBlur'
          })(<Input placeholder="虚拟机名称" />)}
        </FormItem>

        <FormItem label='用户名' {...formItemLayout}>
          {getFieldDecorator('userName', {
          })(<Input placeholder="用户名" />)}
        </FormItem>

        <FormItem label='密码' {...formItemLayout}>
          {getFieldDecorator('password', {
          })(<Input.Password autoComplete='off' placeholder="密码" />)}
        </FormItem>

        <FormItem label='端口' {...formItemLayout}>
          {getFieldDecorator('ports[0]', {
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                message: '端口号格式不正确',
              }
            ]
          })(<Input placeholder="端口，默认：22" style={{ width: '80%', marginRight: '5px' }} />)}

          <Icon
            className={styles.dynamicButton}
            type="plus-circle-o"
            onClick={() => this.addPorts()}
          />

          {this.getMorePorts()}
        </FormItem>
      </Form >
    )
  }
}

export default ConnectConfig
