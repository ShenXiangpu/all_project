<template>
  <div>
    <el-table :data="trialItemList" border style="width: 100%">
      <el-table-column type="index" label="任务序号" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="trialItemName"
        label="任务名称"
        min-width="280"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="primaryColorb pointer" @click="openDrawer(scope.row)">{{
            scope.row.trialItemName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="userRolesNames == '学生'"
        prop="updateAt"
        label="更新时间"
        align="center"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        v-if="userRolesNames != '学生' && !pub"
        prop="onlineCount"
        label="在线人数"
        min-width="180"
        align="center"
        :formatter="(row) => {
          return row.onlineCount || 0;
        }"
      >
      </el-table-column>
      <el-table-column
        v-if="userRolesNames != '学生'"
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="180"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="180px">
        <template slot-scope="scope">
          <el-button
            v-if="
              userRolesNames != '学生'  && userId == scope.row.createBy
            "
            size="mini"
            type="primary"
            @click="editTask(scope.row)"
            class="editPrimary marginRight10"
            >修改</el-button
          >

          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="deleteOneTrialOneItem(scope.row)"
          >
            <el-button
              v-if="
                userRolesNames != '学生' && userId == scope.row.createBy
              "
              size="mini"
              type="danger"
              class="editDanger marginRight10"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>

          <el-button
            class="editDefault"
            size="mini"
            @click="openDrawer(scope.row)"
            >实验手册</el-button
          >
          <el-button
            size="mini"
            type="success"
            class="editSuccess"
            @click="doLab(scope)"
            >去做实验</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  oneTrialHasItemList,
  deleteOneTrialOneItem,
} from "@/api/edu/labCenter";
export default {
  name: "",
  props: {
    trialId: {
      default: "",
      type: String | Number,
    },
    // 实验广场仅展示
    pub: {
      default: false | "false",
      type: Boolean | String,
    },
  },
  watch: {
    trialId: {
      handler(newVal, oldVal) {
        this.getList();
      },
    },
  },
  components: {},
  computed: {
    ...mapGetters(["userRolesNames", "userId"]),
  },
  created() {},
  data() {
    return {
      trialItemList: [],
    };
  },
  methods: {
    getList() {
      oneTrialHasItemList({ trialId: this.trialId }).then((res) => {
        if (res && res.flag) {
          const resData = res.resData;
          this.trialItemList = resData;
        }
      });
    },

    deleteOneTrialOneItem(row) {
      deleteOneTrialOneItem({ trialItemId: row.id }).then((res) => {
        if (res && res.flag) {
          this.$message.success("删除成功");
          this.getList();
        }
      });
    },

    openDrawer(row) {
      this.$emit("openDrawer", row);
    },
    editTask(row) {
      this.$emit("editTask", row);
    },

    doLab(scope) {
      this.$emit("doLab", scope.$index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
