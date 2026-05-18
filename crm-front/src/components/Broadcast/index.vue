<template>
  <div class="">
    <el-carousel direction="vertical" autoplay>
      <el-carousel-item v-for="item in newMsgList" :key="item.id">
        <div
          class="el-broadcast flex justify-start align-center pointer"
          @click="goToDetail"
        >
          <div class="font14 el-broadcast-text view-text">
            {{ item.msgInfo }}
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    msgList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    msgList: {
      handler(newValue) {
        console.log("newValue", newValue);

        if (newValue && newValue.length > 0) {
          this.newMsgList = newValue.filter((item) => {
            return !item.ifExpired;
          });
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      newMsgList: [],
    };
  },
  computed: {},
  methods: {
    goToDetail() {
      this.$router.push({
        path: "/newAndBroadcast/newAndBroadcast",
        query: { activeName: "first" },
      });
    },
  },
  destroyed() {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-carousel__indicators {
    display: none;
  }
  .el-carousel__container {
    height: 35px;
  }
}
.el-broadcast::before {
  content: "";
  display: inline-block;
  clear: both;
  width: 30px;
  height: 22px;
  background-image: url("../../assets/img/head/broadcast.png");
  background-size: 100% 100%;
  background-position: 0%;
  margin: 0 5px 0 0px;
}
.el-broadcast-text {
  width: 400px;
}
</style>
