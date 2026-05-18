<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="客户来源"
    placeholder="请选择客户来源"
    :list="customerSource"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部来源" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { customerSource } from "@/utils/dict";

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
      default: "consumerSourceId",
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
    this.getCustomerSource();
  },
  data() {
    return {
      customerSource: [],
    };
  },
  methods: {
    //获取单位类型
    getCustomerSource() {
      new Promise(async () => {
        const res = await customerSource();
        this.customerSource = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
