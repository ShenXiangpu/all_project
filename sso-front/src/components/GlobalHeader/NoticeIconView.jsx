import React, { Component } from "react";
import { Tag, message } from "antd";
import { connect } from "dva";
import groupBy from "lodash/groupBy";
import moment from "moment";
import NoticeIcon from "../NoticeIcon";
import styles from "./index.less";
import { isEqual } from "lodash-es";
import "moment/locale/zh-cn"; // 导入中文语言包
import { router } from "umi";

moment.locale("zh-cn"); // 设置中文
class NoticeIconView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      // 获取消息列表
      // dispatch({
      //   type: 'global/fetchNotices',
      // });
    }
  }

  // 跳转至详情页
  changeReadState = clickedItem => {
    const { id } = clickedItem;
    // router.push(`/account/message/${id}`);
    window.location.href = `/account/message/${id}`;
  };

  handleViewMore = () => {
    router.push('/account/message');
  }

  getNoticeData = notices => {
    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (newNotice.createTime) {
        newNotice.datetime = moment(notice.createTime).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.ifExpired) {
        newNotice.extra = (
          <Tag
            color="gold"
            style={{
              marginRight: 0
            }}
          >
            已过期
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, "msgType"); // 消息类型(0:通知;1:告警;..)
  };

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item =>
          isEqual(item.msgStatus, "0")
        ).length;
      }
    });
    return unreadMsg;
  };

  render() {
    const {
      noticeList,
      unreadCount,
      getNoticesLoading,
      onNoticeVisibleChange
    } = this.props;

    const noticeData = this.getNoticeData(noticeList);
    const unreadMsg = this.getUnreadData(noticeData);
    return (
      <NoticeIcon
        noticeList={noticeData}
        className={styles.action}
        count={unreadCount}
        onItemClick={item => {
          this.changeReadState(item);
        }}
        loading={getNoticesLoading}
        viewMoreText="查看更多"
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={this.handleViewMore}
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={unreadMsg[0]}
          list={noticeData[0]}
          title="通知"
          emptyText="您已查看所有通知"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="alarm"
          count={unreadMsg[1]}
          list={noticeData[1]}
          title="告警"
          emptyText="您已读完所有告警"
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default NoticeIconView;
