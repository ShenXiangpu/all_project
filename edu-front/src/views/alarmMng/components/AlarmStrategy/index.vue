<template>
  <div>
    <el-card class="marginTop10">
      <template #header>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="openStrategyDialog"
          >新建策略</el-button
        >
      </template>
      <el-table :data="alarmConfigsList" border style="width: 100%">
        <el-table-column
          prop="alarmName"
          label="策略名称"
          min-width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="alarmType"
          label="策略类型"
          min-width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="告警规则"
          min-width="180"
          align="center"
        >
          <template #default="scope">
            <div v-if="scope.row.alarmType == 'CPU'">
              CPU使用率{{ scope.row.alarmOperator
              }}{{ scope.row.alarmPercent }}%，持续时间{{
                scope.row.interval
              }}秒
            </div>
            <div v-if="scope.row.alarmType == 'MEMORY'">
              内存使用率{{ scope.row.alarmOperator
              }}{{ scope.row.alarmPercent }}%，持续时间{{
                scope.row.interval
              }}秒
            </div>
            <div v-if="scope.row.alarmType == 'DISK'">
              磁盘使用情况{{ scope.row.alarmOperator
              }}{{ scope.row.alarmPercent }}KBps，持续时间{{
                scope.row.interval
              }}秒
            </div>
            <div v-if="scope.row.alarmType == 'POWEREDOFF'">关闭电源</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="告警规则描述"
          align="center"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="alarmLevel"
          label="告警等级"
          align="center"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          min-width="120"
        >
          <template #default="scope">
            <div>
              {{ $moment(scope.row.updateTime).format("yyyy-MM-DD HH:mm:ss") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="告警启停"
          align="center"
          min-width="120"
        >
          <template #default="scope">
            <!-- <el-switch
              @change="updataAlarm(scope.row)"
              v-model="scope.row.enabled"
              active-text="启用"
              inactive-text="停用"
            >
            </el-switch> -->
            <el-switch-edu
              :scope="scope"
              @queryAlarmConfigsBySchool="queryAlarmConfigsBySchool"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="enabled"
          label="通知邮箱"
          align="center"
          min-width="180"
        >
          <template #default="scope">
            <div v-if="scope && scope.row && scope.row.alarmEmails">
              <div v-for="item in scope.row.alarmEmails.split(',')" :key="item">
                {{ item }}
              </div>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="120"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              class="editPrimary marginRight10"
              @click="updateStrategyDialog(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDeleteAlarm(scope.row)"
            >
              <el-button
                size="small"
                type="danger"
                class="editDanger"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-if="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="searchQuery"
      />
    </el-card>
    <strategy-dialog
      ref="strategy-dialog"
      @getList="queryAlarmConfigsBySchool"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import StrategyDialog from "./components/StrategyDialog.vue";
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";
import ElSwitchEdu from "./components/ElSwitchEdu.vue";
import { checkPermission } from "@/utils/validate";
import { getAlarmConfigsBySchool } from "@/api/edu/alarm";
import { Message } from "element-ui";
import { deleteAlarmConfig, addOrUpdate } from "@/api/edu/cloud";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "AlarmStrategy",
  components: {
    Pagination,
    BorderContainer,
    StrategyDialog,
    ElSwitchEdu,
  },
  props: {},
  data() {
    return {
      checkPermission,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        fileName: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",
      loading: false,

      labsList: [
        {
          displayName: "123",
        },
      ],
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      alarmConfigsList: [],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.queryAlarmConfigsBySchool();
  },
  methods: {
    updateStrategyDialog(item) {
      const strategy = this.$refs["strategy-dialog"];
      strategy && strategy.addAlarmStrategy();
      strategy.item = item;
      strategy.dialog.status = "update";
    },
    handleDeleteAlarm(item) {
      const { id } = item;
      deleteAlarmConfig({ id }).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警策略删除成功");
          this.queryAlarmConfigsBySchool();
        } else {
          this.$message.error("告警策略删除失败");
        }
      });
    },

    updataAlarm(item) {
      // let alarmEmails = item && item.alarmEmails;
      // let index = alarmEmails && alarmEmails.indexOf(",");
      // if (index != -1) {
      //   item.alarmEmails = alarmEmails && alarmEmails.split(",");
      // } else {
      //   item.alarmEmails = [item.alarmEmails];
      // }
      console.log(item);
      let items = {
        id: item.id,
        desc: item.desc,
        emails: [],
        enabled: item.enabled,
        interval: item.interval,
        levels: item.alarmLevel,
        name: item.alarmName,
        operator: item.alarmOperator,
        percent: item.alarmPercent,
        type: item.alarmType,
      };

      addOrUpdate(items).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警策略修改成功");
          this.queryAlarmConfigsBySchool();
        } else {
          this.$message.error("告警策略修改失败");
        }
      });
    },
    queryAlarmConfigsBySchool() {
      getAlarmConfigsBySchool().then((res) => {
        if (res && res.flag) {
          let resData = res && res.resData;
          this.alarmConfigsList = resData;
          console.log("alarmConfigsList", resData);
        }
      });
    },
    //
    openStrategyDialog() {
      const strategy = this.$refs["strategy-dialog"];
      strategy && strategy.addAlarmStrategy();
    },
    handleClose() {
      this.fileDialogVisible = false;
      this.fileUpLoading = false;
      let updateFileInfo = {
        id: "",
        displayName: "",
        remark: "",
      };
      this.updateFileInfo = updateFileInfo;
    },

    async doUpload(form) {
      this.fileUpLoading = true;
      let dialogStatus = this.dialogStatus;
      if (dialogStatus == "create") {
        const isLt5M = form && form.file && form.file.size / 1024 / 1024;
        const res = await maxFileUploadSize();
        if (res && res.flag) {
          let resData = res && res.resData;
          let resDataMb = resData && resData.MB;
          if (resDataMb < isLt5M) {
            this.$message.error(`上传文件大小不能超过 ${resDataMb}MB!`);
          } else {
            let FormDatas = new FormData();
            FormDatas.append("file", form.file);
            // FormDatas.append("fileRename", form.fileRename);
            // FormDatas.append("remark", form.remark);
            // console.log("FormDatas", FormDatas);
            uploadLab({
              FormDatas,
              fileRename: form.fileRename,
              remark: form.remark,
            }).then((res) => {
              let resData = res.resData;
              if (res && res.flag && resData) {
                this.$message.success("上传成功");
                this.handleClose();
                this.handleQuery();
              } else {
                this.$message.error("上传出错");
              }
            });
          }
        } else {
          return false;
        }
      } else {
        const { id } = this.updateFileInfo;
        const { fileRename, remark } = form;
        let data = {
          id,
          displayName: fileRename,
          remark: remark,
        };
        updateLab(data).then((res) => {
          if (res && res.flag) {
            this.$message.success("修改成功");
            this.handleClose();
            this.handleQuery();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
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
    getList() {
      this.loading = true;
      getOenList(this.listQuery).then((reponse) => {
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
      const res = await deleteLabById({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
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
