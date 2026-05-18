import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon, Input, Button, message } from 'antd'
import styles from './filesList.less'
import DropOption from 'components/DropOption'
import FolderSvg from 'assets/folder.svg'
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
import isEqual from 'lodash.isequal';
import moment from "moment";
const { confirm } = Modal

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

class FilesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tbloading: false,
      currentItem: undefined,
      dataSource: props.dataSource,
      currentNode: undefined
    };
    this.textInput = React.createRef();
    this.tip = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.dataSource, preState.dataSource)) {
      return null;
    }

    return {
      dataSource: nextProps.dataSource,
    };
  }

  componentDidMount() {
    // console.log(this.tip);
  }

  handleMenuClick = (record, e) => {
    const { onDeleteItem,
      onMoveItem,
      onCopyItem,
      rowSelection: { selectedRowKeys },
      onShowFile,
      onDownloadFile,
      onUnZip,
      onUnZipToCustom,
      onMoveShow,
      projectId
    } = this.props

    if (e.key === 'delete') {
      confirm({
        title: '确定删除所选文件/文件夹吗?',
        onOk() {
          const data =
            [{
              id: record.id,
              dir:record.dir,
            }];
          onDeleteItem(data)
        },
      })
    } else if (e.key === 'move') { // 移动
      const values = {
        fileName: record.fileName,
      }
      // onMoveItem(values, selectedRowKeys)
      onMoveItem(record)
    } else if (e.key === 'copy') {  // 复制
      onCopyItem(record)
    } else if (!record.dir && e.key === 'open') {
      const data = {
        id: record.id,
        fileName: record.fileName
      }
      onShowFile(data)
    } else if (e.key === 'download') {
      const arr = [];
      arr.push(record.id);
      const data = {
        fileId: arr
      }
      onDownloadFile(data);
    } else if (e.key === 'unzipToZipName') {
      const data = {
        dir: false,
        id: record.id,
        fileName: record.fileName,
      }
      onUnZip(data, 'unzipToZipName')
    } else if (e.key === 'unzipToCurrent') {
      const data = {
        dir: false,
        id: record.id,
        fileName: record.fileName,
      }
      onUnZip(data, 'unzipToCurrent')
    } else if (e.key === 'unzipToCustom') {
      let zipName = undefined;
      const fileName = record.fileName;
      const index = fileName.lastIndexOf('.');
      zipName = fileName.slice(0, index);

      const data = {
        zipName: zipName,
        file: {
          dir: false,
          id: record.id,
          fileName: record.fileName,
        }
      }

      onUnZipToCustom(data);
    }
    // else if (e.key === 'move') {
    //   const data = {
    //     id: record.id,
    //     fileName: record.dir ? record.pathName : record.fileName,
    //     isDir: Number(record.dir),
    //   }
    //   onMoveShow(record);
    // }
  }

  getRowByKey(key, newData) {
    const { dataSource = [] } = this.props;
    return dataSource.filter(item => item.key === key)[0];
  }

  handleFieldChange(e, fieldName, key) {
    const { dataSource = [], onSetState } = this.props;
    const newData = [...dataSource];
    const target = this.getRowByKey(key, newData);



    if (target) {
      target[fieldName] = (e.target && e.target.value) || e;
      onSetState('data', newData)
    }
  }

  onFocus = () => {
    // console.log(this.textInput);  // ? 如何自动聚焦并选中
    // if (this.textInput.current) {
    //     this.textInput.current.select();  // 文字全选
    // }
  }

  onCancelClick = () => {  // 取消新增文件夹
    const { newFolderKey, dataSource = [], onSetState } = this.props;
    const newData = dataSource.filter(item => item.key !== newFolderKey);
    onSetState('data', newData)
    onSetState('createFolderBtnClicked', false)
  }

  onSaveClick(e, key) {
    e.persist();
    this.setState({
      tbloading: true,
    });
    setTimeout(() => {
      const target = this.getRowByKey(key) || {};

      if (!target.fileName) {
        message.error('文件夹名称不能为空, 请输入文件夹名称.');
        e.target.focus();
        this.setState({
          tbloading: false,
        });
        return;
      }

      const { onAddFolder } = this.props;
      const values = {
        pathInfo: target.fileName
      }
      onAddFolder(values)

      // 添加成功后,再删除,设置loading
      delete target.isNew;
      // delete target.dir;
      this.setState({
        tbloading: false,
      });
    }, 500);
  }

  handleDoubleClick = (event, record) => { // 行双击
    const { onFolderClick } = this.props
    if (record.dir) { // 如果是文件夹，双击，查看内部文件列表
      onFolderClick(record.path)
    }
  }

  handleContextMenu = (event, record) => { // TODO 行右键点击，弹出目录框（复制到、移动到、删除）
    // 阻止冒泡
    event.preventDefault()  // 组织浏览器页面原生右键目录框弹出

    //阻止父级右键目录框弹出
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    const { onSetState } = this.props
    onSetState('visible', false)
    this.onCancelClick()  // 如果正在新建文件夹，取消

    onSetState('tableRightTipVisible', true)
    this.setState({ currentItem: record })

    console.log('右键：', this.tip);


    // if (this.tip.current) {
    //     // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
    //     const clickX = event.clientX
    //     const clickY = event.clientY
    //     // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
    //     const screenW = window.innerWidth
    //     const screenH = window.innerHeight
    //     // 获取自定义菜单的宽度/高度
    //     const tipW = this.tip.current.offsetWidth
    //     const tipH = this.tip.current.offsetHeight

    //     // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
    //     // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
    //     const right = (screenW - clickX) > tipW
    //     const left = !right
    //     const bottom = (screenH - clickY) > tipH
    //     const top = !bottom

    //     if (right) {
    //         this.tip.current.style.left = `${clickX}px`
    //     }

    //     if (left) {
    //         this.tip.current.style.left = `${clickX - tipW}px`
    //     }

    //     if (bottom) {
    //         this.tip.current.style.top = `${clickY}px`
    //     }
    //     if (top) {
    //         this.tip.current.style.top = `${clickY - tipH}px`
    //     }
    // }
  }

  handleMouseEnter = (event, record) => {
    event.persist();

    const tdNode = event.target;
    const trNode = tdNode.parentNode; // 找到父节点<tr>
    trNode.style.backgroundColor = '#e6f7ff'; //设置背景色，防止鼠标在选择操作选项时背景色消失

    // 通过添加 字段 实现  record.operation
    const { dataSource } = this.state;
    const arr = [];
    dataSource.map(item => {
      if (item.fileName === record.fileName) {
        item.operation = true
      }
      arr.push(item)
    })
    this.setState({
      dataSource: arr,
      currentNode: trNode
    })
  }

  handleMouseLeave = (event, record) => {
    event.persist();
    const { dataSource, currentNode } = this.state;

    const node = event.target;

    // 找到父节点<tr>
    if ((node.nodeName).toUpperCase() === 'TD') {
      const trNode = node.parentNode;
      trNode.style.backgroundColor = 'unset';
    } else if (currentNode) {
      currentNode.style.backgroundColor = 'unset';
    }

    const arr = [];
    dataSource.map(item => {
      if (item.fileName === record.fileName) {
        item.operation = false
      }
      arr.push(item)
    })
    this.setState({
      dataSource: arr,
      currentNode: undefined
    })
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

  render() {
    const { onFolderClick, loading, tableRightTipVisible, createFolderBtnClicked, selectedRowKeys, ...tableProps } = this.props
    const { tbloading, dataSource } = this.state;

    const columns = [
      {
        // title: selectedRowKeys.length > 0 ? `已选中${selectedRowKeys.length}个文件/文件夹` : '文件名',
        title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName',
        render: (text, record) => {
          if (record.isNew)
            return (
              <div className={styles.file}><Icon className={styles.svg} component={FolderSvg} />
                <div className={styles.fileText}>
                  <Input
                    // value={text}
                    autoFocus
                    onFocus={this.onFocus}
                    ref={this.textInput}
                    style={{ width: '200px' }}
                    onChange={e => this.handleFieldChange(e, 'fileName', record.key)}
                    placeholder="新建文件夹"
                  />
                  <Button size="small" icon="check" onClick={e => this.onSaveClick(e, record.key)} />
                  <Button size="small" icon="close" onClick={() => this.onCancelClick()} />
                </div>
              </div>
            )

          if (record.dir) {
            return (
              <div className={styles.file}><Icon className={styles.svg} component={FolderSvg} />
                <div className={styles.fileText}><a href="#" onClick={e => onFolderClick(record.path, e)}>{record.fileName}</a></div>
              </div>
            )
          } else {
            // 判断文件类型，判断是否为压缩包类型
            const index = text.lastIndexOf("."); //获取最后一个.的位置
            const ext = (text.substr(index + 1)).toLowerCase();  //获取后缀
            const extType = this.fileCategory(ext);

            return (
              <div className={styles.file}>
                <Icon className={styles.svg} component={extType ? fileSvg[extType] : FileSvg} />
                <div className={styles.fileText}>{record.fileName}</div>
              </div>
            )
          }
        }
      },
      {
        title: '',
        key: 'operation',
        width: 120,
        render: (text, record) => {
          if (!createFolderBtnClicked && record.operation) {
            const arr = [];
            // if (!record.dir) {
            //   arr.push({ key: 'open', name: '打开' });
            // }

            if (record.canDownload) {
              arr.push({ key: 'download', name: '下载' })
            }

            if (record.canUnzip) {
              // arr.push({ key: 'unzipToCustom', name: '解压文件到...' })
              arr.push({ key: 'unzipToCurrent', name: '解压到当前文件夹' })

              let zipName = undefined;
              const fileName = record.fileName;
              const index = fileName.lastIndexOf('.');
              zipName = fileName.slice(0, index);
              arr.push({ key: 'unzipToZipName', name: '解压到 ' + zipName })
            }

            if (record.canMove) {
              arr.push({ key: 'move', name: '移动' })
            }

            if (record.canDeleted) {
              arr.push({ key: 'delete', name: '删除' })
            }

            if (arr && arr.length > 0) {
              return (
                <DropOption
                  buttonStyle={{ height: 'unset' }}
                  getPopupContainer={() => document.getElementById('tableArea')}
                  onMenuClick={e => this.handleMenuClick(record, e)}
                  menuOptions={arr}
                />
              )
            }
          }
          return null;
        },
      },
      {
        title: '大小',
        dataIndex: 'fileSize',
        key: 'fileSize',
        width: 200,
        render: text => text && !isEqual(text, '0') ? text : '-'
      },
      {
        title: '修改时间',
        width: 200,
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
      }
    ]

    return (
      <div id="tableArea">
        <Table
          {...tableProps}
          dataSource={dataSource}
          loading={loading || tbloading}
          className={styles.table}
          columns={columns}
          simple
          rowKey={record => record.id || record.key}
          onRow={record => {  // 设置行属性e
            return {
              onDoubleClick: event => this.handleDoubleClick(event, record), // 鼠标双击
              // onContextMenu: event => this.handleContextMenu(event, record), // 鼠标右键
              onMouseEnter: event => this.handleMouseEnter(event, record),  // 鼠标移入行
              onMouseLeave: event => this.handleMouseLeave(event, record),  // 鼠标移出行
            };
          }}
        />
      </div>
    )
  }
}

FilesList.propTypes = {
  onDeleteItem: PropTypes.func,
  onMoveItem: PropTypes.func,
  onCopyItem: PropTypes.func,
  location: PropTypes.object,
}

export default FilesList
