<template>
    <div id="judgeTest">
        <v-header></v-header>
        <div class="judgeList content-r">
            <ul>
                <li class="test-item" v-for="(item,index) in testList" :testId="item._id" @click="toJudgeTest(item._id)">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="height:32px">
                            <span>试卷{{index+1}}</span>
                            <el-tag type="danger" style="float:right;" v-if="item.isJudge">已评分</el-tag>
                        </div>
                        <div class="margin-y-10">
                            <div class="margin-y-10">
                                完成时间: {{item.answerDate}}
                            </div>
                            <div class="margin-y-10">
                                做题人: {{item.ownerName}}
                            </div>
                        </div>
                        <div class="margin-y-10">

                        </div>
                    </el-card>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    require('../src/assets/css/index.css')
    import vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                testList:[]
            }
        },
        components:{
            'v-header':vheader
        },
        mounted(){
            var self = this
            var testId = this.$route.query.testId
            $.ajax({
                url:"http://localhost:3000/api/getJudgeList",
                type:'post',
                data:{
                    testId:testId
                },
                success:function(result){
                    self.testList = result.data
                }
            })
        },
        methods:{
            toJudgeTest(id){
                this.$router.push('/judgeTest?testId='+id)
            }
        }
    }
</script>