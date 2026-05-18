<template>
  <div class='app-container'>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(tag, index) in tags" :name="tag.name" :key="index" :label="tag.label">
        <!-- <component :is="tag.name"></component> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import Overview from './components/Overview'
import ByDepartment from './components/Department'
import ByCooperationDirection from './components/CooperationDirection'
import ByContractType from './components/ContractType'

export default {
  name: 'contractReport',
  components: {
    Overview,
    ByDepartment,
    ByCooperationDirection,
    ByContractType
  },
  created() {

  },
  data() {
    return {
      activeName: 'Overview',
      //包含的标签：总览，按所属部门，按合作方向，按合同类型
      tags: [
        {
          label: '总览',
          //英文
          name: "Overview",
        },
        {
          label: '按所属部门',
          name: "ByDepartment",
        },
        {
          label: '按合作方向',
          name: "ByCooperationDirection",
        },
        {
          label: '按合同类型',
          name: "ByContractType",
        },
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.componentName = tab.name;
    }
  }
}
</script>

<style lang="scss" scoped>
// 合同报表
::v-deep {
  #tab-Overview {
    padding-left: 20px;
  }
}
</style>
