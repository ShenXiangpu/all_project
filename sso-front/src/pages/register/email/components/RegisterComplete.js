import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import styles from './registerComplete.less'

class RegisterComplete extends PureComponent {
    handleClick = (e) => {
        e.preventDefault();
        const { toLoginPage } = this.props;
        toLoginPage();
    }

    render() {
        const { currentEmail } = this.props

        return (
            <div className={styles.wrap}>
                <h1><Icon type="check-circle" theme="filled" /><label>恭喜您，成功注册高性能EDA平台，请耐心等待管理员审核。</label></h1>
                <div className={styles.des}>
                    <p>您的高性能EDA平台账户名为<label>{currentEmail}</label>，</p>
                    <p>该账号可同时用于青岛EDA中心其他平台登录。</p>
                    <p>
                        <Button type="primary" onClick={this.handleClick}>返回，重新登录</Button>
                    </p>
                </div>
            </div>
        )
    }
}

RegisterComplete.propTypes = {
    currentMobile: PropTypes.string
}

export default RegisterComplete
