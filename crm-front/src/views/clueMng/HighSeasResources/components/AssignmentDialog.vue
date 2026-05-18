<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
    :close-on-click-modal="false"
    :style="{ '--color': defaultTheme || '#10abb9' }"
  >
    <el-form
      :inline="true"
      :model="queryParams"
      ref="queryParams"
      class="demo-form-inline"
    >
      <el-form-item label="用户名" prop="keyWord" class="marginRight20">
        <el-input
          clearable
          placeholder="请输入用户名"
          v-model="queryParams.keyWord"
          class="el-input-edu"
        >
          <!-- <el-button slot="append" icon="el-icon-search" @click="handleQueryList"></el-button> -->
        </el-input>
      </el-form-item>
      <el-form-item label="部门" prop="deptId" class="marginRight20">
        <el-select
          class="inputClass"
          v-model="queryParams.deptId"
          placeholder="请选择部门"
        >
          <!-- <el-option label="全部部门" value=""></el-option> -->
          <el-option
            v-for="item in allDeptList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="postId" class="marginRight20">
        <el-select
          class="inputClass"
          v-model="queryParams.postId"
          placeholder="请选择职位"
        >
          <!-- <el-option label="全部部门" value=""></el-option> -->
          <el-option
            v-for="item in allPostList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          class="editSuccess"
          icon="el-icon-search"
          @click="handleQuery()"
          >搜索</el-button
        >
        <el-button
          type="primary"
          class="editPrimary"
          icon="el-icon-refresh"
          @click="resetQuery()"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      height="30vh"
      :data="userList"
      :loading="loading"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="选择" width="55" align="center">
        <template slot-scope="scope">
          <el-radio
            v-model="tableRadio"
            :label="scope.row.id"
            @change="getTableItem"
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>

      <el-table-column
        label="用户名称"
        prop="userName"
        width="150"
        align="center"
      />
      <el-table-column
        label="联系方式"
        prop="phone"
        min-width="150"
        align="center"
      />
      <el-table-column
        label="所属部门"
        prop="deptName"
        min-width="150"
        align="center"
      />
      <el-table-column
        label="职位名称"
        prop="postName"
        min-width="150"
        align="center"
      />
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="searchQuery"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="subloading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getDeptList, getAllPostList } from "@/api/crm/organization";
import { addMoreRel } from "@/api/crm/highSeasResources";

import { listUsers } from "@/api/crm/system";
export default {
  name: "AssignmentDialog",
  props: {},
  components: {
    Pagination,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      queryParams: {
        keyWord: "",
        postId: "",
        deptId: "",
        page: 1,
        limit: 10,
      },
      total: 0,
      userList: [],
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "请选择分配人",
        create: "请选择分配人",
        look: "",
      },

      loading: false,
      subloading: false,
      tableRadio: "",
      allPostList: [],
      allDeptList: [],
      userId: "",
      clueId: "",
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    async queryDeptList() {
      const res = await getDeptList();
      if (res && res.flag) {
        this.allDeptList = res.resData;
      }
    },

    async queryPostList() {
      const res = await getAllPostList();
      if (res && res.flag) {
        this.allPostList = res.resData;
      }
    },

    //查询角色列表
    async handleQuery() {
      const params = this.queryParams;
      this.loading = true;
      const res = await listUsers(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.userList = resData.records;
        this.total = resData.total;
        this.page = resData.pageNum;
      } else {
        this.loading = false;
      }
    },
    searchQuery(e) {
      this.queryParams.page = e.page;
      this.queryParams.limit = e.limit;
      this.handleQuery();
    },
    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryParams.resetFields();
      this.queryParams.page = 1;
      this.handleQuery({});
    },
    getTableItem(e) {
      this.userId = e;
    },
    handleSelectionChange(val) {
      console.log(this.tableRadio);
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    submitUpload() {
      if (!this.userId) {
        return this.$message.error("请选择分配人");
      }
      const params = {
        userId: [this.userId],
        clueId: this.clueId,
      };
      this.subloading = true;
      addMoreRel(params).then((res) => {
        this.subloading = false;
        if (res && res.flag) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.dialog.visible = false;
          this.$emit("queryList");
        }
      });
    },
    handleClose() {
      this.$refs["queryParams"].resetFields();
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 1000px;
    }
    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
}
.el-input-edu {
  width: 150px;
}
</style>
