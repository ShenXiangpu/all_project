<template>
  <el-table max-height="600" v-loading="loading" :data="orderList" @selection-change="handleSelectionChange"
    :row-key="rowKeyFunc" :tree-props="{ children: 'itemList', hasChildren: 'hasChildren' }"
    :row-class-name="rowClassNameFun" ref="table" @select-all="selectAllFun" @select="selectFun">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column :label="`${type}名称`" align="center" prop="name" min-width="180px" show-overflow-tooltip />
    <el-table-column label="版本名称" align="center" prop="version" min-width="180">
      <template #default="scope">
        {{ scope.row.version || "-----------" }}
      </template>
    </el-table-column>
    <el-table-column prop="universityName" label="所属高校" min-width="120" align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="供应商" align="center" min-width="120" prop="supplier" show-overflow-tooltip />
    <el-table-column label="工艺制程" align="center" min-width="80" prop="process">
      <template #default="scope"> {{ scope.row.process }}nm </template>
    </el-table-column>
    <el-table-column :label="`${type}大小`" align="center" width="200">
      <template #default="scope">
        <div v-if="scope.row.fileSize">
          {{ (Number(scope.row.fileSize) / 1024 / 1024).toFixed(2) + "MB" }}
        </div>
        <div v-else>{{ "-----------" }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ipOrPdkListOfDistributionBySu } from "@/api/edu/school";
