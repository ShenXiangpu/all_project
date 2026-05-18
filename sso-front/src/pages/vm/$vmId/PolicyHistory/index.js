import React from 'react';
import Filter from './components/Filter';
import PolicyHistoryList from './components/List';
import styles from '../PolicyRule/style.less';

function PolicyHistory(props) {
  return (
    <div>
      <div className={styles.formFilter}><Filter {...props.filterProps} /></div>
      <PolicyHistoryList {...props.listProps} />
    </div>
  );
}

export default PolicyHistory;
