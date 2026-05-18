import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Input, Button, Icon, message } from 'antd'
import { isEqual } from 'lodash';

/**
 * 导入Excel窗口
 */
class ImportExcelModal extends PureComponent {
  state = {
    file: undefined
  }

  handleUpload = e => {
    e.preventDefault();
    const { onUpload } = this.props;
    const { file } = this.state;

    const formdata = new FormData();
    formdata.append("file", file);

    const data = {
      file: formdata
    }
    onUpload(data)
  };

  onFileChange = () => {
    const file = document.querySelector('#file').files[0];
    this.setState({ file })
  }

  render() {
    const { onCancel, loading, ...modalProps } = this.props;
    const { file } = this.state;

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
            disabled={!file}
            loading={loading}
            style={{ marginTop: 16 }}
          >
            {loading ? '正在上传' : '开始上传'}
          </Button>,
        ]}
      >
        <div>
          <span style={{ display: 'inline-block', marginBottom: 4 }}>上传Excel文件：</span>
          <Input
            type="file"
            style={{ padding: '2px' }}
            accept="'.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            onClick={event => { event.target.value = null }}  // 防止连续上传同一个文件出发onChange
            id="file"
            onChange={this.onFileChange}
          >
          </Input>
        </div>
      </Modal>
    )
  }
}

export default ImportExcelModal
