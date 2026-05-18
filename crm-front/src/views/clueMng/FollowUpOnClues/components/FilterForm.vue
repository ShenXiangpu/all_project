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
            <el-row style="text-align: left;">
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="线索名称" prop="name">
                  <el-input
                    v-model="queryParams.name"
                    id="keyword"
                    name="keyword"
                    placeholder="请输入线索名称"
                    clearable
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5" >
                <el-form-item label="联系电话" prop="name">
                  <el-input
                    v-model="queryParams.name"
                    id="keyword"
                    name="keyword"
                    placeholder="请输入联系电话"
                    clearable
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="单位类型" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder="请选择单位类型"
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="创建时间" prop="name">
                  <el-date-picker
                    v-model="queryParams.supplier"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="地区" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>  
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="客户级别" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :span="5" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="客户意向" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :span="5" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="客户来源" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :span="5" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="合作方向" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10"  :span="5" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="跟进状态" prop="name">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.supplier"
                    @change="handleQuery"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in ipSupplierList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
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
      queryParams: {
        name: "",
        supplier: "",
        packageType: "",
        status: "",
        process: "",
      },
      createByList: [],
      courseList: [],
      ipSupplierList: [],
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
</style>
