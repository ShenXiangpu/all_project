<template>
  <el-card>
    <div class="title font18 marginBottom10">资源数量</div>
    <div class="flex justify-between align-center flex-wrap container">
      <div class="flex flex-column align-center container-item" v-for="item in resourceList" :key="item.name">
        <div class="font16 fontW7 primaryColorb marginBottom10">{{ item.value }}个</div>
        <div class="font16 fontW7">{{ item.name }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ResourceData',
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {

  },
  watch: {
    tableItem: {
      handler(newVal, oldVal) {
        if (newVal) {
          // 在这里处理 tableItem 变化后的逻辑
          let array = [
            {
              name: "实验案例",
              value: newVal.trialNum || 0,
            },
            {
              name: "题库资源",
              value: newVal.quBankNum || 0,
            },
            {
              name: "PDK资源",
              value: newVal.pdkNum || 0,
            },
            {
              name: "IP资源",
              value: newVal.ipNum || 0,
            },
            {
              name: "EDA工具",
              value: newVal.toolNum || 0,
            },
            {
              name: "Lab资源",
              value: newVal.labNum || 0,
            },
          ]
          this.resourceList = array;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {

  },
  data() {
    return {
      resourceList: [
        {
          name: "实验案例",
          value: 0,
        },
        {
          name: "题库资源",
          value: 0,
        },
        {
          name: "PDK资源",
          value: 0,
        },
        {
          name: "IP资源",
          value: 0,
        },
        {
          name: "EDA工具",
          value: 0,
        },
        {
          name: "Lab资源",
          value: 0,
        },
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
  background-color: #f8f9ff;

  .container-item {
    padding: 10px;
    color: #999;
  }
}
</style>
