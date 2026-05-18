<template>
  <div>
    <div class="marginBottom20 font16 fontW7">
      <span class="primaryColoro"></span> 跟进记录
    </div>

    <el-table :data="data || []" stripe border maxHeight="300" style="width: 100%" :empty-text="emptyText">
      <el-table-column v-for="col in resolvedColumns" :key="col.key" :label="col.label" :width="col.width"
        :min-width="col.minWidth" :prop="col.field || (Array.isArray(col.fields) ? col.fields[0] : col.fields)" :align="col.align || 'center'">
        <template v-slot="scope">
          <!-- 辅助表达式：如果 col.fields 是字符串则归一为数组 -->
          <template v-if="$scopedSlots.cell">
            <slot name="cell" :row="scope.row"
              :col="Array.isArray(col.fields) ? col : Object.assign({}, col, { fields: col.fields ? [col.fields] : [] })">
              <span v-if="!col.preWrap">
                {{ renderCell(scope.row, Array.isArray(col.fields) ? col : Object.assign({}, col, {
                  fields: col.fields ?
                    [col.fields] : []
                })) }}
              </span>
              <div v-else style="white-space: pre-wrap; word-break: break-word;">
                {{ renderCell(scope.row, Array.isArray(col.fields) ? col : Object.assign({}, col, {
                  fields: col.fields ?
                    [col.fields] : []
                })) }}
              </div>
            </slot>
          </template>

          <template v-else>
            <div v-if="col.preWrap" style="white-space: pre-wrap; word-break: break-word;">
              {{ renderCell(scope.row, Array.isArray(col.fields) ? col : Object.assign({}, col, {
                fields: col.fields ?
                  [col.fields] : []
              })) }}
            </div>
            <span v-else>
              {{ renderCell(scope.row, Array.isArray(col.fields) ? col : Object.assign({}, col, {
                fields: col.fields ?
                  [col.fields] : []
              })) }}
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FollowList',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    statusOptions: {
      type: Array,
      default: () => []
    },
    methodOptions: {
      type: Array,
      default: () => []
    },
    nextFollowOptions: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  computed: {
    defaultColumns() {
      return [
        { key: 'followUser', label: '跟进人', width: 140, fields: ['userName', 'followUser', 'creator', 'owner'] },
        { key: 'content', label: '跟进内容', fields: ['content', 'remark'], preWrap: true },
        { key: 'status', label: '跟进状态', width: 120, field: 'status', type: 'option', optionsProp: 'statusOptions' },
        { key: 'method', label: '跟进方式', width: 120, field: 'method', type: 'option', optionsProp: 'methodOptions' },
        { key: 'nextFollowTime', label: '下次跟进时间', width: 180, fields: ['nextFollowTime', 'next_follow_time'] },
        { key: 'createTime', label: '创建时间', width: 180, fields: ['createTime', 'createdAt', 'create_time'] }
      ]
    },
    resolvedColumns() {
      console.log("this.columns", this.columns);

      return (this.columns && this.columns.length) ? this.columns : this.defaultColumns
    },
    // 预构建的 options maps，键为 optionsProp 名称
    optionsMaps() {
      const build = (arr) => {
        const m = new Map()
        if (!Array.isArray(arr)) return m
        for (const opt of arr) {
          const k = this.getValue(opt)
          // 以字符串 key 保证一致性（Map 可接受任意类型，但统一化有利于查找）
          m.set(k === undefined || k === null ? '' : String(k), this.getLabel(opt))
        }
        return m
      }
      return {
        // 构建状态选项数据
        statusOptions: build(this.statusOptions),
        // 构建方法选项数据
        methodOptions: build(this.methodOptions),
        // 构建下次跟进选项数据
        nextFollowOptions: build(this.nextFollowOptions)
      }
    }
  },
  methods: {
    renderCell(row, col) {
      if (!col) return '-'

      // 处理 option 类型：直接从预构建的 map 查找
      if (col.type === 'option') {
        const val = row[col.field]
        if (val === undefined || val === null || val === '') return '-'
        const map = this.optionsMaps[col.optionsProp] || new Map()
        const label = map.get(String(val))
        return label ?? this.fallbackValue(val)
      }

      // 单字段优先
      if (col.field) {
        const v = row[col.field]
        return this.fallbackValue(v)
      }

      // 多候选字段
      if (col.fields && col.fields.length) {
        for (const f of col.fields) {
          const v = row[f]
          if (v !== undefined && v !== null && v !== '') return String(v)
        }
        return '-'
      }

      return '-'
    },
    // 统一格式化空值显示
    fallbackValue(v) {
      if (v === undefined || v === null || v === '') return '-'
      return String(v)
    },
    getLabel(opt) {
      if (opt && typeof opt === 'object') return opt.label ?? opt.name ?? String(opt.value ?? '')
      return String(opt)
    },
    getValue(opt) {
      if (opt && typeof opt === 'object') return opt.value ?? opt.id ?? opt.label ?? opt.name
      return opt
    }
  }
}
</script>

<style lang="scss" scoped></style>
