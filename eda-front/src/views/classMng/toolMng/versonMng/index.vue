<template>
  <div class="app-container">
    <el-card class="marginTop10">
      <template #header v-if="checkPermission(['tool:addToolVersion'])">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd()"
          >新增</el-button
        >
      </template>
      <el-table :data="toolVersionList" style="width: 100%">
        <el-table-column type="index" label="序号" width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="toolVersion"
          label="工具版本"
          min-width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="环境变量" width="180" align="center">
          <template #default="scope">
            <el-button
              :disabled="!checkPermission(['tool:queryToolEnvList'])"
              size="small"
              type="success"
              class="editSuccess"
              @click.stop="lookDetail(scope.row)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="
            checkPermission(['tool:editToolVersion', 'tool:deleteToolVersion'])
          "
          label="操作"
          align="center"
          min-width="180"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              v-permission="['tool:editToolVersion']"
              size="small"
              type="primary"
              class="editPrimary"
              @click.stop="handleUpdate(scope.row, '工具')"
            >
              修改
            </el-button>
            <el-divider
              v-if="
                checkPermission(['tool:editToolVersion']) &&
                checkPermission(['tool:delToolVersion'])
              "
              direction="vertical"
            ></el-divider>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                v-permission="['tool:delToolVersion']"
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

      <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="searchQuery" /> -->
    </el-card>

    <el-dialog
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog1"
    >
      <el-form
        ref="toolVersionForm"
        :model="toolVersionForm"
        :rules="toolVersionRules"
        class="version"
      >
        <el-row>
          <el-col
            v-if="textMap[dialog.status] !== '查看'"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24"
          >
            <el-form-item label="工具版本" prop="toolVersion">
              <el-input
                class="el-form-input-edu"
                v-model="toolVersionForm.toolVersion"
                placeholder="请输入工具版本"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="环境变量" prop="environments">
              <el-table
                :data="toolVersionForm.environments"
                height="300px"
                border
                class="el-table-edu el-form-input-edu"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="55"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="variableName"
                  label="变量名"
                  min-width="100"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="variableValue"
                  label="变量值"
                  min-width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  v-if="textMap[dialog.status] !== '查看'"
                  fixed="right"
                  label="操作"
                  align="center"
                >
                  <template #default="scope">
                    <el-popconfirm
                      title="确定删除吗？"
                      @onConfirm="handleDeleteVersion(scope)"
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
            </el-form-item>
          </el-col>
          <el-col
            v-if="textMap[dialog.status] !== '查看'"
            style="margin: 0 auto; text-align: center"
          >
            <el-button type="primary" @click="handleAdd1"
              >添加环境变量</el-button
            >
          </el-col>
        </el-row>
      </el-form>

      <span
        v-if="textMap[dialog.status] !== '查看'"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="textMap1[dialog.status]"
      :visible.sync="dialog1.visible"
      @close="cancel1"
      class="dialog"
    >
      <el-form
        ref="envForm"
        class="versions"
        :model="envForm"
        :rules="envFormRules"
      >
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="24">
            <el-form-item label="变量名" prop="variableName1">
              <el-input
                class="el-form-input-edu"
                v-model="envForm.variableName1"
                placeholder="请输入变量名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="变量值" prop="variableValue1">
              <el-input
                class="el-form-input-edu"
                v-model="envForm.variableValue1"
                placeholder="请输入变量值"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="submitForm1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import {
  addToolVersion,
  editToolVersion,
  delToolVersion,
  queryToolEnvList,
  queryToolVersionList,
} from "@/api/edu/tool";
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";

