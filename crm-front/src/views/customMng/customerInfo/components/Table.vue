<template>
  <el-card>
    <template #header v-if="!isDetail">
      <div class="flex justify-between">
        <div>
          <el-button v-permission="['customer:customerInfo:addOne']" type="primary" icon="el-icon-plus"
            @click="openFileDialog">添加客户</el-button>
        </div>

        <div v-if="
          checkPermission(['customer:customerInfo:addOne']) ||
          checkPermission([`customer:customerInfo:downCustomerTemplate`])
        ">
          <el-dropdown split-button type="primary" @command="handleClick">
            批量操作
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="{ edit }">批量领取 </el-dropdown-item>
              <el-dropdown-item command="{ edit }">批量分配</el-dropdown-item>-->
              <el-dropdown-item v-permission="['customer:customerInfo:addOne']"
                command="download">下载模板</el-dropdown-item>
              <el-dropdown-item v-permission="[`customer:customerInfo:downCustomerTemplate`]" command="import">
                <el-upload ref="upload" action :http-request="doUpload" :show-file-list="false"
                  :before-upload="beforeAvatarUpload" :auto-upload="true">
                  批量导入
                </el-upload>
              </el-dropdown-item>
              <el-dropdown-item v-permission="['customer:customerInfo:customerList']"
                command="dels">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column v-if="!isDetail" type="selection" width="55" align="center" />
      <el-table-column prop="customerName" label="客户名称" min-width="100" align="center" show-overflow-tooltip>
        <template #default="scope">
          <div class="primaryColorb pointer view-text" @click="handleCustomerInfo(scope.row)">
            {{ scope.row.customerName }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="linkPhone"
        label="联系方式"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column> -->
      <el-table-column prop="companyTypeName" label="单位类型" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="location" label="所属地区" align="center" min-width="80" show-overflow-tooltip>
        <template #default="scope">
          {{ formatLocation(scope.row.location) }}
        </template>
      </el-table-column>
      <el-table-column prop="fullAddress" label="详细地址" align="center" min-width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="consumerSourceName" label="客户来源" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="trackUserName" label="跟踪人" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createByName" label="创建人" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="130" v-if="
        !isDetail &&
        (checkPermission(['customer:customerInfo:customerList']) ||
          checkPermission([`customer:customerInfo:editOne`]) || checkPermission([`customerFollowUp:addOne`]))
      ">
        <template #default="scope">
          <div>
            <el-button v-permission="['customerFollowUp:addOne']" type="primary" size="mini"
              @click="handleFollow(scope.row)">跟进</el-button>
            <el-button v-permission="['customer:customerInfo:editOne']" type="danger" class="editDanger" size="mini"
              @click="handleUpdate(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button v-permission="['customer:customerInfo:customerList']" size="mini" type="warning"
                class="editWarning marginLeft10" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-if="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />
  </el-card>
</template>
<script>
import Pagination from "@/components/Pagination";
import { downTemplate, insertBatch } from "@/api/crm/downAndInport";
import { checkPermission } from "@/utils/validate";
export default {
  name: "mytable",
  props: {
    type: {
      type: String,
      default: "my",
    },
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    listQuery: {
      type: Object,
      default: () => {
        return { page: 1, limit: 10 };
      },
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
  },
  created() { },
  computed: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",

      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
      rowList: [],
      ids: [],
    };
  },
  methods: {
    formatLocation(location) {
      // 处理 location 为 null、undefined 或其他非字符串类型的情况
      if (!location || typeof location !== 'string') {
        return '';
      }

      try {
        const parts = location.split(',');
        return parts.slice(0, 2).join('');
      } catch (error) {
        console.warn('解析位置信息时出错:', location, error);
        return '';
      }

    },
    handleCustomerInfo(row) {
      this.$emit("handleCustomerInfo", row);
    },
    checkPermission,
    downLoadFile() {
      downTemplate("customer/customerInfo/downCustomerTemplate").then((res) => {
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
    beforeAvatarUpload(file) {
      return true;
    },
    doUpload(item) {
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      this.insertLoading = true;
      this.$message.success("正在导入");
      insertBatch(FormDatas, "customer/customerInfo/batchImport")
        .then((res) => {
          console.log(res);
          if (res && res.flag) {
            if (res.resData.length == 0) {
              this.$emit("queryList");
              this.insertLoading = false;
              this.$message.success("导入成功");
            } else {
              let resData = res.resData;
              let itemHtml = "";
              resData &&
                resData.forEach((item, index) => {
                  itemHtml += `<div style="margin-bottom:2px;color:red"><span>${index + 1
                    }、</span> ${item}</div>`;
                });
              this.$alert(itemHtml, "提示", {
                dangerouslyUseHTMLString: true,
              });
            }
          } else {
            // this.$message.error("上传出错");
            this.insertLoading = false;
          }
        })
        .finally(() => {
          this.insertLoading = false;
        });
    },
    handleClick(e) {
      if (e == "download") {
        this.downLoadFile();
      } else if (e == "dels") {
        if (!(this.ids && this.ids.length > 0)) {
          this.$message.warning("请选择要删除的数据");
          return;
        }
        this.$emit("delete", this.ids, this.rowList);
      }
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
      this.rowList = rowList;
    },

    handleRowClick(e) { },
    // 申请发布
    applyRelease(id) {
      this.$emit("applyRelease", id);
    },
    release(id) {
      this.$emit("release", id);
    },
    revoke(id) {
      this.$emit("revoke", id);
    },
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },

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
      this.$emit("handleVersion", row.id);
    },
    handleUpdate(item) {
      this.$emit("handleUpdate", item);
    },
    handleFollow(item) {
      this.$emit("handleFollow", item);
    },
    handleCustom(item) {
      this.$emit("handleCustom", item);
    },
    //
    openFileDialog() {
      this.$emit("openFileDialog");
    },
    handleAssign(row) {
      this.$emit("handleAssign", row);
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
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
      this.$emit("delete", [row.id], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
