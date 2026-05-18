<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="合同状态"
    placeholder="请选择合同状态"
    :list="contractStatus"
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
import { contractStatus } from "@/utils/dict";

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
      default: "contractStatusId",
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
    this.getContractStatus();
  },
  data() {
    return {
      contractStatus: [],
    };
  },
  methods: {
    //获取单位类型
    getContractStatus() {
      new Promise(async () => {
        const res = await contractStatus();
        this.contractStatus = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
