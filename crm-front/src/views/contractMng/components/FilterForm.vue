<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-row style="text-align: left">
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="合同名称" prop="contractName">
                  <el-input class="inputClass" v-model="queryParams.contractName" id="keyword" name="keyword"
                    placeholder="合同名称或序号或编号" clearable @keyup.enter="handleQuery" />
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="客户名称" prop="customerName">
                  <el-input class="inputClass" v-model="queryParams.customerName" id="customerName" name="customerName"
                    placeholder="请输入客户名称" clearable @keyup.enter="handleQuery" />
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-type :isFilter="true" className="inputClass" :form="queryParams" />
              </el-col>

              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <cooperation-area :isFilter="true" className="inputClass" :form="queryParams" />
              </el-col>

              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <contract-status :isFilter="true" className="inputClass" :form="queryParams" />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <payment-status :isFilter="true" className="inputClass" :form="queryParams" />
              </el-col>
              <el-col class="padding10" :span="5" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="所属部门" prop="departmentId">
                  <el-select class="inputClass" v-model="queryParams.departmentId" placeholder="请选择部门">
                    <el-option label="所有部门" value=""></el-option>
                    <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <signatory-type :isFilter="true" className="inputClass" :form="queryParams" />
              </el-col>
              <el-col class="padding10" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
                <el-form-item label="创建时间" prop="date">
                  <el-date-picker class="el-date-picker" v-model="queryParams.date" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" class="editSuccess" icon="el-icon-search"
                    @click="handleQuery">搜索</el-button>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                    @click="resetQuery('queryFormRef')">重置</el-button>
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
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import SignatoryType from "@/views/clueMng/components/FormItem/SignatoryType.vue";
import { mapGetters } from "vuex";
import ContractStatus from "@/views/clueMng/components/FormItem/ContractStatus.vue";
import PaymentStatus from "@/views/clueMng/components/FormItem/PaymentStatus.vue";
import { getDeptList } from "@/api/crm/organization";

export default {
  name: "",
  props: {},
  components: {
    BorderContainer,
    CustomerType,
    CooperationArea,
    ContractStatus,
    PaymentStatus,
    SignatoryType,
  },
  computed: {
    ...mapGetters(["roleId", "roleType"]),
  },
  created() {
    this.getDeptList();
  },
  data() {
    return {
      queryParams: {
        contractTypeId: "",
        cooperationAreaId: "",
        contractStatusId: "",
        paymentStatus: "",
        departmentId: "",
        contractId: "",
        contractName: "",
        customerName: "",
        signatoryType: "",
        date: [],
        startDate: "",
        endDate: "",
      },
      deptList: [],
      contractList: [],
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
      this.queryParams.startDate = "";
      this.queryParams.endDate = "";
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      let queryParams = this.queryParams;
      let date = queryParams.date;
      if (date && date.length > 0) {
        queryParams.startDate = date[0];
        queryParams.endDate = date[1];
      } else {
        queryParams.startDate = "";
        queryParams.endDate = "";
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

.el-date-picker {
  width: 250px;
}

::v-deep {
  .inputClass {
    width: 190px;
  }
}

.padding10 {
  padding: 5px 0px;
}


@media screen and (min-width: 1568px) {
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
}
</style>
