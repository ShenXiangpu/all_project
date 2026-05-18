<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="名称/编号" prop="name">
              <el-input class="inputClass" v-model="queryParams.name" placeholder="请输入IP名称/编号" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <get-university v-if="userRolesNames === '系统最高管理员'" :queryParams="queryParams" />
            <el-form-item prop="supplier" label="供应商">
              <el-select class="inputClass" v-model="queryParams.supplier" @change="handleQuery" placeholder="请选择供应商">
                <el-option v-for="item in ipSupplierList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="packageType" label="封装类型">
              <el-select class="inputClass" v-model="queryParams.packageType" @change="handleQuery"
                placeholder="请选择封装类型">
                <el-option v-for="item in packageTypeList" :key="item.label" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="process" label="工艺制程">
              <el-input class="inputClass" v-model="queryParams.process" placeholder="请输入工艺制程" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card class="marginTop10">
      <template #header>
        <el-button type="primary" icon="el-icon-plus" @click="openFileDialog">添加IP</el-button>
      </template>
      <el-table :data="labsList" style="width: 100%">
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="IP名称" min-width="100" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="serialNumber" label="IP编号" min-width="100" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="universityName" label="所属高校" min-width="180" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="packageType" label="封装类型" align="center" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="chipVerification" label="流片验证" align="center" min-width="80">
          <template #default="scope">
            <div>{{ scope.row.chipVerification == 1 ? '是' : '否' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="foundry" label="流片foundry" align="center" min-width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="process" label="工艺制程" align="center" min-width="80">
          <template #default="scope">
            <div>{{ scope.row.process }}nm</div>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="上传时间" align="center" min-width="120">
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180">
        </el-table-column> -->
        <el-table-column label="操作" fixed="right" align="center" min-width="180">
          <template #default="scope">
            <el-button size="small" type="primary" class="editPrimary" @click.stop="handleVersion(scope.row)">
              版本管理
            </el-button>

            <el-button size="small" type="primary" class="editPrimary marginRight10"
              @click.stop="handleUpdate(scope.row)">
              修改
            </el-button>

            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button size="small" type="danger" class="editDanger" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-if="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit"
        @pagination="searchQuery" />
    </el-card>
    <ip-dialog ref="upload-file-dialog" @queryList="queryList" />
    <version-dialog ref="version-dialog" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import IpDialog from "./components/IpDialog";
import VersionDialog from "./components/VersionDialog";
import GetUniversity from "@/components/GetUniversity";
import { checkPermission } from "@/utils/validate";
import { searchKey, geIpList, delOneIP } from "@/api/edu/ip";
import { Message } from "element-ui";
import { mapGetters } from "vuex"

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "IP",
  components: {
    Pagination,
    BorderContainer,
    IpDialog,
    VersionDialog,
    GetUniversity
  },
  props: {},

  data() {
    return {
      packageTypeList: [
        { label: "软核", value: "软核" },
        { label: "固核", value: "固核" },
        { label: "硬核", value: "硬核" },
        { label: "其他", value: "其他" },
      ],
      checkPermission,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        name: "",
        universityName: "",
        supplier: "",
        packageType: "",
        process: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",
      loading: false,

      labsList: [],
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters(['userRolesNames'])
  },
  created() {
    this.handleQuery();
    this.querySearchKey();
  },
  methods: {
    //querysearchKey
    querySearchKey() {
      searchKey().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.ipSupplierList = resData.ipSupplier;
        }
      });
    },
    //handleVersion
    handleVersion(row) {
      //打开dialog展示版本信息
      const id = row.id;
      const version = this.$refs["version-dialog"];
      version.dialog.status = "create";
      version.dialog.visible = true;
      version.id = id;
      version.versionList = [];
      version.queryVersionList();
    },
    handleUpdate(item) {
      let name = item.name;
      let supplier = item.supplier == "内部IP" ? "内部IP" : "外部IP";
      let supplierName = "";
      if (supplier == "外部IP") {
        supplierName = item.supplier;
      }
      let packageType = item.packageType;
      let chipVerification = item.chipVerification == "1" ? "是" : "否";
      let foundry = item.foundry;

      let process = item.process;
      let id = item.id;
      let form = {
        id,
        name,
        supplier,
        supplierName,
        packageType,
        chipVerification,
        foundry,
        process,
        version: "",
        displayName: "",
      };
      const ip = this.$refs["upload-file-dialog"];
      ip.dialog.visible = true;
      ip.dialog.status = "update";
      ip.form = form;
    },
    //
    openFileDialog() {
      const ip = this.$refs["upload-file-dialog"];
      ip.dialog.visible = true;
      let form = {
        name: "",
        supplier: "内部IP",
        supplierName: "",
        packageType: "",
        chipVerification: "是",
        foundry: "",
        process: "",
        version: "",
        displayName: "",
      };
      ip.form = form;
      ip.dialog.status = "create";
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
      this.querySearchKey();
    },
    getList() {
      this.loading = true;
      geIpList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData.records;
        this.total = resData.total;
        this.loading = false;
      });
    },

    cancel() {
      let _this = this;
      _this.dialog.visible = false;
      // _this.dialog = dialog;
      _this.$refs.alarmRuleForm.resetFields();
    },
    handleQuery() {
      this.listQuery.params = this.queryParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.listQuery.params = [];
      this.listQuery.page = 1;
      this.getList();

      this.$refs[formName].resetFields();
    },
    handleAdd(value) {
      let _this = this;
      this.textValue = value;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    async handleDelete(row) {
      const { id } = { ...row };
      const res = await delOneIP({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() { },
};
</script>
<style lang="scss" scoped>
.inputClass {
  width: 180px;
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
    }

    // .el-dialog__footer {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 0px
    // }
  }

  &-form {
    width: 50%;
  }
}

.dialog-form {
  width: 100%;
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.dialog-userContainer {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  max-height: 30vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}
</style>
