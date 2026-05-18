<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="合作方向"
    placeholder="请选择合作方向"
    :list="cooperationArea"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部方向" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { cooperationArea } from "@/utils/dict";

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
      default: "cooperationAreaId",
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
    this.getCooperationArea();
  },
  data() {
    return {
      cooperationArea: [],
    };
  },
  methods: {
    //获取单位类型
    getCooperationArea() {
      new Promise(async () => {
        const res = await cooperationArea();
        this.cooperationArea = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
