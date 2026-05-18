import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, message } from 'antd'
import Page from '../../components/Page/Page'
import Filter from './components/Filter'
import List from './components/List'
import SatisfactionSurveysModal from './components/SatisfactionSurveysModal'

import debounce from 'lodash/debounce'
import store from 'store'
import { router } from 'umi'
import { isEmpty, isEqual } from 'lodash'
import styles from './style.less'



@connect(({ app, cusDemandManagement, loading }) => ({ app, cusDemandManagement, loading }))
class CusDemandManagement extends PureComponent {
  state = {
    formValues: {},
    id: '',//需求id
  }

  componentDidMount() { //生命周期
    const { dispatch } = this.props
    dispatch({
      type: 'cusDemandManagement/getDemandList',
      payload: {},
    })
  }

  //点击我要流片，打开流片具体详细需求填写

  handleAddClick = () => {


    const pathname = 'cusDemandManagement/createMpw?op=2';
    router.push(
      pathname,
    )
  }
  get filterProps() {
    const { dispatch, loading } = this.props;
    const { formValues } = this.state


    return {
      onAdd: (e) => {
        this.handleAddClick();
      },
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'cusDemandManagement/getDemandList',
          payload: {
            ...values
          }
        })
      },
      onDetail: (e) => {
        this.handleDetailClick();
      }

    }
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleClick = (id, status, projectId, str) => {
    console.log(id, status, projectId, str);
    // debugger

    // let pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}&projectId=${projectId}`;

    // if(!projectId){
    //   pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}`;
    // }
    // router.push(
    //   pathname,
    // )

    if (str && isEqual(str, '1')) { //评审
      console.log(id, str);
      const pathname = `/cusDemandManagement/createMpw?id=${id}&op=${str}`;
      router.push(
        pathname,
      )
    } else if (str && isEqual(str, '2')) { //编辑
      let pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}&projectId=${projectId}`;
      if (!projectId) {
        pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}`;
      }
      router.push(
        pathname,
      )
    } else if (str && isEqual(str, '3')) { //查看详情
      let pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}&projectId=${projectId}`;
      if (!projectId) {
        pathname = `/cusDemandManagement/mpwDetail?id=${id}&status=${status}&op=${str}`;
      }
      router.push(
        pathname,
      )
    }

  }

  handleCloseClick = (projectId) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'cusDemandManagement/closeProject',
      payload: {
        projectId
      }
    }).then((response) => {
      if (response && response.flag) {
        message.success('项目已关闭')
        dispatch({
          type: 'cusDemandManagement/getDemandList',
          payload: {
            ...formValues
          }
        })
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    })
  }

  get tableProps() {
    const { cusDemandManagement, loading, dispatch } = this.props
    const { demandList, pagination } = cusDemandManagement
    return {
      demandList,
      onHandleClick: (id, status, projectId, str) => {
        this.handleClick(id, status, projectId, str)
      },
      //关闭项目
      onHandleCloseClick: (projectId) => {
        this.handleCloseClick(projectId)
      },
      loading: loading.effects['cusDemandManagement/getDemandList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        // debugger
        this.handleTableChange(pagination, filters, sorter)
      },
      // 满意度调查
      onSsurveys: (id) => {
        if (id) {
          this.setStateValue('id', id)
          dispatch({
            type: 'cusDemandManagement/getRecordById', // 查询满意度调查回显数据
            payload: {
              demandID: id
            }
          }).then(() => {
            dispatch({
              type: 'cusDemandManagement/showSurveysModal', // 打开popup
            })
          }).then(() => { // 打开popup之后延迟启动开关
            setTimeout(() => {
              dispatch({
                type: 'cusDemandManagement/updateState', // 查询满意度调查回显数据
                payload: {
                  isOpenListen: true
                }
              })
            }, 1000);
          })

        }

      }
      //   groupList: isCompanyUser ? deptList : groupList,
      //   filter: {
      //     ...formValues,
      //   },
      // setFormValues: values => {
      //   this.setStateValue('formValues', values)
      // },
      //   onSearch: values => {
      //     dispatch({
      //       type: 'vm/query',
      //       payload: {
      //         ...values
      //       }
      //     })
      //   },

    }
  }


  handleTableChange = (pagination, filtersArg, sorter) => {
    // debugger
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
      type: 'cusDemandManagement/getDemandList',
      payload: params,
    });
  };

  get satisfactionSurveysModalProps() {
    const { dispatch, cusDemandManagement, loading } = this.props;
    const { surveysModalVisible, satisfaction, isOpenListen } = cusDemandManagement;
    const { id } = this.state
    return {
      visible: surveysModalVisible,
      satisfaction,
      isOpenListen,
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
          type: 'cusDemandManagement/hideSurveysModal'
        })
        dispatch({
          type: 'cusDemandManagement/updateState',
          payload: {
            satisfaction: {},
            isOpenListen: false
          }
        })
      },
      // onCancel1: () => {
      //   dispatch({
      //     type: 'cusDemandManagement/hideSurveysModal'
      //   })
      // },
      onReviewSa(values) {
        dispatch({
          type: 'cusDemandManagement/reviewSa',
          payload: {
            ...values,
            demandID: id,
          }
        }).then(response => {
          if (response && response.flag) {
            message.success('审核完成')
            dispatch({
              type: 'cusDemandManagement/hideSurveysModal',
              payload:{
                isOpenListen: false
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
      onExportSa: () => {
        dispatch({
          type: 'cusDemandManagement/downloadServiceRecord',
          payload: {
            demandID: id,
            isOpenListen: false
          }
        })
      }
    }
  }


  render() {

    return (
      <Page inner>
        <div className={styles.formFilter}>
          <Filter {...this.filterProps} />
        </div>
        <List {...this.tableProps}></List>
        <SatisfactionSurveysModal {...this.satisfactionSurveysModalProps} />
      </Page>
    )
  }
}

export default CusDemandManagement
