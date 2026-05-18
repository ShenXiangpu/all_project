import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Spin, Button, Tooltip, message, Icon } from 'antd'
import styles from './editorModal.less'
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import { Base64 } from 'js-base64';
import { Debounce } from 'lodash-decorators';

class FileEditorModal extends Component {
  state = {
    max: false,
    newFileContent: undefined,
  };

  componentDidUpdate(prevProps, prevState) {
    const { max } = this.state
    if (prevState.max !== max) {  // 全屏
      const editor = ace.edit("UNIQUE_ID_OF_DIV");
      editor.setAutoScrollEditorIntoView(!max)
      editor.resize();    // 在生命周期函数里才起作用
    }

    const fileContent = this.props.fileContent;
    const old_fileContent = prevProps.fileContent;
    if (fileContent && fileContent !== old_fileContent) {
      const content = Base64.decode(fileContent);
      console.log(Base64.decode('5L2g5aW9'));
      this.setState({
        newFileContent: content
      });
    }
  }

  changeSize = () => {
    const { max } = this.state
    this.setState({
      max: !max,
    })
  }

  onChange = (newValue) => {
    this.setState({
      newFileContent: newValue
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.newFileContent !== nextState.newFileContent) {
      return false
    } else {
      return true;
    }
  }

  @Debounce(1000)
  onEditFile = () => {
    const { newFileContent } = this.state;
    const { onEditorFile } = this.props;
    //保存文件操作
    const fileContent = newFileContent && Base64.encode(newFileContent)
    onEditorFile(fileContent);
  }

  render() {
    const { loading, editorModalType, saveBtnLoading, ...modalProps } = this.props
    const { max, newFileContent } = this.state;

    return (
      <Modal {...modalProps} className={styles.modal}>
        <div className={`${styles.logRoller} ${max ? styles.showMax : ''}`}>
          <AceEditor
            mode="javascript"
            theme="github"
            value={loading ? 'loading...' : newFileContent}
            width="100%"
            style={{ borderTop: '1px solid #ccc' }}
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            showGutter
            highlightActiveLine  //突出活动线
            enableSnippets  //启用代码段
            showPrintMargin={false}
            readOnly={editorModalType === 'preview'}
            // keyboardHandler='vim'
            commands={[{    //命令是键绑定数组。
              name: 'saveFile', //键绑定的名称。
              bindKey: { win: 'Ctrl-S', mac: 'Command-S' }, //用于命令的组合键。
              exec: () => this.onEditFile()
            }]}
            setOptions={{
              showLineNumbers: true,
              autoScrollEditorIntoView: true,
              // readOnly:true
            }}
          />

          <div className={`${styles.logControl} ${styles.logTopControl}`}>
            {editorModalType === 'edit' &&
              <Button type="primary" loading={saveBtnLoading} onClick={this.onEditFile}><Icon type="save" />保存</Button>
            }

            <Tooltip placement="bottom" title={max ? '退出全屏' : '全屏'}>
              <Button type="dash"
                onClick={this.changeSize}
                style={{ marginLeft: 10 }}
                icon={max ? 'fullscreen-exit' : 'fullscreen'}
              />
            </Tooltip>
          </div>
          {/* <div className={styles.logControl}>
                        <Tooltip placement="left" title='回到顶部'>
                            <Button type="ghost" icon="caret-up" onClick={this.scrollToTop} />
                        </Tooltip>
                        <Button type="ghost"
                            style={{ marginLeft: '20px' }}
                            icon="caret-down"
                            onClick={this.scrollToBottom}
                        />
                    </div> */}
        </div>
      </Modal >
    )
  }
}

export default FileEditorModal
