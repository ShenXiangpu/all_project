<template>
  <div>
    <border-container
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-row style="text-align: left">
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="操作类型" prop="operation">
                  <el-select v-model="queryParams.operation" placeholder="请选择操作类型" clearable>
                    <el-option
                      v-for="item in typeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="用户名" prop="keyWord">
                  <el-input
                    v-model="queryParams.keyWord"
                    placeholder="请输入客户名称"
                    clearable
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
                <el-form-item>
                  <el-button
                    type="success"
                    class="editSuccess"
                    icon="el-icon-search"
                    @click="handleQuery"
                    >搜索</el-button
                  >
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    class="editPrimary"
                    icon="el-icon-refresh"
                    @click="resetQuery('queryFormRef')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
    </border-container>
  </div>
</template>

<script>
import BorderContainer from "@/components/BorderContainer";
import { getOperateType } from "@/api/crm/userBehaviorLog";
import { mapGetters } from "vuex";

export default {
  name: "",
  props: {},
  components: {
    BorderContainer,
  },
  computed: {
    ...mapGetters(["roleId", "roleType"]),
  },
  created() {
    this.getOperateTypeList();
  },
  data() {
    return {
      queryParams: {
        operation: "",
        keyWord: "",
      },
      typeList: [],
    };
  },
  methods: {
    /**获取部门列表 */
    getOperateTypeList() {
      this.loading = true;
      getOperateType().then((response) => {
        this.typeList = response.resData;
        this.loading = false;
      });
    },

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
.padding10 {
  padding: 5px 0px;
}
.el-col-5 {
  width: 20%;
}
.el-col-lg-5,
.el-col-xl-5 {
  width: 20%;
}
.el-col-lg-8,
.el-col-xl-8 {
  width: 40%;
}
</style>
