<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <my-filter @search="search" :radioList="radioList" />
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span class="font20 fontW7 primaryColor">付款状态数据</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="doughnut-chart-container">
                <div class="doughnut-chart-container-title text-center primaryBgColor font20 primaryColorw">合同数量</div>
                <doughnut-chart unit="个" :series="paymentSeries1" :options="chartOptions" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="doughnut-chart-container">
                <div class="doughnut-chart-container-title text-center primaryBgColor font20 primaryColorw">合同金额</div>
                <doughnut-chart :labels="paymentLabels" :series="paymentSeries2"
                  :options="getAmountChartOptions('payment')" />
              </div>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span class="font20 fontW7 primaryColor">合同状态数据</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="doughnut-chart-container">
                <div class="doughnut-chart-container-title text-center primaryBgColor font20 primaryColorw">合同数量</div>
                <doughnut-chart unit="个" :labels="contractStatusLabels" :series="paymentSeries3"
                  :options="chartOptions" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="doughnut-chart-container">
                <div class="doughnut-chart-container-title text-center primaryBgColor font20 primaryColorw">合同金额</div>
                <doughnut-chart :labels="contractStatusLabels" :series="paymentSeries4"
                  :options="getAmountChartOptions('contract')" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 基础合同数据 -->
      <el-col :span="24" class="marginTop20">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span class="font20 fontW7 primaryColor">基础合同数据</span>
            </div>
          </template>
          <div class="basic-line-chart-container">
            <div style="margin-bottom: 20px;">
              <el-radio-group v-model="chartType" @change="switchChartType">
                <el-radio-button label="count">合同数量</el-radio-button>
                <el-radio-button label="amount">合同金额</el-radio-button>
              </el-radio-group>
            </div>
            <!-- 折线图组件 -->
            <basic-line-chart :series-data="chartSeriesData" :labels="month" :title="chartTitle" :height="400"
              :show-area="true" :smooth="true" :y-axis-formatter="getYAxisFormatter(chartType)"
              :tooltip-formatter="getLineChartTooltipFormatter" />
          </div>
        </el-card>
      </el-col>
      <!-- 所属部门数据 -->
      <el-col :span="24" class="marginTop20">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span class="font20 fontW7 primaryColor">所属部门数据</span>
            </div>
          </template>
          <div class="basic-line-chart-container">
            <!-- 切换按钮 -->
            <div style="margin-bottom: 20px;">
              <el-radio-group v-model="departmentChartType" @change="fetchDepartmentData">
                <el-radio-button label="count">合同数量</el-radio-button>
                <el-radio-button label="amount">合同金额</el-radio-button>
              </el-radio-group>
            </div>

            <!-- 柱状图组件 -->
            <basic-bar :labels="departmentNames" :series="chartData" :title="chartTitle" :height="'400px'"
              :color="barColor" :y-axis-formatter="getYAxisFormatter(departmentChartType)"
              :tooltip-formatter="getBarChartTooltipFormatter(departmentChartType)" />

          </div>
        </el-card>
      </el-col>


      <!-- 合作方向数据 -->
      <el-col :span="24" class="marginTop20">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span class="font20 fontW7 primaryColor">合作方向数据</span>
            </div>
          </template>
          <div class="basic-line-chart-container">
            <!-- 切换按钮 -->
            <div style="margin-bottom: 20px;">
              <el-radio-group v-model="cooperationChartType" @change="fetchDepartmentData">
                <el-radio-button label="count">合同数量</el-radio-button>
                <el-radio-button label="amount">合同金额</el-radio-button>
              </el-radio-group>
            </div>

            <!-- 柱状图组件 -->
            <basic-bar :labels="cooperationNames" :series="chartData2" :title="chartTitle2" :height="'400px'"
              :color="barColor2" :y-axis-formatter="getYAxisFormatter(cooperationChartType)"
              :tooltip-formatter="getBarChartTooltipFormatter(cooperationChartType)" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyFilter from './Filter.vue'
