<template>
  <el-card>
    <el-table border :data="quesList" style="width: 100%;" height="4rem" ref="multipleTable" :row-key="getRowKey"
      v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" :reserve-selection="true" :selectable="selectable" />
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="题库名称" min-width="90" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="directionName" label="方向" min-width="90" align="center">
      </el-table-column>
      <el-table-column prop="universityName" label="所属高校" align="center" min-width="70">
      </el-table-column>
      <el-table-column prop="num" label="题目数量(个)" align="center" min-width="90">
      </el-table-column>

      <el-table-column prop="createName" label="创建人" align="center" min-width="90">
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center" min-width="120">
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
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Pagination,
  },
  computed: {
  },
  watch: {
    tableData: {
      handler(val) {
        //执行选中和禁止取消选择,使用select状态
        this.quesList = this.handleIdsList(val); //
        this.setDefaultSelection(this.quesList);
      },
      deep: true,
      immediate: true,
    },
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
      quesList: [],
    };
  },
  destroyed() {
    this.quesList = [];
  },
  methods: {
    handleIdsList(list) {
      //传入
      let selectedIds = this.selectedIds || [];
      if (selectedIds && selectedIds.length > 0) {
        list.forEach(item => {
          selectedIds.forEach(id => {
            if (item.id === id) {
              item.isSelected = true;
            }
          });
        });
      }
      return list;
    },
    getRowKey(row) {
      return row.id; // 假设数据项中有唯一标识字段 'id'
    },
    // 假设这是在获取数据后执行的方法
    setDefaultSelection(tableData) {
      // 确保在 DOM 更新后执行
      this.$nextTick(() => {
        // 遍历表格数据
        tableData && tableData.length > 0 && tableData.forEach(row => {
          console.log(row.isSelected);
          if (row.isSelected) { // 根据某个条件判断是否选中
            this.$refs['multipleTable'].toggleRowSelection(row, true); // 选中该行
          }
        });
      });
    },
    selectable(row, index) {
      // 禁止取消选择
      return !row.isSelected;
    },
    // 申请发布
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },

    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },

  },
};
</script>

<style lang="scss" scoped></style>
