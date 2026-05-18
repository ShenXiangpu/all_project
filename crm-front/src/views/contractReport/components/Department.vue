<template>
  <div>
    <my-filter @search="search" :radioList="radioList" />
    <common-table :data="tableData" :columns="tableColumns" :loading="loading" row-key="id" :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" />
  </div>
</template>

<script>
import CommonTable from './CommonTable.vue';
import { query } from '@/api/crm/contractReport';
import MyFilter from './Filter.vue';
export default {
  name: 'Department',
  components: {
    MyFilter,
    CommonTable
  },
  created() {
    this.loading = true;
    const end = new Date();
    const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
    const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    this.queryList('deptContractType', {
      startMonth: fmt(start),
      endMonth: fmt(end)
    })
  },
  data() {
    return {
      radioList: [
        { name: '合同类型', value: 'deptContractType' },
        { name: '合同状态', value: 'deptContractStatus' },
        { name: '付款状态', value: 'deptPayStatus' }
      ],
      tableData: [],
      loading: false,

      tableColumns: [
        { prop: 'deptName', label: '所属部门', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'notEffectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'notEffectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'endedCount', label: '数量', width: '90', align: 'center' },
            { prop: 'endedAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '未付款合同',
          align: 'center',
          children: [
            { prop: 'unpaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unpaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '部分付款合同',
          align: 'center',
          children: [
            { prop: 'partiallyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'partiallyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '全额付款合同',
          align: 'center',
          children: [
            { prop: 'fullyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'fullyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '30天到期合同',
          align: 'center',
          children: [
            { prop: 'expire30dCount', label: '数量', width: '90', align: 'center' },
            { prop: 'expire30dAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '新签合同',
          align: 'center',
          children: [
            { prop: 'newContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'newContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '续签合同',
          align: 'center',
          children: [
            { prop: 'reNewContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'reNewContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        }
      ],
      typeTableColumns: [
        { prop: 'deptName', label: '所属部门', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'notEffectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'notEffectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'endedCount', label: '数量', width: '90', align: 'center' },
            { prop: 'endedAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '未付款合同',
          align: 'center',
          children: [
            { prop: 'unpaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unpaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '部分付款合同',
          align: 'center',
          children: [
            { prop: 'partiallyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'partiallyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '全额付款合同',
          align: 'center',
          children: [
            { prop: 'fullyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'fullyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '30天到期合同',
          align: 'center',
          children: [
            { prop: 'expire30dCount', label: '数量', width: '90', align: 'center' },
            { prop: 'expire30dAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '新签合同',
          align: 'center',
          children: [
            { prop: 'newContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'newContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '续签合同',
          align: 'center',
          children: [
            { prop: 'reNewContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'reNewContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        }
      ],
      statusTableColumns: [
        { prop: 'deptName', label: '所属部门', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '收款合同',
          align: 'center',
          children: [
            { prop: 'skCount', label: '数量', width: '90', align: 'center' },
            { prop: 'skAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '付款合同',
          align: 'center',
          children: [
            { prop: 'fkCount', label: '数量', width: '90', align: 'center' },
            { prop: 'fkAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '未付款合同',
          align: 'center',
          children: [
            { prop: 'unpaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unpaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '部分付款合同',
          align: 'center',
          children: [
            { prop: 'partiallyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'partiallyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '全额付款合同',
          align: 'center',
          children: [
            { prop: 'fullyPaidContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'fullyPaidContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '新签合同',
          align: 'center',
          children: [
            { prop: 'newContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'newContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '续签合同',
          align: 'center',
          children: [
            { prop: 'reNewContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'reNewContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        }
      ],
      payStatusTableColumns: [
        { prop: 'deptName', label: '所属部门', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '收款合同',
          align: 'center',
          children: [
            { prop: 'skCount', label: '数量', width: '90', align: 'center' },
            { prop: 'skAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '付款合同',
          align: 'center',
          children: [
            { prop: 'fkCount', label: '数量', width: '90', align: 'center' },
            { prop: 'fkAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'notEffectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'notEffectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'endedCount', label: '数量', width: '90', align: 'center' },
            { prop: 'endedAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '新签合同',
          align: 'center',
          children: [
            { prop: 'newContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'newContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '续签合同',
          align: 'center',
          children: [
            { prop: 'reNewContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'reNewContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        }
      ]
    }
  },
  methods: {
    async queryList(op, params) {
      this.loading = true;
      const res = await query(op, params);
      if (res && res.flag) {
        this.tableData = res.resData;
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    search(params) {
      this.tableColumns = [];
      this.tableData = [];
      let op = params.contract;
      let month = params.month;
      let startMonth = month[0];
      let endMonth = month[1];

      if (startMonth instanceof Date && endMonth instanceof Date) {
        const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        startMonth = fmt(startMonth);
        endMonth = fmt(endMonth);

      }

      switch (op) {
        case 'deptContractType':
          this.tableColumns = this.typeTableColumns;
          break;
        case 'deptContractStatus':
          this.tableColumns = this.statusTableColumns;
          break;
        case 'deptPayStatus':
          this.tableColumns = this.payStatusTableColumns;
          break;

      }
      this.queryList(op, {
        startMonth,
        endMonth
      });

    }
  }
}
</script>

<style lang="scss" scoped></style>
