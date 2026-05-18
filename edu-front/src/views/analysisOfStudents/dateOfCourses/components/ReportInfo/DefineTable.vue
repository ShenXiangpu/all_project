<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <div>
      <el-row :gutter="1">
        <el-col class="mb-1">
          <el-popover placement="top" :title="title" width="200" trigger="hover" :content="plaLogin[title]">

            <div slot="reference" class="text-center bgColor primaryColorw p-2 font16">
              {{ title }} <i class="el-icon-question primaryColorw"></i>
            </div>
          </el-popover>
        </el-col>
        <div v-for="(item, index) in newList" :key="index">
          <el-col :span="8" class="mb-1">
            <div class="text-center contentBgColor  p-2">
              第{{ item.rank }}名
            </div>
          </el-col>
          <el-col :span="8" class="mb-1">
            <div v-if="item.userName.length < 4" class="text-center contentBgColor  p-2">
              {{ item.userName }}
            </div>
            <el-tooltip v-else class="item" effect="dark" :content="item.userName" placement="top-start">
              <div class="text-center contentBgColor  p-2">
                {{ item.userNameNew }}
              </div>
            </el-tooltip>

          </el-col>
          <el-col :span="8" class="mb-1">
            <div class="text-center contentBgColor  p-2">
              {{ item.score || 0 }}{{ unit }}
            </div>
          </el-col>
        </div>
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
    list: {
      type: Array,
      default: () => [],
    },
    unit: {
      type: String,
      default: '分',
    },
  },
  watch: {
    list: {
      handler(newVal) {
        if (newVal.length === 0) {
          this.newList = [];
          return;
        }
        this.newList = newVal.map((item) => {
          return {
            ...item,
            userNameNew: item.userName.length > 4 ? item.userName.substring(0, 4) + '...' : item.userName,
          };
        });
      },
      immediate: true,
      deep: true,
    },
  },
  components: {},
  created() { },
  data() {
    return {
      plaLogin,
      tableHeader: "table-header",
      newList: []
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
