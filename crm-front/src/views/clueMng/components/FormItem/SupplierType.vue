<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="供应商类别"
    placeholder="请选择供应商类别"
    :list="supplierType"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部类别" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { supplierType } from "@/utils/dict";

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
    disabled: {
      type: Boolean,
      default: false,
    },
    propsName: {
      type: String,
      default: "supplierTypeId",
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
    this.getSupplierType();
  },
  data() {
    return {
      supplierType: [],
    };
  },
  methods: {
    //获取单位类型
    getSupplierType() {
      new Promise(async () => {
        const res = await supplierType();
        this.supplierType = res;

      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
