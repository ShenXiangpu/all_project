import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { Button, Breadcrumb, Icon, Divider, Modal, Drawer, message, Progress } from 'antd'
import Page from '../../components/Page'
import Filter from './components/Filter'
import FilesList from './components/FilesList'
import TreeModal from './components/TreeModal'
import FileUpload from 'components/FileUpload'
import FileEditorModal from 'components/FileEditorModal'
import RecycleFileList from './components/RecycleFileList'
import DownFileModal from './components/DownFileModal'
import ZipModal from './components/ZipModal'
import UnZipModal from './components/UnZipModal'
import styles from './style.less';
import AddFolderSvg from '../../assets/add-folder.svg'
import isEqual from 'lodash.isequal';
import { isEmpty, values } from 'lodash'
import recycleBinSvg from 'assets/recycleBin.svg'
import debounce from 'lodash/debounce'
import BuyResultModal from './components/BuyResultModal'
import { wsConnect, wsInit, wsClose } from 'services/api'

const { confirm } = Modal

const NEW_FOLDER_KEY = 'NEW_TEMP_KEY';         // 新建文件夹时，临时的key值
const ROOT_DIR = '/';                      // 文档结构根路径

@connect(({ app, dictionary, loading }) => ({ app, dictionary, loading }))
class Dictionary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},     // 查询条件
      data: this.props.dictionary.list,
      createFolderBtnClicked: false,  // "新建文件夹"按钮是否点击,如果点击了,不可选择复选框,没有列表行悬浮事件等操作
      visible: false,  //右键目录框
      tableRightTipVisible: false, // 列表行，鼠标右键目录框
      drawerVisible: false,
      zipModalVisible: false,
      unZipModalVisible: false,
      unZipFile: {},
      single: false,        // 是否只操作单条数据，如移动、赋值等，通过点击列表中的操作菜单进入的
      isEmptyRecycle: false,  // 是否已经清空回收站

      buyResultMdlVisible: false,  //扩容窗口
    };
    this.root = React.createRef();
    this.uploader = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.dictionary.list, preState.data)) {
      return null;
    }

    return {
      data: preState.data,
    };
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  componentDidMount() {
    // 添加右键点击、点击事件监听
    // document.addEventListener('contextmenu', this.handleContextMenu)
    document.addEventListener('click', this.handleClick)

    if (this.uploader.current) {
      this.uploader.current.setAttribute('webkitdirectory', '');
      // this.uploader.current.setAttribute('directory', '');
      this.uploader.current.setAttribute('multiple', '');
    }

    this.handleRefresh();
  }

  componentDidUpdate(preProps) {
    const { list: old_list } = preProps.dictionary;
    const { list } = this.props.dictionary;
    if (list && !isEqual(old_list, list)) {
      this.setState({
        data: list
      })
    }

    const { isDataRefresh: old_isDataRefresh } = preProps.app;
    const { isDataRefresh } = this.props.app;
    if (isDataRefresh && !isEqual(isDataRefresh, old_isDataRefresh)) {
      this.handleRefresh();
    }
  }

  handleRefresh = () => {
    const { location, dispatch } = this.props

    const payload = isEmpty(location.query) ? {
      currentPath: '/'
    } : location.query;

    dispatch({
      type: 'dictionary/query',
      payload: payload,
    })

    const payload2 = isEmpty(location.query) ? {
      path: '/'
    } : {
      path: location.query.currentPath
    }
    dispatch({
      type: 'dictionary/checkStorage',
      payload: payload2,
    })
  }

  componentWillUnmount() {
    // 移除事件监听
    document.removeEventListener('contextmenu', this.handleContextMenu)
    document.removeEventListener('click', this.handleClick)
  }

  // 右键菜单事件
  handleContextMenu = (event) => {
    event.preventDefault()

    // 如果正在新增文件夹，点击右键后，取消新增
    const { createFolderBtnClicked, data = [] } = this.state
    if (createFolderBtnClicked) {
      const newData = data.filter(item => item.key !== NEW_FOLDER_KEY);
      this.setState({
        data: newData,
      });
    }

    this.setState({
      createFolderBtnClicked: false,  // 如果此时正在新建，取消
      visible: true,                  // 显示右键目录框
      tableRightTipVisible: false     // 隐藏列表的右键目录框
    })

    // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
    const clickX = event.clientX
    const clickY = event.clientY
    // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    // 获取自定义菜单的宽度/高度
    const rootW = this.root.current.offsetWidth
    const rootH = this.root.current.offsetHeight

    // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
    // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
    const right = (screenW - clickX) > rootW
    const left = !right
    const bottom = (screenH - clickY) > rootH
    const top = !bottom

    if (right) {
      this.root.current.style.left = `${clickX}px`
    }

    if (left) {
      this.root.current.style.left = `${clickX - rootW}px`
    }

    if (bottom) {
      this.root.current.style.top = `${clickY}px`
    }
    if (top) {
      this.root.current.style.top = `${clickY - rootH}px`
    }
  };

  // 鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示
  handleClick = () => {
    const { visible, tableRightTipVisible } = this.state
    if (visible) {
      this.setState({ visible: false })
    }

    if (tableRightTipVisible) {
      this.setState({ tableRightTipVisible: false })
    }
  };

  get filterProps() {
    const { formValues } = this.state
    const { location, dispatch, dictionary } = this.props
    const { storage, isShowText, currentPath } = dictionary

    return {
      storage,
      isShowText,
      currentPath,
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'dictionary/query',
          payload: values
        })
      },
      onBuyCapacity: () => {
        // 扩容结果确认窗口
        this.setState({ buyResultMdlVisible: true })

        // 跳转至扩容页面
        window.open('/dictionary/buyCapacity', '_blank');
      },
      handleRecycleBinClick: () => {
        this.handleRecycleBinClick()
      }
    }
  }

  onBuyCapacity =  () => {
    // 扩容结果确认窗口
    this.setState({ buyResultMdlVisible: true })

    // 跳转至扩容页面
    window.open('/dictionary/buyCapacity', '_blank');
  }

  handleQuery = (path) => {
    const { dispatch, location, dictionary: { currentPath } } = this.props
    const { query, pathname } = location
    const { formValues } = this.state;
    console.log('path', path);
    dispatch({
      type: 'dictionary/query',
      payload: {
        ...formValues,
        currentPath: isEmpty(path) ? currentPath : path
      }
    })

    dispatch({
      type: 'dictionary/checkStorage',
      payload: { path: isEmpty(path) ? currentPath : path },
    })

    router.push({
      pathname,
      search: stringify(
        {
          ...query,
          currentPath: isEmpty(path) ? currentPath : path
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  get filesListProps() {
    const { dispatch, dictionary, loading } = this.props
    const { list, selectedRowKeys, currentPath } = dictionary
    const { data, createFolderBtnClicked, tableRightTipVisible } = this.state

    return {
      selectedRowKeys,
      createFolderBtnClicked,
      dataSource: data,
      pagination: false,
      loading: loading.effects['dictionary/query'] || loading.effects['dictionary/addFolder'],
      newFolderKey: NEW_FOLDER_KEY,
      tableRightTipVisible,
      onFolderClick: (folderPath) => {
        if (folderPath === '') {
          folderPath = "/"
        }
        console.log("folderPath", folderPath);
        this.handleQuery(folderPath)
      },
      onSetState: (field, value) => {
        this.setStateValue(field, value)
      },
      onAddFolder: values => {
        dispatch({
          type: 'dictionary/addFolder',
          payload: {
            currentPath,
            ...values
          },
        }).then(() => {
          this.setState({ createFolderBtnClicked: false })
        })
      },
      onDeleteItem: (data) => {
        dispatch({
          type: 'dictionary/delete',
          payload: data,
        }).then(() => {
          this.handleQuery()
        })
      },
      onMoveItem: (item) => {
        dispatch({
          type: 'dictionary/showTreeModal',
          payload: {
            treeModalType: 'move',
            currentItem: item,
          },
        })

        this.setState({ single: true });
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (keys, records) => {
          dispatch({
            type: 'dictionary/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
        getCheckboxProps: () => ({ disabled: createFolderBtnClicked })
      },
      onShowFile: values => {
        dispatch({
          type: 'app/getFileContent',
          payload: {
            fileId: values.id,
          }
        }).then(() => {
          dispatch({
            type: 'app/showFileEditorModal',
            payload: {
              editorModalType: 'edit',
              fileName: values.fileName,
              fileId: values.id
            }
          })
        })
      },
      onDownloadFile: value => {
        dispatch({
          type: 'dictionary/updateState',
          payload: {
            downModalVisible: true,
          }
        })
        dispatch({
          type: 'dictionary/download',
          payload: value
        })
      },
      onUnZip: (values, key) => {
        values.filePath = currentPath;
        const arr = [];
        arr.push(values);

        let unzipPath = undefined;
        if (isEqual(key, 'unzipToZipName')) {
          unzipPath = ''
        } else if (isEqual(key, 'unzipToCurrent')) {
          unzipPath = currentPath;
        }

        dispatch({
          type: 'dictionary/unZipFile',
          payload: {
            unzipPath,
            file: arr
          }
        }).then(() => {
          this.handleRefresh();
        })
      },
      onUnZipToCustom: data => {
        const values = data.file;
        values.filePath = currentPath;
        const arr = [];
        arr.push(values);
        const unzipPath = currentPath + '/' + data.zipName;

        this.setState({
          unZipFile: {
            unzipPath,
            file: arr
          },
          unZipModalVisible: true
        });
      },
    }
  }

  handleUploadClick = e => {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch({
      type: 'dictionary/showModal',
      payload: {},
    })
  }

  get uploaderProps() {
    const { dispatch, dictionary, loading, app } = this.props
    const { currentPath } = dictionary
    const { fileList } = app

    return {
      dispatch,
      beforeFileQueued: (file) => {
        console.log('beforeFileQueued');
        // if (file.size === 0) {
        //   Modal.error({
        //     title: '不能上传空文件',
        //   });
        //   return false;
        // }
        // return true;
      },
      fileList,
      uploadUrl: '/service/datamanage-service/v1/datamanage/uploadBigFile',
      rootPath: currentPath,
      onChange: (file, list) => {
        console.log('Modal onChange >>>> ', file, list)

      },
      onShowModal: (value) => {
        dispatch({
          type: 'app/showUploadModal',
          payload: {
            webUploader: value
          },
        })
      },
      onSetFileList: (value) => {
        dispatch({
          type: 'app/updateState',
          payload: {
            fileList: value
          },
        })
      },
      refreshList: () => {
        this.handleQuery();
      }
    }
  }

  get treeModalProps() {
    const { dispatch, dictionary } = this.props;
    const { treeModalType, treeModalVisible, selectedRowKeys, folderList } = dictionary;

    return {
      rootKey: ROOT_DIR,
      folderList,
      visible: treeModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: treeModalType === 'move' ? '移动到' : '复制到',
      centered: true,
      footer:
        [
          // <Button key="new" style={{ float: 'left', color: '#40a9ff', borderColor: '#40a9ff' }} onClick={this.handleModalCreateFolder}>
          //   <Icon component={AddFolderSvg} />新建文件夹
          //           </Button>,
          <Button key="cancel" onClick={this.handleCancelClick}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={e => this.onMoveOrCopyClick(e, treeModalType)}>
            确定
          </Button>,
        ],
      onCancel: () => {
        dispatch({
          type: 'dictionary/hideTreeModal',
          payload: {},
        })

        this.setState({ single: false })
      },
      onLoadFolderList: value => {
        dispatch({
          type: 'dictionary/queryFolderList',
          payload: {
            currentPath: value,
            listDir: true
          },
        })
      },
      onSelectFolder: value => {
        dispatch({
          type: 'dictionary/updateState',
          payload: {
            currentSelectFolder: value
          },
        })
      }
    }
  }

  onMoveOrCopyClick = (e, treeModalType) => {
    const { dispatch, dictionary } = this.props
    const { currentSelectFolder, selectedRowKeys, list, currentPath, currentItem } = dictionary
    const { single } = this.state;

    if (isEqual(treeModalType, 'move')) { // 移动
      const arr = [];
      if (single) {
        const newItem = {
          fileName: currentItem.dir ? currentItem.pathName : currentItem.fileName,
          fileId: currentItem.id,
          isDir: Number(currentItem.dir),
          targetPath: currentSelectFolder.key,  // 目标文件夹地址
          targetId: currentSelectFolder.id,     // 目标文件夹ID
          path: currentPath                     // 需要移动的文件/文件夹的当前地址
        }
        arr.push(newItem);
      } else {
        selectedRowKeys.map(key => {
          return list.map(item => {
            if (key === item.id) {
              const newItem = {
                fileName: item.dir ? item.pathName : item.fileName,
                fileId: item.id,
                isDir: Number(item.dir),
                targetPath: currentSelectFolder.key,  // 目标文件夹地址
                targetId: currentSelectFolder.id,     // 目标文件夹ID
                path: currentPath                     // 需要移动的文件/文件夹的当前地址
              }
              arr.push(newItem);
            }
            return arr;
          })
        })
      }

      // 移动数据
      dispatch({
        type: 'dictionary/moveFiles',
        payload: {
          fileId: arr
        },
      }).then(() => {
        this.handleQuery();
      })
    } else if (isEqual(treeModalType, 'copy')) { // 复制

      const arr = [];
      if (single) {
        const newItem = {
          fileName: currentItem.dir ? currentItem.pathName : currentItem.fileName,
          id: currentItem.id,
          dir: currentItem.dir,
          filePath: currentPath                     // 需要复制的文件/文件夹的当前路径
        }
        arr.push(newItem);
      } else {
        selectedRowKeys.map(key => {
          return list.map(item => {
            if (key === item.id) {
              const newItem = {
                fileName: item.dir ? item.pathName : item.fileName,
                id: item.id,
                dir: item.dir,
                filePath: currentPath                     // 需要复制的文件/文件夹的当前路径
              }
              arr.push(newItem);
            }
            return arr;
          })
        })
      }

      // 复制数据
      dispatch({
        type: 'dictionary/copyFiles',
        payload: {
          fileList: arr,
          copyPath: currentSelectFolder.key
        },
      }).then(() => {
        this.handleQuery();
        this.setState({ single: false })
      })

    }
  }

  handleModalCreateFolder = () => {
    const { dictionary } = this.props
    const { currentSelectFolder } = dictionary

    // TODO

  }

  handleCancelClick = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'dictionary/hideTreeModal',
      payload: {},
    })

    dispatch({
      type: 'dictionary/updateState',
      payload: {
        currentSelectFolder: {}
      },
    })
  }

  cdForder = (key) => {
    let path = key;
    if (key.length > 2) {
      path = key.slice(0, key.length - 1);
    }
    this.handleQuery(path)
  }

  handleAddClick = e => {
    e.preventDefault();

    const { dispatch } = this.props
    const { data = [] } = this.state

    this.setState({ createFolderBtnClicked: true })

    const newItems = data.filter(item => item.isNew === true)
    if (newItems.length > 0) {  // 控制每次只能添加一个,新增的时候focus到当前的新增项上
      // this.textInput.current.focus();
    } else {
      const newData = data.map(item => ({ ...item }));
      newData.unshift({
        key: NEW_FOLDER_KEY,
        fileName: '新建文件夹',
        isNew: true,
        dir: true
      });
      this.setState({
        data: newData,
      });

      // 新建文件夹时，取消选中列表数据，阻止其他操作，例如移动、复制等
      dispatch({
        type: 'dictionary/updateState',
        payload: {
          selectedRowKeys: [],
        },
      })
    }
  }

  handleMultiDeleteClick = () => {
    const { dispatch, dictionary } = this.props;
    const { selectedRowKeys, list } = dictionary;

    const arr = [];
    selectedRowKeys.map(key => {
      return list.map(item => {
        if (key === item.id) {
          const newItem = {
            id: item.id,
            isDir: Number(item.dir)
          }
          arr.push(newItem);
        }
        return arr;
      })
    })

    let that = this
    confirm({
      title: '确定删除所选文件/文件夹吗？',
      content: '删除的文件可在 2天 内通过回收站还原',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'dictionary/delete',
          payload: arr
        }).then(() => {
          that.handleQuery()
        })
      },
    })
  }



  openTreeModal = (type) => {
    const { dispatch } = this.props
    dispatch({
      type: 'dictionary/queryFolderList',
      payload: {
        currentPath: ROOT_DIR,
        listDir: true
      },
    }).then(() => {
      dispatch({
        type: 'dictionary/showTreeModal',
        payload: {
          treeModalType: type,
        },
      })
    })
  }

  handleMoveClick = () => {
    this.openTreeModal('move')
  }

  handleCopyClick = () => {
    this.openTreeModal('copy')
  }

  inputfile = (e) => {
    console.log(e.target.files);
  }

  get editorModalProps() {
    const { dispatch, app, loading } = this.props;
    const { editorVisible, fileContent, editorModalType, fileName, fileId } = app;
    return {
      fileContent,
      editorModalType,
      loading: loading.effects['app/getFileContent'],
      saveBtnLoading: loading.effects['app/editFileContent'],
      visible: editorVisible,
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: editorModalType === 'edit' ? `查看：${fileName}` : `预览：${fileName}`,
      centered: true,
      footer: null,
      onEditorFile: value => {
        dispatch({
          type: 'app/editFileContent',
          payload: {
            fileContent: value,
            fileId
          }
        })
      },
      onCancel() {
        dispatch({
          type: 'app/hideFileEditorModal',
          payload: {
            fileContent: undefined,
            fileName: undefined,
            fileId: undefined
          }
        })
      },
    }
  }

  handleRecycleBinClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/queryRecycleFileList',
      payload: {
        currentPath: '/'
      }
    }).then(() => {
      this.setState({
        drawerVisible: true,
      });
    })
  }

  onClose = () => {
    const { dispatch } = this.props;

    this.setState({
      drawerVisible: false,
    });

    dispatch({
      type: 'dictionary/checkStorage',
      payload: {},
    })
  };

  get recycleProps() {
    const { dispatch, dictionary, loading } = this.props;
    const { recycleFileList } = dictionary;
    const { isEmptyRecycle } = this.state;

    return {
      dataSource: recycleFileList,
      isEmptyRecycle,
      loading: loading.effects['dictionary/queryRecycleFileList'],
      onResumeItem: values => { // 还原
        dispatch({
          type: 'dictionary/resume',
          payload: values,
        }).then(() => {
          dispatch({
            type: 'dictionary/queryRecycleFileList',
            payload: {
              currentPath: '/'
            }
          })

          this.handleQuery();
        })
      },
      onDeleteItem: debounce(values => { // 彻底删除
        dispatch({
          type: 'dictionary/deeplyDelete',
          payload: values,
        }).then(() => {
          dispatch({
            type: 'dictionary/queryRecycleFileList',
            payload: {
              currentPath: '/'
            }
          })
        })
      }, 1000),
      resetEmptyRecycleState: () => {
        this.setState({ isEmptyRecycle: false });
      }
    }
  }

  handleDownloadClick = () => {
    const { dispatch, dictionary } = this.props;
    const { selectedRowKeys, list } = dictionary;

    const arr = [];
    let isIncludeFolders = false;
    selectedRowKeys.map(key => {
      return list.map(item => {
        if (key === item.id) {
          if (item.dir && !item.canDownload) {
            isIncludeFolders = true;
          } else if (item.canDownload) {
            arr.push(item.id);
          }
        }
        return arr;
      })
    })

    let content = '';
    if (isIncludeFolders) {
      content = '选择的文件中包含文件夹，文件夹不能直接被下载，是否下载除文件夹以外的其他文件？'
    }

    confirm({
      title: '下载文件',
      content: content,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        if (arr && arr.length > 0) {
          dispatch({
            type: 'dictionary/updateState',
            payload: {
              downModalVisible: true,
            }
          })
          dispatch({
            type: 'dictionary/download',
            payload: {
              fileId: arr
            }
          })
        }
      },
    })
  }

  onEmptyClick = () => {
    const { dispatch } = this.props;

    confirm({
      title: '确认清空回收站？',
      content: '清空后文件将无法恢复',
      onOk: () => {
        dispatch({
          type: 'dictionary/emptyRecycle',
          payload: {}
        }).then(response => {
          if (response && response.flag) {
            message.config({
              top: 100,
              duration: 2,
            });
            message.success('清空完成！')

            dispatch({
              type: 'dictionary/queryRecycleFileList',
              payload: {
                currentPath: '/'
              }
            })

            this.setState({ isEmptyRecycle: true });
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
    });
  }

  get zipModalProps() {
    const { dispatch, dictionary, loading } = this.props;
    const { zipModalVisible } = this.state;
    const { selectedRowKeys, list, currentPath } = dictionary;

    const arr = [];
    selectedRowKeys.map(key => {
      return list.map(item => {
        if (key === item.id) {
          const newItem = {
            fileName: item.dir ? item.pathName : item.fileName,
            id: item.id,
            dir: item.dir,
            filePath: currentPath                     // 需要压缩的文件/文件夹的当前路径
          }
          arr.push(newItem);
        }
        return arr;
      })
    })

    //第一个选中的文件，默认压缩文件名称为第一个选中的文件/文件夹的名称
    const firstItemId = selectedRowKeys && selectedRowKeys.length > 0 && selectedRowKeys[0];
    const firstItemArr = list.filter(ele => ele.id === firstItemId);
    const firstItem = firstItemArr && firstItemArr.length > 0 && firstItemArr[0];
    const firstItemName = firstItem && firstItem.dir ? firstItem.pathName : firstItem.fileName;
    let defaultZipName = undefined;
    if (firstItemName) {
      defaultZipName = firstItemName.lastIndexOf('.') === 0 ? firstItemName : firstItemName.split('.')[0]
    }

    return {
      defaultZipName: defaultZipName,
      visible: zipModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      btnLoading: loading.effects['dictionary/zipFile'],
      centered: true,
      onZipClick: debounce(zipName => {
        const data = {
          zipName: zipName,
          fileList: arr
        }

        dispatch({
          type: 'dictionary/zipFile',
          payload: data,
        }).then(() => {
          this.setState({ zipModalVisible: false })
          this.handleRefresh()
        })
      }, 1000),
      onCancel: () => {
        this.setState({ zipModalVisible: false })
      },
    }
  }

  handleZipClick = () => {
    this.setState({ zipModalVisible: true })
  }

  get unZipModalProps() {
    const { dispatch, dictionary, loading } = this.props;
    const { unZipModalVisible, unZipFile } = this.state;
    const { currentPath } = dictionary;

    return {
      defaultUnZipPath: unZipFile.unzipPath,
      visible: unZipModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      btnLoading: loading.effects['dictionary/unZipFile'],
      centered: true,
      onUnZipClick: debounce(unzipPath => {
        const data = {
          unzipPath: unzipPath,
          file: unZipFile.file
        }

        dispatch({
          type: 'dictionary/unZipFile',
          payload: data,
        }).then(() => {
          this.setState({ unZipModalVisible: false })
          this.handleRefresh()
        })
      }, 1000),
      onCancel: () => {
        this.setState({ unZipModalVisible: false })
      },
    }
  }

  get buyResultProps() {
    const { dispatch, dictionary, location } = this.props;
    const { buyResultMdlVisible } = this.state;

    return {
      visible: buyResultMdlVisible,
      destroyOnClose: true,
      width: 500,
      centered: true,
      closable: true,
      maskClosable: false,
      onCancel: () => {
        this.setState({ buyResultMdlVisible: false })
      },
      checkBuyComplete: () => {
        this.handleRefresh();
        this.setState({ buyResultMdlVisible: false })
      }
    }
  }


  get downModalProps() {
    const { dictionary: { downModalVisible }, dispatch } = this.props
    return {
      visible: downModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '下载文件',
      footer: null,
      centered: true,

      onCancel: () => {
        dispatch({
          type: 'dictionary/updateState',
          payload: {
            downModalVisible: false,
          },
        })
      }
    }
  }

  render() {
    const { dictionary: { selectedRowKeys, list, currentPath, operateAuth,storage, isShowText, }, loading } = this.props;
    const { visible, drawerVisible } = this.state;
    const percent = storage && storage.usedStorageRate;
    const usedStorage = (
      <div className={styles.item}>
        <span className={styles.sub}>{storage && storage.usedStorage}</span>
        {isShowText ? <a className={styles.sub} style={{ fontWeight: 'bold' }} onClick={this.onBuyCapacity}>扩容</a> : isEmpty}
      </div>
    );

    const recycleTitle = (
      <p style={{ marginBottom: 0 }}>
        <span>数据回收站</span>
        <Button type="primary" style={{ float: 'right' }} onClick={this.onEmptyClick}>
          <Icon style={{ fontSize: '18px', verticalAlign: '-0.225em' }} component={recycleBinSvg} />
          清空回收站
        </Button>
      </p>
    )

    return (
      <Page inner style={{ overflow: 'hidden' }}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            <Filter {...this.filterProps} />
          </div>
          <div className={styles.tableListOperator}>
            {operateAuth && operateAuth.canUpload &&
              <>
                <FileUpload {...this.uploaderProps} pickerId="filePicker" />
                <FileUpload {...this.uploaderProps} pickerId="folderPicker" isDirectory={true} />
              </>
            }

            {operateAuth && operateAuth.canCreateDir &&
              <Button className={styles.blueBtn} style={{ marginRight: '16px', marginLeft: '16px' }} onClick={this.handleAddClick}>
                <Icon component={AddFolderSvg} />新建文件夹
              </Button>
            }

            {selectedRowKeys.length > 0 && !isEqual(currentPath, '/') && (
              <Button.Group>
                {operateAuth && operateAuth.canZip &&
                  <Button className={styles.blueBtn} onClick={this.handleZipClick}>压缩到</Button>
                }
                {operateAuth && operateAuth.canMove &&
                  <Button className={styles.blueBtn} onClick={this.handleMoveClick}>移动到</Button>
                }
                {operateAuth && operateAuth.canCopy &&
                  <Button className={styles.blueBtn} onClick={this.handleCopyClick}>复制到</Button>
                }
                {operateAuth && operateAuth.canDownload &&
                  <Button className={styles.blueBtn} onClick={this.handleDownloadClick} icon="download">下载</Button>
                }
                {operateAuth && operateAuth.canDeleted &&
                  <Button className={styles.blueBtn} icon="delete" onClick={this.handleMultiDeleteClick}>删除</Button>
                }
              </Button.Group>
            )}

            {/* < Button style={{ marginBottom: '15px', float: 'right' }} type="danger" onClick={this.handleRecycleBinClick}>
              <Icon style={{ fontSize: '18px', verticalAlign: '-0.225em' }} component={recycleBinSvg} />
              回收站
            </Button>
            <div style={{  float: 'right',width:'200px',marginRight:'20px' }}>
              <div className={styles.progress}>
                <Progress
                  size="small"
                  percent={percent * 100}
                  format={() => usedStorage}
                  strokeColor={percent && percent < 1 ? '#fadb14' : '#f5222d'}
                  status={percent && percent >= 1 ? "exception" : null}
                />
              </div>
            </div> */}
          </div>
          <div className={styles.tableBreadcrumb}>
            <div className={styles.breadcrumbLine}>
              <Breadcrumb separator="/">
                <Breadcrumb.Item><a href="#" onClick={(ev) => this.cdForder('/')}>全部文件</a></Breadcrumb.Item>
                {currentPath && currentPath.split('/').map((ele, index) => {
                  let stage = currentPath.split("/");
                  let key = stage.slice(0, index + 1);
                  key = key.join("/");
                  key = key.slice(-1) === '/' || isEmpty(key) ? key : key + '/';

                  if (key === '/' || isEmpty(key))
                    return null;

                  if (index === stage.length - 1) {
                    return <Breadcrumb.Item key={key}>{ele}</Breadcrumb.Item>
                  }

                  return <Breadcrumb.Item key={key}><a href="#" onClick={(ev) => this.cdForder(key)}>{ele}</a></Breadcrumb.Item>
                })}
              </Breadcrumb>
            </div>
            <div className={styles.text}> 当前位置共{list.length}个内容 </div>
          </div>
          <FilesList {...this.filesListProps} />
        </div>
        {visible && (
          <div ref={this.root} className={styles.contextMenuWrap} >
            <div className={styles.contextMenuOption} onClick={this.handleAddClick}>新建文件夹</div>
            <Divider style={{ margin: '3px 0' }} />
            <div className={styles.contextMenuOption} onClick={this.handleQuery}>刷新</div>
          </div>
        )}
        <TreeModal {...this.treeModalProps} />
        <FileEditorModal {...this.editorModalProps} />
        <ZipModal {...this.zipModalProps} />
        <UnZipModal {...this.unZipModalProps} />
        <DownFileModal {...this.downModalProps} />

        <Drawer
          title={recycleTitle}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={drawerVisible}
          getContainer={false}
          width={650}
          style={{ position: 'absolute' }}
        >
          <p>提示：回收站文件保存2天后将被自动清除。</p>
          <RecycleFileList {...this.recycleProps} />
        </Drawer>
        <BuyResultModal {...this.buyResultProps} />
      </Page>
    )
  }
}

export default Dictionary
