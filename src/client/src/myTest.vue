<template>
    <div id="myTest">
        <v-header></v-header>
        <div class="my-test-cont container-r">
            <ul class="testList">
                <li class="test-item" v-for="(item,index) in testList" :testId="item._id" @click="toDoTest(item._id)">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>试卷{{index+1}}</span>
                            
                        </div>
                        <div  class="">
                            <div>
                                时间: {{item.testDate[0]}} 到 {{item.testDate[1]}}
                            </div>
                            <div>
                                出卷人: {{item.ownerName}}
                            </div>
                        </div>
                    </el-card>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                myTestList:[]
            }
        },
        mounted(){
            var self = this
            $.ajax({
                url:"http://localhost:3000/api/getMyTest",
                type:'post',
                data:{
                    ownerName:'后续添加'
                },
                success:function(res){
                    res.data = self.myTestList
                }

            })
        },
        components:{
            'v-header':Vheader
        }
    }
</script>