<template>
  <div ref="chartRef" :style="{ height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BasicBar',// 基础柱状图组件
  props: {
    labels: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] },
    height: { type: String, default: '320px' },
    title: { type: String, default: '' },
    color: { type: [String, Array], default: () => '#3398DB' },
    showTooltip: { type: Boolean, default: true },
    grid: {
      type: Object,
      default: () => ({ left: '3%', right: '4%', bottom: '3%', containLabel: true })
    },
    yAxisFormatter: {
      type: Function,
      default: null
    },
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
  methods: {
    getOption() {
      const opt = {
        grid: this.grid,
        tooltip: {
          trigger: 'item',
          formatter: (params) => this.tooltipFormatter(params)
        },
        xAxis: {
          type: 'category',
          data: this.labels,
          axisTick: { alignWithLabel: true }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (params) => this.yAxisFormatter(params)
          }
        },
        series: [
          {
            name: this.title || '值',
            type: 'bar',
            barWidth: '60%',
            data: this.series,
            itemStyle: { color: this.color }
          }
        ]
      }

      if (this.title) {
        opt.title = { text: this.title, left: 'center' }
      }
      // if (this.showTooltip) {
      //   opt.tooltip = { trigger: 'axis', axisPointer: { type: 'shadow' },formatter: this.tooltipFormatter() }
      // }

      return opt
    },
    renderChart() {
      if (!this.chart) return
      this.chart.setOption(this.getOption(), { notMerge: true })
    },
    resize() {
      if (this.chart) this.chart.resize()
    }
  },
  mounted() {
    if (!this.$refs.chartRef) return
    this.chart = echarts.init(this.$refs.chartRef)
    this.renderChart()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  watch: {
    labels: { handler() { this.renderChart() }, deep: true },
    series: { handler() { this.renderChart() }, deep: true },
    title() { this.renderChart() },
    color: { handler() { this.renderChart() }, deep: true },
    grid: { handler() { this.renderChart() }, deep: true },
    showTooltip() { this.renderChart() }
  }
}
</script>

<style scoped>
div {
  width: 100%;
}
</style>
