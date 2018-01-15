<template>
    <div id="myTest">
        <v-header></v-header>
        <div class="my-test-cont content-r">
            <ul class="testList" v-show="!detailIsShow">
                <li class="test-item" v-for="(item,index) in myTestList"  @click="showTestDetail(index)">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>试卷{{index+1}}</span>     
                            <el-tag type="success" class="fr" v-if="item.isJudge">已批改</el-tag>
                            <el-tag type="danger" class="fr" v-else>未批改</el-tag>
                        </div>
                        <div  class="">
                            <div>
                                时间: {{item.questionDate[0]}} 到 {{item.questionDate[1]}}
                            </div>
                            <div>
                                出卷人: {{item.questionOwner}}
                            </div>
                        </div>
                    </el-card>
                </li>
            </ul>

            <el-card class="box-card" v-show="detailIsShow">
                <div slot="header" class="clearfix">
                    <span>出卷人:{{testDetail.questionOwner}}</span>
                    <span>做题人:{{testDetail.answerOwner}}</span>            
                </div>
                <div>
                    <el-collapse v-model="activeNames"  v-loading="loading">
                        <el-collapse-item title="选择题" name="1">
                            <div class="chooseTest-con">
                                <div class="chooseTest-item" v-for="(item,index) in testDetail.chooseTest">
                                    <p class="test-title">{{index+1}} .{{item.chooseTestQuestion}}</p>
                                    <div class="choose-option-con" v-for="(option,key) in item.chooseTestOption">
                                        <p class="option-title">选项{{changeNtoS(key+1)}} : {{option}} </p>
                                    </div>
                                    <p>你的答案: {{changeNtoS(item.chooseTestUserAnswer)}}</p>
                                    <p v-if="item.chooseGrade">
                                        <i class="el-icon-check" v-if="item.chooseGrade && item.chooseTestGrades.isTrue=='1'"></i>
                                        <i class="el-icon-close" v-else></i>
                                    </p>
                                    <p v-if="item.chooseTestGrades && item.chooseTestGrades.chooseTestAnswer">正确答案: {{item.chooseTestGrades.chooseTestAnswer}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="填空题" name="2">
                            <div class="blankTest-con">
                                <div class="blankTest-item" v-for="(item,index) in testDetail.blankTest">
                                    <p class="test-title">{{index+1}} .{{item.blankTestQuestion}}</p>
                                    <p>你的答案: {{item.blankTestUserAnswer}}</p>
                                    <p v-if="item.blankGrade">
                                        <i class="el-icon-check" v-if="item.blankGrade && item.blankTestGrades.isTrue=='1'"></i>
                                        <i class="el-icon-close" v-else></i>
                                    </p>
                                    <p v-if="item.blankTestGrades && item.blankTestGrades.blankTestAnswer">正确答案: {{item.blankTestGrades.blankTestAnswer}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="判断题" name="3">
                            <div class="oxTest-con">
                                <div class="oxTest-item" v-for="(item,index) in testDetail.oxTest">
                                    <p class="test-title">{{index+1}} .{{item.oxTestQuestion}}</p>
                                    <p>你的答案: {{item.oxTestUserAnswer=='0'?'错误':'正确'}}</p>
                                    <p v-if="item.oxGrade">
                                        <i class="el-icon-check" v-if="item.oxGrade && item.oxTestGrades.isTrue=='1'"></i>
                                        <i class="el-icon-close" v-else></i>
                                    </p>
                                    <p v-if="item.oxTestGrades && item.oxTestGrades.oxTestAnswer">正确答案: {{item.oxTestGrades.oxTestAnswer}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="问答" name="4">
                            <div class="qaTest-con">
                                <div class="qaTest-item" v-for="(item,index) in testDetail.qaTest">
                                    <p class="test-title">{{index+1}} . {{item.qaTestQuestion}}</p>
                                    <p>你的答案: {{item.qaTestUserAnswer}}</p>
                                    <p v-if="item.qaTestGrades">
                                        分数:  {{item.qaTestGrades.rate}}
                                    </p>
                                    <p v-if="item.qaTestGrades && item.qaTestGrades.qaTestAnswer">正确答案: {{item.qaTestGrades.qaTestAnswer}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="btn-group">
                    <el-button type="info" @click="toggleDetailIsShow">返回</el-button>
                </div>
                <!-- <el-button type="primary" @click="toUpdateTest">修改</el-button> -->
            </el-card>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                loading:false,
                activeNames: ['1'],
                myTestList:[],
                testDetail:{},
                detailIsShow:false,
            }
        },
        mounted(){
            var self = this
            var userId 
            var cookieArr = document.cookie.split(';')
            for (var i = 0; i < cookieArr.length; i++) {
                var arr = cookieArr[i].split('=')
                if (arr[0].indexOf('userId') > -1) {
                    userId = arr[1]
                }
            }
            $.ajax({
                url:"http://localhost:3000/api/getMyTest",
                type:'post',
                data:{
                    userId: userId
                },
                success:function(res){
                    if(res.data.length>0){
                        var testList = new Array()
                        for (let i = 0; i < res.data.length; i++) {
                            var chooseTest = new Array()
                            var blankTest = new Array()
                            var oxTest = new Array()
                            var qaTest = new Array()
                            for (let j = 0; j < res.data[i].testQuestion.chooseTest.length; j++) {
                                if(res.data[i].testAnswer.isJudge==true){
                                    var chooseGrade = res.data[i].grade.chooseTest[j] 
                                }else{
                                    var chooseGrade = null
                                }
                                
                                var obj = {
                                    chooseTestQuestion: res.data[i].testQuestion.chooseTest[j].chooseTestQuestion,
                                    chooseTestOption: res.data[i].testQuestion.chooseTest[j].chooseTestOption,
                                    chooseTestUserAnswer: res.data[i].testAnswer.chooseTest[j],
                                    chooseTestGrades: chooseGrade
                                }
                                chooseTest.push(obj)
                            }
                            for (let j = 0; j < res.data[i].testQuestion.blankTest.length; j++) {
                                if (res.data[i].testAnswer.isJudge == true) {
                                    var blankGrade = res.data[i].grade.blankTest[j]
                                } else {
                                    var blankGrade = null
                                }
                                var obj = {
                                    blankTestQuestion: res.data[i].testQuestion.blankTest[j].blankTestQuestion,
                                    blankTestUserAnswer: res.data[i].testAnswer.blankTest[j],
                                    blankTestGrades: blankGrade 
                                }
                                blankTest.push(obj)
                            }
                            for (let j = 0; j < res.data[i].testQuestion.oxTest.length; j++) {
                                if (res.data[i].testAnswer.isJudge == true) {
                                    var oxGrade = res.data[i].grade.oxTest[j]
                                } else {
                                    var oxGrade = null
                                }
                                var obj = {
                                    oxTestQuestion: res.data[i].testQuestion.oxTest[j].oxTestQuestion,
                                    oxTestUserAnswer: res.data[i].testAnswer.oxTest[j],
                                    oxTestGrades: oxGrade
                                }
                                oxTest.push(obj)
                            }
                            for (let j = 0; j < res.data[i].testQuestion.qaTest.length; j++) {
                                if (res.data[i].testAnswer.isJudge == true) {
                                    var qaGrade = res.data[i].grade.qaTest[j]
                                } else {
                                    var qaGrade = null
                                }
                                var obj = {
                                    qaTestQuestion: res.data[i].testQuestion.qaTest[j].qaTestQuestion,
                                    qaTestUserAnswer: res.data[i].testAnswer.qaTest[j],
                                    qaTestGrades: qaGrade
                                }
                                qaTest.push(obj)
                            }

                            var object = {
                                questionOwner: res.data[i].testQuestion.ownerName,
                                answerOwner: res.data[i].testAnswer.ownerName,
                                questionDate: res.data[i].testQuestion.testDate,
                                answerDate: res.data[i].testAnswer.answerDate,
                                chooseTest: chooseTest,
                                blankTest: blankTest,
                                oxTest: oxTest,
                                qaTest: qaTest,
                                isJudge: res.data[i].testAnswer.isJudge
                            }
                            self.myTestList.push(object)
                        }

                        // self.myTestList = testList
                        self.testDetail = self.myTestList[0]
                    } else { 
                        alert('您没有作答试题')
                    }
                }
            })
        },
        components:{
            'v-header':Vheader
        },
        methods:{
            showTestDetail(index){
                    this.detailIsShow = true
                    this.testDetail = this.myTestList[index]
            },
            toggleDetailIsShow(){
                this.detailIsShow = false
            },
            changeNtoS(num){
                if(num=='1'){
                    return 'A'
                }else if(num=='2'){
                    return 'B'
                } else if (num == '3') {
                    return 'C'
                } else if (num == '4') {
                    return 'D'
                }
            }
        }
    }
</script>