<template>
    <div id="setUser">
        <v-header></v-header>
        <div class="content-r">
            
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {

            }
        },
        components:{
            'v-header':Vheader
        },
        mounted(){
            // $.ajax({
                
            // })
        }
    }
</script>