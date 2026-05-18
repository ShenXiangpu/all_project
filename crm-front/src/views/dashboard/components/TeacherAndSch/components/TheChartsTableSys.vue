<template>
  <el-table class="el-table-eda" border :data="tableData" height="470px">
    <el-table-column
      prop="contractName"
      align="center"
      label="合同名称"
      min-width="120"
      show-overflow-tooltip
    >
      <template slot-scope="scope"> {{ scope.row.contractName }} </template>
    </el-table-column>
    <el-table-column
      prop="days"
      align="center"
      label="剩余天数"
      min-width="90"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="到期时间"
      align="center"
      min-width="110"
    >
    </el-table-column>
    <el-table-column
      prop="contractTypeName"
      align="center"
      label="合同类型"
      min-width="90"
    >
    </el-table-column>

    <el-table-column
      prop="departmentName"
      align="center"
      label="归属部门"
      min-width="90"
      show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "",
  props: {
    tableData: {
      default: [],
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
</style>
