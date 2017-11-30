<template>
    <div id="selectTest">
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
</template>
<script>
    require('./assets/css/index.css')
    export default {
        data(){
            return {
                testList:[
                    
                ]
            }
        },
        mounted(){
            var self = this
            $.ajax({
                url: 'http://localhost:3000/api/getTestList',
                type: 'post',
                success: function (res) {
                    self.testList = res.data
                }
            })
        },
        methods:{
            toDoTest(id){
                this.$router.push('/doTest?testId='+id)
            }
        }
    }
</script>