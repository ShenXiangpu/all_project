import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tooltip } from 'antd'
import styles from './List.less'

const { confirm } = Modal

const STATUS = {
  0: '未审核',
  1: '审核通过',
  2: '审核未通过'
}

class List extends PureComponent {
  state = {
    imgSrc: undefined,
    imgStyle: null
  }

  componentDidMount() {
    window.onresize = () => {
      const { imgSrc } = this.state
      if (imgSrc) {
        this.setTransfromPx(imgSrc);
      }
    }
  }

  handleAuditClick = (record, e) => {
    const { onAuditItem } = this.props
    onAuditItem(record)
  }

  handleImgClick = (imgSrc, e) => {
    e.preventDefault();
    this.setState({ imgSrc })
    this.setTransfromPx(imgSrc);
  }

  /**
   * 点击图片放大：根据图片的长宽及视口的长宽，设置transform横轴纵轴距离
   */
  setTransfromPx = (imgSrc) => {
    //>>>>>>>>>>>>>>>>获取图片长宽<<<<<<<<<<<<<<<
    var img_url = imgSrc;     // 图片地址
    var img = new Image();    // 创建对象
    img.src = img_url;        // 改变图片的src
    let imgWidth;
    let imgHeight;
    if (img.complete) { // 判断是否有缓存
      imgWidth = img.width;
      imgHeight = img.height;
    } else {    // 加载完成执行
      img.onload = function () {
        imgWidth = img.width;
        imgHeight = img.height;
      };
    }

    //>>>>>>>>>>计算图片左右移动transform像素<<<<<<<<<<
    let tx;
    let ty;
    let style;
    const innerRatio = (innerWidth / innerHeight).toFixed(3);   //视口长宽比例：取小数点后3位小数
    const imgRatio = (imgWidth / imgHeight).toFixed(3);   //图片长宽比例
    if (imgRatio >= innerRatio) { //图片偏宽
      if (imgWidth >= innerWidth) {
        tx = 0;
        let scaleHeight = (innerWidth / imgRatio).toFixed(3);    //缩小后图片的高度
        ty = (innerHeight - scaleHeight) / 2;
      } else {
        tx = (innerWidth - imgWidth) / 2;
        ty = (innerHeight - imgHeight) / 2;
      }
    } else { //图片偏高
      if (imgHeight >= innerHeight) {
        ty = 0;
        let scaleWeight = innerHeight * imgRatio;  //缩小后图片的宽度
        tx = (innerWidth - scaleWeight) / 2;
      } else {
        tx = (innerWidth - imgWidth) / 2;
        ty = (innerHeight - imgHeight) / 2;
      }
    }

    style = `translate3d(${tx}px,${ty}px,0px)`
    this.setState({ imgStyle: { transform: style } })
  }

  handleCloseImgClick = e => {
    e.preventDefault();
    this.setState({
      imgSrc: undefined,
      imgStyle: null
    })
  }

  handleRemarkClick = (record, e) => {
    const { onViewItem } = this.props
    onViewItem(record)
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    const { imgSrc, imgStyle } = this.state

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        render: (text, record, index) => index + 1
      },
      {
        title: '企业名称',
        dataIndex: 'companyName',
        key: 'companyName',
        // fixed: 'left',
      },
      {
        title: '企业简称',
        dataIndex: 'companyAbbrevication',
        key: 'companyAbbrevication',
      },
      {
        title: '企业类型',
        dataIndex: 'name',
        key: 'name',
        width: 180,
        align: 'center',
      },
      {
        title: '统一社会信用代码',
        dataIndex: 'certificateCode',
        key: 'certificateCode',
      },
      {
        title: '企业法人',
        dataIndex: 'legalName',
        key: 'legalName',
        width: 90,
        align: 'center',
      },
      {
        title: '注册地址',
        dataIndex: 'registeredAddress',
        key: 'registeredAddress',
        render: text => text && text.length > 10 ? <Tooltip placement="bottomLeft" title={text}><p className={styles.limit}>{text}</p></Tooltip> : text
      },
      {
        title: '企业描述',
        dataIndex: 'description',
        key: 'description',
        render: text => <Tooltip placement="bottomLeft" title={text}><p className={styles.limit}>{text}</p></Tooltip>
      },
      {
        title: '营业执照',
        dataIndex: 'licenseUrl',
        key: 'licenseUrl',
        align: 'center',
        render: text => <img className={styles.img} src={text} onClick={(e) => this.handleImgClick(text, e)} />
      },
      {
        title: '申请日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
      },
      {
        title: '审核状态',
        dataIndex: 'isVerified',
        key: 'isVerified',
        align: 'center',
        width: 100,
        render: text => STATUS[text]
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        // fixed: 'right',
        render: (text, record) => {
          return (
            <span>
              {(record.isVerified === 0 || record.isVerified === '0') && <a href="#" onClick={e => this.handleAuditClick(record, e)}>审核</a>}
              {(record.isVerified !== 0 && record.isVerified !== '0') && <a href="#" onClick={e => this.handleRemarkClick(record, e)}>审核详情</a>}
            </span>
          )
        },
      },
    ]

    return (
      <>
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showTotal: total => `共 ${total} 条`,
          }}
          className={styles.table}
          bordered
          columns={columns}
          simple
          size="small"
          rowKey={record => record.id}
          scroll={{ x: 'max-content' }}
        />
        <div style={imgSrc ? { visibility: 'visible' } : { visibility: 'hidden' }}>
          <div className={styles.imgViewBg}></div>
          <div className={styles.imgViewDom}>
            <img src={imgSrc} style={imgStyle} className={styles.imgView} onClick={this.handleCloseImgClick} />
          </div>
        </div>
      </>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
