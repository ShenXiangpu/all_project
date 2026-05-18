<template>
  <div>
    <n-card>
      <n-data-table :columns="columns" :data="orgList" :loading="loading" :bordered="false" :row-key="(r) => r.id">
        <template #empty>暂无数据</template>
      </n-data-table>
    </n-card>

    <!-- Dept dialog -->
    <n-modal v-model:show="showDeptDialog" :title="deptTitle" preset="card" style="width:500px" :mask-closable="false">
      <n-form ref="deptFormRef" :model="deptForm" label-placement="left" label-width="80px">
        <n-form-item label="部门名称" path="name">
          <n-input v-model:value="deptForm.name" placeholder="请输入部门名称" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showDeptDialog = false">取消</n-button>
          <n-button type="primary" @click="submitDept">确定</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- Post dialog -->
    <n-modal v-model:show="showPostDialog" :title="postTitle" preset="card" style="width:500px" :mask-closable="false">
      <n-form ref="postFormRef" :model="postForm" label-placement="left" label-width="80px">
        <n-form-item label="职位名称" path="name">
          <n-input v-model:value="postForm.name" placeholder="请输入职位名称" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showPostDialog = false">取消</n-button>
          <n-button type="primary" @click="submitPost">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import { useMessage, NButton, NSpace, NPopconfirm, NButtonGroup } from 'naive-ui'
import { getOrgList, saveDept, updateDept, deleteDept, savePost, updatePost, deletePost } from '@/api/system'

const message = useMessage()
const orgList = ref([])
const loading = ref(false)
const showDeptDialog = ref(false)
const showPostDialog = ref(false)
const deptTitle = ref('新增部门')
const postTitle = ref('新增职位')
const deptFormRef = ref(null)
const postFormRef = ref(null)
const deptForm = ref({ name: '' })
const postForm = ref({ name: '', deptId: null })
const editingDeptId = ref(null)
const editingPostId = ref(null)

const columns = [
  { title: '部门名称', key: 'name', minWidth: 200, type: 'expand' },
  { title: '职位列表', key: 'posts', render: (row) => {
    if (!row.postList?.length) return '暂无职位'
    return h(NSpace, { wrap: true }, { default: () => row.postList.map(p => p.postName).join('、') })
  }},
  { title: '操作', key: 'action', width: 320, fixed: 'right', render: (row) => h(NSpace, null, {
    default: () => [
      h(NButton, { size: 'small', type: 'primary', ghost: true, onClick: () => openDeptDialog(row) }, { default: () => '编辑部门' }),
      h(NButton, { size: 'small', type: 'success', ghost: true, onClick: () => openPostDialog(null, row.id) }, { default: () => '新增职位' }),
      h(NPopconfirm, { onPositiveClick: () => handleDeleteDept(row) }, { default: () => '确定删除该部门吗？', trigger: () => h(NButton, { size: 'small', type: 'error', ghost: true }, { default: () => '删除' }) })
    ]
  })}
]

// Add children rows for posts
function flattenOrg(data) {
  const result = []
  data.forEach(dept => {
    result.push(dept)
    if (dept.postList?.length) {
      dept.postList.forEach(p => {
        result.push({ ...p, _isPost: true, _parentName: dept.name, id: `p_${p.id}` })
      })
    }
  })
  return result
}

async function fetchData() {
  loading.value = true
  const data = await getOrgList()
  orgList.value = flattenOrg(data || [])
  loading.value = false
}

function openDeptDialog(row) {
  if (row) {
    editingDeptId.value = row.id
    deptForm.value = { name: row.name }
    deptTitle.value = '编辑部门'
  } else {
    editingDeptId.value = null
    deptForm.value = { name: '' }
    deptTitle.value = '新增部门'
  }
  showDeptDialog.value = true
}

function openPostDialog(row, deptId) {
  if (row) {
    editingPostId.value = row.id
    postForm.value = { name: row.postName || row.name, deptId: row.deptId || deptId }
    postTitle.value = '编辑职位'
  } else {
    editingPostId.value = null
    postForm.value = { name: '', deptId }
    postTitle.value = '新增职位'
  }
  showPostDialog.value = true
}

async function submitDept() {
  if (!deptForm.value.name) { message.error('请输入部门名称'); return }
  if (editingDeptId.value) {
    await updateDept({ id: editingDeptId.value, name: deptForm.value.name })
    message.success('修改成功')
  } else {
    await saveDept(deptForm.value)
    message.success('新增成功')
  }
  showDeptDialog.value = false
  fetchData()
}

async function submitPost() {
  if (!postForm.value.name) { message.error('请输入职位名称'); return }
  if (editingPostId.value) {
    await updatePost({ id: editingPostId.value, name: postForm.value.name })
    message.success('修改成功')
  } else {
    await savePost(postForm.value)
    message.success('新增成功')
  }
  showPostDialog.value = false
  fetchData()
}

async function handleDeleteDept(row) {
  await deleteDept(row.id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
