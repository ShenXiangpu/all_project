<template>
  <el-dialog
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    @close="alarmClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    class="el-dialog-edu"
  >
    <el-form
      ref="alarmForm"
      :model="alarmForm"
      :rules="alarmRules"
      class="el-form-edu"
    >
      <el-form-item
        label="策略名称"
        prop="name"
        v-if="dialog.status == 'create'"
      >
        <el-input
          class="el-input-300"
          v-model="alarmForm.name"
          type="text"
          placeholder="请输入策略名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="策略名称" v-else>
        {{ alarmForm.name }}
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input class="el-input-300" type="textarea" v-model="alarmForm.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="触发警报和" prop="levels">
        <el-select
          class="el-input-300"
          v-model="alarmForm.levels"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in levels"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="告警规则" prop="type">
        <el-select
          @change="changeType"
          class="el-input-300"
          v-model="alarmForm.type"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in icSupportAlarmTypes"
            :key="index"
            :label="item.label"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="flex flex-start op-content">
        <el-form-item
          v-if="operators && operators.length > 0"
          label=""
          prop="operator"
          class="el-form-item-edu"
        >
          <el-select
            class="el-input-150"
            v-model="alarmForm.operator"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in operators"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="unit"
          label=""
          class="el-input-150"
          prop="percent"
          label-width="10px"
        >
          <el-input
            @input="
              (value) =>
                (alarmForm.percent = Number(value.replace(/[^\d]/g, '')))
            "
            class="el-input-150"
            type="number"
            v-model="alarmForm.percent"
            :step="1"
            :min="0"
          >
            <template slot="append">{{ unit }}</template>
          </el-input>
        </el-form-item>

        <el-form-item
          v-if="operators && operators.length > 0"
          label=""
          class="el-form-item-op el-input-300"
          prop="interval"
        >
          <el-input
            @input="
              (value) =>
                (alarmForm.interval = Number(value.replace(/[^\d]/g, '')))
            "
            class="el-input-150"
            type="number"
            v-model="alarmForm.interval"
            :step="1"
            :min="0"
          >
            <template slot="append">秒</template>
          </el-input>
        </el-form-item>
      </div>

      <!-- <el-form-item label="邮箱" prop="emails">
        <el-input
          class="el-input-300"
          v-model="alarmForm.emails"
          placeholder="请输入邮箱，多个邮箱使用逗号分隔"
        ></el-input>
        &nbsp;<span class="primaryColoro">* 多个邮箱使用逗号 (,) 分隔</span>
      </el-form-item> -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="alarmClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="commitAlarmStrategy"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  getVmByCourseId,
  getVmByVmId,
  getPolicyByVmId,
  getConsoleForUser,
  restartDesktop,
  vMPerformanceSummary,
  periodPerformance,
  snapshotList,
  deleteSnapshot,
  deleteAllSnapshot,
  updatePolicy,
  getVmInfoBySnapshotName,
  revert,
  validateAlarmName,
  getIcSupportAlarmTypes,
  addOrUpdate,
  getAlarmConfigsByVmId,
  deleteAlarmConfig,
  queryAlarmEvent,
} from "@/api/edu/cloud";
export default {
  name: "StrategyDialog",
  props: {},
  components: {},
  watch: {},
  data() {
    var checkSAName = (rule, value, callback) => {
      validateAlarmName({ alarmName: value }).then((res) => {
        if (res && res.flag && res.resData) {
          callback();
        } else {
          callback(new Error("告警策略名称已存在，请重新输入"));
        }
      });
    };
    return {
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改策略",
        create: "新建策略",
        look: "查看告警推送规则",
      },
      /**
       * 告警策略
       */
      alarmForm: {
        desc: "", //告警描述
        interval: 0,
        levels: "",
        name: "",
        operator: "",
        percent: 0,
        type: "",
        emails: [],
      },
      alarmRules: {
        name: [
          {
            required: true,
            message: "请输入策略名称",
            trigger: "blur",
          },

          { validator: checkSAName, trigger: "blur" },
        ],
        percent: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],

        interval: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        levels: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        // emails: [
        //   {
        //     required: true,
        //     message: "请输入邮箱，多个邮箱使用逗号分隔",
        //     trigger: "blur",
        //   },
        // ],
      },
      item: {},
      icSupportAlarmTypes: [],
      operators: [],
      unit: "",
      levels: [],
      alarmConfigsList: [],
      listQuery: {
        page: 1,
        limit: 10,
        params: {},
      },
      alarmHistoryList: [],
      total: 0,
      loading: false,
    };
  },
  methods: {
    /**
     * 告警
     *
     */

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: {},
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery = e;
      console.log(e);
      this.getList();
    },
    getList() {
      console.log(this.vmId);
      this.listQuery.params.vmId = this.vmId;
      this.loading = true;
      queryAlarmEvent(this.listQuery)
        .then((reponse) => {
          let resData = reponse.resData;
          this.alarmHistoryList = resData && resData.result;
          this.total = resData.total;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleQuery(e) {
      this.initParams();
      this.listQuery.params = e;
      this.getList();
    },
    //重置搜索条件
    resetQuery() {
      this.listQuery.params = {};
      this.listQuery.page = 1;
      this.getList();
    },

    addAlarmStrategy() {
      this.queryIcSupportAlarmTypes();
      let dialog = {
        status: "create",
        visible: true,
      };
      this.dialog = dialog;
    },
    alarmClose() {
      let alarmForm = {
        desc: "", //告警描述
        interval: 0,
        levels: "",
        name: "",
        operator: "",
        percent: 0,
        type: "",
        emails: [],
      };
      this.alarmForm = alarmForm;
      this.dialog.visible = false;
    },
    queryIcSupportAlarmTypes() {
      getIcSupportAlarmTypes().then((res) => {
        let resData = res && res.resData;
        this.icSupportAlarmTypes = resData;
        let resDataItem0 = resData && resData[0];
        this.alarmForm.type = resDataItem0.type;
        this.alarmForm.operator = resDataItem0.operators[0];
        this.operators = resDataItem0.operators;
        this.levels = resDataItem0.levels;
        this.alarmForm.levels = resDataItem0.levels[0];
        this.unit = resDataItem0.unit;
        if (this.dialog.status == "update") {
          let item = this.item;
          let alarmEmails = item && item.alarmEmails;
          alarmEmails = alarmEmails.toString();
          item.alarmEmails = alarmEmails;
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

          this.alarmForm = items;
        }
      });
    },

    changeType(type) {
      let typeList = this.icSupportAlarmTypes;
      let list =
        typeList &&
        typeList.length > 0 &&
        typeList.filter((item) => {
          return item.type == type;
        });
      let resDataItem0 = (list && list[0]) || null;
      this.alarmForm.type = resDataItem0.type || null;
      this.alarmForm.operator = resDataItem0.operators[0] || null;
      this.operators = resDataItem0.operators || null;
      this.levels = resDataItem0.levels || null;
      this.alarmForm.levels = resDataItem0.levels[0] || null;
      this.unit = resDataItem0.unit || null;
    },
    commitAlarmStrategy() {
      this.$refs.alarmForm.validate((valid) => {
        let alarmForm = this.alarmForm;
        // let emails = alarmForm && alarmForm.emails;
        // if (emails.indexOf(";") != -1 || emails.indexOf("；") != -1) {
        //   if (emails.indexOf(";")) {
        //     emails = emails.split(";");
        //   } else {
        //     emails = emails.split("；");
        //   }
        //   this.alarmForm.emails = emails;
        // } else {
        //   let emails = this.alarmForm.emails;
        //   if (emails && typeof emails == Object && emails.length > 0) {
        //     console.log(emails);
        //     this.alarmForm.emails = emails;
        //   } else {
        //     this.alarmForm.emails = [emails];
        //   }
        // }

        if (valid) {
          this.loading = true;

          addOrUpdate({ ...alarmForm })
            .then((res) => {
              let dialog = this.dialog;
              let status = dialog.status;
              let str = status == "create" ? "添加" : "修改";
              if (res && res.flag) {
                this.$message.success(`告警策略${str}成功`);
                this.alarmClose();
                this.loading = false;

                this.$emit("getList");
              } else {
                this.$message.error(`告警策略${str}失败`);
                this.loading = false;
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    queryAlarmConfigsByVmId() {
      getAlarmConfigsByVmId({ vmId: this.vmId }).then((res) => {
        if (res && res.flag) {
          let resData = res && res.resData;
          this.alarmConfigsList = resData;
        }
      });
    },

    handleDeleteAlarm(item) {
      const { vmId, alarmId } = item;
      deleteAlarmConfig({ alarmId }).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警策略删除成功");
          this.queryAlarmConfigsByVmId();
        } else {
          this.$message.error("告警策略删除失败");
        }
      });
    },
    updataAlarm(item) {
      addOrUpdate(item).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警策略修改成功");
          this.queryAlarmConfigsByVmId();
        } else {
          this.$message.error("告警策略修改失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input-edu {
  width: 500px;
}
.el-input1-edu {
  width: 170px;
}
.el-input2-edu {
  width: 70px;
}
.el-input-300 {
  width: 300px;
}
.el-input-150 {
  width: 150px;
}
.el-form-item-op {
  ::v-deep {
    .el-form-item__content {
      margin-left: 20px;
    }
  }
}
.el-dialog-edu {
  ::v-deep .el-dialog {
    width: 900px;
  }
}
.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }
  }
}
.el-form-item-edu {
  ::v-deep .el-form-item__label {
    width: 10px;
  }
}
.op-content {
  margin-left: 120px;
}
</style>
