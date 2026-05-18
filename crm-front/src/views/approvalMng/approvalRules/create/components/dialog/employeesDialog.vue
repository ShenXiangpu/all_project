<template>
  <el-dialog
    title="选择成员"
    :visible.sync="visibleDialog"
    append-to-body
    class="promoter_person"
  >
    <div class="person_body clear">
      <div class="person_tree l">
        <!-- <input
          type="text"
          class="person_tree-input"
          placeholder="搜索成员"
          v-model="searchVal"
          @input="getDebounceData($event)"
        /> -->
        <p v-if="!searchVal">
          <el-tree
            title="角色权限配置"
            ref="resourceRef"
            node-key="id"
            :show-checkbox="true"
            :check-strictly="isCheckedBox ? false : true"
            :data="menuList"
            :default-expand-all="true"
            :default-checked-keys="defaultCheckedKeys"
            :props="defaultProps"
            @check="handleRoleList"
          >
          </el-tree>
        </p>
      </div>
      <selectResult :total="total" @del="delList" :list="resList" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)" size="small"
        >取 消</el-button
      >
      <el-button
        type="primary"
        class="editPrimary"
        size="small"
        @click="saveDialog"
        >确 定</el-button
      >
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
  props: ["visible", "data", "isDepartment", "isCheckedBox"],
  watch: {
    visible(val) {
      this.visibleDialog = this.visible;
      if (val) {
        this.getDepartmentList();
        this.searchVal = "";
      }
    },
    visibleDialog(val) {
      this.$emit("update:visible", val);
    },
    checkedEmployessList(val) {
      this.defaultCheckedKeys = val.map((item) => item.id);
      this.$nextTick(() => {
        this.defaultCheckedKeys = val.map((item) => item.id);
      });
    },
    data(val) {
      val &&
        this.$nextTick(() => {
          this.checkedEmployessList = val.map((item) => {
            return {
              id: item.targetId,
              employeeName: item.name,
            };
          });
        });
    },
  },
  computed: {
    total() {
      return this.checkedEmployessList.length;
    },
    resList() {
      let data = [
        {
          type: "employee",
          data: this.checkedEmployessList,
          cancel: (item) => {
            this.$func.removeEle(this.checkedEmployessList, item);
            this.$nextTick(() => {
              let checkedList = this.checkedEmployessList.map((i) => {
                return i.id;
              });
              this.$refs.resourceRef.setCheckedNodes(checkedList);
            });
          },
        },
      ];
      return data;
    },
  },
  data() {
    return {
      checkedDepartmentList: [],
      checkedEmployessList: [],
      checkMenuKeys: [],
      noParentIdList: [],
      menuList: [],
      roles: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled", // 通过disabled来禁用父级节点
      },
    };
  },
  methods: {
    handleCheckChange(checkedNodes, checkedKeys) {
      console.log("选中的节点：", checkedNodes);
      console.log("选中的节点ID：", checkedKeys);
    },
    /**
     * 处理角色列表选择变化
     * 当选择菜单时获取菜单id，并根据选择状态更新相关数据
     * @param {Object} e - 触发事件的对象
     */
    handleRoleList(e) {
      console.log(e, "e");

      // 获取当前选中的菜单keys
      let checkMenuKeys = this.$refs.resourceRef.getCheckedKeys();
      // 如果不是复选框模式
      if (!this.isCheckedBox) {
        try {
          // 确保 this.$refs.resourceRef 存在
          if (!this.$refs.resourceRef) {
            throw new Error("resourceRef is not defined");
          }

          // 重置已选中节点
          this.$refs.resourceRef.setCheckedNodes([]);

          // 如果已选中菜单，重置为单选
          if (checkMenuKeys.length > 0 && e) {
            this.$refs.resourceRef.setCheckedNodes([e]);
          }

          // 获取当前选中的节点
          let checkedNodes = this.$refs.resourceRef.getCheckedNodes();

          // 检查是否有选中的节点
          if (checkedNodes.length > 0) {
            let nodesItem = checkedNodes[0];
            checkMenuKeys = [nodesItem.id];
          } else {
            checkMenuKeys = [];
          }
        } catch (error) {
          console.error("Error in setting or getting checked nodes:", error);
        }
      } else {
        // 复选框模式下，不做重置操作
      }

      // 更新选中的菜单keys
      this.checkMenuKeys = checkMenuKeys;

      // 过滤出新选中的菜单列表
      const newList = this.newMenuList;
      let checkList = newList.filter((item) => {
        return checkMenuKeys.indexOf(item.id) > -1;
      });

      // 更新选中的员工列表
      this.checkedEmployessList = checkList;
    },

    saveDialog() {
      let checkedList = [...this.checkedEmployessList].map((item) => ({
        type: 1,
        targetId: item.id,
        name: item.employeeName,
      }));
      console.log(checkedList);
      /**
       * [
       *   {
       *     type: 1, // 1:员工，3:部门
       *     targetId: 1, // 员工id，部门id
       *     name: '张三' // 员工姓名，部门名称
       *   },
       * ]
       */
      this.$emit("change", checkedList, this.checkMenuKeys);
    },
    delList() {
      this.checkedEmployessList = [];
      this.defaultCheckedKeys = [];
      this.$refs.resourceRef.setCheckedNodes([]);
    },
  },
};
</script>

<style lang="scss" scoped>
.promoter_person {
  ::v-deep .el-dialog {
    width: 600px;
  }
}
.l {
  float: left;
}
.person_tree {
  height: 500px;
  overflow-y: auto;
}
.el-checkbox__original {
  height: 22px !important;
  line-height: 22px !important;
}
// .person_body {
//   border: 1px solid #f5f5f5;
//   height: 500px;
// }
// .tree_nav span {
//   display: inline-block;
//   padding-right: 10px;
//   margin-right: 5px;
//   max-width: 6em;
//   color: #38adff;
//   font-size: 12px;
//   cursor: pointer;
//   background: url(~@/assets/images/jiaojiao.png) no-repeat right center;
// }
// .tree_nav span:last-of-type {
//   background: none;
// }

.person_tree-input {
  padding-left: 22px;
  width: 210px;
  height: 30px;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #d5dadf;
  background: url(~@/assets/images/list_search.png) no-repeat 10px center;
  background-size: 14px 14px;
  margin-bottom: 14px;
}
// .person_tree input {
//   padding-left: 22px;
//   width: 210px;
//   height: 30px;
//   font-size: 12px;
//   border-radius: 2px;
//   border: 1px solid #d5dadf;
//   background: url(~@/assets/images/list_search.png) no-repeat 10px center;
//   background-size: 14px 14px;
//   margin-bottom: 14px;
// }

// .person_tree img {
//   width: 14px;
//   vertical-align: middle;
//   margin-right: 5px;
// }
</style>