import BasicBar from './BasicBar.vue'
import BasicLineChart from './BasicLineChart.vue'
import DoughnutChart from './DoughnutChart.vue'
import { queryBasis, queryStatus, queryCooperationData, queryDept } from '@/api/crm/contractReport'
export default {
  name: 'Overview',
  components: {
    MyFilter,
    BasicBar,
    BasicLineChart,
    DoughnutChart
  },
  created() {
    const end = new Date();
    const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
    const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const params = {
      // chatType: 1,
      contractType: 0,
      startMonth: fmt(start),
      endMonth: fmt(end)

    }
    this.queryContractDataAndAmount(params)
    this.queryPaymentStatusData(params)
    this.queryDeptContractStatus(params)
    this.queryCooperationData(params)
  },
  data() {
    return {
      radioList: [
        { name: '全部', value: '0' },
        { name: '收款合同', value: '1' },
        { name: '付款合同', value: '2' }
      ],
      // 付款状态标签
      paymentLabels: ['未付款', '部分付款', '全额付款'],
      contractStatusLabels: ['未生效', '生效中', '已结束'],



      // 付款状态数据
      paymentSeries1: [],
      paymentSeries2: [],
      paymentSeries3: [],
      paymentSeries4: [],
      chartOptions: {
        title: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
      },
      // 基础折线图数据
      chartType: 'count', // 当前图表类型：count(数量) | amount(金额)
      months: [],

      // 合同数量数据（模拟数据）
      contractCountData: [],

      // 合同金额数据（模拟数据）
      contractAmountData: [],
      month: [],

      // 所属部门柱状图数据
      departmentChartType: 'count', // count(数量) | amount(金额)
      // 部门名称
      cooperationChartType: 'count',

      departmentNames: [],
      totalContractCount: [],
      totalContractAmount: [],
      cooperationContractCount: [],
      cooperationContractAmount: [],
      cooperationNames: [],
    }
  },
  computed: {

    chartTitle() {
      return this.chartType === 'count' ? '年度合同数量统计' : '年度合同金额统计'
    },
    chartSeriesData() {
      if (this.chartType === 'count') {
        return [{
          name: '合同数量',
          data: this.contractCountData,
          smooth: true,
          areaStyle: {}
        }]
      } else {
        return [{
          name: '合同金额',
          data: this.contractAmountData,
          smooth: true,
          areaStyle: {}
        }]
      }
    },
    chartTitle() {
      return this.departmentChartType === 'count' ? '各部门合同数量统计' : '各部门合同金额统计'
    },
    chartTitle2() {
      return this.cooperationChartType === 'count' ? '合作方向合同数量统计' : '合作方向合同金额统计'
    },
    chartData() {
      // 根据当前类型返回对应数据
      return this.departmentChartType === 'count' ? this.totalContractCount : this.totalContractAmount
    },
    chartData2() {
      // 根据当前类型返回对应数据
      return this.cooperationChartType === 'count' ? this.cooperationContractCount : this.cooperationContractAmount
    },
    barColor() {
      // 根据不同类型设置不同颜色
      return this.departmentChartType === 'count' ? '#5470C6' : '#91CC75'
    }
    ,
    barColor2() {
      // 根据不同类型设置不同颜色
      return this.cooperationChartType === 'count' ? '#5470C6' : '#91CC75'
    }
  },
  methods: {

    search(params) {
      let op = params.contract;
      let month = params.month;
      let startMonth = month[0];
      let endMonth = month[1];
      if (startMonth instanceof Date && endMonth instanceof Date) {
        const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        startMonth = fmt(startMonth);
        endMonth = fmt(endMonth);


      } else {
        startMonth = month[0]
        endMonth = month[1]
      }
      const data = {
        contractType: op,
        // chatType: this.chartType === 'count' ? 1 : 2,
        startMonth,
        endMonth
      }
      this.queryContractDataAndAmount(data)
      this.queryPaymentStatusData(data)
      this.queryDeptContractStatus(data)
      this.queryCooperationData(data)
    },
    //基础合同数据合同金额
    queryContractDataAndAmount(params) {
      let contractCountData = [];
      let contractAmountData = [];
      let month = [];
      // 获取合同数据
      queryBasis(params).then(res => {
        if (res && res.flag) {
          let resData = res.resData
          resData && resData.forEach(item => {
            contractCountData.push(item.totalContractCount)
            contractAmountData.push(item.totalContractAmount)
            month.push(item.month)
          })
          this.contractCountData = contractCountData
          this.contractAmountData = contractAmountData
          this.month = month
        }
      })
    },
    switchChartType() {
      // 切换图表类型时的操作（如果需要）
      console.log('切换到:', this.chartType)
    },

    // 查询付款状态数据 和合同状态数据
    queryPaymentStatusData(params) {
      queryStatus(params)
        .then(res => {
          if (res && res.flag) {
            const resData = res.resData;
            const paymentStatus = resData.paymentStatus;
            const contractStatus = resData.contractStatus;

            // 工具函数：创建基础series配置
            const createBaseSeries = () => ({
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              data: []
            });

            // 合同数量（按付款状态）
            this.paymentSeries1 = [createBaseSeries()];
            this.paymentSeries1[0].name = '合同数量';
            this.paymentSeries1[0].data = [
              { value: paymentStatus.unpaidContractCount || 0, name: '未付款' },
              { value: paymentStatus.fullyPaidContractCount || 0, name: '全额付款' },
              { value: paymentStatus.partiallyPaidContractCount || 0, name: '部分付款' }
            ];

            // 合同金额（按付款状态）
            this.paymentSeries2 = [createBaseSeries()];
            this.paymentSeries2[0].name = '合同金额';
            this.paymentSeries2[0].data = [
              { value: paymentStatus.unpaidContractAmount || 0, name: '未付款' },
              { value: paymentStatus.fullyPaidContractAmount || 0, name: '全额付款' },
              { value: paymentStatus.partiallyPaidContractAmount || 0, name: '部分付款' }
            ];

            // 合同数量（按合同状态）
            this.paymentSeries3 = [createBaseSeries()];
            this.paymentSeries3[0].name = '合同数量';
            this.paymentSeries3[0].data = [
              { value: contractStatus.unEffectiveCount || 0, name: '未生效' },
              { value: contractStatus.effectiveCount || 0, name: '生效中' },
              { value: contractStatus.expiredCount || 0, name: '已结束' }
            ];

            // 合同金额（按合同状态）
            this.paymentSeries4 = [createBaseSeries()];
            this.paymentSeries4[0].name = '合同金额';
            this.paymentSeries4[0].data = [
              { value: contractStatus.unEffectiveAmount || 0, name: '未生效' },
              { value: contractStatus.effectiveAmount || 0, name: '生效中' },
              { value: contractStatus.expiredAmount || 0, name: '已结束' }
            ];
          }
        })
        .catch(error => {
          console.error('获取付款状态数据失败:', error);
          // 可在此处添加用户提示逻辑，比如弹窗或 Toast 显示错误信息
        });
    },


    queryDeptContractStatus(params) {
      let totalContractCount = [];
      let totalContractAmount = [];
      let departmentNames = [];
      queryDept(params).then(res => {
        if (res && res.flag) {
          const resData = res.resData;
          resData && resData.forEach(item => {
            totalContractCount.push(item.totalContractCount || 0)
            totalContractAmount.push(item.totalContractAmount || 0)
            departmentNames.push(item.month)
          })
          this.totalContractCount = totalContractCount
          this.totalContractAmount = totalContractAmount
          this.departmentNames = departmentNames
        }
      })
    },


    queryCooperationData(params) {
      let totalContractCount = [];
      let totalContractAmount = [];
      let cooperationNames = [];
      queryCooperationData(params).then(res => {
        if (res && res.flag) {
          const resData = res.resData;
          resData && resData.forEach(item => {
            totalContractCount.push(item.totalContractCount)
            totalContractAmount.push(item.totalContractAmount)
            cooperationNames.push(item.month)
          })
          this.cooperationContractCount = totalContractCount
          this.cooperationContractAmount = totalContractAmount
          this.cooperationNames = cooperationNames
        }
      })
    },


    //对金额记性处理，如果是金额，则进行格式化处理，大于10万显示万，小于10万显示具体数字,大于100000000显示亿
    formatAmount(value) {
      if (value >= 100000000) {
        return `${(value / 100000000).toFixed(2)}亿`;
      } else if (value >= 10000) {
        return `${(value / 10000).toFixed(2)}万`;
      }
      return value;
    },

    getYAxisFormatter(chartType) {
      // 根据当前图表类型返回Y轴格式化函数
      if (chartType === 'amount') {
        // 金额类型图表
        return (value) => {
          return this.formatAmount(value);
        };
      } else {
        // 数量类型图表
        return (value) => {
          return `${value}个`;
        };
      }
    },

    getLineChartTooltipFormatter() {
      return (params) => {
        const seriesName = params[0].seriesName;
        const name = params[0].name;
        const value = params[0].value;

        // 根据当前图表类型决定如何格式化tooltip
        if (this.chartType === 'amount') {
          // 金额类型
          // return `${seriesName}<br />${name}: ${this.formatAmount(value)}`;
          return `${seriesName}<br />${name}: ${value}元`;

        } else {
          // 数量类型
          return `${seriesName}<br />${name}: ${value}个`;
        }
      };
    },

    /**
 * 获取柱状图tooltip格式化函数
 * 根据传入的图表类型（数量或金额）返回相应的tooltip格式化函数
 * @param {string} chartType - 图表类型，'count'表示数量，'amount'表示金额
 * @returns {Function} tooltip格式化回调函数
 *   @param {Object|Array} params - ECharts传入的参数，可能包含单个数据项或数组
 *   @returns {string} 格式化后的tooltip字符串
 */
    getBarChartTooltipFormatter(chartType) {
      // 返回一个函数，该函数将作为ECharts的tooltip格式化器
      return (params) => {
        // 添加安全检查，防止params为undefined或null
        if (!params) {
          return '';
        }

        // 从参数中提取系列名称、数据项名称和值
        // 注意：这里需要确保params对象结构正确
        const seriesName = params.seriesName;  // 系列名称（如"合同数量"或"合同金额"）
        const name = params.name;              // 数据项名称（如部门名称或合作方向名称）
        const value = params.value;            // 数据值

        // 安全检查，防止访问未定义属性
        if (seriesName === undefined || name === undefined || value === undefined) {
          return '';
        }
        // 根据图表类型决定如何格式化tooltip显示
        if (chartType === 'amount') {
          // 金额类型：使用formatAmount方法格式化数值并添加"元"单位
          // return `${seriesName}<br />${name}: ${this.formatAmount(value)}元`;
          return `${seriesName}<br />${name}: ${value}元`;
        } else {
          // 数量类型：直接显示数值并添加"个"单位
          return `${seriesName}<br />${name}: ${value}个`;
        }
      };
    },

    getAmountChartOptions(type) {
      return {
        title: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const { seriesName, name, value, percent } = params;
            // 对金额进行格式化处理
            const formattedValue = this.formatAmount(value);
            return `${seriesName} <br/>${name}: ${formattedValue} (${percent}%)`;
          }
        }
      };
    },
    fetchDepartmentData() {
    },


  }
}
</script>

<style lang="scss" scoped>
.doughnut-chart-container {
  border: 1px solid #dcdfe6;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  padding-bottom: 20px;

  &-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
