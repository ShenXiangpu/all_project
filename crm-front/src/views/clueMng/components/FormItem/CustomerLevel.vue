<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="客户级别"
    placeholder="请选择客户级别"
    :list="customerLevel"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部级别" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { customerLevel } from "@/utils/dict";
import MyFormItem from "../index.vue";
export default {
  name: "customerLevel",
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
      default: "consumerLevelId",
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
    this.getCustomerLevel();
  },
  data() {
    return {
      customerLevel: [],
    };
  },
  methods: {
    //获取单位类型
    getCustomerLevel() {
      new Promise(async () => {
        const res = await customerLevel();
        this.customerLevel = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
