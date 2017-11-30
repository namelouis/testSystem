<template>
    <div id="doTest">
        <div class="test-cont">
            <el-collapse v-model="activeNames" @change="handleChange" v-loading="loading">
                <el-collapse-item title="选择题" name="1">
                    <div class="chooseTest-con">
            
                    </div>
                </el-collapse-item>
                <el-collapse-item title="填空题" name="2">
                    <div class="blankTest-con">
                        <div class="blankTest-item" v-for="(item,index) in data[0].blankTest">
                            <p class="test-title">{{index+1}} .{{item.blankTestQuestion}}</p>
                            <el-input v-model="userBlankTestAnswer[index]" placeholder="请输入答案"></el-input>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="判断题" name="3">
                    <div class="oxTest-con">
                        <div class="oxTest-item" v-for="(item,index) in data[0].oxTest">
                            <p class="test-title">{{index+1}} .{{item.oxTestQuestion}}</p>
                            <el-radio v-model="userOxTestAnswer[index]" label="1">正确</el-radio>
                            <el-radio v-model="userOxTestAnswer[index]" label="0">错误</el-radio>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="问答" name="4">
                    <div class="qaTest-con">
                        <div class="qaTest-item" v-for="(item,index) in data[0].qaTest">
                            <p class="test-title">{{index+1}} . {{item.qaTestQuestion}}</p>
                            <el-input v-model="userQaTestAnswer[index]" placeholder="请输入答案"></el-input>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="btn-group">
            <el-button type="primary">提交</el-button>
            <el-button type="danger">放弃</el-button>
        </div>
    </div>
</template>
<script>
    require('../src/assets/css/index.css')
    export default{
        data(){
            return {
                activeNames: ['1'],
                data:{},
                userChooseTestAnswer:[],
                userBlankTestAnswer:[],
                userOxTestAnswer:[],
                userQaTestAnswer:[],
                loading:true,
            }
        },
        mounted(){
            var self = this
            var testId = this.$route.query.testId
            $.ajax({
                url: 'http://localhost:3000/api/getTestDetail',
                type:"post",
                data:{
                    testId:testId
                },
                success:function(res){
                    self.loading = false   
                    self.data = res.data
                    console.log(res)
                }
            })
        },
        methods:{
            handleChange(){

            }
        }
    }
</script>