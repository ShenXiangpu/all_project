<template>
  <div class='app-container'>
    <filter-form @handleQuery="handleQuery" @resetQuery="resetQuery" />
    <my-table :tableData="schoolList" :loading="loading" @handleDetail="handleDetail"></my-table>
    <uni-detail-drawer ref="uniDetailDrawer" />
  </div>
</template>

<script>
import { getUniversityData } from '@/api/edu/school';
import FilterForm from './components/FilterForm.vue';
import MyTable from './components/MyTable.vue';
import UniDetailDrawer from './components/UniDetailDrawer.vue';
export default {
  name: '',
  components: {
    FilterForm,
    MyTable,
    UniDetailDrawer
  },
  created() {
    this.handleQuery();
  },
  data() {
    return {
      schoolList: [],
    }
  },
  methods: {

    handleDetail(encodeRow) {
      let row = decodeURIComponent(encodeRow); //解码
      this.$refs.uniDetailDrawer.tableItem = row && JSON.parse(row); //转换为对象
      this.$refs.uniDetailDrawer.openDrawer();
    },
    searchQuery() {
      this.handleQuery();
    },

    //查询
    async handleQuery(params) {
      this.loading = true;
      const res = await getUniversityData(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.schoolList = resData;
      } else {
        this.loading = false;
      }
    },
    resetQuery() {
      this.handleQuery();
    },
  }
}
</script>

<style lang="scss" scoped></style>
