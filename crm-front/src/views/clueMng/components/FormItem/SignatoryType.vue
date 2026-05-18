<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="签约类型"
    placeholder="请选择签约类型"
    :list="signatoryType"
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
import { signatoryType } from "@/utils/dict";

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
      default: "signatoryType",
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
    this.getSignatoryType();
  },
  data() {
    return {
      signatoryType: [],
    };
  },
  methods: {
    //获取单位类型
    getSignatoryType() {
      new Promise(async () => {
        const res = await signatoryType();
        this.signatoryType = res;
        console.log("========== ==========", this.signatoryType);

      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
