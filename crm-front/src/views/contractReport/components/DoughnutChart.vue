<template>
  <div class="doughnut-chart" :style="containerStyle" ref="container"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DoughnutChart',
  props: {
    // 数据标签
    labels: {
      type: Array,
      default: () => []
    },
    // 数据系列 - 支持多种格式
    series: {
      type: Array,
      default: () => []
      // 支持的输入格式：
      // 1) 简单值数组: [15, 8, 25]
      // 2) 对象数组: [{ value: 15, name: '未付款' }, ...]
      // 3) 完整的 ECharts series 配置数组: [{ name: '数据', type: 'pie', data: [...] }, ...]
    },
    // 额外的 ECharts option 会合并到默认配置上
    options: {
      type: Object,
      default: () => ({})
    },
    // 新增单位属性
    unit: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: 250
    }
  },
  data() {
    return {
      chart: null,
      resizeHandler: null
    }
  },
  computed: {
    containerStyle() {
      const w = typeof this.width === 'number' ? `${this.width}px` : this.width
      const h = typeof this.height === 'number' ? `${this.height}px` : this.height
      return { width: w, height: h }
    }
  },
  mounted() {
    this.initChart()
    this.resizeHandler = () => {
      if (this.chart) this.chart.resize()
    }
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  watch: {
    labels: {
      handler() {
        this.updateChart()
      },
      deep: true
    },
    series: {
      handler() {
        this.updateChart()
      },
      deep: true
    },
    options: {
      handler() {
        this.updateChart()
      },
      deep: true
    },
    unit: {
      handler() {
        this.updateChart()
      }
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.container) return
      this.chart = echarts.init(this.$refs.container)
      const option = this.generateOption()
      this.chart.setOption(option, true)
    },
    updateChart() {
      if (!this.chart) {
        this.initChart()
        return
      }
      const option = this.generateOption()
      this.chart.setOption(option, true)
      this.chart.resize()
    },

    // 默认用于 pie 的基础配置（会与用户传入的 series 合并）
    defaultPieSeries() {
      return {
        name: '数据',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        }
      }
    },

    // 统一生成 option，强化对完整 series 配置（情况3）的支持与合并策略
    generateOption() {
      let userSeries = this.processSeries();

      const defaultOption = {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const { seriesName, name, value, percent } = params;
            // 使用传入的单位或默认空字符串
            const unit = this.unit || '';
            return `${seriesName} <br/>${name}: ${value}${unit} (${percent}%)`;
          }
        },
        legend: {
          data: this.extractLegendData(userSeries),
          top: 'bottom',
          left: 'center',
          width: '100%',
          height: '20%'
        },
        series: userSeries
      }

      return this.deepMerge(defaultOption, this.options)
    },

    // 新增方法：专门处理 series 数据
    processSeries() {
      // 边界情况处理
      if (!this.series || this.series.length === 0) {
        return [{
          ...this.defaultPieSeries(),
          data: this.labels?.map(label => ({ name: label, value: 0 })) || []
        }];
      }

      // 判断是否为完整 series 配置
      const isFullSeries = this.series.every(s => s && typeof s === 'object' && s.data !== undefined);

      if (isFullSeries) {
        // 处理完整 series 配置
        return this.series.map(s => {
          // 只对 pie 类型应用默认配置
          const baseConfig = (s.type === 'pie' || !s.type) ? this.defaultPieSeries() : {};

          // 合并配置并规范化数据
          const mergedSeries = { ...baseConfig, ...s };
          mergedSeries.data = this.normalizeSeriesDataItems(mergedSeries.data);

          return mergedSeries;
        });
      } else {
        // 处理简单数据格式
        return [{
          ...this.defaultPieSeries(),
          data: this.formatSeriesData()
        }];
      }
    },

    // 规范化 series.data 中每一项，确保每项为 { name, value }
    normalizeSeriesDataItems(data) {
      if (!Array.isArray(data)) return []

      // 如果 data 为简单数值数组：[1,2,3]
      if (data.length > 0 && typeof data[0] !== 'object') {
        // 使用传入的 labels 或推断的 labels
        const labels = (this.labels && this.labels.length > 0) ? this.labels : (this._inferredLabels || [])
        return data.map((v, i) => ({ name: labels[i] || `项 ${i + 1}`, value: v }))
      }

      // 如果 data 为对象数组且对象里包含 value/name，确保字段存在
      return data.map(item => {
        // 支持 {value:..., name:...} 或 {name:..., value:...}
        if (item && typeof item === 'object') {
          const name = item.name !== undefined ? item.name : (item.label !== undefined ? item.label : '')
          const value = item.value !== undefined ? item.value : (item.y !== undefined ? item.y : 0)
          return { name, value, ...item } // 保留其他自定义字段
        }
        return { name: '', value: 0 }
      })
    },

    // 处理 props.series 为简单数组或对象数组（情况1/2）
    formatSeriesData() {
      // 情况1: 空数据 => labels 映射为 value:0
      if (!this.series || this.series.length === 0) {
        return (this.labels || []).map(label => ({ name: label, value: 0 }))
      }

      // 情况2: 简单值数组 [15, 8, 25]
      if (typeof this.series[0] !== 'object') {
        return (this.labels || []).map((label, index) => ({
          name: label,
          value: this.series[index] || 0
        }))
      }

      // 情况3 (非完整 series 中的对象数组): [{value:..., name:...}, ...]
      if (this.series[0] && this.series[0].value !== undefined) {
        return this.series.map(item => ({
          name: item.name || '',
          value: item.value
        }))
      }

      // 兜底
      return []
    },

    // 从 series 中提取 legend 数据，优先使用显式 legend，否则使用 labels 或推断的 labels
    extractLegendData(series) {
      // 如果 options 中显式设置了 legend.data，会在 merge 后覆盖，这里仅提供默认
      const legendFromSeries = []
      if (Array.isArray(series)) {
        series.forEach(s => {
          if (Array.isArray(s.data)) {
            s.data.forEach(d => {
              if (d && d.name) legendFromSeries.push(d.name)
            })
          }
        })
      }

      if (legendFromSeries.length > 0) return legendFromSeries
      if (this.labels && this.labels.length > 0) return this.labels
      if (this._inferredLabels && this._inferredLabels.length > 0) return this._inferredLabels
      return []
    },

    // 深合并两个对象（返回新对象），支持 series 的合并策略在外层已处理
    deepMerge(target = {}, source = {}) {
      const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj)

      const result = Array.isArray(target) ? target.slice() : { ...target }

      for (const key in source) {
        if (!source.hasOwnProperty(key)) continue
        const srcVal = source[key]
        const tgtVal = result[key]

        if (Array.isArray(srcVal)) {
          // 对于数组直接替换（series 已在 generateOption 中处理）
          result[key] = srcVal.slice()
        } else if (isObject(srcVal)) {
          result[key] = this.deepMerge(isObject(tgtVal) ? tgtVal : {}, srcVal)
        } else {
          result[key] = srcVal
        }
      }

      return result
    }
  }
}
</script>

<style scoped>
.doughnut-chart {
  display: block;
}
</style>
