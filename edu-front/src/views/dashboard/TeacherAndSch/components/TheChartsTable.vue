<template>
  <el-table
    class="el-table-eda"
    :data="tableData"
    height="492px"
  >
    <el-table-column type="index" align="center" label="排名" width="50">
      <template slot-scope="scope">
        <span class="primaryColorr fontW7" v-if="scope.$index + 1 == 1">{{
          scope.$index + 1
        }}</span>
        <span class="primaryColoro fontW7" v-else-if="scope.$index + 1 == 2">{{
          scope.$index + 1
        }}</span>
        <span class="primaryColorb fontW7" v-else-if="scope.$index + 1 == 3">{{
          scope.$index + 1
        }}</span>
        <span class="fontW7" v-else>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="userName"
      align="center"
      label="姓名"
      min-width="70"
    >
    </el-table-column>
    <el-table-column
      prop="studentNum"
      align="center"
      sortable
      label="学号"
      min-width="80"
    >
    </el-table-column>
    <el-table-column
      prop="homeworkAvgScore"
      align="center"
      sortable
      label="作业平均分"
      min-width="100"
    >
    </el-table-column>
    <el-table-column
      prop="trailAvgScore"
      align="center"
      sortable
      label="实验平均分"
      min-width="100"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "",
  props: {
    tableData: {
      default: () =>[],
      type: Array,
    },
  },
  components: {},
  created() {},
  data() {
    return {
    };
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
