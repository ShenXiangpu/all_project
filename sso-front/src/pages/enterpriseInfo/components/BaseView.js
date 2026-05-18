
import React, { useState, useEffect } from 'react';
import { Descriptions, Badge, Row, Button, Icon } from 'antd';
import styles from './BaseView.less'

export default function BaseView({ baseInfo, auditInfo, onUpdate }) {

    const [imgSrc, setImgSrc] = useState(undefined);
    const [imgStyle, setImgStyle] = useState(null);

    useEffect(() => {
        window.onresize = () => {
            if (imgSrc) {
                setTransfromPx(imgSrc);
            }
        }
    });

    const handleImgClick = (imgSrc, e) => {
        e.preventDefault();
        setImgSrc(imgSrc)
        setTransfromPx(imgSrc);
    }

    /**
     * 点击图片放大：根据图片的长宽及视口的长宽，设置transform横轴纵轴距离
     */
    const setTransfromPx = (imgSrc) => {
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
        setImgStyle({ transform: style })
    }

    const handleCloseImgClick = e => {
        e.preventDefault();
        setImgSrc(undefined)
        setImgStyle(null)
    }

    const handleEditClick = e => {
        e.preventDefault();
        onUpdate();
    }

    const renderChildren = (status) => {
        switch (status) {
            case 0:
                return <Badge status="processing" text="正在审核" />;
            case 1:
                return <Badge status="success" text="审核通过" />;
                break;
            case 2:
                return <Badge status="error" text="审核不通过" />;
                break;
            default:
                break;
        }
        return null;
    };

    return (
        <>
            {baseInfo && (baseInfo.isVerified === 2 || baseInfo.isVerified === '2') &&
                <Row className={styles.rightRow}>
                    <a href="#" onClick={handleEditClick} ><Icon type="edit" style={{ marginRight: '5px' }} />修改</a>
                </Row>
            }
            <Descriptions title="企业基本信息" className={styles.dep} bordered>
                <Descriptions.Item label="企业名称">{baseInfo && baseInfo.companyName}</Descriptions.Item>
                <Descriptions.Item label="法定代表人">{baseInfo && baseInfo.legalName}</Descriptions.Item>
                <Descriptions.Item label="统一社会信用代码">{baseInfo && baseInfo.certificateCode}</Descriptions.Item>
                <Descriptions.Item label="企业简称">{baseInfo && baseInfo.companyAbbrevication}</Descriptions.Item>
                <Descriptions.Item label="注册地址" span={2}>{baseInfo && baseInfo.registeredAddress}</Descriptions.Item>
                <Descriptions.Item label="申请企业类型">{baseInfo && baseInfo.name}</Descriptions.Item>
                <Descriptions.Item label="申请时间" span={2}>{baseInfo && baseInfo.createdAt}</Descriptions.Item>
                <Descriptions.Item label="企业描述" span={3}>
                    <pre className={styles.desp}>
                        {baseInfo && baseInfo.description}
                    </pre>
                </Descriptions.Item>
                <Descriptions.Item label="营业执照" span={3}>
                    <img className={styles.img} src={baseInfo && baseInfo.licenseUrl} onClick={(e) => handleImgClick(baseInfo.licenseUrl, e)} />
                </Descriptions.Item>
                <Descriptions.Item label="审核状态" span={3}>
                    {renderChildren(baseInfo && baseInfo.isVerified)}
                </Descriptions.Item>
                {baseInfo && (baseInfo.isVerified === 2 || baseInfo.isVerified === '2') &&
                    <Descriptions.Item label="原因" span={2} >
                        <label>{auditInfo && auditInfo.description}</label>
                    </Descriptions.Item>
                }
                {baseInfo && (baseInfo.isVerified === 2 || baseInfo.isVerified === '2') &&
                    <Descriptions.Item label="审核时间" >{auditInfo && auditInfo.createdAt}</Descriptions.Item>
                }
            </Descriptions>
            {baseInfo && (baseInfo.isVerified === 2 || baseInfo.isVerified === '2') &&
                <label style={{ color: 'red' }}>* 请修改后重新提交</label>
            }
            <div style={imgSrc ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <div className={styles.imgViewBg}></div>
                <div className={styles.imgViewDom}>
                    <img src={imgSrc} style={imgStyle} className={styles.imgView} onClick={handleCloseImgClick} />
                </div>
            </div>
        </>
    )
}
