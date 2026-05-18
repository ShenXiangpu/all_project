<template>
    <el-dialog   :destroy-on-close="true" ref="video-dialog" :title="title" :show-close="true"
        :visible="dialogVisible.visible" width="50%" @close="handleClose()" @opened="handleOpened">

        <el-card v-loading="fullscreenLoading">
            <video ref="video" @click="clickVideo" id="video" :src="url"></video>

            <div>
                <el-slider @change="changeTime" :max="max" :min="min" v-model="value" :show-tooltip="false"></el-slider>

            </div>
            <div class="flex justify-between align-center">



                <div style="width: 20%;">
                    <i v-if="!isPlay" class="el-icon-video-play font20 marginRight10" @click="playVideo"></i>

                    <i v-if="isPlay" class="el-icon-video-pause font20 marginRight10" @click="pauseVideo"></i>

                    <i @click="resetVideo" class="el-icon-refresh font20"></i>
                </div>
                <div>
                    <span @click="fullScreen" class="marginRight20">全屏</span>
                    <span>
                        {{ currentTime }} /{{ duration }}
                    </span>

                </div>
            </div>

        </el-card>


    </el-dialog>
</template>

<script>
import {
    updateFileLearnRate
} from "@/api/edu/courseRourse";
import { mapGetters } from "vuex"
export default {
    name: '',
    components: {

    },
    props: {
        sectionId: {
            default: '0' | 0,
            type: String | Number
        }
    },
    watch: {

    },
    computed: {
        ...mapGetters(['userRolesNames',])
    },
    created() {
        clearInterval(this.clear)
        this.clear = null
        this.fullscreenLoading = true

    },
    mounted() {
        // 获取视频总时长


    },
    data() {
        return {
            value: 0,
            fullscreenLoading: false,
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改",
                create: "文件上传",
            },
            title: '文件',
            clear: null,
            videoEl: null,
            duration: '00:00:00',
            currentTime: '00:00:00',
            min: 0,
            max: 0,
            isPlay: false,
            url: '',
            fileId: 0,
            completed:0
        }
    },
    computed: {

    },
    destroyed() {
        clearInterval(this.clear)
        this.clear = null
        this.url = ''
        this.videoEl = null;
        this.fullscreenLoading = false

    },
    methods: {
        fullScreen() {
            this.$refs['video'].requestFullscreen()
            if (!this.isPlay) {
                this.playVideo()
            }
        },
        resetVideo() {
            clearInterval(this.clear)
            this.videoEl.currentTime = 0
            this.currentTime = '00:00:00'
            this.videoEl.pause()
            this.isPlay = false
            this.value = 0
        },
        clickVideo() {

            if (!this.isPlay) {
                this.isPlay = true
                this.videoEl.play()
            } else {
                this.isPlay = false
                this.videoEl.pause()
            }
        },
        changeTime(e) {
            console.log(e);
            this.videoEl.currentTime = e
            let currentTime = this.videoEl.currentTime
            this.currentTime = this.parseTime(currentTime)
        },
        //监听视频状态
        videoStatus(e) { },

        parseTime(time) {
            let h = parseInt(time / 3600);
            let m = parseInt(time % 3600 / 60);
            let s = parseInt(time % 60);
            return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
        },
        getVideo() {
            const videoEl = document.getElementById('video');
            setTimeout(() => {
                let duration = videoEl.duration
                this.max = duration
                this.duration = this.parseTime(duration)
            }, 200);
            this.videoEl = videoEl
        },

        getVideoCurrentTime() {
            let _this = this
            if (!this.isPlay) {
                return
            }
            const videoEl = _this.videoEl
            let currentTime = _this.currentTime
            clearInterval(_this.clear)
            _this.clear = setInterval(() => {
                currentTime = videoEl.currentTime || currentTime
                _this.value = videoEl.currentTime
                console.log(videoEl.currentTime, _this.duration);
                _this.currentTime = _this.parseTime(currentTime)
            }, 1000);
            // _this.currentTime = currentTime

        },
        getIsPlay() {
            this.isPlay = !this.isPlay
        },
        playVideo() {
            this.getIsPlay()
            let videoEl = this.videoEl
            this.getVideoCurrentTime()
            videoEl.play()
        },
        pauseVideo() {
            this.getIsPlay()
            clearInterval(this.clear)
            this.clear = null
            let videoEl = this.videoEl
            videoEl.pause()
        },
        handleOpened() {
            console.log('.....');
            this.getVideo()
            this.fullscreenLoading = false
        },
        handleOpen() {
            this.dialogVisible.visible = true;
        },
        handleClose() {
            //调用接口传递视频播放百分比
            const videoEl = this.videoEl
            let userRolesNames = this.$store.state.user.userRolesNames
            if (userRolesNames == '学生' && this.completed != 1) { //学生才调用
                let fileId = this.fileId
                let stuRate = this.value / videoEl.duration * 100
                stuRate = Math.floor(stuRate)
                console.log(this.value, videoEl.duration);
                let data = {
                    fileId,
                    stuRate
                }
                updateFileLearnRate(data)
                this.$emit("queryList")
            }

            clearInterval(this.clear)
            this.clear = null   
            this.isPlay = false
            this.videoEl = null
            this.value = 0
            this.currentTime = '00:00:00'
            this.dialogVisible.visible = false;
            this.fullscreenLoading = false
        },

        reset(formName) {
            this.$refs[formName].resetFields();
            this.handleClose()
        },
        submitForm(formName) {
            this.$refs[formName].resetFields();
            this.handleClose();
            this.$emit('getFileList')
        },
    }
}
</script>

<style lang="scss" scoped>

#video {
    height: calc(100vh - 500px);
    width: 100%;
    margin: 0 auto;
}
</style>