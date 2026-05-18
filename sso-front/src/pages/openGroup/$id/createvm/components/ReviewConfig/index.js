import React, { PureComponent } from 'react'
import { Row, Col, Divider, Skeleton, Checkbox, Form } from 'antd';
import styles from './index.less'
import { isEqual } from 'lodash';

class ReviewConfig extends PureComponent {
  handleRadioChange = e => {
    console.log('radio checked:', e.target.value);
  }

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  onVMChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  renderTools = (tools, isJson) => {
    let toolInfo;
    if (isJson) {
      toolInfo = tools;
    } else {
      toolInfo = tools && JSON.parse(tools);
    }

    return toolInfo && toolInfo.map((item, index) => {
      const edaTools = item.edaTools;

      const tools = edaTools.map(ele => {
        return (
          <div key={ele.type}>
            <p className={styles.name}>{ele.type}：</p>
            {ele.tool_infos.map(t => (
              <p className={styles.toolValue} key={t.tool_name}>{t.tool_name}[{t.tool_version}]</p>
            ))}
          </div>
        )
      })

      return (
        <div key={item.company} className={styles.toolDiv}>
          <div className={styles.toolTitle}>
            <span>
              {/* {factoryImg(item.company)} */}
              <b>{index + 1}. {item.company}</b>
            </span>
          </div>

          {tools}
        </div>
      )
    })
  }

  render() {
    const { form, item, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Skeleton loading={loading}>
        <div className={styles.main}>
          <Row>
            <Col span={2}><span>基础配置</span></Col>
            <Col span={22}>
              <Row>
                <Col span={7}>
                  <span className={styles.title}>付费模式：</span>
                  <span>包年包月</span>
                </Col>
                <Col span={7}>
                  <span className={styles.title}>实例规格：</span>
                  {item && item.instanceConfig &&
                    <span>
                      <label>{item.instanceConfig.flavorType} / {item.instanceConfig.flavorName}</label>
                      <label> ({item.instanceConfig.cpu}核 {item.instanceConfig.memory}GB)</label>
                    </span>
                  }
                </Col>
                <Col span={7}>
                  <span className={styles.title}>购买数量：</span>
                  <span>1台</span>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col span={7}>
                  <span className={styles.title}>系统盘：</span>
                  <span>16 GB</span>
                </Col>
                <Col span={7}>
                  <span className={styles.title}>数据盘：</span>
                  <span>{Number(item.disk) / 1024} GB</span>
                </Col>
              </Row>
              <div className={styles.toolWrap}>
                <p className={styles.toolP}>当前EDA工具配置：</p>
                {this.renderTools(item.tools)}
              </div>
            </Col>
          </Row>
          {/* <Divider dashed />
          <Row>
            <Col span={2}><span>网络和安全组</span></Col>
            <Col span={22}>
              <Row>
                <Col span={7}>
                  <span className={styles.title}>网络：</span>
                  <span></span>
                </Col>
                <Col span={7}>
                  <span className={styles.title}></span>
                  <span></span>
                </Col>
                <Col span={7}>
                  <span className={styles.title}></span>
                  <span></span>
                </Col>
              </Row>
            </Col>
          </Row> */}
          <Divider dashed />
          <Row>
            <Col span={2}><span>系统配置</span></Col>
            <Col span={22}>
              <Row>
                {/* <Col span={7}>
                  <span className={styles.title}>登录凭证：</span>
                  {item && item.randomRootPwd &&
                    <span>密码登录（系统自动生成密码）</span>
                  }
                  {item && isEqual(item.randomRootPwd, false) &&
                    <span>密码登录（自定义密码）</span>
                  }
                </Col> */}
                <Col span={7}>
                  <span className={styles.title}>实例名称：</span>
                  <span>{item && item.vmName}</span>
                </Col>
                <Col span={7}>
                  <span className={styles.title}>主机名称：</span>
                  <span>{item && item.hostname}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {/* <div className={styles.main}>
          <Row>
            <Col span={2}><span>购买时长</span></Col>
            <Col span={22}>
              <Radio.Group
                size="small"
                defaultValue={""}
                className={styles.rd}
                onChange={this.handleRadioChange}
              >
                {periods && periods.length > 0 && periods.map(ele => (
                  <Radio.Button value={ele.key} key={ele.key}>{ele.value}</Radio.Button>
                ))}
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={2}><span>自动续费</span></Col>
            <Col span={22}>
              <Checkbox onChange={this.onChange}>启用自动续费</Checkbox>
            </Col>
          </Row>
        </div> */}
        <div className={styles.main} style={{ paddingBottom: 0 }}>
          <Row>
            <Col span={2}>
              <span className={styles.spanTitle}>服务协议</span>
            </Col>
            <Col span={22}>
              <Form.Item>
                {getFieldDecorator('protocol', {
                  // valuePropName: "checked",
                  initialValue: item.protocol && isEqual(item.protocol, true) ? [true] : [],
                  rules: [
                    {
                      required: true,
                      message: '请确认协议签署并下单'
                    },
                  ],
                })(
                  <Checkbox.Group>
                    <Checkbox value={true}><a target='_blank' rel='noopener noreferrer' href="/agreement/icVmContract">《IC设计云虚拟机服务条款》</a></Checkbox>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Skeleton >
    )
  }
}
export default ReviewConfig
