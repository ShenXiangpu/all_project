<template>
  <el-card>
    <el-table border :data="expList" style="width: 100%" height="4rem" v-loading="loading"
      @selection-change="handleSelectionChange" ref="multipleTable" :row-key="getRowKey">
      <el-table-column type="selection" :selectable="selectable" width="55" align="center"
        :reserve-selection="true"></el-table-column>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="trialName" label="实验名称" min-width="90" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="coverImageTrialTypeName" label="实验类型" min-width="90" align="center">
      </el-table-column>
      <el-table-column prop="universityName" label="所属高校" align="center" min-width="70" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="version" label="工具" align="center" min-width="90">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <div>
              <tools-detail :tools="scope && scope.row.tools"></tools-detail>
            </div>
            <el-tag slot="reference" type="info" size="mini" class="info-container marginRight10 primaryColor">
              {{
                scope.row.tools[Object.keys(scope && scope.row.tools)[0]][0].edaTools[0].toolName
              }} ...
            </el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文件" align="center" min-width="90">
        <template #default="scope">
          <file-info :row="scope.row"></file-info>
        </template>
      </el-table-column>
      <el-table-column prop="recommendStandard" label="推荐配置" align="center" min-width="90">
      </el-table-column>
      <el-table-column prop="createByName" label="创建人" align="center" min-width="90">
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" align="center" min-width="120">
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
import ToolsDetail from "@/views/labMng/labDetail/components/ToolsDetail.vue";
import FileInfo from "./FileInfo.vue";
export default {
  name: "mytable",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [],
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
  watch: {
    tableData: {
      handler(val) {
        //执行选中和禁止取消选择,使用select状态
        this.expList = this.handleIdsList(val); //
        this.setDefaultSelection(this.expList);
      },
      deep: true,
      immediate: true,
    },

  },
  destroyed() {
    this.expList = [];
  },
  components: {
    Pagination,
    ToolsDetail,
    FileInfo,
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
      expList: [],

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

    handleIdsList(list) {
      //传入
      let selectedIds = this.selectedIds || [];
      if (selectedIds && selectedIds.length > 0) {
        list.forEach(item => {
          selectedIds.forEach(id => {
            if (item.trialId === id) {
              item.isSelected = true;
            }
          });
        });
      }
      return list;
    },
    getRowKey(row) {
      return row.trialId; // 假设数据项中有唯一标识字段 'id'
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
