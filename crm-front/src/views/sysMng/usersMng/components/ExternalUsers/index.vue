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
            <el-form-item
              prop="keyWord"
              :label="userRolesNames == '老师' ? '学生名称' : '用户名称'"
            >
              <el-input
                class="inputClass"
                v-model="queryParams.keyWord"
                :placeholder="
                  userRolesNames == '老师' ? '请输入学生名称' : '请输入用户名称'
                "
                clearable
                @keyup.enter="handleQueryInitPage"
              />
            </el-form-item>
            <el-form-item
              prop="roleId"
              label="角色"
              v-if="userRolesNames != '老师'"
            >
              <el-select
                class="inputClass"
                v-model="queryParams.roleId"
                @change="handleQueryInitPage"
                placeholder="请选择角色"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <span
              v-if="
                userRolesNames == '学校管理员' ||
                userRolesNames == '系统最高管理员'
              "
            >
              <el-form-item prop="grade" label="入学年份">
                <el-input
                  class="inputClass"
                  v-model="queryParams.grade"
                  placeholder="请输入入学年份"
                  clearable
                  @keyup.enter="handleQueryInitPage"
                />
              </el-form-item>
              <el-form-item prop="className" label="班级">
                <el-input
                  class="inputClass"
                  v-model="queryParams.className"
                  placeholder="请输入班级"
                  clearable
                  @keyup.enter="handleQueryInitPage"
                />
              </el-form-item>
              <el-form-item prop="studentNum" label="学/工号">
                <el-input
                  class="inputClass"
                  v-model="queryParams.studentNum"
                  placeholder="请输入学/工号"
                  clearable
                  @keyup.enter="handleQueryInitPage"
                />
              </el-form-item>
            </span>

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
                >批量删除
              </el-button>
            </el-popconfirm>
            <span
              class="font14"
              style="color: red; margin-left: 20px"
              v-if="roleId == '42' && stuAndTeaNum"
            >
              <span>老师账号剩余数量：{{ stuAndTeaNum.teacherNum || 0 }}，</span
              >学生账号剩余数量：{{ stuAndTeaNum.studentNum || 0 }}
            </span>
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
              v-if="userRolesNames != '系统最高管理员'"
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
                v-if="userRolesNames != '系统最高管理员'"
                :loading="insertLoading"
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
          :label="userRolesNames == '老师' ? '学生名称' : '用户名称'"
          prop="userName"
          min-width="100"
          align="center"
        />
        <el-table-column
          v-if="userRolesNames == '学校管理员'"
          label="学/工号"
          prop="studentNum"
          width="150"
          align="center"
        />
        <el-table-column
          v-else-if="userRolesNames == '老师'"
          label="学号"
          prop="studentNum"
          width="150"
          align="center"
        />

        <el-table-column
          label="角色名称"
          prop="roleName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="学校名称"
          prop="universityName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="入学年份"
          prop="grade"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.grade">{{ scope.row.grade }}</div>
            <div v-else>- - -</div>
          </template>
        </el-table-column>
        <el-table-column
          label="班级"
          prop="className"
          min-width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.className">{{ scope.row.className }}</div>
            <div v-else>- - -</div>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="邮箱"
          prop="email"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          min-width="180"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="180"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              class="editPrimary"
              @click.stop="handleUpdate(scope.row)"
            >
              修改
            </el-button>
            <el-divider
              direction="vertical"
              v-if="userRolesNames != '老师'"
            ></el-divider>
            <el-popconfirm
              v-if="userRolesNames != '老师'"
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="small"
                type="danger"
                class="editDanger"
                slot="reference"
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
        <el-form-item label="用户名称" prop="userName1">
          <el-input
            v-model="formData.userName1"
            id="userName2"
            class="el-input-edu"
            placeholder="请输入用户名称"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input
            v-model="formData.password1"
            id="passwords"
            type="password"
            class="el-input-edu ipt"
            placeholder="请输入密码"
            auto-complete="new-password"
            show-word-limit
          />
        </el-form-item>
        <!-- 权限标识 -->
        <el-form-item
          prop="roleName"
          label="所属学校"
          v-if="userRolesNames == '系统最高管理员'"
          :rules="[{ required: true, message: '请选择学校', trigger: 'blur' }]"
        >
          <el-select
            class="el-input-edu"
            v-model="formData.universityName"
            id="universityName"
            placeholder="请选择学校"
            @change="changeSchool"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.universityName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 权限标识 -->
        <el-form-item prop="roleName" label="所属角色">
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
        </el-form-item>
        <!-- 权限标识 -->
        <el-form-item label="手机号" prop="phone">
          <el-input
            maxlength="11"
            class="el-input-edu"
            v-model="formData.phone"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            class="el-input-edu"
            v-model="formData.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item
          v-if="roleName == '学生'"
          label="学号"
          prop="studentNum"
          :rules="[
            { required: true, message: '请输入学号', trigger: 'blur' },
            { pattern: /^[0-9]*$/, message: '请输入数字学号' },
          ]"
        >
          <el-input
            v-model="formData.studentNum"
            class="el-input-edu"
            placeholder="请输入学号"
          />
        </el-form-item>
        <el-form-item
          v-if="roleName == '老师'"
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
        </el-form-item>
        <el-form-item v-if="roleName == '学生'" label="入学年份" prop="grade">
          <el-input
            v-model="formData.grade"
            class="el-input-edu"
            placeholder="请输入入学年份"
          />
        </el-form-item>
        <el-form-item v-if="roleName == '学生'" label="班级" prop="className">
          <el-input
            v-model="formData.className"
            class="el-input-edu"
            placeholder="请输入班级"
          />
        </el-form-item>
        <!-- <el-form-item label="状态">
                      <el-radio-group v-model="formData.status">
                          <el-radio label="1">正常</el-radio>
                          <el-radio label="0">停用</el-radio>
                      </el-radio-group>
                  </el-form-item> -->
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
  saveUser,
  updUser,
  listUsers,
  getUserDetailById,
  delUser,
  // downEduUserTemplate,
  insertUserBatch,
} from "@/api/crm/system";
import { Message } from "element-ui";
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
import { Encrypt } from "@/utils/secret";
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
        keyWord: "",
        roleId: "",
        grade: "",
        className: "",
        roleType: "2",
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
        universityName: "",
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
      isHas: false,
      userId: "",
      insertLoading: false,
      schoolList: [],
      universityId: 0,
      stuAndTeaNum: {},
    };
  },
  computed: {
    ...mapGetters(["userRolesNames", "roleId"]),
  },
  created() {
    // this.handleQuery();
  },
  mounted() {
    // this.queryRoleList();
    // this.handleSchoolQuery();
    // let roleId = this.roleId;
    // if (roleId == "42") {
    //   this.queryUserRemainingQuota();
    // }
  },
  methods: {
    //获取高校用户剩余配额
    queryUserRemainingQuota() {
      getUserRemainingQuota().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.stuAndTeaNum = resData;
        }
      });
    },
    //查询角色列表
    async handleSchoolQuery() {
      this.loading = true;
      const res = await getSchoolList();
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.schoolList = resData;
      } else {
        this.loading = false;
      }
    },
    changeSchool(val) {
      console.log(val);
      this.queryParams.universityName = val;
      this.universityId = val;
    },
    //
    handleRoles(val) {
      // 定义一个roleName变量，用于存储角色名称
      let roleName = "";
      // 定义一个roleList变量，用于存储角色列表
      let roleList = this.roleList;
      // 定义一个roleItem变量，用于存储角色列表中满足条件的角色信息
      let roleItem =
        roleList &&
        roleList.length > 0 &&
        roleList.filter((i) => {
          // 判断val变量是否等于i.roleId
          return val == i.roleId;
        });
      // 将roleItem变量中的角色名称赋值给roleName变量
      roleName = roleItem && roleItem.length > 0 && roleItem[0].roleName;
      // 将roleName变量赋值给this.roleName变量
      this.roleName = roleName;
      // 将roleItem变量中的角色Id赋值给this.formData.roleId变量
      this.formData.roleId = roleItem[0].roleId;
    },
    async beforeAvatarUpload(file) {
      //配额校验

      // const isLt5M = file.size / 1024 / 1024 < 5;
      // const file_type = file.name.replace(/.+\./, "");
      // if (this.fileType.indexOf(file_type) === -1) {
      //   this.$message.error("上传图片只能是 jpg/png/jpeg 格式!");
      //   return false;
      // }
      // if (!isLt5M) {
      //   this.$message.error("上传头像图片大小不能超过 5MB!");
      //   return false;
      // }
      return true;
    },
    async doUpload(item) {
      // const res = await checkQuota();
      // if (!(res && res.flag)) {
      //   return false;
      // }
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
            this.insertLoading = false;
          }
        })
        .finally(() => {
          this.insertLoading = false;
        });
    },
    // downLoadFile

    downLoadFile() {
      
    },

    //查询角色列表
    async queryRoleList() {
      const params = {
        roleType: "2",
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

    async handleAdd() {
      let _this = this;
      let dialog = {
        title: "添加",
        visible: true,
      };

      _this.dialog = dialog;
      _this.initParams();
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
        keyWord: "",
        roleId: "",
        grade: "",
        className: "",
        roleType: "2",
        studentNum: "",
        limit: 10,
        page: 1,
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
          let password = Encrypt(this.formData.password1);
          this.formData.password1 = password;
          // let roleName = this.formData.roleName
          // let roleId = this.handleRoleName(roleName)
          // this.formData.roleId = roleId

          let formData = {
            userName: this.formData.userName1, // 父级菜单
            roleId: this.formData.roleId,
            password: password,
            phone: this.formData.phone,
            studentNum: this.formData.studentNum || "",
            grade: this.formData.grade || "",
            className: this.formData.className || "",
            email: this.formData.email || "",
          };
          let title = this.dialog.title;

          if (this.userRolesNames == "系统最高管理员") {
            formData.universityName = Number(this.universityId);
          }
          const res =
            title == "添加"
              ? await saveUser(formData)
              : await updUser({ id: this.userId, ...formData });
          if (res && res.flag) {
            Message.success(title == "添加" ? "添加成功" : "修改成功");
            this.cancel(); //关闭弹框并初始化
            // this.handleEquForm = handleEquForm
            this.initParams();
            this.handleQuery({});
          } else {
            Message.success(res.errMessage);
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
        this.usersList = resData.list;
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
            userName1: resData && resData.userName, // 父级菜单
            roleId: resData && resData.roleId,
            roleName: resData && resData.roleName,
            password1: resData && resData.password,
            phone: resData && resData.phone,
            universityName: resData && resData.universityName,
            studentNum: resData && resData.studentNum,
            grade: resData && resData.grade,
            className: resData && resData.className,
            email: resData && resData.email,
          };
          this.universityId = resData && resData.universityId;
          this.formData = formData;
          this.roleName = formData && formData.roleName;
          let dialog = {
            title: "修改",
            visible: true,
          };
          this.dialog = dialog;
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
    //点击资源分配，打开弹出框，搜索获得角色菜单（all）和角色菜单

    // 处理回显菜单获得，id - List
    // https://blog.csdn.net/Eric_web/article/details/112393238?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112393238-blog-106552478.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112393238-blog-106552478.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1
    // elementUI的el-tree的赋值回显问题 // 神来之笔，这种方式正好处理里回显时去除父级菜单未完全选择的问题

    handleRoleMenuList(roleMenuList) {
      const defaultCheckedKeys = [];
      roleMenuList.map((i) => {
        let ids = [];
        ids.push(i.id);
        if (i.children && i.children.length > 0) {
          ids = this.handleRoleMenuList(i.children);
        }
        defaultCheckedKeys.push(ids);
      });
      return defaultCheckedKeys;
    },

    // 查询权限列表
    async handleMenuQuery(params) {
      this.loading = true;
      const res = await getListForFont(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        // return true
        // 初始话新增顶级列表
        this.menuList = this.handleTreeList(resData);
      } else {
        this.loading = false;
        // return false
      }
    },

    handleTreeList(list) {
      const children = [];
      list &&
        list.length > 0 &&
        list.map((item) => {
          const optionItem = {
            id: item.value || "",
            label: item.label,
            disabled: item.disabled || false,
          };
          if (item.children && item.children.length > 0) {
            optionItem.children = this.handleTreeList(item.children);
          }
          children.push(optionItem);
        });
      return children;
    },
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
