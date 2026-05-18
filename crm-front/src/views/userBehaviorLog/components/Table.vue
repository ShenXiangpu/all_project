<template>
  <el-card>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column
        prop="id"
        label="ID"
        width="70"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作类型"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="执行者"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column
        prop="contractTypeName"
        label="操作IP"
        align="center"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column> -->
      <el-table-column
        prop="createTime"
        label="操作时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column
        prop="companyTypeName"
        label="操作浏览器"
        align="center"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column> -->
      <el-table-column
        prop="etc"
        label="操作数据"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
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
  created() {},
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
      this.$emit("delete", [row.contractId], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
