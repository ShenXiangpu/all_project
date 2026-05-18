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
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules">
      <el-form-item label="职位名称">
        <div>{{ postName }}</div>
      </el-form-item>
      <el-form-item label="权限范围" prop="dataScope ">
        <el-select
          class="el-input-edu"
          v-model="form.dataScope"
          placeholder="请输入权限范围"
          @change="handlePermitList"
        >
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.itemName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <div v-if="form.dataScope == 2" class="el-form-edu-tree">
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
      </div>
    </el-form>
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
  getPostDetailById,
  getDeptList,
  distributeDataScope,
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
        label: "name",
      },
      defaultCheckedKeys: [],
      list: [
        { id: 5, itemName: "仅本人权限" },
        { id: 1, itemName: "全部数据权限" },
        { id: 2, itemName: "指定部门数据权限" },
        { id: 3, itemName: "本部门数据权限" },
      ],
      loading: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "数据权限",
        create: "数据权限",
        look: "",
      },
      postName: "",
      form: {
        id: "",
        dataScope: 5,
        dataScopeDeptIds: "",
      },
      rules: {
        dataScope: [
          { required: true, message: "请选择权限范围", trigger: "blur" },
        ],
      },
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  methods: {
    queryPostDetailById(id) {
      getPostDetailById({ id }).then((response) => {
        if (response && response.flag) {
          let resData = response.resData;
          let dataScope = resData.dataScope || 5;
          if (dataScope == 2) {
            getDeptList()
              .then((response) => {
                let resData = response.resData;
                this.menuList = resData;
              })
              .catch((error) => {
                console.error(`Error:`, error);
              });
          }
          let dataScopeDeptIds = resData.dataScopeDeptIds || "";
          this.defaultCheckedKeys =
            (dataScopeDeptIds && dataScopeDeptIds.split(",")) || [];
          this.form.dataScope = dataScope;
          this.form.dataScopeDeptIds = dataScopeDeptIds;
        }
      });
    },
    //查询组件架构列表
    handlePermitList(e) {
      console.log(e);

      if (e == 2) {
        getDeptList()
          .then((response) => {
            let resData = response.resData;
            this.menuList = resData;
          })
          .catch((error) => {
            console.error(`Error:`, error);
          });
      } else {
        this.menuList = [];
      }
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
    submitUpload() {
      let dataScope = this.form.dataScope;
      //选择2时判断是否选择部门
      if (dataScope == 2) {
        if (!(this.checkMenuKeys && this.checkMenuKeys.length > 0)) {
          return this.$message.error("请选择部门");
        }
        this.form.dataScopeDeptIds = this.checkMenuKeys.join(",");
      } else {
        // 否则去掉部门ids字段
        let form = {
          id: this.form.id,
          dataScope,
        };
        this.form = form;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("form", this.form);

          this.loading = true;
          const operationFunction =
            this.dialog.status === "create"
              ? distributeDataScope
              : distributeDataScope;
          const successMessage =
            this.dialog.status === "create" ? "添加成功" : "修改成功";
          const errorMessage =
            this.dialog.status === "create"
              ? "添加失败，请重试"
              : "修改失败，请重试";

          // 确保 operationFunction 是一个函数
          if (typeof operationFunction !== "function") {
            console.error("Invalid operation function:", operationFunction);
            this.$message.error("操作函数无效");
            this.loading = false;
            return;
          }

          operationFunction(this.form)
            .then((response) => {
              if (response && response.flag) {
                this.$message.success(successMessage);
                this.loading = false;
                this.handleClose();
                this.$emit("queryList");
              } else {
                this.$message.error(errorMessage);
                this.loading = false;
              }
            })
            .catch((error) => {
              console.error(`Error ${this.dialog.status} post:`, error);
              this.$message.error(errorMessage);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs["form"].resetFields();
      this.dialog.visible = false;
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
