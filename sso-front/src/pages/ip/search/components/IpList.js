import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import styles from "./IpList.less";

class IpList extends PureComponent {

  handleIpClick = (e, value) => {
    const { onShowDetail } = this.props;
    onShowDetail(value)
  }

  render() {
    const { data } = this.props;

    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        // pagination={{
        //   onChange: page => {
        //     console.log(page);
        //   },
        //   pageSize: 20,
        // }}
        renderItem={item => (
          <List.Item
            key={item.id}
            extra={
              <div
                className={styles.imgDiv}
              >
                <a>
                  <img
                    alt="logo"
                    src={item.logoInfo}
                  />
                </a>
              </div>
            }
          >
            <List.Item.Meta
              className={styles.meta}
              title={<a className={styles.title} onClick={e => this.handleIpClick(e, item.id)}>{item.name}</a>}
              description={item.profile}
            />
          </List.Item>
        )}
      />
    )
  }
}
export default IpList
