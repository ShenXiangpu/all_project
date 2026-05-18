<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="openFileDialog"
            >添加联系人</el-button
          >
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column
        prop="linkName"
        label="联系人"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="linkPhone"
        label="联系电话"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.linkPhone" placement="top-start">
              <div type="text">{{ formatterPhone(scope.row) }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="wechat"
        label="微信号"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="post"
        label="职务"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="ofRuler"
        label="关键决策人"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="230"
      >
        <template #default="scope">
          <div>
            <el-button
              type="danger"
              class="editDanger"
              size="mini"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
            >

            <!-- <el-button size="mini" @click="handleDelete(scope.row)" type="warning" class="editWarning">
                删除
              </el-button> -->

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="mini"
                type="warning"
                class="editWarning marginLeft10"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="addDialog" @queryList="queryList" />
  </el-card>
</template>
<script>
import AddDialog from "./AddDialog";
import { oneDetail, deleteOne } from "@/api/crm/supplier";
export default {
  name: "mytable",
  props: {
    customerId: {
      type: String | Number,
      default: "",
    },
  },
  watch: {
    customerId: {
      handler(val) {
        if (val) {
          this.getList(val);
        }
      },
      immediate: true,
    },
  },
  components: { AddDialog },
  created() {},
  computed: {},
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  methods: {
    formatterPhone(row) {
      let str = row.linkPhone;
      // 匹配手机号（11 位数字）
      const mobilePattern = /^(\d{3})\d{4}(\d{4})$/;
      // 匹配座机号（带区号或不带区号的格式）
      const landlinePattern = /^(?:\d{3,4}[-\s]?)?(\d{3})\d{4}(\d{4})$/;

      // 如果是手机号
      if (mobilePattern.test(str)) {
        return str.replace(mobilePattern, "$1****$2");
      }

      // 如果是座机号
      if (landlinePattern.test(str)) {
        return str.replace(landlinePattern, (match, p1, p2) => {
          return match.replace(p1 + p2, p1 + "****" + p2); // 替换座机号的中间4位
        });
      }

      // 对于其他字符串
      if (str.length > 8) {
        // 如果大于 8 位，中间 4 位替换成 ****
        return str.replace(/^(.{4})(.{4})(.{4,})$/, "$1****$3");
      }

      if (str.length >= 4 && str.length <= 8) {
        // 如果是 4 到 8 位，中间 2 位替换成 **
        return str.replace(/^(.{2})(.{2})(.{2,})$/, "$1**$3");
      }

      // 对于长度小于 4 的字符串，全部替换成 ****
      return "****";
    },
    handleDelete(row) {},

    handleUpdate(row) {
      let dialog = {
        status: "update",
        visible: true,
      };
      this.$refs["addDialog"].dialog = dialog;
      this.$refs["addDialog"].init();
      this.$refs["addDialog"].form = row;
    },
    handleDelete(row) {
      this.loading = true;
      deleteOne({ id: [row.id] })
        .then((res) => {
          this.$message.success("删除成功");
          this.loading = false;
          this.queryList();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    queryList() {
      this.getList(this.customerId);
    },
    getList(id) {
      this.loading = true;
      oneDetail({ id })
        .then((res) => {
          let resData = res && res.resData;
          this.tableData = resData && resData.liaisonList;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    openFileDialog() {
      const dialog = this.$refs["addDialog"];
      dialog.dialog.status = "create";
      dialog.dialog.visible = true;
      dialog.init();
      dialog.form.customerId = this.customerId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
