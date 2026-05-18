<template>
  <div>
    <border-container
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div class="form-container1" style="">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item prop="keyWord" label="用户名称">
              <el-input
                class="el-input-edu"
                v-model="queryParams.keyWord"
                placeholder="请输入用户名称"
                clearable
                @keyup.enter="handleQueryInitPage"
              />
            </el-form-item>

            <el-form-item prop="deptId" label="所属部门">
              <el-select
                class="el-input-edu"
                v-model="queryParams.deptId"
                id="roleId"
                placeholder="请选择部门"
                @change="handleQueryInitPage"
              >
                <!-- <el-option label="全部部门" value=""></el-option> -->
                <el-option
                  v-for="item in allDeptList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item prop="postId" label="职位">
              <el-select
                class="el-input-edu"
                v-model="queryParams.postId"
                id="roleId"
                placeholder="请选择职位"
                @change="handleQueryInitPage"
              >
                <el-option
                  v-for="item in postList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item prop="status" label="用户状态">
              <el-select
                class="el-input-edu"
                v-model="queryParams.status"
                placeholder="用户状态"
                @change="handleQueryInitPage"
              >
                <el-option label="全部状态" value=""></el-option>
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
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
      <template #header v-if="userRolesNames != '老师'">
        <div class="flex justify-between">
          <div>
            <el-button
              v-permission="['system:user:saveUser']"
              style="margin-right: 20px"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              >新增</el-button
            >

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDeleteIds(ids)"
              onCancel=""
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
                :disabled="ids && ids.length === 0"
                v-permission="['system:user:delUser']"
                >批量删除
              </el-button>
            </el-popconfirm>
          </div>
          <div class="flex">
            <!-- <div>

                        </div>
                        <div>

                        </div> -->
            <el-button
              style="margin-right: 20px"
              type="info"
              class="editInfo font14"
              size="small"
              icon="el-icon-download"
              @click="downLoadFile"
              v-permission="['system:user:downUserTemplate']"
              >导出模板</el-button
            >
            <el-upload
              ref="upload"
              action
              :http-request="doUpload"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :auto-upload="true"
            >
              <el-button
                :loading="insertLoading"
                v-permission="['system:user:insertUserBatch']"
                slot="trigger"
                type="info"
                class="editInfo"
                icon="el-icon-upload2"
                >批量导入</el-button
              >
            </el-upload>
          </div>
        </div>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="usersList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="用户ID"
          prop="id"
          min-width="100"
          align="center"
        />
        <el-table-column
          label="用户名"
          prop="userName"
          width="150"
          align="center"
        />

        <el-table-column
          label="所属部门"
          prop="deptName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="职位"
          prop="postName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="联系方式"
          prop="phone"
          min-width="150"
          align="center"
        />

        <el-table-column
          label="邮箱"
          prop="email"
          min-width="150"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="直属上级"
          prop="leaderName"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <span v-if="scope.row.leaderName">{{ scope.row.leaderName }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>

        <el-table-column
          label="用户状态"
          prop="status"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <el-switch
              v-if="checkPermission(['system:user:editUserStatus'])"
              class="switchStyle"
              @change="handleUserStatus(scope.row)"
              v-model="scope.row.isActive == 1"
              active-text="启用"
              inactive-text="停用"
              active-color="#02C733"
              inactive-color="#A6A6A6"
            >
            </el-switch>
            <div v-else>
              {{ scope.row.isActive == 1 ? "启用" : "停用" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="180"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="180"
          v-if="checkPermission(['system:user:updUser', 'system:user:delUser'])"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              class="editPrimary marginRight10"
              v-permission="['system:user:updUser']"
              @click.stop="handleUpdate(scope.row)"
            >
              修改
            </el-button>

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="small"
                type="danger"
                class="editDanger"
                slot="reference"
                v-permission="['system:user:delUser']"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
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

    <el-dialog
      :title="dialog.title"
      :close-on-click-modal="false"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="el-dialog-edu"
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
            v-if="isShowCascader"
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
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
  downUserTemplate,
  insertUserBatch,
} from "@/api/crm/system";
import {
  subordinateList,
  getDeptList,
  getAllPostList,
} from "@/api/crm/organization";
import { getPostList, getAllUserSelect, editUserStatus } from "@/api/crm/user";
import { Message } from "element-ui";
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
import { checkPermission } from "@/utils/validate";
import { Encrypt } from "@/utils/secret";

export default {
  components: {
    Pagination,
    BorderContainer,
  },
  data() {
    return {
      isShowCascader: false,
      roleName: "学生",
      roleList: [], //
      usersList: [],
      insertLoading: false,
      total: "",
      allUsersList: [],
      allDeptList: [], //所有部门以及部门下的职位
      deptList: [],
      postList: [], //全部职位
      cascaderProps: {
        lazy: true,
        lazyLoad: this.handlePostQuery,
      },
      queryParams: {
        keyWord: "",
        deptId: "",
        postId: "",
        status: "",
        page: 1,
        limit: 10,
      },
      total: "",
      dialog: {
        title: "",
        visible: false,
      },
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
      // 选中的角色
    };
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {
    this.handleQuery();
  },
  mounted() {
    this.handleDeptQuery();
    this.queryAllUserSelect();
    // this.getAllPostList();
  },
  methods: {
    checkPermission,
    handleUserStatus(row) {
      editUserStatus({
        userId: row.id,
        status: row.isActive == 1 ? 0 : 1,
      }).then((res) => {
        if (res && res.flag) {
          Message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.handleQuery();
        }
      });
    },
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
    //查询部门下的职位
    async handlePostQuery(node, resolve) {},

    //
    handleDept(val) {
      this.queryParams.deptId = val;
    },
    beforeAvatarUpload(file) {
      return true;
    },
    doUpload(item) {
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      this.insertLoading = true;
      this.$message.success("正在导入");
      insertUserBatch(FormDatas)
        .then((res) => {
          console.log(res);
          if (res && res.flag) {
            this.handleQuery();
            this.insertLoading = false;
            this.$message.success("导入成功");
          } else {
            this.$message.error("上传出错");
            this.insertLoading = false;
          }
        })
        .finally(() => {
          this.insertLoading = false;
        });
    },
    // downLoadFile

    downLoadFile() {
      downUserTemplate().then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 1);
        }
        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
        const a = document.createElement("a"); //创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = fileName; //指定下载文件名
        document.body.appendChild(a);
        a.click(); //触发下载
        URL.revokeObjectURL(a.href); //释放URL对象
        document.body.removeChild(a);
        this.$message.success("下载成功");
      });
    },

    //查询角色列表
    async queryRoleList() {
      const params = {
        roleType: "1",
        keyWord: "",
      };
      this.loading = true;

      const res = await getRoleList(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        let roleList = [];
        resData.map((i) => {
          let item = {
            roleId: i.id.toString(),
            roleName: i.cnName,
          };
          roleList.push(item);
        });
        this.roleList = roleList;
      } else {
        this.loading = false;
      }
    },

    handleAdd() {
      let _this = this;
      let dialog = {
        title: "添加",
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
    initQueryParams() {
      let queryParams = {
        keyWord: "",
        deptId: "",
        postId: "",
        status: "",

        page: 1,
        limit: 10,
      };
      this.queryParams = queryParams;
    },
    // handleRoleName(roleName) {
    //     let roleList = this.roleList
    //     let itemList = roleList && roleList.length > 0 && roleList.filter(i => {
    //         return i.roleName == roleName
    //     })
    //     return itemList && itemList.length > 0 && itemList[0].roleId

    // },
    submitForm(e) {
      this.$refs.dataFormRef.validate(async (valid) => {
        if (valid) {
          let password = Encrypt(this.formData.password);
          this.formData.password = password;
          let title = this.dialog.title;
          const res =
            title == "添加"
              ? await saveUser(this.formData)
              : await updUser({ id: this.userId, ...this.formData });
          if (res && res.flag) {
            Message.success(title == "添加" ? "添加成功" : "修改成功");
            this.cancel(); //关闭弹框并初始化
            // this.handleEquForm = handleEquForm
            this.initParams();
            this.handleQuery({});
          } else {
            this.formData.password = "";
            // Message.success(res.errMessage);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //选菜单时获得菜单id
    handleRoleList(e) {
      const checkMenuKeys = this.$refs.resourceRef.getCheckedKeys();
      this.checkMenuKeys = checkMenuKeys;
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
      const res = await listUsers(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.usersList = resData.records;
        this.total = resData.total;
        this.page = resData.pageNum;
      } else {
        this.loading = false;
      }
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

    //点击修改按钮
    handleUpdate(item) {
      if (item && item.id) {
        getUserDetailById({ id: item.id }).then((res) => {
          let resData = res && res.resData;
          // formData.roleId = formData.roleName
          this.userId = item.id;
          let formData = {
            userName: resData && resData.userName, // 父级菜单
            deptId: resData && resData.deptId,
            postId: resData && resData.postId,
            deptAndPostId: [
              resData && resData.deptId,
              resData && resData.postId,
            ],
            phone: resData && resData.phone,
            leaderId: resData && resData.leaderId,
            email: resData && resData.email,
          };
          //查找deptId的位置
          let index = this.allDeptList.findIndex(
            (i) => i.value == resData.deptId
          );
          let params = {
            id: resData && resData.deptId,
          };
          getPostList(params).then((res) => {
            const nodes = Array.from(res.resData).map((item) => ({
              value: item.id,
              label: `${item.name}`,
              level: 2,
              leaf: true, //根据接口返回是否有子数据
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            console.log(nodes);
            this.$set(this.allDeptList[index], "children", nodes);
            //  this.allDeptList[index].children = nodes
          });
          this.formData = formData;
          this.isShowCascader = false;
          let dialog = {
            title: "修改",
            visible: true,
          };
          this.dialog = dialog;
          this.isShowCascader = true;
        });
      } else {
        Message.error("数据有误！");
      }
    },
    //单删
    async handleDelete(item) {
      let id = item.id;
      const res = await delUser({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
    //多删除
    async handleDeleteIds(ids) {
      let id = ids.toString();
      const res = await delUser({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
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
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 600px;
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 150px;
    }
    .el-form-item__error {
      padding-left: 150px;
    }
    .el-input-edu {
      width: 300px;
    }
  }
}
.form-container1 {
  padding: 20px 0 10px 10px;
}

.inputClass {
  width: 150px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.ipt {
  ::v-deep .el-input__inner {
    -webkit-text-security: disc !important;
  }
}
</style>
