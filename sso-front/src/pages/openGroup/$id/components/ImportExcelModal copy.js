import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Upload, Button, Icon, message } from 'antd'
import { isEqual } from 'lodash';

/**
 * 导入Excel窗口
 */
class ImportExcelModal extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = e => {
    e.preventDefault();

    const { onUpload } = this.props;
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    if (fileList && fileList.length > 0) {

      // const formdata = new FormData();
      // formdata.append("file", fileList[0]);
      console.log('formData：', formData);

      const data = {
        file: formData
      }

      onUpload(data).then(res => {
        if (res) {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('上传成功！');
        }
      })
    }
  };

  handleUploadChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);  // 上传文件数量限制：一次只能上传一个文件

    fileList.map(file => {
      // 判断文件类型
      const isExcel = isEqual(file.type, 'application/vnd.ms-excel');
      if (isExcel) {
        this.setState({ fileList: [file] });
      }
    });
  };

  onRemove = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

  onBeforeUpload = file => {
    const isExcel = isEqual(file.type, 'application/vnd.ms-excel');
    if (!isExcel) {
      message.error('请上传Excel格式的文档');
    } else {
      // this.setState(state => ({
      //   fileList: [...state.fileList, file],
      // }));
    }
    return isExcel;
  }

  render() {
    const { onCancel, ...modalProps } = this.props
    const { uploading, fileList } = this.state;
    const props = {
      beforeUpload: file => this.onBeforeUpload(file),
      onChange: this.handleUploadChange,
      onRemove: (file) => this.onRemove(file),
      fileList,
    };

    return (
      <Modal
        {...modalProps}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" type="primary" ghost onClick={onCancel}>
            取消
          </Button>,
          <Button
            key='upload'
            type="primary"
            onClick={e => this.handleUpload(e)}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? '正在上传' : '开始上传'}
          </Button>,
        ]}
      >
        <div>
          <span>上传：</span>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择Excel文件
            </Button>
          </Upload>
        </div>
      </Modal>
    )
  }
}

export default ImportExcelModal
