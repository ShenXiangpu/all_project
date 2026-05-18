<template>
  <div class="app-container">
    <border-container
      v-permission="['sso:menu:listMenus']"
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
            <el-form-item label="菜单名称" prop="keyWord">
              <el-input
                v-model="queryParams.keyWord"
                placeholder="请输入菜单名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <!-- <el-form-item label="菜单类型" prop="keywords">
                    <el-select v-model="queryParams.menuType" placeholder="请选择菜单类型">
                        <el-option label="目录" value="2"></el-option>
                        <el-option label="菜单" value="1"></el-option>
                        <el-option label="按钮" value="3"></el-option>
                    </el-select>
                </el-form-item> -->
            <el-form-item>
              <el-button
                type="success"
                class="editSuccess"
                icon="el-icon-search"
                @click="handleQueryTop"
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
          v-permission="['sso:menu:saveMenu']"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd({})"
          >新增</el-button
        >
      </template>

      <el-table
        v-loading="loading"
        :data="menuList"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click="handleRowClick"
        row-key="id"
      >
        <el-table-column label="菜单名称" min-width="200">
          <template #default="scope">
            <svg-icon
              :icon-class="
                scope.row.type === 'BUTTON' ? 'button' : scope.row.icon
              "
            />
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="菜单类型" align="center" width="150">
          <template #default="scope">
            <el-tag v-if="scope.row.type == 'CATALOG'" type="warning"
              >目录</el-tag
            >
            <el-tag v-if="scope.row.type == 'MENU'" type="primary">菜单</el-tag>
            <el-tag v-if="scope.row.type == 'BUTTON'" type="danger"
              >按钮</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="权限标识"
          align="center"
          min-width="200"
          prop="perm"
        />

        <el-table-column label="状态" align="center" width="150">
          <template #default="scope">
            <el-tag v-if="scope.row.visible === 1" type="primary">显示</el-tag>
            <el-tag v-else type="info">隐藏</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="排序" align="center" width="100" prop="sort" />

        <el-table-column
          label="创建时间"
          align="center"
          width="200"
          prop="createdAt"
        >
        </el-table-column>

        <el-table-column
          label="修改时间"
          align="center"
          width="200"
          prop="updatedAt"
        >
        </el-table-column>

        <el-table-column
          v-if="
            checkPermission(['sso:menu:updateMenu','sso:menu:deleteMenu','sso:menu:saveMenu'])
          "
          label="操作"
          fixed="right"
          align="center"
          min-width="240"
        >
          <template #default="scope">
            <el-button
              v-permission="['sso:menu:saveMenu']"
              size="small"
              type="success"
              class="editSuccess"
              v-if="scope.row.type != 'BUTTON'"
              @click.stop="handleAdd(scope.row)"
            >
              新增
            </el-button>
           
            <el-button
              v-permission="['sso:menu:updMenu']"
              size="small"
              type="primary"
              class="editPrimary marginRight10"
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
                v-permission="['sso:menu:delMenus']"
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
    </el-card>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      @close="cancel"
      width="750px"
    >
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="formDataRules"
        label-width="80px"
      >
        <el-form-item label="上级菜单" prop="parentId">
          <tree-select
            v-model="formData.parentId"
            :options="parentMenu"
            placeholder="选择上级菜单"
            @select="handleMenuSelect"
          />
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item label="菜单类型" prop="type">
          <el-radio-group
            v-model="formData.type"
            @change="handleMenuTypeChange"
          >
            <el-radio label="CATALOG">目录</el-radio>
            <el-radio label="MENU">菜单</el-radio>
            <el-radio label="BUTTON">按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="路由路径"
          prop="path"
          v-if="formData.type == 'MENU' || formData.type == 'CATALOG'"
        >
          <el-input
            v-if="formData.type == 'CATALOG'"
            v-model="formData.path"
            placeholder="/system  (目录以/开头)"
          />
          <el-input v-else v-model="formData.path" placeholder="user" />
        </el-form-item>

        <!-- 组件页面完整路径 -->
        <el-form-item
          v-if="formData.type == 'MENU'"
          label="页面路径"
          prop="component"
        >
          <el-input v-model="formData.component" placeholder="sysMng/roleMng">
            <template v-if="formData.parentId != '0'" #prepend
              >@/views/</template
            >
          </el-input>
        </el-form-item>

        <!-- 权限标识 -->
        <el-form-item
          v-if="formData.type == 'BUTTON'"
          label="权限标识"
          prop="perm"
        >
          <el-input v-model="formData.perm" placeholder="sys:user:add" />
        </el-form-item>

        <!-- 权限标识 -->
        <el-form-item
          v-if="formData.type == 'BUTTON'"
          label="权限标识"
          prop="url"
        >
          <el-input v-model="formData.url" placeholder="api/login" />
        </el-form-item>

        <el-form-item label="菜单图标" v-if="formData.menuType !== 'BUTTON'">
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="handleIconSelected" />
            <el-input
              slot="reference"
              v-model="formData.icon"
              clearable
              placeholder="点击选择图标"
            >
              <svg-icon
                v-if="formData.icon"
                slot="prefix"
                :icon-class="formData.icon"
                class="el-input__icon"
                style="height: 40px; width: 16px"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="formData.visible">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            style="width: 100px"
            controls-position="right"
            :min="0"
          />
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
  createMenu,
  deleteMenu,
  editMenu,
  getMenuList,
  getMenuDetailById,
} from "@/api/system";
import { Message } from "element-ui";
import BorderContainer from "@/components/BorderContainer";
import IconSelect from "@/components/IconSelect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import TreeSelect from "@riophae/vue-treeselect";
import { checkPermission } from "@/utils/validate";

