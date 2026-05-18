<template>
  <div>
    <el-table class="el-table-eda" border :data="tableData" height="258px">
      <el-table-column
        align="center"
        prop="departmentName"
        label="部门名称"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="clueNums"
        align="center"
        label="线索数量"
        min-width="120"
        sortable
      >
        <template #default="scope"> {{ scope.row.clueNums || 0 }}个 </template>
      </el-table-column>
      <el-table-column
        prop="clueFollowRate"
        align="center"
        label="线索跟进率"
        min-width="120"
        sortable
      >
        <template #default="scope">
          {{ (scope.row.clueFollowRate * 100).toFixed(1) || 0 }}%
        </template>
      </el-table-column>
      <el-table-column
        prop="effectContractNums"
        align="center"
        label="生效中合同"
        min-width="120"
        sortable
      >
        <template #default="scope">
          {{ scope.row.effectContractNums || 0 }}个
        </template>
      </el-table-column>
      <el-table-column
        prop="unStartContractNums"
        align="center"
        label="待生效合同"
        min-width="120"
        sortable
      >
        <template #default="scope">
          {{ scope.row.unStartContractNums || 0 }}个
        </template>
      </el-table-column>
      <el-table-column
        prop="endedContractNums"
        align="center"
        label="已结束合同"
        min-width="120"
        sortable
      >
        <template #default="scope">
          {{ scope.row.endedContractNums || 0 }}个
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    tableData: {
      default: () => [],
      type: Array,
    },
  },
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-table-eda {
  ::v-deep {
    .el-table__row td {
      padding: 8px 0;
    }
    .has-gutter {
      color: #000;
      font-size: 15px;

      .cell {
        // font-weight: 700;
      }
    }
  }
}

.pagination {
  margin-top: 30px;
  height: 32px;
  width: 100%;
}
</style>
