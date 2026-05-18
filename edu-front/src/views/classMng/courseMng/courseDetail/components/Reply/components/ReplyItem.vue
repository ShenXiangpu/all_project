<template>
  <div class="reply-item flex justify-between align-center">
    <div class="flex">
      <div class="marginRight20">
        <el-avatar shape="square" :size="54" :src="item.avatarUrl"></el-avatar>
      </div>
      <div class="user-info">
        <div class="flex">
          <div class="marginRight20 font14 fontW7">{{ item.userName }}</div>

          <div>{{ item.createdAt }}</div>
        </div>
        <comment-container :index="item.id" :text="item.commentContent" />
      </div>
    </div>
    <div class="right-container">
      <div class="flex">
        <like
          :likeFlag="item.likeFlag"
          :likeNum="item.likeNum"
          :commentId="item.id"
        />
        <div>
          <el-popconfirm
            @onConfirm="handleDeleteQuestion(item)"
            title="确定删除吗？"
          >
            <i slot="reference" class="el-icon-delete font12"></i>
          </el-popconfirm>
        </div>
      </div>
      <div>
        <el-button
          @click="openReplyDialog(item)"
          class="font12"
          size="mini"
          type="primary"
          >回复</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Like from "./Like.vue";
import CommentContainer from "./CommentContainer.vue";
export default {
  name: "",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Like,
    CommentContainer
  },
  created() {},
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  methods: {
    openReplyDialog(item) {
      this.$emit("openReplyDialog", item);
    },
    handleDeleteQuestion(item) {
      this.$emit("handleDeleteQuestion", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
}
.reply-list {
  width: 900px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
  max-height: 600px;
}
.reply-item {
  // height: 70px;
  padding: 10px;
  //   width: 900px;
  border: 1px solid #ccc;
  border-radius: 0px;

  .right-container {
    @extend .right-container;
  }
}

</style>
