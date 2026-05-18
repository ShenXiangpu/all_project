<template>
  <div class="app-container">
    <div v-for="(item, index) in list" :key="index">
      <el-tag
        @close="closeAndDelFile(index)"
        size="mini"
        closable
        v-if="item && item.displayName"
        class="el-tag-edu"
        >{{ item.displayName }}</el-tag
      >
      <span
        class="marginLeft10 primaryColorb pointer"
        v-if="false"
        @click="handleOpen(item)"
        >查看</span
      >

      <el-popconfirm
        title="确定下载吗？"
        @onConfirm="handleDown(item)"
        @onCancel=""
      >
        <span
          v-if="item.id"
          slot="reference"
          class="marginLeft10 primaryColorb pointer"
          >下载</span
        >
      </el-popconfirm>
      <el-dialog
        :title="textMap[dialog.status]"
        :visible.sync="dialog.visible"
        class="el-dialog-edu"
        @close="handleClose"
        :close-on-click-modal="false"
        :style="{ '--color': defaultTheme || '#10abb9' }"
      >
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
  created() {},

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
  },
};
</script>

<style lang="scss" scoped>
.el-tag-edu {
  margin-left: 120px;
}
.el-dialog-edu {
}
</style>
