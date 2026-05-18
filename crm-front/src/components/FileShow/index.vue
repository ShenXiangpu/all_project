<template>
  <div class="flex align-center el-fileName-container">
    <div class="view-text">{{ fileName }}</div>
    <div v-if="remove" @click="removeFile"><i class="el-icon-circle-close pointer"></i></div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    fileName: {
      type: String,
      default: "",
    },
    remove: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {
    removeFile(){
        this.$emit('removeFile')
    },
  },
};
</script>

<style lang="scss" scoped>
.el-fileName-container {
  margin: 10px 0 0 100px;
  height: 20px;
  line-height: 20px;
  padding: 0 4px;
  border-radius: 2px;
  
}
.el-fileName-container:hover {
  background-color: #DDD;
}
</style>
