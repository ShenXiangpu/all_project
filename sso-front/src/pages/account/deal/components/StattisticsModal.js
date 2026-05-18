import React, { PureComponent } from 'react'
import { Modal, DatePicker, Tooltip, Radio, Spin, Icon } from 'antd'
import echarts from 'echarts/lib/echarts';  // 引入 ECharts 主模块
import 'echarts/lib/chart/bar';   // 引入柱状图
import 'echarts/lib/component/tooltip';  // 引入提示框
import 'echarts/lib/component/title';    // 引入标题组件
import isEqual from 'lodash.isequal';
import { debounce, isEmpty } from 'lodash';
import moment from 'moment'
import styles from './StattisticsModal.less'
import classNames from 'classnames';
import StatisticsFilter from './StatisticsFilter';

let resizeTimer = null;
class StattisticsModal extends PureComponent {

  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = {
      statisticalType: 'group',  // 默认
      rangeDate: {},             // 查询区间
      max: false,
      myChart: undefined,
      formValues: {}
    }
  }

  componentDidMount() {
    const { stattistics } = this.props;
    if (stattistics && !isEmpty(stattistics)) {
      this.getChart(stattistics);
    }
  }

  componentDidUpdate(preProps, preState) {
    const { stattistics, visible, tabActiveKey } = this.props;
    const { stattistics: old_stattistics, visible: old_visible } = preProps;
    if (stattistics && !isEmpty(stattistics) && !isEqual(stattistics, old_stattistics)) {
      this.getChart(stattistics);
    }

    if (!visible && !isEqual(visible, old_visible)) {
      this.setState({ rangeDate: {} })
    }

    const { statisticalType } = this.state;
    const { statisticalType: old_statisticalType } = preState;
    if (isEqual(Number(tabActiveKey), 2) && !isEqual(statisticalType, old_statisticalType)) {
      this.getChart(stattistics);
    }
  }

  getChart = (stattistics) => {
    const { isCompanyUser } = this.props;
    const { statisticalType } = this.state;
    // const myChart = echarts.init(document.getElementById('chart')); // 绘制图表
    if (this.chart.current) {
      const myChart = echarts.init(this.chart.current); // 绘制图表

      const keys = Object.keys(stattistics);
      const xData = keys;
      const sData = Object.values(stattistics);

      const groupName = isCompanyUser ? '部门' : '群组';
      let titleName = groupName;
      switch (statisticalType) {
        case 'group':
          titleName = groupName;
          break;
        case 'tool':
          titleName = "工具";
          break;
        case 'user':
          titleName = "用户";
      }

      myChart.setOption({
        backgroundColor: '#00265f',
        title: {
          text: `消费记录（按${titleName}统计）`,
          x: "center",
          y: "4%",
          bottom: 200,
          textStyle: {
            color: '#fff',
            fontSize: '18',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {      //显示数据的图表位于当前canvas的坐标轴
          x: 50,
          y: 155,
          x2: 80,
          y2: 120,
          borderWidth: 1
        },
        xAxis: [{
          type: 'category',
          name: titleName,
          data: xData,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 12
            },
          },
        }],
        yAxis: [{
          name: '金额（元）',
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
        }],
        series: [{
          type: 'bar',
          data: sData,
          barWidth: '20px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,244,255,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(0,77,167,1)' // 100% 处的颜色
              }], false),
              barBorderRadius: [30, 30, 30, 30],
              shadowColor: 'rgba(0,160,221,1)',
              shadowBlur: 4,
            }
          },
          label: {
            normal: {
              show: true,
              lineHeight: 30,
              width: 80,
              height: 30,
              backgroundColor: 'rgba(0,160,221,0.1)',
              borderRadius: 200,
              position: ['-8', '-60'],
              distance: 1,
              formatter: [
                '    {d|●}',
                ' {a|{c}}     \n',
                '    {b|}'
              ].join(','),
              rich: {
                d: {
                  color: '#3CDDCF',
                },
                a: {
                  color: '#fff',
                  align: 'center',
                },
                b: {
                  width: 1,
                  height: 30,
                  borderWidth: 1,
                  borderColor: '#234e6c',
                  align: 'left'
                },
              }
            }
          }
        }]
      });

      this.setState({ myChart })
    }
  }

  disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  changeSize = () => {
    const { max, myChart } = this.state;
    this.setState({
      max: !max,
    })

    if (myChart) {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(() => {
        myChart.resize()
      }, 100);
    }
  }

  get filterProps() {
    const { tabActiveKey, statisticsEnum, onSearch } = this.props
    const { formValues } = this.state

    return {
      tabActiveKey,
      statisticsEnum,
      filter: {
        ...formValues
      },
      setFormValues: values => {
        this.setState({
          formValues: values
        })
      },
      onSearch: values => {
        onSearch(values);
      },
      setStatisticalType: value => {
        this.setState({ statisticalType: value })
      }
    }
  }

  render() {
    const { stattistics, tabActiveKey, isCompanyUser, chartLoading, title, ...modalProps } = this.props
    const { max } = this.state;

    const groupName = isCompanyUser ? '部门' : '群组';

    const TitleNode = (
      <p className={styles.title}>
        <span className={styles.content}>{title}</span>
        <a className={styles.max} onClick={this.changeSize} >
          <Tooltip placement="bottom" title={max ? '退出全屏' : '全屏'}>
            <Icon type={max ? 'fullscreen-exit' : 'fullscreen'} />
          </Tooltip>
        </a>
      </p>
    )

    return (
      <Modal {...modalProps}
        forceRender={true}
        title={TitleNode}
        className={classNames(styles.modal, max ? styles.showMax : '')}
        width={max ? '100%' : '1100px'}
      >
        <div className={styles.formFilter}>
          <StatisticsFilter {...this.filterProps} />
        </div>
        <Spin spinning={chartLoading}>
          <div ref={this.chart} id="echarts" style={max ? { width: '100%', height: '84vh' } : { width: '100%', height: '40vh' }}></div>
        </Spin>
      </Modal>
    )
  }
}
export default StattisticsModal
