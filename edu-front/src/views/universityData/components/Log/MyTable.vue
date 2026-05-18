<template>
  <el-card>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="content" label="事件描述" min-width="180" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="type" label="事件类型" min-width="70" align="center">
      </el-table-column>
      <el-table-column label="操作人" prop="userName" align="center" min-width="60">
      </el-table-column>
      <el-table-column prop="createdAt" label="操作时间" align="center" min-width="90">
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "mytable",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [{
        name: "xxx",
      }],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
  },
  computed: {
  },
  created() { },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",

      labsList: [],
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
    };
  },
  methods: {
    // 申请发布
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },

  },
};
</script>

<style lang="scss" scoped></style>
