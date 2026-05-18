import React, { PureComponent } from 'react'
import { connect } from 'dva';
import store from 'store'
import Page from 'components/Page/Page';
import { Link, router } from 'umi';
import { Breadcrumb, Form, Input, Button, Icon, Checkbox } from 'antd';
import styles from './index.less'
import SelectedSvg from 'assets/pay/checkActive.svg';
import { Debounce } from 'lodash-decorators';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import PayResultModal from './components/PayResultModal';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 12,
    offset: 1
  },
}

@connect(({ app, accountCenter, loading }) => ({ app, accountCenter, loading }))
@Form.create()
class Recharge extends PureComponent {

  state = {
    mode: 'AL',
    isChecked: false
  }

  @Debounce(1000)
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form: { validateFields, setFields } } = this.props;
    const { mode } = this.state;
    validateFields((error, values) => {
      if (error) {
        return;
      }

      //充值
      dispatch({
        type: 'accountCenter/recharge',
        payload: {
          payModes: [mode],
          ...values
        }
      })
    });
  };

  handleModeClick = (key, e) => {
    e.preventDefault();
    this.setState({ mode: key })
  }

  onCheckboxChange = e => {
    this.setState({
      isChecked: e.target.checked
    })
  }

  get payResultProps() {
    const { dispatch, accountCenter, location } = this.props;
    const { payResultMdlVisible, rechargeOrderNum } = accountCenter;
    return {
      visible: payResultMdlVisible,
      destroyOnClose: true,
      width: 600,
      centered: true,
      closable: true,
      maskClosable: false,
      onCancel: () => {
        dispatch({
          type: 'accountCenter/hidePayResultModal',
          payload: {},
        })
      },
      checkPayComplete: () => {
        // 调用支付状态check接口，查看支付状态
        dispatch({
          type: 'accountCenter/rechargeCheck',
          payload: {
            orderNum: rechargeOrderNum
          },
        })
      }
    }
  }

  render() {
    const balance = store.get('balance');
    const user = store.get('user');

    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    const { mode, isChecked } = this.state;

    const btnLoading = loading.effects['accountCenter/hidePayResultModal'];

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '25px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/account/home'>账户中心</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>在线充值</Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.formDiv}>
          <Form
            layout="horizontal"
            {...formItemLayout}
            hideRequiredMark={true}
          >
            <FormItem label='充值账户' colon={false}>
              <span>{user && user.userInfo && user.userInfo.userName}</span>
            </FormItem>
            <FormItem label='账户余额' colon={false}>
              <span>{balance}元</span>
            </FormItem>
            <FormItem label='充值金额' colon={false}>
              {getFieldDecorator('payMoney', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入0.01~9999999范围内的数字，小数点后最多两位'
                  },
                  {
                    pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,6}\.\d{0,2}$|^[1-9]\d{0,6}$/,
                    message: "请输入0.01~9999999范围内的数字，小数点后最多两位"
                  },
                ],
              })(
                <Input suffix="元" style={{ width: '160px' }} autoComplete="off" />
              )}
            </FormItem>

            <p className={styles.title}>请选择支付方式：</p>
            <div className={styles.list}>
              <ul className={styles.mode}>
                <li
                  className={isEqual(mode, 'AL') ? classNames(styles.item, styles.selected) : styles.item}
                  onClick={e => this.handleModeClick('AL', e)}
                >
                  <span className={styles.aliIcon} />
                  <span className={styles.name}>支付宝支付</span>
                  {isEqual(mode, 'AL') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
                </li>
                {/* <li
                  className={isEqual(mode, 'WX') ? classNames(styles.item, styles.selected) : styles.item}
                  onClick={e => this.handleModeClick('WX', e)}
                >
                  <span className={styles.wechatIcon} />
                  <span className={styles.name}>微信支付</span>
                  {isEqual(mode, 'WX') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
                </li>
                <li
                  className={isEqual(mode, 'UN') ? classNames(styles.item, styles.selected) : styles.item}
                  onClick={e => this.handleModeClick('UN', e)}
                >
                  <span className={styles.bankIcon} />
                  <span className={styles.name}>网银支付</span>
                  {isEqual(mode, 'UN') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
                </li> */}
              </ul>
            </div>
            <Checkbox onChange={this.onCheckboxChange} style={{ marginTop: '5px' }}>
              <label style={{ color: '#000' }}> 我已了解：</label>
              <div className={styles.tips}>
                <span>充值后请及时对支付订单进行结算，以免影响正常服务。在您消费后，EDA云平台将基于您的消费进行发票开具。</span>
                <br />
                <span className={styles.line}>充值的款项只可用于EDA云平台消费。</span>
              </div>
            </Checkbox>
            <p className={styles.btn}>
              <Button type="primary" className={styles.sureBtn} onClick={this.handleSubmit} disabled={!isChecked} loading={btnLoading}>立即充值</Button>
              <Link to="/account/transactions" className={styles.links}>充值记录</Link>
            </p>
          </Form>
        </div>
        <PayResultModal {...this.payResultProps} />
      </Page >
    )
  }
}

export default Recharge
