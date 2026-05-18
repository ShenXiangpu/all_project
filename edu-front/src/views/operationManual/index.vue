<template>
  <div class="app-container">
    <el-tabs
      class="el-tab-edu"
      v-model="activeName"
      @tab-click="handleClick"
      v-if="userRolesNames === '系统最高管理员'"
    >
      <el-tab-pane label="系统最高管理员" name="first"> </el-tab-pane>
      <el-tab-pane label="学校管理员" name="second"> </el-tab-pane>
      <el-tab-pane label="老师" name="third"> </el-tab-pane>
      <el-tab-pane label="学生" name="fourth"> </el-tab-pane>
    </el-tabs>
    <el-row :gutter="20"
      ><el-col :span="10">
        <div class="left-caontainer">
          <course-mng-com
            ref="course-mng-com"
            @addDescribe="addDescribe"
            @clearTinymce="clearTinymce"
          ></course-mng-com>
        </div>
      </el-col>
      <el-col :span="14">
        <div
          class="font16 fontW7 marginBottom10"
          v-if="describeItemEdit && describeItemEdit.name"
        >
          {{ describeItemEdit && describeItemEdit.name }}
        </div>
        <div class="right-caontainer marginBottom20">
          <edu-tinymce
            class="edu-tinymce-operation"
            ref="edu-tinymce-operation"
            :value="describeItemEdit && describeItemEdit.content"
            :disabled="!isAdd"
          ></edu-tinymce>
        </div>
        <div
          class="flex justify-center footer"
          v-if="isAdd && userRolesNames === '系统最高管理员'"
        >
          <el-button
            size="small"
            class="marginRight20"
            @click="handleClose('ruleForm')"
          >
            取消
          </el-button>
          <el-button
            size="small"
            type="primary"
            :loading="loading"
            @click="submitForm('ruleForm')"
          >
            保存
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const roleObj = {
  first: "supremeAdmin",
  second: "EduSchoolAdmin",
  third: "EduTeacher",
  fourth: "EduStudent",
};
import {
  saveOperationManual,
  listOperation,
  getDetailById,
  delById,
} from "@/api/edu/operation";
import CourseMngCom from "./components/CourseMngCom.vue";
import { mapGetters } from "vuex";
import EduTinymce from "@/components/Edu-tinymce";
export default {
  name: "operationManual",
  components: { CourseMngCom, EduTinymce },
  created() {},
  mounted() {
    let userRolesNames = this.$store.state.user.userRolesNames;
    if (userRolesNames === "系统最高管理员") {
      const courseCom = this.$refs["course-mng-com"];
      courseCom.roleType = roleObj["first"];
    }
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
      isAdd: false,
      describeItem: {},
      describeItemEdit: {},
      loading: false,
      activeName: "first",
      roleObj: roleObj,
    };
  },
  methods: {
    handleClick() {
      const roleObj = this.roleObj;
      const activeName = this.activeName;
      const courseCom = this.$refs["course-mng-com"];
      courseCom.roleType = roleObj[activeName];
      // courseCom && courseCom.queryChapterList();
      // this.addDescribe(courseCom.chapterList[0], false);
    },
    handleClose() {
      this.isAdd = false;
      this.describeItemEdit = this.describeItem;
      this.$refs["edu-tinymce-operation"].content = this.describeItem.content;
    },
    submitForm(formName) {
      let data = {};
      let content = this.$refs["edu-tinymce-operation"].getContent();
      console.log(this.describeItemEdit);
      let item = this.describeItemEdit;
      let level = item.level;
      let id = item.id;
      let name = item.name;
      if (level == 1) {
        data = {
          name,
          content,
          level,
          id,
        };
      } else {
        let parentId = item.parentId;
        data = {
          parentId,
          name,
          content,
          level,
          id,
        };
      }

      this.loading = true;
      saveOperationManual(data)
        .then((res) => {
          if (res && res.flag) {
            this.$message.success(`添加成功`);
            this.$refs["course-mng-com"].queryChapterList();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clearTinymce() {
      this.describeItem = {};
      this.describeItemEdit = {};
      this.isAdd = false;
      if (this.describeItem && this.describeItem.content) {
        this.$refs["edu-tinymce-operation"].content = "";
      }
    },
    addDescribe(item, isAdd) {
      if (!(item && item.content)) {
        this.$refs["edu-tinymce-operation"].content = "";
      }
      this.describeItem = item;
      this.describeItemEdit = item;
      this.isAdd = isAdd;
    },
  },
};
</script>

<style lang="scss" scoped>
.edu-tinymce-operation {
  ::v-deep {
    .tox,
    .tox-tinymce {
      width: 100% !important;
      max-width: 965px !important;
      max-height: calc(100vh - 100px) !important;
    }
  }
}
</style>
