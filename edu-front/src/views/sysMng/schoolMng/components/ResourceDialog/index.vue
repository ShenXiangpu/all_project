<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu1"
    @close="handleClose" :destroy-on-close="true">
    <el-form ref="form" class="el-form-edu1" :model="form" :rules="rules">
      <!-- <div class="font18 fontW7 marginBottom20">工具选择</div> -->
      <tools ref="tools" :ruleForm="form" @handleArchitecture="handleArchitecture"
        @handleCompanyName="handleCompanyName" @checkThisTools="checkThisTools" @reBackVmDetail="reBackVmDetail" />
      <!-- <div></div> -->
      <el-divider></el-divider>
      <exp-case @getIPAndPDK="getExp" ref="expCase" :ruleForm="form" />
      <el-divider></el-divider>
      <question @getIPAndPDK="getQues" ref="question" :ruleForm="form" />
      <el-divider></el-divider>
      <iP-and-pDK ref="ip" type="IP" @getIPAndPDK="getIP" :isShowText="false" :ruleForm="form" />
      <el-divider></el-divider>
      <iP-and-pDK ref="pdk" type="PDK" @getIPAndPDK="getPDK" :isShowText="false" :ruleForm="form" />
      <el-divider></el-divider>
      <lab ref="lab" type="LAB" @getIPAndPDK="getLab" :ruleForm="form" />
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
import Tools from "./Tools"
import IPAndPDK from "./IPAndPDK";
import ExpCase from "./ExpCase";
import Lab from "./Lab";
import Question from "./Question";
import { distributeResource, getUniDisDetail } from "@/api/edu/school";
export default {
  name: "ResourceDialog",
  props: {},
  components: {
    Tools,
    IPAndPDK,
    ExpCase,
    Lab,
    Question,
  },
  watch: {},
  data() {
    return {
      id: "",
      typeList: [
        '985', '211', '本科', '科研机构', '其他'
      ],
      isDestory: true,
      choosesEdaToolsList: [],
      form: {
        architecture: "X86",
        companyName: "",
        toolsList: [],
        tools: {},
        ipItemIds: [],
        pdkItemIds: [],
        trialIds: [],
        questionBankIds: [],
        labIds: [],
        universityId: "",
      },
      rules: {

      },
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "资源分配",
        create: "资源分配",
        look: "",
      },
      loading: false,
    };
  },
  created() {
  },
  methods: {
    queryUniDisDetail(id) {
      getUniDisDetail({ id }).then((res) => {
        if (res && res.flag) {
          console.log(res.resData);
          this.form = res.resData;
          //处理trials 数据 把 id 转成 trialId
          let trials = this.form.trials || [];
          trials = trials.map(item => {
            item.trialId = item.id;
            return item;
          })
          this.form.trials = trials;
          this.$refs["ip"].handleSelectionChange(this.form.ips || []);
          this.$refs["pdk"].handleSelectionChange(this.form.pdks || []);
          this.$refs["lab"].handleSelectionChange(this.form.labs || []);
          this.$refs.tools.queryCompanyToolsList();
        }
      });
    },

    handleIdsList(list = [], op = 'id') {
      let ids = [];
      list && list.length > 0 && list.forEach((item) => {
        ids.push(item[op]);
      });
      return ids;
    },
    getIP(itemList) {
      console.log("getIP", itemList);
      let ips = itemList;
      this.form.ipItemIds = this.handleIdsList(ips);
    },
    getPDK(itemList) {
      console.log("getPDK", itemList);
      let pdks = itemList;
      this.form.pdkItemIds = this.handleIdsList(pdks);
    },
    getLab(itemList) {
      console.log("getLab", itemList);
      let labList = itemList;
      this.form.labIds = this.handleIdsList(labList);
    },
    getExp(itemList, idStr = 'trialId') {
      console.log("getExp", itemList);
      let trailList = itemList;
      this.form.trialIds = this.handleIdsList(trailList, idStr);
    },
    getQues(itemList) {
      let quesList = itemList;
      this.form.questionBankIds = this.handleIdsList(quesList);
    },
    handleArchitecture(architecture) {
      console.log("handleArchitecture", architecture);
      this.form.architecture = architecture;
    },
    handleCompanyName(companyName) {
      this.form.companyName = companyName;
    },

    checkThisTools(tools, choosesEdaToolsList) {
      this.form.tools = tools;
      this.choosesEdaToolsList = choosesEdaToolsList;
      console.log(tools, choosesEdaToolsList);
    },

    reBackVmDetail(obj) {
      this.choosesEdaToolsList = JSON.parse(obj.tools)
    },
    submitUpload() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = {
            universityId: this.id,
            edaTools: this.form.tools,
            ipItemIds: this.form.ipItemIds,
            pdkItemIds: this.form.pdkItemIds,
            trialIds: this.form.trialIds,
            questionBankIds: this.form.questionBankIds,
            labIds: this.form.labIds,
          }
          this.loading = true;
          distributeResource(form).then((res) => {
            if (res && res.flag) {
              this.loading = false;
              this.$message.success("成功");
              this.$emit("queryList");
              this.handleClose();
            } else {
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleClose() {
      this.$refs["form"].resetFields();
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

.el-dialog-edu1 {
  ::v-deep {
    .el-dialog {
      width: 1500px !important;
    }

    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }

    .el-dialog {
      border-radius: 4px;

      .el-dialog__header {
        border-radius: 4px 4px 0 0;
        padding: 10px 20px;
        background-color: rgb(233, 233, 233);

        .el-dialog__title {
          color: #333;
        }

        .el-dialog__headerbtn {
          top: 12px;
        }
      }

      .el-button--primary {
        background: $common-color;
        border-color: $common-color;
      }
    }
  }
}

.el-form-edu1 {
  ::v-deep {
    .el-form-item__label {
      width: 80px;
    }

    .el-input-edu {
      width: 300px;
    }

    .el-form-item__error {
      margin-left: 80px;
    }

    .el-form-item__content {
      margin-left: 80px;
    }
  }

  .el-tag-edu {
    margin-left: 80px;
  }
}
</style>
