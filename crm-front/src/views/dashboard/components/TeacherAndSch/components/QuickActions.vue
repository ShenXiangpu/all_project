<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span>快捷操作</span>
    </div>
    <el-row
      :gutter="10"
      style="height: 238px; margin-top: 20px"
      class="marginTop20"
    >
      <el-col
        :xs="8"
        :sm="6"
        :md="4"
        :lg="12"
        :xl="12"
        style="margin-top: 20px"
        class="marginBottom20 marginTop20"
      >
        <div
          class="flex flex-column align-center pointer"
          @click="handleAddClue"
        >
          <div class="qaItemContainer primaryBgColorb primaryColorw">
            添加线索
          </div>
        </div>
      </el-col>

      <el-col
        :xs="8"
        :sm="6"
        :md="4"
        :lg="12"
        :xl="12"
        style="margin-top: 20px"
        class="marginBottom20 marginTop20"
      >
        <div
          class="flex flex-column align-center pointer"
          @click="handleAddContract"
        >
          <div class="qaItemContainer primaryBgColoro primaryColorw">
            添加合同
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12"  style="margin-top: 20px">
        <div
          class="flex flex-column align-center pointer"
          @click="handleAddCustom"
        >
          <div class="qaItemContainer primaryBgColory primaryColorw">
            添加客户
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12"  style="margin-top: 20px">
        <div
          class="flex flex-column align-center pointer"
          @click="handleAddUser"
        >
          <div class="qaItemContainer primaryBgColorp primaryColorw">
            添加用户
          </div>
        </div>
      </el-col>
    </el-row>
    <add-clue-dialog ref="addClueDialog"></add-clue-dialog>
    <add-contract-dialog ref="addContractDialog"></add-contract-dialog>
    <add-custom-dialog ref="addCustomDialog"></add-custom-dialog>
    <add-user-dialog ref="addUserDialog"></add-user-dialog>
  </el-card>
</template>

<script>
import AddClueDialog from "@/views/clueMng/HighSeasResources/components/AddDialog.vue";
import AddContractDialog from "@/views/contractMng/components/AddCustomDialog.vue";
import AddCustomDialog from "@/views/customMng/customerInfo/components/AddDialog.vue";
import AddUserDialog from "@/views/sysMng/usersMng/components/InternalUsers/components/AddDialog.vue";
export default {
  name: "",
  components: {
    AddClueDialog,
    AddContractDialog,
    AddCustomDialog,
    AddUserDialog,
  },
  created() {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    handleAddClue() {
      const ip = this.$refs["addClueDialog"];
      ip.handleOpen("create");
      let form = {
        clueName: "",
        linkName: "",
        linkPhone: "",
        companyTypeId: "",
        consumerIntentionId: "",
        consumerLevelId: "",
        consumerSourceId: "",
        followUpStatusId: "",
        nextFollowUpDate: "",
        location: "",
        fullAddress: "",
        customerLabel: "",
        remark: "",
        cooperationAreaId:"",
      };
      ip.form = form;
    },
    handleAddContract() {
      const custom = this.$refs["addContractDialog"];
      custom.initForm();
      custom.handleOpen();
    },
    handleAddCustom() {
      const ip = this.$refs["addCustomDialog"];
      ip.handleOpen();
    },
    handleAddUser() {
      const ip = this.$refs["addUserDialog"];
      let dialog = {
        status: "create",
        visible: true,
      };
      ip.dialog = dialog;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1600px) {
  .qaItemContainer {
    width: 80%;
    font-size: 22px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    border-radius: 10px;
  }
}
::v-deep {
  .dialog-jobs {
    .el-dialog {
      // width: 600px;
    }

    // .el-form-item__label {
    //     width: 150px;
    // }

    // .el-form-item__content {
    //     margin-left: 150px;
    // }

    .el-form-input-edu {
      width: 500px;
    }
  }
}
.form-container {
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 6px;
}

.qaItemContainer {
  width: 80%;
  font-size: 20px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
}
.el-card-eda {
  min-height: 288px;
}
.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
      width: 1300px;
    }

    .el-dialog__footer {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }

  &-form {
    width: 50%;
  }
}
</style>
