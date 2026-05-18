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
                <el-form-item label="客户名称" prop="customerName">
                  <el-input
                    v-model="queryParams.customerName"
                    id="keyword"
                    name="keyword"
                    placeholder="请输入客户名称"
                    clearable
                    @keyup.enter="handleQuery"
                    class="el-input-edu"
                  />
                </el-form-item>
              </el-col>

              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <company-type :form="queryParams" className="inputClass" />
              </el-col>
              <!--
    CooperationArea,
    ContractStatus,
    PaymentStatus, -->
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-type :form="queryParams" className="inputClass" />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="创建时间" prop="data">
                  <el-date-picker
                    v-model="queryParams.data"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
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
              </el-col> -->
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-source :form="queryParams" className="inputClass" />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <cooperation-area :form="queryParams" className="inputClass" />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <contract-status :form="queryParams" className="inputClass" />
              </el-col>
              <el-col
                class="padding10"
                :span="5"
                :xs="8"
                :sm="8"
                :md="8"
                :lg="6"
                :xl="5"
              >
                <payment-status :form="queryParams" className="inputClass" />
              </el-col>
              <el-col
                class="padding10"
                :span="5"
                :xs="8"
                :sm="8"
                :md="8"
                :lg="6"
                :xl="5"
              >
                <el-form-item prop="contactDeptId" label="所属部门">
                  <el-select
                    class="inputClass"
                    v-model="queryParams.contactDeptId"
                    placeholder="请选择部门"
                  >
                    <!-- <el-option label="全部部门" value=""></el-option> -->
                    <el-option
                      v-for="item in allDeptList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
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
import { getDeptList } from "@/api/crm/organization";
import { mapGetters } from "vuex";

import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import ContractStatus from "@/views/clueMng/components/FormItem/ContractStatus.vue";
import PaymentStatus from "@/views/clueMng/components/FormItem/PaymentStatus.vue";
import { contractStatus } from "@/utils/dict";

export default {
  name: "",
  props: {},
  components: {
    BorderContainer,
    CompanyType,
    CustomerType,
    CustomerSource,
    CooperationArea,
    ContractStatus,
    PaymentStatus,
  },
  computed: {
    ...mapGetters(["roleId", "roleType"]),
  },
  created() {
    this.queryDeptList();
  },
  data() {
    return {
      queryParams: {
        customerName: "",
        companyTypeId: "",
        consumerTypeId: "",
        date: [],
        searchDateStart: "",
        searchDateEnd: "",
        consumerSourceId: "",
        cooperationAreaId: "",
        contractStatusId: "",
        paymentStatus: "",
        contactDeptId: "",
      },

      allDeptList: [],
    };
  },
  methods: {
    async queryDeptList() {
      const res = await getDeptList();
      if (res && res.flag) {
        this.allDeptList = res.resData;
      }
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

</style>
