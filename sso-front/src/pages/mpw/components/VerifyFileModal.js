import React, { PureComponent } from 'react'
import { Modal, Upload, Form, Row, Col, Input, Icon, Button, message } from 'antd'
import styles from './modal.less'
import FileUpload from './FileUpload';
import { isEqual, isEmpty, findLastIndex } from 'lodash';
import moment from "moment";
import { connect } from 'dva';
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}

/**
 * 续费窗口
 */
@Form.create()
@connect(({ app, mpw, loading }) => ({ app, mpw, loading }))
class VerifyFileModal extends PureComponent {
  state = {

  }



  componentDidMount() {

  }

  componentDidUpdate(preProps) {

  }

  handleOk = (e) => {


    const { onOk, form, id } = this.props;
    const { validateFields } = form;

    validateFields((errors, values) => {
      if (errors) {
        return
      }


      onOk();
    })
  }
  /**
   * 处理项目描述不少于5个字符相关的问题
   */
  handleProjectIntro = (rule, value, callback) => {
    const { dispatch } = this.props
    if (value && value.trim().length() >= 5) {
      callback()
    } else {
      callback()
    }
  }


  onCancel = () => {
    const { form, onCancel } = this.props
    form.resetFields();
    onCancel()
  }


  renderFooter = () => {

    return [
      <Button onClick={this.onCancel}>取消</Button>,
      <Button type='primary' onClick={(e) => this.handleOk(e)}>确定</Button>,
    ];
  };


  // 上传文件
  get uploaderProps1() {
    const { dispatch, mpw, loading, app, projectId, } = this.props
    const { currentPath } = mpw
    const { fileList } = app


    return {
      dispatch,
      projectId,
      beforeFileQueued: (file) => {
        console.log('beforeFileQueued');
        if (file.size > 1) {
          Modal.error({
            title: '不能上传多个文件',
          });
          return false;
        }
        return true;
      },
      fileList,
      uploadUrl: '/service/zkxy-mpw/mpw/chipproject/uploadBigFile',
      rootPath: currentPath,
      onChange: (file, list) => {
        console.log('Modal onChange >>>> ', file, list)

      },
      onShowModal: (value) => {
        dispatch({
          type: 'app/showUploadModal',
          payload: {
            webUploader: value
          },
        })

      },
      onSetFileList: (value) => {
        let name = value[0].name
        dispatch({
          type: 'app/updateState',
          payload: {
            fileList: value,
          },
        })
        dispatch({
          type: 'mpw/updateState',
          payload: {
            fileGdsName: name
          },
        })
      },
      onSetValue: (id) => {
        dispatch({
          type: 'mpw/updateState',
          payload: {
            fileGdsId: id
          },
        })
      }
    }
  }

  get uploaderProps2() {
    const { dispatch, mpw, loading, x, projectId,app } = this.props
    const { currentPath } = mpw
    const { fileList } = app

    return {
      dispatch,
      projectId,
      beforeFileQueued: (file) => {
        console.log('beforeFileQueued');
        if (file.size > 1) {
          Modal.error({
            title: '不能上传多个文件',
          });
          return false;
        }
        return true;
      },
      fileList,
      uploadUrl: '/service/zkxy-mpw/mpw/chipproject/uploadBigFile',
      rootPath: currentPath,
      onChange: (file, list) => {
        console.log('Modal onChange >>>> ', file, list)

      },
      onShowModal: (value) => {
        dispatch({
          type: 'app/showUploadModal',
          payload: {
            webUploader: value
          },
        })

      },
      onSetFileList: (value) => {
        console.log(value);
        dispatch({
          type: 'app/updateState',
          payload: {
            fileList: value
          },
        })
        console.log(value);
        if (value && value.length > 0) {
          let name = value[0].name
          dispatch({
            type: 'app/updateState',
            payload: {
              fileList: value,
            },
          })
          dispatch({
            type: 'mpw/updateState',
            payload: {
              fileDrcName: name
            },
          })

        }

      },
      onSetValue: (id) => {
        dispatch({
          type: 'mpw/updateState',
          payload: {
            fileDrcId: id
          },
        })
      }
    }
  }






  render() {
    const { form, ColProps, formItemLayout, loading, props, fileGdsName, fileDrcName, ...modalProps } = this.props
    const { getFieldDecorator } = form;

    return (
      <Modal
        {...modalProps}
      // footer={this.renderFooter()}
      >
        <Form>
          <Row>
            <Col
              {...ColProps}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:'0 0 20px 0' }}
            >
              <Form.Item style={{ margin: '0' }} label="gds" {...formItemLayout}>
                {getFieldDecorator('projectNameEn', {
                  initialValue: fileGdsName || '',
                  rules: [
                    {
                      required: true,
                      message: "请上传",
                    },
                    {
                      pattern: /\.gds$/,
                      // pattern: /^(?!\d*$)/,
                      message: '必须是gds文件',
                    },
                  ],
                })(
                  <Input readOnly style={{ width: '200px' }} placeholder="文件名称" />
                )}


              </Form.Item><FileUpload {...this.uploaderProps1} pickerId="filePicker1" />
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:'0 0 20px 0' }}
            >
              <Form.Item style={{ margin: '0' }} label="drc" {...formItemLayout}>
                {getFieldDecorator('projectName', {
                  initialValue: fileDrcName || '',
                  rules: [
                    {
                      required: true,
                      message: "请上传",
                    },
                    {
                      pattern: /\.drc$/,
                      // pattern: /^(?!\d*$)/,
                      message: '必须是drc文件',
                    },
                  ],
                })(
                  <Input readOnly style={{ width: '200px' }} placeholder="文件名称" />
                )}
              </Form.Item><FileUpload {...this.uploaderProps2} pickerId="filePicker2" />
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
              style={{ textAlign: 'right' }}
            >
              <Button onClick={this.onCancel}>取消</Button>&nbsp;&nbsp;
              <Button type='primary' loading={!loading} onClick={(e) => this.handleOk(e)}>确定</Button>
            </Col>
          </Row>

        </Form>
      </Modal >
    )
  }
}


export default VerifyFileModal
