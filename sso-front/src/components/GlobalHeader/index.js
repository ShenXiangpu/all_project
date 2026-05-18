import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Row, Col, Button } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Link from 'umi/link';
import NoticeIconView from './NoticeIconView';
import styles from './index.less';
import { defaultHeadImg } from '../../utils/config'
import classNames from 'classnames';
import store from 'store';
import { isEqual } from 'lodash-es';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      currentUser = {},
      collapsed,
      desktop,
      changeDesktop,
      isMobile,
      logo,
      onMenuClick,
      noticeProps,
      isCompanyNormal
    } = this.props;

    const balance = store.get('balance');
    const machineHours = store.get('machineHours');

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="accountSettings">
          <Link to="/account/personalInfo/base">
            <Icon type="user" />
            <span>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="balance">
          <Link to="/account/home" className={classNames(styles.icharge, styles.top)}>
            <Row>
              <Col span={14}>
                <Icon type="money-collect" />
                <span>余额</span>
              </Col>
              <Col span={10} className={styles.money}>
                {balance} 元
              </Col>
            </Row>
          </Link>
        </Menu.Item>
        <Menu.Item key="machine">
          <Link to="/account/home" className={classNames(styles.icharge, styles.bottom)}>
            <Row>
              <Col span={14}>
                <Icon type="code" />
                <span>剩余机时</span>
              </Col>
              <Col span={10} className={styles.money}>
                {machineHours} 时
              </Col>
            </Row>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    const deptMenu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="accountSettings">
          <Link to="/account/personalInfo/base">
            <Icon type="user" />
            <span>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        {!isEqual(desktop, 'main') &&
          <Button
            icon="desktop"
            size="small"
            type="primary"
            ghost
            onClick={changeDesktop}
          >
            控制台
          </Button>
        }

        <div className={styles.right}>
          <NoticeIconView
            {...noticeProps}
          />

          {currentUser && (currentUser.userName || currentUser.phone) ? (
            <Dropdown overlay={isCompanyNormal ? deptMenu : menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar className={styles.avatar} src={currentUser.headUrl ? currentUser.headUrl : defaultHeadImg} />
                <span className={styles.name}>{currentUser.userName || currentUser.phone}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
