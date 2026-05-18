<template>
  <div>
    <!-- <choose-users-list /> -->
    <show-file />
  </div>
</template>

<script>
import ChooseUsersList from "./components/ChooseUsersList";
import ShowFile from "./components/ShowFile";

export default {
  components: { ShowFile },
  data() {
    return { localIp: "" };
  },
  computed: {},
  methods: {
    async getLocalIpAddress() {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [],
        });

        pc.createDataChannel("");

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const ip = this.extractIpFromCandidate(event.candidate.candidate);
            if (ip) {
              this.localIp = ip;
              pc.close();
            }
          }
        };

        await pc.createOffer();
        await pc.setLocalDescription(await pc.createOffer());
      } catch (error) {
        console.error("Error getting local IP address:", error);
      }
    },
    extractIpFromCandidate(candidate) {
      const ipPattern =
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
      const match = candidate.match(ipPattern);
      return match ? match[0] : null;
    },
  },
  destroyed() {},
  created() {
    this.getLocalIpAddress();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-carousel__indicators {
    display: none;
  }
}
.el-broadcast::before {
  content: "";
  display: inline-block;
  clear: both;
  width: 22px;
  height: 22px;
  background-image: url("../../assets/img/head/broadcast.png");
  background-size: 100% 100%;
  background-position: 0%;
  margin: 0 5px 0 0px;
}
.el-broadcast-text {
  width: 200px;
}
</style>
