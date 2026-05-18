<template>
  <my-form-item
    :form="form"
    :propsName="propsName"
    labelName="跟进状态"
    placeholder="请选择跟进状态"
    :list="followUpStatus"
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
import { followUpStatus } from "@/utils/dict";

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
      default: "followUpStatusId",
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
    this.getFollowUpStatus();
  },
  data() {
    return {
      followUpStatus: [],
    };
  },
  methods: {
    //获取单位类型
    getFollowUpStatus() {
      new Promise(async () => {
        const res = await followUpStatus();
        this.followUpStatus = res;
      });
    },

    handleQuery(form) {
      this.$emit("handleQuery", form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
