<template>
  <el-card class="el-card-edu">
    <div class="user-list primaryBgColor">用户列表 ({{ tableData && tableData.length || 0 }}人)</div>
    <el-table :data="tableData" class="el-table-edu" style="width: 100%" height="calc(100vh - 1.26rem)"
      v-loading="false" element-loading-text="拼命加载中">
      <el-table-column prop="userName" label="用户名" min-width="80" align="center"
        show-overflow-tooltip></el-table-column>
      <el-table-column prop="roleName" label="角色" min-width="80" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="onlineStatus" label="在线状态" min-width="80" align="center" show-overflow-tooltip>
        <template #default="scope">
          <span :class="scope.row.onlineStatus == '在线' ? 'primaryColorg' : 'primaryColor9'">
            {{ scope.row.onlineStatus }}
          </span>
        </template>

      </el-table-column>
    </el-table>
    <!-- <pagination v-show="total > 0" :pageSizes="[20, 50, 100]" :total="total" :page.sync="listQuery.page"
      :limit.sync="listQuery.limit" @pagination="searchQuery" /> -->
  </el-card>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'UserList',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Pagination
  },
  created() {

  },
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>
.el-card-edu {
  position: relative;
}

.user-list {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  z-index: 1000;
  width: 100%;
  color: #fff;
  height: 50px;
  line-height: 50px;
}

.el-table-edu {
  margin-top: 50px;
}
</style>
