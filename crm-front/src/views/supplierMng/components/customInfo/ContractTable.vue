<template>
  <el-card>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column
        prop="contractName"
        label="合同名称"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="contractSe"
        label="合同序号"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="contractNo"
        label="合同编号"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="contractAmount"
        label="合同金额(元)"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.contractAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentStatus"
        label="付款状态"
        align="center"
        min-width="100"
      >
        <template #default="scope">
          <el-tag :type="scope.row.paymentStatus !== 52 ? 'success' : 'danger'">
            {{ paymentStatusObj && paymentStatusObj[scope.row.paymentStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="付款金额(元)" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <div v-for="(item, index) in scope.row.contractPayments" :key="item.id">
              <span class="" v-if="item.paymentAmount != 0">{{ `第${index + 1}笔` }} </span> <span> {{ item.paymentAmount
                }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="restAmount" label="剩余尾款(元)" align="center" min-width="120"
        show-overflow-tooltip></el-table-column>
      <el-table-column prop="contract.paymentTime" label="付款时间" align="center" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <div v-for="(item, index) in scope.row.contractPayments" :key="item.id">
              <span class="" v-if="item.paymentAmount != 0 && item.paymentTime">{{ `第${index + 1}笔` }} </span> <span> {{ item.paymentTime
                }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="生效时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="跟进人"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { queryByCustomerId } from "@/api/crm/contract";
import { paymentStatus } from "@/utils/dict";

export default {
  name: "mytable",
  computed: {},
  props: {
    customerId: {
      type: String | Number,
      default: "",
    },
  },
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  created() {},
  watch: {
    customerId: {
      handler(val) {
        if (val) {
          this.getPaymentStatus(val);
        }
      },
      immediate: true,
      paymentStatusObj: [],
    },
  },
  methods: {
    //获取单位类型
    getPaymentStatus(id) {
      new Promise(async () => {
        this.loading = true;

        const res = await paymentStatus();
        const obj1 = {};
        for (const item of res) {
          obj1[item.id] = item.itemName;
        }
        this.paymentStatusObj = obj1;
        const res1 = await queryByCustomerId({ id });
        if (res1 && res1.flag) {
          this.tableData = res1.resData;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
    getList(id) {
      this.loading = true;
      queryByCustomerId({ id })
        .then((res) => {
          this.tableData = res.resData;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
