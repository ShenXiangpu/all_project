<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col
        class="marginBottom10 el-col-crm"
        :xs="8"
        :sm="6"
        :md="4"
        :lg="4"
        :xl="4"
        v-for="item in dictKeys"
        :key="item"
      >
        <dic-card
          :title="item.dictName"
          :dic-key="item"
          :dic-item-list="dictObj[item]"
          @query="query"
          
        ></dic-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { opDict } from "@/api/crm/dic.js";
import DicCard from "./components/DicCard.vue";
export default {
  name: "DicMng",
  components: {
    DicCard,
  },
  created() {
    this.queryDictList({});
  },
  data() {
    return {
      dictKeys: [],
    };
  },
  methods: {
    query(){
      this.queryDictList({});
    },
    /**
     * 查询字典列表
     */
    queryDictList(params) {
      opDict(params,'query').then((res) => {
        if (res && res.flag) {
          const resData = res.resData;
          const dicObj = resData;
          this.dictKeys = Object.keys(dicObj);
          this.dictObj = dicObj;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col-crm {
  min-height: 300px;
}
</style>
