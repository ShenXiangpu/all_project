<template>
  <el-form-item v-if="userRolesNames == '系统最高管理员'" label="所属高校" prop="universityName">
    <el-select v-model="queryParams.universityName" placeholder="请选择高校" class="el-select-edu">
      <el-option v-for="item in universityList" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { mapGetters } from "vuex"
import { getUniversityForSearch } from "@/api/edu/course";
export default {
  name: '',
  props: {
    queryParams: {
      type: Object,
      required: true
    }
  },
  components: {

  },
  computed: {
    ...mapGetters([
      'userRolesNames'
    ])
  },
  created() {
    this.queryUniversityList()
  },
  data() {
    return {
      universityList: [],
    }
  },
  methods: {
    queryUniversityList() {
      getUniversityForSearch().then((res) => {
        this.universityList = res.resData;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-edu {
  width: 200px;
}
</style>
