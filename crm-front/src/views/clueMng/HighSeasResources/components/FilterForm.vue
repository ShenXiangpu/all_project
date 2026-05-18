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
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="5" :xl="5">
                <el-form-item label="线索名称" prop="clueName">
                  <el-input
                    v-model="queryParams.clueName"
                    id="keyword"
                    name="keyword"
                    placeholder="请输入线索名称"
                    clearable
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="联系电话" prop="linkPhone">
                  <el-input
                    v-model="queryParams.linkPhone"
                    id="keyword"
                    name="keyword"
                    placeholder="请输入联系电话"
                    clearable
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col> -->
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <company-type
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-Level
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-intent
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <customer-source
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
              </el-col>
              <el-col class="padding10" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <cooperation-area
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
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
                <follow-up-status
                  :isFilter="true"
                  :form="queryParams"
                  @handleQuery="handleQuery"
                />
              </el-col>

              <el-col
                class="padding10"
                :xs="8"
                :sm="8"
                :md="8"
                :lg="6"
                :xl="8"
              >
                <el-form-item label="创建时间" prop="date">
                  <el-date-picker
                    v-model="queryParams.date"
                    type="daterange"
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
import CompanyType from "../../components/FormItem/CompanyType.vue";
import CustomerLevel from "../../components/FormItem/CustomerLevel.vue";
import CustomerIntent from "../../components/FormItem/CustomerIntent.vue";
import customerSource from "../../components/FormItem/CustomerSource.vue";
import CooperationArea from "../../components/FormItem/CooperationArea.vue";
import FollowUpStatus from "../../components/FormItem/FollowUpStatus.vue";

export default {
  name: "",
  props: {},
  components: {
    BorderContainer,
    CompanyType,
    CustomerIntent,
    CustomerLevel,
    customerSource,
    CooperationArea,
    FollowUpStatus,
  },
  computed: {},
  created() {},
  mounted() {},
  data() {
    return {
      packageTypeList: [
        { label: "软核", value: "软核" },
        { label: "固核", value: "固核" },
        { label: "硬核", value: "硬核" },
        { label: "其他", value: "其他" },
      ],
      queryParams: {
        clueName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerIntentionId: "",
        consumerLevelId: "",
        consumerSourceId: "",
        cooperationAreaId: "",
        followUpStatusId: "",
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
      console.log("handleQuery", this.queryParams);

      this.$emit("handleQuery", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-edu {
  width: 90px;
}
.padding10 {
  padding: 5px 0px;
}
.el-col-5 {
  width: 20%;
}
.el-col-xl-5 {
  width: 20%;
}
.el-col-lg-5 {
  width: 20%;
}
.el-col-xl-8 {
  width: 40%;
}
.el-col-lg-8 {
  width: 40%;
}
</style>
