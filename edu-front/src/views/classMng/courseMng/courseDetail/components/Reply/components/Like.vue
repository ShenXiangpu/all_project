<template>
  <div
    :class="isLike ? 'primaryColoro' : ''"
    class="marginRight20 font16 pointer "
    @click="handleLike"
  >
    <i class="el-icon-thumb font16"></i> {{ number }}
  </div>
</template>

<script>
import { isLike } from "@/api/edu/reply";

export default {
  name: "Like",
  props: {
    commentId: {
      type: Number,
      default: 0,
    },
    likeNum: {
      type: Number,
      default: 0,
    },
    likeFlag: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    likeFlag: {
      handler(val) {
        this.isLike = val;
      },
      immediate: true,
    },
    likeNum: {
      handler(val) {
        this.number = val;
      },
      immediate: true,
    },
  },
  computed: {
  },
  components: {},
  created() {},
  data() {
    return {
      isLike: false,
      number: 0,
    };
  },
  methods: {
    async handleLike() {
      let number = this.number;
      let id = this.commentId;
      const res = await isLike({ id });
      if (res && res.flag) {
        this.isLike ? number-- : number++;
        this.number = number;
        this.isLike = !this.isLike;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
