import React, { PureComponent } from 'react';
import { Form, Row, Col, Select, Button, Icon, Popover, Checkbox, Input } from 'antd';
import store from 'store';
import styles from "./index.less";
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}

const FormItem = Form.Item
const { Option } = Select

@Form.create()
class Bottom extends PureComponent {
  state = {
    changeDay: false,  // 是否使用剩余机时兑换，默认true
  }

  componentDidMount() {
    const machineHours = store.get('machineHours');
    if (machineHours > 0) {
      this.setState({ changeDay: true });
    }
  }

  onSubmit = () => {
    const { onSubmit, form: { getFieldValue } } = this.props;
    const { changeDay } = this.state;
    let data = {};
    if (changeDay) {
      data = {
        day: getFieldValue('day')
      };
    } else {
      data = {
        monthId: getFieldValue('month')
      };
    }
    onSubmit(data, changeDay);
  }

  onChange = (e) => {
    this.setState({
      changeDay: e.target.checked
    });
  }

  handleSelectChange = (value) => {
    const { onSetPeriodKey } = this.props;
    onSetPeriodKey(value);
  }

  render() {
    const { form, currentStep, periods, item, calcVmPrice, calcLoading } = this.props;
    const { getFieldDecorator } = form;
    const { changeDay } = this.state;
    const balance = store.get('balance');
    const machineHours = store.get('machineHours');

    const content = (
      <div>
        <p>实例 <span className={styles.priceDetail}>200</span>元</p>
        <p>系统盘 <span className={styles.priceDetail}>80</span>元</p>
      </div>
    );

    const content2 = (
      <div>
        <p>10机时兑换使用时长 <span className={styles.priceDetail}>1</span>天</p>
        <p>仅支持一次性全部兑换</p>
      </div>
    );

    return (
      <div className={styles.bottomWrap} id="bottom">
        <div className={styles.bottom}>
          <Form  {...formItemLayout} layout="horizontal">
            <Row>
              <Col span={6} className={styles.col1}>
                <p>已选机型：
                  {item.instanceConfig &&
                    <span className={styles.checked}>
                      <label>{item.instanceConfig.flavorType} / {item.instanceConfig.flavorName}</label>
                      <label>（{item.instanceConfig.cpu}核 {item.instanceConfig.memory}GB）</label>
                    </span>
                  }
                </p>
                <FormItem label="购买时长" className={changeDay ? styles.lineThr2 : null}>
                  {getFieldDecorator('month', {
                    initialValue: periods && periods.length > 0 ? periods[0].id : '',
                  })(
                    <Select
                      disabled={changeDay}
                      getPopupContainer={() => document.getElementById('bottom')}
                      onChange={this.handleSelectChange}
                    >
                      {periods && periods.length > 0 && periods.map(item => (
                        <Option key={item.id} value={item.id}>
                          <span className={styles.word}>{item.description}</span>
                          <div className={styles.costTips}>
                            {isEqual(item.rebate, 0) ? '试用' : item.rebateString}
                          </div>
                        </Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={machineHours && machineHours > 0 ? 4 : 12} className={changeDay ? classNames(styles.col2, styles.lineThr) : styles.col2}>
                <p style={{ height: 21 }}></p>
                <p>配置费用：
                  {
                    calcLoading ?
                      <span className={styles.priceDetail}>费用计算中…</span>
                      :
                      <span className={styles.priceDetail}>
                        <span className={styles.price}>{calcVmPrice && calcVmPrice.realPrice}元</span>
                        <span className={styles.moneyLine}>{calcVmPrice.originPrice}元</span>
                      </span>
                  }
                  {/* <Popover content={content} title={null}>
                    <Icon type="question-circle" className={styles.icon} />
                  </Popover> */}
                </p>
              </Col>
              {machineHours && machineHours > 0 ?
                <Col span={8} className={classNames(styles.col2, styles.borderLeft)}>
                  <p>可用机时：
                    <span className={styles.priceDetail}><span className={styles.price}>{machineHours}</span> 时</span>
                    <Popover content={content2} title="机时兑换规则">
                      <Icon type="question-circle" className={styles.icon} />
                    </Popover>

                    <Checkbox
                      checked={changeDay}
                      onChange={this.onChange}
                      style={{ color: '#000', marginLeft: 35 }}
                      disabled={isEqual(Number(machineHours), 0)}
                    >
                      机时兑换（推荐）
                    </Checkbox>
                  </p>
                  <div>
                    <FormItem label="可兑换时长">
                      {getFieldDecorator('day', {
                        initialValue: changeDay ? machineHours / 10 : 0,
                      })(
                        <Input readOnly style={{ width: 60 }}
                          disabled={isEqual(Number(machineHours), 0)}
                        />
                      )}天
                    </FormItem>
                  </div>
                </Col>
                :
                null
              }
              <Col span={6} className={styles.col3}>
                <Button type="primary" className={classNames(styles.btn, styles.sureBtn)} onClick={this.onSubmit}>
                  确认下单
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Bottom;
