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
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  distributeMenu,
  getPostMenus,
  listResources,
} from "@/api/crm/organization";
export default {
  name: "DataPermitDialog",
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
  data() {
    return {
      checkMenuKeys: [],
      menuList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultCheckedKeys: [],
      loading: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "菜单权限",
        create: "菜单权限",
        look: "",
      },
      id: "", //职位id
    };
  },

  methods: {
    //点击资源分配，打开弹出框，搜索获得角色菜单（all）和角色菜单
    async showRoleMenuDialog() {
      let id = this.id;
      const res = await getPostMenus({ id }); // 回显已选菜单
      if (res && res.flag) {
        let resData = res.resData;
        let roleMenuList = this.handleTreeList(resData); // 获得需要回显的菜单，需要对父级菜单进行过滤
        let defaultCheckedKeys = this.handleRoleMenuList(roleMenuList);
        this.defaultCheckedKeys = defaultCheckedKeys.toString().split(",");
        console.log("this.defaultCheckedKeys", this.defaultCheckedKeys);
        
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
      const res = await listResources(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
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
            id: item.value || item.id || "",
            label: item.label || item.name || "",
            disabled: item.disabled || false,
          };
          if (item.children && item.children.length > 0) {
            optionItem.children = this.handleTreeList(item.children);
          }
          children.push(optionItem);
        });

      return children;
    },
    //选菜单时获得菜单id
    handleRoleList(e) {
      const checkMenuKeys = this.$refs.resourceRef.getCheckedKeys();
      this.checkMenuKeys = checkMenuKeys;
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },
    async submitUpload() {
      const checkMenuKeys = this.$refs.resourceRef.getCheckedKeys();
      this.checkMenuKeys = checkMenuKeys;
      this.menuDialogVisible = false;
      let postId = this.id;
      let data = {
        menuId: checkMenuKeys,
        postId,
      };
      const res = await distributeMenu(data);
      if (res && res.flag) {
        this.$message.success("权限设置成功");
        this.handleClose();
      } else {
        this.$message.error("权限设置失败");
      }
    },
    handleClose() {
      this.dialog.visible = false;
      this.defaultCheckedKeys = [];
      this.menuList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 600px;
    }
    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
  .el-form-edu-tree {
    margin-left: 120px;
    width: 300px;
    max-height: 150px;
    overflow: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 0;
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
