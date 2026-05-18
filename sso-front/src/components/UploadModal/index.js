import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Tooltip, Modal } from 'antd';
import styles from './index.less'
import PlaySvg from 'assets/upload/play.svg'
import PauseSvg from 'assets/upload/pause.svg'
import CrossSvg from 'assets/upload/cross.svg'
import FileSvg from 'assets/upload/white.svg'
import ZipSvg from 'assets/upload/zip.svg'
import PdfSvg from 'assets/upload/pdf.svg'
import WordSvg from 'assets/upload/word.svg'
import ExcelSvg from 'assets/upload/excel.svg'
import PptSvg from 'assets/upload/ppt.svg'
import VideoSvg from 'assets/upload/video.svg'
import TxtSvg from 'assets/upload/txt.svg'
import ImageSvg from 'assets/upload/jpg.svg'
import HtmlSvg from 'assets/upload/html.svg'

const fileSvg = {
  image: ImageSvg,
  video: VideoSvg,
  text: TxtSvg,
  zip: ZipSvg,
  pdf: PdfSvg,
  word: WordSvg,
  excel: ExcelSvg,
  ppt: PptSvg,
  html: HtmlSvg
}

const WebUploader = require('webuploader');

const currying = (fn, ...ahead) => (...behind) => fn(...ahead, ...behind);

class UploadModal extends PureComponent {

  // 根据 id 筛选出 file ，然后设置 file 的 key-value 值
  setFileItem = (key, value, id) => {
    const { onSetFileList, fileList } = this.props
    return new Promise((resolve) => {
      const copy = [...fileList];
      const result = copy.filter(item => item.id === id);
      if (result.length) {
        result[0][key] = value;
        onSetFileList(copy)
        resolve();
      }
    });
  }

  // 设置 file 的 uploadStatus 值
  setUploadStatus = currying(this.setFileItem, 'uploadStatus')

  /**
   * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
   * 可以指定开始某一个文件。
   */
  upload = (id) => {
    // console.log('upload >>>>>>', id);
    const { webUploader } = this.props;
    webUploader.upload(id);
  }

  /**
   * 重试上传，重试指定文件，或者从出错的文件开始重新上传。
   */
  retry = (id) => {
    // console.log('retry >>>>>>', id);
    const { webUploader } = this.props;
    webUploader.retry(webUploader.getFile(id));
    this.setUploadStatus('process', id);
  }

  /**
   * 暂停上传
   */
  pause = id => {
    // console.log('pause >>>>>>', id);
    const { fileList, webUploader } = this.props;
    const index = fileList.findIndex((item) => item.id === id);
    const currentFile = fileList[index];
    // console.log('pause currentFile >>>>>>', currentFile);
    // console.log('pause currentFile >>>>>>', webUploader.getFile(id));

    // 此处为第一个坑，在API里暂停是调用stop方法，此处想要暂停指定文件，显然应该用stop(file)方法，
    // 然而实践之后发现调用stop(file)方法会报错 “Cannot read property 'file' of undefined”,
    // 之后再点击继续发现无法继续上传，没有发出请求。
    // 后来经过各种尝试后采用了cancelFile方法，可以暂停并继续，但此方法会标记文件为已取消状态，可以再次手动选择添加进队列，从而不触发文件重复的error监听。
    // webUploader.stop(currentFile);
    webUploader.cancelFile(currentFile);

    // TODO 隐藏暂停icon，显示继续上传icon
    this.setUploadStatus('pause', id);
  }

  /**
   * 继续上传
   */
  resume = id => {
    // console.log('resume >>>>>>', id);
    const { fileList, webUploader } = this.props;
    const index = fileList.findIndex((item) => item.id === id);
    const currentFile = fileList[index];
    webUploader.upload(currentFile);

    // TODO 隐藏继续上传icon，显示暂停icon
  }

