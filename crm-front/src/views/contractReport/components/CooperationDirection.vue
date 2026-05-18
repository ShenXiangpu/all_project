<template>
  <div>
    <my-filter @search="search" :radioList="radioList" />
    <common-table :data="tableData" :columns="tableColumns" :loading="loading" row-key="id" :default-expand-all="false"
      :tree-props="{ children: 'list', hasChildren: 'hasChildren' }" />
  </div>
</template>

<script>
import CommonTable from './CommonTable.vue';
import { queryCooperation } from '@/api/crm/contractReport';
import MyFilter from './Filter.vue';
export default {
  name: 'CooperationDirection',
  components: {
    MyFilter,
    CommonTable
  },
  created() {
    this.loading = true;
    const end = new Date();
    const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
    const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    this.queryList('cooperationType', {
      startTime: fmt(start),
      endTime: fmt(end)
    })
  },
  data() {
    return {
      radioList: [
        { name: '合同类型', value: 'cooperationType' },
        { name: '合同状态', value: 'cooperationStatus' },
        { name: '付款状态', value: 'paymentStatus' }
      ],
      tableData: [],
      loading: false,

      tableColumns: [
        { prop: 'cooperationAreaName', label: '合作方向', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'unEffectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unEffectiveContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'expiredContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'expiredContractAmount', label: '金额', width: '120', align: 'center' }
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
            { prop: 'partiallyPaidContractPayAmount', label: '已付金额', width: '120', align: 'center' },
            { prop: 'partiallyPaidContractUnPayAmount', label: '剩余尾款', width: '120', align: 'center' }
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
            { prop: 'exp30ContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'exp30ContractAmount', label: '金额', width: '120', align: 'center' }
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
        { prop: 'cooperationAreaName', label: '合作方向', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'unEffectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unEffectiveContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'expiredContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'expiredContractAmount', label: '金额', width: '120', align: 'center' }
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
            { prop: 'partiallyPaidContractPayAmount', label: '已付金额', width: '120', align: 'center' },
            { prop: 'partiallyPaidContractUnPayAmount', label: '剩余尾款', width: '120', align: 'center' }
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
            { prop: 'exp30ContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'exp30ContractAmount', label: '金额', width: '120', align: 'center' }
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
        { prop: 'cooperationAreaName', label: '合作方向', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '收款合同',
          align: 'center',
          children: [
            { prop: 'receiptContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'receiptContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '付款合同',
          align: 'center',
          children: [
            { prop: 'paymentContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'paymentContractAmount', label: '金额', width: '120', align: 'center' }
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
            { prop: 'partiallyPaidContractPayAmount', label: '已付金额', width: '120', align: 'center' },
            { prop: 'partiallyPaidContractUnPayAmount', label: '剩余尾款', width: '120', align: 'center' }
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
        { prop: 'cooperationAreaName', label: '合作方向', width: '180', align: 'center' },
        { prop: 'contractAttribute', label: '合同属性', width: '140', align: 'center' },
        { prop: 'totalContractCount', label: '合同数量', width: '100', align: 'center' },
        { prop: 'contractAmount', label: '合同金额', width: '140', align: 'center' },
        { prop: 'paidContractAmount', label: '已付金额', width: '140', align: 'center' },
        { prop: 'payArrivalRate', label: '到账率', width: '100', align: 'center' },
        {
          label: '收款合同',
          align: 'center',
          children: [
            { prop: 'receiptContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'receiptContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '付款合同',
          align: 'center',
          children: [
            { prop: 'paymentContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'paymentContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '未生效合同',
          align: 'center',
          children: [
            { prop: 'unEffectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'unEffectiveContractAmount', label: '金额', width: '120', align: 'center' }
          ]
        },
        {
          label: '生效中合同',
          align: 'center',
          children: [
            { prop: 'effectiveContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'effectiveContractAmount', label: '金额', width: '120', align: 'center' },
          ]
        },
        {
          label: '已结束合同',
          align: 'center',
          children: [
            { prop: 'expiredContractCount', label: '数量', width: '90', align: 'center' },
            { prop: 'expiredContractAmount', label: '金额', width: '120', align: 'center' }
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
      const res = await queryCooperation(op, params);
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
      let startTime = month[0];
      let endTime = month[1];

      if (startTime instanceof Date && endTime instanceof Date) {
        const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        startTime = fmt(startTime);
        endTime = fmt(endTime);

      }

      switch (op) {
        case 'cooperationType':
          this.tableColumns = this.typeTableColumns;
          break;
        case 'cooperationStatus':
          this.tableColumns = this.statusTableColumns;
          break;
        case 'paymentStatus':
          this.tableColumns = this.payStatusTableColumns;
          break;

      }
      this.queryList(op, {
        startTime,
        endTime
      });

    }
  }
}
</script>

<style lang="scss" scoped></style>
