<template>
    <div id="upLoadTest">
        <v-header></v-header>
        <div class="content-r pr">
            <!-- <ul class="testList" v-show="!detailIsShow">
                <li class="test-item" v-for="(item,index) in myTestList"  @click="showTestDetail(item._id)">
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
            </ul> -->
            <div class="test-cont" v-if="detailIsShow">
                <el-collapse v-model="activeNames" >
                    <el-collapse-item title="选择题" name="1">
                        <div class="choose-group input-group" v-for="(item,index) in chooseTest">
                            <span>{{index+1}}.</span>
                            <el-input placeholder="请输入题目题干" style="width:60%;" v-model="chooseTestQuestion[index]"></el-input>
                            <div>
                                <el-input v-for="(n,optionIndex) in 4" :placeholder="'选项'+n" style="width:20%" :optionIndex="index+'-'+optionIndex"></el-input>
                            </div>
                            <div class="answer">
                                <el-input placeholder="请输入题目答案" style="width:50%;" v-model="chooseTestAnswer[index]"></el-input>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="填空题" name="2">
                        <div class="blank-group input-group" v-for="(item,index) in blankTest">
                            <el-input placeholder="请输入题目题干" style="width:50%;" v-model="item.blankTestAnswer"></el-input>
                            <el-input placeholder="请输入题目答案" style="width:50%;" v-model="item.blankTestQuestion"></el-input>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="判断题" name="3">
                        <div class="ox-group input-group" v-for="(item,index) in oxTest">
                            <el-input placeholder="请输入题目题干" style="width:50%;" v-model="item.oxTestQuestion"></el-input>
                            <el-radio v-model="item.oxTestAnswer" label="1">正确</el-radio>
                            <el-radio v-model="item.oxTestAnswer" label="0">错误</el-radio>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="问答题" name="4">
                        <div class="qa-group input-group" v-for="(item,index) in qaTest">
                            <el-input placeholder="请输入题目题干" style="width:50%;" v-model="item.qaTestQuestion"></el-input>
                            <el-input placeholder="请输入题目答案" style="width:50%;" v-model="item.qaTestAnswer"></el-input>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="info-group" v-if="detailIsShow">
                <div class="owner-con" >
                    <el-input placeholder="请输入出卷人姓名" style="width:50%;" v-model="ownerName"></el-input>
                    <div class="block">
                        <span class="demonstration">请输入测试时间</span>
                        <el-date-picker v-model="testDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
                        </el-date-picker>
                    </div>
                </div>
                <div class="btn-group" >
                    <el-button type="success" @click="submit">提交修改</el-button>
                    <el-button type="info" @click="goBack">取消修改</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vheader from "./components/Vheader.vue";

    require('./assets/css/index.css')
    export default {
        data() {
            return {
                options: [{
                    value: '1',
                    label: '选择题'
                }, {
                    value: '2',
                    label: '填空题'
                }, {
                    value: '3',
                    label: '判断题'
                }, {
                    value: '4',
                    label: '问答题'
                },],
                testType: '',
                inputNum: '',
                upLoadTestNum: 0,
                uploadContentIsShow: false,
                chooseTest:[],
                blankTest:[],
                oxTest:[],
                qaTest:[],
                ownerName: '',
                testDate: '',
                myTestList: [],
                testDetail: {},
                detailIsShow:true,
                activeNames: ['1'],
                
            }
        },
        components: {
            'v-header': Vheader
        },
        mounted(){
            var self = this
            // $.ajax({
            //     url:"http://localhost:3000/api/getTestList",
            //     type:'post',
            //     data:{
            //         userId:'测试'
            //     },
            //     success(result){
            //         self.myTestList = result.data
            //     }
            // })
            this.showTestDetail(this.$route.query.testId)
        },
        methods: {
            generateTest() {
                if (this.inputNum > 10) {
                    alert('请输入小于10的数字')
                } else {
                    this.uploadContentIsShow = true
                    this.upLoadTestNum = parseInt(this.inputNum)
                }
            },
            submit() {
                var self = this
                var requestData = {
                    chooseTest:this.chooseTest,
                    blankTest:this.blankTest,
                    oxTest:this.oxTest,
                    qaTest:this.qaTest,
                    ownerName:this.ownerName,
                    testDate:this.testDate,
                    testId:this.testDetail._id
                }

                $.ajax({
                    url: 'http://localhost:3000/api/updateTest',
                    type: 'post',
                    // contentType: 'text/plain',
                    // dataType: "json",
                    data: {
                        data: JSON.stringify(requestData),
                    },
                    success: function (res) {
                        alert(res.msg)
                    }
                })
            },
            clear() {
                this.chooseTestQuestion = []
                this.chooseTestOption = []
                this.chooseTestAnswer = []
                this.blankTestQuestion = []
                this.blankTestAnswer = []
                this.oxTestQuestion = []
                this.oxTestAnswer = []
                this.qaTestQuestion = []
                this.qaTestAnswer = []
            },
            showTestDetail(id){
                // this.detailIsShow = true
                var self = this
                $.ajax({
                    url: 'http://localhost:3000/api/getTestDetail',
                    type: "post",
                    data: {
                        testId: id
                    },
                    success: function (res) {
                        self.loading = false
                        self.testDetail = res.data[0]
                        self.chooseTest = self.testDetail.chooseTest
                        self.blankTest = self.testDetail.blankTest
                        self.oxTest = self.testDetail.oxTest
                        self.qaTest = self.testDetail.qaTest
                        self.ownerName = self.testDetail.ownerName
                        self.testDate = self.testDetail.testDate
                    }
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>