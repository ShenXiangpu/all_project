<template>
  <el-card>
    <div class="title font18 marginBottom10">平台登录数据</div>
    <div>
      <sour-data-monitor @getFeatureOptions="getFeatureOptions" :featureData="featureData" />
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import SourDataMonitor from "./SourDataMonitor.vue";
import { getUniLoginEcharts } from "@/api/edu/school";
export default {
  name: 'VmData',
  props: {
    universityName: {
      type: String,
      default: ''
    }
  },
  components: {
    SourDataMonitor
  },
  created() {
  },
  mounted() {
    this.query();
  },
  data() {
    return {
      featureData: [],
    }
  },
  methods: {
    getFeatureOptions(interval) {
      this.query(interval);
    },
    query(interval) {
      let data = {
        interval: interval || 7,
        universityName: this.universityName
      };
      getUniLoginEcharts(data).then((res) => {
        this.featureData = res.resData || [];
      });
    },
  }
}
</script>

<style lang="scss" scoped></style>
