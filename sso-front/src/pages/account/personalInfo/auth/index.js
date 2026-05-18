import React from 'react';
import { connect } from 'dva';
import styles from './index.less'
import classNames from 'classnames';
import { router } from 'umi';
import isEqual from 'lodash.isequal';
import { isEmpty } from 'lodash-es';

// 认证主页
@connect(({ userAuth, loading }) => ({ userAuth, loading }))
class AuthMain extends React.PureComponent {

  state = {
    auth: '',  // 判断个人用户是否已认证，如果已认证，认证身份: student、teacher、company
  }

  componentDidMount() {
    const { userAuth } = this.props;
    const { identityResult } = userAuth;
    if (identityResult) {
      if (isEqual(identityResult.role, 'student')) { // 已认证：学生
        this.setState({ auth: 'student' })
      } else if (isEqual(identityResult.role, 'teacher')) { // 已认证：老师
        this.setState({ auth: 'teacher' })
      } else if (isEqual(identityResult.role, 'company')) { // 已认证：企业
        this.setState({ auth: 'company' })
      } else {
        this.setState({ auth: 'other' })
      }
    }
  }

  componentDidUpdate(preProps) {
    const { identityResult: old_identityResult } = preProps.userAuth;
    const { userAuth } = this.props;
    const { identityResult } = userAuth;
    if (identityResult && !isEqual(identityResult, old_identityResult)) {
      if (isEqual(identityResult.role, 'student')) { // 已认证：学生
        this.setState({ auth: 'student' })
      } else if (isEqual(identityResult.role, 'teacher')) { // 已认证：老师
        this.setState({ auth: 'teacher' })
      } else if (isEqual(identityResult.role, 'company')) { // 已认证：企业
        this.setState({ auth: 'company' })
      } else {
        this.setState({ auth: 'other' })
      }
    }
  }

  handleStuAuthClick = () => {
    const { auth } = this.state;
    const { location: { pathname } } = this.props;
    if (isEqual(auth, 'other') || isEqual(auth, 'student')) {
      router.push(`${pathname}/student`);
    }
  }

  handleTechAuthClick = () => {
    const { auth } = this.state;
    const { location: { pathname } } = this.props;
    if (isEqual(auth, 'other') || isEqual(auth, 'teacher')) {
      router.push(`${pathname}/teacher`);
    }
  }

  handleCompyAuthClick = () => {
    const { auth } = this.state;
    const { location: { pathname } } = this.props;
    if (isEqual(auth, 'other') || isEqual(auth, 'company')) {
      router.push(`${pathname}/company`);
    }
  }

  render() {
    const { auth } = this.state;

    return (
      <div>
        <div className={styles.module}>
          <div
            className={isEqual(auth, 'other') || isEqual(auth, 'student') ? classNames(styles.moduleList, styles.list0) : classNames(styles.moduleList, styles.list0, styles.listForbidden0)}
            onClick={this.handleStuAuthClick}
          >
            <span className={classNames(styles.cardImg, styles.img0)}></span>
            <p className={styles.cardName}>
              学生认证
              <i className={styles.icon} />
            </p>
          </div>

          <div
            className={isEqual(auth, 'other') || isEqual(auth, 'teacher') ? classNames(styles.moduleList, styles.list0) : classNames(styles.moduleList, styles.listForbidden0)}
            onClick={this.handleTechAuthClick}
          >
            <span className={classNames(styles.cardImg, styles.img1)}></span>
            <p className={styles.cardName}>
              教师认证
              <i className={styles.icon} />
            </p>
          </div>

          <div
            className={isEqual(auth, 'other') || isEqual(auth, 'company') ? styles.moduleList : classNames(styles.moduleList, styles.listForbidden1)}
            onClick={this.handleCompyAuthClick}
          >
            <span className={classNames(styles.cardImg, styles.img2)}></span>
            <p className={styles.cardName}>
              企业认证
              <i className={styles.icon} />
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthMain
