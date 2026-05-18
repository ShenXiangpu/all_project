<template>
  <div class="course-container">
    <el-card class="el-card-edu" v-loading="loading">
      <template v-if="!isStudent" #header>
        <el-button
          v-if="userRolesNames == '系统最高管理员'"
          type="primary"
          @click="addChapter"
          >添加模块</el-button
        >
      </template>

      <div v-for="item in chapterList" :key="item.id">
        <s-x-tree
          :isStudent="isStudent"
          :iconClass="iconClass"
          :item="item"
          @addSubsection="addSubsection"
          @openTreeItem="openTreeItem"
          @editSubsection="editSubsection"
          @delChapterOrFile="delChapterOrFile"
          @queryDetail="queryDetail"
          @queryList="queryChapterList"
          @addDescribe="addDescribe"
        ></s-x-tree>
      </div>
      <div
        v-if="!(chapterList && chapterList.length > 0)"
        class="text-center"
        style="color: #999"
      >
        暂无数据
      </div>
    </el-card>
    <chapter-dialog
      :roleType="roleType"
      @openChapter="openChapter"
      @queryChapterList="queryChapterList"
      :courseId="courseId"
      @addDescribe="addDescribe"
      ref="chapter-dialog"
    ></chapter-dialog>
    <!-- <upload-dialog  @openChapter='openChapter' :sectionId="sectionId" @getFileList="queryChapterList" ref="upload-dialog"></upload-dialog> -->
    <detail-drawer
      :complete="complete"
      :inComplete="inComplete"
      ref="detail-drawer"
    ></detail-drawer>
  </div>
</template>

<script>
const roleObj = {
  系统最高管理员: "supremeAdmin",
  学校管理员: "EduSchoolAdmin",
  老师: "EduTeacher",
  学生: "EduStudent",
};
import SXTree from "./SXTree/index.vue";
import ChapterDialog from "./ChapterDialog.vue";
// import UploadDialog from './UploadDialog.vue'
import DetailDrawer from "./DetailDrawer.vue";
import { mapGetters } from "vuex";
import {
  listSections,
  delChapterOrFile,
  getStudentLearnDetail,
} from "@/api/edu/courseRourse";
import {
  saveOperationManual,
  listOperation,
  getDetailById,
  delById,
} from "@/api/edu/operation";

export default {
  name: "",
  components: {
    SXTree,
    ChapterDialog,
    // UploadDialog,
    DetailDrawer,
  },
  props: {
    courseId: {
      default: "0" | 0,
      type: String | Number,
    },
    isStudent: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {},
  mounted() {
    let userRolesNames = this.$store.state.user.userRolesNames;
    const roleType = this.roleObj[userRolesNames];

    listOperation({ roleType }).then((res) => {
      if (res && res.flag) {
        // 处理章节列表，根据章节列表造一个对应是否展开的
        this.chapterList = this.handleList(res.resData);

        this.$emit("addDescribe", this.chapterList[0], false);
      }
    });
  },
  watch: {
    roleType: {
      handler(val) {
        this.roleType = val;
        this.loading = true;
        listOperation({ roleType: val })
          .then((res) => {
            if (res && res.flag) {
              // 处理章节列表，根据章节列表造一个对应是否展开的
              this.chapterList = this.handleList(res.resData);

              this.$emit("addDescribe", this.chapterList[0], false);
              this.loading = false;
            } else {
              this.loading = false;
            }
          })
          .finally((res) => {
            this.loading = false;
          });
      },
    },
  },
  data() {
    return {
      iconClass: "iconClass",
      chapterList: [],
      sectionId: "",
      complete: [],
      inComplete: [],
      statusObj: {},
      roleType: "",
      roleObj: roleObj,
      loading: false,
    };
  },
  destroyed() {
    console.log("触发");
  },
  methods: {
    queryDetail(item) {
      let sectionId = item.id;
      let isSection = item && item.fileType ? false : true;
      this.complete = [];
      this.inComplete = [];
      this.$refs["detail-drawer"].tableData = [];

      getStudentLearnDetail({ sectionId, isSection }).then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          let complete = resData.complete;
          let inComplete = resData.incomplete;
          this.complete = complete;
          this.inComplete = inComplete;
          this.$refs["detail-drawer"].title = isSection
            ? item.sectionName
            : item.name;
          this.$refs["detail-drawer"].chapterId = sectionId;
          this.$refs["detail-drawer"].isSection = isSection;
          this.$refs["detail-drawer"].index = 1;
          this.$refs["detail-drawer"].tableData = complete;
          this.$refs["detail-drawer"].handleOpen();
        }
      });
    },
    uploadFile(item) {
      this.sectionId = item.id;
      this.$refs["upload-dialog"].title = "";
      this.$refs["upload-dialog"].handleOpen();
    },
    delChapterOrFile(item) {
      let id = item.id;
      delById({
        id,
      }).then((res) => {
        if (res && res.flag) {
          this.$message.success("删除成功");
          this.queryChapterList();
        }
      });
    },
    // 添加章节
    addChapter() {
      const chapter = this.$refs["chapter-dialog"];
      chapter.title = "模块";
      chapter.chapterItem = {};
      chapter.handleOpen();
      chapter.clearTinymce();
    },
    //查询章节及文件list
    queryChapterList() {
      const roleType = this.roleType;
      this.loading = true;
      listOperation({ roleType })
        .then((res) => {
          if (res && res.flag) {
            // 处理章节列表，根据章节列表造一个对应是否展开的
            this.chapterList = this.handleList(res.resData);
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    //handleListIsOpen 处理列表展开收起
    handleList(list) {
      let sObj = this.statusObj;
      list &&
        list.length > 0 &&
        list.map((res) => {
          res.isOpen = sObj[res.id] || false;
          if (res && res.children && res.children.length > 0) {
            this.handleList(res.children);
          }
        });
      return list;
    },
    handleListIsOpen(list, id) {
      list &&
        list.length > 0 &&
        list.forEach((item) => {
          if (item.id === id) {
            item.isOpen = !item.isOpen;
            return;
          }

          if (item.children && item.children.length > 0) {
            this.handleListIsOpen(item.children, id);
          }
          //存储状态到数组中，请求接口后回显到列表中
        });
      let statusObj = {};
      statusObj = this.chapterOpenStatus(list, statusObj);
      console.log(statusObj);
      this.statusObj = statusObj;
    },
    chapterOpenStatus(list, statusObj) {
      list &&
        list.length > 0 &&
        list.forEach((item) => {
          let id = item.id;
          let isOpen = item.isOpen;
          statusObj[id] = isOpen;
          if (item.children && item.children.length > 0) {
            this.chapterOpenStatus(item.children, statusObj);
          }
        });

      return statusObj;
    },
    openChapter(id) {
      this.statusObj[id] = true;
      const chapter = this.$refs["chapter-dialog"];
      chapter.clearTinymce();
      this.queryChapterList();
    },

    openTreeItem(item) {
      this.handleListIsOpen(this.chapterList, item.id);
    },
    addDescribe(item, isAdd) {
      this.$emit("addDescribe", item, isAdd);
    },
    addSubsection(item) {
      console.log(item);
      const chapter = this.$refs["chapter-dialog"];
      chapter.chapterItem = item;
      chapter.title = "子模块";
      chapter.ruleForm.name = "";
      chapter.handleOpen();
      chapter.clearTinymce();
      chapter.dialogVisible.status = "create";
    },
    editSubsection(item) {
      let level = item.level;
      const chapter = this.$refs["chapter-dialog"];
      chapter.dialogVisible.status = "update";
      chapter.chapterItem = item;
      chapter.ruleForm.name = item.name;
      chapter.ruleForm.content = item.content;
      chapter.title = level == 1 ? "模块" : "子模块";
      chapter.handleOpen();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card-edu {
  ::v-deep {
    .el-card__body {
      max-height: calc(100vh - 180px);
      overflow: auto;
    }
  }
}
</style>
