<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="单位类型"
    placeholder="请选择单位类型"
    :list="companyType"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option
        label="全部类型"
        value=""
      ></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { companyType } from "@/utils/dict";

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
      default: "companyTypeId",
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
    this.getCompanyType();
  },
  data() {
    return {
      companyType: [],
    };
  },
  methods: {
    //获取单位类型
    getCompanyType() {
      new Promise(async () => {
        const res = await companyType();
        this.companyType = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
