import React, { PureComponent } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import styles from './IpSwiper.less'

class IpSwiper extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.instanceSwiper()
    }, 300)
  }

  instanceSwiper() {
    this.swiperObj = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 5,
      autoplay: {      // 自动滑动
        delay: 3000,   // 3秒切换一次
        // stopOnLastSlide: false,
        disableOnInteraction: false,
      },

      // 前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      observer: true,          // 修改swiper自己或子元素时，自动初始化swiper    重要
      observeParents: true,    // 修改swiper的父元素时，自动初始化swiper  重要
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const { list: oldList } = this.props
    const { list: newList } = nextProps
    if (oldList != newList && this.swiperObj) {
      this.swiperObj.destroy();
      this.swiperObj = null;
      this.instanceSwiper()
    }
  }

  componentDidUpdate() {
    if (this.swiperObj) {
      this.swiperObj.update();
      this.swiperObj.slideTo(0, 1000, false);
    }
  }

  componentWillUnmount() {
    if (this.swiperObj && this.swiperObj.destroy) { // 销毁swiper
      this.swiperObj.destroy();
      this.swiperObj = null;
    }
  }

  handleIpClick = (e, value) => {
    console.log('in');
    e.preventDefault();
    e.stopPropagation();
    const { onShowDetail } = this.props;
    onShowDetail(value)
  }

  render() {
    const { list } = this.props

    return (
      <div className={styles.swiperFather}>
        {/* /swiper-no-swiping关闭鼠标滑动  ${styles.con}设置轮播组件的宽高*/}
        <div className={`swiper-container ${styles.con}`} style={{ overflow: 'hidden' }}>
          <div className={`swiper-wrapper ${styles.con}`}>
            {
              list && list.length > 0 && list.map((item, index) => {
                return (
                  <div className={`swiper-slide ${styles.item}`} key={`swiper${index}`}>
                    <div className={styles.content} onClick={e => this.handleIpClick(e, item.id)}>
                      <h3>{item.name}</h3>
                      <div className={styles.text}>
                        <span title={item.profile}>{item.profile}</span>
                      </div>
                      <div className={styles.imgDiv}>
                        <img src={item.logoInfo} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          {/* 导航按钮 */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

        </div>
      </div>
    )

  }
}

export default IpSwiper;
