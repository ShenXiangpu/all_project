<template>
    <div  class="list-container">
        <div class="font14 primaryColor">{{num}}</div>        
    </div>
</template>
  
<script>


export default {
    name: 'Listnum',
    props: {
        num:{
            type: String,
            default: 0
        }
    },
    computed: {
        
    },
    methods: {
        
    }
}
</script>
  
<style scoped>
 

</style>
  