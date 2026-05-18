<template>
  <div>
    <n-card style="margin-bottom:12px">
      <n-space>
        <n-input v-model:value="queryParams.keyword" placeholder="菜单名称" clearable style="width:200px" @keyup.enter="fetchData" />
        <n-button type="primary" @click="fetchData">搜索</n-button>
        <n-button @click="resetQuery">重置</n-button>
      </n-space>
    </n-card>

    <n-card>
      <template #header>
        <n-button type="primary" @click="handleAdd()">新增</n-button>
      </template>
      <n-data-table :columns="columns" :data="menuData" :loading="loading" :bordered="false" :row-key="(r) => r.id" />
    </n-card>

    <n-modal v-model:show="showDialog" :title="dialogTitle" preset="card" style="width:700px" :mask-closable="false">
      <n-form ref="formRef" :model="formData" :rules="rules" label-placement="left" label-width="100px">
        <n-form-item label="上级菜单" path="parentId">
          <n-tree-select :options="parentOptions" v-model:value="formData.parentId" placeholder="选择上级菜单" clearable />
        </n-form-item>
        <n-form-item label="菜单名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入菜单名称" />
        </n-form-item>
        <n-form-item label="菜单类型" path="type">
          <n-radio-group v-model:value="formData.type">
            <n-radio value="CATALOG">目录</n-radio>
            <n-radio value="MENU">菜单</n-radio>
            <n-radio value="BUTTON">按钮</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="formData.type !== 'BUTTON'" label="路由路径" path="path">
          <n-input v-model:value="formData.path" :placeholder="formData.type === 'CATALOG' ? '/system' : 'user'" />
        </n-form-item>
        <n-form-item v-if="formData.type === 'MENU'" label="组件路径" path="component">
          <n-input v-model:value="formData.component" placeholder="system/menu/index" />
        </n-form-item>
        <n-form-item v-if="formData.type === 'BUTTON'" label="权限标识" path="perm">
          <n-input v-model:value="formData.perm" placeholder="system:user:add" />
        </n-form-item>
        <n-form-item label="排序" path="sort">
          <n-input-number v-model:value="formData.sort" :min="0" style="width:100px" />
        </n-form-item>
        <n-form-item label="状态">
          <n-radio-group v-model:value="formData.visible">
            <n-radio :value="1">显示</n-radio>
            <n-radio :value="0">隐藏</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showDialog = false">取消</n-button>
          <n-button type="primary" @click="submitForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import { useMessage, NTag, NButton, NSpace, NPopconfirm } from 'naive-ui'
import { getMenuList, getMenuDetail, saveMenu, updateMenu, deleteMenu } from '@/api/system'

const message = useMessage()
const menuData = ref([])
const loading = ref(false)
const showDialog = ref(false)
const dialogTitle = ref('新增')
const formRef = ref(null)
const parentOptions = ref([])

const queryParams = ref({ keyword: '' })
const formData = ref(getDefaultForm())
const editingId = ref(null)

function getDefaultForm() {
  return { parentId: null, name: '', type: 'MENU', path: '', component: '', perm: '', icon: '', visible: 1, sort: 0 }
}

const rules = {
  name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
  type: { required: true, message: '请选择菜单类型', trigger: 'change' }
}

function buildTreeOptions(list) {
  return list.map(item => {
    const opt = { label: item.name, key: item.id }
    if (item.children && item.children.length) {
      opt.children = buildTreeOptions(item.children.filter(c => c.type !== 'BUTTON'))
    }
    return opt
  })
}

const columns = [
  { title: '菜单名称', key: 'name', minWidth: 200, type: 'expand', children: (row) => {
    if (row.type === 'BUTTON') return '-'
    return row.icon ? `${row.name}` : row.name
  }},
  { title: '菜单类型', key: 'type', width: 100, render: (row) => {
    const map = { CATALOG: ['warning', '目录'], MENU: ['primary', '菜单'], BUTTON: ['error', '按钮'] }
    const [t, l] = map[row.type] || ['default', row.type]
    return h(NTag, { type: t, size: 'small' }, { default: () => l })
  }},
  { title: '权限标识', key: 'perm', width: 180 },
  { title: '状态', key: 'visible', width: 80, render: (row) => h(NTag, { type: row.visible === 1 ? 'success' : 'default', size: 'small' }, { default: () => row.visible === 1 ? '显示' : '隐藏' }) },
  { title: '排序', key: 'sort', width: 60 },
  { title: '操作', key: 'action', width: 240, fixed: 'right', render: (row) => h(NSpace, null, {
    default: () => [
      row.type !== 'BUTTON' ? h(NButton, { size: 'small', type: 'primary', ghost: true, onClick: () => handleAdd(row) }, { default: () => '新增' }) : null,
      h(NButton, { size: 'small', type: 'warning', ghost: true, onClick: () => handleEdit(row) }, { default: () => '修改' }),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row) }, { default: () => '确定删除吗？', trigger: () => h(NButton, { size: 'small', type: 'error', ghost: true }, { default: () => '删除' }) })
    ]
  })}
]

async function fetchData() {
  loading.value = true
  const data = await getMenuList(queryParams.value)
  menuData.value = data || []
  parentOptions.value = [{ label: '顶级菜单', key: null, children: buildTreeOptions(data || []) }]
  loading.value = false
}

function resetQuery() {
  queryParams.value = { keyword: '' }
  fetchData()
}

function handleAdd(row) {
  editingId.value = null
  formData.value = getDefaultForm()
  formData.value.parentId = row ? row.id : null
  dialogTitle.value = '新增'
  showDialog.value = true
}

async function handleEdit(row) {
  const data = await getMenuDetail(row.id)
  editingId.value = row.id
  formData.value = { ...getDefaultForm(), ...data, parentId: data.parentId === 0 ? null : data.parentId }
  dialogTitle.value = '修改'
  showDialog.value = true
}

async function submitForm() {
  try {
    await formRef.value?.validate()
  } catch { return }
  const data = { ...formData.value, parentId: formData.value.parentId || 0 }
  if (editingId.value) {
    await updateMenu({ ...data, id: editingId.value })
    message.success('修改成功')
  } else {
    await saveMenu(data)
    message.success('新增成功')
  }
  showDialog.value = false
  fetchData()
}

async function handleDelete(row) {
  await deleteMenu(row.id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
