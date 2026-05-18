<template>
  <el-card>
    <template #header>
      <div class="flex justify-between font14">
        <span>{{ `${dicItemList[0].dictName} (${dicKey})` }}</span>
        <span>
          <add-icon
            :item="dicItemList[0]"
            status="add"
            @onSubmit="onSubmit"
            :order="dicItemList.length"
          />
        </span>
      </div>
    </template>
    <div class="el-card-body-crm">
      <div v-for="dicItem in dicItemList" :key="dicItem.id">
        <div class="flex justify-between align-center">
          <div>
            <span class="marginRight20">{{ dicItem.id }}</span>
            <span>{{ dicItem.itemName }}</span>
          </div>

          <span
            ><add-icon
              v-if="dicKey != 'contractStatus'"
              :item="dicItem"
              status="update"
              @onSubmit="onSubmit"
          /></span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import AddIcon from "./AddIcon";
import { opDict } from "@/api/crm/dic.js";
export default {
  name: "DicCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    dicKey: {
      type: String,
      default: "",
    },
    dicItemList: {
      type: Object | Array,
      default: () => [],
    },
  },
  components: {
    AddIcon,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    onSubmit(item, op) {
      console.log(item, op);
      opDict(item, op).then((res) => {
        if (res && res.flag) {
          this.$message.success("操作成功");
          this.$emit("query");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card-body-crm {
  padding-right: 8px;
  max-height: 200px;
  overflow: auto;
}
</style>
