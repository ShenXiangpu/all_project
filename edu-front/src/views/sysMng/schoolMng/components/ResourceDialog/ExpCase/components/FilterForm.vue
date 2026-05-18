<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item prop="trialName" label="实验名称">
              <el-input v-model="queryParams.trialName" placeholder="请输入实验名称"
                clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <!-- <el-form-item prop="createByName" label="创建人">
              <el-select class="inputClass" v-model="queryParams.createByName" @change="handleQuery" placeholder="请选择高校类型">
                <el-option v-for="item in userOperateTypeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item> -->

            <get-university v-if="userRolesNames === '系统最高管理员'" :queryParams="queryParams" @change="handleQuery"/>
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
import GetUniversity from "@/components/GetUniversity";
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
export default {
  name: "",
  props: {
    userOperateTypeList: {
      type: Array,
      default: () => [],
    },
  },
  components: { BorderContainer,GetUniversity },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {
  },
  data() {
    return {

      queryParams: {
        trialName: "",
        createByName: "",
        universityName: "",
      },
    };
  },
  methods: {
    handleUniDateChange(val) {
      if (val && val.length > 0) {
        this.queryParams.startTime = this.$moment(val[0]).format("YYYY-MM-DD");
        this.queryParams.endTime = this.$moment(val[1]).format("YYYY-MM-DD");
      } else {
        this.queryParams.startTime = "";
        this.queryParams.endTime = "";
      }
      this.handleQuery();
    },

    resetQuery() {
      this.dateValue = [];
      this.queryParams = {
        operation: "",
        startTime: "",
        endTime: "",
      };
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      console.log(this.queryParams);

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
