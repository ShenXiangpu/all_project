import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'

const FormItem = Form.Item
const { TreeNode } = TreeSelect;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class IpModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  toTreeData = data => {
    return data && data.map(item => {
      let result = {
        key: item.id,
        title: item.typeName,
        value: item.typeName
      };

      if (item.children) {
        result.children = this.toTreeData(item.children);
      }
      return result;
    });
  }

  render() {
    const { item = {},
      onOk,
      form,
      nodeList,
      foundryList,
      ipCategoryList,
      ...modalProps } = this.props

    const { getFieldDecorator } = form;

    const ipTreeData = this.toTreeData(ipCategoryList);

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='area'>
          <Form  {...formItemLayout} layout="horizontal">
            <FormItem label='IP名称'>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message: '请输入IP名称'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入IP名称" />
              )}
            </FormItem>

            <FormItem label='IP型号'>
              {getFieldDecorator('ipModel', {
                initialValue: item.ipModel,
                rules: [
                  {
                    required: true,
                    message: '请输入IP型号'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入IP型号" />
              )}
            </FormItem>

            <FormItem label='IP类型'>
              {getFieldDecorator('typeName', {
                initialValue: item.typeName,
                rules: [
                  {
                    required: true,
                    message: '请选择IP类型'
                  },
                ],
              })(
                <TreeSelect
                  showSearch
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  allowClear
                  treeDefaultExpandAll
                  placeholder="请选择IP对应的IP类型"
                  getPopupContainer={() => document.getElementById('area')}
                  treeData={ipTreeData}
                >
                </TreeSelect>
              )}
            </FormItem>

            <FormItem label="工艺节点" required>
              {getFieldDecorator('nodeType', {
                initialValue: item.nodeType,
                rules: [
                  {
                    required: true,
                    message: '请选择IP对应的工艺节点类型'
                  },
                ],
              })(
                <Select
                  placeholder="请选择IP对应的工艺节点类型"
                  getPopupContainer={() => document.getElementById('area')}
                >
                  {nodeList && nodeList.length > 0 && nodeList.map(item => (
                    <Option key={item} value={item}>{item}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>

            <FormItem label="代工厂" required>
              {getFieldDecorator('foundryName', {
                initialValue: item.foundryName,
                rules: [
                  {
                    required: true,
                    message: '请选择IP关联的代工厂'
                  },
                ],
              })(
                <Select
                  placeholder="请选择IP关联的代工厂"
                  getPopupContainer={() => document.getElementById('area')}
                >
                  {foundryList && foundryList.length > 0 && foundryList.map(item => (
                    <Option key={item.id} value={item.foundryName}>{item.foundryName}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>

            <FormItem label='IP成熟度'>
              {getFieldDecorator('iPMaturity', {
                initialValue: item.iPMaturity,
                rules: [
                  {
                    required: true,
                    message: '请输入IP成熟度'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入IP成熟度" />
              )}
            </FormItem>

            <FormItem label='优势'>
              {getFieldDecorator('ipAdvantage', {
                initialValue: item.ipAdvantage,
                rules: [
                  {
                    required: true,
                    message: '请输入IP优势'
                  },
                ],
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入IP优势" />
              )}
            </FormItem>

            <FormItem label='IP特色信息'>
              {getFieldDecorator('feature', {
                initialValue: item.feature,
                rules: [
                  {
                    required: true,
                    message: '请输入IP特色信息'
                  },
                ],
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入IP特色信息" />
              )}
            </FormItem>

            <FormItem label='可交付内容'>
              {getFieldDecorator('deliverable', {
                initialValue: item.deliverable,
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入IP可交付内容" />
              )}
            </FormItem>

            <FormItem label='描述'>
              {getFieldDecorator('profile', {
                initialValue: item.profile,
              })(
                <Input.TextArea autoComplete="off" placeholder="请描述IP" />
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}

IpModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default IpModal
