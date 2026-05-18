import React, { PureComponent } from 'react'
import { List, Icon } from 'antd'
import styles from './IpCategoryList.less'

class IpCategoryList extends PureComponent {

  handleIpClick = (e, value) => {
    console.log('click');
    e.preventDefault();
    e.stopPropagation();
    const { onShowDetail } = this.props;
    onShowDetail(value)
  }


  render() {
    const { data } = this.props;

    return (
      <div className={styles.ipWrap}>
        <p>
          <span className={styles.left}>最新列表</span>
          {/* <a className={styles.right}>更多<Icon type="right" /></a> */}
        </p>
        <List
          grid={{ gutter: 14, column: 6 }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              className={styles.listItem}
              onClick={e => this.handleIpClick(e, item.id)}
            >
              <div className={styles.content}>
                <h3>{item.name}</h3>
                <div className={styles.text}>
                  <span title={item.profile}>{item.profile}</span>
                </div>
                <div className={styles.imgDiv}>
                  <img src={item.logoInfo} />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default IpCategoryList
