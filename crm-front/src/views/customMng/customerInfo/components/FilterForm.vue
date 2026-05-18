<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="queryParams.customerName" placeholder="请输入客户名称" clearable @keyup.enter="handleQuery"
                class="inputClass" />
            </el-form-item>
            <company-type :isFilter="true" :form="queryParams" className="inputClass" />

            <customer-source :isFilter="true" :form="queryParams" className="inputClass" />

            <el-form-item label="所属部门" prop="deptId">
              <el-select class="inputClass" v-model="queryParams.deptId" placeholder="请选择部门">
                <el-option label="所有部门" value=""></el-option>
                <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="创建时间" prop="date">
              <el-date-picker v-model="queryParams.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" class="el-date-picker-edu">
              </el-date-picker>
            </el-form-item>

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
import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import { getDeptList } from "@/api/crm/organization";
export default {
  name: "FilterForm",
  props: {},
  components: { BorderContainer, CompanyType, CustomerSource },
  computed: {
    ...mapGetters([]),
  },
  created() { this.getDeptList(); },

  data() {
    return {
      queryParams: {
        customerName: "",
        companyTypeId: "",
        consumerSourceId: "",
        date: [],
        searchDateStart: "",
        searchDateEnd: "",
        deptId: "",
      },
      createByList: [],
      courseList: [],
      ipSupplierList: [],
      deptList: [],
    };
  },
  methods: {
    /**获取部门列表 */
    getDeptList() {
      this.loading = true;
      getDeptList().then((response) => {
        this.deptList = response.resData;
        this.loading = false;
      });
    },
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

::v-deep .inputClass {
  width: 150px;
}

.el-date-picker-edu {
  width: 250px;
}
</style>
