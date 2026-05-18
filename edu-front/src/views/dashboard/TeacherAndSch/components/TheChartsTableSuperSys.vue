<template>
  <el-table class="el-table-eda" :data="tableData" height="492px">
    <el-table-column type="index" align="center" label="排名" min-width="50">
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
    <el-table-column prop="universityName" align="center" label="高校名称" min-width="100" show-overflow-tooltip>
    </el-table-column>

    <el-table-column prop="loginNum" align="center" label="平台登录次数" min-width="80">
    </el-table-column>
    <el-table-column prop="vmLoginNum" align="center" label="实操云登录次数" min-width="90">
    </el-table-column>
    <el-table-column prop="createdAt" align="center" label="创建时间" min-width="90" show-overflow-tooltip>
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
  created() { },
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
