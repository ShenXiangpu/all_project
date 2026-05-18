<template>
  <el-dialog
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    @close="alarmClose"
    class="el-dialog-edu"
  >
    <el-card>
      <div
        class="reply-container flex justify-between marginBottom10"
        v-for="item in commentList"
        :key="item.id"
      >
        <div class="left-container flex">
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
            <comment-container :text="item.commentContent" />
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
                @onConfirm="handleDeleteQuestion(item, 'detail')"
              >
                <i slot="reference" class="el-icon-delete font16"></i>
              </el-popconfirm>
            </div>
          </div>
          <div class="primaryColorb fontW7 pointer">
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
      <div class="reply2-container">
        <div class="marginBottom10 font18 fontW7">回复</div>
        <div class="reply-list">
          <reply-item
            @openReplyDialog="openReplyDialog"
            @handleDeleteQuestion="handleDeleteQuestion"
            v-for="item in replyList"
            :item="item"
            :key="item.id"
          />
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
        <reply-dialog ref="ReplyDialog" @searchQuery="getList" />
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import {
  delQuerstion,
  addComment,
  getCommentDetail,
  getReplyListByPage,
} from "@/api/edu/reply";
import Like from "./Like.vue";
import ReplyItem from "./ReplyItem.vue";
import ReplyDialog from "./ReplyDialog.vue";
import Pagination from "@/components/Pagination";
import CommentContainer from "./CommentContainer.vue";
export default {
  name: "QuestionDetailDialog",
  props: {},
  components: { Like, ReplyItem, ReplyDialog, Pagination, CommentContainer },
  watch: {},
  data() {
    return {
      item: {},
      total: 0,
      courseId: "",
      dialog: {
        visible: false,
        status: "create",
      },
      queryParams: {
        page: 1,
        limit: 10,
        id: "",
      },
      replyList: [],
      textMap: {
        update: "回复列表",
        create: "回复列表",
        look: "回复列表",
      },
      /**
       * 告警策略
       */
      alarmForm: {
        commentContent: "", //告警描述
      },
      alarmRules: {
        commentContent: [
          {
            required: true,
            message: "请输入问题",
            trigger: "blur",
          },
        ],
      },
      commentId: "",
      commentList: {},
      parentId: 0,
    };
  },
  methods: {
    openReplyDialog(item) {
      console.log("openReplyDialog", item);
      const reply = this.$refs.ReplyDialog;
      reply && reply.openDialog();
      item.replyCommentId = item && item.id;
      item.parentId = this.parentId;
      reply.courseId = this.courseId;
      reply.item = item;
    },
    queryCommentDetail() {
      let id = this.commentId;
      getCommentDetail({ id }).then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          if (!resData.avatarUrl) {
              resData.avatarUrl = this.$store.state.user.avatar;
            }
           
          this.commentList = [resData];
          this.parentId = resData.id;
        }
      });
    },

    async handleDeleteQuestion(item, isDetail) {
      let id = item.id;
      const res = await delQuerstion({ id });
      if (res && res.flag) {
        if (isDetail == "detail") {
          this.$message.success("删除成功");
          this.commentList = [];
          this.replyList = [];
        } else {
          this.$message.success("删除成功");
          this.handleQuery();
        }
      }
    },

    searchQuery(e) {
      this.queryParams = e;
      this.getList();
    },
    getList() {
      let id = this.commentId;
      this.queryParams.id = id;
      this.loading = true;
      getReplyListByPage(this.queryParams)
        .then((reponse) => {
          let resData = reponse.resData;
          let { list,total } = resData;
        list &&
          list.length > 0 &&
          list.map((item) => {
            if (!item.avatarUrl) {
              item.avatarUrl = this.$store.state.user.avatar;
            }
          });
          this.replyList = list;
          
          this.total = resData.total;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleQuery(e) {
      this.getList();
    },
    //重置搜索条件

    openDialog() {
      let dialog = {
        status: "create",
        visible: true,
      };
      this.replyList = [];
      this.total = 0;
      this.item = {};
      this.dialog = dialog;
    },
    alarmClose() {
      this.dialog.visible = false;
      //查询共计回复条数
      this.$emit("searchQuery");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 900px;
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }
    .el-input-edu {
      width: 300px !important;
    }
    .el-form-item__error {
      margin-left: 100px;
    }
  }
}

.reply-container {
  padding: 10px;
  // width: 900px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.head-container {
  display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  // align-items: center;
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
  height: 80;
}
.reply-list {
  // width: 900px;
  min-height: 170px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
  max-height: 500px;
}
.reply-item {
  // height: 70px;
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
.commentContent {
  width: 500px;
}
</style>
