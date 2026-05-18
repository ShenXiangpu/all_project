<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="付款状态"
    placeholder="请选择付款状态"
    :list="paymentStatus"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部状态" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { paymentStatus } from "@/utils/dict";
import MyFormItem from "../index.vue";
export default {
  name: "",
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    className: {
      type: String,
      default: "",
    },
    propsName: {
      type: String,
      default: "paymentStatus",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isFilter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MyFormItem,
  },
  created() {},
  mounted() {
    this.getPaymentStatus();
  },
  data() {
    return {
      paymentStatus: [],
    };
  },
  methods: {
    //获取单位类型
    getPaymentStatus() {
      new Promise(async () => {
        const res = await paymentStatus();
        this.paymentStatus = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
