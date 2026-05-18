<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="厂商管理" name="first">
        <div v-if="activeName == 'first'">
          <vendor-mng ref="vendorMng" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="license列表" name="second">
        <div v-if="activeName == 'second'">
          <border-container
            class="marginBottom10 border-container"
            :height="15"
            :isShowTitle="false"
            :isBgShow="false"
          >
            <template #content>
              <div class="" style="padding: 20px 0 10px 10px">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                  <el-form-item label="服务器名" prop="keyword" class="server">
                    <el-input
                      v-model="queryParams.keyword"
                      placeholder="请输入服务器名称"
                      clearable
                      @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="厂商" prop="vendorId">
                    <el-select
                      v-model="queryParams.vendorId"
                      placeholder="请选择厂商"
                    >
                      <el-option
                        v-for="item in EDAVendorList"
                        :key="item.id"
                        :label="item.vendorName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="success"
                      class="editSuccess"
                      icon="el-icon-search"
                      @click="handleQuery"
                      >搜索</el-button
                    >
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      class="editPrimary"
                      icon="el-icon-refresh"
                      @click="resetQuery('queryFormRef')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </border-container>
          <el-card class="marginTop10">
            <template #header>
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd('license')"
                >新增</el-button
              >
            </template>
            <el-table :data="licensesList" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="licenseServerName"
                label="服务器名"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="vendorName"
                label="供应商名称"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="licenseServerHome"
                label="环境变量"
                min-width="250"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="licenseServerHostname"
                label="主机名"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="licenseServerIp"
                label="IP地址"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="licenseServerPort"
                label="license端口"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                align="center"
                min-width="180"
              >
                <template #default="scope">
                  <el-switch
                    class="switchStyle"
                    @change="
                      handleLicenseStatus(
                        scope.row.id,
                        scope.row.status == 1 ? 0 : 1
                      )
                    "
                    v-model="scope.row.status == 1"
                    active-text="启用"
                    inactive-text="停用"
                    active-color="#02C733"
                    inactive-color="#A6A6A6"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="创建时间"
                align="center"
                min-width="180"
              >
              </el-table-column>
              <el-table-column
                prop="description"
                label="备注"
                align="center"
                min-width="180"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                min-width="180"
                fixed="right"
              >
                <template #default="scope">
                  <el-button
                    size="small"
                    type="primary"
                    class="editPrimary"
                    @click.stop="handleUpdate(scope.row, 'license')"
                  >
                    修改
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popconfirm
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

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="searchQuery"
            />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工具列表" name="third">
        <div v-if="activeName == 'third'">
          <border-container
            ref="abc"
            class="marginBottom10 border-container"
            :height="15"
            :isShowTitle="false"
            :isBgShow="false"
          >
            <template #content>
              <div class="" style="padding: 20px 0 10px 10px">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                  <el-form-item label="工具名称" prop="keyword" class="server">
                    <el-input
                      v-model="queryParams.keyword"
                      placeholder="请输入工具名称"
                      clearable
                      @keyup.enter="handleQuery"
                    />
                  </el-form-item>
                  <el-form-item label="厂商" prop="vendorId">
                    <el-select
                      v-model="queryParams.vendorId"
                      placeholder="请选择厂商"
                    >
                      <el-option
                        v-for="item in EDAVendorList"
                        :key="item.id"
                        :label="item.vendorName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="success"
                      class="editSuccess"
                      icon="el-icon-search"
                      @click="handleQuery"
                      >搜索</el-button
                    >
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      class="editPrimary"
                      icon="el-icon-refresh"
                      @click="resetQuery('queryFormRef')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </border-container>
          <el-card class="marginTop10">
            <template #header>
              <div class="flex justify-between">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleAdd('工具')"
                  >新增</el-button
                >
              </div>
            </template>
            <el-table :data="toolsList" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="toolName"
                label="工具名"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="vendorName"
                label="厂商"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="toolArch"
                label="架构"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="openSource"
                label="是否开源"
                align="center"
              >
                <template #default="scope">
                  <div v-if="scope.row.openSource == '1'">是</div>
                  <div v-else>否</div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="工具状态" align="center">
                <template #default="scope">
                  <el-switch
                    class="switchStyle"
                    @change="
                      handleToolStatus(
                        scope.row.id,
                        scope.row.status == 1 ? 0 : 1
                      )
                    "
                    v-model="scope.row.status == 1"
                    active-text="启用"
                    inactive-text="停用"
                    active-color="#02C733"
                    inactive-color="#A6A6A6"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="supportMount"
                label="支持挂载方式"
                align="center"
              >
                <template #default="scope">
                  <div v-if="scope.row.supportMount == '1'">是</div>
                  <div v-else>否</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="useResourceType"
                label="占用资源类型"
                align="center"
              >
                <template #default="scope">
                  <div v-if="scope.row.useResourceType == '1'">CPU型</div>
                  <div v-if="scope.row.useResourceType == '2'">内存型</div>
                  <div v-if="scope.row.useResourceType == '3'">计算型</div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                min-width="180"
                fixed="right"
              >
                <template #default="scope">
                  <el-button
                    size="small"
                    type="success"
                    class="editSuccess"
                    v-if="scope.row.type != 'BUTTON'"
                    @click.stop="goToDetail(scope.row)"
                  >
                    版本管理
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    size="small"
                    type="primary"
                    class="editPrimary"
                    @click.stop="handleUpdate(scope.row, '工具')"
                  >
                    修改
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popconfirm
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

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="searchQuery"
            />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="textMap[dialog.status] + `${textValue}`"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog-tools"
    >
      <el-form
        class="license"
        v-if="textValue == 'license'"
        ref="form"
        :model="licenseForm"
        :rules="licenseRules"
      >
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="服务器名" prop="licenseServerName">
              <el-input
                placeholder="请输入服务器名称"
                class="el-form-input-edu"
                v-model="licenseForm.licenseServerName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="厂商" prop="vendorId">
              <el-select
                class="el-form-input-edu"
                v-model="licenseForm.vendorId"
                placeholder="请选择厂商"
              >
                <el-option
                  v-for="item in EDAVendorList"
                  :key="item.id"
                  :label="item.vendorName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="环境变量" prop="licenseServerHome">
              <el-input
                class="el-form-input-edu"
                placeholder="请输入环境变量"
                v-model="licenseForm.licenseServerHome"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="主机名" prop="licenseServerHostname">
              <el-input
                class="el-form-input-edu"
                placeholder="请输入主机名"
                v-model="licenseForm.licenseServerHostname"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="IP地址" prop="licenseServerIp">
              <el-input
                class="el-form-input-edu"
                placeholder="请输入IP地址"
                v-model="licenseForm.licenseServerIp"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="端口" prop="licenseServerPort">
              <el-input
                class="el-form-input-edu"
                placeholder="请输入端口"
                v-model="licenseForm.licenseServerPort"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="备注" prop="description">
              <el-input
                class="el-form-input-edu"
                :autosize="{ minRows: 4, maxRows: 6 }"
                type="textarea"
                v-model="licenseForm.description"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form
        class="tools"
        v-if="textValue == '工具'"
        ref="form"
        :model="toolsForm"
        :rules="toolsRules"
      >
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="工具名" prop="toolName">
              <el-input
                class="el-form-input-edu"
                v-model="toolsForm.toolName"
                placeholder="请输入工具名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="厂商" prop="toolVendor">
              <el-select
                class="el-form-input-edu"
                v-model="toolsForm.toolVendor"
                placeholder="请选择厂商"
              >
                <el-option
                  v-for="item in EDAVendorList"
                  :key="item.id"
                  :label="item.vendorName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="任务类型" prop="actionName">
                            <el-input v-model="form.courseName"></el-input>
                        </el-form-item>
                    </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="是否开源" prop="openSource">
              <el-radio-group
                class="el-form-input-edu"
                v-model="toolsForm.openSource"
                size="medium"
              >
                <el-radio-button label="1">是</el-radio-button>
                <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="是否支持挂载" prop="supportMount">
              <el-radio-group
                class="el-form-input-edu"
                v-model="toolsForm.supportMount"
                size="medium"
              >
                <el-radio-button label="1">是</el-radio-button>
                <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="占用资源类型" prop="useResourceType">
              <el-radio-group
                class="el-form-input-edu"
                v-model="toolsForm.useResourceType"
                size="medium"
              >
                <el-radio-button :label="1">CPU型</el-radio-button>
                <el-radio-button :label="2">内存型</el-radio-button>
                <el-radio-button :label="3">计算型</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="底层架构" prop="useResourceType">
              <el-radio-group
                class="el-form-input-edu"
                v-model="toolsForm.toolArch"
                size="medium"
              >
                <el-radio-button :label="`X86`">X86</el-radio-button>
                <el-radio-button :label="`ARM`">ARM</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm(textValue)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";

