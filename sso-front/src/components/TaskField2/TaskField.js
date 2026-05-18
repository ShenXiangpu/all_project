import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Upload, Button, Icon, message, Tooltip, Menu, Dropdown } from 'antd'
import store from 'store';
import styles from './TaskField.less'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@Form.create()
export default class TaskField extends Component {

  setStateValue = (key, value) => {
    this.setState({
      [`${key}`]: value
    })
  }

  // 文件类型校验
  beforeUpload = (file, value) => {
    const types = value.split('|');
    const isMatchType = false;
    types.map(item => {
      const lowerItem = item && item.toLocaleLowerCase();
      isMatchType = file.type === lowerItem;
      if (!isMatchType) {
        message.error(`请上传正确类型的文件! 比如：${value} 格式`);
        return;
      }
    })

    return isMatchType;
  }

  // 单个文件
  handleChange = (info, key, type) => {
    const { setFieldsValue } = this.props.form

    let fileList = [...info.fileList];

    // 限制上传文件的数量
    // 只显示最新上传的一个文件
    fileList = fileList.slice(-1);

    this.setStateValue(key, fileList);

    const fileStatus = info.file.status;
    if (fileStatus !== 'uploading') {
      if (fileStatus === 'removed') {
        setFieldsValue({
          [`${type}.${key}`]: undefined,
        });
      }
    }
    if (fileStatus === 'done') {
      let url = '';
      fileList = fileList.map(file => {
        const response = file.response;
        if (response && response.flag) {
          const filePath = response.resData && response.resData.filePath;
          const fileName = response.resData && response.resData.fileName;
          url = filePath + '/' + fileName;
        }
      });

      setFieldsValue({
        [`${type}.${key}`]: url,
      });

      message.success(`${info.file.name} 文件上传成功`);
    } else if (fileStatus === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }


  // 多个文件
  handleMultiChange = (info, key, type) => {
    const { setFieldsValue } = this.props.form

    let fileList = [...info.fileList];
    this.setStateValue(key, fileList);

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const fileUrls = [];
      fileList = fileList.map(file => {
        const response = file.response;
        console.log('file response:', response);
        if (response && response.flag) {
          const filePath = response.resData && response.resData.filePath;
          const fileName = response.resData && response.resData.fileName;
          const url = filePath + '/' + fileName;
          fileUrls.push(url);
        }
      });

      setFieldsValue({
        [`${type}.${key}`]: fileUrls,
      });

      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }

  // 预览文件并编辑
  handlePreview = (file) => {
    console.log('preview file:', file);
    const { onPreview } = this.props;
    const data = {
      fileName: file.name,
      fileUrl: file.url
    }
    onPreview(data);
  }

  showDataModal = () => {
    const { showDataModal } = this.props;
  }

  render() {
    const { fieldList, form, taskId, inputType } = this.props
    const { getFieldDecorator } = form

    const LabelField = ({ ...element }) => (
      <FormItem label={
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
        {getFieldDecorator(`${element.inputType}.${element.name}`, {
          initialValue: element.label,
        })(
          <Input style={{ display: 'none' }} />
        )}
        <label>{element.label}</label>
      </FormItem >
    )

    const SelectField = ({ ...element }) => {
      const arr = element.select_option;
      const options = arr && arr.map(ele => <Option key={ele} value={ele}>{ele}</Option>)

      return (
        <FormItem label={
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
          {getFieldDecorator(`${element.inputType}.${element.name}`, {
            initialValue: element.default,
            rules: element.necessity === 'required' ? [
              {
                required: true,
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

          const fileUrl = field.default;
          const fileName = fileUrl && fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
          const defultFileList = [{
            uid: fileName,
            name: fileName,
            status: 'done',
            url: fileUrl
          }]

          const uploadProps = {
            name: 'file',
            headers: {
              "Auth-token": store.get('Token')
            },
            multiple: false,
            action: '/service/datamanage-service/v1/datamanage/upload',     //上传接口地址
            data: {
              isPublic: false,
              taskId,
              userId: store.get('user').userInfo.id
            },
            beforeUpload: file => this.beforeUpload(file, field.allowed_type),
            showUploadList: {
              showRemoveIcon: true,
              showPreviewIcon: true,
              showDownloadIcon: false
            },
            fileList: (this.state && this.state[field.name]) || (field.default && defultFileList) || [],
            onChange: (info) => this.handleChange(info, field.name, inputType),
            onPreview: (file) => this.handlePreview(file)
          };

          switch (fieldType) {
            case 'text':
              // 不能通过这种封装组件的方式，会出现 Input 组件输入一个字符后就失去焦点，原因：DOM 持续 render
              // 函数式组件中有Input，会导致 Input 组件每次输入一个字符都失去焦点
              // 参考解决方案：
              // 1： https://blog.csdn.net/weixin_42436131/article/details/103471665
              // 2： https://www.cnblogs.com/zhuangcui/p/12613382.html
              // 3： https://blog.csdn.net/ZxqSoftWare/article/details/106217091
              // return <TextField key={field.name} {...field} inputType={inputType} />

              // 解决方式：拿出来
              return (
                <FormItem key={field.name} label={
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
                  {getFieldDecorator(`${inputType}.${field.name}`, {
                    initialValue: field.default,
                    rules: field.necessity === 'required' ? [
                      {
                        required: true,
                        message: `请输入 ${field.name}`
                      },
                    ] : [],
                  })(
                    <Input placeholder={field.placeholder} disabled={field.editable} />
                  )}
                </FormItem>
              )
            case 'file': // 单文件上传
              // return <FileField key={field.name} {...field} inputType={inputType} isMultiple={false} />
              return (
                <FormItem
                  key={field.name}
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
                  {getFieldDecorator(`${inputType}.${field.name}`, {
                    initialValue: field.default,
                    rules: field.necessity === 'required' ? [
                      {
                        required: true,
                        // message: (this.state && this.state[field.name]) ? '正在上传，请稍后' : field.placeholder
                        message: `请上传 ${field.name} 文件`
                      },
                    ] : [],
                  })(
                    <Input style={{ display: 'none' }} />
                  )}
                  <Upload {...uploadProps}>
                    <Button>
                      <Icon type="upload" /> 点击上传 {field.label}
                    </Button>
                  </Upload>
                  {field.shareble &&
                    <a onClick={this.showDataModal}>选择</a>
                  }
                </FormItem>
              )
            case 'filelist': // 多文件上传
              // 不能通过这种封装组件的方式，会出现 Upload 组件在 onchange 事件中一直都是 uploading 状态，原因：DOM 持续 render
              // return <FileListField key={field.name} {...field} inputType={inputType} />
              // return <FileField key={field.name} {...field} inputType={inputType} isMultiple={true} />
              // 解决方式：拿出来！

              const fileUrls = field.default;
              const fileArr = fileUrls && fileUrls.split(",");
              const defultMultiFileList = fileArr && fileArr.map(item => {
                const name = item.substring(item.lastIndexOf('/') + 1);
                const data = {
                  uid: name,
                  name: name,
                  status: 'done',
                  // url: item
                }

                return data;
              })

              const props = {
                ...uploadProps,
                multiple: true,
                // beforeUpload: (file,fileList) => this.beforeUpload(fileList, field.allowed_type),
                fileList: (this.state && this.state[field.name]) || (field.default && defultMultiFileList) || [],
                // fileList: (this.state && this.state[field.name]) || [],
                onChange: (info) => this.handleMultiChange(info, field.name, inputType)
              };

              return (
                <FormItem
                  key={field.name}
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
                  {getFieldDecorator(`${inputType}.${field.name}`, {
                    initialValue: field.default,
                    rules: field.necessity === 'required' ? [
                      {
                        required: true,
                        message: (this.state && this.state[field.name]) ? '正在上传，请稍后' : field.placeholder
                      },
                    ] : [],
                  })(
                    <Input style={{ display: 'none' }} />
                  )}
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 点击上传 {field.label}
                    </Button>
                  </Upload>
                </FormItem>
              )
            case 'file|directory': // 文件或文件夹上传

              const menu = (
                <Menu>
                  <Menu.Item>
                    <Upload {...uploadProps}>
                      <Button>
                        上传文件
                      </Button>
                    </Upload>
                  </Menu.Item>
                  <Menu.Item>
                    <Upload {...uploadProps} directory>
                      <Button>
                        上传文件夹
                      </Button>
                    </Upload>
                  </Menu.Item>
                </Menu>
              );

              return (
                <FormItem
                  key={field.name}
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
                  {getFieldDecorator(`${inputType}.${field.name}`, {
                    initialValue: field.default,
                    rules: field.necessity === 'required' ? [
                      {
                        required: true,
                        message: `请上传 ${field.name} 文件`
                      },
                    ] : [],
                  })(
                    <Input style={{ display: 'none' }} />
                  )}
                  <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>上传</Button>
                  </Dropdown>
                </FormItem>
              )
            default:
              break;
          }
        case 'select':
          return <SelectField key={field.name} {...field} inputType={inputType} />
        case 'label':
          return <LabelField key={field.name} {...field} inputType={inputType} />
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
  inputType: PropTypes.string,
  onPreview: PropTypes.func,
  processNode: PropTypes.string,
  featureName: PropTypes.string
}
