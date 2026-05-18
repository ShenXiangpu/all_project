import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper' // 引入Cropper
import 'cropperjs/dist/cropper.css' // 引入Cropper对应的css
import { Modal } from 'antd';
import styles from './HooksCropperModal.less'

function HooksCropperModal({ modalProps, uploadedImageFile, onClose, onSubmit }) {
    const [src, setSrc] = useState(null)
    const cropperRef = useRef(null)

    useEffect(() => {
        const fileReader = new FileReader()
        fileReader.onload = e => {
            const dataURL = e.target.result
            setSrc(dataURL)
        }

        uploadedImageFile && fileReader.readAsDataURL(uploadedImageFile)
    }, [uploadedImageFile])

    const handleSubmit = useCallback(() => {
        // getCroppedCanvas() 输出的是 canvas
        // getCroppedCanvas().toDataURL() 输出的是图片base64代码
        // getCroppedCanvas().toBlob 输出的是 blob 对象， 后台接口接收的是File流文件
        // 而实际上 file 对象只是 blob 对象的一个更具体的版本，blob 存储着大量的二进制数据，并且 blob 的 size 和 type 属性，都会被 file 对象所继承。

        let filename = uploadedImageFile.name

        console.log('正在上传图片', cropperRef.current.getCroppedCanvas())
        // 这里可以尝试修改上传图片的尺寸
        cropperRef.current.getCroppedCanvas().toBlob(blob => {

            //=========将blob文件转为File类型==========
            // 创造提交表单数据对象
            const formData = new FormData()
            // 添加要上传的文件
            formData.append('file', blob, filename)

            // 上传图片
            const { onOk } = modalProps
            onOk(formData)
        })
    })

    return (
        <Modal {...modalProps} width={880} onOk={handleSubmit}>
            <div className={styles.modalPanel}>
                <div className={styles.cropperContainerContainer}>
                    <div className={styles.cropperContainer}>
                        <Cropper
                            src={src}
                            className={styles.cropper}
                            ref={cropperRef}
                            // Cropper.js options
                            viewMode={1}
                            zoomable={true}
                            aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                            guides={false}
                            preview=".cropper-preview"
                        />
                    </div>
                    <div className={styles.previewContainer}>
                        <div className="cropper-preview" style={{ width: 180, height: 180, overflow: 'hidden', borderRadius: '50%' }} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

HooksCropperModal.propTypes = {
    uploadedImageFile: PropTypes.object.isRequired
}

export default HooksCropperModal
