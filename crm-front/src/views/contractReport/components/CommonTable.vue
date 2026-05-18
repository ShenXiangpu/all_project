<template>
  <el-table :data="data" stripe border style="width: 100%;" empty-text="暂无数据" maxHeight="650"
    v-loading="loading" :row-key="rowKey" :default-expand-all="defaultExpandAll" :tree-props="treeProps">
    <!-- 渲染没有子列的普通列 -->
    <el-table-column v-for="column in normalColumns" :key="column.prop" :prop="column.prop" :label="column.label"
      :width="column.width" :align="column.align || 'left'" />

    <!-- 渲染有子列的复合列 -->
    <el-table-column v-for="column in groupColumns" :key="column.prop" :label="column.label" :width="column.width"
      :align="column.align || 'left'">
      <el-table-column v-for="child in column.children" :key="child.prop" :prop="child.prop" :label="child.label"
        :width="child.width" :align="child.align || 'left'" />
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' })
    }
  },
  computed: {
    // 分离出普通列（没有children的列）
    normalColumns() {
      return this.columns.filter(column => !column.children);
    },
    // 分离出复合列（有children的列）
    groupColumns() {
      return this.columns.filter(column => column.children);
    }
  }
}
</script>
