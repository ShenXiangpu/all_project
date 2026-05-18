<template>
  <el-card>
    <div class="title font18 marginBottom10">实操云登录数据</div>
    <div>
      <sour-data-monitor @getFeatureOptions="getFeatureOptions" docId="vm" graphID="vm" :featureData="featureData" />
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import SourDataMonitor from "./SourDataMonitor.vue";
import { getUniVncLoginEcharts } from "@/api/edu/school";
export default {
  name: 'VmData',
  props: {
    universityId: {
      type: String | Number,
      default: '' || 0
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
        universityId: this.universityId
      };
      getUniVncLoginEcharts(data).then((res) => {
        this.featureData = res.resData || [];
      });
    },
  }
}
</script>

<style lang="scss" scoped></style>
