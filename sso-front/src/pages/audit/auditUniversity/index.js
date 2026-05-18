import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Modal } from 'antd';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import AuditModal from './components/AuditModal'
import styles from './style.less';
import { isEqual } from 'lodash-es';

const { TabPane } = Tabs;

/**
 * 审核高校用户：教师、学生
 */
@connect(({ auditUniversity, loading }) => ({ auditUniversity, loading }))
class AuditUniversity extends PureComponent {
  state = {
    formValues: {},          // 查询条件
    tabActiveKey: 'student',
    confirmLoading: false,   // 审核通过loading
    confirmLoading2: false   // 审核不通过loading
  };

  componentDidMount() {
    const { tabActiveKey } = this.state;
    console.log('tabActiveKey:', tabActiveKey);
    this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { auditUniversity, dispatch } = this.props
    const { provinceList, universityList } = auditUniversity
    const { tabActiveKey } = this.state
    const { formValues } = this.state

    return {
      tabActiveKey,
      filter: {
        provinceList,
        universityList,
        ...formValues
      },
      onGetUniversity: (value) => {
        dispatch({
          type: 'auditUniversity/getListByProvince',
          payload: value
        })
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        this.handleQuery(values);
      }
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props
    const { formValues, tabActiveKey } = this.state
    if (isEqual(tabActiveKey, 'student')) {
      dispatch({
        type: 'auditUniversity/getStudentList',
        payload: {
          ...formValues,
          ...values,
        }
      })
    } else if (isEqual(tabActiveKey, 'teacher')) {
      dispatch({
        type: 'auditUniversity/getTeacherList',
        payload: {
          ...formValues,
          ...values,
        }
      })
    }
  }

  get listProps() {
    const { dispatch, auditUniversity, loading } = this.props
    const { allUniversityList, list } = auditUniversity
    const { tabActiveKey } = this.state;

    return {
      tabActiveKey,
      allUniversityList,
      dataSource: list,
      loading: isEqual(tabActiveKey, 'student')
        ? loading.effects['auditUniversity/getStudentList']
        : loading.effects['auditUniversity/getTeacherList'],
      pagination: false,
      onAuditItem(item) {
        dispatch({
          type: 'auditUniversity/showModal',
          payload: {
            currentItem: item,
            modalType: 'auditUniversity'
          },
        })
      },
      onViewItem(data) {
        dispatch({
          type: 'auditUniversity/getAuditInfo',
          payload: data,
          callback: (responseData) => {
            if (responseData) {
              Modal.info({
                title: '审核详情',
                okText: '确定',
                content: (
                  <div>
                    <p>
                      <label>审核时间：</label>
                      <label>{responseData.createdAt}</label>
                    </p>
                    <p>
                      <label>审核结果：</label>
                      <label>{responseData.description}</label>
                    </p>
                  </div>
                )
              });
            }
          }
        })
      },
    }
  }

  get modalProps() {
    const { dispatch, auditUniversity } = this.props;
    const { currentItem, modalVisible, modalType } = auditUniversity;
    const { confirmLoading, confirmLoading2 } = this.state;

    return {
      confirmLoading,  // “通过”按钮 loading
      confirmLoading2, // “不通过”按钮 loading
      modalType,
      item: currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '高校认证信息审核',
      centered: true,
      onAudit: data => {
        const status = data.status
        if (isEqual(status, 1)) {
          this.setState({ confirmLoading: true })
        } else {
          this.setState({ confirmLoading2: true })
        }

        dispatch({
          type: 'auditUniversity/audit',
          payload: data,
        }).then(() => {
          this.setState({
            confirmLoading: false,
            confirmLoading2: false
          })
          this.handleQuery()
        })
      },
      onCancel() {
        dispatch({
          type: 'auditUniversity/hideModal',
        })
      },
    }
  }

  onTabChange = tabActiveKey => {
    const { dispatch } = this.props;

    this.setState({
      tabActiveKey,
      formValues: {}
    });

    if (isEqual(tabActiveKey, 'student')) {
      dispatch({
        type: 'auditUniversity/getStudentList',
        payload: {}
      })
    } else if (isEqual(tabActiveKey, 'teacher')) {
      dispatch({
        type: 'auditUniversity/getTeacherList',
        payload: {}
      })
    }
  };

  render() {
    return (
      <Page inner>
        <Tabs defaultActiveKey="student" onChange={this.onTabChange}>
          <TabPane tab="学生" key="student">
            <div className={styles.formFilter}>
              <Filter key='1-filter' {...this.filterProps} />
            </div>
            <List key='1-list' {...this.listProps} />
          </TabPane>
          <TabPane tab="教师" key="teacher">
            <div className={styles.formFilter}>
              <Filter key='2-filter' {...this.filterProps} />
            </div>
            <List key='2-list' {...this.listProps} />
          </TabPane>
        </Tabs>
        <AuditModal {...this.modalProps} />
      </Page>
    )
  }
}

export default AuditUniversity
