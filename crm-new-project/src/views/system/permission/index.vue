<template>
  <n-split direction="horizontal" :default-size="0.4">
    <template #1>
      <n-card title="角色列表" size="small">
        <n-data-table :columns="roleColumns" :data="roleList" size="small" :bordered="false" @update:checked-row-keys="onRoleChecked" />
      </n-card>
    </template>
    <template #2>
      <n-card title="权限资源" size="small">
        <template #header-extra>
          <n-button type="primary" size="small" :disabled="!selectedRoleId" @click="savePermission">保存分配</n-button>
        </template>
        <n-tree :data="resourceTree" :virtual-scroll="false" :block-line="true" :default-checked-keys="checkedKeys" :checked-keys="checkedKeys" checkable check-strategy="all" @update:checked-keys="onCheckedChange" />
      </n-card>
    </template>
  </n-split>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMessage, NButton } from 'naive-ui'
import { getRoleList, getResources, getRoleMenus, distributeMenu } from '@/api/system'

const message = useMessage()
const roleList = ref([])
const resourceTree = ref([])
const checkedKeys = ref([])
const selectedRoleId = ref(null)
const allCheckedKeys = ref([])

const roleColumns = [
  { title: '角色名称', key: 'cnName', width: 100 },
  { title: '角色编码', key: 'name', width: 100 },
  { title: '操作', key: 'action', render: (row) => h(NButton, { size: 'small', type: 'primary', ghost: true, onClick: () => selectRole(row) }, { default: () => '分配权限' }) }
]

import { h } from 'vue'

function buildTree(list) {
  return list.map(item => ({
    label: item.name,
    key: item.id,
    children: item.children ? buildTree(item.children) : undefined
  }))
}

function collectAllKeys(list) {
  const keys = []
  list.forEach(item => {
    keys.push(item.key)
    if (item.children) keys.push(...collectAllKeys(item.children))
  })
  return keys
}

async function selectRole(row) {
  selectedRoleId.value = row.id
  const data = await getRoleMenus(row.id)
  checkedKeys.value = data || []
}

function onRoleChecked(keys) {
  if (keys.length) selectRole({ id: keys[0] })
}

function onCheckedChange(keys) {
  checkedKeys.value = keys
}

async function savePermission() {
  if (!selectedRoleId.value) return
  await distributeMenu({ roleId: selectedRoleId.value, menuIds: checkedKeys.value })
  message.success('分配成功')
}

async function fetchData() {
  const [roles, resources] = await Promise.all([getRoleList({}), getResources()])
  roleList.value = roles?.records || roles || []
  resourceTree.value = buildTree(resources || [])
  allCheckedKeys.value = collectAllKeys(resourceTree.value)
}

onMounted(fetchData)
</script>
