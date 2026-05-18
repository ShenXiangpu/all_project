<template>
    <div class="border primaryBgColor"></div>
</template>

<script>
export default {
    name: 'Decoration',
    components: {
    },
    props: {
        height: {
            default: 25,
            type: Number,
        },

        isShowTitle: {
            default: () => {
                return true
            },
            type: Boolean,
        },
        // width:  {
        //     default: '',
        //     type: String,
        // },

    },
    data() {
        return {

        }
    },
    mounted() {
       

    },
    computed: {

        

    },
    watch: {
    
    }
}
</script>

<style lang="scss" scoped>
.border {
    height: 2px;
    width: 100%;
}
</style>