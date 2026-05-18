<template>
  <div class="app-container">
    <border-container
      v-permission="['sso:role:getList']"
      class="marginBottom10 border-container"
      :lBCircle="lBCircle"
      :lSCircle="lSCircle"
      :rBCircle="rBCircle"
      :rSCircle="rSCircle"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item prop="keyWord" label="角色名称">
              <el-input
                v-model="queryParams.keyWord"
                placeholder="请输入角色名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="success"
                class="editSuccess"
                icon="el-icon-search"
                @click="handleQuery"
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
      <template #header>
        <el-button
          v-permission="['sso:role:create']"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增</el-button
        >
        &nbsp;
        <el-popconfirm
          title="确定删除吗？"
          @onConfirm="handleDeleteIds(ids)"
          onCancel=""
        >
          <el-button
            v-permission="['sso:role:delete']"
            type="danger"
            icon="el-icon-delete"
            slot="reference"
            :disabled="ids && ids.length === 0"
            >删除
          </el-button>
        </el-popconfirm>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="roleList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="角色ID"
          prop="id"
          min-width="70"
          align="center"
        />

        <el-table-column
          label="角色名称"
          prop="cnName"
          min-width="150"
          align="center"
        />
        <el-table-column
          label="角色编码"
          prop="name"
          width="150"
          align="center"
        />
        <!-- <el-table-column label="角色类型" align="center" prop="name" width="150">
          <template #default="scope">
            <el-tag v-if="scope.row.type == '1'" type="warning">内部角色</el-tag>
            <el-tag v-if="scope.row.type == '2'" type="primary">外部角色</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="createdAt"
          label="创建时间"
          min-width="120"
          align="center"
        />
        <!-- <el-table-column prop="updateTime" label="修改时间" width="160" align="center" /> -->

        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="180"
        >
          <template #default="scope">
            <el-button
              v-permission="['sso:role:distributeMenu']"
              size="small"
              type="primary"
              class="editPrimary"
              @click.stop="showRoleMenuDialog(scope.row)"
            >
              权限设置
            </el-button>

            <el-button
              v-permission="['sso:role:edit']"
              size="small"
              class="marginRight10"
              type="primary"
              @click.stop="handleUpdate(scope.row)"
            >
              修改
            </el-button>

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              &nbsp;
              <el-button
                v-permission="['sso:role:delete']"
                size="small"
                type="danger"
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
      :visible.sync="dialog.visible"
      @close="cancel"
      width="600px"
    >
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="formDataRules"
        label-width="150px"
      >
        <el-form-item label="角色名称" prop="cnName">
          <el-input
            v-model="formData.cnName"
            style="width: 300px"
            placeholder="请输入角色名称"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        <!-- 权限标识 -->
        <el-form-item label="角色编码" prop="name">
          <el-input
            v-model="formData.name"
            style="width: 300px"
            placeholder="请输入角色编码"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- assign permission dialog -->
    <el-dialog
      title="角色权限配置"
      :visible.sync="menuDialogVisible"
      width="500px"
      @close="closeMenuDialogVisible"
    >
      <el-tree
        title="角色权限配置"
        ref="resourceRef"
        node-key="id"
        show-checkbox
        :data="menuList"
        :default-expand-all="true"
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
        @check="handleRoleList"
      >
      </el-tree>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeMenuDialogVisible">取 消</el-button>
          <el-button type="primary" @click="handleRoleResourceSubmit"
            >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {
  createRole,
  getRoleDetailById,
  deleteRole,
  editRole,
  getRoleList,
  getListForFont,
  getMenuList,
  getRoleMenuList,
  distributeRoleMenu,
} from "@/api/system";
import { Message } from "element-ui";
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
import { checkPermission } from "@/utils/validate";

