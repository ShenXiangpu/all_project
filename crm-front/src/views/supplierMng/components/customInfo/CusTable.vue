<template>
  <el-card>
    <el-table border :data="followList" height="300" style="width: 100%;" v-loading="loading">
      <el-table-column prop="userName" label="跟进人" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="content" label="跟进内容" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="followLeiXing" label="跟进类型" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="followUpStatusName" label="跟进状态" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="followUpTypeName" label="跟进方式" align="center" min-width="100">
      </el-table-column>
      <el-table-column prop="nextFollowUpDate" label="下次跟进时间" align="center" min-width="100" show-overflow-tooltip :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间" align="center" min-width="100" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { followUpOneClue, followUpOneList } from "@/api/crm/supplier";
export default {
  name: "CusTable",
  props: {
    customerId: {
      type: String | Number,
      default: "",
    },
  },

  created() {
  },
  watch: {
    customerId: {
      handler(val) {
        if (val) {
          console.log("watch clueId", val);

          this.queryFollowUpOneClueList(val);
        }
      },
      immediate: true,
    },
  },
  computed: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },
      followList: [],
      loading: false,
    };
  },
  methods: {
    dateFormat(row, column) {
      return row[column.property] ? row[column.property] : "---";
    },
    //查询线索跟进记录
    queryFollowUpOneClueList(customerId) {
      this.loading = true;
      followUpOneList({
        customerId,
      })
        .then((res) => {
          this.followList = res.resData;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
