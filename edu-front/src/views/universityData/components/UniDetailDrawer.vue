<template>
  <el-drawer append-to-body destroy-on-close @close="closeDrawer" title="我是标题" :visible="drawer"
    custom-class="detail-drawer" :with-header="false">
    <div class="detail-drawer-body">
      <detail :tableItem="tableItem" :tableData="tableData" ref="detail"></Detail>
    </div>
  </el-drawer>
</template>
<script>
import Detail from "./detail/index.vue";
import { universityUserList } from '@/api/edu/school'
export default {
  components: {
    Detail
  },
  props: {

  },
  watch: {

  },
  data() {
    return {
      drawer: false,
      tableItem: {},
      tableData: [],
    };
  },
  computed: {

  },
  watch: {
    tableItem(newVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        this.getList(newVal.id);
      }
    }
  },
  mounted() { },
  methods: {
    async getList(universityId) {
      const res = await universityUserList({ universityId})
      if (res.flag) {
        this.tableData = res.resData || [];
      }
    },
    async openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .detail-drawer {
    width: 77% !important;

    .el-drawer__body {
      padding: 0;
    }
    .detail-drawer-body {
      height: 100vh;
      overflow-y: auto;
    }
  }
}
</style>
