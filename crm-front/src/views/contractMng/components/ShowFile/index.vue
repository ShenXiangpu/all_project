<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex align-center">
        <el-tooltip class="marginLeft10" effect="dark" :content="item.displayName" placement="top-start">
          <el-tag @close="closeAndDelFile(index)" size="mini" closable v-if="item && item.displayName"
            class="el-tag-edu ">
            <div class="view-text">{{ item.displayName }}</div>
          </el-tag>
        </el-tooltip>
        <span class="marginLeft10 primaryColorb pointer" v-if="false" @click="handleOpen(item)">查看</span>
        <span class="marginLeft10 primaryColorb pointer" @click="handleDown(item)" v-if="item && item.id">下载</span>
      </div>


      <el-dialog :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu"
        @close="handleClose" :close-on-click-modal="false" :style="{ '--color': defaultTheme || '#10abb9' }">
        <iframe :src="fileUrl" frameborder="0" width="100%" height="100%" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => [
        {
          id: 41,
          displayName: "xalg.636f15b8.png",
          realName:
            "contract/100eb963-d89d-443a-802e-3de378d693d4.636f15b8.png",
          fileUrl:
            "http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/100eb963-d89d-443a-802e-3de378d693d4.636f15b8.png",
        },
      ],
    },
  },
  components: {},
  created() { },

  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
    style() {
      return this.$store.state.settings.theme.style;
    },
  },
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "查看",
        create: "查看",
        look: "查看",
      },
      fileUrl: "",
    };
  },
  methods: {
    // 删除文件
    closeAndDelFile(index) {
      this.$emit("closeAndDelFile", index);
    },
    handleOpen(item) {
      this.dialog.visible = true;
      this.dialog.status = "look";
      this.fileUrl = item.fileUrl;
    },
    handleDown(item) {
      this.$emit("handleDown", item);
    },
    handleClose() {
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag-edu {
  margin: 10px 0 10px 120px;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    width: 200px;
  }
}
</style>
