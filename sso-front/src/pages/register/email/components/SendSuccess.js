import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Popover } from 'antd'
import styles from './sendSuccess.less'

class SendSuccess extends PureComponent {
    handleClick = (e) => {
        e.preventDefault();
        const { currentEmail } = this.props;
        const website = this.toOpenEmail(currentEmail);
        if (website) {
            window.open('http://' + website, '_blank');
        }
    }

    handleResend = (e) => {
        e.preventDefault();
        const { currentEmail, sendEmail } = this.props;
        sendEmail(currentEmail)
    }

    toOpenEmail = (mail) => {
        const index = mail.indexOf('@')
        const domain = mail.substring(index + 1, mail.length).toLowerCase();
        if (domain === '163.com') {
            return 'mail.163.com';
        } else if (domain === 'vip.163.com') {
            return 'vip.163.com';
        } else if (domain === '126.com') {
            return 'mail.126.com';
        } else if (domain === 'qq.com' || domain === 'vip.qq.com' || domain === 'foxmail.com') {
            return 'mail.qq.com';
        } else if (domain === 'gmail.com') {
            return 'mail.google.com';
        } else if (domain === 'sohu.com') {
            return 'mail.sohu.com';
        } else if (domain === 'tom.com') {
            return 'mail.tom.com';
        } else if (domain === 'vip.sina.com') {
            return 'vip.sina.com';
        } else if (domain === 'sina.com.cn' || domain === 'sina.com') {
            return 'mail.sina.com.cn';
        } else if (domain === 'tom.com') {
            return 'mail.tom.com';
        } else if (domain === 'yahoo.com.cn' || domain === 'yahoo.cn') {
            return 'mail.cn.yahoo.com';
        } else if (domain === 'tom.com') {
            return 'mail.tom.com';
        } else if (domain === 'yeah.net') {
            return 'www.yeah.net';
        } else if (domain === '21cn.com') {
            return 'mail.21cn.com';
        } else if (domain == 'hotmail.com') {
            return 'www.hotmail.com';
        } else if (domain === 'sogou.com') {
            return 'mail.sogou.com';
        } else if (domain === '188.com') {
            return 'www.188.com';
        } else if (domain === '139.com') {
            return 'mail.10086.cn';
        } else if (domain === '189.cn') {
            return 'webmail15.189.cn/webmail';
        } else if (domain === 'wo.com.cn') {
            return 'mail.wo.com.cn/smsmail';
        } else if (domain === '139.com') {
            return 'mail.10086.cn';
        } else {
            return '';
        }

    }

    render() {
        const { currentEmail } = this.props

        const content = <div>
            <ul>
                <li>请检查垃圾邮件箱</li>
                <li><span>如果还没有收到邮件，</span><Button onClick={this.handleResend}>重新发送邮件</Button></li>
                <li><span>没有收到？ </span><a href="/register/email">更换邮箱</a></li>
            </ul>
        </div>

        return (
            <div className={styles.wrap}>
                <h1>验证邮件已送达<label>{currentEmail}</label></h1>
                <p>请登录邮箱，点击激活链接完成注册，激活链接在24小时内有效。</p>
                <p className={styles.btnWrap}>
                    <Button className={styles.btn} type="primary" onClick={this.handleClick}>请查收邮件</Button>
                    <Popover content={content} title={null} trigger="hover" placement="bottomLeft">
                        <a href="#">没有收到邮件？</a>
                    </Popover>
                </p>
            </div>
        )
    }
}

SendSuccess.propTypes = {
    currentEmail: PropTypes.string
}

export default SendSuccess
