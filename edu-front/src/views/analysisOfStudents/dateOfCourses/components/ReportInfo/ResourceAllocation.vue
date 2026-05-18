<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title fontW7 font18">资源分配</span>
      </div>
    </template>
    <el-row :gutter="40">
      <el-col :span="6">
        <define-card title="工具数量">
          <div class="">
            <div class="text-center font16">{{reportObj.tools || 0}}个</div>
          </div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="CPU核数">
          <div class="">
            <div class="text-center font16">{{reportObj.cpu || 0}}核</div>
          </div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="内存大小">
          <div class="">
            <div class="text-center font16">{{reportObj.memory || 0}}GB</div>
          </div>
        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="存储大小">
          <div class="">
            <div class="text-center font16">{{reportObj.disk || 0}}GB</div>
          </div>
        </define-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {propsMixin} from "./propsMixin"
import DefineCard from "./DefineCard.vue";
export default {
  name: "ResourceAllocation",
  mixins: [propsMixin],
  components: { DefineCard},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
