<template>
  <div class='app-container'>
    <el-row :gutter="10">
      <!-- 用户列表 -->
      <el-col :span="6">
        <user-list :tableData="tableData"></user-list>
      </el-col>

      <el-col :span="18">
        <!-- 学校信息 -->
        <el-col :span="24" class="marginBottom10">
          <uni-detail :tableItem="tableItem"></uni-detail>
        </el-col>
        <!-- 资源数据 -->
        <el-col :span="24" class="marginBottom10">
          <resource-data :tableItem="tableItem"></resource-data>
        </el-col>
        <!-- 资源监控 -->
        <el-col :span="24" class="marginBottom10">
          <resource-monitor :universityName="tableItem.universityName"></resource-monitor>
        </el-col>
        <!-- 平台和实操云数据 -->
        <el-col :span="24" class="marginBottom10">
          <vm-data :universityId="tableItem.id"></vm-data>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserList from './components/UserList.vue';
import UniDetail from './components/UniDetail.vue';
import ResourceMonitor from './components/ResourceMonitor.vue';
import ResourceData from './components/ResourceData.vue';
import VmData from './components/VmData.vue';
export default {
  name: 'Detail',
  components: {
    UserList,
    UniDetail,
    ResourceMonitor,
    ResourceData,
    VmData,
  },
  props: {
    tableItem: {
      type: Object,
      default: () => { }
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  created() {
    let encodeRow = this.$route.query.encodeRow;//获取路由参数
    let row = decodeURIComponent(encodeRow); //解码
    this.tableItem = row && JSON.parse(row); //转换为对象
  },
  data() {
    return {
      tableItem: {},
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped></style>
