<template>
  <el-dialog
    :title="title"
    :show-close="true"
    destroy-on-close
    :visible.sync="dialogVisible.visible"
    width="700px"
    style="height: 100vh; overflow: auto; padding: 20px"
    @closed="reset('ruleForm')"
    @close="handleClose('ruleForm')"
  >
    <el-input
      style="width: 400px"
      class="marginBottom10"
      placeholder="请输入内容"
      v-model="projectNumber"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchProject"
      ></el-button>
    </el-input>
    <div class="color9 marginBottom10">
      注意：项目编号是项目的唯一标识，请向项目创建人或项目成员索要项目编号
    </div>

    <div
      v-if="project.projectName"
      class="flex justify-between"
      style="border: 1px solid #ddd; border-radius: 6px; padding: 10px"
    >
      <div class="flex justify-between align-center">
        <i class="el-icon-s-custom marginRight10 head primaryColorb"></i>
        <div>
          <div>{{ project.projectName }}</div>
          <div>
            创建人：<span class="primaryColorb">{{ project.ownerName }}</span>
          </div>
          <div>
            项目介绍：<span>{{ project.description || "-" }}</span>
          </div>
        </div>
      </div>

      <div>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-plus"
          @click="addProject"
          >加入项目</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getProjectByNum, personApply } from "@/api/edu/projectMng.js";

export default {
  name: "",
  components: {
    // VuePpt,
  },
  props: {},
  watch: {},
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {},
  mounted() {
    // 获取视频总时长
  },
  data() {
    return {
      projectNumber: "",
      project: {},
      dialogVisible: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改",
        create: "申请加入项目",
      },
      title: "申请加入项目",
      url: "",
      fileId: "",
      fileType: "",
      completed: 0,
    };
  },
  methods: {
    addProject() {
      let projectNumber = this.projectNumber;
      personApply({ projectNumber }).then((res) => {
        if (res && res.flag) {
          this.$message.success("申请成功");
          this.dialogVisible.visible = false;
          this.project = {};
          this.projectNumber = "";
        }
      });
    },
    searchProject() {
      let projectNumber = this.projectNumber;
      getProjectByNum({ projectNumber }).then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          let project = resData;
          this.project = project;
        }
      });
    },

    handleClose() {
      this.dialogVisible.visible = false;
      this.project = {};
      this.projectNumber = "";
    },

    reset(formName) {
      this.handleClose();
    },
    submitForm(formName) {
      this.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  font-size: 55px;
}
</style>