<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="审批类型" prop="instType">
              <el-select v-model="queryParams.instType" placeholder="请选择审批类型" clearable>
                <el-option label="全部" value="" />
                <el-option label="线索删除" value="线索删除" />
                <el-option label="客户删除" value="客户删除" />
                <el-option label="合同删除" value="合同删除" />
                <el-option label="供应商删除" value="供应商删除" />
              </el-select>
            </el-form-item>

            <el-form-item label="审批结果" prop="runStatus">
              <el-select v-model="queryParams.runStatus" placeholder="请选择审批结果" clearable>
                <el-option label="全部" value="" />
                <el-option label="审批通过" value="2" />
                <el-option label="审批未通过" value="3" />
                <el-option label="——" value="1" />
              </el-select>
            </el-form-item>

            <el-form-item label="审批状态" prop="approvalStatus">
              <el-select v-model="queryParams.approvalStatus" placeholder="请选择审批状态" clearable>
                <el-option label="全部" value="" />
                <el-option label="已结束" value="2" />
                <el-option label="进行中" value="1" />
                <el-option label="已撤销" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始结束时间" prop="timeRange">
              <el-date-picker v-model="queryParams.timeRange" type="daterange" range-separator="至"
                start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']">
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
export default {
  name: "FilterForm",
  props: {},
  components: { BorderContainer, CompanyType, CustomerSource },
  computed: {
    ...mapGetters([]),
  },
  created() { },
  data() {
    return {
      queryParams: {
        instType: "",
        runStatus: "",
        approvalStatus: "",
        timeRange: [],
        startTime: "",
        endTime: "",
      },
      createByList: [],
      courseList: [],
      ipSupplierList: [],
    };
  },
  methods: {
    resetQuery() {
      this.queryParams.startTime = "";
      this.queryParams.endTime = "";
      this.$refs["queryFormRef"].resetFields();
      this.$emit("resetQuery", this.queryParams);
    },
    handleQuery() {
      let queryParams = this.queryParams;
      let timeRange = queryParams.timeRange;
      if (timeRange && timeRange.length > 0) {
        queryParams.startTime = queryParams.timeRange[0];
        queryParams.endTime = queryParams.timeRange[1];
        queryParams.startTime = this.$moment(
          queryParams.startTime
        ).format("YYYY-MM-DD HH:mm:ss");
        queryParams.endTime = this.$moment(
          queryParams.endTime
        ).format("YYYY-MM-DD HH:mm:ss");
      } else {
        queryParams.startTime = "";
        queryParams.endTime = "";
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
