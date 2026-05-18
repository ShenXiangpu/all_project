<template>
  <div>
    <n-grid :cols="4" :x-gap="12" :y-gap="12">
      <n-gi v-for="item in dictList" :key="item.dictType">
        <n-card :title="item.dictName" hoverable @click="openDict(item)">
          <n-tag>{{ item.dictType }}</n-tag>
          <template #footer>
            <n-space justify="space-between">
              <span>{{ item.remark }}</span>
              <n-button size="tiny" quaternary @click.stop="openDict(item)">管理</n-button>
            </n-space>
          </template>
        </n-card>
      </n-gi>
    </n-grid>

    <n-modal v-model:show="showModal" :title="currentDict?.dictName" preset="card" style="width:600px">
      <n-data-table :columns="dictColumns" :data="dictData" :bordered="false" :max-height="400" />
    </n-modal>
  </div>
</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import { NTag, NButton, NSpace } from 'naive-ui'
import { getDictList, getDictData } from '@/api/system'

const dictList = ref([])
const showModal = ref(false)
const currentDict = ref(null)
const dictData = ref([])

const dictColumns = [
  { title: '标签', key: 'label', width: 120 },
  { title: '键值', key: 'value', width: 120 },
  { title: '状态', key: 'status', render: (row) => h(NTag, { type: row.status === '1' ? 'success' : 'default' }, { default: () => row.status === '1' ? '启用' : '停用' }) }
]

async function fetchDicts() {
  const data = await getDictList()
  dictList.value = Object.entries(data).map(([dictType, items]) => ({
    dictType,
    dictName: dictType,
    remark: `${items.length} 项`,
    items
  }))
}

async function openDict(item) {
  currentDict.value = item
  const data = await getDictData(item.dictType)
  dictData.value = (data.records || data) || []
  showModal.value = true
}

onMounted(fetchDicts)
</script>
