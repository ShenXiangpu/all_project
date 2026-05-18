<template>
  <div class="app-container">
    <el-button type="primary" class="marginBottom10" @click="addPromoter"
      >添加用户</el-button
    >

    <el-popover placement="top" trigger="hover">
      <div class="name-list">
        <el-tag
          closable
          @close="removeName(item)"
          size="mini"
          class="marginRight10"
          v-for="(item, index) in flowPermission"
        >
          {{ item.name }}
        </el-tag>
      </div>
      <span
        v-show="flowPermission && flowPermission.length"
        slot="reference"
        class="marginLeft10 font16 pointer primaryColorb"
        >{{ (flowPermission && flowPermission.length) || 0 }}人</span
      >
    </el-popover>
    <span
      @click="removeAll"
      v-show="flowPermission && flowPermission.length"
      class="marginLeft10 font16 pointer primaryColorb"
      >全部移除</span
    >
    <employees-dialog
      class="employees-dialog"
      :isDepartment="true"
      :visible.sync="promoterVisible"
      :data="checkedList"
      @change="surePromoter"
      :isCheckedBox="true"
    />
  </div>
</template>

<script>
import employeesDialog from "@/views/approvalMng/approvalRules/create/components/dialog/employeesDialog.vue";
export default {
  name: "ChooseUsersList",
  components: {
    employeesDialog,
  },
  created() {},
  computed: {
    //回显
    checkedList() {
        return this.flowPermission;
    },
  },
  data() {
    return {
      promoterVisible: false,
      flowPermission: [],
      list: [],
    };
  },
  methods: {
    addPromoter() {
      this.promoterVisible = true;
    },
    removeName(tag) {
      this.flowPermission.splice(this.flowPermission.indexOf(tag), 1);
      tag && this.list.splice(this.list.indexOf(tag.targetId), 1);
    },
    removeDialogList(flowPermission) {},
    surePromoter(data) {
      this.flowPermission = data;
      //获取data对象数组中的id，返回一个数组
      this.list =
        data &&
        data.length > 0 &&
        data.map((item) => {
          return item.targetId;
        });
      this.promoterVisible = false;
    },
    savePromoter() {
      this.setFlowPermission({
        value: this.flowPermission,
        flag: true,
        id: this.flowPermission1.id,
      });
      this.closeDrawer();
    },
    closeDrawer() {
      this.setPromoter(false);
    },
    removeAll() {
      this.flowPermission = [];
      this.list = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.employees-dialog {
  ::v-deep .person_body {
    border: 1px solid #f5f5f5;
    height: 500px;
  }

  ::v-deep .person_tree {
    padding: 10px 12px 0 8px;
    width: 280px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
  }
}
.name-list {
  max-width: 300px;
}
</style>
