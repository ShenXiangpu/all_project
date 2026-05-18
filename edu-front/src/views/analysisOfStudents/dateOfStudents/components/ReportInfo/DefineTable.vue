<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <div>
      <el-row :gutter="1">
        <el-col class="mb-1">
          <el-popover
            placement="top"
            :title="title"
            width="200"
            trigger="hover"
            :content="plaLogin[title]"
          >

            <div
              slot="reference"
              class="text-center bgColor primaryColorw p-2 font16"
            >
            {{title}}  <i class="el-icon-question primaryColorw"></i>
            </div>
          </el-popover>
        </el-col>
        <template v-for="i in 10">
          <el-col span="8" class="mb-1">
            <div class="text-center contentBgColor primaryColorw p-2">
              第1名
            </div></el-col
          >
          <el-col span="8" class="mb-1"
            ><div class="text-center contentBgColor primaryColorw p-2">
              于江敏
            </div></el-col
          >
          <el-col span="8" class="mb-1"
            ><div class="text-center contentBgColor primaryColorw p-2">
              88分
            </div></el-col
          >
        </template>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { plaLogin } from "@/utils/html";
export default {
  name: "DefineTable",
  props: {
    title: {
      type: String,
      default: "实操分数榜",
    },
  },
  components: {},
  created() {},
  data() {
    return {
      plaLogin,
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
$title-bg-color: #10abb9;
$content-bg-color: #94d8df;

::v-deep .el-table th {
  background-color: $title-bg-color;
  color: #fff;
}

::v-deep .el-table tr {
  background-color: $content-bg-color;
  color: #fff;
}
.bgColor {
  background-color: $title-bg-color;
}
.contentBgColor {
  background-color: $content-bg-color;
}
.mb-1 {
  margin-bottom: 1px;
}
.p-2 {
  padding: 6px;
}
</style>
