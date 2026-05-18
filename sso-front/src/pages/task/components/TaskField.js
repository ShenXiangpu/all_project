import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Row, Col, Icon, Checkbox, Tooltip } from 'antd'
import styles from './TaskField.less'
import { isEmpty, isEqual } from 'lodash';

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}

export default class TaskField extends Component {
  state = {
    tempList: {},     // 用来暂存初始 fieldList 深度副本
    subTaskList: [],
  }

  setStateValue = (key, value) => {
    this.setState({
      [`${key}`]: value
    })
  }

  componentDidMount() {
    const { fieldList, netList } = this.props;
    if (fieldList) {
      this.setState({
        tempList: this.arrayDeepCopy(fieldList)
      })
    }

    if (netList && netList.length > 0) {
      this.setState({
        subTaskList: netList
      })
    }
  }

  componentDidUpdate(preProps) {
    const { tempList } = this.state;
    const { fieldList, form: { setFieldsValue }, netList } = this.props;
    const { netList: old_netList } = preProps;
    if (fieldList && !isEqual(tempList, fieldList)) {
      fieldList.forEach(item => {
        if (!isEmpty(item.default_value)) {
          setFieldsValue({
            [`${item.name}`]: item.default_value,
            spfile: item.default_value,
          });
        }
      });

      this.setState({
        tempList: this.arrayDeepCopy(fieldList)
      })
    }

    if (netList && !isEqual(netList, old_netList)) {
      this.setState({
        subTaskList: netList
      })
    }
  }

  arrayDeepCopy = (obj) => {
    if (obj instanceof Object) {
      let tmp;
      if (obj instanceof Array) {
        tmp = obj.concat([]);
      } else {
        tmp = { ...obj };
      }
      for (let i in tmp) {
        tmp[i] = this.arrayDeepCopy(tmp[i])
      }
      return tmp;
    }
    return obj;
  }

  onChange = (e, fieldName) => {
    const { fieldList, onSetFieldList } = this.props;
    const value = e.target.value;

    const arr = fieldList.map(item => {
      if (item.name === fieldName) {
        item.default_value = value;
      }
      return item;
    });

    onSetFieldList(fieldList);
  }

