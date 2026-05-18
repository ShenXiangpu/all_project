<template>
  <div class="app-container">
    <border-container
      v-permission="['sso:behaviorLog:getUserOperateLog']"
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item prop="operation" label="操作类型">
              <el-select
                class="inputClass"
                v-model="queryParams.operation"
                @change="handleQueryInitPage"
                placeholder="请选择角色"
              >
                <el-option label="-- 全部 --" value=""></el-option>
                <el-option
                  v-for="item in roleList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="keyWord" label="用户名">
              <el-input
                class="inputClass"
                v-model="queryParams.keyWord"
                placeholder="请输入用户名进行查询"
                clearable
                @keyup.enter="handleQueryInitPage"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="success"
                class="editSuccess"
                icon="el-icon-search"
                @click="handleQueryInitPage"
                >搜索</el-button
              >
              <el-button
                type="primary"
                class="editPrimary"
                icon="el-icon-refresh"
                @click="resetQuery"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card>
      <el-table ref="dataTableRef" v-loading="loading" :data="usersList">
        <el-table-column label="ID" prop="id" min-width="100" align="center" />
        <el-table-column
          label="操作类型"
          prop="type"
          width="150"
          align="center"
        />
        <el-table-column
          label="执行者"
          prop="userName"
          width="150"
          align="center"
        />

        <el-table-column
          label="所在公司"
          prop="companyName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="操作IP"
          prop="ip"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.ip">{{ scope.row.ip }}</div>
            <div v-else>- - -</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          prop="createdAt"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.createdAt">{{ scope.row.createdAt }}</div>
            <div v-else>- - -</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作浏览器"
          prop="userAgent"
          min-width="150"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作数据"
          prop="etc"
          min-width="180"
          align="center"
          show-overflow-tooltip
        />
      </el-table>

      <!-- pagination -->
      <pagination
        v-if="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="searchQuery"
      />
    </el-card>
  </div>
</template>
<script>
import {
  getRoleList,
  getListForFont,
  getRoleMenuList,
  saveUser,
  updUser,
  listUsers,
  getUserDetailById,
  delUser,
  downEduUserTemplate,
  insertUserBatch,
} from "@/api/system";
import { getUserOperateType, getUserOperateLog } from "@/api/edu/userBehavior";
import { Message } from "element-ui";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
import { checkPermission } from "@/utils/validate";
import { Encrypt } from "@/utils/secret";
import BorderContainer from "@/components/BorderContainer";
export default {
  components: {
    Pagination,
    BorderContainer,
  },
  data() {
    return {
      roleName: "学生",
      roleList: [], //
      usersList: [],
      queryParams: {
        operation:"",
        keyWord: "",
        roleId: "",
        grade: "",
        className: "",
        studentNum: "",
        page: 1,
        limit: 10,
      },
      total: "",
      dialog: {
        title: "",
        visible: false,
      },
      formData: {
        userName1: "", // 父级菜单
        roleId: "",
        roleName: "",
        password1: "",
        phone: "",
        studentNum: "",
        grade: "",
        className: "",
        email: "",
      },
      loading: false,
      formDataRules: {
        userName1: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        roleName: [
          { required: true, message: "请选择角色类型", trigger: "blur" },
        ],
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        studentNum: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            pattern: /^[0-9]*$/,
            message: "请输入数字工号",
          },
        ],
        grade: [
          { required: true, message: "请输入入学年份", trigger: "blur" },
          {
            pattern: /^\d{4}$/,
            message: "请输入正确的年份",
          },
        ],
        className: [{ required: true, message: "请输入班级", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?)$/,
            message: "请输入合法邮箱",
            trigger: "blur",
          },
        ],
      },
      ids: [],
      menuDialogVisible: false,
      resourceOptions: [],
      // 选中的角色
      checkedRole: {
        id: "",
        name: "",
      },
      menuList: [], // 菜单列表
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkMenuKeys: [],
      defaultCheckedKeys: [], //回显数据
      roleId: "", //点击资源分配获得id
      isHas: false,
      userId: "",
      insertLoading: false,
    };
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {},
  mounted() {
    this.handleQuery();
    this.queryUserOperateType();
  },
  methods: {
    //查询角色列表
    async queryUserOperateType() {
      const res = await getUserOperateType();
      if (res && res.flag) {
        const resData = res.resData;

        this.roleList = resData;
      }
    },

    handleAdd() {
      let _this = this;
      let dialog = {
        title: "添加",
        visible: true,
      };
      this.initParams();
      _this.dialog = dialog;
    },

    initParams() {
      let formData = {
        userName1: "", // 父级菜单
        roleId: "",
        password1: "",
        phone: "",
        studentNum: "",
        grade: "",
        className: "",
        email: "",
      };
      this.formData = formData;
      this.roleName = "";
    },
    initQueryParams() {
      let queryParams = {
        operation:"",
        keyWord: "",
        roleId: "",
        grade: "",
        className: "",
        studentNum: "",
        limit: 10,
        page: 1,
      };
      this.queryParams = queryParams;
    },

    searchQuery(e) {
      this.queryParams.page = e.page;
      this.queryParams.limit = e.limit;
      this.handleQuery();
    },
    handleQueryInitPage() {
      this.queryParams.page = 1;
      // this.queryParams.limit = 10;
      this.handleQuery();
    },
    //查询角色列表
    async handleQuery() {
      const params = this.queryParams;
      this.loading = true;
      const res = await getUserOperateLog(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.usersList = resData.list;
        this.total = resData.total;
        this.page = resData.pageNum;
      } else {
        this.loading = false;
      }
    },

    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      //this.initQueryParams();
      this.queryParams.page = 1;
      this.handleQuery({});
    },
    // 获取多删除ids
    handleSelectionChange(e) {
      let rowList = e;
      if (rowList && rowList.length > 0) {
        let ids = [];
        rowList.map((i) => {
          ids.push(i.id);
        });
        this.ids = ids;
      } else {
        this.ids = [];
      }
    },

    handleRowClick(e) {},
    //点击资源分配，打开弹出框，搜索获得角色菜单（all）和角色菜单
    
  },
};
</script>
<style scoped lang="scss">
.border-container {
  ::v-deep {
    .left-circle {
      width: 16px;
      height: 32px;
      border-radius: 0 16px 16px 0;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 0 8px 8px 0;
        top: 6px;
      }
    }

    .right-circle {
      width: 16px;
      height: 32px;
      border-radius: 16px 0 0 16px;
      right: -2px;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 8px 0 0 8px;
        top: 6px;
      }
    }
  }
}

.inputClass {
  width: 250px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}
</style>
