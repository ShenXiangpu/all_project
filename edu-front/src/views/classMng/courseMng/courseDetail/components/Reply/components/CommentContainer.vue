<template>
  <div :id="`comment-container${index}`" class="comment-container">
    <div :id="`text${index}`" class="text">
      {{ text }}
    </div>
    <div class="btn pointer primaryColorb" v-if="show && showText" @click="seachMore">
      查看更多
    </div>
    <div class="btn pointer primaryColorb" v-if="!show  && showText" @click="up">收起</div>
  </div>
</template>

<script>
import $ from "jquery";
import { logger } from "runjs/lib/common";
window.jQuery = $;

export default {
  name: "",
  props: {
    index: {
      type: Number,
      default:0
        
    },
    text: {
      type: String,
      default:
        "我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字我是一大段文字文字",
    },
  },
  components: {},
  created() {},
  mounted() {
    this.getNode();
  },
  data() {
    return {
      defineWidth: 22,
      show: false,
      showText:false
    };
  },
  methods: {
    getNode() {
      let index = this.index
      const text = document.getElementById(`text${index}`);
      let textHeight = text.clientHeight;
      if (textHeight > this.defineWidth) {
        text.classList.add("view-text");
        const comment = document.getElementById(`comment-container${index}`);
        comment.classList.add("flex", "justify-start");
        this.show = true;
        this.showText = true
      }else {
        this.showText = false
        this.show = false;
      }
    },
    seachMore() {
      let index = this.index
      const text = document.getElementById(`text${index}`);
      text.classList.remove("view-text");
     const comment = document.getElementById(`comment-container${index}`);
      comment.classList.add("flex", "justify-start", "align-end");
      this.show = false;
    },
    up() {
      let index = this.index
       const text = document.getElementById(`text${index}`);
      text.classList.add("view-text");
      const comment = document.getElementById(`comment-container${index}`);
      comment.classList.add("flex", "justify-start", "align-end");
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-spread-container {
  position: relative;
  overflow: hidden;
  max-height: 100px;
}
.text {
  color: #1f1f1f;
  line-height: 0.22rem;
  width: 400px;
  max-height:150px;
  overflow-y:auto;
}
</style>
