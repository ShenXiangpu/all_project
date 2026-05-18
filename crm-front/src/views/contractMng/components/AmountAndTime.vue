<template>
  <div>
    <div v-for="(item, index) in formData.contract.contractPaymentList" :key="index">
      <div class="flex align-center amount-and-time">
        <el-form-item :label="`第${index + 1}笔`" :prop="'contract.contractPaymentList.' + index + '.paymentAmount'"
          :rules="rules['contract.contractPaymentList.paymentAmount']" class="flex align-center  el-form-item-amount">
          <div class='flex align-center'>
            <el-input class="el-input-edu" v-model="item.paymentAmount" :placeholder="`请输入第${index + 1}笔付款金额`">
              <template #prepend>付款金额</template>
              <template #append>元</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="付款时间" :prop="'contract.contractPaymentList.' + index + '.paymentTime'"
          :rules="rules['contract.contractPaymentList.paymentTime']" class="flex align-center el-form-item-time">
          <el-date-picker class="el-date-picker-edu" v-model="item.paymentTime" type="date"
            :placeholder="`第${index + 1}笔付款的日期`" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <div v-if="!isLook">
          <i class="el-icon-remove font20 marginLeft10 pointer primaryColoro" v-if="index > 0" @click="removeAmountAndTime(index)"></i>
        </div>
      </div>

    </div>

    <div class="text-center marginBottom20" v-if="!isLook">
      <el-button class="marginLeft10" type="primary" size="mini" @click="addAmountAndTime()">添加付款记录</el-button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'AmountAndTime',
  props: {
    formData: {
      type: Object,
      default: () => {

      }
    },
    rules: {
      type: Object,
      default: () => { }
    },
    isLook: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "formData.contract.contractPaymentList": {
      handler(newVal) {
        // 监听动态数组的变化，重新设置规则
        if (newVal && newVal.length > 0) {
          let total = 0;
          newVal.forEach((item, index) => {
            total += (item.paymentAmount - 0)
          })
          // this.formData.contract.contractAmount = total;
          console.log('Total payment amount:', total);
          this.$emit('update:contractAmount', total);
        } else {
          // 如果没有付款记录，重置合同金额
          console.log('Total payment amount:', total);
          this.$emit('update:contractAmount', 0);
        }
      },
      deep: true,
    },
  },
  components: {

  },
  created() {
    console.log('AmountAndTime created', this.formData);

  },
  data() {
    return {

    }
  },
  methods: {
    addAmountAndTime() {
      this.$emit('addAmountAndTime');
    },
    removeAmountAndTime(index) {
      if (this.formData.contract.contractPaymentList.length > 1) {
        this.$emit('removeAmountAndTime', index);
      } else {
        this.$message.warning('至少保留一笔付款记录');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.amount-and-time {
  margin-left: 50px;
  margin-bottom: 20px;
}

.el-input-edu {

  ::v-deep {
    .el-input__inner {
      border-radius: 0;
      width: 200px;
    }

    .el-input-group__append {
      border-radius: 0;
    }
  }
}

.el-form-item-amount {
  ::v-deep {
    .el-form-item__error {
      margin-left: 100px !important;
    }
  }

  margin-bottom: 0;
}

.el-form-item-time {
  ::v-deep {
    .el-form-item__label::before {
      content: '' !important;
    }

    .el-form-item__label {
      border: 1px solid #dcdfe6;
      background-color: #F5F7FA;
      color: #909399;
      border-right: none;
      border-left: none;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      width: 100px !important;
      font-weight: 500;
    }

    .el-form-item__error {
      margin-left: 0px !important;
    }
  }

  margin-bottom: 0;

}

.el-date-picker-prepend {
  border: 1px solid #dcdfe6;
  background-color: #F5F7FA;
  color: #909399;
  border-right: none;
  border-left: none;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
}

::v-deep {
  .el-date-picker-edu {
    width: 200px;

    .el-input__inner {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
