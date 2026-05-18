<template>
  <div>
    <h3 class="title">规则信息</h3>

    <div class="flex">
      <div>
        <el-form-item label="规则名称" prop="procName">
          <el-input
            v-model="ruleForm.procName"
            class="el-input-width"
            placeholder="请输入规则名称"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="业务类型" prop="procType">
          <el-select
            class="el-input-width"
            v-model="ruleForm.procType"
            placeholder="请选择业务类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="规则介绍" prop="remark">
          <el-input
            class="el-input-width"
            type="textarea"
            :rows="4"
            v-model="ruleForm.remark"
            placeholder="请输入规则介绍"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开启状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="`1`">开启</el-radio>
            <el-radio :label="`0`">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApprovalInfo",
  props: ["ruleForm", "rules"],
  components: {},
  created() {},
  data() {
    return {
      options: [
        { value: "线索删除", label: "线索删除" },
        { value: "客户删除", label: "客户删除" },
        { value: "合同删除", label: "合同删除" },
        { value: "供应商删除", label: "供应商删除" },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  padding: 10px 10px 10px 0;
}
.title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 10px;
  background-color: #ddd;
}
.el-input-width {
  width: 300px;
}
</style>
