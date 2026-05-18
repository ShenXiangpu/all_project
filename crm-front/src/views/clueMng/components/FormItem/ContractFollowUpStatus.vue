<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="跟进状态"
    placeholder="请选择跟进状态"
    :list="contractFollowUpStatusList"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option
        label="全部状态"
        value=""
      ></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { contractFollowUpStatus } from "@/utils/dict";

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
      default: "contractFollowUpStatus",
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
    this.getContractFollowUpStatus();
  },
  data() {
    return {
      contractFollowUpStatusList: [],
    };
  },
  methods: {
    //获取单位类型
    getContractFollowUpStatus() {
      new Promise(async () => {
        const res = await contractFollowUpStatus();
        this.contractFollowUpStatusList = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