  render() {
    const { fieldList, form, taskId, showDataModal } = this.props;
    const { getFieldDecorator } = form;
    const { subTaskList } = this.state;

    // 自定义 Label 组件
    const LabelField = ({ ...element }) => (
      <FormItem
        key={element.name}
        label={
          element.description ?
            < span >
              {element.label} &nbsp;
              <Tooltip title={element.description}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span >
            : element.label
        }
        {...formItemLayout}
        required={element.necessity === 'required'}
      >
        {getFieldDecorator(element.name, {
          initialValue: element.label,
        })(
          <Input style={{ display: 'none' }} />
        )}
        <label>{element.label}</label>
      </FormItem>
    )

    // 自定义 Select 组件
    const SelectField = ({ ...element }) => {
      const arr = element.select_option;
      const options = arr && arr.map(ele => <Option key={ele} value={ele}>{ele}</Option>)

      return (
        <FormItem
          key={element.name}
          label={
            element.description ?
              < span >
                {element.label} &nbsp;
                <Tooltip title={element.description}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span >
              : element.label
          }
          {...formItemLayout}
          required={element.necessity === 'required'}
        >
          {getFieldDecorator(element.name, {
            initialValue: element.default_value,
            rules: element.necessity === 'required' ? [
              {
                required: true,
                whitespace: true,
                message: element.placeholder
              },
            ] : [],
          })(
            <Select placeholder={element.placeholder} disabled={element.editable}>
              {options}
            </Select>
          )}
        </FormItem>
      )
    }

    const formFields = fieldList && fieldList.map(field => {
      const htmlType = (field.html_type).toLocaleLowerCase();

      switch (htmlType) {
        case 'input':
          const fieldType = (field.type).toLocaleLowerCase();
          // console.log('fieldType:', fieldType);

          switch (fieldType) {
            case 'text':
              // 不能通过这种封装组件的方式，会出现 Input 组件输入一个字符后就失去焦点，原因：DOM 持续 render
              // 函数式组件中有Input，会导致 Input 组件每次输入一个字符都失去焦点
              // 参考解决方案：
              // 1： https://blog.csdn.net/weixin_42436131/article/details/103471665
              // 2： https://www.cnblogs.com/zhuangcui/p/12613382.html
              // 3： https://blog.csdn.net/ZxqSoftWare/article/details/106217091
              // return <TextField key={field.name} {...field} />

              // 解决方式：拿出来
              return (
                <FormItem
                  key={field.name}
                  label={
                    field.description ?
                      < span >
                        {field.label} &nbsp;
                        <Tooltip title={field.description}>
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span >
                      : field.label
                  }
                  {...formItemLayout}
                  required={field.necessity === 'required'}
                >
                  {getFieldDecorator(field.name, {
                    initialValue: field.default_value,
                    rules: field.necessity === 'required' ? [
                      {
                        required: true,
                        whitespace: true,
                        message: `请输入 ${field.name}`
                      },
                    ] : [],
                  })(
                    <Input placeholder={field.placeholder} disabled={field.editable} />
                  )}
                </FormItem>
              )
            case 'file': // 单文件路径
              return (
                <Row key={field.name}>
                  <Col span={22}>
                    <FormItem
                      className={styles.uploadError}
                      label={
                        field.description ?
                          < span >
                            {field.label} &nbsp;
                            <Tooltip title={field.description}>
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </span >
                          : field.label
                      }
                      {...formItemLayout}
                      required={field.necessity === 'required'}
                    >
                      {getFieldDecorator(field.name, {
                        initialValue: field.default_value,
                        rules: field.necessity === 'required' ? [
                          {
                            required: true,
                            whitespace: true,
                            message: `请输入 ${field.name} 存放路径`
                          },
                        ] : [],
                      })(
                        <Input onChange={e => this.onChange(e, field.name)} placeholder={field.placeholder} disabled={field.editable} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <Tooltip placement="bottom" title='选择库中文件'>
                      <Icon
                        className={styles.dynamicButton}
                        type="file-add"
                        onClick={() => showDataModal(field.name, 'file')}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              )

            case 'file|directory': // 文件或文件夹路径
              return (
                <div key={field.name}>
                  <Row>
                    <Col span={22}>
                      <FormItem
                        key={field.name}
                        label={
                          field.description ?
                            < span >
                              {field.label} &nbsp;
                              <Tooltip title={field.description}>
                                <Icon type="question-circle-o" />
                              </Tooltip>
                            </span >
                            : field.label
                        }
                        {...formItemLayout}
                        required={field.necessity === 'required'}
                      >
                        {getFieldDecorator(field.name, {
                          initialValue: field.default_value,
                          rules: field.necessity === 'required' ? [
                            {
                              required: true,
                              whitespace: true,
                              message: `请输入 ${field.name} 存放路径`
                            },
                          ] : [],
                        })(
                          <Input placeholder={field.placeholder} disabled={field.editable} onChange={e => this.onChange(e, field.name)} />
                        )}

                      </FormItem>
                    </Col>
                    <Col span={2}>
                      <Tooltip placement="bottom" title='选择库中文件'>
                        <Icon
                          className={styles.dynamicButton}
                          type="file-add"
                          onClick={() => showDataModal(field.name, 'file|directory')}
                        />
                      </Tooltip>
                    </Col>
                  </Row>

                  {isEqual(Number(field.need_trigger), 1) && subTaskList && subTaskList.length > 0 &&
                    <Row>
                      <Col span={2}></Col>
                      <Col span={22}>
                        <FormItem
                          key="subTasks"
                          {...formItemLayout2}
                          required={field.necessity === 'required'}
                        >
                          {getFieldDecorator('subTasks', {
                            initialValue: subTaskList || [],
                            rules: field.necessity === 'required' ? [
                              {
                                required: true,
                                message: `请选择 ${field.name} 需要执行的子任务`
                              },
                            ] : [],
                          })(
                            <Checkbox.Group
                              options={subTaskList}
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  }
                </div>
              )
            default:
              break;
          }
          break;
        case 'select':
          return <SelectField key={field.name} {...field} />
        case 'label':
          return <LabelField key={field.name} {...field} />
        default:
          break;
      }
    })

    return (<>{formFields}</>)
  }
}

TaskField.propTypes = {
  fieldList: PropTypes.array,
  form: PropTypes.object,
  onPreview: PropTypes.func,
  showDataModal: PropTypes.func
}
