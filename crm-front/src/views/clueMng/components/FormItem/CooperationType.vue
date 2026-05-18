<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="合作类型"
    placeholder="请选择合作类型 "
    :list="cooperationType"
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
import { cooperationType } from "@/utils/dict";

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
      default: "cooperationTypeId",
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
    this.getCooperationType();
  },
  data() {
    return {
      cooperationType: [],
    };
  },
  methods: {
    //获取单位类型
    getCooperationType() {
      new Promise(async () => {
        const res = await cooperationType();
        this.cooperationType = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
