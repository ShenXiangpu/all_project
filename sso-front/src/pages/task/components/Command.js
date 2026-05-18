import React, { Component } from 'react'
import { Tabs, Input, Form } from 'antd'
import styles from './Command.less'
import { isEmpty } from 'lodash';

const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item

@Form.create()
class Command extends Component {
  state = {
    type: 'command',  //命令类型
  }

  handleTabsChange = key => {
    const { checkCmdField } = this.props;
    this.setState({ type: key });
    checkCmdField(key);
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;

    return (
      <div className={styles.cardContainer}>
        <Tabs type="card" onChange={this.handleTabsChange}>
          <TabPane tab="command" key="command">
            <Form.Item>
              {getFieldDecorator('command', {
                initialValue: '',
                // rules: [{
                //   required: type === 'shell',
                //   message: '请输入执行命令'
                // }]
              })(
                <TextArea rows={4} placeholder="#请在此输入你的执行命令" />
              )}
            </Form.Item>
          </TabPane>
          <TabPane tab="shell" key="shell">
            <Form.Item>
              {getFieldDecorator('shell', {
                initialValue: '',
                // rules: [{
                //   required: type === 'shell',
                //   message: '请输入执行命令'
                // }]
              })(
                <TextArea rows={4} placeholder="#请在此输入你的执行命令" />
              )}
            </Form.Item>
          </TabPane>
          <TabPane tab="makefile" key="makefile">
            <Form.Item>
              {getFieldDecorator('makefile', {
                initialValue: '',
                // rules: [{
                //   required: type === 'makefile',
                //   message: '请输入执行命令'
                // }]
              })(
                <TextArea rows={4} placeholder="#请在此输入你的执行命令" />
              )}
            </Form.Item>
          </TabPane>
        </Tabs>
      </div >
    )
  }
}

export default Command;
