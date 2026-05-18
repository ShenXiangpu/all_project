<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="cancel"
    :close-on-click-modal="false"
    :style="{ '--color': defaultTheme || '#10abb9' }"
  >
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="formDataRules"
      class="el-form-edu"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="formData.userName"
          id="userName2"
          class="el-input-edu"
          placeholder="请输入用户名称"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          id="passwords"
          type="password"
          class="el-input-edu ipt"
          placeholder="请输入密码"
          auto-complete="new-password"
          show-word-limit
        />
      </el-form-item>
      <!-- 权限标识 -->
      <!-- <el-form-item prop="roleName" label="所属角色">
          <el-select
            class="el-input-edu"
            v-model="formData.roleName"
            id="roleId"
            placeholder="请选择角色"
            @change="handleRoles"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item> -->
      <!-- 权限标识 -->
      <el-form-item label="手机号" prop="phone">
        <el-input
          maxlength="11"
          class="el-input-edu"
          v-model="formData.phone"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <!-- <el-form-item
          label="工号"
          prop="studentNum"
          :rules="[
            { required: true, message: '请输入工号', trigger: 'blur' },
            { pattern: /^[0-9]*$/, message: '请输入数字工号' },
          ]"
        >
          <el-input
            v-model="formData.studentNum"
            class="el-input-edu"
            placeholder="请输入工号"
          />
        </el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          class="el-input-edu"
          v-model="formData.email"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item prop="deptId" label="所属部门/职位">
        <el-cascader
          clearable
          class="el-input-edu"
          placeholder="请选择"
          v-model="formData.deptAndPostId"
          :options="allDeptList"
          @change="OptionChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item prop="leaderId" label="直属上级">
        <el-select
          filterable
          clearable
          class="el-input-edu"
          v-model="formData.leaderId"
          id="roleId"
          placeholder="请选择直属上级(支持输入查询)"
        >
          <el-option
            v-for="item in allUsersList"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveUser, updUser } from "@/api/crm/system";
import {
  subordinateList,
  getDeptList,
  getAllPostList,
} from "@/api/crm/organization";
import { getPostList, getAllUserSelect, editUserStatus } from "@/api/crm/user";
import { Encrypt } from "@/utils/secret";
import { Message } from "element-ui";
export default {
  name: "AddDialog",
  props: {},
  components: {},
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  watch: {},
  mounted() {
    this.handleDeptQuery();
    this.queryAllUserSelect();
    this.getAllPostList();
  },
  data() {
    return {
      formData: {
        userName: "", // 父级菜单
        password: "",
        phone: "",
        email: "",
        deptId: "",
        leaderId: "",
        postId: "",
        deptAndPostId: [],
      },
      isShowCascader: true,
      loading: false,
      formDataRules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],

        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],

        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?)$/,
            message: "请输入合法邮箱",
            trigger: "blur",
          },
        ],
        deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
        postId: [{ required: true, message: "请选择职位", trigger: "blur" }],
        leaderId: [
          { required: false, message: "请选择角色类型", trigger: "blur" },
        ],
      },
      ids: [],
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改用户",
        create: "创建用户",
        look: "",
      },
      allUsersList: [],
      allDeptList: [], //所有部门以及部门下的职位
      deptList: [],
      postList: [], //全部职位
    };
  },

  methods: {
    //直属上级
    queryAllUserSelect() {
      getAllUserSelect().then((res) => {
        if (res && res.flag) {
          this.allUsersList = res.resData;
        }
      });
    },
    OptionChange(e) {
      let deptId = e[0];
      let postId = e[1];
      this.formData.deptId = deptId;
      this.formData.postId = postId;
    },
    //查询级联菜单
    async handleDeptQuery() {
      let listQuery = {
        page: 1,
        limit: 500,
        params: {},
      };
      const res = await subordinateList(listQuery);
      if (res && res.flag) {
        let resData = res.resData;
        let allDeptList = [];
        let records = resData.records;
        records.map((item) => {
          let obj = {
            value: item.id,
            label: item.name,
          };
          let postList = item && item.postList;
          let children = [];
          if (postList && postList.length > 0 && Array.isArray(postList)) {
            postList.map((postItem) => {
              let pObj = {
                value: postItem.id,
                label: postItem.postName,
              };
              children.push(pObj);
            });
          }
          obj.children = children;
          allDeptList.push(obj);
        });
        console.log(allDeptList);
        this.allDeptList = allDeptList;
      } else {
      }
    },

    getAllPostList() {
      getAllPostList().then((res) => {
        if (res && res.flag) {
          this.postList = res.resData;
        }
      });
    },
    handleAdd() {
      let _this = this;
      let dialog = {
        status: "create",
        visible: true,
      };

      _this.dialog = dialog;
      _this.isShowCascader = true;
      _this.initParams();
      // _this.formData.deptAndPostId = [1, 9]; //默认选中
    },

    initParams() {
      let formData = {
        userName: "", // 父级菜单
        password: "",
        phone: "",
        email: "",
        deptAndPostId: [],
        deptId: "",
        postId: "",
        leaderId: "",
      };
      this.formData = formData;
    },
    submitForm(e) {
      this.$refs.dataFormRef.validate(async (valid) => {
        if (valid) {
          let password = Encrypt(this.formData.password);
          this.formData.password = password;
          let status = this.dialog.status;
          const res =
            status == "create"
              ? await saveUser(this.formData)
              : await updUser({ id: this.userId, ...this.formData });
          if (res && res.flag) {
            Message.success(status == "create" ? "添加成功" : "修改成功");
            this.cancel(); //关闭弹框并初始化
            // this.handleEquForm = handleEquForm
            this.initParams();
          } else {
            console.log('123444');
            
            Message.success(res.errMessage);
            this.formData.password = "";
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.initParams();
      _this.dialog = dialog;
      _this.isShowCascader = false;
      _this.$refs.dataFormRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 500px;
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

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }
    .el-input-edu {
      width: 300px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }
  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