import {
  addTool,
  delTool,
  editTool,
  getEdaTools,
  getEdaVendor,
  changeStatus,
} from "@/api/edu/tool";
import {
  addLicenseServer,
  delLicenseServer,
  editLicenseServer,
  getLicenseServers,
  changeStatusLicenseServer,
} from "@/api/edu/license";

import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import VendorMng from "./components/VendorMng.vue";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    BorderContainer,
    VendorMng,
  },
  props: {},
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        keyword: "",
        vendorId: "",
      },
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",
      textMap: {
        update: `修改`,
        create: `添加`,
        // look: "查看告警推送规则",
      },
      loading: false,
      licenseForm: {
        licenseServerHome: "",
        licenseServerHostname: "",
        licenseServerIp: "",
        licenseServerName: "",
        licenseServerPort: "",
        vendorId: "",
        // vendorName: '',
        description: "",
      },
      licenseRules: {
        licenseServerHome: [
          {
            required: true,
            message: "请输入环境变量名称",
            trigger: "blur",
          },
          {
            pattern: /^[A-Z_][A-Z0-9_]*$/,
            message: "请按规则重新环境变量名称",
          },
        ],
        licenseServerHostname: [
          {
            required: true,
            message: "请输入主机",
            trigger: "blur",
          },
        ],
        licenseServerIp: [
          {
            required: true,
            message: "请输入IP地址",
            trigger: "blur",
          },
        ],
        licenseServerName: [
          {
            required: true,
            message: "请输入服务器名称",
            trigger: "blur",
          },
        ],
        licenseServerPort: [
          {
            required: true,
            message: "请输入所在宿主机端口",
            trigger: "blur",
          },
        ],
        vendorId: [
          {
            required: true,
            message: "请选择供应商",
            trigger: "blur",
          },
        ],
      },
      toolsForm: {
        toolName: "",
        toolVendor: "",
        openSource: "",
        toolArch: "",
        supportMount: "",
        useResourceType: "",
      },
      toolsRules: {
        toolName: [
          {
            required: true,
            message: "请输入工具名称",
            trigger: "blur",
          },
        ],
        toolVendor: [
          {
            required: true,
            message: "请选择厂商",
            trigger: "blur",
          },
        ],
        openSource: [
          {
            required: true,
            message: "请选择是否开源",
            trigger: "blur",
          },
        ],
        supportMount: [
          {
            required: true,
            message: "请选择是否支持挂载",
            trigger: "blur",
          },
        ],
        useResourceType: [
          {
            required: true,
            message: "请选择占用资源类型",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      tableData: [],
      EDAVendorList: [],
      toolsList: [],
      licensesList: [],
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    //修改工具状态
    async handleToolStatus(toolId, status) {
      let params = {
        toolId,
        status,
      };
      const res = await changeStatus(params);
      if (res && res.flag) {
        this.queryEdaTools();
        this.$message.success("修改成功");
      }
    },
    // 修改license状态
    async handleLicenseStatus(serverId, status) {
      let params = {
        serverId,
        status,
      };
      const res = await changeStatusLicenseServer(params);
      if (res && res.flag) {
        this.queryLicenseServers();
        this.$message.success("修改成功");
      }
    },
    //
    goToDetail(row) {
      const { id } = row;
      this.$router.push({ path: "versonMng", query: { id } });
      // router.push({ name: 'user', params: { userId: 123 }})
    },
    //开关
    async openOrClose(id, status) {
      let data = {
        userId: id,
        status: status,
      };
      // const res = await editUserStatus(data);
      // if (res && res.flag) {
      //     let resData = res.resData;
      //     if (resData) {
      //         this.$message({
      //             message: "修改成功！",
      //             type: "success"
      //         });
      //         this.getList();
      //     } else {
      //         this.$message.error("修改失败");
      //     }
      // }
    },
    //切换tabs
    handleClick(tab, event) {
      if (tab && tab.name == "first") {
        const vendorMng = this.$refs["vendorMng"];
        vendorMng && vendorMng.handleQuery();
      } else if (tab && tab.name == "second") {
        this.queryEDAVendorList();
        this.queryLicenseServers();
      } else {
        this.queryEDAVendorList();
        this.queryEdaTools();
      }
    },
    //获取工具列表
    async queryEdaTools() {
      this.loading = true;
      getEdaTools(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.toolsList = resData.result;
        this.total = resData.total;
        this.loading = false;
      });
    },

    //获取工具列表
    async queryLicenseServers() {
      this.loading = true;
      getLicenseServers(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.licensesList = resData.result;
        this.total = resData.total;
        this.loading = false;
      });
    },

    //获取EDA工具供应商列表
    async queryEDAVendorList() {
      const res = await getEdaVendor();
      this.EDAVendorList = res.resData;
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
      let activeName = this.activeName;
      if (activeName == "second") {
        this.queryLicenseServers();
      } else {
        this.queryEdaTools();
      }
    },
    getList() {
      this.loading = true;
      getPages(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.alarmPushList = resData.records;
        this.total = resData.total;
        this.loading = false;
      });
    },
    submitForm(textValue) {
      this.$refs["form"].validate((valid) => {
        if (textValue == "工具") {
          if (valid) {
            if (this.dialog.status == "update") {
              editTool(this.toolsForm).then((reponse) => {
                if (reponse && reponse.flag) {
                  this.dialog.visible = false;
                  this.$message.success("修改成功");
                  this.queryEdaTools();
                }
              });
            } else if (this.dialog.status == "create") {
              addTool(this.toolsForm).then((reponse) => {
                if (reponse && reponse.flag) {
                  this.dialog.visible = false;
                  this.$message.success("添加成功");
                  this.queryEdaTools();
                }
              });
            }
          }
        } else {
          if (valid) {
            if (this.dialog.status == "update") {
              editLicenseServer(this.licenseForm).then((reponse) => {
                if (reponse && reponse.flag) {
                  this.dialog.visible = false;
                  this.$message.success("修改成功");
                  this.queryLicenseServers();
                }
              });
            } else if (this.dialog.status == "create") {
              addLicenseServer(this.licenseForm).then((reponse) => {
                if (reponse && reponse.flag) {
                  this.dialog.visible = false;
                  this.$message.success("添加成功");
                  this.queryLicenseServers();
                }
              });
            }
          }
        }
      });
    },
    cancel() {
      let _this = this;
      _this.dialog.visible = false;
      // _this.dialog = dialog;
      _this.$refs["form"].resetFields();
    },
    handleQuery() {
      this.listQuery.page = 1;
      this.listQuery.params = this.queryParams;
      let activeName = this.activeName;
      if (activeName == "second") {
        this.queryLicenseServers();
      } else {
        this.queryEdaTools();
      }
    },
    //重置搜索条件
    resetQuery(formName) {
      this.listQuery.page = 1;
      this.listQuery.params = {};
      let activeName = this.activeName;
      if (activeName == "second") {
        this.queryLicenseServers();
      } else {
        this.queryEdaTools();
      }
      this.$refs[formName].resetFields();
    },
    handleAdd(value) {
      let _this = this;
      this.textValue = value;
      if (value == "license") {
        _this.licenseForm = {};
      } else {
        _this.toolsForm = {};
      }
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    handleUpdate(row, value) {
      let _this = this;
      this.textValue = value;
      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
      if (this.activeName == "second") {
        const {
          licenseServerHome,
          licenseServerHostname,
          licenseServerIp,
          licenseServerName,
          licenseServerPort,
          vendorId,
          description,
          id,
        } = row;

        let licenseForm = {
          licenseServerHome,
          licenseServerHostname,
          licenseServerIp,
          licenseServerName,
          licenseServerPort,
          vendorId,
          description,
          id,
        };

        _this.licenseForm = licenseForm;
        // _this.queryVendorName(vendorId)
      } else {
        _this.toolsForm = Object.assign({}, row);
      }
      //this.temp = Object.assign({}, row)
    },

    // queryVendorName(val) {
    //     let EDAVendorList = this.EDAVendorList
    //     EDAVendorList.map(item => {
    //         if (item.id == val) {
    //             this.licenseForm.vendorName = item.vendorName
    //             return
    //         }
    //     })
    // },

    async handleDelete(row) {
      console.log(row);
      const { id } = { ...row };
      if (this.activeName == "second" && this.textValue == "license") {
        const res = await delLicenseServer({ id });
        if (res && res.flag) {
          Message.success("删除成功");
          this.handleQuery({});
        }
      } else {
        const res = await delTool({ id });
        if (res && res.flag) {
          Message.success("删除成功");
          this.handleQuery({});
        }
      }
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    this.queryLicenseServers();
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .dialog-tools {
    .el-dialog {
      width: 1000px;
    }
  }

  .license {
    .el-form-item__label {
      width: 150px;
    }

    .el-form-input-edu {
      width: 300px;
    }

    .el-form-item__content {
      margin-left: 150px;
    }
  }

  .tools {
    .el-form-item__label {
      width: 140px;
    }

    .el-form-input-edu {
      width: 300px;
    }

    .el-form-item__content {
      margin-left: 140px;
    }
  }

  .server {
    .el-form-item__label {
      // width: 90px;
    }

    .el-form-item__content {
      // margin-left: 90px;
    }
  }
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

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
