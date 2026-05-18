import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { message, } from 'antd';
import { connect } from 'dva'
import Page from '../../components/Page/Page'
import Filter from './components/Filter'
import List from './components/List'
import VerifyFileModal from './components/VerifyFileModal';
import SatisfactionSurveysModal from './components/SatisfactionSurveysModal';
import BuildProjectModal from './components/BuildProjectModal'
import styles from './style.less'
import { router } from 'umi'

import { isEqual, isEmpty } from 'lodash';


@connect(({ app, mpw, loading }) => ({ app, mpw, loading }))
class Mpw extends PureComponent {
  state = {
    currentUserId: undefined,  // 当前登录用户ID
    isCompanyUser: false,// 是否为企业用户
    formValues: '',
    id: '',//需求id
    projectId: '',//项目id


  }

  componentDidMount() {
    const { mpw, dispatch } = this.props
    dispatch({
      type: 'mpw/getDemandList',
      payload: {

      }
    })

    dispatch({
      type: 'mpw/getFoundryList'
    }).then(response => {
      if (response && response.flag) {
        let foundryList = response.resData
        dispatch({
          type: 'mpw/updateState',
          payload: {
            foundryList,
          },
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        // message.error(response.errMessage)
      }
    })
    dispatch({
      type: 'mpw/getProcessNodesList'
    }).then(response => {
      if (response && response.flag) {
        let processNodesList = response.resData
        dispatch({
          type: 'mpw/updateState',
          payload: {
            processNodesList,
          },
        })

      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        // message.error(response.errMessage)
      }
    })
  }

  //点击我要流片，打开流片具体详细需求填写

  handleAddClick = () => {
    const pathname = 'mpw/createMpw?op=2';
    router.push(
      pathname,
    )
  }

  handleDetailClick = () => {
    const pathname = 'mpw/mpwDetail';
    router.push({
      pathname,
    })
  }

  /**
   * 
   * @param {需求id} id 
   * @param {需求所处状态} status 
   * 
   * 
   */
  onCheckDetail = (id, status, projectId, op) => {
    if (id && (status || isEqual(status, 0))) {
      let pathname = `/mpw/mpwDetail?status=${status}&id=${id}&projectId=${projectId}&op=${op}`;

      if (!projectId) {
        pathname = `/mpw/mpwDetail?status=${status}&id=${id}&op=${op}`;
      }
      router.push(
        pathname,
      )
    }
  }

  onUpdateDetail = (id) => {
    const pathname = `/mpw/mpwDetail?id=${id}&op=4`;
    router.push(
      pathname,
    )
  }


  get tableProps() {
    const { mpw, loading, dispatch } = this.props

    const { demandList, pagination } = mpw
    return {
      demandList,
      onCheckDetail: (id, status, projectId, op) => {
        console.log(id, status);
        this.onCheckDetail(id, status, projectId, op)
      },
      onAdd: (e) => {
        this.handleAddClick();
      },
      loading: loading.effects['mpw/getDemandList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onUpdateDetail: (id) => {
        this.onUpdateDetail(id)
      },
      // 生成项目
      onBuildProject: (id) => {
        if (id) {
          this.setStateValue('id', id)
          dispatch({
            type: 'mpw/showBuildModal',
          })
        }

      },
      // 验证文件
      onVerifyFile: (id, projectId) => {
        if (id && projectId) {
          this.setStateValue('id', id)
          this.setStateValue('projectId', projectId)
          dispatch({
            type: 'mpw/showVerifyFileModal',
          })
        }

      },
      // 满意度调查
      onSsurveys: (id) => {
        if (id) {
          this.setStateValue('id', id)
          dispatch({
            type: 'mpw/showSurveysModal',
          })
        }

      }
    }
  }
  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    this.setState({
      filterValues: {
        ...formValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'mpw/getDemandList',
      payload: params,
    });
  };


  get filterProps() {
    const { dispatch, mpw, loading } = this.props;

    const { foundryList, processNodesList } = mpw
    const { formValues, filterValues } = this.state
    return {
      foundryList,
      processNodesList,
      setFormValues: values => {
        this.setStateValue('formValues', values)
        this.setState({
          filterValues: {
            ...values,
          }
        })
      },
      onSearch: values => {
        dispatch({
          type: 'mpw/getDemandList',
          payload: {
            ...values
          }
        })



      },
      onAdd: (e) => {
        this.handleAddClick();
      },
      onDetail: (e) => {
        this.handleDetailClick();
      }
    }
  }


  titleEle = () => {
    return (
      <>
        <span className={styles.title}>生成项目</span><span className={styles.elseTitle}>生成项目后可上传文件进行验证</span>
      </>
    )
  }

  get buildProjectModalProps() {
    const { dispatch, mpw, loading } = this.props;
    const { buildProjectVisible, btnLoading } = mpw;
    const { id } = this.state;
    return {
      visible: buildProjectVisible,
      // loading: loading.effects['vm/getConsole'],
      width: '30%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: this.titleEle(),
      maxmin: true,
      centered: true,
      footer: null,
      btnLoading,
      id,
      onCancel: () => {
        dispatch({
          type: 'mpw/hideBuildModal'
        })
      },
      ColProps: {
        xs: 24,
        sm: 24,
        xl: 24,
        md: 24,
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 },
          style: {
            textAlign: 'right'
          }
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        }
      },
      onBuildSubmit(values) {
        dispatch({
          type: 'mpw/updateState',
          payload: {
            btnLoading: true
          }
        })
        dispatch({
          type: 'mpw/createProject',
          payload: {
            ...values
          }
        }).then(response => {
          if (response && response.flag) {
            message.success('生成项目成功!')

            dispatch({
              type: 'mpw/hideBuildModal',
              payload: {
                btnLoading: false
              }
            })

            dispatch({
              type: 'mpw/getDemandList',
              payload: {

              }
            })
          } else {
            dispatch({
              type: 'mpw/updateState',
              payload: {
                btnLoading: false
              }
            })
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      }
    }
  }

  get satisfactionSurveysModalProps() {
    const { dispatch, mpw, loading } = this.props;
    const { surveysModalVisible, } = mpw;
    const { id, filterValues } = this.state
    return {
      visible: surveysModalVisible,
      // loading: loading.effects['vm/getConsole'],
      width: '40%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '满意度调查',
      maxmin: true,
      centered: true,
      footer: null,
      ColProps: {
        xs: 24,
        sm: 24,
        xl: 24,
        md: 24,
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 },
          style: {
            textAlign: 'right'
          }
        },
        wrapperCol: {
          xs: { span: 15 },
          sm: { span: 15 },
        }
      },
      onCancel() {
        dispatch({
          type: 'mpw/hideSurveysModal'
        })

        dispatch({
          type: 'mpw/updateState',
          payload: {
            satisfaction: {}
          }
        })
      },
      openRechargeOrder(values) {
        dispatch({
          type: 'mpw/submitSatis',
          payload: {
            ...values,
            demandID: id,
            status: 0,

          }
        }).then(response => {
          if (response && response.flag) {
            message.success('提交成功')
            dispatch({
              type: 'mpw/hideSurveysModal'
            })
            console.log('filterValues', filterValues);
            dispatch({
              type: 'mpw/getDemandList',
              payload: {
                ...filterValues
              }

            })
            message.config({
              top: 100,
              duration: 2,
            });
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
    }
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get verifyFileModalProps() {
    const { dispatch, mpw, loading } = this.props;
    const { verifyFileModalVisible, fileGdsName, fileGdsId, fileDrcId, fileDrcName } = mpw;
    const { id, projectId } = this.state;



    return {
      id,
      fileGdsName, fileGdsId, fileDrcId, fileDrcName,
      projectId,
      visible: verifyFileModalVisible,
      zIndex: 800,
      // loading: loading.effects['vm/getConsole'],
      width: '25%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '文件验证',
      maxmin: true,
      centered: true,
      footer: null,
      loading: loading.effects['mpw/verifyFiles'],
      ColProps: {
        xs: 24,
        sm: 24,
        xl: 24,
        md: 24,
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 4 },
          style: {
            textAlign: 'right'
          }
        },
        wrapperCol: {
          xs: { span: 18 },
          sm: { span: 18 },
        }
      },
      onOk() {
        dispatch({
          type: 'mpw/verifyFiles',
          payload: {
            projectId,
            data: [fileGdsId, fileDrcId]
          }
        }).then(() => {
          dispatch({
            type: 'mpw/hideVerifyFileModal',
            payload: {
              fileGdsName: '',
              fileDrcName: '',
              fileGdsId: '',
              fileDrcId: '',
            }
          })
        })

      },

      onCancel() {
        dispatch({
          type: 'mpw/hideVerifyFileModal',
          payload: {
            fileGdsName: '',
            fileDrcName: '',
            fileGdsId: '',
            fileDrcId: '',
          }
        })
      },


    }
  }


  render() {


    return (
      <Page inner>
        <div className={styles.formFilter}>
          <Filter {...this.filterProps} />
        </div>
        <List {...this.tableProps}></List>
        <BuildProjectModal {...this.buildProjectModalProps} />
        <SatisfactionSurveysModal {...this.satisfactionSurveysModalProps} />
        <VerifyFileModal {...this.verifyFileModalProps} />
      </Page>
    )
  }
}


export default Mpw
