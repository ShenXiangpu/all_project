import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';
import TaskFilesList from './TaskFilesList';
import styles from './PublicLibsModal.less';
import { isEmpty, isEqual } from 'lodash';

class PublicLibsModal extends PureComponent {
  state = {
    selectedItem: {}
  };

  setSelectedItem = item => {
    this.setState({ selectedItem: item })
  }

  handleOk = (e) => {
    e.preventDefault();
    const { selectedItem } = this.state;
    const { onSetFieldPath } = this.props;
    onSetFieldPath(selectedItem.path,selectedItem.fileName);
  }

  handleCancel = e => {
    e.preventDefault();
    const { onCancel } = this.props;
    onCancel();
  }

  handlePreview = e => {
    e.preventDefault();
    const { onShowFile } = this.props;
    const { selectedItem } = this.state;
    onShowFile(selectedItem);
  }

  render() {
    const { uploaderProps, loading, taskPathId, onLoadFolderList, fieldType, ...modalProps } = this.props;
    const { selectedItem } = this.state;

    const isBtnDisabled = isEmpty(selectedItem) ? true :
      isEqual(fieldType, 'file') && (!selectedItem.isLeaf);

    return (
      <Modal
        {...modalProps}
        // okButtonProps={{ disabled: !selectedItem.isLeaf || isEmpty(selectedItem) }}
        // onOk={this.handleOk}
        className={styles.modal}
        footer={[
          <Button key="preview" type="link" onClick={this.handlePreview} disabled={!selectedItem.isLeaf || isEmpty(selectedItem)}>
            打开文件
          </Button>,
          <Button key="cancel" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}
            disabled={isBtnDisabled}
          >
            确定
          </Button>,
        ]}
      >
        <TaskFilesList taskPathId={taskPathId} onLoadFolderList={onLoadFolderList} setSelectedItem={this.setSelectedItem} />
      </Modal >
    )
  }
}

export default PublicLibsModal
