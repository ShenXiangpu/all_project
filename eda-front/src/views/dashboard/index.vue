<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="24" class="marginBottom10">
        <real-time></real-time>
      </el-col>
      <!-- 中间部分左边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <!-- 平台数据监控 -->
        <el-row :gutter="10">
          <!-- 平台数据监控 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="marginBottom10">
            <data-monitor></data-monitor>
          </el-col>
          <!-- feature数据监控 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="marginBottom10">
            <fea-data-monitor></fea-data-monitor>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <sour-data-monitor></sour-data-monitor>
          </el-col>
        </el-row>
      </el-col>
      <!-- 中间部分右边 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-row :gutter="10">
          <!-- 排行榜 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="marginBottom10">
            <the-charts></the-charts>
          </el-col>
          <!-- 快捷操作 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <quick-actions></quick-actions>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RealTime from './components/RealTime.vue'
import DataMonitor from './components/DataMonitor.vue'
import FeaDataMonitor from './components/FeaDataMonitor.vue'
import SourDataMonitor from './components/SourDataMonitor.vue'
import TheCharts from './components/TheCharts.vue'
import QuickActions from './components/QuickActions.vue'

import chartsColor from '@/utils/color.js'
import { mapGetters } from 'vuex'
import {
  getCoursePageForIndex,
  getCourseInfoForIndex
} from '@/api/dashboard'



export default {
  name: 'Dashboard',
  components: {
    RealTime,
    DataMonitor,
    FeaDataMonitor,
    SourDataMonitor,
    TheCharts,
    QuickActions
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'userRolesNames',
    ])
  },
  mounted() {

  },
  destroyed() {

  }, //生命周期 - 销毁完成
  data() {
    return {
      chartsColor: chartsColor,

    }
  },
  methods: {
  }
}
</script>
<style></style>

<style lang="scss" scoped>
::v-deep {
  .el-card {

    .el-card__header {

      border-bottom: none;
      // padding: 0;

      span {
        font-size: 18px;
        font-weight: 700;
      }

    }

    .el-card__body {

      padding-top: 0px;
      // background-color: rgb(242, 248, 252);
    }
  }
}
</style>
