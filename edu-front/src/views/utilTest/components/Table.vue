<template>
  <div class="app-container">
    <el-table
      class="el-table-define"
      :data="tableData"
      :header-row-class-name="tableHeader"
    >
      <el-table-column
        prop="name"
        label="学生姓名"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="grade" label="学年" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="year" label="学年" align="center">
      </el-table-column>
      <el-table-column prop="course" label="所属课程" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  created() {},
  data() {
    return {
      tableData: [
        {
          name: "张三",
          grade: "2018",
          class: "1班",
          year: "2018",
          course: "数学",
        },

      ],
      tableHeader: "table-header",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .el-table th {
  background-color: #0497ec;
  color: #fff;
}

::v-deep .el-table tr {
  background-color: #76c1ec;
  color: #fff;
}
</style>
