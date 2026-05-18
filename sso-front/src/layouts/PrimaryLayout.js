import { Component, Fragment } from 'react';
import { Layout, Icon, Modal, notification, Button, message } from 'antd';
import PropTypes from 'prop-types';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import Loader from "../components/Loader/Loader"
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData, basicMenuData, deptMenuData } from '../common/menu';
import logo from '../assets/company-logo.png';
// import logo from '../assets/eda_logo.png';
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import { config, pathMatchRegexp } from '../utils'
import Error from '../pages/404'
import styles from './index.less'
import store from 'store'
import UploadSvg from '../assets/upload.svg'
import UploadModal from '../components/UploadModal'
import UserInfoModal from '../components/UserInfoModal'
import ZipProcessDialog from '../components/ZipProcessDialog'
import BindTipModal from '../components/BindTipModal';
import BindingPhoneModal from '../components/BindingPhoneModal';
import { isEmpty, isEqual } from 'lodash-es';
import { router } from 'umi';
import { wsInit, wsConnect, removeAllClients } from '../services/api.js'

const { Content, Header } = Layout;
const { confirm } = Modal

/**
 * 全局布局
 * 装饰器Decorator，用来修改类的行为。参考：http://es6.ruanyifeng.com/#docs/decorator
 * @withRouter：防止url 变化了，但页面组件不刷新。
 * @connect: react-redux的connect方法，connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {})
 * 用法类似于：
 * class Home extends React.Component { ... }
 * export default connect(state => ({todos: state.todos}))(Home);
 */
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menus: [],
      desktop: 'main',             // 分为控制台 main，账户中心 account
      isCompanyNormal: undefined   // 是否为企业普通员工，如果是，不具备操作VM的权限，只能查看
    };
    this.uploadPop = React.createRef();
  }

  componentDidMount() {
    const { location: { pathname }, app: { mainMenus }, dispatch } = this.props;
    const user = store.get('user');

    // 判断是否为公司普通用户（项目经理、工程师）
    const userInfo = user && user.userInfo;
    const userRoles = userInfo && userInfo.userRoles;
    const isCompanyNormalArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'admin') || isEqual(item.name, 'engineer')) {
        return item;
      }
    })
    const isCompanyNormal = isCompanyNormalArr && isCompanyNormalArr.length > 0;
    this.setState({
      isCompanyNormal
    })

    if (pathMatchRegexp(['/account/*'], pathname)) {
      // 设置为账户中心菜单面板
      this.setState({
        desktop: 'account',
        menus: isCompanyNormal ? deptMenuData : basicMenuData
      });
    } else {
      const menus = store.get("menus");
      this.setState({
        desktop: 'main',
        menus: isEmpty(menus) ? mainMenus : menus
      });
    }

    // ws 连接，包括VM创建、升降配、消息中心（站内信）
    const userId = user && user.userInfo && user.userInfo.id;
    if (userId) {
      // 断开之前连接
      removeAllClients();

      // 监听 VM 创建结果
      const host = window.location.host;
      const url = 'wss://' + host + '/ws/' + userId;
      // const url = 'wss://172.18.0.171:30410/ws/' + userId;    // 本地测试
      const vmWS = wsConnect(url);
      wsInit(vmWS, (value) => {
        const msg = value.message;
        const title = value.messageType;
        const CHTITLE = {
          'VM': 'IC设计云服务器',
          'VMRECONFIG': 'IC设计云服务器配置调整'
        }

        const CNContent = {
          'VM': '创建成功',
          'VMRECONFIG': '配置调整成功'
        }

        //升降配不用动，VM的时候
        if (msg && !msg.flag) {
          notification.error({
            message: CHTITLE[title],
            description: msg.errMessage,
            duration: 0,
          })
        } else {// VM 创建成功
          // 余额
          dispatch({
            type: 'queryBalance',
            payload: {}
          })

          // 剩余机时
          dispatch({
            type: 'queryMachineHours',
            payload: {}
          })

          const key = `open${Date.now()}`;

          notification.success({
            message: CHTITLE[title],
            description: `虚拟机 ${msg.vmName || msg.resData.vmName} ${CNContent[title]}`,
            duration: 0,
            key,
            btn: (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  notification.close(key);
                  // 如果当前在 VM 页面，刷新当前页
                  if (pathMatchRegexp(['/vm'], pathname)) {
                    location.reload();
                  }
                }
                }>
                确认
              </Button>
            ),
            onClose: () => {
              // 如果当前在 VM 页面，刷新当前页
              if (pathMatchRegexp(['/vm'], pathname)) {
                location.reload();
              }
            }
          })
        }
      })

      // 监听消息
      const appName = 'xx';
      const limit = 10;
      const msgUrl = `wss://${host}/wsmsg/ws/${appName}/${userId}/${limit}`;
      // const msgUrl = `ws://172.18.0.181:30420/ws/${appName}/${userId}/${limit}`    // 本地测试
      const msgWS = wsConnect(msgUrl);
      wsInit(msgWS, (value) => {
        dispatch({
          type: 'app/updateState',
          payload: {
            noticeList: value,
          },
        })
      })

      // 获取正在压缩或解压缩的文件列表
      const zipUrl = `wss://${host}/wszip/zipFile/${userId}`;
      // const zipUrl = `wss://172.18.0.95:32900/zipFile/${userId}`    // 本地测试
      const zipWS = wsConnect(zipUrl);
      wsInit(zipWS, (value) => {
        dispatch({
          type: 'app/updateState',
          payload: {
            zipFileList: value,
          },
        })

        if (value && value.length > 0) {
          value.map(item => {
            // 如果当前在数据页面，刷新当前页
            if (pathMatchRegexp(['/dictionary'], pathname)) {
              if (item && item.status === 'true') {
                dispatch({
                  type: 'app/updateState',
                  payload: {
                    isDataRefresh: true,
                  },
                })
              } else {
                dispatch({
                  type: 'app/updateState',
                  payload: {
                    isDataRefresh: false,
                  },
                })
              }
            }
          })
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { app: { mainMenus }, location: { pathname } } = this.props;
    const { app: { mainMenus: old_mainMenus }, location: { pathname: old_pathname } } = prevProps;

    // 判断是否为公司普通用户（项目经理、工程师）
    const user = store.get('user');
    const userInfo = user && user.userInfo;
    const userRoles = userInfo && userInfo.userRoles;
    const isCompanyNormalArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'admin') || isEqual(item.name, 'engineer')) {
        return item;
      }
    })
    const isCompanyNormal = isCompanyNormalArr && isCompanyNormalArr.length > 0;

    if (mainMenus && !isEqual(mainMenus, old_mainMenus)) {
      this.setState({
        menus: mainMenus,
        isCompanyNormal
      })
    }

    // 控制台、账号中心 转换
    if (!isEqual(pathname, old_pathname)) {
      if (pathMatchRegexp(['/account/*'], pathname)) {
        // 设置为账户中心菜单面板
        this.setState({
          desktop: 'account',
          menus: isCompanyNormal ? deptMenuData : basicMenuData
        });
      } else {
        this.setState({
          desktop: 'main',
          menus: store.get("menus")
        });
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      menus: [],
    })

    this.setState = (state, callback) => {
      return;
    };
  }

  handleUploadWrapClick = e => {
    e.preventDefault();
    this.uploadPop.current.style.cssText = "right:60px";

    const { dispatch } = this.props;
    dispatch({
      type: 'app/showUploadModal',
      payload: {},
    })
  }

  /**
   * 判断列表中是否有未上传完成的文件
   * 隐藏悬浮的图标
   */
  handleMinusUpload = e => {
    e.preventDefault();

    //阻止父级右键目录框弹出
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    // 隐藏悬浮的图标
    this.uploadPop.current.style.cssText = "right:-40px";
  }


  get modalProps() {
    const { dispatch, app } = this.props;
    const { uploadModalVisible, fileList, webUploader } = app;

    return {
      webUploader,
      fileList,
      width: 600,
      visible: uploadModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: <><label>上传列表</label><span onClick={this.handleMinusModal}><Icon type="minus" /></span></>,
      centered: true,
      footer: null,
      onSetFileList: (value) => {
        dispatch({
          type: 'app/updateState',
          payload: {
            fileList: value
          },
        })
      },
      onhandleCancelClick: (files) => {
        // 判断列表中是否有未上传完成的文件
        const uploadingList = files.filter(item => item.uploadStatus && item.uploadStatus !== 'done' && item.uploadStatus !== 'error');
        if (uploadingList.length > 0) {
          // TODO 放弃上传文件
          // confirm({
          //   title: '列表中有尚未完成上传的文件，确定要放弃上传吗？',
          //   okText: '确定',
          //   cancelText: '取消',
          //   onOk() {
          //     dispatch({
          //       type: 'dictionary/xxx',
          //       payload: {},
          //     }).then(() => {
          //       // 隐藏悬浮的图标
          //       dispatch({
          //         type: 'app/updateState',
          //         payload: {
          //           uploadPopWrapVisible: false
          //         },
          //       })
          //     })
          //   },
          // })

          Modal.info({
            title: '有文件尚未完成上传操作，请稍后关闭该窗口',
            content: '提示：可以缩小当前窗口，不影响您的正常操作'
          });
        } else {
          // 隐藏悬浮的图标
          dispatch({
            type: 'app/updateState',
            payload: {
              uploadPopWrapVisible: false,
              fileList: []
            },
          })

          dispatch({
            type: 'app/hideUploadModal',
            payload: {
              webUploader: undefined
            },
          })
        }
      },
    }
  }

  get userInfoModalProps() {
    const { dispatch, app, loading } = this.props;
    const { userInfoModalVisible, userInfo } = app;

    return {
      userInfo,
      visible: userInfoModalVisible,
      destroyOnClose: true,
      width: 460,
      centered: true,
      closable: false,
      footer: null,
      loading: loading.effects['app/getUserInfoById'],
      onCancel: () => {
        dispatch({
          type: 'app/hideUserInfoModal',
          payload: {},
        })
      },
    }
  }

  /**
   *  窗口最小化
   *  展示上传悬浮球按钮
   */
  handleMinusModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/updateState',
      payload: {
        uploadPopWrapVisible: true
      },
    })

    dispatch({
      type: 'app/hideUploadModal',
      payload: {},
    })
  }

  get zipProps() {
    const { dispatch, app, loading } = this.props;
    const { zipFileList } = app;

    return {
      list: zipFileList,
    }
  }

  get bindTipModalProps() {
    const { app, dispatch } = this.props;
    const { bindTipModalVisible } = app;

    return {
      visible: bindTipModalVisible,
      destroyOnClose: true,
      width: 460,
      // centered: true,
      closable: false,
      maskClosable: false,
      footer: null,
      onCancel: () => {
        dispatch({
          type: 'app/hideBindTipModal',
          payload: {},
        })
      },
      showBindModal: () => {
        dispatch({
          type: 'app/showBindPhoneModal',
          payload: {},
        })

        dispatch({
          type: 'app/hideBindTipModal',
          payload: {},
        })
      }
    }
  }

  get bindingPhoneMdlProps() {
    const { dispatch, loading, app } = this.props;
    const { bindingPhoneMdlVisible } = app;

    return {
      visible: bindingPhoneMdlVisible,
      width: 300,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      // mask: false,
      title: '绑定手机号',
      confirmLoading: loading.effects['app/modifyPhone'],
      // center: true,
      onOk: data => {
        dispatch({
          type: 'app/modifyPhone',
          payload: data
        })
      },
      onCloseModal: () => {
        dispatch({ type: 'app/hideBindPhoneModal' })
      },
      onSendCode: (data) => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'app/bindPhoneSend',
            payload: {
              phone: data
            },
          }).then(res => {
            if (res && res.flag) {
              reslove(res.flag)
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);

              reject();
            }
          })
        })
      },
    }
  }

  render() {
    const { app: {
      uploadPopWrapVisible,
      noticeList,
      zipFileList
    },
      dispatch, children, location: { pathname }, loading } = this.props;
    const { menus, desktop, isCompanyNormal } = this.state;

    const user = store.get('user') || {};
    const { collapsed } = this.state;

    let hasPermission = pathMatchRegexp(['/account/*', '/'], pathname);

    if (!hasPermission) {
      //路由层级
      const lastIndex = pathname.lastIndexOf('/');

      //判断当前路由是否在权限内的menus中存在
      let authorizedItem;
      menus && menus.map(item => {
        if (lastIndex === 0) {
          if (pathMatchRegexp([`/${item.menuUrl}`], pathname)) {
            authorizedItem = item
          }
        } else if (lastIndex > 0) {
          if (item.children) {
            item.children.map(ele => {
              if (pathMatchRegexp([`/${item.menuUrl}/${ele.menuUrl}`], pathname) ||
                pathMatchRegexp([`/${item.menuUrl}/${ele.menuUrl}/*`], pathname)) {
                authorizedItem = ele
              }
            })
          } else {
            if (pathMatchRegexp([`/${item.menuUrl}/*`], pathname)) {
              authorizedItem = item
            }
          }
        }
      })
      hasPermission = authorizedItem && authorizedItem.menuUrl ? true : false
    }

    const unreadList = noticeList && noticeList.filter(ele => isEqual(ele.msgStatus, '0'));

    const headerProps = {
      isCompanyNormal,
      desktop,
      logo,
      collapsed,
      currentUser: {
        headUrl: user.userInfo && user.userInfo.headUrl,
        userName: user.userInfo && user.userInfo.userName,
        phone: user.userInfo && user.userInfo.phone
      },
      changeDesktop: () => {
        this.setState({
          desktop: 'main',
          menus: store.get("menus")
        });

        router.push('/')
      },
      onCollapse: () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      },
      onMenuClick: (e) => {
        if (e.key === 'logout') {
          dispatch({
            type: 'app/signOut'
          })
        } else {
          this.setState({
            desktop: 'account',
            menus: isCompanyNormal ? deptMenuData : basicMenuData
          });
        }
      },
      noticeProps: {
        noticeList,
        unreadCount: unreadList && unreadList.length,
      }
    }

    const menuData = isEqual(desktop, 'account') ? getMenuData(menus, '/account/') : getMenuData(menus);
    const siderProps = {
      logo,
      collapsed,
      menuData,
      location,
      onCollapse: () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      },
    }

    const mainContent = (
      <>
        {children}
        {uploadPopWrapVisible &&
          <div className={styles.popWrap} ref={this.uploadPop} onClick={this.handleUploadWrapClick}>
            <div className={styles.popBtn}>
              <Icon component={UploadSvg} />
            </div>
            <div className={styles.popClose} onClick={this.handleMinusUpload}>
              <div className={styles.closeBtn} />
            </div>
          </div>
        }
        <UploadModal {...this.modalProps} />
        <UserInfoModal {...this.userInfoModalProps} />
        {zipFileList && zipFileList.length > 0 && <ZipProcessDialog {...this.zipProps} />}
        <BindTipModal {...this.bindTipModalProps} />
        <BindingPhoneModal {...this.bindingPhoneMdlProps} />
      </>
    )


    //进入报名页面禁止访问其他
    // const isPathTrue = isEqual('/eduTrainingRegistration/testFormCreate', pathname)

    const isPathTrue = pathMatchRegexp(['/eduTrainingRegistration/testFormCreate', '/partner_enroll','/partner_enroll/*'], pathname);

    const showSiderMenu = (
      <>
        {!isPathTrue && <SiderMenu  {...siderProps} />}
      </>
    )

    return (
      <Fragment>
        {/* <Loader fullScreen spinning={loading.effects['app/query']} /> */}
        <Layout className={isPathTrue ? styles.main100vw : styles.main} style={{ minHeight: '100%' }}>
          <SiderMenu  {...siderProps} />
          {/* {showSiderMenu} */}
          <Layout style={{ position: 'relative' }}>
            <Header style={{ padding: 0 }}>
              <GlobalHeader {...headerProps} />
            </Header>
            <Content className={styles.content}>
              {hasPermission ? <div className={styles.wrap}>{mainContent} </div> : <Error />}
            </Content>
            <GlobalFooter
              copyright={config.copyright}
              links={config.links}
            />
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}
export default PrimaryLayout;
