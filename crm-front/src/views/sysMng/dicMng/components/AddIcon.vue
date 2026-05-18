<template>
  <el-popover
    placement="top-start"
    :title="status == 'add' ? '新增' : '修改'"
    width="300"
    trigger="click"
  >
    <div>
      <el-input
        v-model="input"
        class="el-input-crm"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" size="mini" @click="onSubmit">{{
        status == "add" ? "新增" : "修改"
      }}</el-button>
    </div>
    <i
      slot="reference"
      :class="status == 'add' ? 'el-icon-plus' : 'el-icon-edit'"
      class="primaryColor pointer"
    ></i>
  </el-popover>
</template>

<script>
export default {
  name: "AddIcon",
  props: {
    status: {
      type: String,
      default: "add",
    },
    item: {
      type: Object,
      default: () => {},
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  watch: {
    item: {
      handler(val) {
        if (this.status == "update") {
          this.input = val.itemName;
        } else {
          this.input = "";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  data() {
    return {
      input: "",
    };
  },
  methods: {
    onSubmit() {
      let val = this.input;
      if (!val) {
        return this.$message.error("请输入内容");
      }
      let op = this.status;
      let item = this.item;
      item.itemName = val;

      let params = {};
      if (op == "add" && this.order !== undefined && this.order !== null) {
        params.dictName = item.dictName;
        params.shortName = item.shortName;
        params.itemName = item.itemName;
        params.itemOrder = this.order;
        this.input = "";
      } else {
        params = item;
      }

      try {
        this.$emit("onSubmit", params, op);
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input-crm {
  width: 150px;
  margin-right: 10px;

  ::v-deep.el-input__inner {
    height: 30px;
  }
}
</style>
