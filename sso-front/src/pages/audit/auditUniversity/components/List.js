import React, { PureComponent } from 'react'
import { Table, Modal, Divider, Popconfirm } from 'antd'
import styles from './List.less'
import { isEqual } from 'lodash-es'

const { confirm } = Modal

const STATUS = {
  1: '未审核',
  2: '审核通过',
  3: '审核未通过'
}

const Qualification = {
  1: "专科",
  2: "本科",
  3: "硕士",
  4: "博士",
}

const Duration = {
  1: "两年",
  2: "三年",
  3: "四年",
  4: "五年",
}

const Title = {
  1: "教授",
  2: "副教授",
  3: "讲师",
}

class List extends PureComponent {
  state = {
    imgSrc: undefined,
    imgStyle: null
  }

  handleAuditClick = (record, e) => {
    const { onAuditItem } = this.props
    onAuditItem(record)
  }

  handleRemarkClick = (value, e) => {
    const { onViewItem } = this.props
    const data = {
      userId: value
    }
    onViewItem(data)
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

  render() {
    const { tabActiveKey, allUniversityList, ...tableProps } = this.props;
    const { imgSrc, imgStyle } = this.state;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: (text, record) => {
          const arr = allUniversityList && allUniversityList.length > 0
            && allUniversityList.filter(ele => isEqual(ele.id, record.universityId));
          const province = arr && arr.length > 0 && arr[0].province;

          return (
            <span>{province}</span>
          )
        }
      },
      {
        title: '大学名称',
        dataIndex: 'university',
        key: 'university',
        render: (text, record) => {
          const arr = allUniversityList && allUniversityList.length > 0
            && allUniversityList.filter(ele => isEqual(ele.id, record.universityId));
          const universityName = arr && arr.length > 0 && arr[0].universityName;

          return (
            <span>{universityName}</span>
          )
        }
      },
      {
        title: '学院名称',
        dataIndex: 'college',
        key: 'college',
      },
      {
        title: '学历',
        dataIndex: 'qualification',
        key: 'qualification',
        render: text => Qualification[text]
      },
      {
        title: '学制',
        dataIndex: 'duration',
        key: 'duration',
        render: text => Duration[text]
      },
      {
        title: '入学时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
      },
      {
        title: '学生证',
        dataIndex: 'identityCard',
        key: 'identityCard',
        align: 'center',
        render: text => <img className={styles.img} src={text} onClick={(e) => this.handleImgClick(text, e)} />
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
      },
      {
        title: '审核状态',
        dataIndex: 'isVerified',
        key: 'isVerified',
        align: 'center',
        width: 120,
        render: text => STATUS[text]
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              {(record.isVerified === 1 || record.isVerified === '1') && <a href="#" onClick={e => this.handleAuditClick(record, e)}>审核</a>}
              {(record.isVerified !== 1 && record.isVerified !== '1') && <a href="#" onClick={e => this.handleRemarkClick(record.userId, e)}>审核详情</a>}
            </span>
          )
        },
      }
    ]

    const teacherColumns = [
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: (text, record) => {
          const arr = allUniversityList && allUniversityList.length > 0
            && allUniversityList.filter(ele => isEqual(ele.id, record.universityId));
          const province = arr && arr.length > 0 && arr[0].province;

          return (
            <span>{province}</span>
          )
        }
      },
      {
        title: '大学名称',
        dataIndex: 'university',
        key: 'university',
        render: (text, record) => {
          const arr = allUniversityList && allUniversityList.length > 0
            && allUniversityList.filter(ele => isEqual(ele.id, record.universityId));
          const universityName = arr && arr.length > 0 && arr[0].universityName;

          return (
            <span>{universityName}</span>
          )
        }
      },
      {
        title: '学院名称',
        dataIndex: 'college',
        key: 'college',
      },
      {
        title: '职称',
        dataIndex: 'title',
        key: 'title',
        render: text => Title[text]
      },
      {
        title: '教师证',
        dataIndex: 'identityCard',
        key: 'identityCard',
        align: 'center',
        render: text => <img className={styles.img} src={text} onClick={(e) => this.handleImgClick(text, e)} />
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
      },
      {
        title: '审核状态',
        dataIndex: 'isVerified',
        key: 'isVerified',
        align: 'center',
        width: 120,
        render: text => STATUS[text]
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              {(record.isVerified === 1 || record.isVerified === '1') && <a href="#" onClick={e => this.handleAuditClick(record, e)}>审核</a>}
              {(record.isVerified !== 1 && record.isVerified !== '1') && <a href="#" onClick={e => this.handleRemarkClick(record.userId, e)}>审核详情</a>}
            </span>
          )
        },
      }
    ]

    return (
      <>
        <Table
          {...tableProps}
          bordered
          columns={isEqual(tabActiveKey, 'student')
            ? columns : teacherColumns}
          simple
          rowKey={record => record.id}
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

export default List
