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
            <el-form-item label="供应商" prop="customerName">
              <el-input
                class="el-input-class"
                v-model="queryParams.customerName"
                placeholder="请输入供应商名称或ID"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <supplier-type :isFilter="true" :form="queryParams"  className="inputClass" />

            <company-type :isFilter="true" :form="queryParams"  className="inputClass" />

            <customer-source :isFilter="true" :form="queryParams"   className="inputClass" />

            <el-form-item label="创建时间" prop="date">
              <el-date-picker
                v-model="queryParams.date"
                type="daterange"
                class="el-date-picker"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>

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
          </el-form>
        </div>
      </template>
    </border-container>
  </div>
</template>

<script>
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import SupplierType from "@/views/clueMng/components/FormItem/SupplierType.vue";

import { companyType, supplierType } from "@/utils/dict";
export default {
  name: "FilterForm",
  props: {},
  components: { BorderContainer, CompanyType, CustomerSource, SupplierType },
  computed: {
    ...mapGetters([]),
  },
  created() {},
  data() {
    return {
      queryParams: {
        customerName: "",
        companyTypeId: "",
        consumerSourceId: "",
        supplierTypeId: "",
        date: [],
        searchDateStart: "",
        searchDateEnd: "",
      },
      createByList: [],
      courseList: [],
      ipSupplierList: [],
    };
  },
  methods: {
    resetQuery() {
      this.queryParams.searchDateStart = "";
      this.queryParams.searchDateEnd = "";
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      let queryParams = this.queryParams;
      let data = queryParams.date;
      if (data && data.length > 0) {
        queryParams.searchDateStart = queryParams.date[0];
        queryParams.searchDateEnd = queryParams.date[1];
        queryParams.searchDateStart = this.$moment(
          queryParams.searchDateStart
        ).format("YYYY-MM-DD");
        queryParams.searchDateEnd = this.$moment(
          queryParams.searchDateEnd
        ).format("YYYY-MM-DD");
      } else {
        queryParams.searchDateStart = "";
        queryParams.searchDateEnd = "";
      }
      this.$emit("handleQuery", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .inputClass {
  width: 120px;
}
.el-input-class {
  width: 190px;
}
::v-deep .el-date-picker {
  width: 250px;
}

.el-select-company,
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
