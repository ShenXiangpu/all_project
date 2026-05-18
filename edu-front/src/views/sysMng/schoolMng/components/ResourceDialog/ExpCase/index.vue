<template>
  <div>
    <el-form-item label="实验选择" prop="trialIds">
      <el-button type="primary" icon="el-icon-plus" class="marginBottom20 marginRight20"
        @click="openDialog">添加实验</el-button><span class="">已添加</span><span class="primaryColor"> {{ itemList &&
          itemList.length || 0 }}个</span>
      <el-table :data="itemList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        max-height="500px">
        <el-table-column type="index" label="序号" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="trialName" label="实验名称" min-width="90" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="coverImageTrialTypeName" label="实验类型" min-width="90" align="center">
        </el-table-column>
        <el-table-column prop="universityName" label="所属高校" align="center" min-width="70">
        </el-table-column>
        <el-table-column prop="version" label="工具" align="center" min-width="90">
          <template #default="scope">
            <el-popover placement="top" trigger="hover">
              <div v-if="scope && scope.row.tools">
                <tools-detail :tools="scope && scope.row.tools"></tools-detail>
              </div>
              <!-- <el-tag
                v-if="scope && JSON.parse(scope.row.tools) && JSON.parse(scope.row.tools)[Object.keys(JSON.parse(scope.row.tools))[0]][0] && JSON.parse(scope.row.tools)[Object.keys(JSON.parse(scope.row.tools))[0]][0].edaTools"
                slot="reference" type="info" size="mini" class="info-container marginRight10 primaryColor">
                {{
                  JSON.parse(scope.row.tools)[Object.keys(JSON.parse(scope.row.tools))[0]][0].edaTools[0].toolName
                }} ...
              </el-tag> -->

              <el-tag
                v-if="scope && scope.row.tools && scope.row.tools[Object.keys(scope.row.tools)[0]][0] && scope.row.tools[Object.keys(scope.row.tools)[0]][0].edaTools"
                slot="reference" type="info" size="mini" class="info-container marginRight10 primaryColor">
                {{
                  scope.row.tools[Object.keys(scope.row.tools)[0]][0].edaTools[0].toolName
                }} ...
              </el-tag>
              <div v-else>暂无工具信息</div>
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
        <el-table-column prop="address" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button size="small" type="danger" class="editDanger" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <case-dialog ref="case-dialog" @handleSelectionChange="handleSelectionChange" />
  </div>
</template>

<script>
import CaseDialog from "./components/CaseDialog.vue";
import ToolsDetail from "@/views/labMng/labDetail/components/ToolsDetail.vue";
import FileInfo from "./components/FileInfo.vue";
export default {
  name: "ExpCase",
  props: {
    ruleForm: {
      type: Object,
      default: () => ({}),
    },

  },
  components: {
    CaseDialog,
    ToolsDetail,
    FileInfo
  },
  computed: {
  },
  watch: {
    'ruleForm.trials': {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.itemList = this.ruleForm.trials;

          this.itemList && this.itemList.length > 0 && this.itemList.map(i => {
            if (i && i.toolsMap) {
              i.tools = i.toolsMap;
            }
          });
          this.$emit("getIPAndPDK", this.itemList,);
        } else {
          this.itemList = [];
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() { },
  data() {
    return {
      tableData: [],
      itemList: [],
    };
  },
  methods: {
    handleDelete(row) {
      let itemList = this.itemList;
      itemList = itemList.filter((i) => {
        return row.trialId !== i.trialId;
      });
      this.itemList = itemList;
      this.$emit("getIPAndPDK", itemList);
    },
    handleSelectionChange(itemList) {
      this.itemList = itemList;
      this.$emit("getIPAndPDK", itemList);
    },
    openDialog() {
      // 打开实验选择框 需要把已经选中的实验传过去传一个数组（实验id数组）
      let itemList = this.itemList || [];
      let idList = itemList && itemList.length > 0 && itemList.map(i => {
        return i.trialId
      });

      const dia = this.$refs["case-dialog"];
      dia.dialog.visible = true;
      dia.dialog.status = 'create';
      dia.selectedIds = idList || [];
      dia.handleQuery();
    },
  },
};
</script>

<style lang="scss" scoped></style>
