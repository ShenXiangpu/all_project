import React, { PureComponent } from 'react'
import { router } from 'umi'
import styles from './Title.less'



class Title extends PureComponent {

  goToCusMan = () => {
    const pathname = 'cusDemandManagement';
    router.push({
      pathname,
    })
  }

  // onClick={this.goToCusMan}

  render() {
    
    return (
      <div className={styles.titleContainer} >
        <div className={styles.left}></div><div className={styles.right}>{this.props.title}</div>
      </div>
    )
  }
}

export default Title;
