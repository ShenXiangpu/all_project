<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title  fontW7 font18">基本信息</span>
      </div>
    </template>
    <el-table
      class="el-table-define"
      :data="reportObj.priamryTable"
      :header-row-class-name="tableHeader"
    >
      <el-table-column
        prop="userName"
        label="学生姓名"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="grade" label="年级" align="center">
      </el-table-column>
      <el-table-column prop="className" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="academicYear" label="学年" align="center">
      </el-table-column>
      <el-table-column prop="courseName" label="所属课程" align="center" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { propsMixin } from './propsMixin';
export default {
  name: "PrimaryInfo",
  mixins: [propsMixin],
  components: {},
  created() {},
  data() {
    return {
      tableHeader: "table-header",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$title-bg-color: #10abb9;
$content-bg-color: #94d8df;
::v-deep .el-table th {
  background-color: $title-bg-color;
  color: #fff;
}

::v-deep .el-table tr {
  background-color: #94d8df;

}

::v-deep .el-table tr:hover>td {
  background-color: #94d8df;

}
</style>
