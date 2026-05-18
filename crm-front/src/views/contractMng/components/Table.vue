<template>
  <el-card>
    <template #header v-if="(!isDetail) && type == 'my'">
      <div class="flex justify-between">
        <div>
          <el-button v-permission="['contract:add']" type="primary" icon="el-icon-plus"
            @click="openFileDialog">添加合同</el-button>
        </div>
        <div>
          <el-dropdown v-permission="[
            'contract:batchImport',
            `contract:downContractTemplate`,
          ]" split-button type="primary" @command="handleClick">
            批量操作
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="{ edit }">批量领取 </el-dropdown-item>
              <el-dropdown-item command="{ edit }">批量分配</el-dropdown-item>-->
              <el-dropdown-item v-permission="['contract:downContractTemplate']"
                command="download">下载模板</el-dropdown-item>
              <el-dropdown-item v-permission="['contract:batchImport']" command="import">
                <el-upload ref="upload" action :http-request="doUpload" :show-file-list="false"
                  :before-upload="beforeAvatarUpload" :auto-upload="true">
                  批量导入
                </el-upload>
              </el-dropdown-item>
              <!-- <el-dropdown-item command="export">批量导出</el-dropdown-item> -->

              <el-dropdown-item v-permission="['contract:delete']" command="dels">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column v-if="(!isDetail)" type="selection" width="55" align="center" />
      <el-table-column prop="contract.contractSe" label="合同序号" min-width="120" align="center" sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contract.contractNo" label="合同编号" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contract.contractName" label="合同名称" min-width="120" align="center" show-overflow-tooltip>
        <template #default="scope">
          <div class="primaryColorb pointer view-text" @click="handleContract(scope.row)">
            <i class="el-icon-paperclip" v-if="
              scope.row.contract.contractAttachments &&
              scope.row.contract.contractAttachments.length > 0
            "></i>
            {{ scope.row.contract.contractName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="customer.customerName" label="客户名称" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <div class="primaryColorb pointer view-text" @click="handleCustomerInfo(scope.row)">
            {{ scope.row.customer.customerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contract.signatoryTypeName" label="签约类型" align="center" min-width="120"
        show-overflow-tooltip>
        <template #default="scope">
          <div>
            {{ scope.row.contract.signatoryTypeName || '--' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contractTypeName" label="合同类型" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="consumerSourceName" label="客户来源" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="companyTypeName" label="单位类型" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="cooperationAreaName" label="合作方向" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contractStatusName" label="合同状态" align="center" min-width="80" show-overflow-tooltip>
        <!-- <template #default="scope">
          <div>{{ scope.row.chipVerification == 1 ? "是" : "否" }}</div>
        </template> -->
      </el-table-column>
      <el-table-column prop="paymentStatusName" label="付款状态" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contract.contractAmount" label="合同金额(元)" align="center" min-width="110"
        show-overflow-tooltip>
        <!-- <template #default="scope">
          <div>{{ scope.row.process }}nm</div>
        </template> -->
      </el-table-column>
      <el-table-column label="付款金额(元)" align="center" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <div v-for="(item, index) in scope.row.contractPayments" :key="item.id">
              <span class="" v-if="item.paymentAmount != 0">{{ `第${index + 1}笔` }} </span> <span> {{ item.paymentAmount
              }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contract.restAmount" label="剩余尾款(元)" align="center" min-width="120"
        show-overflow-tooltip></el-table-column>
      <el-table-column prop="contract.paymentTime" label="付款时间" align="center" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <div v-for="(item, index) in scope.row.contractPayments" :key="item.id">
              <span class="" v-if="item.paymentAmount != 0 && item.paymentTime">{{ `第${index + 1}笔` }} </span> <span>
                {{ item.paymentTime
                }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="contract.startTime" label="服务生效时间" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contract.endTime" label="服务结束时间" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="contract.createAt" label="创建时间" align="center" min-width="160" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contactUserName" label="跟进人" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="contactDepName" label="所属部门" align="center" min-width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="280"
        v-if="(!isDetail) && checkPermission(['contract:add', 'contract:update', 'contract:delete','contractFollowUp:addOne'])">
        <template #default="scope">
          <div>
            <el-button v-permission="['contractFollowUp:addOne']" type="info" class="editInfo" size="mini" @click="handleFollow(scope.row)">跟进</el-button>
            <el-button type="info" class="editInfo" size="mini" @click="handleContract(scope.row)">合同</el-button>
            <el-button type="danger" class="editDanger" size="mini" @click="handleUpdate(scope.row)"
              v-permission="['contract:update']">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button size="mini" type="warning" class="editWarning marginLeft10" slot="reference"
                v-permission="['contract:delete']">
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />
  </el-card>
</template>
<script>
import Pagination from "@/components/Pagination";
import { downUserTemplate, insertUserBatch } from "@/api/crm/contract";
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
      insertLoading: false,
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
      rowList: [], //删除审批中需要展示的列表
    };
  },
  methods: {
    checkPermission,
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
      }
      if (e == "dels") {
        if (!(this.ids && this.ids.length > 0)) {
          this.$message.warning("请选择要删除的数据");
          return;
        }
        this.$emit("delete", this.ids, this.rowList);
      }
    },
    handleCustomerInfo(row) {
      this.$emit("handleCustomerInfo", row);
    }, // 获取多删除ids
    handleSelectionChange(e) {
      let rowList = e;
      if (rowList && rowList.length > 0) {
        let ids = [];
        rowList.map((i) => {
          ids.push(i.contractId);
        });
        this.ids = ids;
      } else {
        this.ids = [];
      }
      this.rowList = rowList;
    },

    handleRowClick(e) { },
    handleCommand(row) {
      Object.keys(row).forEach((key) => {
        if (key == "edit") {
          this.$emit("handleUpdate", row[key]);
        }
        if (key == "delete") {
          this.$confirm("确定删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$emit(`${key}`, row[key]);
            })
            .catch(() => {
              console.log("取消删除");
            });
        }
        //驳回
        if (key == "reject") {
          this.$emit(`${key}`, row[key].id);
        }
      });
    },
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
      console.log(e);
      console.log("searchQuery", this.listQuery);
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
    handleContract(item) {
      this.$emit("handleContract", item);
    },
    handleFollow(item) {
      this.$emit("handleFollowContract", item);
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
      this.$emit("delete", [row.contractId], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
