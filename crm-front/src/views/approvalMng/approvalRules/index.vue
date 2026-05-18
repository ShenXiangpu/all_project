<template>
  <div class="app-container">
    <my-table
      type="my"
      :tableData="list"
      @queryList="queryList"
      :listQuery="listQuery"
      @searchQuery="searchQuery"
      :loading="loading"
      :total="total"
      @edit="edit"
      @delete="handleDelete"
      @gotoDetail="gotoDetail"
      @openFileDialog="openFileDialog"
      @handleUpdate="handleUpdate"
      @handleFollow="handleFollow"
      @showApproInfo="showApproInfo"
      @handleCustomerInfo="handleCustomerInfo"
    />
  </div>
</template>

<script>
import { getProcList, del } from "@/api/crm/approval";
import { cloneDeep } from "lodash";
import MyTable from "./components/Table.vue";
export default {
  name: "ApprovalRules",
  components: {
    MyTable,
  },
  created() {},
  mounted() {
    this.getList();
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: {},
      },
      list: [],
      total: 0,
      loading: false,
    };
  },
  methods: {
    handleCustomerInfo(row) {
      const custom = this.$refs["custom-info-dialog"];
      custom.handleOpen();
      let location = row && row && row.location;
      if (location) {
        location.indexOf(",") > -1 ? (location = location.split(",")) : "";
        row.location = location;
      }
      let form = {
        ...row,
      };
      custom.form = form;
      let clueId = row.clueId;
      if (clueId) {
        custom.clueId = clueId;
      }
      let customerId = row.id;
      if (customerId) {
        custom.customerId = customerId;
      }
    },
    async handleDelete(row) {
      const { id } = { ...row };
      const res = await del({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleUpdate(item) {
      this.$router.push({
        path: "create",
        query: {
          id: item.id,
          type: "update",
        },
      });
    },

    handleClose() {},
    openFileDialog() {
      this.$router.push("create");
    },
    handleFollow() {
      const ip = this.$refs["follow-dialog"];
      console.log("follow", ip);

      ip.handleOpen();
    },
    showApproInfo(item) {
      this.$router.push({
        path: "create",
        query: {
          id: item.id,
          type: "look",
        },
      });
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    queryList() {
      this.getList();
    },
    gotoDetail(id) {
      this.$router.push({
        path: "centerDetail",
        query: {
          id,
        },
      });
    },
    edit(row) {
      this.$router.push({
        path: "createCourse",
        query: {
          id: row.id,
          ar: row.arch,
        },
      });
    },

    getList() {
      this.loading = true;
      getProcList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        let list = resData.records;
        this.list =
          list &&
          list.length > 0 &&
          list.map((item) => {
            const { startUsers = [] } = item;
            if (startUsers && startUsers.length > 0) {
              item.startUsersStr = this.formatter(startUsers);
            } else {
              item.startUsersStr = "所有人";
            }
            return item;
          });
        this.total = resData.total;
        this.loading = false;
      });
    },

    formatter(startUsers) {
      if (startUsers && startUsers.length > 3) {
        return (
          startUsers?.slice(0, 3).join(",") + "等" + startUsers.length + "人"
        );
      } else {
        return startUsers?.join(",");
      }
    },
    handleQuery(form) {
      this.listQuery.params = form;
      this.getList();
    },
    resetQuery(form) {
      this.getList();
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
