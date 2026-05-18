import React, { PureComponent } from 'react'
import { Form, Select, Modal, Tabs, Spin } from 'antd'
import ConfigForm from './ConfigForm'
import ReplaceMain from './ReplaceMain'
import LimitMain from './LimitMain'
import styles from './config.less'
import { isEqual } from 'lodash'

const { Option } = Select
const { TabPane } = Tabs;

class ConfigModal extends PureComponent {

  componentDidUpdate(prePops) {
    const { visible, item, getConfigList } = this.props;
    const { visible: old_visible } = prePops;
    if (visible && !isEqual(visible, old_visible)) {
      const data = {
        edaVendorCode: item.edaVendorCode
      }
      getConfigList(data);
    }
  }

  get replaceProps() {
    const {
      item = {},
      onConfig,
      configList,
      configLoading,
      onReplaceFile,
      replaceBtnLoading
    } = this.props;

    const configItemArr = configList && configList.filter(item => item.operationType === 2);
    const configItem = configItemArr && configItemArr.length > 0 ? configItemArr[0] : {};

    return {
      configFormProps: {
        edaVendorCode: item.edaVendorCode,
        operationType: 2,
        configItem,
        onConfig,
        configLoading
      },
      replaceFormProps: {
        edaVendorCode: item.edaVendorCode,
        onReplaceFile,
        replaceBtnLoading
      }
    }
  }

  get limitProps() {
    const {
      item = {},
      onConfig,
      configList,
      configLoading,
      onLimit,
      limitBtnLoading
    } = this.props;

    const configItemArr = configList && configList.filter(item => item.operationType === 3);
    const configItem = configItemArr && configItemArr.length > 0 ? configItemArr[0] : {};

    return {
      configFormProps: {
        edaVendorCode: item.edaVendorCode,
        operationType: 3,
        configItem,
        onConfig,
        configLoading
      },
      limitFormProps: {
        edaVendorCode: item.edaVendorCode,
        onLimit,
        limitBtnLoading
      }
    }
  }

  render() {
    const { item = {},
      onConfig,
      configList,
      loading,
      configLoading,
      operateLoading,
      configOperate,
      ...modalProps } = this.props;

    const configItemArr = configList && configList.filter(item => item.operationType === 1);

    return (
      <Modal {...modalProps} footer={null} className={styles.modal}>
        <Tabs onChange={this.handleChange} tabPosition="left">
          <TabPane tab="配置" key="1">
            <ConfigForm
              item={item}
              onConfig={onConfig}
              configItem={configItemArr && configItemArr.length > 0 ? configItemArr[0] : {}}
              configLoading={configLoading}
              operateLoading={operateLoading}
              configOperate={configOperate}
            />
          </TabPane>
          <TabPane tab="替换" key="2">
            <ReplaceMain {...this.replaceProps} />
          </TabPane>
          <TabPane tab="限制" key="3">
            <LimitMain {...this.limitProps} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

export default ConfigModal
