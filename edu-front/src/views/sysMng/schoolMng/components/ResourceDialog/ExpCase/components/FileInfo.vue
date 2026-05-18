<template>
  <div>
    <el-popover
      v-if="(ipList && ipList.length > 0) || (pdkList && pdkList.length > 0) || (labList && row.labList.length > 0)"
      placement="top" trigger="hover">
      <div v-if="(ipList && ipList.length > 0) || (pdkList && pdkList.length > 0) || (labList && labList.length > 0)">
        <div v-if="ipList && ipList.length > 0">
          <span class="fontW7">IP</span>
          <div>
            <span v-for="item in ipList" :key="item.id" class="marginRight10 primaryBgColor">
              {{ item.displayName }}
            </span>
          </div>
        </div>
        <div v-if="pdkList && pdkList.length > 0">
          <span class="fontW7">PDK</span>
          <div>
            <span v-for="item in pdkList" :key="item.id" class="marginRight10 primaryBgColor">
              {{ item.displayName }}
            </span>
          </div>
        </div>
        <div v-if="labList && labList.length > 0">
          <span class="fontW7">LAB</span>
          <div>
            <span style="padding: 2px;border-radius: 2px;" v-for="item in labList" :key="item.id"
              class="marginRight10 primaryBgColor primaryColorw">
              {{ item.displayName }}
            </span>
          </div>
        </div>
      </div>
      <el-tag slot="reference" type="info" size="mini" class="info-container marginRight10 primar primaryColorw">
        文件信息
      </el-tag>
    </el-popover>
    <el-tag v-else type="info" size="mini"
      class="info-container marginRight10 primaryColor primaryColorw">暂无文件信息</el-tag>

  </div>

</template>

<script>
import { logger } from 'runjs/lib/common'


export default {
  name: '',
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    "row": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.ipList = newVal.ipList || []
          this.pdkList = newVal.pdkList || []
          this.labList = newVal.labList || []
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {

  },
  created() {

  },
  data() {
    return {
      ipList: [],
      pdkList: [],
      labList: [],
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped></style>
