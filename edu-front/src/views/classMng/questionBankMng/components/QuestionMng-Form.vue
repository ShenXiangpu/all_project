<template>
  <div class="choose-container marginBottom20">
    <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
      <el-form-item label="试题名称" prop="title" class="marginRight20">
        <el-input v-model="form.title" placeholder="请输入试题名称"></el-input>
      </el-form-item>
      <el-form-item label="公开范围" prop="ofPublic" class="marginRight20">
        <el-select v-model="form.ofPublic" placeholder="请选择试题公开范围">
          <el-option label="全部" value=""></el-option>
          <el-option label="仅自己" value="1"></el-option>
          <el-option label="所有老师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <get-university :queryParams="form"></get-university>
      <el-form-item>
        <el-button type="success" class="editSuccess" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button type="primary" class="editPrimary" icon="el-icon-refresh" @click="onCancel('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GetUniversity from "@/components/GetUniversity";
export default {
  name: 'QuestionBankChoose',
  components: {
    GetUniversity
  },

  data() {
    return {
      form: {
        title: '',
        ofPublic: '',
        universityName: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.form);
    },
    onCancel(form) {
      this.$refs[form].resetFields()
      this.$emit('onCancel');
    },

  }
}
</script>

<style lang="scss" scoped>
.choose-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  color: #000;
  font-weight: 500;

  .demo-form-inline .el-form-item {
    margin-bottom: 0;
  }
}
</style>
