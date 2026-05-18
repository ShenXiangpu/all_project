<template>
  <div>

    <el-card>
      <template #header>
        <div class="flex justify-between">
          <div>
            <el-button
              style="margin-right: 20px"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              >新增</el-button
            >
          </div>
        </div>
      </template>

      <el-table ref="dataTableRef" v-loading="loading" :data="EDAVendorList">
        <el-table-column
          label="厂商代码"
          prop="vendorCode"
          min-width="150"
          align="center"
        />

        <el-table-column
          label="厂商名称"
          prop="vendorName"
          min-width="150"
          align="center"
        />

        <el-table-column
          label="厂商英文名称"
          prop="vendorNameEn"
          min-width="150"
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
    </el-card>

    <el-dialog
      :title="dialog.title"
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
        <!-- 权限标识 -->
        <el-form-item label="厂商代码" prop="vendorCode">
          <el-input
            maxlength="11"
            class="el-input-edu"
            v-model="formData.vendorCode"
            placeholder="请输入厂商代码"
          />
        </el-form-item>
        <el-form-item label="厂商名称" prop="vendorName">
          <el-input
            maxlength="11"
            class="el-input-edu"
            v-model="formData.vendorName"
            placeholder="请输入厂商名称"
          />
        </el-form-item>
        <el-form-item label="厂商英文名称" prop="vendorNameEn">
          <el-input
            maxlength="11"
            class="el-input-edu"
            v-model="formData.vendorNameEn"
            placeholder="请输入厂商英文名称"
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
import { addEdaVendor, getEdaVendor, updateEdaVendor } from "@/api/edu/tool";

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
      roleName: "学生",
      roleList: [], //
      usersList: [],
      queryParams: {
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
        vendorCode: "",
        vendorName: "",
        vendorNameEn: "",
      },
      loading: false,
      formDataRules: {
        vendorCode: [
          { required: true, message: "请输入厂商代码", trigger: "blur" },
        ],
        vendorName: [
          { required: true, message: "请输入厂商名称", trigger: "blur" },
        ],
        vendorNameEn: [
          { required: true, message: "请输入厂商英文名称", trigger: "blur" },
        ],
      },

      EDAVendorList: [],
      vendorId: "",
    };
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {
    this.handleQuery();
  },
  mounted() {},
  methods: {
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
        vendorCode: "",
        vendorName: "",
        vendorNameEn: "",
      };
      this.vendorId = "";
      this.formData = formData;
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
          let title = this.dialog.title;
          let res = "";
          if (this.vendorId) {
            this.formData.id = this.vendorId;
            res = await updateEdaVendor(this.formData);
          } else {
            res = await addEdaVendor(this.formData);
          }
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

    searchQuery(e) {
      this.handleQuery();
    },

    //查询角色列表
    async handleQuery() {
      this.loading = true;
      const res = await getEdaVendor();
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.EDAVendorList = resData;
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
      this.vendorId = item.id;
      let formData = {
        vendorCode: item.vendorCode,
        vendorName: item.vendorName,
        vendorNameEn: item.vendorNameEn,
      };

      this.formData = formData;
      let dialog = {
        title: "修改",
        visible: true,
      };
      this.dialog = dialog;
    },
    //单删
    async handleDelete(item) {
      item.delFlag = 1
      const res = await updateEdaVendor(item);
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
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
      margin-left: 150px;
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
</style>
