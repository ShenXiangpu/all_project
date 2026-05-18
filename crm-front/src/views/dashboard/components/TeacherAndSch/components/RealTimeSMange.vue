<template>
  <el-card class="el-card-eda" >
    <div slot="header" class="clearfix">
      <span>平台数据</span>
      <!-- <div class="color9" style="float: right; padding: 3px 0" type="text">
        截止日期：{{ $moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      </div> -->
    </div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`线索数量`"
          unit="个"
          :num="onlineDate && onlineDate.clueNums"
        ></s-card>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`客户数量`"
          unit="人"
          :num="onlineDate && onlineDate.customerNums"
        ></s-card>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`合同数量`"
          :num="onlineDate && onlineDate.contractNums"
          unit="个"
        ></s-card>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`待生效合同`"
          :num="onlineDate && onlineDate.unStartContractNums"
          unit="个"
        ></s-card>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`生效中合同`"
          :num="onlineDate && onlineDate.effectContractNums"
          unit="个"
        ></s-card>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
        <s-card
          :isShowIcon="false"
          :titleName="`已结束合同`"
          :num="onlineDate && onlineDate.endedContractNums"
          unit="个"
        ></s-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import SCard from "./SCard.vue";
export default {
  name: "",
  props: {
    onlineDate: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: { SCard },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-card-eda {
  height: 167px;
}
.realTimeSMange {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
