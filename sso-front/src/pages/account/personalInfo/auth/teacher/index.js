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
class TeacherAuth extends React.PureComponent {
  state = {
    imgUrl: ''
  }

  componentDidMount() {
    const { dispatch, userAuth } = this.props;
    const { identityResult } = userAuth;
    if (identityResult) {
      if (isEqual(identityResult.role, 'other')) { // 未认证
        dispatch({
          type: 'userAuth/getProvince',
          payload: {},
        })
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
        })

      } else if (isEqual(identityResult.role, 'teacher')) { // 已认证：教师
        const identityInfo = identityResult.identityInfo;
        if (isEqual(identityInfo.isVerified, 1)) { // 审核中
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 2 }
          })
        } else if (isEqual(identityInfo.isVerified, 2) || isEqual(identityInfo.isVerified, 3)) { // 已审核
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
      current: old_current,
      allUniversityList: old_allUniversityList
    } = preProps.userAuth;
    const { dispatch, userAuth } = this.props;
    const { identityResult, current, allUniversityList } = userAuth;
    if (identityResult && !isEqual(identityResult, old_identityResult)) {
      if (isEqual(identityResult.role, 'other')) { // 未认证
        dispatch({
          type: 'userAuth/getProvince',
          payload: {},
        })
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
        })

      } else if (isEqual(identityResult.role, 'teacher')) { // 已认证：学生
        const identityInfo = identityResult.identityInfo;
        if (isEqual(identityInfo.isVerified, 1)) { // 审核中
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 2 }
          })
        } else if (isEqual(identityInfo.isVerified, 2) || isEqual(identityInfo.isVerified, 3)) { // 已审核
          dispatch({
            type: 'userAuth/updateState',
            payload: { current: 3 }
          })
        }
      }
    }

    // 返回到第一步修改信息重新提交
    if (!isEqual(current, old_current) && isEqual(current, 1) && isEqual(old_current, 3)) {
      dispatch({
        type: 'userAuth/getProvince',
        payload: {},
      })

      dispatch({
        type: 'userAuth/getAllUniversityList',
        payload: {},
      })
    }

    // 重新提交信息时，字段赋值，根据所选学校id获取其所在省份，并获取省份下学校列表
    if (identityResult && allUniversityList && allUniversityList.length > 0 && !isEqual(allUniversityList, old_allUniversityList)) {
      const identityInfo = identityResult && identityResult.identityInfo;
      const provinceArr = identityInfo && allUniversityList.filter(ele => isEqual(ele.id, identityInfo.universityId));
      const selectedProvince = provinceArr && provinceArr.length > 0 && provinceArr[0].province;

      dispatch({
        type: 'userAuth/getListByProvince',
        payload: {
          province: selectedProvince
        }
      })
    }
  }

  get formProps() {
    const { dispatch, userAuth, loading } = this.props;
    const user = store.get('user') || {};
    const { provinceList, universityList, allUniversityList, identityResult } = userAuth;
    const { imgUrl } = this.state;
    const identityInfo = identityResult && identityResult.identityInfo || {};

    return {
      identityInfo,
      provinceList,
      allUniversityList,
      universityList,
      currentUser: user && user.userInfo,
      onGetUniversity: (value) => {
        dispatch({
          type: 'userAuth/getListByProvince',
          payload: value
        })
      },
      saveUploadImgUrl: value => {
        this.setState({ imgUrl: value });
      },
      onUserAuth: (values) => { // 用户认证信息提交
        if (!imgUrl) {
          message.config({
            top: 300,
            duration: 2,
          });
          message.error('请上传教师证！');
          return
        }

        if (identityInfo && identityInfo.isVerified && isEqual(identityInfo.isVerified, 3)) {
          // 审核不通过，再次提交信息
          dispatch({
            type: 'userAuth/updateTeacherAuth',
            payload: {
              ...values,
              identityCard: imgUrl
            }
          })
        } else {
          dispatch({
            type: 'userAuth/teacherAuth',
            payload: {
              ...values,
              identityCard: imgUrl
            }
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
      auditStatus: isVerified,   // 2：认证成功，3：认证失败
      auditResultMsg: reason,
      setCurrentStep: () => { // 返回第二步骤修改信息
        dispatch({
          type: 'userAuth/updateState',
          payload: { current: 1 }
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

export default TeacherAuth
