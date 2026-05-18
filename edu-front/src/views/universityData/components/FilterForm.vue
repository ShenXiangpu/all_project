<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="高校名称" prop="universityName">
              <el-input v-model="queryParams.universityName"  placeholder="请输入高校名称"
                clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item prop="type" label="高校类型">
              <el-select class="inputClass" v-model="queryParams.type" @change="handleQuery" placeholder="请选择高校类型">
                <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="高校状态" prop="packageType">
              <el-select
                @change="handleQuery"
                v-model="queryParams.packageType"
                placeholder="请选择封装类型"
              >
                <el-option
                  v-for="item in packageTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
  </div>
</template>

<script>
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
export default {
  name: "",
  props: {
    type: {
      type: String,
      default: "EDA",
    },
  },
  components: { BorderContainer },
  computed: {
    ...mapGetters(["roleId", "roleType"]),
  },
  created() {
  },
  data() {
    return {
      packageTypeList: [
        { label: "开启", value: "关闭" },
        { label: "关闭", value: "关闭" },
      ],
      queryParams: {
        universityName: "",
        type: "",
      },
      createByList: [],
      courseList: [],
      typeList: ['985', '211', '本科', '科研机构', '其他'],
    };
  },
  methods: {

    resetQuery() {
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      this.$emit("handleQuery", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-edu {
  width: 110px;
}
</style>
