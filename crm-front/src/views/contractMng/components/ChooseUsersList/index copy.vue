<template>
  <div class="app-container">
    <el-button type="primary" class="marginBottom10" @click="addPromoter"
      >测试</el-button
    >


    
    <span v-if="flowPermission && flowPermission.length" class="marginLeft10"
      >{{ (flowPermission && flowPermission.length) || 0 }}人</span
    >
    <div class="" style="max-width: 300px">
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
  data() {
    return {
      promoterVisible: false,
      checkedList: [],
      flowPermission: [],
      list: [],
    };
  },
  methods: {
    addPromoter() {
      this.promoterVisible = true;
      //   this.checkedList = [{ targetId: 11385, employeeName: "超管" }];//回显
      console.log(this.checkedList);
    },
    removeName(tag) {
      this.flowPermission.splice(this.flowPermission.indexOf(tag), 1);
      tag && this.list.splice(this.list.indexOf(tag.targetId), 1);
    },
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
</style>
