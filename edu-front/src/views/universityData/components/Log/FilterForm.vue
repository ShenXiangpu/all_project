<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">

            <el-form-item prop="operation" label="事件类型">
              <el-select class="inputClass" v-model="queryParams.operation" @change="handleQuery" placeholder="请选择事件类型">
                <el-option v-for="item in userOperateTypeList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="起止时间" prop="dateValue">
              <el-date-picker @change="handleUniDateChange" v-model="dateValue" type="daterange"
                :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                align="right">
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
export default {
  name: "",
  props: {
    userOperateTypeList: {
      type: Array,
      default: () => [],
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateValue: [],

      queryParams: {
        operation: "",
        startTime: "",
        endTime: "",
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