export default {
  components: {
    Pagination,
    BorderContainer,
  },
  data() {
    return {
      roleList: [], //
      queryParams: {
        keyWord: "",
        roleType: "",
        page: 1,
        limit: 10,
      },
      total: "",
      dialog: {
        title: "",
        visible: false,
      },
      formData: {
        cnName: "", // 父级菜单
        name: "",
        type: "1",
        id: "0",
      },
      loading: false,
      formDataRules: {
        cnName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
        type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
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
    };
  },
  created() {
    this.handleQuery();
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  mounted() {
    // const isHas = checkPermission([
    //   "auth:menu:distribute",
    //   "auth:role:edit",
    //   "auth:role:delete",
    // ]);
    // this.isHas = isHas;
  },
  methods: {
    // checkPermission,
    async handleRoleResourceSubmit() {
      // 获得选中的菜单id
      const checkMenuKeys = this.$refs.resourceRef.getCheckedKeys();
      this.checkMenuKeys = checkMenuKeys;
      this.menuDialogVisible = false;
      let roleId = this.roleId;
      let data = {
        menuId: checkMenuKeys,
        roleId,
      };
      const res = await distributeRoleMenu(data);
      if (res && res.flag) {
        Message.success("权限设置成功");
      }
    },
    closeMenuDialogVisible() {
      this.menuDialogVisible = false;
      this.defaultCheckedKeys = [];
      this.menuList = [];
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
      let userRolesNames = this.$store.state.user.userRolesNames;
      let formData = {
        cnName: "", // 父级菜单
        name: "",
        type: userRolesNames != "supremeAdmin" ? "2" : "1",
        id: "0",
      };
      this.formData = formData;
    },
    initQueryParams() {
      let queryParams = {
        keyWord: "",
      };
      this.queryParams = queryParams;
    },
    submitForm(e) {
      this.$refs.dataFormRef.validate(async (valid) => {
        if (valid) {
          let title = this.dialog.title;
          const res =
            title == "添加"
              ? await createRole(this.formData)
              : await editRole(this.formData);
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
      console.log(e);
      // this.queryParams.page = e.page;
      // this.queryParams.limit = e.limit;
      this.handleQuery();
    },
    //查询角色列表
    async handleQuery() {
      const params = this.queryParams;
      this.loading = true;

      const res = await getRoleList(params);
      if (res && res.flag) {
        this.loading = false;
        // const resData = res.resData;
        // this.roleList = resData;
        const resData = res.resData;
        this.roleList = resData;
        // this.total = resData.total;
        // this.page = resData.pageNum;
        // return true
        //初始话新增顶级列表
        // this.handleMenuPList(resData);
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
      console.log(item);
      if (item && item.id) {
        const {
          cnName, // 父级菜单
          name,
          type,
          id,
        } = item;
        let formData = {
          cnName: cnName, // 父级菜单
          name: name,
          type: String(type),
          id: id,
        };
        this.formData = formData;
        let dialog = {
          title: "修改",
          visible: true,
        };
        this.dialog = dialog;
      } else {
        Message.error("数据有误！");
      }
    },
    //单删
    async handleDelete(item) {
      let id = item.id;
      const res = await deleteRole(Number(id));
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
    //多删除
    async handleDeleteIds(ids) {
      let id = ids.toString();
      const res = await deleteRole(id);
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      this.queryParams.page = 1;
      console.log(this.queryParams);
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
    async showRoleMenuDialog(e) {
      console.log(e.id);
      this.roleId = e.id;
      const res = await getRoleMenuList(e.id); // 回显已选菜单
      if (res && res.flag) {
        let resData = res.resData;
        //需要回显的ids
        // let defaultCheckedKeys = resData
        // this.defaultCheckedKeys = resData
        // this.defaultCheckedKeys = ['120','122','123']

        // console.log(roleMenuList, defaultCheckedKeys);
        let roleMenuList = this.handleTreeList(resData); // 获得需要回显的菜单，需要对父级菜单进行过滤
        console.log('roleMenuList',roleMenuList);
        let defaultCheckedKeys = this.handleRoleMenuList(roleMenuList);
        this.defaultCheckedKeys = defaultCheckedKeys.toString().split(",");
        console.log(roleMenuList, defaultCheckedKeys);
      } else {
        Message.error("角色查询有误");
      }
      this.handleMenuQuery({});
      this.menuDialogVisible = true;
    },

    //处理回显菜单获得，id - List
    // https://blog.csdn.net/Eric_web/article/details/112393238?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112393238-blog-106552478.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112393238-blog-106552478.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=1
    //elementUI的el-tree的赋值回显问题 // 神来之笔，这种方式正好处理里回显时去除父级菜单未完全选择的问题

    handleRoleMenuList(roleMenuList) {
      let defaultCheckedKeys = [];
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

    //查询权限列表
    async handleMenuQuery(params) {
      this.loading = true;
      const res = await getListForFont(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        console.log("resData", resData);
        // return true
        //初始话新增顶级列表
        this.menuList = this.handleTreeList(resData);
      } else {
        this.loading = false;
        // return false
      }
    },

    handleTreeList(list) {
      let children = [];
      list &&
        list.length > 0 &&
        list.map((item) => {
          let optionItem = {
            id: item.value || item.id,
            label: item.label || item.name,
            // disabled: item.disabled || false,
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
.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
}
</style>
