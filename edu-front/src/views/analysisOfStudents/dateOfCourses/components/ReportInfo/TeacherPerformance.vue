<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="card-title fontW7 font18">教师表现</span>
      </div>
    </template>
    <el-row :gutter="40">
      <el-col :span="6">
        <define-card title="平台登录">
          <div class="define-container">
            <div>登录次数：{{ reportObj.loginNum }}次</div>
          </div>

        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="实操云登录">
          <div class="define-container">
            <div>登录次数：{{ reportObj.vmLoginNum }}次</div>
            <div>登录时长：{{ reportObj.vmLoginTime }}h</div>
          </div>

        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="作业批改">
          <div class="define-container">
            <div>作业批改率：{{ reportObj.homeworkMarkRate }}%</div>
            <div>作业布置次数：{{ reportObj.homeworkNum }}次</div>
          </div>

        </define-card>
      </el-col>
      <el-col :span="6">
        <define-card title="实验批改" class="">
          <div class="define-container">
            <div>实验批改率：{{ reportObj.trialMarkRate }}%</div>
            <div>课程实验数量：{{ reportObj.trialNum }}个</div>
          </div>
        </define-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { propsMixin } from './propsMixin';
import DefineCard from "./DefineCard.vue";
export default {
  name: "TeacherPerformance",
  mixins: [propsMixin],
  components: {
    DefineCard,
  },
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.block {
  width: 100%;
  height: 22px;
}

.define-container {
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
