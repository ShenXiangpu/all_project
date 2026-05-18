import React from 'react';
import { Steps } from 'antd';
import { connect } from 'dva';
import { message } from 'antd';
import withRouter from 'umi/withRouter';
import styles from './index.less';
import AuthForm from './components/AuthForm';
import AuditMsg from './components/AuditMsg';
import ResultMsg from './components/ResultMsg';
import store from 'store';
import isEqual from 'lodash.isequal';

const { Step } = Steps;

@withRouter
@connect(({ app, userAuth, loading }) => ({ app, userAuth, loading }))
class CompanyAuth extends React.PureComponent {

  componentDidMount() {
    const { dispatch, userAuth } = this.props;
    const { identityResult } = userAuth;
    if (identityResult) {
      if (isEqual(identityResult.role, 'other')) { // 未认证
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
        })

        dispatch({
          type: 'userAuth/getCompanyTypes',
          payload: {}
        })
      } else if (isEqual(identityResult.role, 'company')) { // 已认证：企业
        const identityInfo = identityResult.identityInfo;
        if (isEqual(identityInfo.isVerified, 0)) { // 审核中
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 2 }
          })
        } else if (isEqual(identityInfo.isVerified, 1) || isEqual(identityInfo.isVerified, 2)) { // 已审核
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 3 }
          })
        }
      }
    }
  }

  componentDidUpdate(preProps) {
    const {
      identityResult: old_identityResult,
      current: old_current
    } = preProps.userAuth;
    const { dispatch, userAuth } = this.props;
    const { identityResult, current } = userAuth;
    if (identityResult && !isEqual(identityResult, old_identityResult)) {
      if (isEqual(identityResult.role, 'other')) { // 未认证
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
        })

        dispatch({
          type: 'userAuth/getCompanyTypes',
          payload: {}
        })
      } else if (isEqual(identityResult.role, 'company')) { // 已认证
        const identityInfo = identityResult.identityInfo;
        if (isEqual(identityInfo.isVerified, 0)) { // 审核中
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 2 }
          })
        } else if (isEqual(identityInfo.isVerified, 1) || isEqual(identityInfo.isVerified, 2)) { // 已审核
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 3 }
          })
        }
      }
    }

    // 返回到第一步修改信息重新提交
    if (!isEqual(current, old_current) && isEqual(current, 1) && isEqual(old_current, 3)) {

    }
  }

  get formProps() {
    const { dispatch, userAuth } = this.props;
    const user = store.get('user') || {};
    const { identityResult, companyTypes } = userAuth;
    const identityInfo = identityResult && identityResult.identityInfo || {};

    return {
      identityInfo,
      companyTypes,
      currentUser: user && user.userInfo,
      onUserAuth: (values) => { // 用户认证信息提交
        if (identityInfo && identityInfo.isVerified && isEqual(identityInfo.isVerified, 2)) {
          // 审核不通过，再次提交信息
          dispatch({
            type: 'userAuth/updateCompanyAuth',
            payload: values
          })
        } else {
          dispatch({
            type: 'userAuth/companyAuth',
            payload: values
          })
        }
      },
    }
  }

  get resultProps() {
    const { dispatch, userAuth } = this.props;
    const { identityResult } = userAuth;
    const identityInfo = identityResult && identityResult.identityInfo;
    const isVerified = identityInfo && identityInfo.isVerified;
    const reason = identityResult && identityResult.reason;

    return {
      auditStatus: isVerified,   // 1：认证成功，2：认证失败
      auditResultMsg: reason,
      setCurrentStep: () => { // 返回第二步骤修改信息
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
        })

        dispatch({
          type: 'userAuth/getCompanyTypes',
          payload: {}
        })
      }
    }
  }

  render() {
    const { current } = this.props.userAuth;

    return (
      <div>
        <div className={styles.stepsContent}>
          <Steps type="navigation" className={styles.steps} current={current} size="small">
            <Step status={current === 0 ? "process" : "finish"} title="选择认证类型" />
            <Step status={current < 1 ? "wait" : (current === 1 ? "process" : "finish")} title="填写认证信息" />
            <Step status={current < 2 ? "wait" : (current === 2 ? "process" : "finish")} title="审核认证信息" />
            <Step status={current === 3 ? "process" : "wait"} title="认证结果" />
          </Steps>
        </div>
        <div className={styles.main}>
          {current === 1 && <AuthForm {...this.formProps} />}
          {current === 2 && <AuditMsg />}
          {current === 3 && <ResultMsg {...this.resultProps} />}
        </div>
      </div>
    )
  }
}

export default CompanyAuth
