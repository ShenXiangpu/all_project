<template>
  <div>
    <n-card style="margin-bottom:12px" size="small">
      <n-space>
        <n-button type="primary" @click="openAdd">新增</n-button>
      </n-space>
    </n-card>

    <n-card>
      <n-tabs v-model:value="tabValue" @update:value="fetchData">
        <n-tab-pane name="1" tab="内部角色" />
        <n-tab-pane name="2" tab="外部角色" />
      </n-tabs>
      <n-data-table :columns="columns" :data="roleList" :loading="loading" :bordered="false" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showDialog" :title="dialogTitle" preset="card" style="width:550px" :mask-closable="false">
      <n-form ref="formRef" :model="formData" :rules="rules" label-placement="left" label-width="100px">
        <n-form-item label="角色名称" path="cnName">
          <n-input v-model:value="formData.cnName" placeholder="请输入角色名称" />
        </n-form-item>
        <n-form-item label="角色编码" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入角色编码" />
        </n-form-item>
        <n-form-item label="角色类型" path="type">
          <n-select v-model:value="formData.type" :options="[{label:'内部',value:1},{label:'外部',value:2}]" />
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input v-model:value="formData.remark" type="textarea" placeholder="备注" />
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
import { getRoleList, saveRole, updateRole, deleteRole } from '@/api/system'

const message = useMessage()
const tabValue = ref('1')
const roleList = ref([])
const loading = ref(false)
const showDialog = ref(false)
const dialogTitle = ref('新增角色')
const formRef = ref(null)
const editingId = ref(null)
const formData = ref({ cnName: '', name: '', type: 1, remark: '' })
const pagination = ref({ page: 1, pageSize: 10, showSizePicker: true, pageSizes: [10, 20, 50] })

const rules = {
  cnName: { required: true, message: '请输入角色名称', trigger: 'blur' },
  name: { required: true, message: '请输入角色编码', trigger: 'blur' },
  type: { required: true, message: '请选择角色类型', trigger: 'change' }
}

const columns = [
  { title: '角色名称', key: 'cnName', width: 150 },
  { title: '角色编码', key: 'name', width: 150 },
  { title: '类型', key: 'type', width: 100, render: (row) => h(NTag, { type: row.type === 1 ? 'primary' : 'warning', size: 'small' }, { default: () => row.type === 1 ? '内部' : '外部' }) },
  { title: '状态', key: 'status', width: 80, render: (row) => h(NTag, { type: row.status === 1 ? 'success' : 'default', size: 'small' }, { default: () => row.status === 1 ? '启用' : '停用' }) },
  { title: '备注', key: 'remark' },
  { title: '操作', key: 'action', width: 180, fixed: 'right', render: (row) => h(NSpace, null, {
    default: () => [
      h(NButton, { size: 'small', type: 'warning', ghost: true, onClick: () => openEdit(row) }, { default: () => '修改' }),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row) }, { default: () => '确定删除吗？', trigger: () => h(NButton, { size: 'small', type: 'error', ghost: true }, { default: () => '删除' }) })
    ]
  })}
]

async function fetchData() {
  loading.value = true
  const data = await getRoleList({ roleType: tabValue.value })
  roleList.value = data?.records || data || []
  loading.value = false
}

function openAdd() {
  editingId.value = null
  formData.value = { cnName: '', name: '', type: Number(tabValue.value), remark: '' }
  dialogTitle.value = '新增角色'
  showDialog.value = true
}

function openEdit(row) {
  editingId.value = row.id
  formData.value = { cnName: row.cnName, name: row.name, type: row.type, remark: row.remark || '' }
  dialogTitle.value = '编辑角色'
  showDialog.value = true
}

async function submitForm() {
  try { await formRef.value?.validate() } catch { return }
  if (editingId.value) {
    await updateRole({ ...formData.value, id: editingId.value })
    message.success('修改成功')
  } else {
    await saveRole(formData.value)
    message.success('新增成功')
  }
  showDialog.value = false
  fetchData()
}

async function handleDelete(row) {
  await deleteRole(row.id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
