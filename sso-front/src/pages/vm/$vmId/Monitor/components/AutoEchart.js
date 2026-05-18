import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';// 引入折线图
import 'echarts/lib/component/tooltip'; // 引入提示框
import 'echarts/lib/component/title';// 引入标题组件
import isEqual from 'lodash.isequal';

class AutoEchart extends Component {

  componentDidMount() {
    const { docId, graphID, data } = this.props;
    this.getChart(docId, graphID, data);
  }

  componentDidUpdate(preProps) {
    const { data: oldData } = preProps;
    const { docId, graphID, data } = this.props;
    if (!isEqual(data, oldData)) {
      this.getChart(docId, graphID, data);
    }
  }

  getChart = (docId, graphID, data) => {
    let unit = '';
    let unit2 = '';
    let beginTime;
    let endTime;
    let dataInterval; //  开始时间 + interval*（data数组长度-1）= 结束时间
    const legendData = data && data.map(item => item.legendItem && item.legendItem.measurement);
    const baseData = data && data.map((item, index) => {
      beginTime = item.beginTime && Number(item.beginTime);
      endTime = item.endTime && Number(item.endTime);
      const interval = item.interval;
      dataInterval = Number(interval) * 1000; // interval单位是s，转成毫秒ms

      if (!unit && isEqual(index, 0) && item.legendItem) { // 单位
        unit = item.legendItem.units;
      }

      if (!unit2 && isEqual(index, data.length - 1) && item.legendItem) { // 单位
        unit2 = item.legendItem.units;
      }

      const seriesData = item.data && item.data.map((v, index) => {
        const arr = []; // 数据格式为：[时间戳，值]
        arr.push(beginTime + dataInterval * index);     // 加上时间戳
        arr.push(v);  // value
        return arr
      })

      const series = {
        type: 'line',
        showSymbol: false,   // 控制是否显示各个节点的样式
        hoverAnimation: false,
        lineStyle: {       // 设置线条粗细，线宽
          width: 2
        },
        name: item.name,
        yAxisIndex: isEqual(index, 0) ? 0 : 1,  // 双Y轴，指定具体的数据使用哪个Y轴
        data: seriesData
      }

      return series;
    })

    const node = document.getElementById(docId);
    const myChart = node && echarts.init(node); // 绘制图表
    myChart && myChart.setOption({
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
      backgroundColor: '#fff',
      title: {
        text: graphID,
        left: "18px",
        top: "0",
        textStyle: {
          color: "#000",
          fontSize: 14,
          fontWeight: '400'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#ccc'
          }
        },
      },
      legend: {
        data: legendData,
      },
      grid: {      //显示数据的图表位于当前canvas的坐标轴
        left: '15%',
        top: '15%'
      },
      xAxis: [{
        type: 'time',
        min: new Date(beginTime),  // 开始时间
        max: new Date(endTime),    // 结束时间
        // interval: dataInterval,

        axisLabel: {
          color: '#999',
          rotate: 15,
          textStyle: {
            fontSize: 12
          },
          formatter: function (value, index) {
            // 格式化成月/日，只在第一个刻度显示年份
            const date = new Date(value);
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            let second = date.getSeconds();
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#F3F4F4'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          color: '#999',
          textStyle: {
            fontSize: 12
          },
          formatter: function (value) {
            return value + ' ' + unit
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#F3F4F4'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
      },
      {
        axisLabel: {
          color: '#999',
          textStyle: {
            fontSize: 12
          },
          formatter: function (value) {
            return value + ' ' + unit2
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#F3F4F4'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
      }
      ],
      series: baseData
    });
  }

  render() {
    const { docId } = this.props;

    return (
      <div id={docId} style={{ width: '100%', height: 300 }}></div>
    );
  }

}

export default AutoEchart;
