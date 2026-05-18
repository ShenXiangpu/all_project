<template>
  <div>
    <div class="padding20 left-container">
      <div class="font18 fontW7">{{ art }}</div>
      <el-divider></el-divider>
      <div class="tools-container">
        <div v-for="(item, index) in toolsList" :key="item.company">
          <div class="font16 fontW7" style="color: #333">
            {{ item.company }}
          </div>
          <div class="font14" v-for="i in item.edaTools" :key="i.id">
            <div class="flex">
              <el-tooltip
                class="tps"
                effect="define"
                :content="i.toolName"
                placement="top"
              >
                <div class="view-text toolName" style="">
                  {{ i.toolName }}
                </div>
              </el-tooltip>
              <div class="view-text toolVersion" style="">
                <el-tag size="mini" effect="dark">
                  {{
                    (i &&
                      i.versions &&
                      i.versions[0] &&
                      i.versions[0].toolVersion) ||
                    "暂无"
                  }}</el-tag
                >
              </div>
            </div>
          </div>
          <el-divider v-if="tools.length !== index + 1"></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Object | Array | String,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      toolsList: [],
      art: "",
    };
  },

  watch: {
    tools: {
      handler(newValue, oldValue) {
        if (newValue) {
          let tools = newValue;
          //判断tools  可能是字符串  可能是对象 可能是数组
          if (typeof newValue === "string") {
            tools = JSON.parse(newValue);
          }
          let artList = Object.keys(tools);
          let art = artList[0];
          this.art = art;
          let toolsList = tools[art];
          this.toolsList = toolsList;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #10abb9;

.toolName {
  text-indent: 10px;
  width: 120px;
  border-right: 1px solid #10abb9;
}

.el-tag {
  background-color: $primaryColor !important;
  color: #fff;
  padding: 0 3px;
  margin-left: 10px;
}

.left-container {
  max-height: 330px;
  // max-width: 100px;
  overflow: auto;
}

.tools-container {
  max-height: 200px;
  overflow: auto;
}
</style>
