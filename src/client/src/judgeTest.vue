<template>
    <div id="judgeTest">
        <v-header></v-header>
        <div class="content-r judge-con">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="选择题" name="1">
                    <div class="chooseTest-con">

                    </div>
                </el-collapse-item>
                <el-collapse-item title="填空题" name="2">

                </el-collapse-item>
                <el-collapse-item title="判断题" name="3">

                </el-collapse-item>
                <el-collapse-item title="问答" name="4">
                    <div class="qaTest-con">
                        <div class="qaTest-item" v-for="(item,index) in testDetail.qaTest">
                            <p class="test-title">{{index+1}} . {{item.qaTestQuestion}}</p>
                            <p>标准答案: {{item.qaTestAnswer}}</p>
                            <p>学生作答: {{item.studentAnswer}}</p>
                            <div class="block">
                                <span class="demonstration">评分</span>
                                <el-rate v-model="qaTestValue[index]"></el-rate>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="btn-group">
                <el-button type="success" @click="judge">提交评分</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                testDetail:{},
                activeNames:['4'],
                qaTestValue:[]
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
                    self.testDetail = result.data[0]
                }
            })
        },
        methods:{
            judge(){
                var judgeData = this.testDetail
                var self = this
                for (var  i = 0; i < judgeData.qaTest.length; i++) {
                    judgeData.qaTest[i].rate = this.qaTestValue[i]
                }
                $.ajax({
                    url:'http://localhost:3000/api/judgeTest',
                    type:'post',
                    data:{
                        data:JSON.stringify(judgeData)
                    },
                    success:function(res){
                        alert(res.msg)
                        self.qaTestValue = []
                    }
                })
            }
        }
    }
</script>