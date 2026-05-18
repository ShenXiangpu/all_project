<template>
    <div class="app-container">

        <!-- <xterm></xterm> -->
        <xterms/>
    </div>
</template>

<script>
// import Tips from './components/Tips'
// import SxTree from './components/sx-tree'
// import VueUploader from './components/VueUploader'
// import { mergeChunkFile } from '@/api/edu/file'

import  Xterm  from './components/Xterm'
import  Xterms  from './components/Xterms'

export default {
    components: {
        // Tips,
        // SxTree,
        // VueUploader,
        // Xterm,
        Xterms
    },
    data() {
        return {
            list: [
                {
                    id: 1,
                    title: '一级 1',
                    isOpen: false,
                    file: '1231312',
                    children: [
                        {
                            id: 11, title: '二级 1-1', isOpen: false,
                            children: [
                                { id: 111, title: '三级 1-1-1', isOpen: false, children: [] },
                                { id: 112, title: '三级 1-1-2', isOpen: false, children: [] }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: '一级 2', isOpen: false,
                    children: [
                        {
                            id: 22, title: '二级 2-1', isOpen: false, children: [
                                { id: 221, title: '三级 2-1-1', isOpen: false, }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: '一级 3', isOpen: false,
                    children: [
                        {
                            id: 33, title: '二级 3-1', isOpen: false, children: [
                                { id: 331, title: '三级 3-1-1', isOpen: false, }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    title: '一级 4', isOpen: false,
                    children: [
                        { id: 44, title: '二级 4-1', isOpen: false, }
                    ]
                },
                {
                    id: 5,
                    title: '一级 5', isOpen: false,
                    children: [
                        { id: 55, title: '二级 5-1', isOpen: false, }
                    ]
                },
                {
                    id: 6,
                    title: '一级 6', isOpen: false,
                    children: [
                        { id: 66, title: '二级 6-1', isOpen: false, }
                    ]
                },
                {
                    id: 7,
                    title: '一级 7', isOpen: false,
                    children: [
                        { id: 77, title: '二级 7-1', isOpen: false, }
                    ]
                },
                {
                    id: 8,
                    title: '一级 8', isOpen: false,
                    children: [
                        { id: 88, title: '二级 8-1', isOpen: false, }
                    ]
                },
                {
                    id: 9,
                    title: '一级 9', isOpen: false,
                    children: [
                        { id: 99, title: '二级 9-1', isOpen: false, }
                    ]
                },
            ],
            videoEl: null,
            duration: '00:00:00',
            currentTime: '00:00:00',
        }
    },
    computed: {

    },
    methods: {
        onFileSuccess(obj) {
            const { rootFile, file, response, chunk, defineFileName } = obj
            if (response) {
                const res = JSON.parse(response)
                if (res && res.flag) {
                    let fileName = file && file.name || ''
                    let index = fileName.lastIndexOf('.')
                    let fileType = fileName.substring(index + 1, fileName.length)

                    index >= 0 && (fileName = defineFileName || fileName.substring(0, index))
                    // 合并分片
                    mergeChunkFile({
                        fileName,
                        fileType,
                        md5: file.uniqueIdentifier
                    }).then(res => {
                        if (res && res.flag) {
                            this.$message.success('上传成功')
                        }
                    })
                }
            }

        },
        handleListIsOpen(list, id) {
            list && list.length > 0 && list.forEach(item => {
                if (item.id === id) {
                    item.isOpen = !item.isOpen
                    return
                }

                if (item.children && item.children.length > 0) {
                    this.handleListIsOpen(item.children, id)
                }
            })

            console.log('handleListIsOpen', list, id);
        },


        openTreeItem(item) {
            this.handleListIsOpen(this.list, item.id)
        },
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
                this.duration = this.parseTime(duration)
            }, 200);
            this.videoEl = videoEl
        },

        getVideoCurrentTime() {
            const videoEl = this.videoEl
            let currentTime = this.currentTime
            let clear = setInterval(() => {
                currentTime = videoEl.currentTime || this.currentTime
                this.currentTime = this.parseTime(currentTime)
            }, 1000);
            this.clear = clear
            this.currentTime = currentTime
        },
        playVideo() {
            const videoEl = this.videoEl
            videoEl.play()
            this.getVideoCurrentTime()
        },
        pauseVideo() {
            const videoEl = this.videoEl
            videoEl.pause()
        }
    },
    destroyed() {
        this.clear = null
    },
    created() {
        this.clear = null
    },
    mounted() {
        // this.getVideo()

    },

};
</script>

<style lang="scss" scoped>
.app-container {
    position: relative;
    height: 100vh;
}

.tips {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    overflow: hidden;
    position: relative;

    .tips-container {
        top: 10px;
        right: -30px;
    }

    .tips-container:hover {
        transform: translateX(-30px);
    }

}
</style>