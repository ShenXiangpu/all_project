<template>
  <div>
    <n-card style="margin-bottom:12px" size="small">
      <n-space align="center">
        <n-input v-model:value="queryParams.keyword" placeholder="用户名称" clearable style="width:180px" @keyup.enter="fetchData" />
        <n-select v-model:value="queryParams.status" placeholder="用户状态" clearable style="width:130px" :options="[{label:'启用',value:'1'},{label:'停用',value:'0'}]" @update:value="fetchData" />
        <n-button type="primary" @click="fetchData">搜索</n-button>
        <n-button @click="resetQuery">重置</n-button>
        <n-button type="primary" @click="openAdd">新增用户</n-button>
      </n-space>
    </n-card>

    <n-card>
      <n-data-table :columns="columns" :data="userList" :loading="loading" :bordered="false" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showDialog" :title="dialogTitle" preset="card" style="width:600px" :mask-closable="false">
      <n-form ref="formRef" :model="formData" :rules="rules" label-placement="left" label-width="100px">
        <n-form-item label="用户名" path="userName">
          <n-input v-model:value="formData.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="昵称" path="nickName">
          <n-input v-model:value="formData.nickName" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="formData.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="状态">
          <n-switch v-model:value="formData.status" :checked-value="1" :unchecked-value="0" />
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
import { getUserList, saveUser, updateUser, deleteUser } from '@/api/system'

const message = useMessage()
const userList = ref([])
const loading = ref(false)
const showDialog = ref(false)
const dialogTitle = ref('新增用户')
const formRef = ref(null)
const editingId = ref(null)
const queryParams = ref({ keyword: '', status: null })
const formData = ref({ userName: '', nickName: '', phone: '', email: '', status: 1 })
const pagination = ref({ page: 1, pageSize: 10, showSizePicker: true, pageSizes: [10, 20, 50] })

const rules = {
  userName: { required: true, message: '请输入用户名', trigger: 'blur' },
  nickName: { required: true, message: '请输入昵称', trigger: 'blur' }
}

const columns = [
  { title: '用户名', key: 'userName', width: 120 },
  { title: '昵称', key: 'nickName', width: 120 },
  { title: '所属部门', key: 'deptName', width: 120 },
  { title: '手机号', key: 'phone', width: 130 },
  { title: '邮箱', key: 'email', width: 180 },
  { title: '状态', key: 'status', width: 80, render: (row) => h(NTag, { type: row.status === 1 ? 'success' : 'default', size: 'small' }, { default: () => row.status === 1 ? '启用' : '停用' }) },
  { title: '创建时间', key: 'createTime', width: 170 },
  { title: '操作', key: 'action', width: 180, fixed: 'right', render: (row) => h(NSpace, null, {
    default: () => [
      h(NButton, { size: 'small', type: 'warning', ghost: true, onClick: () => openEdit(row) }, { default: () => '修改' }),
      h(NPopconfirm, { onPositiveClick: () => handleDelete(row) }, { default: () => '确定删除吗？', trigger: () => h(NButton, { size: 'small', type: 'error', ghost: true }, { default: () => '删除' }) })
    ]
  })}
]

async function fetchData() {
  loading.value = true
  const data = await getUserList(queryParams.value)
  userList.value = data?.records || data || []
  loading.value = false
}

function resetQuery() {
  queryParams.value = { keyword: '', status: null }
  fetchData()
}

function openAdd() {
  editingId.value = null
  formData.value = { userName: '', nickName: '', phone: '', email: '', status: 1 }
  dialogTitle.value = '新增用户'
  showDialog.value = true
}

function openEdit(row) {
  editingId.value = row.id
  formData.value = { userName: row.userName, nickName: row.nickName, phone: row.phone, email: row.email, status: row.status }
  dialogTitle.value = '编辑用户'
  showDialog.value = true
}

async function submitForm() {
  try { await formRef.value?.validate() } catch { return }
  const submitData = { ...formData.value }
  if (editingId.value) {
    await updateUser({ ...submitData, id: editingId.value })
    message.success('修改成功')
  } else {
    await saveUser(submitData)
    message.success('新增成功')
  }
  showDialog.value = false
  fetchData()
}

async function handleDelete(row) {
  await deleteUser(row.id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
