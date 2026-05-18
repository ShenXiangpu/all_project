<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="合同类型"
    placeholder="请选择合同类型 "
    :list="contractType"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部类型" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { customerType } from "@/utils/dict";

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
      default: "contractTypeId",
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
    this.getCustomerType();
  },
  data() {
    return {
      contractType: [],
    };
  },
  methods: {
    //获取单位类型
    getCustomerType() {
      new Promise(async () => {
        const res = await customerType();
        this.contractType = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
