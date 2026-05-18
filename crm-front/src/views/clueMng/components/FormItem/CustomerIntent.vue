<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="客户意向"
    placeholder="请选择客户意向"
    :list="customerIntent"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部意向" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { customerIntent } from "@/utils/dict";

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
      default: "consumerIntentionId",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isFilter: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    MyFormItem,
  },
  created() {},
  mounted() {
    this.getCustomerIntent();
  },
  data() {
    return {
      customerIntent: [],
    };
  },
  methods: {
    //获取单位类型
    getCustomerIntent() {
      new Promise(async () => {
        const res = await customerIntent();
        this.customerIntent = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
