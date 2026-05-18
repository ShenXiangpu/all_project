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
    let xData = [];
    let unit = '';
    const baseData = data && data.map(item => {

      // 横坐标轴数据
      if (xData.length === 0) {
        xData = item.points.map(v => v[1]);
      }

      if (!unit) { // 单位
        unit = item.unit;
      }

      const series = {
        type: 'line',
        showSymbol: false,   // 控制是否显示各个节点的样式
        hoverAnimation: false,
        lineStyle: {       // 设置线条粗细，线宽
          width: 1
        },
        name: item.name,
        data: item.points.map(v => v[0]),
      }

      return series;
    })

    const node = document.getElementById(docId);
    const myChart = node && echarts.init(node); // 绘制图表
    myChart && myChart.setOption({
      color: ['#62bfe8', '#85eacb', '#34495e', '#8b92ae', '#acd8c7', '#a9e4ed'],
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
      grid: {      //显示数据的图表位于当前canvas的坐标轴
        left: '15%',
        top: '15%'
      },
      xAxis: [{
        type: 'category',
        data: xData,
        axisLabel: {
          color: '#999',
          textStyle: {
            fontSize: 12
          },
          formatter: function (value) {
            const arr = value.split(' ');
            if (arr.length > 1) {
              return arr[1] + '\n' + arr[0]
            } else {
              return value
            }
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
      }],
      series: baseData
      // series: data
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
