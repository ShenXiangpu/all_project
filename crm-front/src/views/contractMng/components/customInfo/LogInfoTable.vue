<template>
  <el-card>
    <el-table border :data="tableData" maxHeight="300" style="width: 100%" v-loading="loading">
      <el-table-column
        prop="userName"
        label="姓名"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="logInfo"
        label="日志标题"
        min-width="100"
        align="center"
        show-overflow-tooltip

      >
      </el-table-column>
      <el-table-column prop="userIp" label="IP" align="center" min-width="100">
      </el-table-column>
      <el-table-column
        prop="timeStamp"
        label="创建时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { queryLogoInfo } from "@/api/crm/contract";
export default {
  name: "mytable",
  props: {
    customerId: {
      type: String | Number,
      default: "",
    },
  },
  components: {},
  watch: {
    customerId: {
      handler(val) {
        if (val) {
          this.getList(val);
        }
      },
      immediate: true,
    },
  },
  created() {},
  computed: {},
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  methods: {
    getList(id) {
      this.loading = true;
      queryLogoInfo({ id })
        .then((res) => {
          this.tableData = res.resData;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
