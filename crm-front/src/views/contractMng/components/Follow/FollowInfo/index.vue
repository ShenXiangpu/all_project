<template>
  <div>
    <div class="marginBottom20 font16 fontW7">
      <span class="primaryColoro">*</span> 跟进
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form-item label="跟进内容" prop="content">
          <el-input class="el-input-edu" placeholder="请输入跟进内容"
            v-model="formData.content" :maxlength="64" show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="下次跟进时间" prop="contract.nextFollowTime">
            <el-select v-if="formData && formData.contract" placeholder="请选择下次跟进时间"
              v-model="formData.contract.nextFollowTime" clearable>
              <el-option v-for="(opt, idx) in nextFollowOptions" :key="idx" :label="getLabel(opt)"
                :value="getValue(opt)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="跟进状态" prop="contract.followStatus">
            <el-select v-if="formData && formData.contract" placeholder="请选择跟进状态"
              v-model="formData.contract.followStatus" clearable>
              <el-option v-for="(opt, idx) in statusOptions" :key="idx" :label="getLabel(opt)" :value="getValue(opt)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="跟进方式" prop="contract.followMethod">
            <el-select v-if="formData && formData.contract" placeholder="请选择跟进方式"
              v-model="formData.contract.followMethod" clearable>
              <el-option v-for="(opt, idx) in methodOptions" :key="idx" :label="getLabel(opt)" :value="getValue(opt)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FollowInfo',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // parent binds v-model="..." -> value contains the form object
    value: {
      type: Object,
      default: () => ({ contract: {} })
    },
    // options arrays from parent, each item can be string or { value, label }
    nextFollowOptions: {
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
    }
  },
  computed: {
    formData: {
      get() {
        return this.value || { contract: {} }
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
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
