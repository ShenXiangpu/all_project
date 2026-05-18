<template>
  <div>
    <el-form :form="form">
      <el-form-item label="时间筛选" prop="month">
        <el-date-picker type="monthrange" v-model="form.month" placeholder="选择年月" format="yyyy年MM月"
          value-format="yyyy-MM"
          :default-value="getDefaultTime"
          start-placeholder="开始年月" end-placeholder="结束年月" @change="search" />
      </el-form-item>

      <el-form-item label="合同属性" prop="contract">
        <el-radio-group v-model="form.contract" @change="$emit('search', form)">
          <el-radio v-for="item in radioList" :label="item.value" :key="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'myFilter',
  props: {
    radioList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    radioList: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.form.contract = newVal[0].value;
      }
    }
  },
  components: {

  },
  created() {
    this.form.month = this.getDefaultTime;
  },
  computed: {
    getDefaultTime() {
      return [new Date(new Date().getFullYear(), new Date().getMonth() - 11), new Date()]
    }
  },
  data() {
    return {
      form: {
        month: [], //默认一年内
        contract: "deptContractType"
      }
    }
  },
  methods: {
    search() {
      //重置时间
      if (this.form.month == null) {
        this.form.month = this.getDefaultTime
        this.$nextTick(() => {
          this.form.month = this.getDefaultTime
        })
      }
      this.$emit('search', this.form);
    }
  }
}
</script>

<style lang="scss" scoped></style>
