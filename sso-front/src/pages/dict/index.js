import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Divider, message, Anchor, Row, Col } from 'antd';
import Page from 'components/Page/Page'
import Node from './components/Node'
import Foundry from './components/Foundry'
import IPCategory from './components/IPCategory'
import Vendor from './components/Vendor'
import TaskType from './components/TaskType'
import FeeRule from './components/FeeRule'
import Flavor from './components/Flavor'
import BizConfig from './components/BizConfig';
import debounce from 'lodash/debounce'
import styles from './styles.less'
import { isEqual } from 'lodash';

const { Link } = Anchor;

@connect(({ app, systemDict, loading }) => ({ app, systemDict, loading }))
class Dict extends PureComponent {
  state = {
    nodeModalVisible: false,
    foundryModalVisible: false,

    ipCategoryModalVisible: false,
    currentIpCategory: {},

    vendorModalVisible: false,
    vendorModalType: 'create',
    currentVendor: {},

    taskTypeMdlVisible: false,
    taskTypeMdlType: 'create',
    currentTaskType: {},

    flavorModalVisible: false,
    flavorModalType: 'create',
    currentFlavor: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryNodeList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryFoundryList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryIpCategoryList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryVendorList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryTaskTypeList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryFlavorList',
      payload: {},
    })

    dispatch({
      type: 'systemDict/queryBizConfigList',
      payload: {},
    })
  }

  handleNodeRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryNodeList',
      payload: {},
    })
  }

  get nodeProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { nodeList } = systemDict;
    const { nodeModalVisible } = this.state;

    return {
      onShowModal: () => {
        this.setState({ nodeModalVisible: true })
      },
      listProps: {
        dataSource: nodeList,
        loading: loading.effects['systemDict/queryNodeList'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'systemDict/removeNode',
            payload: values,
          }).then(() => {
            this.handleNodeRefresh()
          })
        }, 1000),
      },
      modalProps: {
        visible: nodeModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createNode'],
        title: '新增工艺节点',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'systemDict/createNode',
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              message.success("工艺节点新增成功")

              this.setState({
                nodeModalVisible: false
              })
              this.handleNodeRefresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({ nodeModalVisible: false })
        },
      }
    }
  }

  handleFoundryRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryFoundryList',
      payload: {},
    })
  }

  get foundryProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { foundryList } = systemDict;
    const { foundryModalVisible } = this.state;

    return {
      onShowModal: () => {
        this.setState({ foundryModalVisible: true })
      },
      listProps: {
        dataSource: foundryList,
        loading: loading.effects['systemDict/queryFoundryList'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'systemDict/removeFoundry',
            payload: values,
          }).then(() => {
            this.handleFoundryRefresh()
          })
        }, 1000),
      },
      modalProps: {
        visible: foundryModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createFoundry'],
        title: '新增代工厂点',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'systemDict/createFoundry',
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              message.success("代工厂新增成功")

              this.setState({
                foundryModalVisible: false
              })
              this.handleFoundryRefresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({ foundryModalVisible: false })
        },
      }
    }
  }

  handleIPCategoryRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryIpCategoryList',
      payload: {},
    })
  }

  getIPCategoryList = list => {
    return list && list.map(item => {
      if (item.children && item.children.length > 0) {
        return this.getIPCategoryList(item.children)
      } else {
        item.children = null;
        return item;
      }
    })
  }

  get ipCategoryProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { ipCategoryList } = systemDict;
    const { ipCategoryModalVisible, currentIpCategory } = this.state;

    const list = this.getIPCategoryList(ipCategoryList);

    return {
      onShowModal: () => {
        this.setState({ ipCategoryModalVisible: true })
      },
      listProps: {
        dataSource: ipCategoryList,
        loading: loading.effects['systemDict/queryIpCategoryList'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'systemDict/removeIpCategory',
            payload: values,
          }).then(() => {
            this.handleIPCategoryRefresh()
          })
        }, 1000),
        onAddSubTypeItem: (item) => {
          this.setState({
            ipCategoryModalVisible: true,
            currentIpCategory: {
              parentId: item.id,
              parentTypeName: item.typeName
            }
          })
        },
      },
      modalProps: {
        item: currentIpCategory,
        visible: ipCategoryModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createIpCategory'],
        title: '新增IP类型',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'systemDict/createIpCategory',
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              message.success("IP类型新增成功")

              this.setState({
                ipCategoryModalVisible: false,
                currentIpCategory: {}
              })
              this.handleIPCategoryRefresh()
            } else if (response) {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({ ipCategoryModalVisible: false })
        },
      }
    }
  }

  handleVendorRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryVendorList',
      payload: {},
    })
  }

  get vendorProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { vendorList } = systemDict;
    const { vendorModalVisible, vendorModalType, currentVendor } = this.state;

    return {
      onShowModal: () => {
        this.setState({ vendorModalVisible: true })
      },
      listProps: {
        dataSource: vendorList,
        loading: loading.effects['systemDict/queryVendorList'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'systemDict/removeVendor',
            payload: values,
          }).then(() => {
            this.handleVendorRefresh()
          })
        }, 1000),
        onEditItem: item => {
          this.setState({
            vendorModalType: 'update',
            vendorModalVisible: true,
            currentVendor: item
          })
        }
      },
      modalProps: {
        item: currentVendor,
        visible: vendorModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createVendor'],
        title: isEqual(vendorModalType, 'create') ? '新增工具供应商' : '编辑工具供应商',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: `systemDict/${vendorModalType}Vendor`,
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              const msg = isEqual(vendorModalType, 'create') ? '工具供应商新增成功' : '工具供应商编辑成功'
              message.success(msg)

              this.setState({
                vendorModalVisible: false,
                vendorModalType: 'create',
                currentVendor: {}
              })
              this.handleVendorRefresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({
            vendorModalVisible: false,
            vendorModalType: 'create',
            currentVendor: {}
          })
        },
      }
    }
  }

  handleTaskTypeRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryTaskTypeList',
      payload: {},
    })
  }

  get taskTypeProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { taskTypeList } = systemDict;
    const { taskTypeMdlVisible, taskTypeMdlType, currentTaskType } = this.state;

    return {
      onShowModal: () => {
        this.setState({ taskTypeMdlVisible: true })
      },
      listProps: {
        dataSource: taskTypeList,
        loading: loading.effects['systemDict/queryTaskTypeList'],
        onDeleteItem: debounce(values => {
          dispatch({
            type: 'systemDict/removeTaskType',
            payload: values,
          }).then(() => {
            this.handleTaskTypeRefresh()
          })
        }, 1000),
        onEditItem: item => {
          this.setState({
            taskTypeMdlType: 'update',
            taskTypeMdlVisible: true,
            currentTaskType: item
          })
        }
      },
      modalProps: {
        item: currentTaskType,
        visible: taskTypeMdlVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createTaskType'],
        title: isEqual(taskTypeMdlType, 'create') ? '新增任务类型' : '编辑任务类型',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: `systemDict/${taskTypeMdlType}TaskType`,
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              const msg = isEqual(taskTypeMdlType, 'create') ? '任务类型新增成功' : '任务类型编辑成功'
              message.success(msg)

              this.setState({
                taskTypeMdlVisible: false,
                taskTypeMdlType: 'create',
                currentTaskType: {}
              })
              this.handleTaskTypeRefresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({
            taskTypeMdlVisible: false,
            taskTypeMdlType: 'create',
            currentTaskType: {}
          })
        },
      }
    }
  }

  get flavorProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { flavorList } = systemDict;
    const { flavorModalVisible, currentFlavor, flavorModalType } = this.state;

    return {
      onShowModal: () => {
        this.setState({ flavorModalVisible: true })
      },
      listProps: {
        dataSource: flavorList,
        loading: loading.effects['systemDict/queryFlavorList'],
        onEditItem: item => {
          this.setState({
            flavorModalType: 'update',
            flavorModalVisible: true,
            currentFlavor: item
          })
        }
      },
      modalProps: {
        flavorModalType,
        item: currentFlavor,
        visible: flavorModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['systemDict/createFlavor'],
        title: isEqual(flavorModalType, 'create') ? '新增计费规格' : '编辑计费规格',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: `systemDict/${flavorModalType}Flavor`,
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              isEqual(flavorModalType, 'create') && message.success("计费规格新增成功")
              isEqual(flavorModalType, 'update') && message.success("计费规格修改成功")

              this.setState({
                flavorModalVisible: false,
                flavorModalType: 'create',
                currentFlavor: {},
              })
              this.handleFlavorRefresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
        onCancel: () => {
          this.setState({
            flavorModalVisible: false,
            flavorModalType: 'create',
            currentFlavor: {},
          })
        },
      }
    }
  }

  handleFlavorRefresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryFlavorList',
      payload: {},
    })
  }

  get bizProps() {
    const { dispatch, systemDict, loading } = this.props;
    const { bizConfigList } = systemDict;
    return {
      listProps: {
        dataSource: bizConfigList,
        loading: loading.effects['systemDict/queryBizConfigList'],
        editLoading: loading.effects['systemDict/updateBizConfig'],
        onEditItem: debounce(data => {
          dispatch({
            type: 'systemDict/updateBizConfig',
            payload: data,
          }).then(response => {
            if (response && response.flag) {
              message.success(`计费业务配置（${data.bizTypeKey}）修改成功`)
              this.handleBizConfigfresh()
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }, 1000),
      },
    }
  }

  handleBizConfigfresh = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemDict/queryBizConfigList',
      payload: {},
    })
  }

  render() {
    return (
      <Page inner>
        <div id="dictArea" className={styles.dom}>
          <Row>
            <Col span={22}>
              <div id='node'>
                <h2 className={styles.title}>工艺节点</h2>
                <Node {...this.nodeProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='foundry'>
                <h2 className={styles.title}>代工厂</h2>
                <Foundry {...this.foundryProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='ipCategory'>
                <h2 className={styles.title}>IP类型</h2>
                <IPCategory {...this.ipCategoryProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='vendor'>
                <h2 className={styles.title}>工具供应商</h2>
                <Vendor {...this.vendorProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='taskType'>
                <h2 className={styles.title}>任务类型</h2>
                <TaskType {...this.taskTypeProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='flavor'>
                <h2 className={styles.title}>计费规格</h2>
                <Flavor {...this.flavorProps} />
              </div>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
              <div id='bizConfig'>
                <h2 className={styles.title}>计费业务配置</h2>
                <BizConfig {...this.bizProps} />
              </div>
            </Col>
            <Col span={2}>
              <Anchor
                style={{ marginLeft: 5 }}
                offsetTop={10}
                showInkInFixed={true}
                affix={true}
                getContainer={() => document.getElementById('dictArea')}
              >
                <Link href="#node" title="工艺节点" />
                <Link href="#foundry" title="代工厂" />
                <Link href="#ipCategory" title="IP类型" />
                <Link href="#vendor" title="工具供应商" />
                <Link href="#taskType" title="任务类型" />
                <Link href="#flavor" title="计费规格" />
                <Link href="#bizConfig" title="计费业务配置" />
              </Anchor>
            </Col>
          </Row>
        </div>
      </Page >
    )
  }
}

Dict.propTypes = {
  systemDict: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Dict
