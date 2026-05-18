import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Modal, Spin, Button, Tooltip } from 'antd'
import styles from './previewModal.less'

class PreviewModal extends PureComponent {

    state = {
        max: false,
        copied: false,
        bottom: '',
    };

    // componentDidUpdate(prevProps) {
    //     const logContent = this.props.logContent
    //     const old_logContent = prevProps.logContent
    //     if (logContent !== old_logContent && logContent !== null) {
    //         this.setState({ bottom: this.scrollAt() + this.getContentHeight(logContent) })
    //         this.scrollTo(this.scrollAt() + this.getContentHeight(logContent))
    //     }
    // }

    scrollAt = () => {
        return this.refs.perElement.scrollTop
    }

    scrollTo = to => {
        this.refs.perElement.scrollTop = to
    }

    onCopy = () => {
        this.setState({ copied: true })
    }

    changeSize = () => {
        this.setState({
            max: !this.state.max,
        })
    }

    scrollToTop = () => {
        this.refs.perElement.scrollTop = 0
    }

    // scrollToBottom = () => {
    //     this.refs.perElement.scrollTop = this.state.bottom // Number.MAX_VALUE;
    // }

    getContentHeight = (content) => {
        const lineCount = content.split(/\r\n|\r|\n/).length
        const realCount = lineCount >= 2 ? lineCount - 2 : 0
        if (realCount === 0) return 0
        const lineHeightCSS = window.getComputedStyle(this.refs.perElement, null).getPropertyValue('line-height')
        const lineHeight = parseInt(lineHeightCSS.replace('px', ''), 10)

        return realCount * lineHeight
    }

    render() {
        const { loading, logContent, ...modalProps } = this.props
        const { max, copied } = this.state

        return (
            <Modal {...modalProps} className={styles.modal}>
                {/* <Spin spinning={loading}> */}

                {/* </Spin> */}

                <div className={`${styles.projectPanel} ${styles.logRoller} ${max ? styles.showMax : ''}`}>
                    <pre ref="perElement" className={styles.logContent}>
                        {logContent}
                    </pre>
                    <div className={`${styles.logControl} ${styles.logTopControl}`}>
                        <CopyToClipboard text={logContent} onCopy={this.onCopy}>
                            <Tooltip placement="bottom" title={copied ? '已复制' : '复制'}>
                                <Button type="ghost" icon="copy" />
                            </Tooltip>
                        </CopyToClipboard>
                        <Tooltip placement="bottom" title={max ? '退出全屏' : '全屏'}>
                            <Button type="ghost"
                                onClick={this.changeSize}
                                style={{ marginLeft: '20px' }}
                                icon={max ? 'fullscreen-exit' : 'fullscreen'}
                            />
                        </Tooltip>
                    </div>
                    <div className={styles.logControl}>
                        <Tooltip placement="left" title='回到顶部'>
                            <Button type="ghost" icon="caret-up" onClick={this.scrollToTop} />
                        </Tooltip>
                        {/* <Button type="ghost"
                            style={{ marginLeft: '20px' }}
                            icon="caret-down"
                            onClick={this.scrollToBottom}
                        /> */}
                    </div>
                </div>
            </Modal >
        )
    }
}

PreviewModal.propTypes = {
    logContent: PropTypes.object,
}

export default PreviewModal
