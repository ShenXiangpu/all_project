<template>
  <div class="approval-process">
    <div class="flow-container flex justify-start" v-for="i in 20">
      <name-icon class="name-icon marginRight10" />
      <div class="right-content">
        <div class="flex justify-between">
          <div class="info flex flex-column justify-between">
            <div class="font14 fontW7">审批人</div>
            <div>sxp</div>
          </div>
          <div class="fontW7">12-18 19:41</div>
        </div>
        <div class="resion">
          缘由textddddddddddd对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒滴答滴答滴答滴答滴答滴答哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒哒
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NameIcon from "./NameIcon.vue";
export default {
  name: "ApprovalProcess",
  components: { NameIcon },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.flow-container {
  padding: 0px 10px;
  position: relative;
  display: flex;
  overflow: hidden;
  .right-content {
    width: 300px;
    .info {
      height: 50px;
    }
    .resion {
      background-color: aliceblue;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
}
.flow-container::before {
  content: "";
  display: block;
  width: 2px;
  flex: 1;
  // height: 1000px;
  padding-top: 50%; /* 高度基于宽度的百分比 */
  background-color: #2a82e4;
  position: absolute;
  left: 35px;
  top: 35px;
}
.approval-process {
  height: 500px;
  overflow: auto;
}

.approval-process > div:last-child::before {
  display: none;
}
</style>
