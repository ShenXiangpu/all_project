import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal';
import { isEmpty } from 'lodash';
import { Form, Input, Select, Modal, Icon } from 'antd'
import styles from './VmModal.less'

const { Option, OptGroup } = Select

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

let id = 1;

@Form.create()
class VmModal extends PureComponent {
  state = {
    checkedObj: {},         // templateList 中选中的对象
    portsList: []           // 更多端口的列表
  }

  componentDidMount() {
    const { templateList } = this.props;
    if (templateList && templateList.length > 0) {
      this.setState({
        checkedObj: templateList[0]
      })
    }
  }

  componentDidUpdate(preProps) {
    const { templateList: oldTemplateList } = preProps;
    const { templateList } = this.props;
    if (!isEqual(oldTemplateList, templateList) && templateList && templateList.length > 0) {
      this.setState({
        checkedObj: templateList[0]
      })
    }
  }

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      let data = {
        ...getFieldsValue(),
        // id: item.id,
      }
      const portsArr = this.dedupe(data.ports);
      const newPorts = portsArr.filter(item => !isEmpty(item));
      data = {
        ...data,
        ports: newPorts
      }

      onOk(data);
    })
  }

  dedupe = (arr) => {
    const newSet = new Set(arr);  // arr变成了set的数据结构，并去除了其中重复的元素
    return Array.from(newSet);  // Array.from方法将set数据结构转为数组数据结构
  }

  handleCpuChange = value => {
    const { templateList } = this.props;
    const checkedArr = templateList.filter(item => Number(item.cpu) === Number(value));
    this.setState({ checkedObj: checkedArr && checkedArr[0] })
  }

  handleCheckVmName = (rule, value, callback) => {
    const { onCheckVmName } = this.props;
    onCheckVmName(rule, value, callback);
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
    const { item = {}, onOk, form, tooList, templateList, memeryList, ...modalProps } = this.props
    const { getFieldDecorator } = form;
    const { checkedObj } = this.state;

    const ToolOptions = tooList && tooList.map(item => {
      const toolInfos = item.tool_infos;

      const tools = toolInfos.map(subItem => {
        const versions = subItem.tool_version;
        return versions.map(v => {
          return (
            <Option key={`${subItem.tool_name}[${v}]`}>
              {subItem.tool_name}
              <span className={styles.version}>v{v}</span>
            </Option>
          )
        })
      })

      return (
        <OptGroup key={item.type} label={item.type}>
          {tools}
        </OptGroup>
      )
    })

    const CpuOptions = templateList && templateList.map(item => (
      <Option key={item.cpu}>{item.cpu}</Option>
    ))

    const MemoryOptions = checkedObj && checkedObj.memory && checkedObj.memory.map(item => (
      <Option key={item}>{item}</Option>
    ))

    const HardDiskOptions = checkedObj && checkedObj.hardDisk ?
      <Option key={checkedObj.hardDisk}>{checkedObj.hardDisk}</Option> : null;

    const NetworkOptions = checkedObj && checkedObj.network ?
      <Option key={checkedObj.network}>{checkedObj.network}</Option> : null;

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id="area" className={styles.wrap}>
          <Form layout="horizontal">

            <p><b><Icon type="caret-right" /> 工具选择</b></p>
            <FormItem label='工具' {...formItemLayout2}>
              {getFieldDecorator('vmTools', {
                initialValue: item.vmTools,
                rules: [
                  {
                    required: true,
                    message: '请选择工具'
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择工具"
                  getPopupContainer={() => document.getElementById('area')}
                >
                  {ToolOptions}
                </Select>
              )}
            </FormItem>

            <div className={styles.left}>

              <p><b><Icon type="caret-right" /> 虚拟机配置</b></p>
              <div className={styles.vmConf}>
                <FormItem label='CPU' {...formItemLayout}>
                  {getFieldDecorator('cpu', {
                    initialValue: item.cpu || (checkedObj && checkedObj.cpu && checkedObj.cpu.toString()),
                  })(
                    <Select
                      style={{ width: '30%', marginRight: '5px' }}
                      onChange={this.handleCpuChange}
                      getPopupContainer={() => document.getElementById('area')}
                    >
                      {CpuOptions}
                    </Select>
                  )}
                  <span>核</span>
                </FormItem>

                <FormItem label='内存' {...formItemLayout}>
                  {getFieldDecorator('memory', {
                    initialValue: item.memory || (checkedObj && checkedObj.memory && checkedObj.memory.length > 0 && checkedObj.memory[0].toString()),
                  })(
                    <Select
                      style={{ width: '30%', marginRight: '5px' }}
                      getPopupContainer={() => document.getElementById('area')}
                    >
                      {MemoryOptions}
                    </Select>
                  )}
                  <span>GB</span>
                </FormItem>

                <FormItem label='磁盘' {...formItemLayout}>
                  {getFieldDecorator('hardDisk', {
                    initialValue: item.hardDisk || (checkedObj && checkedObj.hardDisk && checkedObj.hardDisk.toString()),
                  })(
                    <Select
                      style={{ width: '50%' }}
                      getPopupContainer={() => document.getElementById('area')}
                    >
                      {HardDiskOptions}
                    </Select>
                  )}
                </FormItem>

                <FormItem label='网络' {...formItemLayout}>
                  {getFieldDecorator('network', {
                    initialValue: item.network || (checkedObj && checkedObj.network && checkedObj.network.toString()),
                  })(
                    <Select
                      style={{ width: '50%' }}
                      getPopupContainer={() => document.getElementById('area')}
                    >
                      {NetworkOptions}
                    </Select>
                  )}
                </FormItem>
              </div>
            </div>

            <div className={styles.right}>
              <p><b> <Icon type="caret-right" /> 连接设置</b></p>
              <FormItem label='虚拟机名称' {...formItemLayout}>
                {getFieldDecorator('vmName', {
                  initialValue: item.vmName,
                  rules: [
                    {
                      required: true,
                      message: '请输入虚拟机名称',
                    },
                    {
                      validator: this.handleCheckVmName
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(<Input placeholder="虚拟机名称" />)}
              </FormItem>

              <FormItem label='用户名' {...formItemLayout}>
                {getFieldDecorator('userName', {
                  initialValue: item.userName,
                })(<Input placeholder="用户名" />)}
              </FormItem>

              <FormItem label='密码' {...formItemLayout}>
                {getFieldDecorator('password', {
                  initialValue: item.password,
                })(<Input.Password autoComplete='off' placeholder="密码" />)}
              </FormItem>

              <FormItem label='端口' {...formItemLayout}>
                {getFieldDecorator('ports[0]', {
                  initialValue: item.ports || '',
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
            </div>
          </Form>
        </div>
      </Modal>
    )
  }
}

VmModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default VmModal
