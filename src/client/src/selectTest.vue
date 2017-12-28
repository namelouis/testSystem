<template>
    <div id="selectTest">
        <ul class="testList">
            <li class="test-item" v-for="(item,index) in testList" :testId="item._id" >
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>试卷{{index+1}}</span>
                        
                    </div>
                    <div  class="margin-y-10">
                        <div class="margin-y-10">
                            时间: {{item.testDate[0]}} 到 {{item.testDate[1]}}
                        </div>
                        <div class="margin-y-10">
                            出卷人: {{item.ownerName}}
                        </div>
                    </div>
                    <div class="menu-group">
                        <el-button type="primary" @click="toDoTest(item._id)" v-if="userType=='2'">测试</el-button>
                        <el-button type="info" @click=toUpdateTest(item._id) v-if="userType=='1'">修改</el-button>
                        <el-button type="info" @click=tojudgeTestList(item._id) v-if="userType=='1'">批改</el-button>
                        <!-- <el-button type="danger">删除</el-button> -->
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
                    
                ],
                userType:'',
            }
        },
        mounted(){
            var self = this
            var cookieArr = document.cookie.split(';')
            for (var i = 0; i < cookieArr.length; i++) {
                var arr = cookieArr[i].split('=')
                if (arr[0].indexOf('userType') > -1) {
                    this.userType = arr[1]
                }
            }
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
            },
            toUpdateTest(id){
                this.$router.push('/updateTest?testId='+id)
            },
            tojudgeTestList(id){
                this.$router.push('/judgeTestList?testId='+id)
            }
        }
    }
</script>