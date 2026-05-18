<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
    @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules">
      <div class="marginBottom20 font16 fontW7">
        <span class="primaryColoro">*</span> 基本信息
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客户名称" prop="customerName">
            <el-input class="el-input-edu" placeholder="请输入客户名称" v-model="form.customerName" maxlength="40"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系人" prop="linkName">
            <el-input class="el-input-edu" placeholder="请输入联系人" v-model="form.linkName" maxlength="10"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系方式" prop="linkPhone">
            <el-input class="el-input-edu" placeholder="请输入联系方式" v-model="form.linkPhone" maxlength="40"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <company-type className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="所属地区" prop="location">
            <el-cascader size="large" class="el-input-edu" :options="options" v-model="form.location"
              @change="handleSelectChange">
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="详细地址" prop="fullAddress">
            <el-input class="el-input-edu" placeholder="请输入详细地址" v-model="form.fullAddress" maxlength="100"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <customer-source className="el-input-edu" :form="form" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟踪人" prop="trackUserId">
            <el-select class="el-input-edu" v-model="form.trackUserId" placeholder="请选择跟踪人" filterable remote
              reserve-keywords :remote-method="querySearchTrackAsync" :loading="selectLoading"
              @focus="querySearchTrackAsync('')" :maxlength="40" show-word-limit>
              <el-option v-for="item in restaurants" :key="item.id" :label="item.userName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="公司介绍" prop="remark">
            <el-input class="el-input-edu" type="textarea" :rows="6" v-model="form.remark" maxlength="500"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
import { addOne, editOne } from "@/api/crm/customMng";
import { getAllUserSelect } from "@/api/crm/user";
import { pcTextArr } from "element-china-area-data";

import CompanyType from "@/views/clueMng/components/FormItem/CompanyType.vue";
import CustomerSource from "@/views/clueMng/components/FormItem/CustomerSource.vue";
import CustomerType from "@/views/clueMng/components/FormItem/CustomerType.vue";
import CooperationArea from "@/views/clueMng/components/FormItem/CooperationArea.vue";
import { cloneDeep } from "lodash";

export default {
  name: "AddDialog",
  props: {
    bigType: {
      type: String | Number,
      default: "" | 0,
    },
  },
  components: {
    CompanyType,
    CustomerSource,
    CustomerType,
    CooperationArea,
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  watch: {},
  data() {
    return {
      options: pcTextArr,
      selectedOptions: [],
      isDestory: true,
      form: {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerSourceId: "",
        location: [],
        fullAddress: "",
        remark: "",
        trackUserId: "",
      },
      fileInfo: {},
      rules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        linkName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        linkPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        companyTypeId: [
          { required: true, message: "请选择单位类型", trigger: "change" },
        ],
        location: [{ required: true, message: "请选择地区", trigger: "blur" }],
        fullAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        consumerSourceId: [
          { required: true, message: "请选择客户来源", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入公司介绍", trigger: "blur" },
        ],
        trackUserId: [
          { required: true, message: "请输入跟踪人", trigger: "change" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改客户信息",
        create: "创建客户",
        look: "",
      },
      tags: [],
      testInput: "",
      loading: false,
      restaurants: [],
      selectLoading: false,
    };
  },
  // destroyed() {
  //   this.$refs["form"].resetFields();
  // },
  mounted() {
    this.querySearchTrackAsync("");
  },
  methods: {


    async querySearchTrackAsync(queryString = "") {
      // this.listQuery.params.customerName = queryString;
      this.selectLoading = true;
      const res = await getAllUserSelect({ userName: queryString });
      let restaurants = [];
      if (res && res.flag) {
        let resData = res.resData;
        resData.map((item) => {
          item.value = item.userName;
          item.id = item.id;
        });
        restaurants = resData;
      } else {
        restaurants = [];
      }
      this.restaurants = restaurants;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.selectLoading = false;
      }, 100 * Math.random());
    },

    createStateFilter(queryString) {
      return (state) => {
        let value = state.value;
        return value.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
      };
    },
    handleSelect(item) {
      this.form.trackUserId = item.id;
    },



    handleSpace: debounce(function (val) {
      if (!this.testInput) {
        this.$message.error("请输入内容！");
        return;
      }
      this.tags.push(this.testInput);
      this.testInput = "";
    }, 200),
    handleCloseTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleSelectChange(value) { },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
      let form = {
        customerName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerTypeId: "",
        consumerSourceId: "",
        cooperationAreaId: "",
        location: [],
        fullAddress: "",
        remark: "",
      };
      this.form = form;
    },
    // 删除文件
    closeAndDelFile() {
      this.form.fileSize = "";
      this.form.displayName = "";
      this.fileInfo = {};
      this.waitUploadFileList = [];
      this.md5List = [];
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = cloneDeep(this.form);
          if (form.location) {
            form.location = this.form.location.join(",");
          }
          this.loading = true;
          const handleResponse = (res) => {
            if (res && res.flag) {
              this.$message.success(
                this.dialog.status === "create" ? "添加成功" : "修改成功"
              );
              this.handleClose();
              this.$emit("queryList");
            }
            this.loading = false; // 在这里统一设置 loading 为 false
          };

          const handleError = () => {
            this.$message.error("操作失败，请重试！");
            this.loading = false;
          };

          if (this.dialog.status == "create") {
            addOne(form).then(handleResponse).catch(handleError);
          } else {
            editOne(form).then(handleResponse).catch(handleError);
          }
        } else {
          this.$message.error("请完善信息！");
          return;
        }
      });
    },
    handleRemove() { },
    handleClose() {
      this.$refs["form"].resetFields();
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 1000px;
    }

    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }

    .el-input-edu {
      width: 300px;
    }

    .el-form-item__error {
      margin-left: 120px;
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }

  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
