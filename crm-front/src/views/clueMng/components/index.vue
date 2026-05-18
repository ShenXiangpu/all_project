<template>
  <el-form-item :label="labelName" :prop="propsName">
    <el-select :class="className" v-model="dynamicModel" @change="handleQuery" :placeholder="placeholder"
      :disabled="disabled">
      <slot name="option"></slot>
      <el-option v-for="item in list" :key="item.id" :label="item.itemName" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: "FormItem",
  props: {
    form: {
      type: Object,
      default: () => { },
    },
    propsName: {
      type: String,
      default: "",
    },
    labelName: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
    },
    className: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
  computed: {
    dynamicModel: {
      get() {
        if (!this.propsName) {
          return undefined;
        }
        if (this.propsName.indexOf(".") == -1) {
          const key = this.propsName;
          let value = this.form;
          value = value[key];
          return value;
        } else {
          const keys = this.propsName.split(".");
          let value = this.form;
          keys.forEach((key) => {
            value = value[key];
          });
          return value;
        }
      },
      set(value) {
        if (this.propsName.indexOf(".") == -1) {
          let obj = this.form;
          obj[this.propsName] = value;
        } else {
          const keys = this.propsName.split(".");
          let obj = this.form;
          keys.slice(0, -1).forEach((key) => {
            obj = obj[key];
          });
          obj[keys[keys.length - 1]] = value;
        }
      },
    },
  },
  components: {},
  created() { },
  data() {
    return {};
  },
  methods: {
    handleQuery() {
      this.$emit("handleQuery", this.form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
