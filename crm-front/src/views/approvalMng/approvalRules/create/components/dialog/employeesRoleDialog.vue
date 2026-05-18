<template>
  <el-dialog
    title="选择成员"
    :visible.sync="visibleDialog"
    width="600px"
    append-to-body
    class="promoter_person"
  >
    <div class="person_body clear">
      <div class="person_tree l">
        <!-- <input type="text" placeholder="搜索成员" v-model="searchVal" @input="getDebounceData($event,activeName)"> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组织架构" name="1"></el-tab-pane>
          <el-tab-pane label="角色列表" name="2"></el-tab-pane>
        </el-tabs>
        <p class="ellipsis tree_nav" v-if="activeName == 1 && !searchVal">
          <!-- <span @click="getDepartmentList(0)" class="ellipsis">天下</span> -->
          <span
            v-for="(item, index) in departments.titleDepartments"
            class="ellipsis"
            :key="index + 'a'"
            @click="getDepartmentList(item.id)"
            >{{ item.departmentName }}</span
          >
        </p>
        <selectBox :list="list" style="height: 360px" />
      </div>
      <selectResult :total="total" @del="delList" :list="resList" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="saveDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import selectBox from "../selectBox.vue";
import selectResult from "../selectResult.vue";
import mixins from "./mixins";
export default {
  components: { selectBox, selectResult },
  mixins: [mixins],
  props: ["visible", "data", "isDepartment"],
  watch: {
    visible(val) {
      this.visibleDialog = this.visible;
      if (val) {
        this.activeName = "1";
        this.getDepartmentList();
        this.searchVal = "";
        this.checkedEmployessList = this.data
          .filter((item) => item.type === 1)
          .map(({ name, targetId }) => ({
            employeeName: name,
            id: targetId,
          }));
      }
    },
    visibleDialog(val) {
      this.$emit("update:visible", val);
    },
  },
  computed: {
    total() {
      return (
        this.checkedEmployessList.length +
        this.checkedRoleList.length +
        this.checkedDepartmentList.length
      );
    },
    list() {
      if (this.activeName === "2") {
        return [
          {
            type: "role",
            not: false,
            data: this.roles,
            isActiveItem: (item) =>
              this.$func.toggleClass(this.checkedRoleList, item, "roleId"),
            change: (item) =>
              this.$func.toChecked(this.checkedRoleList, item, "roleId"),
          },
        ];
      } else {
        return [
          {
            isDepartment: this.isDepartment,
            type: "department",
            data: this.departments.childDepartments,
            isActive: (item) =>
              this.$func.toggleClass(this.checkedDepartmentList, item),
            change: (item) =>
              this.$func.toChecked(this.checkedDepartmentList, item),
            next: (item) => this.getDepartmentList(item.id),
          },
          {
            type: "employee",
            data: this.departments.employees,
            isActive: (item) =>
              this.$func.toggleClass(this.checkedEmployessList, item),
            change: (item) =>
              this.$func.toChecked(this.checkedEmployessList, item),
          },
        ];
      }
    },
    resList() {
      let data = [
        {
          type: "employee",
          data: this.checkedEmployessList,
          cancel: (item) =>
            this.$func.removeEle(this.checkedEmployessList, item),
        },
      ];
      return data;
    },
  },
  data() {
    return {
      checkedRoleList: [],
      checkedEmployessList: [],
      checkedDepartmentList: [],
    };
  },
  methods: {
    handleClick() {
      this.searchVal = "";
      this.conditionRoleSearchName = "";
      if (this.activeName == 1) {
        this.getDepartmentList();
      } else {
        this.getRoleList();
      }
    },
    saveDialog() {
      let checkedList = [...this.checkedEmployessList].map((item) => ({
        type: 1,
        targetId: item.id,
        name: item.employeeName,
      }));
      this.$emit("change", checkedList);
    },
    delList() {
      this.checkedEmployessList = [];
      this.checkedRoleList = [];
      this.checkedDepartmentList = [];
    },
  },
};
</script>

<style lang="scss">
.person_body {
  border: 1px solid #f5f5f5;
  height: 500px;
}
.tree_nav span {
  display: inline-block;
  padding-right: 10px;
  margin-right: 5px;
  max-width: 6em;
  color: #38adff;
  font-size: 12px;
  cursor: pointer;
  background: url(~@/assets/images/jiaojiao.png) no-repeat right center;
}
.tree_nav span:last-of-type {
  background: none;
}
.person_tree {
  padding: 10px 12px 0 8px;
  width: 280px;
  height: 100%;
  border-right: 1px solid #f5f5f5;
}
.person_tree input {
  padding-left: 22px;
  width: 210px;
  // height: 30px;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #d5dadf;
  background: url(~@/assets/images/list_search.png) no-repeat 10px center;
  background-size: 14px 14px;
  // margin-bottom: 14px;
}

.person_tree img {
  width: 14px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
