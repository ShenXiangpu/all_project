<template>
    <div>
        <editor  v-model="content" :disabled="disabled" :api-key="apiKey" :init="initConfig" />
    </div>
</template>
  
<script>
import axios from 'axios'
import plugins from './plugins'
import toolbar from './toolbars'
import fontFormats from './fontFormats'
import Editor from '@tinymce/tinymce-vue'
import { uploadFile } from '@/api/edu/labCenter'

const defaultConfig = {
    width: '100%',
    height: '100%',
    menubar: true,
    language: 'zh_CN'
}







/**
 * @description 校验上传视频
 * @param {File} file - 要上传的文件
 * @returns {boolean}
 */
const validateVideo = async (file) => {
    const isMP4 = file.type === 'video/mp4'
    const isLt3M = file.size / 1024 / 1024 < 300

    if (!isMP4) {
        this.$message.error('上传视频必须为 MP4 格式！')

        return false
    }

    if (!isLt3M) {
        this.$message.error('上传视频大小限制 3M 以内！')

        return false
    }

    const duration = await getVideoDuration(file)
    if (duration > 600) {
        this.$message.error('上传视频时长不能超过 60 秒！')

        return false
    }

    return true
}

/**
 * @description 获取视频时长
 * @param {File} file - 要上传的文件
 * @returns {Promise<number>}
 */
const getVideoDuration = (file) => {
    return new Promise(resolve => {
        const videoElement = document.createElement('video')
        videoElement.src = URL.createObjectURL(file)

        videoElement.addEventListener('loadedmetadata', () => {
            resolve(videoElement.duration)
        })
    })
}

/**
 * @description 上传文件
 * @param {File} file - 要上传的文件
 * @param {string} folder - 所存放的文件夹
 * @returns {Object}
 */
const uploadFiles = async (file, folder = 'images') => {
    const formData = new FormData()
    formData.append('file', file)

    const  data  = await uploadFile(formData)
    console.log(data);
    if (data && data.flag) {
        const resData = data.resData
        return {
            url: resData.filePath,
            name: resData.displayName
        }
    }

}

const file_picker_callback = (callback, value, meta) => {
    if (meta.filetype === 'media') {
        const input = document.createElement('input')
        console.log(input, 'input');
        input.setAttribute('type', 'file')
        // const that = this // 为 Vue 构造函数中的 this，指向 Vue 实例对象
        input.onchange = async () => {
            const file = input.files[0] // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
            const isValid = validateVideo(file)

            if (isValid) {
                const { url } = await uploadFiles(file, 'video')
                callback(url)
            } else {
                callback()
            }
        }

        input.click()
    }
}
const apiKey = ''
import { getToken, getRefreshToken } from '@/utils/auth'
export default {
    name: 'TinyMce',
    components: {
        editor: Editor
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: () => {
                return {
                    width: '100%',
                    height: 500,
                    menubar: true,
                    language: 'zh_CN'
                }
            }
        },
        initConfig: {
            type: Object,
            default: () => {
                return {
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: true,
                    statusbar: false,
                    content_style: 'img {max-width:100%;height:auto;vertical-align:top}',
                    plugins,
                    toolbar,
                    width: Object.assign(defaultConfig,
                        {
                            width: '800px',
                        }
                    ).width,
                    height: Object.assign(defaultConfig,
                        {
                            height: 700,
                        }
                    ).height,
                    menubar: Object.assign(defaultConfig, {
                        menubar: true,
                    }).menubar,
                    language_url: "/tinymce/langs/zh-Hans.js",
                    language: "zh-Hans",
                    font_formats: fontFormats,
                    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                    image_dimensions: false,
                    images_upload_handler: async (blobInfo, successFun) => {
                        const file = blobInfo.blob()
                        const { url } = await uploadFiles(file, 'image')
                        console.log(url, 'url', file);
                        successFun(url)
                    },
                    file_picker_types: 'media',
                    file_picker_callback,
                    video_template_callback: data => {
                        return `<video width="560" height="auto" controls="controls" src=${data.source} />`
                    },
                    


                }
            }
        }
    },
    data() {
        return {
            apiKey,
            content: '',
            initConfig1: {
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                statusbar: false,
                content_style: 'img {max-width:750px;height:auto;vertical-align:top}',
                plugins,
                toolbar,
                width: Object.assign(defaultConfig,
                    {
                        width: '800px',
                    }
                ).width,
                height: Object.assign(defaultConfig,
                    {
                        height: 700,
                    }
                ).height,
                menubar: Object.assign(defaultConfig, {
                    menubar: true,
                }).menubar,
                language_url: "/tinymce/langs/zh-Hans.js",
                language: "zh-Hans",
                font_formats: fontFormats,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                image_dimensions: false,
                images_upload_handler: async (blobInfo, successFun) => {
                    const file = blobInfo.blob()
                    const { url } = await this.uploadFiles(file, 'image')
                    console.log(url, 'url', file);
                    successFun(url)
                },
                file_picker_types: 'media',
                file_picker_callback: (callback, value, meta) => {
                    if (meta.filetype === 'media') {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        const that = this // 为 Vue 构造函数中的 this，指向 Vue 实例对象
                        input.onchange = async function () {
                            const file = this.files[0] // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
                            const isValid = await that.validateVideo(file)
                            if (isValid) {
                                const { url } = await that.uploadFiles(file, 'video')
                                callback(url)
                            } else {
                                callback()
                            }
                        }
                        input.click()
                    }
                },
                video_template_callback: data => {
                    return `<video width="560" height="auto" controls="controls" src=${data.source} />`
                }
            }
        }
    },
    watch: {
        value: {
            handler(newValue) {
                if (newValue !== '') {
                    this.content = newValue
                }
            },
            immediate: true
        }
    },
    methods: {
        /**
         * @description 获取富文本内容（注：供父组件调用）
         * @returns {string}
         */
        getContent() {
            return this.content
        }
    }
}
</script>
