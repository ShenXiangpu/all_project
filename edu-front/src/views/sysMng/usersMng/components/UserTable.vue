<template>
  <el-table max-height="600px" :data="tableData" border style="width: 100%">
    <el-table-column
      prop="userName"
      label="姓名"
      min-width="80"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="studentNum"
      label="学号"
      min-width="80"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="phone" label="手机号" min-width="100" align="center">
    </el-table-column>
    <el-table-column prop="grade" label="学年" min-width="100" align="center">
    </el-table-column>
    <el-table-column
      prop="className"
      label="地址"
      min-width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="email" label="邮箱" min-width="130" align="center">
    </el-table-column>
    <el-table-column
      prop="errorMsg"
      label="异常原因"
      min-width="100"
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "UserTable",
  components: {},
  props: {
    tableData: {
      type: String,
      default: () => {
        return [];
      },
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
