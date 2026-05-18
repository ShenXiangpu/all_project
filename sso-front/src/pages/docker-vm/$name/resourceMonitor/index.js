import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import Filter from './components/Filter'
import Charts from './components/Charts'
import styles from './style.less'

@connect(({ app, dockerVm, loading }) => ({ app, dockerVm, loading }))
class ResourceMonitor extends PureComponent {
  state = {
    formValues: {}
  }

  componentDidMount() {
    const { location: { query } } = this.props;
    const { formValues } = this.state;

    const data = isEmpty(formValues) ? query : formValues;
    this.getResourceCharts(data);

    this.timer = setInterval(() => {
      this.getResourceCharts(data);
    }, 5000);
  }

  componentDidUpdate(preProps, preState) {
    const { formValues } = this.state;
    const { formValues: oldFormValues } = preState;
    if (!isEmpty(formValues) && oldFormValues !== formValues) {
      if (this.timer != null) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        this.getResourceCharts(formValues);
      }, 5000);
    }
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  getResourceCharts = values => {
    const { dispatch, location: { query } } = this.props;

    const data = {
      workloadId: values.workloadId || query.workloadId,
      projectId: values.projectId || query.projectId,
      timeSpan: values.timeSpan || '5m',  //初始默认值
      fromTime: values.fromTime,
      toTime: values.toTime
    }

    // 后台希望为自定义类型的时候，不传该字段
    if (data.timeSpan === 'custom') {
      delete data.timeSpan;
    }

    dispatch({
      type: 'dockerVm/getResourceUsage',
      payload: data
    })
  }

  get filterProps() {
    const { formValues } = this.state

    return {
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setState({ formValues: values })
      },
      onSearch: values => {
        this.getResourceCharts(values);
      },
    }
  }

  render() {
    const { dockerVm } = this.props;
    const { chartsData } = dockerVm;

    return (
      <div>
        <Filter {...this.filterProps} />

        {chartsData && chartsData.length === 0 ?
          <p className={styles.description}>没有足够的数据绘制图表</p> :
          <Charts chartsData={chartsData} />
        }
      </div>
    )
  }
}

export default ResourceMonitor
