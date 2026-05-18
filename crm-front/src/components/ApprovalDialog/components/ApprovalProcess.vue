<template>
  <div class="approval-process">
    <div
      class="flow-container flex justify-start"
      v-for="(item, index) in nodes"
      :key="index"
    >
      <name-icon
        class="name-icon marginRight10"
        :name="item.handlerList[0].name"
        :status="item.handleStatus"
        :icon="item.icon"
      />
      <div class="right-content">
        <div class="flex justify-between">
          <div class="info flex flex-column justify-between">
            <div class="font14 fontW7">{{ item.nodeName }}</div>
            <div>
              {{ item.handlerList[0].name }}
              <span v-if="item.handleStatus && index !== 0"
                >({{ item.icon.info }})</span
              >
            </div>
          </div>
          <div class="fontW7" v-if="item.handleTime">{{ $moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
        </div>
        <div class="resion" v-if="item.handleOpinion">
          {{ item.handleOpinion }}
        </div>
        <div class="resion-else" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import NameIcon from "./NameIcon.vue";
export default {
  name: "ApprovalProcess",
  components: { NameIcon },
  props: {
    nodes: {
      type: Array,
      default: () => [],
    },
  },
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
    .resion-else {
      // background-color: aliceblue;
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
  max-height: 500px;
  overflow: auto;
}

.approval-process > div:last-child::before {
  display: none;
}
</style>
