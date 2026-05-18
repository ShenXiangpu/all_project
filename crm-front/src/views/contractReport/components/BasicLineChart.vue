<template>
  <div ref="chart" :style="{ width: '100%', height: height + 'px' }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BasicLineChart',
  props: {
    // 支持多系列：[{ name: 'A', data: [1,2,3], smooth: true }, ...]
    seriesData: {
      type: Array,
      default: () => [{ name: 'Series 1', data: [] }]
    },
    // x 轴标签
    labels: {
      type: Array,
      default: () => []
    },
    // 图表标题（可选）
    title: {
      type: String,
      default: ''
    },
    // 是否显示面积
    showArea: {
      type: Boolean,
      default: false
    },
    // 是否平滑曲线
    smooth: {
      type: Boolean,
      default: false
    },
    // 高度（px）
    height: {
      type: Number,
      default: 300
    },
    // 颜色数组
    colors: {
      type: Array,
      default: () => ['#5470C6', '#91CC75', '#EE6666']
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true
    },
    // Y轴格式化函数
    yAxisFormatter: {
      type: Function,
      default: null
    },
    // Tooltip格式化函数
    tooltipFormatter: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.updateChart()
      }
    },
    labels() {
      this.updateChart()
    },
    height() {
      this.resizeChart()
    },
    yAxisFormatter() {
      this.updateChart()
    },
    tooltipFormatter() {
      this.updateChart()
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chart) return
      this.chart = echarts.init(this.$refs.chart)
      this.updateChart()
    },
    buildSeries() {
      return this.seriesData.map((s, idx) => {
        return {
          name: s.name || `Series ${idx + 1}`,
          type: 'line',
          data: s.data || [],
          smooth: typeof s.smooth === 'boolean' ? s.smooth : this.smooth,
          lineStyle: { width: 2 },
          symbol: 'circle',
          showSymbol: false,
          areaStyle: this.showArea ? (s.areaStyle || {}) : null,
          itemStyle: s.itemStyle || {},
          connectNulls: true
        }
      })
    },
    getOption() {
      // 构建基础配置
      const option = {
        color: this.colors,
        title: this.title ? { text: this.title, left: 'center' } : undefined,
        legend: this.showLegend ? {
          data: this.seriesData.map(s => s.name),
          left: 'center',
          top: 'bottom'
        } : undefined,
        grid: { left: 20, right: 20, bottom: 30, containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.labels
        },
        yAxis: {
          type: 'value'
        },
        series: this.buildSeries()
      };

      // 如果提供了Y轴格式化函数，则应用到Y轴
      if (this.yAxisFormatter && typeof this.yAxisFormatter === 'function') {
        option.yAxis.axisLabel = {
          formatter: (params) => this.yAxisFormatter(params)
        };
      }

      // 如果提供了tooltip格式化函数，则应用到tooltip
      if (this.tooltipFormatter && typeof this.tooltipFormatter === 'function') {
        option.tooltip = {
          trigger: 'axis',
          formatter: this.tooltipFormatter()
        };
      } else {
        // 默认tooltip配置
        option.tooltip = {
          trigger: 'axis'
        };
      }

      return option;
    },
    updateChart() {
      if (!this.chart) {
        this.initChart()
        return
      }
      const option = this.getOption()
      this.chart.setOption(option, { notMerge: false })
    },
    resizeChart() {
      if (this.chart) this.chart.resize()
    }
  }
}
</script>

<style scoped>
/* 保证容器在父级伸缩时正常显示 */
:host, .chart-container {
  display: block;
}
</style>
