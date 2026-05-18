<template>
  <el-drawer
    append-to-body
    destroy-on-close
    @close="closeDrawer"
    title="我是标题"
    :visible="drawer"
    :with-header="false"
  >
    <div class="padding20">
      <div v-if="drawer">
        <el-popover
          placement="bottom"
          min-width="200"
          trigger="hover"
          :content="manualTitle"
        >
          <div
            slot="reference"
            class="primaryBgColorb title-container text-center view-text"
          >
            {{ manualTitle }}
          </div>
        </el-popover>

        <edu-tinymce
          v-if="drawer"
          id="TaskContentDrawer"
          :disabled="true"
          class="edu-tinymce"
          v-model="manualContent"
        ></edu-tinymce>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import { useWatermark } from "@/utils/watermark";
import EduTinymce from "@/components/Edu-tinymce";
import  { waterMarkerInfo } from "@/settings";
import { mapState  } from 'vuex'
export default {
  components: {
    EduTinymce,
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      manualTitle: "",
      manualContent: "",
    };
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    })
  },
  watch: {
    drawer: {
      handler(newVal) {
        if (newVal) {
          setTimeout(() => {
            const tinymce = document.getElementById("TaskContentDrawer");
            const { setWatermark, clear } = useWatermark(tinymce);
            setWatermark(`${this.name}`);
          },200);
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    closeDrawer() {
      this.manualTitle = "";
      this.manualContent = "";
      this.$emit("closeDrawer");
    },
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  height: 40px;
  line-height: 40px;
  color: #fff;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px 8px 0 0;
  width: 100%;
}

.edu-tinymce {
  ::v-deep {
    .tox,
    .tox-tinymce {
      width: 100% !important;
      height: calc(100vh - 90px) !important;
    }
  }
}
</style>
