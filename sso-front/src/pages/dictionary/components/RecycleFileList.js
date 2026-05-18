import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Popconfirm, Icon } from 'antd'
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
import styles from './filesList.less'

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

class RecycleFileList extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRows: []
  };

  componentDidUpdate(preProps) {
    const { isEmptyRecycle, resetEmptyRecycleState } = this.props;
    const { isEmptyRecycle: old_isEmptyRecycle } = preProps;
    if (isEmptyRecycle && !isEqual(isEmptyRecycle, old_isEmptyRecycle)) {
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      })
      resetEmptyRecycleState();
    }
  }

  handleResumeClick = (record, e) => {
    const { onResumeItem } = this.props
    const { selectedRowKeys, selectedRows } = this.state;
    const values = [{
      id: record.id,
      isDir: Number(record.dir)
    }]
    onResumeItem(values);
    this.arrRemove(record.id, selectedRowKeys);
    this.arrRemoveJson(selectedRows, 'id', record.id);
  }

  handleDeleteClick = (record, e) => {
    const { onDeleteItem } = this.props
    const { selectedRowKeys, selectedRows } = this.state;
    const values = [{
      id: record.id,
      isDir: Number(record.dir)
    }]
    onDeleteItem(values);
    this.arrRemove(record.id, selectedRowKeys);
    this.arrRemoveJson(selectedRows, 'id', record.id);
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

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  handleMultiResumeClick = () => {
    const { onResumeItem } = this.props;
    const { selectedRows } = this.state;
    const arr = [];
    selectedRows.map(item => {
      const data = {
        id: item.id,
        isDir: Number(item.dir)
      }
      arr.push(data);
    })
    if (arr.length > 0) {
      onResumeItem(arr);
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      })
    }
  }

  arrRemoveJson = (arr, attr, value) => {
    if (!arr || arr.length == 0) {
      return ""
    }
    let newArr = arr.filter(function (item, index) {
      return item[attr] != value
    })
    return newArr
  }

  arrRemove = (it, arr) => {
    if (!arr || arr.length == 0) {
      return ""
    }
    let flag = arr.indexOf(it)
    if (flag > -1) {
      arr.splice(flag, 1)
      return arr
    } else {
      console.log("未查找到该元素")
    }
  }

  render() {
    const { onDeleteItem, ...tableProps } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys && selectedRowKeys.length > 0;
    const columns = [
      {
        title: hasSelected ?
          <span>已选中{selectedRowKeys.length}个文件/文件夹
            <a href="#" style={{ marginLeft: 15 }} onClick={this.handleMultiResumeClick} title="还原">
              <Icon type="undo" /> 还原
            </a>
          </span> : '文件名',
        // title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName',
        width: 180,
        ellipsis: true,
        render: (text, record) => {
          if (record.dir) {
            return (
              <div className={styles.file}><Icon className={styles.svg} component={FolderSvg} />
                <div className={styles.fileText} title={record.pathName}>{record.pathName}</div>
              </div>
            )
          } else {
            // 判断文件类型，判断是否为压缩包类型
            const index = text && text.lastIndexOf("."); //获取最后一个.的位置
            const ext = text && (text.substr(index + 1)).toLowerCase();  //获取后缀
            const extType = this.fileCategory(ext);

            return (
              <div className={styles.file}>
                <Icon className={styles.svg} component={extType ? fileSvg[extType] : FileSvg} />
                <div className={styles.fileText} title={record.fileName}>{record.fileName}</div>
              </div>
            )
          }
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 110,
        render: text => <span style={{ fontSize: 12, color: '#afb3bf' }}>{text}</span>
      },
      {
        title: '操作',
        key: 'operation',
        width: 110,
        render: (text, record) => {
          return (
            <div style={{ fontSize: 12 }}>
              <a href="#" onClick={e => this.handleResumeClick(record, e)}>
                <Icon type="undo" /> 还原
              </a>
              <Divider type="vertical" />
              <Popconfirm
                placement="bottomRight"
                title="文件删除后将无法恢复，您确认要彻底删除所选文件吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={e => this.handleDeleteClick(record, e)}
              >
                <a href="#" ><Icon type="delete" /> 删除</a>
              </Popconfirm>
            </div>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        rowSelection={rowSelection}
        pagination={false}
        size="small"
        bordered={false}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

RecycleFileList.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default RecycleFileList