const textValue = "lisence";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
  },
  props: {},
  data() {
    return {
      checkPermission,
      toolId: "",
      dialog: {
        visible: false,
        status: "",
      },

      dialog1: {
        visible: false,
        status: "",
      },
      textValue: "",
      textMap: {
        update: `修改`,
        create: `添加`,
        look: "查看",
        // look: "查看告警推送规则",
      },

      textMap1: {
        update: `修改`,
        create: `添加`,
        // look: "查看告警推送规则",
      },
      loading: false,
      envForm: {
        variableName1: "",
        variableValue1: "",
      },
      envFormRules: {
        variableName1: [
          {
            required: true,
            message: "请输入变量名",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
            message: "请按规则重新环境变量名称",
          },
        ],
        variableValue1: [
          {
            required: true,
            message: "请输入变量值",
            trigger: "blur",
          },
        ],
      },
      toolVersionRules: {},
      toolVersionForm: {
        environments: [],
        toolVersion: "",
      },
      toolVersionRules: {
        toolVersion: [
          {
            required: true,
            message: "请输入工具版本",
            trigger: "blur",
          },
        ],
        environments: [
          {
            required: true,
            message: "请添加环境变量",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      environmentsList: [],
      toolVersionList: [],
    };
  },
  watch: {},
  computed: {},
  created() {
    const id = this.$route.query.id;
    this.toolId = id;
    this.initParams();
    this.getList();
  },
  methods: {
    //删除
    handleDeleteVersion(row) {
      let environments = this.toolVersionForm.environments;
      for (let index = 0; index < environments.length; index++) {
        if (row.$index == index) {
          environments.splice(index, 1);
          this.toolVersionForm.environments = environments;
          break;
        }
      }
    },
    //修改课程
    updataCourse() {
      let _this = this;

      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
    },

    async lookDetail(row) {
      const { id } = row;
      const res = await queryToolEnvList({ id });
      this.toolVersionForm.environments = res.resData;
      let dialog = {
        status: "look",
        visible: true,
      };
      this.dialog = dialog;
    },

    initParams() {
      let listQuery = {
        toolId: this.toolId,
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
      queryToolVersionList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.toolVersionList = resData;
        this.loading = false;
      });
    },
    submitForm() {
      this.toolVersionForm.toolId = this.toolId;
      this.$refs["toolVersionForm"].validate((valid) => {
        if (valid) {
          if (this.dialog.status == "create") {
            addToolVersion(this.toolVersionForm).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("添加成功");
                this.getList();
              }
            });
          } else {
            editToolVersion(this.toolVersionForm).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("修改成功");
                this.getList();
              }
            });
          }
        }
      });
    },
    submitForm1() {
      this.$refs["envForm"].validate((valid) => {
        if (valid) {
          const { variableName1, variableValue1 } = this.envForm;
          let item = {
            variableName: variableName1,
            variableValue: variableValue1,
          };

          this.toolVersionForm.environments.push(item);
          this.dialog1.visible = false;
          this.$message.success("环境变量添加成功");
          this.$refs.envForm.resetFields();
        }
      });
    },
    cancel() {
      let _this = this;
      _this.$refs.toolVersionForm.resetFields();
      _this.dialog.visible = false;
    },

    cancel1() {
      let _this = this;
      _this.dialog1.visible = false;
      _this.$refs.envForm.resetFields();
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
    handleAdd() {
      let _this = this;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
      _this.toolVersionForm = {
        environments: [],
        toolVersion: "",
      };
    },

    handleAdd1() {
      let _this = this;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog1 = dialog;
      // _this.toolVersionForm.environments = []
    },

    async handleUpdate(row) {
      let _this = this;
      const res = await queryToolEnvList({ id: row.id });
      this.toolVersionForm.environments = res.resData;
      const { toolVersion, id } = row;
      _this.toolVersionForm.toolVersion = toolVersion;
      _this.toolVersionForm.id = id;
      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
      //this.temp = Object.assign({}, row)
    },

    async handleDelete(row) {
      console.log(row);
      const { id } = { ...row };
      const res = await delToolVersion({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.getList();
      }
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style lang='scss' scoped>
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

::v-deep {
  .dialog1 {
    .el-dialog {
      width: 800px;
    }
  }

  .version {
    .el-form-item__label {
      width: 100px;
    }

    .el-form-item__content {
      margin-left: 100px;
    }

    .el-form-input-edu {
      width: 600px;
    }

    .el-table-edu {
      .el-table {
        height: 300px;
      }
    }
  }
}

.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
      width: 500px;
    }

    // .el-dialog__footer {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 0px
    // }

    .versions {
      .el-form-item__label {
        width: 100px;
      }

      .el-form-item__content {
        margin-left: 100px;
      }

      .el-form-input-edu {
        width: 300px;
      }
    }
  }

  &-form {
    width: 50%;
  }
}

.dialog-form {
  width: 100%;
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
    