import React, { PureComponent } from 'react'
import { Table, Divider, Modal, Popconfirm, Button } from 'antd'
import { isEqual } from 'lodash';
import { router } from 'umi'

class VideoModal extends PureComponent {
    state = {
    }



    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }




    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }



    render() {
        const { currentItem,...modalProps } = this.props;
        return (
            <Modal {...modalProps}>
                <video controls controlslist="nodownload" autoplay width="100%" height='100%'>
                    <source src={currentItem.linkVideoPath} type="video/mp4" />
                </video>
            </Modal>
        )
    }
}

export default VideoModal
