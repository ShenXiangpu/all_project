<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="跟进方式"
    placeholder="请选择跟进方式"
    :list="followUpType"
    :className="className"
    @handleQuery="handleQuery"
    :disabled="disabled"
  >
    <template v-slot:option v-if="isFilter">
      <el-option label="全部方式" value=""></el-option>
    </template>
  </my-form-item>
</template>

<script>
import { followUpType } from "@/utils/dict";

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
      default: "followUpTypeId",
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
    this.getFollowUpType();
  },
  data() {
    return {
      followUpType: [],
    };
  },
  methods: {
    //获取单位类型
    getFollowUpType() {
      new Promise(async () => {
        const res = await followUpType();
        this.followUpType = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
