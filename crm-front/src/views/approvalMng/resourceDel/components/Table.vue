<template>
  <el-card>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" min-width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="审批编号"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="instType"
        label="审批类型"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="removeIds"
        label="删除数量"
        align="center"
        min-width="100"
        show-overflow-tooltip
        :formatter="getCount"
      >
      </el-table-column>
      <el-table-column
        prop="reason"
        label="申请事由"
        align="center"
        min-width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="runStatus"
        label="审批结果"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="approvalStatus"
        label="审批状态"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        min-width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="ownerName"
        label="创建人"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        min-width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="130"
      >
        <template #default="scope">
          <div>
            <el-button
              v-permission="['customer:customerInfo:editOne']"
              type="danger"
              class="editDanger"
              size="mini"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                v-permission="['customer:customerInfo:customerList']"
                size="mini"
                type="warning"
                class="editWarning marginLeft10"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="searchQuery"
    />
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
      default: () => {},
    },
  },
  components: {
    Pagination,
  },
  created() {},
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
    };
  },
  methods: {
    getCount(row, column) {
      const { removeIds } = row;
      if (!removeIds || typeof removeIds !== "string") {
        return 0;
      }
      try {
        const parsedRemoveIds = JSON.parse(removeIds);
        if (Array.isArray(parsedRemoveIds)) {
          return parsedRemoveIds.length;
        }
      } catch (error) {
        console.error("Failed to parse removeIds:", error);
      }
      return 0;
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
                  itemHtml += `<div style="margin-bottom:2px;color:red"><span>${
                    index + 1
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
    handleSelectionChange() {},
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
      this.$emit("delete", row);
    },
  },
};
</script>

<style lang="scss" scoped></style>
