import React from 'react';
import { Button } from 'antd';
import PolicyList from './components/List';
import AlarmTypeModal from './components/AlarmTypeModal';
import styles from './style.less'

function PolicyRule(props) {
  return (
    <div>
      <div className={styles.line}>
        <Button
          icon="plus"
          type="primary"
          onClick={props.onShowMdl}
        >
          新建策略
        </Button>
      </div>

      <PolicyList {...props.listProps} />
      <AlarmTypeModal {...props.modalProps} />
    </div>
  );
}

export default PolicyRule;
