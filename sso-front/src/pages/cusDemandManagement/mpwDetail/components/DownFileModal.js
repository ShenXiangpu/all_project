import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Tree, Button } from 'antd'


const { TreeNode, DirectoryTree } = Tree;

class DownFileModal extends PureComponent {

    handleCancel = () => {
        const { onCancel } = this.props
        onCancel();
    };




    render() {
        const { ...modalProps } = this.props;
        return (
            <Modal
                {...modalProps}
                onCancel={this.handleCancel}
            >
                <div style={{ height: '50px',textAlign:'center' }}>文件已经开始下载，请耐心等待...</div>
                <div style={{width:'100px',margin:'0 auto'}}>
                    <Button type='primary' style={{ width: '100px' }} onClick={this.handleCancel}>确定</Button>
                </div>
            </Modal>
        )
    }
}


DownFileModal.propTypes = {

}

export default DownFileModal