export default {
  name: "DialogTable",
  props: {
    type: {
      type: String,
      default: "IP",
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectedIds: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {},
  created() { },
  mounted() {
    // 如果初始有数据，也设置默认选中
    if (this.tableData && this.tableData.length) {
      this.orderList = this.tableData;
      this.$nextTick(() => {
        this.setDefaultSelection();
      });
    }
  },
  watch: {
    selectedIds: {
      handler(val) {
        this.$nextTick(() => {
          this.setSelectedRows();
        });
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      idToRowMap: {},
      isFun: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 运单管理表格数据
      orderList: [],
      oneProductIsSelect: [],
      isFun: false,
      itemList: [],
    };
  },
  methods: {


    // 核心回显方法
    setSelectedRows() {
      if (!this.selectedIds.length) return;

      // 防止回显操作触发selection-change事件
      this.isFun = true; // 使用您已有的标志位

      // 遍历需要回显的ID列表
      this.selectedIds.forEach(id => {
        // 通过映射表找到对应的行数据
        const rowData = this.idToRowMap[id];
        if (rowData) {
          // 选中对应的行
          this.$refs.table.toggleRowSelection(rowData, true);
        }
      });

      // 回显完成后，恢复事件监听
      this.isFun = false;
    },
    // 查询列表
    async getList() {
      this.loading = true;
      const type = this.type;
      let op = type == "IP" ? 'ip' : 'pdk';
      const response = await ipOrPdkListOfDistributionBySu(op)
      this.orderList = response.resData;
      //这一步是为了将父和子之间有联系，给子定义一个taskId，将子的taskId和父的id一致
      this.orderList.forEach((item, index) => {
        if (item.itemList) {
          item.itemList.forEach((cItem, cIndex) => {
            cItem.taskId = item.id;
          });
        }
      });
      // 由于后端返回的数组id不唯一（父里的id和其中一个子的id一样），然后:row-key='id'里面的id要是唯一值，所以处理了一下，将父的id改变，将数组里面的id都唯一，当然，你可以跟后端商量一下，返回给你一个唯一值，这个处理代码就可以省略了
      this.orderList = this.orderList.map((item, index) => {
        return {
          ...item,
          uuid: `${index}-${this.guid()}`,
        };
      });

      // this.buildIdMap(this.orderList);
      this.loading = false; // 遮罩层
      this.initData(this.orderList);



      // 添加：在数据渲染后设置默认选中状态
      this.$nextTick(() => {
        this.setDefaultSelection();
      });
    },

    // 递归构建ID映射表，处理嵌套数据
    buildIdMap(dataList) {
      dataList.forEach(item => {
        // 以业务id为键，行数据为值存储
        if (item.id) {
          this.idToRowMap[item.id] = item;
        }
        // 递归处理子项目
        if (item.itemList && item.itemList.length) {
          this.buildIdMap(item.itemList);
        }
      });
    },


    // 新增方法：设置默认选中
    setDefaultSelection() {
      this.orderList.forEach((item) => {
        if (item.isSelect) {
          this.$refs.table.toggleRowSelection(item, true);
        }
        // 处理子项
        if (item.itemList && item.itemList.length) {
          item.itemList.forEach((child) => {
            if (child.isSelect) {
              this.$refs.table.toggleRowSelection(child, true);
            }
          });
        }
      });
    },


    //生成唯一ID
    guid() {
      return Number(
        Math.random().toString().substr(3, 3) + Date.now()
      ).toString(36);
    },
    //row-key唯一值
    rowKeyFunc(row) {
      if (row.uuid) {
        return row.uuid;
      } else {
        return row.id;
      }
    },
    //初始化数据,将数据都用isSelect标记一下，isSelect为false不选中、true选中、half半选
    initData(data) {
      data.forEach((item) => {
        item.isSelect = false; //默认为不选中
        if (item.itemList && item.itemList.length) {
          this.initData(item.itemList);
        }
      });
    },
    // 判断是不是全选
    checkIsAllSelect() {
      this.oneProductIsSelect = [];
      this.orderList.forEach((item) => {
        this.oneProductIsSelect.push(item.isSelect);
      });
      //判断一级产品是否是全选.如果一级产品全为true，则设置为取消全选，否则全选
      let isAllSelect = this.oneProductIsSelect.every((selectStatusItem) => {
        return true == selectStatusItem;
      });
      return isAllSelect;
    },
    // 全选或者全不选（这个是祖父的勾选）
    selectAllFun(selection) {
      let isAllSelect = this.checkIsAllSelect();
      this.orderList.forEach((item) => {
        item.isSelect = isAllSelect;
        this.$refs.table.toggleRowSelection(item, !isAllSelect);
        this.selectFun(selection, item);
      });
    },
    selectFun(selection, row) {
      this.setRowIsSelect(row);
    },
    setRowIsSelect(row) {
      //当点击父级点复选框时，当前的状态可能为未知状态，所以当前行状态设为false并选中，即可实现子级点全选效果
      // if (row.isSelect == "half") {
      //   row.isSelect = false;
      //   this.$refs.table.toggleRowSelection(row, true);
      // }
      row.isSelect = !row.isSelect;
      //判断操作的是子级点复选框还是父级点复选框，如果是父级点，则控制子级点的全选和不全选
      // if (row.itemList && row.itemList.length > 0) {
      //   row.itemList.forEach((item) => {
      //     item.isSelect = row.isSelect;
      //     this.$refs.table.toggleRowSelection(item, row.isSelect);
      //   });
      // } else {
      //   //操作的是子节点  1、获取父节点  2、判断子节点选中个数，如果全部选中则父节点设为选中状态，如果都不选中，则为不选中状态，如果部分选择，则设为不明确状态
      //   let parentId = row.taskId;
      //   this.orderList.forEach((item) => {
      //     let isAllSelect = [];
      //     if (item.id == parentId) {
      //       if (item.itemList) {
      //         item.itemList.forEach((databaseSourceListItem) => {
      //           isAllSelect.push(databaseSourceListItem.isSelect);
      //         });
      //       }
      //       if (
      //         isAllSelect.every((selectItem) => {
      //           return true == selectItem;
      //         })
      //       ) {
      //         item.isSelect = true;
      //         this.$refs.table.toggleRowSelection(item, true);
      //       } else if (
      //         isAllSelect.every((selectItem) => {
      //           return false == selectItem;
      //         })
      //       ) {
      //         item.isSelect = false;
      //         this.$refs.table.toggleRowSelection(item, false);
      //       } else {
      //         item.isSelect = "half";
      //       }
      //     }
      //   });
      //   console.log("this.orderList", this.orderList);
      // }


      // 父节点操作：同步子节点
      if (row.itemList && row.itemList.length > 0) {
        const shouldSelect = row.isSelect;
        row.itemList.forEach((item) => {
          item.isSelect = shouldSelect;
          this.$refs.table.toggleRowSelection(item, shouldSelect);
        });
      } else {
        // 子节点操作：更新父节点状态
        this.updateParentSelection(row);
      }
    },
    // 提取父节点更新逻辑
    updateParentSelection(childRow) {
      const parentId = childRow.taskId;
      const parent = this.orderList.find(item => item.id === parentId);
      if (!parent || !parent.itemList) return;

      const childSelections = parent.itemList.map(child => child.isSelect);
      const allSelected = childSelections.every(selected => selected);
      const noneSelected = childSelections.every(selected => !selected);

      if (allSelected) {
        parent.isSelect = true;
        this.$refs.table.toggleRowSelection(parent, true);
      } else if (noneSelected) {
        parent.isSelect = false;
        this.$refs.table.toggleRowSelection(parent, false);
      } else {
        parent.isSelect = "half";
        // 半选状态需要特殊处理选中状态
        this.$refs.table.toggleRowSelection(parent, false);
      }
    },

    rowClassNameFun({ row }) {
      if (row.isSelect == "half") {
        return "indeterminate";
      }
    },

    // 多选框选中数据
    handleSelectionChange: _.throttle(function (selection) {
      if (this.isFun) return;
      let ids = [];
      let itemList = [];
      selection.forEach((node) => {
        if (node.isSelect == true || node.isSelect == "half") {
          //如果上来勾选了
          console.log("node", node);
          if (node.itemList && node.itemList.length > 0) {
            //判断是否有子元素,如果有子，遍历子
            node.itemList.forEach((child) => {
              console.log("child", child);
              if (child.isSelect) {
                //把itemlist装进去
                itemList.push(child);
              }
            });
          } else {
            itemList.push(node);
          }
        } else {
          console.log("取消");
        }
      });

      this.ids = ids;
      this.single = this.ids.length !== 1;
      this.multiple = !this.ids.length;
      const setArr = Array.from(new Set(itemList));
      console.log("setArr", setArr);
      this.itemList = setArr;
      this.$emit("handleSelectionChange", this.itemList);
    }, 100, { leading: true, trailing: true }),



    // 添加状态同步方法
    syncSelectionStates() {
      const currentSelections = this.$refs.table.selection;
      currentSelections.forEach(selectedRow => {
        const foundRow = this.findRowInData(selectedRow);
        if (foundRow) {
          foundRow.isSelect = true;
        }
      });
    },

    // 辅助方法：在数据树中查找行
    findRowInData(targetRow, data = this.orderList) {
      for (let item of data) {
        if (item.uuid === targetRow.uuid || item.id === targetRow.id) {
          return item;
        }
        if (item.itemList && item.itemList.length) {
          const found = this.findRowInData(targetRow, item.itemList);
          if (found) return found;
        }
      }
      return null;
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .indeterminate {
    .el-table-column--selection .cell .el-checkbox {
      display: block !important;
    }

    .el-checkbox__input .el-checkbox__inner {
      background-color: #10abb9 !important;
      border-color: #10abb9 !important;
      color: #fff !important;
    }
  }
}

::v-deep {
  .indeterminate .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: scale(0.5);
  }
}

::v-deep {
  .indeterminate .el-checkbox__input .el-checkbox__inner::after {
    border-color: #c0c4cc !important;
    background-color: #c0c4cc;
  }
}

::v-deep {
  .indeterminate .el-checkbox__input .el-checkbox__inner::after {
    content: "";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    transform: scale(0.5);
    left: 0;
    right: 0;
    top: 5px;
    width: auto !important;
  }
}

::v-deep {
  .el-table__row--level-1 {
    .el-table-column--selection {
      .cell {
        padding-left: 30px;
        padding-right: 0px;
      }
    }
  }
}
</style>
