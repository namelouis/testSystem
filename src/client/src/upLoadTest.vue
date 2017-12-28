<template>
    <div id="upLoadTest">
        <v-header></v-header>
        <div class="up-load-content content-r pr">
            <div class="type-select-group">
                <el-select v-model="testType" placeholder="请选择题目类型" class="">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="inputNum" placeholder="请输入题目数量" style="width:20%"></el-input>
                <el-button type="primary" @click="generateTest">生成题目模板</el-button>

            </div>
            <div class="upload-test-content" v-if = "uploadContentIsShow">
                <div class="choose-group input-group" v-show="testType=='1'" v-for="(n,index) in upLoadTestNum[0]">
                    <span>{{index+1}}.</span>
                    <el-input  placeholder="请输入题目题干"  style = "width:60%;" v-model="chooseTestQuestion[index]"></el-input>
                    <div>
                        <el-input v-for="(n,optionIndex) in 4" :placeholder="'选项'+n" style="width:20%" :optionIndex="index+'-'+optionIndex" ></el-input>
                    </div>
                    <div class="answer">
                        <el-input  placeholder="请输入题目答案"  style = "width:50%;" v-model="chooseTestAnswer[index]"></el-input>
                    </div>
                </div>
                <div class="blank-group input-group" v-show="testType=='2'" v-for="(n,index) in upLoadTestNum[1]">
                    <el-input  placeholder="请输入题目题干"  style = "width:50%;" v-model="blankTestQuestion[index]"></el-input>                    
                    <el-input  placeholder="请输入题目答案"  style = "width:50%;" v-model="blankTestAnswer[index]"></el-input>
                </div>
                <div class="ox-group input-group" v-show ="testType=='3'" v-for="(n,index) in upLoadTestNum[2]">
                    <el-input  placeholder="请输入题目题干"  style = "width:50%;" v-model="oxTestQuestion[index]"></el-input>                    
                    <el-radio v-model="oxTestAnswer[index]" label="1">正确</el-radio>
                    <el-radio v-model="oxTestAnswer[index]" label="0">错误</el-radio>
                </div>
                <div class="qa-group input-group" v-show ="testType=='4'" v-for="(n,index) in upLoadTestNum[3]">
                    <el-input  placeholder="请输入题目题干"  style = "width:50%;" v-model="qaTestQuestion[index]"></el-input>                    
                    <el-input  placeholder="请输入题目答案"  style = "width:50%;" v-model="qaTestAnswer[index]"></el-input>
                </div>
            </div>
            <div class="owner-con" v-if ="uploadContentIsShow">
                <el-input placeholder="请输入出卷人姓名" style="width:50%;" v-model="ownerName"></el-input>
                <div class="block">
                    <span class="demonstration">请输入测试时间</span>
                    <el-date-picker v-model="testDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
                    </el-date-picker>
                </div>
            </div>
            <div class="btn-group" v-if="uploadContentIsShow">
                <el-button type="success" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Vheader from "./components/Vheader.vue";

    require('./assets/css/index.css')
    export default{
        data(){
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
                inputNum:'',
                upLoadTestNum:[0,0,0,0],
                uploadContentIsShow:false,
                chooseTestQuestion:[],
                chooseTestOption:[],
                blankTestQuestion:[],
                oxTestQuestion:[],
                qaTestQuestion:[],
                chooseTestAnswer:[],
                blankTestAnswer:[],                
                oxTestAnswer:[],
                qaTestAnswer:[],      
                ownerName:'',
                testDate:''
            }
        },
        components:{
            'v-header':Vheader
        },
        methods:{
            generateTest(){
                if(this.inputNum == ''){
                    this.open4('请输入生成题目的数量')
                }else{
                    this.uploadContentIsShow = true
                    this.upLoadTestNum[this.testType-1]= parseInt(this.inputNum)
                }
            },
            submit(){
                var self = this
                var userId
                if (document.cookie.indexOf('userId') > -1) {
                    var cookieArr = document.cookie.split(';')
                    for (var i = 0; i < cookieArr.length; i++) {
                        var arr = cookieArr[i].split('=')
                        if (arr[0].indexOf('userId') > -1) {
                            userId = arr[1]
                        }
                    }
                }
                var chooseTestOption = new Array()
                if(this.testType == '1'){
                    for(let i = 0;i<this.upLoadTestNum[0];i++){
                        var tempArr = []
                        for(let j = 0;j<4;j++){
                            var optionValue = $("[optionIndex="+i+'-'+j+"]").find('input').val()
                            tempArr.push(optionValue)
                        }
                        chooseTestOption.push(tempArr)
                    }
                }
                this.chooseTestOption = chooseTestOption
                console.log(chooseTestOption)
                var chooseTest = {
                    type:'chooseTest',
                    chooseTestQuestion:this.chooseTestQuestion,
                    chooseTestOption:this.chooseTestOption,
                    chooseTestAnswer:this.chooseTestAnswer
                }
                var blankTest = {
                    type:'blankTest',
                    blankTestQuestion:this.blankTestQuestion,
                    blankTestOption:this.blankTestOption,
                    blankTestAnswer:this.blankTestAnswer
                }
                var oxTest = {
                    type:'oxTest',
                    oxTestQuestion:this.oxTestQuestion,
                    oxTestOption:this.oxTestOption,
                    oxTestAnswer:this.oxTestAnswer
                }
                var qaTest = {
                    type:'qaTest',
                    qaTestQuestion:this.qaTestQuestion,
                    qaTestOption:this.qaTestOption,
                    qaTestAnswer:this.qaTestAnswer
                }
                console.log(chooseTest)
                var requestData = {
                    ownerName:this.ownerName,
                    testDate:[this.formatDate(this.testDate[0]),this.formatDate(this.testDate[1])],
                    chooseTest: chooseTest,
                    blankTest: blankTest,
                    oxTest: oxTest,
                    qaTest: qaTest,
                    userId: userId
                }
                if(this.ownerName==''){
                    this.open4('请填写出卷人')
                }else if(requestData.testDate.length!=2){
                    this.open4('请选择测试的日期')
                }else if(requestData.chooseTest.length==0 && requestData.blankTest.length == 0 && requestData.oxTest.length == 0 && requestData.qaTest.length == 0){
                    this.open4('请至少编写一道题目')
                }else{
                    $.ajax({
                        url: 'http://localhost:3000/api/uploadTest',
                        type: 'post',
                        // contentType: 'text/plain',
                        // dataType: "json",
                        data: {
                            data: JSON.stringify(requestData),
                        },
                        success: function (res) {
                            self.open3('添加成功')
                            self.clear()
                        }
                    })
                }
            
            },
            clear(){
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
            formatDate(date){
                var year = date.getFullYear()
                var month = date.getMonth()+1
                var day = date.getDate()

                return year+'-'+month+'-'+day
            },
            open3(msg) {
                this.$notify({
                    title: '成功',
                    message: msg,
                    type: 'success'
                })
            },
            open4(msg){
                this.$notify({
                    title: '警告',
                    message: msg,
                    type: 'warning'
                });
            }
        }
    }
</script>