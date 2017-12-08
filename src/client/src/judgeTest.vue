<template>
    <div id="judgeTest">
        <div>
            
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                testDetail:{}
            }
        },
        components:{
            'v-header':Vheader
        },
        mounted(){
            var self = this
            var testId = this.$route.query.testId
            $.ajax({
                url:'http://localhost:3000/api/getjudgeDetail',
                type:'post',
                data:{
                    testId:testId
                },
                success:function(result){
                    self.testDetail = result.data
                }
            })
        }
    }
</script>