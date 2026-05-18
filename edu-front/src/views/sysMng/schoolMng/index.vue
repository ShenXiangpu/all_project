<template>
  <div class="app-container">
    <filter-form @handleQuery="handleQuery" @resetQuery="resetQuery" />
    <el-card>
      <template #header>
        <div class="flex justify-between">
          <div>
            <el-button style="margin-right: 20px" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </div>
        </div>
      </template>

      <el-table ref="dataTableRef" v-loading="loading" :data="schoolList">
        <el-table-column label="序号" type="index" width="50" align="center" />
        <el-table-column label="高校名称" prop="universityName" min-width="150" align="center" show-overflow-tooltip />
        <el-table-column label="高校类型" prop="type" min-width="150" align="center" />

        <el-table-column label="实验案例" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.trials && scope.row.trials.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.trials" :key="index">{{
                    item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.trials">
                  {{ scope.row.trials.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.trials.length || 0 }}个
            </div>
          </template>
        </el-table-column>
        <el-table-column label="题库资源" prop="universityName" min-width="100" align="center">

          <template slot-scope="scope">
            <div v-if="scope.row.quBanks && scope.row.quBanks.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.quBanks"
                    :key="index">{{
                      item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.quBanks">
                  {{ scope.row.quBanks.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.quBanks.length || 0 }}个
            </div>

          </template>
        </el-table-column>
        <el-table-column label="PDK资源" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.pdks && scope.row.pdks.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.pdks" :key="index">{{
                    item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.pdks">
                  {{ scope.row.pdks.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.pdks.length || 0 }}个
            </div>
          </template>
        </el-table-column>
        <el-table-column label="IP资源" prop="universityName" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.ips && scope.row.ips.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.ips" :key="index">{{
                    item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.ips">
                  {{ scope.row.ips.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.ips.length || 0 }}个
            </div>

          </template>
        </el-table-column>
        <el-table-column label="EDA工具" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.tools && scope.row.tools.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.tools" :key="index">{{
                    item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.tools">
                  {{ scope.row.tools.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.tools.length || 0 }}个
            </div>

          </template>

        </el-table-column>
        <el-table-column label="Lab资源" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.labs && scope.row.labs.length > 0">
              <el-popover placement="top" trigger="hover">
                <div class="el-tag-content">
                  <el-tag class="marginRight10 marginBottom10" v-for="(item, index) in scope.row.labs" :key="index">{{
                    item }}</el-tag>
                </div>
                <div slot="reference" class="primaryColorb pointer" v-if="scope.row.labs">
                  {{ scope.row.labs.length || 0 }}个
                </div>
              </el-popover>
            </div>
            <div v-else>
              {{ scope.row.labs.length || 0 }}个
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学校状态" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createByName" min-width="100" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt" min-width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="280">
          <template #default="scope">
            <el-button size="small" v-if="userRolesNames == '系统最高管理员'" type="primary" class="editPrimary"
              @click.stop="handleReource(scope.row)">
              资源分配
            </el-button>
            <el-divider direction="vertical" v-if="userRolesNames == '系统最高管理员'"></el-divider>

            <el-button size="small" type="primary" class="editPrimary" @click.stop="handleUpdate(scope.row)">
              修改
            </el-button>
            <el-divider direction="vertical" v-if="userRolesNames == '系统最高管理员'"></el-divider>
            <el-popconfirm v-if="userRolesNames != '老师'" title="确定删除吗？" @onConfirm="handleDelete(scope.row)"
              onCancel="">
              <el-button size="small" type="danger" class="editDanger" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- pagination -->
    </el-card>

    <add-dialog ref="add-dialog" @queryList="handleQuery" />
    <resource-dialog ref="resource-dialog" @queryList="handleQuery" />
  </div>
</template>
<script>
import { delSchool, getSchoolList } from "@/api/edu/school";
import { Message } from "element-ui";
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import { mapGetters } from "vuex";
import FilterForm from "./components/FilterForm.vue";
import AddDialog from "./components/AddDialog.vue";
import ResourceDialog from "./components/ResourceDialog";
import ToolsDetail from "@/views/labMng/labDetail/components/ToolsDetail.vue";
export default {
  components: {
    Pagination,
    BorderContainer,
    FilterForm,
    AddDialog,
    ResourceDialog,
    ToolsDetail
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
        universityName: "",
      },
      loading: false,
      formDataRules: {
        universityName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
        ],
      },

      schoolList: [],
      schoolId: "",
    };
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {
    this.handleQuery();
  },
  mounted() { },
  methods: {

    handleReource(row) {
      const ip = this.$refs["resource-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "create";
      let id = row.id;
      ip.id = id;
      ip.queryUniDisDetail(id);
    },
    handleAdd() {
      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      let form = {
        universityName: "",
        type: "",
        status: "",
      };
      ip.form = form;
      ip.dialog.status = "create";
    },



    // handleRoleName(roleName) {
    //     let roleList = this.roleList
    //     let itemList = roleList && roleList.length > 0 && roleList.filter(i => {
    //         return i.roleName == roleName
    //     })
    //     return itemList && itemList.length > 0 && itemList[0].roleId

    // },

    searchQuery() {
      this.handleQuery();
    },
    resetQuery(params) {
      this.handleQuery(params);
    },

    //查询
    async handleQuery(params) {
      this.loading = true;
      const res = await getSchoolList(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.schoolList = resData;
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
      let formData = {
        id: item.id,
        universityName: item.universityName, // 父级菜单
        type: item.type,
        status: item.status,
      };

      const ip = this.$refs["add-dialog"];
      ip.dialog.visible = true;
      ip.form = formData;
      ip.dialog.status = "update";
    },
    //单删
    async handleDelete(item) {
      let id = item.id;
      const res = await delSchool({ id });
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

.el-tag-content {
  max-height: 200px;
  max-width: 600px;
  min-width: 150px;
  overflow-y: auto
}
</style>