export default {
  components: {
    IconSelect,
    TreeSelect,
    BorderContainer,
  },
  data() {
    return {
      checkPermission,
      checkPermission,
      queryParams: {
        keyWord: "",
        menuType: "",
      },
      menuList: [],
      parentMenu: [],
      dialog: { visible: false },
      formData: {
        parentId: 0, // 父级菜单
        name: "", // 菜单名称
        type: "MENU", // 菜单类型 菜单类型(1：菜单；2：目录；3：按钮)
        path: "",
        component: "",
        perm: "", // 按钮权限
        url: "",
        icon: "", //icon
        visible: 1, //显示隐藏
        sort: "", //排序
      },
      loading: false,
      formDataRules: {
        parentId: [
          { required: true, message: "请选择父级菜单", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
        path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        component: [
          { required: true, message: "请填写菜单地址", trigger: "blur" },
        ],
        perm: [{ required: true, message: "请输入按钮权限", trigger: "blur" }],
        url: [{ required: true, message: "请输入按钮api", trigger: "blur" }],
        icon: [
          {
            required: true,
            message: "请选择目录或者菜单图标",
            trigger: "blur",
          },
        ],
        // status: [
        //     { required: true, message: '请输入传感器名称', trigger: 'blur' },
        // ],
        // menuSort: [
        //     { required: true, message: '请输入传感器名称', trigger: 'blur' },
        // ],
      },
      value: "0",
      selected: {},
      isHas: false,

      lBCircle: {
        width: "16px",
        height: "32px",
        borderRadius: "0 16px 16px 0",
      },
      lSCircle: {
        width: "8px",
        height: "16px",
        borderRadius: "0 8px 8px 0",
        top: "6px",
      },
      rBCircle: {
        width: "16px",
        height: "32px",
        borderRadius: "16px 0  0 16px",
        // right: '4px'
      },
      rSCircle: {
        width: "8px",
        height: "16px",
        borderRadius: "8px 0  0 8px",
        top: "6px",
      },
    };
  },
  watch: {},
  mounted() {
    this.handleQuery({});
    // const isHas = checkPermission(['auth:menu:create', 'auth:menu:edit', 'auth:menu:delete'])
    // this.isHas = isHas
  },
  methods: {
    // checkPermission,
    handleQueryTop() {
      this.$refs.queryFormRef.validate((valid) => {
        console.log("this.queryParams", this.queryParams);
        if (valid) {
          this.handleQuery(this.queryParams);
        } else {
          Message.error("查询失败");
        }
      });
    },
    //递归菜单
    /**
     * 总计
     * 有值的时候进行递归就可以了
     */
    handleTreeList(list) {
      let children = [];
      list &&
        list.length > 0 &&
        list.map((item) => {
          if (item.type !== "BUTTON") {
            let optionItem = {
              id: item.id,
              label: item.name,
            };
            if (item.children && item.children.length > 0) {
              optionItem.children = this.handleTreeList(item.children);
            }
            children.push(optionItem);
          }
        });

      return children;
    },
    //处理
    handleMenuPList(list) {
      let mlist = [
        {
          id: "0",
          label: "顶级菜单",
          children: [],
        },
      ];
      let children = this.handleTreeList(list);
      mlist[0].children = children;
      this.parentMenu = mlist;
    },

    initParams() {
      let formData = {
        parentId: 0, // 父级菜单
        name: "", // 菜单名称
        type: "MENU", // 菜单类型 菜单类型(1：菜单；2：目录；3：按钮)
        path: "",
        component: "",
        perm: "", // 按钮权限
        url: "",
        icon: "", //icon
        visible: 1, //显示隐藏
        sort: "", //排序
      };
      this.formData = formData;
    },
    initQueryParams() {
      let queryParams = {
        menuType: "",
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
              ? await createMenu(this.formData)
              : await editMenu(this.formData);
          if (res && res.flag) {
            Message.success(title == "添加" ? "添加成功" : "修改成功");
            this.cancel(); //关闭弹框并初始化
            // this.handleEquForm = handleEquForm
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
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.initParams();
      _this.dialog = dialog;
      _this.$refs.dataFormRef.resetFields();
    },
    //查询权限列表
    async handleQuery(params) {
      this.loading = true;
      const res = await getMenuList(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.menuList = resData;
        // return true
        //初始话新增顶级列表
        this.handleMenuPList(resData);
      } else {
        this.loading = false;
        // return false
      }
    },
    handleMenuSelect(e) {},
    handleAdd(item) {
      let _this = this;
      if (item && item.id) {
        _this.formData.parentId = item.id;
      } else {
        _this.formData.parentId = "0";
      }
      let dialog = {
        title: "添加",
        visible: true,
      };
      _this.dialog = dialog;
    },
    //点击修改按钮
    handleUpdate(item) {
      getMenuDetailById(item.id).then((res) => {
        const {
          parentId, // 父级菜单
          name, // 菜单名称
          type, // 菜单类型 菜单类型(1：菜单；2：目录；3：按钮)
          path,
          component,
          perm, // 按钮权限
          url,
          icon, //icon
          visible, //显示隐藏
          sort, //排序} = item;
          id,
        } = res.resData;

        let formData = {
          parentId, // 父级菜单
          name, // 菜单名称
          type, // 菜单类型 菜单类型(1：菜单；2：目录；3：按钮)
          path,
          component,
          perm, // 按钮权限
          url,
          icon, //icon
          visible, //显示隐藏
          sort, //排序
          id,
        };
        this.formData = formData;

        let dialog = {
          title: "修改",
          visible: true,
        };
        this.dialog = dialog;
      });
    },

    async handleDelete(item) {
      console.log(item);
      const { id } = { ...item };
      const res = await deleteMenu(id);
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      this.handleQuery({});
      this.initQueryParams();
    },

    handleRowClick() {},
    handleMenuTypeChange() {},
    //icon
    handleIconSelected(name) {
      this.formData.icon = name;
      this.$forceUpdate();
    },
  },
};
</script>
  
<style>
.menu-container {
  margin: 30px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

input /deep/ .vue-treeselect__input {
  display: inline-block;
  height: 40px p !important;
}
</style>
<style lang='scss' scoped>
$menuColor: #10abb9;

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

.content-top {
  .el-form-item {
    margin-bottom: 0px;
  }

  margin-bottom: 10px;
}

::v-deep {
  .el-table__expand-icon {
    color: $menuColor;
  }
}
</style>