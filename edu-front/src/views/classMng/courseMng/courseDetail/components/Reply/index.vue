<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部问题" name="first"></el-tab-pane>
        <el-tab-pane label="我的问题" name="second"></el-tab-pane>
      </el-tabs>
      <div class="flex justify-between marginBottom20">
        <div class="flex">
          <el-input
            class="marginRight20 el-input-edu-400"
            v-model="keyWord"
            clearable
            placeholder="请输入内容"
          ></el-input>
          <el-button
            type="success"
            class="editSuccess"
            @click="search"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            type="primary"
            class="editPrimary"
            icon="el-icon-refresh"
            @click="resetQuery"
            >重置</el-button
          >
        </div>
        <div>
          <el-button type="primary" @click="openQuestionDialog"
            >发表问题</el-button
          >
        </div>
      </div>
      <div
        class="reply-container flex justify-between align-center marginBottom10"
        v-for="item in commentList"
        :key="item.id"
      >
        <div
          class="left-container flex"
          @click="openQuestionDetailDialog(item)"
        >
          <div class="head-container marginRight20">
            <el-avatar
              style=""
              shape="square"
              :size="70"
              :src="item.avatarUrl"
            ></el-avatar>
          </div>
          <div class="user-info">
            <div class="font16 fontW7">{{ item.userName }}</div>
            <div style="width: 80%" class="view-text font14">
              {{ item.commentContent }}
            </div>
            <div>{{ item.createdAt }}</div>
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
                title="确定删除吗？"
                @onConfirm="handleDeleteQuestion(item)"
              >
                <i slot="reference" class="el-icon-delete font16"></i>
              </el-popconfirm>
            </div>
          </div>
          <div
            class="primaryColorb fontW7 pointer font14"
            @click="openQuestionDetailDialog(item)"
          >
            共计 {{ item.replyTotalCount }} 条回复
          </div>
        </div>
      </div>
      <div class="reply2-container" v-if="false">
        <div>回复</div>
        <div class="reply-list">
          <!-- <reply-item
            @openReplyDialog="openReplyDialog"
            v-for="item in 10"
            :key="item"
          /> -->
        </div>
        <div>
          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.limit"
            @pagination="searchQuery"
          />
        </div>
      </div>
    </el-card>

    <question-dialog ref="QuestionDialog" @searchQuery="search" />
    <question-detail-dialog ref="QuestionDetailDialog" @searchQuery="search" />
  </div>
</template>

<script>
import {
  getCommentList,
  getMyCommentList,
  delQuerstion,
} from "@/api/edu/reply";
import Pagination from "@/components/Pagination";
import QuestionDialog from "./components/QuestionDialog.vue";
import QuestionDetailDialog from "./components/QuestionDetailDialog.vue";
import { mapGetters } from "vuex";
import ReplyItem from "./components/ReplyItem.vue";
import Like from "./components/Like.vue";
export default {
  name: "",
  props: {
    courseId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(["name", "avatar", "userRolesNames"]),
  },
  components: {
    ReplyItem,
    Like,
    QuestionDialog,
    QuestionDetailDialog,
    Pagination,
  },
  created() {
    this.search();
  },
  data() {
    return {
      activeName: "first",
      commentList: [],
      total: 1,
      keyWord: "",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  methods: {
    async handleDeleteQuestion(item) {
      let id = item.id;
      const res = await delQuerstion({ id });
      if (res && res.flag) {
        this.search();
      }
    },
    //查询全部问题

    handleClick(tab, event) {
      this.keyWord = "";
      this.commentList = [];
      this.search();
    },
    searchQuery() {},
    resetQuery() {
      this.keyWord = "";
      this.commentList = [];
      this.search();
    },
    async search() {
      let keyWord = this.keyWord;
      let courseId = this.courseId;
      let activeName = this.activeName;
      const res =
        activeName == "first"
          ? await getCommentList({ courseId, keyWord })
          : await getMyCommentList({ courseId, keyWord });
      if (res && res.flag) {
        let { resData } = res;
        resData &&
          resData.length > 0 &&
          resData.map((item) => {
            if (!item.avatarUrl) {
              item.avatarUrl = this.$store.state.user.avatar;
            }
          });
        this.commentList = resData;
      }
    },
    openReplyDialog(item) {
      const reply = this.$refs.ReplyDialog;
      reply.openDialog();
      reply.item = item;
    },
    openQuestionDialog() {
      const question = this.$refs.QuestionDialog;
      question.openDialog();
      question.courseId = this.courseId;
    },
    openQuestionDetailDialog(item) {
      const QuestionDetailDialog = this.$refs.QuestionDetailDialog;
      QuestionDetailDialog.openDialog();
      QuestionDetailDialog.commentId = item.id;
      QuestionDetailDialog.courseId = this.courseId;
      QuestionDetailDialog.queryCommentDetail();
      QuestionDetailDialog.getList();
      // question.item = item;
    },
    handleLike() {
      this.isLike = !this.isLike;
    },
  },
};
</script>

<style lang="scss" scoped>
.reply-container {
  padding: 10px;
  // width: 900px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.head-container {
  display: flex;
  align-items: center;
  height: 100%;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}
.left-container {
  width: 70%;
}
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 78px;
}
.reply-list {
  // width: 900px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
  max-height: 600px;
}
.reply-item {
  // // height: 70px;
  // padding: 6px;
  //   width: 900px;
  border: 1px solid #ccc;
  border-radius: 0px;

  .right-container {
    @extend .right-container;
  }
}
.reply2-container {
  // width: 900px;
}
</style>