  /**
   * 取消上传
   * 移除某一文件
   */
  remove = (id) => {
    // console.log('remove >>>>>>', id);
    const { fileList, onSetFileList, webUploader } = this.props;
    const index = fileList.findIndex((item) => item.id === id);
    const currentFile = fileList[index];
    fileList.splice(index, 1);
    onSetFileList(fileList);

    console.log('webUploader:', webUploader);


    //移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 true 则会从 queue 中移除。
    webUploader.removeFile(webUploader.getFile(id, true));
  }

  fileCategory = (ext) => {
    let type = '';
    const typeMap = {
      image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
      video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
      text: ['txt', 'pages', 'epub', 'numbers', 'csv', 'keynote'],
      zip: ['rar', 'zip', 'tar', 'gzip', '7-zip'],
      pdf: ['pdf'],
      word: ['doc', 'docx'],
      excel: ['xls', 'xlsx'],
      ppt: ['ppt', 'pptx'],
      html: ['html']
    };
    Object.keys(typeMap).forEach((_type) => {
      const extensions = typeMap[_type];
      if (extensions.indexOf(ext) > -1) {
        type = _type
      }
    });
    return type
  }

  fileSize(size) {
    const { webUploader } = this.props;
    const formatSize = WebUploader.Base.formatSize(size);
    return formatSize;
  }


  onCancelClick = (e, fileList) => {
    e.preventDefault();
    const { onhandleCancelClick } = this.props;
    onhandleCancelClick(fileList);
  }

  renderFileList2(fileList) {
    // console.log('renderFileList22222 >>>>>>', fileList);

    const list = fileList.map((file) => {
      const { id, name, ext, size, percentage, uploadStatus } = file;
      const extType = this.fileCategory(ext.toLowerCase());

      const statusIcon = (uploadStatus, size) => {
        if (size > 0) {
          if (uploadStatus === 'init') {
            return '正在上传...';
          } else if (uploadStatus === 'process') {
            return percentage ? ((percentage * 100).toFixed(2) + '%') : '正在上传...';
          } else if (uploadStatus === 'done') {
            return <Icon type="check-circle" theme="filled" style={{ color: 'green' }} />
          } else if (uploadStatus === 'error') {
            return <Icon type="close-circle" theme="filled" />
          }
        } else if (size === 0) {
          return <span style={{ color: '#ff436a' }}> <Icon type="close-circle" theme="filled" /> 文件大小为空</span>
        }
      }

      return (
        <ul className={styles.fileItem} key={id}>
          <li className={styles.fileType}>
            <Icon className={styles.svg} component={extType ? fileSvg[extType] : FileSvg} />
          </li>
          <li className={styles.fileName}>
            <Tooltip placement="bottomLeft" title={name}>
              {name}
            </Tooltip>
          </li>
          <li className={styles.fileSize}>{this.fileSize(size)}</li>
          <li className={styles.fileStatus} style={uploadStatus === 'error' ? { color: 'red' } : {}}>
            {statusIcon(uploadStatus, size)}
          </li>
          {/* TODO */}
          {/* <li className={styles.fileOperate}>
                        <a title="开始" onClick={() => this.resume(id)}><Icon component={PauseSvg} /></a>
                        <a title="暂停" onClick={() => this.pause(id)}><Icon component={PlaySvg} /></a>
                        <a title="移除" onClick={() => this.remove(id)} ><Icon component={CrossSvg} /></a >
                    </li > */}
          <li className={styles.progress} style={{ width: `${percentage * 100}%` }}></li>
        </ul>
      )
    })

    return (
      <div className={styles.filePanel}>
        {/* <h2>文件列表</h2> */}
        <div className={styles.fileList}>
          {list}
          {fileList && fileList.length === 0 && <div className={styles.noFile}> 暂无待上传文件</div>}
        </div >
      </div >
    )
  }

  render() {
    const { fileList, ...modalProps } = this.props

    return (
      <Modal className={styles.modal} {...modalProps} onCancel={e => this.onCancelClick(e, fileList)}>
        {this.renderFileList2(fileList)}
      </Modal>
    )
  }
}

UploadModal.propTypes = {
  onOk: PropTypes.func,
  fileList: PropTypes.array,          // 正在上传的文件列表
}

export default UploadModal
