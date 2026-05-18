export const propsMixin = {
  props: {
    reportObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    reportObj: {
      handler(val) {
        this.reportObj = val;
      },
      deep: true,
    },
  },
};
